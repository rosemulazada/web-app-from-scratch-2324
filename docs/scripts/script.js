// a link to the API i'm using: the Hyrule Compendium API
// https://gadhagod.github.io/Hyrule-Compendium-API/#/

//   _____________________________________
// ||     VARIABLES & API CALL         ||
//  _____________________________________
let dataStorage = {};
let apiData; // Replacing 'let data' with 'let apiData'
let imageElement = document.createElement("img");
let dynamicImagePath;
let flipCard = document.getElementsByClassName("flip-card__back-side");
let hasInteracted = false;
// maak een array aan om later alle opgehaalde data uit de API in te storen
// dit doe ik zodat ik straks kan loopen adhv de length van deze data.
let allEntryData = [];

// deze functie neemt als parameter 'entryNumber', dit is het getal van de entry van het karakter dat je wilt oproepen uit de API.
async function getHyruleCompendiumAPI(entryNumber) {
  const response = await fetch(
    `https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${entryNumber}?game=botw`
  );
  dataStorage = await response.json();
  // for ease of access, i store the data json inside another variable called 'data.'
  // this is to prevent having to call keys out of this variable with 'data.data' later on,
  // because of how the object is structured.
  // it's also less confusing for the reader and for myself.
  apiData = dataStorage.data; // Replacing 'data' with 'apiData'
  dynamicImagePath = apiData.image; // Replacing 'data.image' with 'apiData.image'
  // here i log each entry of data i called from the api alongside its respective image in the same log.
  // console.log(apiData, "IMAGE PATH:", dynamicImagePath);

  imageElement.src = `${dynamicImagePath}`;
  imageElement.alt = `${apiData.name}`;

  allEntryData.push({
    entryNumber: entryNumber,
    apiData: apiData, // Replacing 'data' with 'apiData'
    dynamicImagePath: dynamicImagePath,
  });
}

async function getPersonalData() {
  const response = await fetch("./assets/data-json/personal-data.json");
  personalData = await response.json();
  console.log("PERSONAL DATA:", personalData.age);
}

document.addEventListener("DOMContentLoaded", async () => {
  // ik roep de data vooraf op, zodat de pagina de benodigde data om in te laden al heeft.
  // voer de benodigde entryNumbers in.
  // learned something about await; dont forget to document.

  await Promise.all([
    getHyruleCompendiumAPI(155),
    getHyruleCompendiumAPI(156),
    getHyruleCompendiumAPI(157),
    getHyruleCompendiumAPI(158),
  ]);

  getPersonalData();
});

// this variable contains all of my dynamic page data for this project, save from of course the API.
// i store the html of the desired pages in an Object, since this is meant to be a one pager.
// this prevents the need of multiple HTML pages.
const DYNAMIC_PAGES = {
  Pages: {
    "master-sword": `
      <main class="master-sword-main">
      <section id="master-sword-container">
        <section id="master-sword">
          <img src="./assets/images/sharp-mastersword.png" />
        </section>
      </section>
    </main>
    `,
    "item-popup": ` <main class="item-popup-main"></main>`,
    "cards-revealed": `
      <main>
  <section class="cards-container" role="list" aria-label="Skills List">
    <section
      class="flip-card box"
      role="button"
      tabindex="0"
      aria-label="Flip Card"
    >
      <section class="flip-card__front-side" aria-hidden="true">
      </section>
      <section class="flip-card__back-side" aria-hidden="true">
      </section>
    </section>
    <section
      class="flip-card box"
      role="button"
      tabindex="0"
      aria-label="Flip Card"
    >
      <section class="flip-card__front-side" aria-hidden="true"></section>
      <section class="flip-card__back-side" aria-hidden="true"></section>
    </section>
    <section
      class="flip-card box"
      role="button"
      tabindex="0"
      aria-label="Flip Card"
    >
      <section class="flip-card__front-side" aria-hidden="true"></section>
      <section class="flip-card__back-side" aria-hidden="true"></section>
    </section>
    <section
      class="flip-card box"
      role="button"
      tabindex="0"
      aria-label="Flip Card"
    >
      <section class="flip-card__front-side" aria-hidden="true">
      </section>
      <section class="flip-card__back-side" aria-hidden="true">
      </section>
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

    var bodyElement = document.getElementsByTagName("body")[0];
    function switchScenes() {
      bodyElement.replaceChild(itemPopup, masterSwordScene);
      bodyElement.classList.remove("master-sword-main-transition");
      function play() {
        var audio = new Audio("../docs/assets/audio/reveal-audio.mp3");
        audio.play();
      }
      play();
    }

    function checkHasInteracted() {
      if (hasInteracted === true) {
        function play() {
          var audio = new Audio("../docs/assets/audio/buildup-audio.mp3");
          audio.play();
        }
        console.log("hasInteracted is true");
        play();
      } else {
        console.log("hasInteracted is false");
      }
    }

    if (clientY < 500 && !hasInteracted) {
      hasInteracted = true;
      bodyElement.classList.add("master-sword-main-transition");
      setTimeout(switchScenes, 1000);
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

// audio.play().catch((e) => {
//   if (e.code === DOMException.ABORT_ERR) {
//     return
//   }
//   throw e;
// })

itemPopup.addEventListener("click", () => {
  bodyElement.replaceChild(cardsRevealedScene, itemPopup);

  // for (let i = 0; i < allEntryData.length; i++) {
  //   // console.log("ALL ENTRY DATA", allEntryData[i].data.image);
  //   console.log("allEntryData logged with for loop");
  // }

  for (let i = 0; i < flipCard.length; i++) {
    console.log(flipCard[i]);
    let dynamicImageEntry = document.createElement("img");
    let h2Element = document.createElement("h2");
    console.log(h2Element);
    h2Element.textContent = `${allEntryData[i].apiData.name}`;
    dynamicImageEntry.src = `${allEntryData[i].dynamicImagePath}`;
    flipCard[i].appendChild(h2Element);
    flipCard[i].appendChild(dynamicImageEntry.cloneNode());
  }
});
