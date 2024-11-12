// Variables

const likeBtn = document.querySelector('.heart-icon');
const numberOfLikesElement = document.querySelector('.number-of-likes');

let numberOfLikes = Number.parseInt(numberOfLikesElement.textContent, 10);
let isLiked = false;

// Functions

const likeClick = () => {
  if (!isLiked) {
    likeBtn.classList.add('isLiked');
    isLiked = !isLiked;
    likeBtn.classList.add('disabled');
  } else {
    likeBtn.classList.remove('isLiked');
    numberOfLikes--;
    numberOfLikesElement.textContent = numberOfLikes;
    isLiked = !isLiked;
  }
};

// Event Listeners

likeBtn.addEventListener('click', likeClick);



const unlikeBtn = document.querySelector('.unlikebtn');
const numberOfUnLikesElement = document.querySelector('.number-of-unlikes');

let numberOfUnLikes = Number.parseInt(numberOfLikesElement.textContent, 10);
let isUnLiked = false;

// Functions

const unLikeClick = () => {
  if (!isUnLiked) {
    unlikeBtn.classList.add('isUnLiked');
    isUnLiked = !isUnLiked;
    unlikeBtn.classList.add('disabled');
  } else {
    unlikeBtn.classList.remove('isUnLiked');
    numberOfUnLikes--;
    numberOfUnLikesElement.textContent = numberOfUnLikes;
    isUnLiked = !isUnLiked;
  }
};

// Event Listeners

unlikeBtn.addEventListener('click', unLikeClick);