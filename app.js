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

const mymodalCreate = document.querySelector("#myModalCreate");
const btnModalCreate = document.querySelector(".modalBtnCreate");
const spanModal = document.getElementsByClassName("close")[0];

// Login modal inputs

const btnModalLogin = document.querySelector(".modalBtnLogin");
const mymodalLogin = document.querySelector("#myModalLogin");
const spanModalLogin = document.getElementsByClassName("closeLogin")[0];

//  Card back about modal

const cardBackAbout = document.querySelector(".cardBackImg");
const aboutModal = document.querySelector("#myModalAbout");
const closeAbout = document.querySelector(".closeAbout");

// Modal for more info about cards

const cardsModal = document.querySelector("#cardsModal");
const closeCardsModal = document.querySelector(".closeCardsModal");

///////////////////////////////////////////////////////////////////////////////

//////////////////

/////////////////////////////////////////////////////////////////////////////
// Function for closing search and logging out => So, here I putted everything thats duplicate from search and logout functions, and putted it all in one so code looks nicer

const closeSearchLogout = function () {
  footer.style.top = "-245px";
  nextBtn.style.left = "-100%";
  topPage.style.bottom = "-100px";
  previousBtn.style.left = "-100%";
  section4.style.top = "0";
  container.style.transition = "500ms";
  container.innerHTML = "";
  sectionSearch.style.opacity = 0;
  container.style.opacity = 0;
  container.style.height = 0;
  searchOptionsBtn.classList.remove("hidden");
  setTimeout(() => {
    sectionSearch.style.left = "-100%";
  }, 500);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function for turning first letter to uppercase and rest to lowercase => I dont need this for now, probably gonna delite it !!!!!!!!!!!!!

const convertString = function (str) {
  let arrStr = str.split("");
  let arrStr2 = arrStr[0].toUpperCase();
  let arrStr3 =
    arrStr2 + arrStr.splice(1, arrStr.length).join("").toLowerCase();
  return arrStr3;
};

//////////////////////////////////////////////////////////////////////////////
// Navabr scroll function => navbar animation

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 0);
  if (window.scrollY > 0) {
    header.style.opacity = 1;
  } else {
    header.style.opacity = 0;
  }
});

// Array for keeping the fetched card information in array, so I can work with them
const arr = [];

// Filtered array for rarity cards
let rareCards = [];

// Array for name that we are seeking
let nameArr = [];

// Users array

const users = [];

// Arr for active users

let activeUser = [];

/////////////////////////////////////////////////////////////////////////////////////////
// Fetch methods for api=> I need to reorganize this, and alow user to search cards from API by sets, or names

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

fetch("https://api.magicthegathering.io/v1/cards?set=ktk&page=1")
  .then((res) => res.json())
  .then((x) => arr.push(x))
  .catch((err) => console.log(err));

fetch("https://api.magicthegathering.io/v1/cards?set=ktk&page=2")
  .then((res) => res.json())
  .then((x) => arr.push(x))
  .catch((err) => console.log(err));

fetch("https://api.magicthegathering.io/v1/cards?set=ktk&page=3")
  .then((res) => res.json())
  .then((x) => arr.push(x))
  .catch((err) => console.log(err));

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page slider for cards. Since they only allow up to 100 cards to be fetched at one call I decided to put them in pages

let pageCount = 1;

nextBtn.addEventListener("click", function () {
  if (pageCount === arr.length - 1) {
    pageCount = 0;
  }
  pageCount++;
  nextBtn.textContent = pageCount;
  setTimeout(() => {
    nextBtn.textContent = "Next Page";
  }, 700);
  container.innerHTML = "";
  arr[pageCount].cards.forEach((x, i) => {
    createCardFinal(arr[pageCount].cards, i);
  });
});

previousBtn.addEventListener("click", function () {
  if (pageCount === 1) {
    pageCount = arr.length;
  }
  pageCount--;
  previousBtn.textContent = pageCount;
  setTimeout(() => {
    previousBtn.textContent = "Next Page";
  }, 700);
  container.innerHTML = "";
  arr[pageCount].cards.forEach((x, i) => {
    createCardFinal(arr[pageCount].cards, i);
  });
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
  favorite.innerText = "Favorite";
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
    if (objPath[num].rarity === "Rare") {
      cardRarity.style.color = "gold";
    } else if (objPath[num].rarity === "Common") {
      cardRarity.style.color = "white";
    } else if (objPath[num].rarity === "Uncommon") {
      cardRarity.style.color = "lightgreen";
    } else if (objPath[num].rarity === "Mythic") {
      cardRarity.style.color = "purple";
    }

    console.log("click");
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
  });

  container.append(newCard);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Function for showing all cards avalible => When clicked user gets all cards from every array element

allCards.addEventListener("click", function () {
  container.innerHTML = "";
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Set Btn

const setArr = [];
let setPage = -1;

setBtn.addEventListener("click", function () {
  setPage++;
  let setInput = searchSet.value.slice(0, 2).toLowerCase();
  fetch(
    `https://api.magicthegathering.io/v1/cards?set=${setInput}&page=${setPage}`
  )
    .then((res) => res.json())
    .then((x) => setArr.push(x))
    .catch((err) => console.log(err));
  console.log(setArr);
});

//////////////////////////////////////////////////////////////////////
// Here I search card by name => I putted name in array by unshift method, and then show card on position one from that array

nameBtn.addEventListener("click", function () {
  container.innerHTML = "";
  arr.forEach((y) =>
    y.cards.forEach((x) => {
      if (x.name.toLowerCase() === inputName.value.toLowerCase()) {
        nameArr.unshift(x);
        inputName.value = "";
        if (nameArr.length > 40) {
          nameArr.splice(1, nameArr.length - 1);
        }
      }
    })
  );
  createCardFinal(nameArr, 0);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Show all cards by rarity => Here I putted all cards that I look for in new array then I simply loop over that array and show cards

typeBtn.addEventListener("click", function () {
  rareCards = [];
  container.innerHTML = "";
  arr.forEach((y) =>
    y.cards.forEach((x) => {
      if (x.rarity === inputType.value) {
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
    this.cardSet = [];
  }
}

// Users created by me for app building use

let userOne = new UsersCl("bartul_9", "jasamkralj222");
let userTwo = new UsersCl("mike", "1234");
users.push(userOne, userTwo);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Cretae acc =>  When user clicks Create I create object with his name in it and password and push it to ussers array, also I display welcome message, and remove all elements that need to be removed in nice animation

createBtn.addEventListener("click", function () {
  closeSearchLogout();
  if (createUsername.value === "" || createPassword.value === "") {
    createUsername.value = createPassword.value = "";
    createBtn.textContent = "Wrong input";
    setTimeout(() => (createBtn.textContent = "Create Account"), 1500);
    return;
  }
  createBtn.textContent = "Create Acc";
  let newUser = new UsersCl(createUsername.value, createPassword.value);
  users.push(newUser);
  mymodalCreate.style.display = "none";
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// User logs in => When user logs in, I change active users to user that logged in, and show his favorite cards, also close modal window on log in and change all the other stuff that needs to be changed, also I check if input is valid, if not i display nice message in button

loginBtn.addEventListener("click", function () {
  closeSearchLogout();
  users.forEach((user) => {
    console.log(user);
    if (user.username === username.value && user.password === password.value) {
      console.log(user);
      username.value = password.value = "";
      mymodalLogin.style.display = "none";
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

///////////////////////////////////////////////////////////////////////////////////////////////////
// User logs out, reset active user, put all things as they were before user logged in

logoutBtn.addEventListener("click", function () {
  activeUser = [];
  logoutBtn.classList.add("hidden");
  welcomeMsg.style.opacity = 0;
  welcomeMsg.style.right = "100%";
  btnModalCreate.style.left = 0;
  btnModalLogin.style.left = 0;
  closeSearchLogout();
  setTimeout(() => {
    btnModalCreate.style.opacity = 1;
    btnModalLogin.style.opacity = 1;
  }, 200);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
// Btn for opening search options => Make nice animation for everything, display 100 cards, if they are not yet fetched wait for 6 seconds and add spinner

searchOptionsBtn.addEventListener("click", function () {
  sectionSearch.style.opacity = 1;
  sectionSearch.style.left = "0";
  searchOptionsBtn.classList.add("hidden");
  container.style.opacity = 1;
  container.style.height = "100vh";
  previousBtn.style.left = 0;
  nextBtn.style.left = 0;
  topPage.style.bottom = "-210px";
  footer.style.top = 0;
  section4.style.top = "155px";
  if (!arr[0]) {
    let spinner = document.createElement("div");
    spinner.classList.add("loader");
    container.append(spinner);
    setTimeout(() => {
      container.innerHTML = "";
      arr[0].cards.forEach((x, i) => createCardFinal(arr[0].cards, i));
    }, 6000);
  }

  arr[0].cards.forEach((x, i) => createCardFinal(arr[0].cards, i));
});

//////////////////////////////////////////
// Btn  for closing search options

closeSearchBtn.addEventListener("click", function () {
  closeSearchLogout();
});

///////////////////////////////////////////////////////////////////////////////////////
// Modal window when creatin acc

// When the user clicks the button, open the modal
btnModalCreate.onclick = function () {
  mymodalCreate.style.display = "block";
  setTimeout(() => {
    mymodalCreate.style.opacity = 1;
  }, 50);
};

// When the user clicks on <span> (x), close the modal
spanModal.onclick = function () {
  mymodalCreate.style.display = "none";
  mymodalCreate.style.opacity = 0;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (e) {
  if (e.target == mymodalCreate) {
    mymodalCreate.style.display = "none";
    mymodalCreate.style.opacity = 0;
  }
};

//////////////////////////////////////////////////////////////////////////////
//// Modal for logging  in

// When the user clicks the button, open the modal
btnModalLogin.onclick = function () {
  mymodalLogin.style.display = "block";
  setTimeout(() => {
    mymodalLogin.style.opacity = 1;
  }, 50);
};

// When the user clicks on <span> (x), close the modal
spanModalLogin.onclick = function () {
  mymodalLogin.style.display = "none";
  mymodalLogin.style.opacity = 0;
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == mymodalLogin) {
    mymodalLogin.classList.add("hidden");
  }
};

//////////////////////////////////////////////////////////////
// Modal for about on the main page

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

//////////////////////////////////////////////////////////////
// Testimonials change => now they are just images, ill see if ill add testimonials animation

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
