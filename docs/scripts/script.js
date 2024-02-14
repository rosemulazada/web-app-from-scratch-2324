/**============================================
 *              THE API I USED
 *=============================================**/
// https://gadhagod.github.io/Hyrule-Compendium-API/#/

/**============================================
 *       VARIABLES & API/JSON FILE CALLS
 *=============================================**/

let dataStorage = {};
let flipCard = document.getElementsByClassName("flip-card__back-side");
const bodyElement = document.getElementsByTagName("body")[0];
let hasInteracted = false;
let guardianShieldImgPath;
let p;
let imgElementUrbosa;
let guardianData;

/**======================
 *    Guardian DATA
 *========================**/
async function getGuardianInformation() {
  const response = await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/guardian_stalker`
  );
  guardianData = await response.json();
  // I log the data here so I can easily see the structure.
  console.log("GUARDIAN DATA:", guardianData);
}

/**======================
 *  Guardian Shield DATA
 *========================**/
async function getGuardianShield() {
  const response = await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/guardian_shield`
  );
  let guardianShieldData = await response.json();
  console.log("GUARDIAN SHIELD DATA:", guardianShieldData);
  // For ease of adding a .src to an image element I will create later, I store its path here, since it's only one image.
  guardianShieldImgPath = guardianShieldData.data.image;
  guardianShieldImgAlt = guardianShieldData.data.name;
}

/**======================
 *     Get JSON Data
 *========================**/
async function getPersonalData() {
  const response = await fetch("./assets/data-json/personal-data.json");
  personalData = await response.json();
  // Log BIO to see ahead of time before I even access the page I need the data for whether or not it was succesfully retrieved.
  console.log("MY BIO", personalData.favcharactersbio);

  // Here, I create a p element and store the necessary data from the json ahead of time, just for ease so i know where to find it should i need to make changes.
  p = document.createElement("p");
  // I use innerHTML here specifically over textContent because the text being appended contains HTML elements that were initially being loaded as strings.
  // I do not need to manipulate the HTML in the strings more than this, so innerHTML is appropriate rather than DOMParser().
  p.innerHTML = `${personalData.favcharactersbio}`;
}

// getGuardianShield and getGuardianInformation are not local files, but from an API, so I await the promise before anything else.
// This avoids the occurence where an image from an API is 'appended' before it is retrieved, leaving you with.. nothing.
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([getGuardianShield(), getGuardianInformation()]);
  await getPersonalData();
});

// Loading the HTML dynamically avoids the needs for several HTML files, and makes this, technically, still a one-pager.
const DYNAMIC_PAGES = {
  Pages: {
    "master-sword": `
      <main class="master-sword-main black">
        <section class="zelda--wrap">
          <section class="zelda--dialog--wrap">
            <p class="zelda--name">
              Rose
            </p>
            <section class="zelda--dialog--inner">
              <p class="zelda--dialog--text">
                Traveler! Get to know <span class="zelda--highlight">me</span> by picking up the <span class="zelda--highlight">Master Sword</span>! Only you can do it..
              </p>
            </section>
            <section class="zelda--triangle"></section>
          </section>
        </section>
        <section id="master-sword-container">
          <section id="master-sword">
            <img src="./assets/images/sharp-mastersword.png" alt="Master Sword"/>
          </section>
        </section>
        <section class="black"></section>
      </main>
    `,
    "item-popup": `<main class="item-popup-main">
      <section class="zelda--wrap">
        <section class="zelda--dialog--wrap">
          <section class="zelda--dialog--inner">
            <section id="deck-row">
              <img class="stacked-cards" src="./assets/images/stacked-cards.png" alt="Stacked deck of cards.">
            </section>
            <section id="deck-column">
              <h1>Deck of Cards</h1>
              <span></span>
              <p>The Master Sword's spirit revealed to you.. deck of cards? What could these contain?</p>
            </section>
          </section>
          <section class="zelda--triangle"></section>
        </section>
      </section>
    </main>`,
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
            <section class="flip-card__back-side"></section>
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

/**============================================
 *         SAVE HTML PAGES IN VARIABLES
 *=============================================**/
const masterSwordScene = new DOMParser().parseFromString(
  DYNAMIC_PAGES.Pages["master-sword"],
  "text/html"
).body;

const cardsRevealedScene = new DOMParser().parseFromString(
  DYNAMIC_PAGES.Pages["cards-revealed"],
  "text/html"
).body.firstChild;

const itemPopup = new DOMParser().parseFromString(
  DYNAMIC_PAGES.Pages["item-popup"],
  "text/html"
).body.firstChild;

// This is the first page and should be visible immediately, so I append it here. I feel safe doing it outside of any function because it is meant to be first under all circumstances.
bodyElement.appendChild(masterSwordScene);

const zeldaDialogueMasterSword =
  document.getElementsByClassName("zelda--wrap")[0];
console.log(zeldaDialogueMasterSword);
const mainMasterSword = document.getElementsByClassName("master-sword-main")[0];
zeldaDialogueMasterSword.addEventListener("click", () => {
  mainMasterSword.classList.add("zelda--wrap-invisible");
});

/**============================================
 *               DRAGGING
 *=============================================**/
draggableElement(document.getElementById("master-sword-container"));

function draggableElement(draggableElementEvent) {
  var pos1 = 0;
  var pos2 = 0;
  var pos4 = 0;

  if (document.getElementById("master-sword")) {
    draggableElementEvent.addEventListener("mousedown", dragMouseDown);
    draggableElementEvent.addEventListener("touchstart", dragMouseDown);
    document.addEventListener("keydown", handleKeyDown);
  }

  function dragMouseDown(e) {
    e.preventDefault();
    var clientY = e.clientY || e.touches[0].clientY;

    pos4 = clientY;

    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("touchend", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("touchmove", elementDrag);
  }

  /**============================================
   *         SWITCH SCENES & PLAY BUILDUP
   *=============================================**/
  function switchScenes() {
    bodyElement.replaceChild(itemPopup, masterSwordScene);
    bodyElement.classList.remove("master-sword-main-transition");
    function play() {
      let audio = new Audio("./assets/audio/reveal-audio.mp3");
      audio.play();
    }
    play();
  }

  /**============================================
   *       CHECK IF = TRUE & PLAY REVEAL
   *=============================================**/
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

  function elementDrag(e) {
    var clientY = e.clientY || e.touches[0].clientY;

    pos2 = pos4 - clientY;
    pos4 = clientY;

    draggableElementEvent.style.top =
      draggableElementEvent.offsetTop - pos2 + "px";
    draggableElementEvent.style.left =
      draggableElementEvent.offsetLeft - pos1 + "px";

    if (clientY < 500 && !hasInteracted) {
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
    document.removeEventListener("keydown", handleKeyDown);
  }
}

itemPopup.addEventListener("click", () => {
  bodyElement.replaceChild(cardsRevealedScene, itemPopup);

  // Will later be used to make sure some specific data is properly capitalised, as it isn't done so directly from the API.
  function capitalizeEachWord(string) {
    return string.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  /**======================
   *    ABOUT ME: CARD 0
   *========================**/
  // My name
  const developerName = document.createElement("h1");
  // The 'about me' heading
  const aboutMeHeading = document.createElement("h2");

  developerName.textContent = `${personalData.name}`;
  aboutMeHeading.textContent = `${personalData.flipCardTwoHeading}`;

  flipCard[1].appendChild(aboutMeHeading);
  flipCard[0].appendChild(developerName);
  // append the 'p' from earlier: this is the bio we selected in the getPersonalData function
  flipCard[1].appendChild(p);

  // Gather the array of object with introduction information about me in this variable
  const personalDataIntroduction = personalData.introduction;

  // Appends all the labels and values in the introduction object array as divs with nested respective h3's and p's to the first card only.
  for (let i = 0; i < personalDataIntroduction.length; i++) {
    const wrapperDiv = document.createElement("div");

    const developerLabel = document.createElement("h3");
    developerLabel.textContent = personalDataIntroduction[i].label || "";

    const developerValue = document.createElement("p");
    developerValue.textContent = personalDataIntroduction[i].value;

    wrapperDiv.appendChild(developerLabel);
    wrapperDiv.appendChild(developerValue);
    flipCard[0].appendChild(wrapperDiv);

    // Dynamically set aria label so it can be read properly, it was previously read as 'ABOUT M-E'.
    // Has to be done this way since the element was created in JavaScript.
    if (i === personalDataIntroduction.length - 1) {
      developerLabel.setAttribute("aria-label", "about me");
    }
  }

  /**======================
   *    FAV CHARS: CARD 2
   *========================**/
  // Character names
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

  // Images
  // Retrieve path
  const urbosaImgPath = personalData.images.find((img) =>
    img.hasOwnProperty("urbosa")
  ).urbosa;
  console.log("URBOSA IMG PATH", urbosaImgPath);
  const miphaImgPath = personalData.images.find((img) =>
    img.hasOwnProperty("mipha")
  ).mipha;
  const guardianStalkerImgPath = guardianData.data.image;

  // Retrieve alt text
  const urbosaAltText = personalData.alttext.find((alt) =>
    alt.hasOwnProperty("urbosa")
  ).urbosa;
  const miphaAltText = personalData.alttext.find((alt) =>
    alt.hasOwnProperty("mipha")
  ).mipha;
  const guardianStalkerAltText = `A Guardian Stalker from Breath of The Wild.`;

  // Set all
  imgElementUrbosa = document.getElementById("urbosa-img-element");
  imgElementUrbosa.src = `${urbosaImgPath}`;
  imgElementUrbosa.alt = `${urbosaAltText}`;

  // Append all
  imgElementMipha = document.getElementById("mipha-img-element");
  imgElementMipha.src = `${miphaImgPath}`;
  imgElementMipha.alt = `${miphaAltText}`;

  // Guardian Stalker: select img element in HTML
  imgElementGuardianStalker = document.getElementById(
    "guardianstalker-img-element"
  );
  // Set values with data variable gathered from getGuardianInformation()
  imgElementGuardianStalker.src = `${guardianStalkerImgPath}`;
  imgElementGuardianStalker.alt = `${guardianStalkerAltText}`;

  // flipCard 3: Favorite Other TLOZ Things
  const favWeaponHeading = document.createElement("h2");
  favWeaponHeading.textContent = `Most used weapon`;
  flipCard[2].appendChild(favWeaponHeading);

  const weaponParagraph = document.createElement("p");
  weaponParagraph.textContent = `Well.. I did say that I like fighting ${guardianData.data.name}s most, so, this shoould not be a surprise.`;
  flipCard[2].appendChild(weaponParagraph);

  const guardianShieldImg = document.createElement("img");
  guardianShieldImg.src = `${guardianShieldImgPath}`;
  guardianShieldImg.alt = `${guardianShieldImgAlt}`;
  guardianShieldImg.style.width = "200px";
  guardianShieldImg.style.margin = "1rem auto";
  flipCard[2].appendChild(guardianShieldImg);
});
