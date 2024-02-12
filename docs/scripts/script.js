// a link to the API i'm using: the Hyrule Compendium API
// https://gadhagod.github.io/Hyrule-Compendium-API/#/

// **********************************
// VARIABLES & API/JSON FILE CALLS //
// *********************************
let dataStorage = {};
// let apiData;
// let imageElement = document.createElement("img");
// let dynamicImagePath;
let flipCard = document.getElementsByClassName("flip-card__back-side");
let hasInteracted = false;
let guardianShieldImgPath;
let p;
let imgElementUrbosa;
var guardianData;
// maak een array aan om later alle opgehaalde data uit de API in te storen
// dit doe ik zodat ik straks kan loopen adhv de length van deze data.
// let allEntryData = [];

// deze functie neemt als parameter 'entryNumber', dit is het getal van de entry van het karakter dat je wilt oproepen uit de API.
// async function getHyruleCompendiumAPI(entryNumber) {
//   const response = await fetch(
//     `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${entryNumber}?game=botw`
//   );
//   dataStorage = await response.json();
//   // for ease of access, i store the data json inside another variable called 'data.'
//   // this is to prevent having to call keys out of this variable with 'data.data' later on,
//   // because of how the object is structured.
//   // it's also less confusing for the reader and for myself.
//   apiData = dataStorage.data;
//   dynamicImagePath = apiData.image;
//   // here i log each entry of data i called from the api alongside its respective image in the same log.
//   // console.log(apiData, "IMAGE PATH:", dynamicImagePath);

//   imageElement.src = `${dynamicImagePath}`;
//   imageElement.alt = `${apiData.name}`;

//   // allEntryData.push({
//   //   entryNumber: entryNumber,
//   //   apiData: apiData,
//   //   dynamicImagePath: dynamicImagePath,
//   // });
// }

async function getGuardianInformation() {
  const response = await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/guardian_stalker`
  );
  guardianData = await response.json();
  console.log("GUARDIAN DATA:", guardianData);
}

async function getGuardianShield() {
  const response = await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/guardian_shield`
  );
  let guardianShieldData = await response.json();
  console.log("GUARDIAN SHIELD DATA:", guardianShieldData);
  guardianShieldImgPath = guardianShieldData.data.image;
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    // getHyruleCompendiumAPI(155),
    getGuardianShield(),
    getGuardianInformation(),
  ]);

  await getPersonalData();
});

async function getPersonalData() {
  const response = await fetch("./assets/data-json/personal-data.json");
  personalData = await response.json();

  console.log("MY BIO", personalData.favcharactersbio);

  p = document.createElement("p");
  p.innerHTML = `${personalData.favcharactersbio}`;
  console.log("paragraph", p);
}

// this variable contains all of my dynamic page data for this project, save from of course the API.
// i store the html of the desired pages in an Object, since this is meant to be a one pager.
// this prevents the need of multiple HTML pages.
const DYNAMIC_PAGES = {
  Pages: {
    "master-sword": `
      <main class="master-sword-main">
        <div class="zelda--wrap">
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
        </div>

        <section id="master-sword-container">
          <section id="master-sword">
            <img src="./assets/images/sharp-mastersword.png" />
          </section>
        </section>
      </main>
    `,
    "item-popup": `<main class="item-popup-main"></main>`,
    "cards-revealed": `
      <main class="cards-revealed-main">
        <h1>View your cards!</h1>
        <section class="cards-container" role="list" aria-label="Skills List">
          <section class="flip-card box" tabindex="0" aria-label="Flip Card">
            <section class="flip-card__front-side" aria-hidden="true">
              <img class="hyrule-crest" src="./assets/images/hyrule-crest-unedited-removebg-preview.png" alt="Hyrule Crest">
            </section>
            <section class="flip-card__back-side" aria-hidden="true"></section>
          </section>
          <section class="flip-card box" role="group" tabindex="0" aria-label="Flip Card">
            <section class="flip-card__front-side" aria-hidden="true">
              <img class="hyrule-crest" src="./assets/images/hyrule-crest-unedited-removebg-preview.png" alt="Hyrule Crest">
            </section>
            <section class="flip-card__back-side" aria-hidden="true"></section>
          </section>
          <section class="flip-card box" role="group" tabindex="0" aria-label="Flip Card">
            <section class="flip-card__front-side" aria-hidden="true">
              <img class="hyrule-crest" src="./assets/images/hyrule-crest-unedited-removebg-preview.png" alt="Hyrule Crest">
            </section>
            <section class="flip-card__back-side" aria-hidden="true"></section>
          </section>
        </section>
      </main>
    `,
  },
};

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

// an iteration was made on the code, but the original can be found here. https://www.w3schools.com/howto/howto_js_draggable.asp
//Make the DIV element draggable:
draggableElement(document.getElementById("master-sword-container"));

function draggableElement(draggableElementEvent) {
  var pos1 = 0;
  //   pos2 = 0,
  //   pos3 = 0,
  //   pos4 = 0;

  // Check for both mousedown and touchstart events
  if (document.getElementById("master-sword")) {
    draggableElementEvent.addEventListener("mousedown", dragMouseDown);
    draggableElementEvent.addEventListener("touchstart", dragMouseDown);
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // Check if the event is a touch event and get the correct coordinates
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

  function closeDragElement() {
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("touchend", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
    document.removeEventListener("touchmove", elementDrag);
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
  const developerName = document.createElement("h2");
  developerName.textContent = `${personalData.name}`;
  flipCard[0].appendChild(developerName);

  const personalDataIntroduction =
    personalData.pagetitles[0].cardsrevealed[0].flipCardOne[0].introduction;

  // Loop over the 'storage' array
  for (let i = 0; i < personalDataIntroduction.length; i++) {
    // Create a wrapping div for each set of elements
    const wrapperDiv = document.createElement("div");

    const developerLabel = document.createElement("h3");
    developerLabel.textContent = personalDataIntroduction[i].label || ""; // Use 'storage' instead of 'personalData.introduction'

    const developerValue = document.createElement("p");
    developerValue.textContent = personalDataIntroduction[i].value;

    wrapperDiv.appendChild(developerLabel);
    wrapperDiv.appendChild(developerValue);

    flipCard[0].appendChild(wrapperDiv);
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
