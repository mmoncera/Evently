require('dotenv/config');
const path = require('path');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.use(express.static(publicPath));
app.use(express.json());

app.post('/api/auth/register', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        INSERT INTO "users" ("username", "hashedPassword")
        VALUES ($1, $2)
        RETURNING "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => {
      if (err.code === '23505') {
        return res.status(409).json({ error: 'duplicate username' });
      }
      next(err);
    });
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    SELECT "userId",
           "hashedPassword"
    FROM "users"
    WHERE "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.get('/api/search-yelp', (req, res, next) => {
  const { term, location } = req.query;
  if (!term || !location) {
    throw new ClientError(400, 'event and location are required');
  }
  client.search({ term, location })
    .then(response => {
      return res.status(200).json(response.jsonBody.businesses);
    })
    .catch(err => {
      if (err.statusCode === 400) {
        return res.json({ error: 'no results' });
      }
      next(err);
    });
});

app.use(authorizationMiddleware);

app.get('/api/bookmarks', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    SELECT *
    FROM "bookmarks"
    WHERE "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/bookmarks', (req, res, next) => {
  const { userId } = req.user;
  const { eventId, alias, imageUrl, name, rating, reviewCount, price, type, address, phone } = req.body.eventInfo;
  const sql = `
    INSERT INTO "bookmarks" ("userId", "eventId", "alias", "imageUrl", "name", "rating", "reviewCount", "price", "type", "address", "phone")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `;
  const params = [userId, eventId, alias, imageUrl, name, rating, reviewCount, price, type, address, phone];
  db.query(sql, params)
    .then(result => {
      const [bookmark] = result.rows;
      res.status(201).json(bookmark);
    })
    .catch(err => next(err));
});

app.delete('/api/bookmarks', (req, res, next) => {
  const { userId } = req.user;
  const { eventId } = req.body.eventInfo;
  const sql = `
    DELETE FROM "bookmarks"
    WHERE "userId" = $1 AND "eventId" = $2
  `;
  const params = [userId, eventId];
  db.query(sql, params)
    .then(result => {
      const [bookmark] = result.rows;
      res.status(204).json(bookmark);
    })
    .catch(err => next(err));
});

app.post('/api/itineraries', (req, res, next) => {
  const { userId } = req.user;
  const { itineraryName, itineraryDate } = req.body.itineraryInfo;
  const sql = `
    INSERT INTO "itineraries" ("userId", "itineraryName", "itineraryDate")
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const params = [userId, itineraryName, itineraryDate];
  db.query(sql, params)
    .then(result => {
      const [itinerary] = result.rows;
      res.status(201).json(itinerary);
    })
    .catch(err => next(err));
});

app.post('/api/itinerary-events', (req, res, next) => {
  const { itineraryId, bookmark } = req.body;
  const { eventId, alias, imageUrl, name, rating, reviewCount, price, type, address, phone } = bookmark;
  const sql = `
    INSERT INTO "itineraryEvents" ("itineraryId", "eventId", "alias", "imageUrl", "name", "rating", "reviewCount", "price", "type", "address", "phone")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `;
  const params = [itineraryId, eventId, alias, imageUrl, name, rating, reviewCount, price, type, address, phone];
  db.query(sql, params)
    .then(result => {
      const [itineraryEvent] = result.rows;
      res.status(201).json(itineraryEvent);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
