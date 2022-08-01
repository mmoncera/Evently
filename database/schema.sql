set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" timestamptz NOT NULL default now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "bookmarks" (
    "bookmarkId" serial NOT NULL,
    "userId" integer NOT NULL,
    "eventId" text NOT NULL,
    "alias" text NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "reviewCount" integer NOT NULL,
    "price" TEXT,
    "type" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    CONSTRAINT "bookmarks_pk" PRIMARY KEY ("bookmarkId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "itineraries" (
    "itineraryId" serial NOT NULL,
    "userId" integer NOT NULL,
    "name" serial NOT NULL,
    "startDate" timestamptz NOT NULL,
    CONSTRAINT "Itineraries_pk" PRIMARY KEY ("itineraryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "itineraryEvents" (
    "itineraryEventId" serial NOT NULL,
    "itineraryId" integer NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "reviewCount" integer NOT NULL,
    "price" TEXT NOT NULL,
    "categories" json NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    CONSTRAINT "itineraryEvents_pk" PRIMARY KEY ("itineraryEventId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "itineraryEvents" ADD CONSTRAINT "itineraryEvents_fk0" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("itineraryId");
