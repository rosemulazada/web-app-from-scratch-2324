// a link to the API i'm using: the Hyrule Compendium API
// https://gadhagod.github.io/Hyrule-Compendium-API/#/

// **********************************
// VARIABLES & API/JSON FILE CALLS //
// *********************************
let dataStorage = {};
let flipCard = document.getElementsByClassName("flip-card__back-side");
let hasInteracted = false;
let guardianShieldImgPath;
let p;
let imgElementUrbosa;
let guardianData;

// get the information from this compendium about the guardian stalker entity
async function getGuardianInformation() {
  const response = await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/guardian_stalker`
  );
  // store data in let guardianData
  guardianData = await response.json();
  // log it so i can easily see what i need to access later on.
  console.log("GUARDIAN DATA:", guardianData);
}

// get information about the item guardian shield
async function getGuardianShield() {
  const response = await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/guardian_shield`
  );
  // store data in variable guardianShieldData
  let guardianShieldData = await response.json();
  // log to view data structure
  console.log("GUARDIAN SHIELD DATA:", guardianShieldData);
  // for ease of adding a .src to an image element i will create later, i store it here since it's only one image.
  guardianShieldImgPath = guardianShieldData.data.image;
}

// get personal json file from repo
async function getPersonalData() {
  const response = await fetch("./assets/data-json/personal-data.json");
  // store in let personalData
  personalData = await response.json();
  // log BIO to see ahead of time before i even access the page i need it for whether or not it is found.
  console.log("MY BIO", personalData.favcharactersbio);

  // here, i create a p element and store the necessary data from the json ahead of time, just for ease so i know where to find it should i need to make changes.
  p = document.createElement("p");
  // i use innerHTML here specifically over textContent because the text being appended contains HTML elements that were initially being loaded as strings.
  p.innerHTML = `${personalData.favcharactersbio}`;
  console.log("paragraph", p);
}
// since getGuardianShield and getGuardianInformation are not local files like getPersonalData, i await the promise before any actions are undertaken.
// i do this because, when you would go through the page too fast (fast meaning before the api can retrieve its necessary data, which realistically
// would never happen because it takes 8 seconds) before you can even go to the second page which you still have to go through before you go to the third),
// it still bothered me while editing.
// now, the any images i retrieve from the API will not be appended until the data is ready and the promise is fulfilled.
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([getGuardianShield(), getGuardianInformation()]);
  await getPersonalData();
});

// this variable contains all of my dynamic page data for this project, save from of course the API.
// i store the html of the desired pages in an Object, since this is meant to be a one pager.
// this prevents the need of multiple HTML pages.
const DYNAMIC_PAGES = {
  Pages: {
    "master-sword": `
      <main class="master-sword-main">
      <!--  <div class="zelda--wrap">
          <div class="zelda--dialog--wrap">
            <p class="zelda--name">Rose</p>
            <div class="zelda--dialog--inner">
              <p class="zelda--dialog--text">
                Traveler! Get to know
                <span class="zelda--highlight">Rose</span> by picking up the
                <span class="zelda--highlight">Master Sword</span>! Only you can do it..
              </p>
            </div>
            <div class="zelda--triangle"></div>
          </div>
        </div> -->

        <section id="master-sword-container">
          <section id="master-sword">
            <img src="./assets/images/sharp-mastersword.png" alt="Master Sword"/>
          </section>
        </section>
      </main>
    `,
    "item-popup": `<main class="item-popup-main"></main>`,
    "cards-revealed": `
      <main class="cards-revealed-main">
        <h1 aria-label="Heading: View your cards!">View your cards!</h1>
        <section class="cards-container" role="list" aria-label="About me List">
          <section class="flip-card box" tabindex="0" aria-label="Flip Card">
            <section class="flip-card__front-side" aria-hidden="true">
              <img class="hyrule-crest" src="./assets/images/hyrule-crest-unedited-removebg-preview.png" alt="Hyrule Crest" aria-label="Image: Hyrule Crest"/>
            </section>
            <section class="flip-card__back-side"></section>
          </section>
          <section class="flip-card box" role="group" tabindex="0" aria-label="Flip Card">
            <section class="flip-card__front-side" aria-hidden="true">
              <img class="hyrule-crest" src="./assets/images/hyrule-crest-unedited-removebg-preview.png" alt="Hyrule Crest" aria-label="Image: Hyrule Crest"/>
            </section>
            <section class="flip-card__back-side column-reverse"></section>
          </section>
          <section class="flip-card box" role="group" tabindex="0" aria-label="Flip Card">
            <section class="flip-card__front-side" aria-hidden="true">
              <img class="hyrule-crest" src="./assets/images/hyrule-crest-unedited-removebg-preview.png" alt="Hyrule Crest" aria-label="Image: Hyrule Crest"/>
            </section>
            <section class="flip-card__back-side"></section>
          </section>
        </section>
      </main>
    `,
  },
};

function switchScenes() {
  bodyElement.replaceChild(itemPopup, masterSwordScene);
  bodyElement.classList.remove("master-sword-main-transition");
  function play() {
    let audio = new Audio("./assets/audio/reveal-audio.mp3");
    audio.play();
  }
  play();
}

function checkHasInteracted() {
  if (hasInteracted === true) {
    function play() {
      let audio = new Audio("./assets/audio/buildup-audio.mp3");
      audio.play();
    }
    console.log("hasInteracted is true");
    play();
  } else {
    console.log("hasInteracted is false");
  }
}

const masterSwordScene = new DOMParser().parseFromString(
  DYNAMIC_PAGES.Pages["master-sword"],
  "text/html"
).body.firstChild;

const cardsRevealedScene = new DOMParser().parseFromString(
  DYNAMIC_PAGES.Pages["cards-revealed"],
  "text/html"
).body.firstChild;

const itemPopup = new DOMParser().parseFromString(
  DYNAMIC_PAGES.Pages["item-popup"],
  "text/html"
).body.firstChild;

const bodyElement = document.getElementsByTagName("body")[0];
bodyElement.appendChild(masterSwordScene);

console.log(masterSwordScene.outerHTML);

// hasInteracted = true;
console.log(hasInteracted);

const imageElement = masterSwordScene.querySelector("#master-sword img");

// // Now you can access the image element
// console.log(imageElement);

// if (hasInteracted) {
//   imageElement.addEventListener("click", () => {
//     // Adding a class for animation
//     imageElement.classList.add("master-sword-animation");
//     console.log("clicked");
//     bodyElement.classList.add("master-sword-main-transition");
//     setTimeout(switchScenes, 8000);
//     checkHasInteracted();
//   });
// }

// an iteration was made on the code, but the original can be found here. https://www.w3schools.com/howto/howto_js_draggable.asp
//make the DIV element draggable:
draggableElement(document.getElementById("master-sword-container"));

function draggableElement(draggableElementEvent) {
  var pos1 = 0;
  var pos2 = 0;
  var pos3 = 0;
  var pos4 = 0;

  if (document.getElementById("master-sword")) {
    draggableElementEvent.addEventListener("mousedown", dragMouseDown);
    // draggableElementEvent.addEventListener("click", dragMouseDown);
    draggableElementEvent.addEventListener("touchstart", dragMouseDown);
    // Add keyboard event listeners
    document.addEventListener("keydown", handleKeyDown);
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // var clientX = e.clientX || e.touches[0].clientX;
    var clientY = e.clientY || e.touches[0].clientY;

    // pos3 = clientX;
    pos4 = clientY;

    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("touchend", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("touchmove", elementDrag);
  }

  function elementDrag(e) {
    // var clientX = e.clientX || e.touches[0].clientX;
    var clientY = e.clientY || e.touches[0].clientY;

    // pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    // pos3 = clientX;
    pos4 = clientY;

    draggableElementEvent.style.top =
      draggableElementEvent.offsetTop - pos2 + "px";
    draggableElementEvent.style.left =
      draggableElementEvent.offsetLeft - pos1 + "px";

    let bodyElement = document.getElementsByTagName("body")[0];
    function switchScenes() {
      bodyElement.replaceChild(itemPopup, masterSwordScene);
      bodyElement.classList.remove("master-sword-main-transition");
      function play() {
        let audio = new Audio("./assets/audio/reveal-audio.mp3");
        audio.play();
      }
      play();
    }

    function checkHasInteracted() {
      if (hasInteracted === true) {
        function play() {
          let audio = new Audio("./assets/audio/buildup-audio.mp3");
          audio.play();
        }
        console.log("hasInteracted is true");
        play();
      } else {
        console.log("hasInteracted is false");
      }
    }

    if (clientY < 400 && !hasInteracted) {
      hasInteracted = true;
      bodyElement.classList.add("master-sword-main-transition");
      setTimeout(switchScenes, 8000);
      checkHasInteracted();
    }
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowUp":
        pos2 += 10;
        break;
    }

    draggableElementEvent.style.top =
      draggableElementEvent.offsetTop - pos2 + "px";
    draggableElementEvent.style.left =
      draggableElementEvent.offsetLeft - pos1 + "px";

    function checkHasInteracted() {
      if (hasInteracted === true) {
        function play() {
          let audio = new Audio("./assets/audio/buildup-audio.mp3");
          audio.play();
        }
        console.log("hasInteracted is true");
        play();
      } else {
        console.log("hasInteracted is false");
      }
    }

    if (pos2 > 20 && !hasInteracted) {
      hasInteracted = true;
      bodyElement.classList.add("master-sword-main-transition");
      setTimeout(switchScenes, 8000);
      checkHasInteracted();
      console.log(pos2);
    }
  }

  function closeDragElement() {
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("touchend", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
    document.removeEventListener("touchmove", elementDrag);
    // Remove keyboard event listener
    document.removeEventListener("keydown", handleKeyDown);
  }
}

itemPopup.addEventListener("click", () => {
  // replaces the html for the item popup scene for the cards scene
  bodyElement.replaceChild(cardsRevealedScene, itemPopup);
  flipCard[1].appendChild(p);

  // will later be used to make sure some specific data is properly capitalised, as it isn't done so directly from the api.
  function capitalizeEachWord(string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  // **************************
  // flipCard 0: About me! //
  // *************************
  const developerName = document.createElement("h1");
  const flipCardTwoHeading = document.createElement("h2");

  developerName.textContent = `${personalData.name}`;
  flipCardTwoHeading.textContent = `${personalData.flipCardTwoHeading}`;

  flipCard[1].appendChild(flipCardTwoHeading);
  flipCard[0].appendChild(developerName);

  const personalDataIntroduction = personalData.introduction;

  for (let i = 0; i < personalDataIntroduction.length; i++) {
    const wrapperDiv = document.createElement("div");

    const developerLabel = document.createElement("h3");
    developerLabel.textContent = personalDataIntroduction[i].label || "";

    const developerValue = document.createElement("p");
    developerValue.textContent = personalDataIntroduction[i].value;

    wrapperDiv.appendChild(developerLabel);
    wrapperDiv.appendChild(developerValue);
    flipCard[0].appendChild(wrapperDiv);

    if (i === personalDataIntroduction.length - 1) {
      developerLabel.setAttribute("aria-label", "about me");
    }
  }

  // ********************************************
  // flipCard 1: Favorite Characters from TLOZ //
  // *******************************************
  // CHARACTER NAMES
  const urbosaCharacter = personalData.characternames.find((character) => {
    return character.hasOwnProperty("urbosa");
  }).urbosa;

  const miphaCharacter = personalData.characternames.find((character) => {
    return character.hasOwnProperty("mipha");
  }).mipha;

  const guardianStalkerCharacter = capitalizeEachWord(guardianData.data.name);

  const urbosaSpan = document.getElementById("urbosa-span-element");
  const miphaSpan = document.getElementById("mipha-span-element");
  const guardianStalkersSpan = document.getElementById(
    "guardianstalker-span-element"
  );

  urbosaSpan.innerHTML = urbosaCharacter;
  miphaSpan.innerHTML = miphaCharacter;
  guardianStalkersSpan.innerHTML = `${guardianStalkerCharacter}s, (said no one ever..)`;

  //images
  // retrieve path.
  const urbosaImgPath = personalData.images.find((img) =>
    img.hasOwnProperty("urbosa")
  ).urbosa;
  console.log("URBOSA IMG PATH", urbosaImgPath);
  const miphaImgPath = personalData.images.find((img) =>
    img.hasOwnProperty("mipha")
  ).mipha;
  const guardianStalkerImgPath = guardianData.data.image;

  // retrieve alt text.
  const urbosaAltText = personalData.alttext.find((alt) =>
    alt.hasOwnProperty("urbosa")
  ).urbosa;
  const miphaAltText = personalData.alttext.find((alt) =>
    alt.hasOwnProperty("mipha")
  ).mipha;
  const guardianStalkerAltText = `A Guardian Stalker from Breath of The Wild.`;

  imgElementUrbosa = document.getElementById("urbosa-img-element");
  imgElementUrbosa.src = `${urbosaImgPath}`;
  imgElementUrbosa.alt = `${urbosaAltText}`;

  imgElementMipha = document.getElementById("mipha-img-element");
  imgElementMipha.src = `${miphaImgPath}`;
  imgElementMipha.alt = `${miphaAltText}`;

  // declare img element.
  imgElementGuardianStalker = document.getElementById(
    "guardianstalker-img-element"
  );
  imgElementGuardianStalker.src = `${guardianStalkerImgPath}`;
  imgElementGuardianStalker.alt = `${guardianStalkerAltText}`;

  // flipCard 2: Add other content here if needed

  // flipCard 3: Favorite Other TLOZ Things
  const guardianShieldImg = document.createElement("img");
  guardianShieldImg.src = `${guardianShieldImgPath}`;
  flipCard[2].appendChild(guardianShieldImg);
});
