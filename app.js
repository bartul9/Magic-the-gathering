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
const allCards = document.querySelector(".showAll");
const logoutBtn = document.querySelector("#logout");
const searchOptionsBtn = document.querySelector(".searchOptionBtn");
const sectionSearch = document.querySelector(".section--2");
const section3 = document.querySelector(".section--3");
const closeSearchBtn = document.querySelector(".closeSearchBtn");
const welcomeMsg = document.querySelector(".welcomeMsg");
const header = document.querySelector("header");
const headingSection = document.querySelector(".headingSection");

// Create new acc inputs and buttons

const createUsername = document.querySelector("#createUsername");
const createPassword = document.querySelector("#createPassword");
const createBtn = document.querySelector(".create--btn");

// Login inputs and button

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const loginBtn = document.querySelector(".login--btn");

//  Create account modal inputs

const modalCreate = document.getElementById("myModalCreate");
const btnModalCreate = document.querySelector(".modalBtnCreate");
const spanModal = document.getElementsByClassName("close")[0];

// Login modal inputs

const btnModalLogin = document.querySelector(".modalBtnLogin");
const modalLogin = document.getElementById("myModalLogin");
const spanModalLogin = document.getElementsByClassName("closeLogin")[0];

///////////////////////////////////////////////////////////////////////////////

// Function for turning first letter to uppercase and rest to lowercase

const convertString = function (str) {
  let arrStr = str.split("");
  let arrStr2 = arrStr[0].toUpperCase();
  let arrStr3 =
    arrStr2 + arrStr.splice(1, arrStr.length).join("").toLowerCase();
  return arrStr3;
};

// Navabr scroll function

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
  if (window.scrollY > 0) {
    header.style.opacity = 1;
  } else header.style.opacity = 0;
});

// Array for keeping the fetched card information on Array position 1
const arr = [];

// Filtered array for rarity cards
let rareCards = [];

// Array for name that we are seeking in the moment
let nameArr = [];

// Users array

const users = [];

// Fetch from magic the gathering api// only up to 100 cards, I am not sure how to get others, will check for that later !!!
fetch("https://api.magicthegathering.io/v1/cards")
  .then((res) => res.json())
  .then((x) => arr.push(x))
  .catch((err) => console.log(err));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

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

  imageFav.src = `${activeUser[0].userFavoriteCards[i].imageUrl}`;

  // Checking if image exists, if not then I put another image !!! also need to make function for this !!!
  if (!activeUser[0].userFavoriteCards[i].imageUrl) {
    newCardFav.classList.add("card--noImage");
    let noneCardText = document.createElement("h2");
    noneCardText.classList.add("card--noImageText");
    noneCardText.textContent = activeUser[0].userFavoriteCards[i].name;
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
    activeUser[0].userFavoriteCards.splice(i, 1);
    if (activeUser[0].userFavoriteCards.length === 0) {
      activeUser[0].userFavoriteCards = [];
    }
  });

  container.append(newCardFav);
};

// Event listener for showing all favorited cards
show.addEventListener("click", function () {
  // Make container empty before showing the favorite cards
  container.innerHTML = "";
  // Check if favorite array
  activeUser[0].userFavoriteCards.forEach((x, i) => {
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

  // If there is active user create all images with buttons for favorite cards and for deleting card, else just create cards without buttons
  if (activeUser[0]) {
    newCard.append(imageDiv);
    newCard.append(newBtn);
    newCard.append(favorite);
    imageDiv.append(image);
  } else {
    newCard.append(imageDiv);
    imageDiv.append(image);
  }

  // Delete selected card
  newBtn.addEventListener("click", function () {
    newCard.classList.add("hidden");
  });

  // Favorite selected card
  favorite.addEventListener("click", function () {
    activeUser[0].userFavoriteCards.push(objPath[num]);
  });

  container.append(newCard);
};

// Function for showing all cards avalible

allCards.addEventListener("click", function () {
  container.innerHTML = "";
  arr[0].cards.forEach((x, i) => createCardFinal(arr[0].cards, i));
});

//////////////////////////////////////////////////////////////////////
// Here I search card by name, so I putted name in array by unshift method, and then show card on position one from that array
nameBtn.addEventListener("click", function () {
  container.innerHTML = "";
  let input = convertString(inputName.value);
  inputName.value = "";
  arr[0].cards.forEach((x) => {
    if (x.name === input) {
      nameArr.unshift(x);
      if (nameArr.length > 40) {
        nameArr.splice(1, nameArr.length);
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
    if (x.rarity === convertString(inputType.value)) {
      rareCards.push(x);
    }
  });
  rareCards.forEach((x, i) => createCardFinal(rareCards, i));
  inputType.value = "";
});

////////////////////////////////////////////////////////////////////////

// Class for every new created users

class UsersCl {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.userFavoriteCards = [];
    this.cardSet = [];
  }
}

// Users created by me for app building use

let userOne = new UsersCl("bartul_9", "jasamkralj222");
let userTwo = new UsersCl("mike", "1234");
users.push(userOne, userTwo);

let activeUser = [];

// When user clicks Create I create object with his name in it and password and push it to ussers array

createBtn.addEventListener("click", function () {
  container.innerHTML = "";
  if (createUsername.value === "" || createPassword.value === "") {
    createUsername.value = createPassword.value = "";
    createBtn.textContent = "Wrong input";
    setTimeout(() => (createBtn.textContent = "Create Account"), 1500);
    return;
  }
  createBtn.textContent = "Create Acc";
  let newUser = new UsersCl(createUsername.value, createPassword.value);
  users.push(newUser);
  activeUser[0] = newUser;
  modalCreate.style.display = "none";
  logoutBtn.classList.remove("hidden");
  btnModalCreate.style.left = "-100%";
  btnModalLogin.style.left = "-100%";
  welcomeMsg.textContent = `Welcome ${activeUser[0].username} to the world of magic`;
  welcomeMsg.style.right = "0";
  createUsername.value = createPassword.value = "";
  welcomeMsg.style.top = "-150px";
  console.log(users);
});

// When user logs in change active users to user that logged in, and show his favorite cards, also close model window on log in and change all the other stuff that needs to be changed

loginBtn.addEventListener("click", function () {
  container.innerHTML = "";
  users.forEach((user) => {
    if (user.username === username.value && user.password === password.value) {
      username.value = password.value = "";
      modalLogin.style.display = "none";
      btnModalCreate.style.opacity = 0;
      btnModalLogin.style.opacity = 0;
      setTimeout(() => {
        btnModalCreate.style.left = "100%";
        btnModalLogin.style.left = "100%";
      }, 200);
      logoutBtn.classList.remove("hidden");
      activeUser[0] = user;
      welcomeMsg.textContent = `Welcome back ${activeUser[0].username}`;
      welcomeMsg.style.right = "0";
      activeUser[0].userFavoriteCards.forEach((x, i) => {
        createFavorite(i);
      });
    } else {
      username.value = password.value = "";
      loginBtn.textContent = "Wrong Input";
      setTimeout(() => {
        loginBtn.textContent = "Login";
      }, 1500);
    }
  });
  console.log(activeUser);
});

////////////////////////////////////////////////////////////////////////////////////
// User logs out, reset active user, put all things as they were before user logged in

logoutBtn.addEventListener("click", function () {
  container.innerHTML = "";
  activeUser = [];
  logoutBtn.classList.add("hidden");
  sectionSearch.style.opacity = 0;
  welcomeMsg.textContent = "";
  welcomeMsg.style.right = "100%";
  setTimeout(() => {
    sectionSearch.style.left = "-100%";
  }, 500);
  btnModalCreate.style.left = 0;
  btnModalLogin.style.left = 0;
  container.style.transition = "500ms";
  container.style.opacity = 0;
  container.style.height = 0;
  searchOptionsBtn.classList.remove("hidden");

  setTimeout(() => {
    btnModalCreate.style.opacity = 1;
    btnModalLogin.style.opacity = 1;
  }, 200);
});

////////////////////////////////////////////////////////////////////////////////
// Btn for opening search options

searchOptionsBtn.addEventListener("click", function () {
  sectionSearch.style.opacity = 1;
  sectionSearch.style.left = "0";
  searchOptionsBtn.classList.add("hidden");
  section3.style.top = 0;
  container.style.opacity = 1;
  container.style.height = "100vh";
  arr[0].cards.forEach((x, i) => createCardFinal(arr[0].cards, i));
});

//////////////////////////////////////////
// Btn  for closing search options

closeSearchBtn.addEventListener("click", function () {
  container.innerHTML = "";
  sectionSearch.style.opacity = 0;
  setTimeout(() => {
    sectionSearch.style.left = "-100%";
  }, 500);
  container.style.transition = "500ms";
  section3.style.top = "-250px";
  container.style.opacity = 0;
  container.style.height = 0;
  searchOptionsBtn.classList.remove("hidden");
});

///////////////////////////////////////////////////////////////////////////////////////
// Modal window when creatin acc !!!!!!!!!!!!

// When the user clicks the button, open the modal
btnModalCreate.onclick = function () {
  modalCreate.style.display = "block";
  setTimeout(() => {
    modalCreate.style.opacity = 1;
  }, 50);
};

// When the user clicks on <span> (x), close the modal
spanModal.onclick = function () {
  modalCreate.style.display = "none";
  modalCreate.style.opacity = 0;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
  if (e.target == modalCreate) {
    modalCreate.style.display = "none";
    modalLogin.style.opacity = 0;
  }
};

//////////////////////////////////////////////////////////////////////////////
//// Modal for logging  in !!!!!!!!!!

// When the user clicks the button, open the modal
btnModalLogin.onclick = function () {
  modalLogin.style.display = "block";
  setTimeout(() => {
    modalLogin.style.opacity = 1;
  }, 50);
};

// When the user clicks on <span> (x), close the modal
spanModalLogin.onclick = function () {
  modalLogin.style.display = "none";
  modalLogin.style.opacity = 0;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalLogin) {
    modalLogin.style.display = "none";
    modalLogin.style.opacity = 0;
  }
};
