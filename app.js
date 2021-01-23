"use strict";

// Selectors
const container = document.querySelector(".container");
const nameBtn = document.querySelector(".name--btn");
const inputType = document.querySelector("#search--type");
const typeBtn = document.querySelector(".type--btn");
const inputName = document.querySelector("#search--name");
const card = document.querySelectorAll(".card");
const del = document.querySelectorAll(".del");
const show = document.querySelector(".show");

///////////////////////////////////////////////////////////////////////////////

// Array for keeping favorite cards
const favoriteObject = [];

// Array for keeping the fetched card information on Array position 1
const arr = [];

// Filtered array for rarity cards
let rareCards = [];

// Array for name that we are seeking
let nameArr = [];

// Fetch from magic the gathering api// only up to 100 cards, I am not sure how to get others, will check for that later !!!
fetch("https://api.magicthegathering.io/v1/cards")
  .then((res) => res.json())
  .then((x) => (arr[0] = x));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// FUnction for making all small letters when searching for name or rarity

// Show favourite cards
// Since there is a lot class changes between createFavorite and createCardsFinal i'll leave them like this in two functions even though they are pretty similliar I decided to leave them in two functions
const createFavorite = function (i) {
  //Creating elements
  let newCardFav = document.createElement("div");
  newCardFav.classList.add("card");

  let imageFavDiv = document.createElement("div");
  imageFavDiv.classList.add("image");

  let imageFav = document.createElement("img");
  imageFav.id = "card--image";

  // Delete button
  let delBtn = document.createElement("button");
  delBtn.classList = "del";
  delBtn.innerText = "X";

  imageFav.src = `${favoriteObject[i].imageUrl}`;

  // Checking if image exists, if not then I put another image !!! also need to make function for this !!!
  if (!favoriteObject[i].imageUrl) {
    newCardFav.classList.add("card--noImage");
    let noneCardText = document.createElement("h2");
    noneCardText.classList.add("card--noImageText");
    noneCardText.textContent = favoriteObject[i].name;
    newCardFav.append(noneCardText);
    delBtn.classList.remove("del");
    delBtn.classList.add("no--image--del");
  }

  newCardFav.append(imageFavDiv);
  newCardFav.append(delBtn);
  imageFavDiv.append(imageFav);

  // Delete selected card from favorites
  delBtn.addEventListener("click", function () {
    // So here I added class of hidden to deleted card, and also I delete selected card from array, and if array.length is equal to 0 then i make sure that the last item is deleted and I make arr = empty array
    newCardFav.classList.add("hidden");
    favoriteObject.splice(i, 1);
    console.log(favoriteObject);
    if (favoriteObject.length === 0) {
      favoriteObject = [];
    }
  });

  container.append(newCardFav);
};

// Event listener for showing all favorited cards
show.addEventListener("click", function () {
  // Make container empty before showing the favorite cards
  container.innerHTML = "";
  // Check if favorite array
  console.log(favoriteObject);
  favoriteObject.forEach((x, i) => {
    createFavorite(i);
  });
});

///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const createCardFinal = function (objPath, num) {
  // Creating card element by element, adding classes to them, and appending them to each other
  let newCard = document.createElement("div");
  newCard.classList.add("card");

  let imageDiv = document.createElement("div");
  imageDiv.classList.add("image");

  let image = document.createElement("img");
  image.id = "card--image";

  //Favorite button
  let favorite = document.createElement("button");
  favorite.classList.add("favorite");
  favorite.innerText = "Favorite";

  // Delete button
  let newBtn = document.createElement("button");
  newBtn.classList = "del";
  newBtn.innerText = "X";

  image.src = `${objPath[num].imageUrl}`;

  // Here I check if image exists, if not I put everything in new elements, and classes.. A lot of code, that also exists in other function, but it is what it is. It works, even thought it looks ugly
  if (!objPath[num].imageUrl) {
    newCard.classList.add("card--noImage");
    let noneCardText = document.createElement("h2");
    noneCardText.classList.add("card--noImageText");
    noneCardText.textContent = objPath[num].name;
    newCard.append(noneCardText);
    newBtn.classList.remove("del");
    newBtn.classList.add("no--image--delOne");
    favorite.classList.remove("favorite");
    favorite.classList.add("no--image--favOne");
  }

  // Appending created elements to card
  newCard.append(imageDiv);
  newCard.append(newBtn);
  newCard.append(favorite);
  imageDiv.append(image);

  // Delete selected card
  newBtn.addEventListener("click", function () {
    newCard.classList.add("hidden");
  });

  // Favorite selected card
  favorite.addEventListener("click", function () {
    favoriteObject.push(objPath[num]);
    console.log(favoriteObject);
  });

  container.append(newCard);
};

//////////////////////////////////////////////////////////////////////
// Here I search card by name, so I putted name in array by unshift method, and then show card on position one from that array
nameBtn.addEventListener("click", function () {
  container.innerHTML = "";
  let input = inputName.value;
  arr[0].cards.forEach((x) => {
    if (x.name === input) {
      nameArr.unshift(x);
      if (nameArr.length > 40) {
        nameArr.splice(1, nameArr.length);
        console.log(nameArr);
      }
    }
  });
  createCardFinal(nameArr, 0);
});

//////////////////////////////////////////////////////////////////////
// Show all cards by rarity. So here I putted all cards thet I look for in new array then I simply loop over that array and show cards
typeBtn.addEventListener("click", function () {
  rareCards = [];
  container.innerHTML = "";
  arr[0].cards.forEach((x) => {
    if (x.rarity === inputType.value) {
      rareCards.push(x);
    }
  });
  console.log(rareCards);
  rareCards.forEach((x, i) => createCardFinal(rareCards, i));
});
