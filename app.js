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
const closeSearchBtn = document.querySelector(".closeSearchBtn");
const welcomeMsg = document.querySelector(".welcomeMsg");
const header = document.querySelector("header");
const headingSection = document.querySelector(".headingSection");
const backToTop = document.querySelector(".back-to-top-link");
const footer = document.querySelector(".footer--one");
const section4 = document.querySelector(".section--4");
const testimonials = document.querySelector(".testimonials");
const cardImageBtn = document.querySelector(".cardImageBig");

// Selectors for card modal

const cardName = document.querySelector(".cardName");
const cardRarity = document.querySelector(".cardRarity");
const cardType = document.querySelector(".cardType");
const cardSet = document.querySelector(".cardSet");
const cardOriginalText = document.querySelector(".cardOriginalText");

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

//  Card back about modal

const cardBackAbout = document.querySelector(".cardBackImg");
const aboutModal = document.querySelector("#myModalAbout");
const closeAbout = document.querySelector(".closeAbout");

///////////////////////////////////////////////////////////////////////////////

//////////////////

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
  } else {
    header.style.opacity = 0;
  }
});

// Function for duplicates from create acc and login

// Array for keeping the fetched card information on Array position 1
const arr = [];

// Filtered array for rarity cards
let rareCards = [];

// Array for name that we are seeking in the moment
let nameArr = [];

// Users array

const users = [];

// Arr for active users

let activeUser = [];

// Fetch from magic the gathering api// only up to 100 cards, I am not sure how to get others, will check for that later !!!
// fetch("https://api.magicthegathering.io/v1/cards")
//   .then((res) => res.json())
//   .then((x) => arr.push(x))
//   .catch((err) => console.log(err));

fetch("https://api.magicthegathering.io/v1/cards?set=dom&page=1")
  .then((res) => res.json())
  .then((x) => arr.push(x))
  .catch((err) => console.log(err));

fetch("https://api.magicthegathering.io/v1/cards?set=dom&page=2")
  .then((res) => res.json())
  .then((x) => arr.push(x))
  .catch((err) => console.log(err));

fetch("https://api.magicthegathering.io/v1/cards?set=dom&page=3")
  .then((res) => res.json())
  .then((x) => arr.push(x))
  .catch((err) => console.log(err));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// Show favourite cards
// Since there is a lot class changes between createFavorite and createCardsFinal i'll leave them like this in two functions even though they are pretty similliar I decided to leave them in two functions

// Function for card modal text content

const cardModalText = function (path, i) {};

///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const createCardFinal = function (objPath, num) {
  // Creating card element by element, adding classes to them, and appending them to each other
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image");
  const image = document.createElement("img");
  image.id = "card--image";

  //Favorite button
  const favorite = document.createElement("button");
  favorite.classList.add("favorite");
  favorite.classList.add("cardBtn");
  favorite.innerText = "Favorite";
  // Delete button
  const newBtn = document.createElement("button");
  newBtn.classList = "del";
  newBtn.classList.add("cardBtn");
  newBtn.innerText = "X";

  image.src = `${objPath[num].imageUrl}`;

  // Here I check if image exists, if not I put everything in new elements, and classes.. A lot of code, that also exists in other function, but it is what it is. It works, even thought it looks ugly
  if (!objPath[num].imageUrl) {
    newCard.classList.add("hidden");
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

  // if (activeUser[0]) {
  //   if (activeUser[0].userFavoriteCards) {
  //     activeUser[0].userFavoriteCards.forEach((x) =>
  //       favorite.classList.add("hidden")
  //     );
  //   }
  // }

  image.addEventListener("click", function () {
    console.log("click");
    cardsModal.style.display = "block";
    cardName.textContent = objPath[num].name;
    cardRarity.textContent = objPath[num].rarity;
    cardType.textContent = objPath[num].type;
    cardSet.textContent = objPath[num].set;
    cardOriginalText.textContent = objPath[num].originalText;
    setTimeout(() => {
      cardsModal.style.opacity = 1;
    }, 50);
  });

  // Delete selected card
  // I have to fix this
  newBtn.addEventListener("click", function () {
    newCard.classList.add("hidden");
    activeUser[0].userFavoriteCards.splice(i, 1);
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
  arr[0].cards.forEach((x, i) => {
    createCardFinal(arr[0].cards, i);
  });
});

// Event listener for showing all favorited cards
show.addEventListener("click", function () {
  // Make container empty before showing the favorite cards
  container.innerHTML = "";

  // Check if favorite array
  activeUser[0].userFavoriteCards.forEach((x, i) => {
    createCardFinal(activeUser[0].userFavoriteCards, i);
  });
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
  modalCreate.style.display = "none";
  btnModalCreate.style.left = "-100%";
  btnModalLogin.style.left = "-100%";
  welcomeMsg.style.right = "0";
  welcomeMsg.style.opacity = 1;
  logoutBtn.classList.remove("hidden");
  activeUser[0] = newUser;

  welcomeMsg.textContent = `Welcome ${activeUser[0].username} to the world of magic`;
  createUsername.value = createPassword.value = "";
  welcomeMsg.style.top = "-170px";
  console.log(users);
});

// When user logs in change active users to user that logged in, and show his favorite cards, also close model window on log in and change all the other stuff that needs to be changed

loginBtn.addEventListener("click", function () {
  container.innerHTML = "";
  users.forEach((user) => {
    console.log(user);
    if (user.username === username.value && user.password === password.value) {
      console.log(user);
      username.value = password.value = "";
      modalLogin.style.display = "none";
      btnModalCreate.style.opacity = 0;
      btnModalLogin.style.opacity = 0;
      welcomeMsg.style.right = "0";
      welcomeMsg.style.opacity = 1;
      activeUser[0] = user;
      logoutBtn.classList.remove("hidden");
      activeUser[0].userFavoriteCards.forEach((x, i) => {
        createCardFinal(activeUser[0].userFavoriteCards, i);
      });
      setTimeout(() => {
        btnModalCreate.style.left = "100%";
        btnModalLogin.style.left = "100%";
      }, 400);

      welcomeMsg.textContent = `Welcome back ${activeUser[0].username}`;
    }
  });
  username.value = password.value = "";
  loginBtn.textContent = "Wrong Input";
  setTimeout(() => {
    loginBtn.textContent = "Login";
  }, 1500);
});

////////////////////////////////////////////////////////////////////////////////////
// User logs out, reset active user, put all things as they were before user logged in

logoutBtn.addEventListener("click", function () {
  container.innerHTML = "";
  activeUser = [];
  logoutBtn.classList.add("hidden");
  sectionSearch.style.opacity = 0;
  welcomeMsg.style.opacity = 0;
  welcomeMsg.style.right = "100%";
  setTimeout(() => {
    sectionSearch.style.left = "-100%";
  }, 500);
  btnModalCreate.style.left = 0;
  btnModalLogin.style.left = 0;
  container.style.transition = "500ms";
  container.style.opacity = 0;
  container.style.height = 0;
  footer.style.top = "-245px";
  section4.style.top = "0";
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
  container.style.opacity = 1;
  container.style.height = "100vh";
  footer.style.top = 0;
  section4.style.top = "155px";
  if (!arr[0]) {
    console.log("hello");
    let spinner = document.createElement("div");
    spinner.classList.add("loader");
    container.append(spinner);
    setTimeout(() => {
      container.innerHTML = "";
      arr.cards.forEach((x, i) => createCardFinal(arr.cards, i));
    }, 6000);
  }

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
  section4.style.top = "0";
  footer.style.top = "-245px";
  container.style.opacity = 0;
  container.style.height = 0;
  searchOptionsBtn.classList.remove("hidden");
});

///////////////////////////////////////////////

// Modal for cards image

window.onclick = function (event) {
  if (event.target == cardsModal) {
    imageModal.style.display = "none";
    imageModal.style.opacity = 0;
  }
};

// Cards modal window

const cardsModal = document.querySelector("#cardsModal");
const closeCardsModal = document.querySelector(".closeCardsModal");

// Modal cards

// When the user clicks on <span> (x), close the modal
closeCardsModal.onclick = function () {
  cardsModal.style.display = "none";
  cardsModal.style.opacity = 0;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
  if (e.target == cardsModal) {
    cardsModal.style.display = "none";
    cardsModal.style.opacity = 0;
  }
};

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
    modalCreate.style.opacity = 0;
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

// Modal for about

cardBackAbout.onclick = function () {
  aboutModal.style.display = "block";
  setTimeout(() => {
    aboutModal.style.opacity = 1;
  }, 50);
};

// When the user clicks on <span> (x), close the modal
closeAbout.onclick = function () {
  aboutModal.style.display = "none";
  aboutModal.style.opacity = 0;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == aboutModal) {
    aboutModal.style.display = "none";
    aboutModal.style.opacity = 0;
  }
};

// Testimonials change

const testimonialsImageArray = [
  "https://crystal-cdn3.crystalcommerce.com/photos/6344442/large/en_oYewlmYojE.png",
  "https://i.pinimg.com/474x/d3/1f/b0/d31fb0b245a7fb1e3b3cc0e1e642d47f.jpg",
  "https://media.wizards.com/legacy/magic/images/mtgcom/fcpics/latest/dl16_large.jpg",
  "https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/play/zm28_vvocl8l9i5fmibb3.jpg",
  "https://crystal-cdn3.crystalcommerce.com/photos/4203323/large/undergrowthchampion.jpg",
  "https://cdn1.mtggoldfish.com/images/gf/Corpsejack%2BMenace%2B%255BRTR%255D.jpg",
  "https://www.sadrobot.co.za/wp-content/uploads/2013/06/MM0471.jpeg",
];

let clickCount = 0;

testimonials.addEventListener("click", function () {
  if (clickCount === testimonialsImageArray.length - 1) {
    clickCount = -1;
  }
  clickCount++;
  testimonials.style.backgroundImage = `url(${testimonialsImageArray[clickCount]})`;
});
