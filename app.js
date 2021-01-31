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
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const topPage = document.querySelector("#topPageImg");
const cardArtist = document.querySelector(".cardArtist");
const searchSet = document.querySelector("#search--set");
const setBtn = document.querySelector(".set--btn");
const createBringBtn = document.querySelector(".createBringInputs");
const createDiv = document.querySelector(".createAcc--div");
const loginDiv = document.querySelector(".login--div");
const loginBringBtn = document.querySelector(".loginBringInputs");
const thankYouMsg = document.querySelector(".thankYouMessage");
const cardTextAbout = document.querySelector(".cardTextAbout");
const cardBackImg = document.querySelector(".cardBackImg");
const closeCreateLoginBtn = document.querySelectorAll(".close");
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");

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

// Modal for more info about cards

const cardsModal = document.querySelector("#cardsModal");
const closeCardsModal = document.querySelector(".closeCardsModal");

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions for login, create, logout buttons and div animations, and also spinner

const loginRemove = function (opacity, left) {
  loginBringBtn.style.opacity = opacity;
  createBringBtn.style.opacity = opacity;
  setTimeout(() => {
    createBringBtn.style.left = left;
    loginBringBtn.style.left = left;
  }, 450);
};

const removeAccDivs = function (val1, left, opacity) {
  val1.style.left = left;
  val1.style.opacity = opacity;
};

// Spinner function
const spinner = function () {
  let spinner = document.createElement("div");
  spinner.classList.add("loader");
  container.append(spinner);
};

///////////////////////////////////////////////////////////////////////////////
// Listeners for about section, when you hover over text, card dessapear and text comes in nice animation

cardTextAbout.addEventListener("mouseover", function () {
  cardBackImg.style.opacity = 0;
  cardTextAbout.style.backgroundColor = "rgba(255, 50, 255, 0.2)";
});

cardTextAbout.addEventListener("mouseout", function () {
  cardBackImg.style.opacity = 1;
});

// Functions for closing create login if you change you mind

closeCreateLoginBtn.forEach((x) =>
  x.addEventListener("click", function () {
    removeAccDivs(createDiv, "-100%", 0);
    removeAccDivs(loginDiv, "-100%", 0);
    loginRemove(1, 0);
  })
);

// Function for page slider

const sliderBtnTxt = function () {
  container.innerHTML = "";
  arr[pageCount].cards.forEach((x, i) => {
    createCardFinal(arr[pageCount].cards, i);
  });
};

/////////////////////////////////////////////////////////////////////////////
// Function for closing search and logging out => So, here I putted everything thats duplicate from search and logout functions, and putted it all in one so code looks nicer

const closeSearchLogout = function () {
  footer.style.top = "-245px";
  nextBtn.style.left = "-100%";
  topPage.style.bottom = "-100px";
  previousBtn.style.left = "-100%";
  thankYouMsg.style.top = "360px";
  section4.style.top = "0";
  container.style.transition = "500ms";
  container.innerHTML = "";
  show.style.opacity = 0;
  show.style.left = "-200%";
  body.style.height = "485vh";
  sectionSearch.style.opacity = 0;
  container.style.opacity = 0;
  container.style.height = 0;
  searchOptionsBtn.classList.remove("hidden");
  setTimeout(() => {
    sectionSearch.style.left = "-100%";
  }, 500);
};

//////////////////////////////////////////////////////////////////////////////
// Navabr scroll function => navbar animation

function navSlide() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    //Toggle Nav
    nav.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });
    //Burger Animation
    burger.classList.toggle("toggle");
  });
}

navSlide();

// Array for keeping the fetched card information in array, so I can work with them
let arr = [];

// Filtered array for rarity cards
let rareCards = [];

// Array for name that we are seeking
let nameArr = [];

// Users array
let users = [];

// Arr for active users
let activeUser = [];

/////////////////////////////////////////////////////////////////////////////////////////
// Fetch methods for api=> These are the first card fetched so user can have something to see when he opens container

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

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page slider for cards. Since they only allow up to 100 cards to be fetched at one call I decided to put them in pages

let pageCount = 0;

nextBtn.addEventListener("click", function () {
  if (pageCount === arr.length - 1) {
    pageCount = -1;
  }

  pageCount++;
  nextBtn.textContent = pageCount;
  setTimeout(() => {
    nextBtn.textContent = "Next Page";
  }, 700);

  sliderBtnTxt();
});

previousBtn.addEventListener("click", function () {
  if (pageCount === 0) {
    pageCount = arr.length;
  }
  pageCount--;
  previousBtn.textContent = pageCount;
  setTimeout(() => {
    previousBtn.textContent = "Previous Page";
  }, 700);

  sliderBtnTxt();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// My main function for creating cards => Here I create elements, give them classes and append them to main element, when user clicks on, I create cards thath he wants and append them all to container.

// I had to pull this variable out so when I show favorite cards I can add class hidden to favorite button
let favorite;

const createCardFinal = function (objPath, num) {
  // Creating card element by element, adding classes to them, and appending them to each other
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image");
  const image = document.createElement("img");
  image.id = "card--image";

  //Favorite button
  favorite = document.createElement("button");
  favorite.classList.add("favorite");
  favorite.classList.add("cardBtn");
  favorite.innerText = "Favourite";

  // Delete button
  const newBtn = document.createElement("button");
  newBtn.classList = "del";
  newBtn.classList.add("cardBtn");
  newBtn.innerText = "X";

  image.src = `${objPath[num].imageUrl}`;

  // Here I check if image exists, if not that card is not created
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

  // Click on image and open modal with informations about clicked card
  image.addEventListener("click", function () {
    // Put colors on rarity
    if (objPath[num].rarity === "Rare") {
      cardRarity.style.color = "gold";
    } else if (objPath[num].rarity === "Common") {
      cardRarity.style.color = "white";
    } else if (objPath[num].rarity === "Uncommon") {
      cardRarity.style.color = "silver";
    } else if (objPath[num].rarity === "Mythic") {
      cardRarity.style.color = "orangered";
    }

    // Put all text on modal from api
    cardsModal.style.display = "block";
    cardName.textContent = objPath[num].name;
    cardRarity.textContent = objPath[num].rarity;
    cardType.textContent = objPath[num].type;
    cardSet.textContent = objPath[num].setName;
    cardOriginalText.textContent = objPath[num].originalText;
    cardArtist.textContent = objPath[num].artist;

    setTimeout(() => {
      cardsModal.style.opacity = 1;
    }, 50);
  });
  // When the user clicks on <span> (x), close the modal
  closeCardsModal.onclick = function () {
    cardsModal.style.display = "none";
    cardsModal.style.opacity = 0;
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (e) {
    if (e.target === cardsModal) {
      cardsModal.style.display = "none";
      cardsModal.style.opacity = 0;
    }
  };

  // Delete selected favorite card => So here I putted all favorited cards to array in users object, and if you whant to delete them I make it like this. Since I had some bugs with splice method, I decided to turn deleted card element to 0, and then filter array and remove all zeros, so that way I am sure they are deleated
  newBtn.addEventListener("click", function () {
    newCard.classList.add("hidden");
    activeUser[0].userFavoriteCards[num] = 0;
    activeUser[0].userFavoriteCards.filter((item) => item !== 0);
  });

  // Favorite selected card => favorite selected card and put it in users class into the favorite array
  favorite.addEventListener("click", function () {
    activeUser[0].userFavoriteCards.push(objPath[num]);
    setStorage();
  });

  container.append(newCard);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function for showing all cards avalible => When clicked user gets all cards from every array element

allCards.addEventListener("click", function () {
  container.innerHTML = "";
  if (!arr[0]) {
    let spinner = document.createElement("div");
    spinner.classList.add("loader");
    container.append(spinner);
    setTimeout(() => {
      container.innerHTML = "";
      arr.forEach((y) =>
        y.cards.forEach((x, i) => {
          createCardFinal(y.cards, i);
        })
      );
    }, 2500);
  }
  arr.forEach((y) =>
    y.cards.forEach((x, i) => {
      createCardFinal(y.cards, i);
    })
  );
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Event listener for showing all favorited cards => Here I loop trough favorite array and append all cards in array to container element

show.addEventListener("click", function () {
  container.innerHTML = "";
  activeUser[0].userFavoriteCards.forEach((x, i) => {
    createCardFinal(activeUser[0].userFavoriteCards, i);
    favorite.classList.add("hidden");
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Function for fetchin the sets from server, I decidec to do it like this. Card sets have max to four pages so I putted everything like this, it could be cleaner, but I think it works good for what I tryed to do

const setArr = [];

setBtn.addEventListener("click", function () {
  container.innerHTML = "";

  // Fetch all card pages and push them into array
  fetch(
    `https://api.magicthegathering.io/v1/cards?set=${searchSet.value}&page=1`
  )
    .then((res) => res.json())
    .then((x) => (setArr[0] = x))
    .catch((err) => console.log(err));

  fetch(
    `https://api.magicthegathering.io/v1/cards?set=${searchSet.value}&page=1`
  )
    .then((res) => res.json())
    .then((x) => (arr[0] = x))
    .catch((err) => console.log(err));

  fetch(
    `https://api.magicthegathering.io/v1/cards?set=${searchSet.value}&page=2`
  )
    .then((res) => res.json())
    .then((x) => (arr[1] = x))
    .catch((err) => console.log(err));

  fetch(
    `https://api.magicthegathering.io/v1/cards?set=${searchSet.value}&page=3`
  )
    .then((res) => res.json())
    .then((x) => (arr[2] = x))
    .catch((err) => console.log(err));

  fetch(
    `https://api.magicthegathering.io/v1/cards?set=${searchSet.value}&page=4`
  )
    .then((res) => res.json())
    .then((x) => (arr[2] = x))
    .catch((err) => console.log(err));

  // Check if setArr is empty or not, if yes add spinner and put 10sec timeout
  if (!setArr.length < 2) {
    spinner();
    setTimeout(() => {
      container.innerHTML = "";
      setArr[0].cards.forEach((x, i) => {
        createCardFinal(setArr[0].cards, i);
      });
    }, 10000);
  }

  if (
    !setArr[setArr.length - 1].cards.set ===
    setArr[setArr.length - 1].cards.searchSet.value
  ) {
    spinner();

    setTimeout(() => {
      container.innerHTML = "";
      setArr[0].cards.forEach((x, i) => {
        createCardFinal(setArr[0].cards, i);
      });
    }, 10000);
  }

  setArr[0].cards.forEach((x, i) => {
    createCardFinal(setArr[0].cards, i);
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Show all cards by rarity => Here I putted all cards that I look for in new array then I simply loop over that array and show cards

typeBtn.addEventListener("click", function () {
  rareCards = [];
  container.innerHTML = "";

  arr.forEach((y) =>
    y.cards.forEach((x) => {
      if (x.rarity.toUpperCase() === inputType.value.toUpperCase()) {
        rareCards.push(x);
      }
    })
  );
  rareCards.forEach((x, i) => createCardFinal(rareCards, i));
  inputType.value = "";
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Class prototype for every new created user

class UsersCl {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.userFavoriteCards = [];
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event listeners for login, logout buttons that bring inputs

createBringBtn.addEventListener("click", function () {
  loginRemove(0, "-100%");
  removeAccDivs(createDiv, 0, 1);
});

loginBringBtn.addEventListener("click", function () {
  loginRemove(0, "-100%");
  removeAccDivs(loginDiv, 0, 1);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create acc =>  When user clicks Create I create object with his name in it and password and push it to ussers array, also I display welcome message, and remove all elements that need to be removed in nice animation

createBtn.addEventListener("click", function () {
  closeSearchLogout();

  // If inputs are empty put message on button and reset inputs
  if (createUsername.value === "" || createPassword.value === "") {
    createUsername.value = createPassword.value = "";
    createBtn.textContent = "Wrong input";
    setTimeout(() => (createBtn.textContent = "Create Account"), 1500);
    return;
  }
  createBtn.textContent = "Create Acc";

  // Create new user object and push it to users array
  let newUser = new UsersCl(createUsername.value, createPassword.value);
  users.push(newUser);

  setStorage();
  loginRemove(0, "-100%");
  removeAccDivs(createDiv, "-100%", 0);

  welcomeMsg.style.right = "0";
  show.style.left = 0;
  welcomeMsg.style.opacity = 1;
  logoutBtn.classList.remove("hidden");
  activeUser[0] = newUser;

  welcomeMsg.textContent = `Welcome ${activeUser[0].username} to the world of magic`;
  createUsername.value = createPassword.value = "";
  welcomeMsg.style.top = "-170px";
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User logs in => When user logs in, I change active users to user that logged in, and show his favorite cards, also close modal window on log in and change all the other stuff that needs to be changed, also I check if input is valid, if not i display nice message in button

loginBtn.addEventListener("click", function () {
  container.innerHTML = "";
  closeSearchLogout();
  loginRemove();
  getStorage();
  // Check if users username and password matches and create user interface
  users.forEach((user) => {
    if (user.username === username.value && user.password === password.value) {
      show.style.left = 0;
      show.style.opacity = 1;
      username.value = password.value = "";
      welcomeMsg.style.right = "0";
      welcomeMsg.style.opacity = 1;
      activeUser[0] = user;
      logoutBtn.classList.remove("hidden");

      loginRemove(0, "-100%");
      removeAccDivs(loginDiv, "-100%", 0);

      activeUser[0].userFavoriteCards.forEach((x, i) => {
        createCardFinal(activeUser[0].userFavoriteCards, i);
        favorite.classList.add("hidden");
      });

      welcomeMsg.textContent = `Welcome back ${activeUser[0].username}`;
    }
  });

  // If input is wrong put message on button
  username.value = password.value = "";
  loginBtn.textContent = "Wrong Input";
  setTimeout(() => {
    loginBtn.textContent = "Login";
  }, 1500);
});

// Set local storage and get local storage functions

const setStorage = function () {
  localStorage.setItem("account", JSON.stringify(users));
};

const getStorage = function () {
  let local = JSON.parse(localStorage.getItem("account"));
  users = local;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// User logs out, reset active user, put all things as they were before user logged in

logoutBtn.addEventListener("click", function () {
  closeSearchLogout();
  loginRemove(1, 0);
  activeUser = [];
  logoutBtn.classList.add("hidden");
  welcomeMsg.style.opacity = 0;
  welcomeMsg.style.right = "100%";
  container.innerHTML = "";
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Btn for opening search options => Make nice animation for everything, display 100 cards, if they are not yet fetched wait for 6 seconds and add spinner

searchOptionsBtn.addEventListener("click", function () {
  // Set all elements where they need to be
  sectionSearch.style.opacity = 1;
  sectionSearch.style.left = "0";
  searchOptionsBtn.classList.add("hidden");
  container.style.opacity = 1;
  container.style.height = "100vh";
  previousBtn.style.left = 0;
  nextBtn.style.left = 0;
  topPage.style.bottom = "-140px";
  thankYouMsg.style.bottom = "-450px";
  body.style.height = "600vh";
  footer.style.top = 0;
  section4.style.top = "155px";

  // If there is active user, bring all favorites button
  if (activeUser[0]) {
    show.style.opacity = 1;
    show.style.left = 0;
  }

  // Check if array with api is loaded if not put spinner in the middle and wait 10 seconds. There are better ways to do it, but this time I did it like this
  if (!arr[0]) {
    spinner();
    setTimeout(() => {
      container.innerHTML = "";
      arr[0].cards.forEach((x, i) => createCardFinal(arr[0].cards, i));
    }, 10000);
  }
  arr[0].cards.forEach((x, i) => createCardFinal(arr[0].cards, i));
});

///////////////////////////////////////////////////////////////////////////////
// Btn  for closing search options

closeSearchBtn.addEventListener("click", function () {
  closeSearchLogout();
});

///////////////////////////////////////////////////////////////////////////////////////////////
// Testimonials change => I planned to make testimonials here, but it would not look good so I putted only pictures to change

// Array for images that I change on click and event listener
const testimonialsImageArray = [
  "https://crystal-cdn3.crystalcommerce.com/photos/6344442/large/en_oYewlmYojE.png",
  "https://media.wizards.com/legacy/magic/images/mtgcom/fcpics/latest/dl16_large.jpg",
  "https://media.magic.wizards.com/image_legacy_migration/magic/images/mtgcom/fcpics/play/zm28_vvocl8l9i5fmibb3.jpg",
  "https://crystal-cdn3.crystalcommerce.com/photos/4203323/large/undergrowthchampion.jpg",
];

let clickCount = 0;

testimonials.addEventListener("click", function () {
  if (clickCount === testimonialsImageArray.length - 1) {
    clickCount = -1;
  }
  clickCount++;
  testimonials.style.backgroundImage = `url(${testimonialsImageArray[clickCount]})`;
});
