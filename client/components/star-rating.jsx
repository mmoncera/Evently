import React from 'react';

function StarRating({ rating }) {
  const emptyStar = 'fa-regular fa-star star-icon';
  const halfStar = 'fa-solid fa-star-half-stroke star-icon';
  const fullStar = 'fa-solid fa-star star-icon';
  let stars = rating === 0 ? Array(5).fill(emptyStar) : Array(Math.floor(rating)).fill(fullStar);
  let difference = 5 - rating;
  for (let index = stars.length; index < 5; index++) {
    if (!Number.isInteger(difference)) {
      stars.push(halfStar);
      difference -= 0.5;
    } else {
      stars.push(emptyStar);
    }
  }
  stars = stars.map((star, index) => <i key={index} className={star}></i>);
  return stars;
}

export default StarRating;
