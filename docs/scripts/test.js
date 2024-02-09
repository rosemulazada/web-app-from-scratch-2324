// _____________________________________
// ||     VARIABLES & API CALL         ||
//  _____________________________________
let dataStorage = {};
let data;
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
  data = dataStorage.data;
  dynamicImagePath = data.image;
  // here i log each entry of data i called from the api alongside its respective image in the same log.
  console.log(data, "IMAGE PATH:", dynamicImagePath);

  imageElement.src = `${dynamicImagePath}`;
  imageElement.alt = `${data.name}`;

  allEntryData.push({
    entryNumber: entryNumber,
    data: data,
    dynamicImagePath: dynamicImagePath,
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  // ik roep de data vooraf op, zodat de pagina de benodigde data om in te laden al heeft.
  // voer de benodigde entryNumbers in.
  await getHyruleCompendiumAPI(155);
  await getHyruleCompendiumAPI(156);
  await getHyruleCompendiumAPI(157);
  await getHyruleCompendiumAPI(158);

  for (let i = 0; i < allEntryData.length; i++) {
    console.log("allEntryData logged with for loop");
  }

  console.log("ALL ENTRY DATA", allEntryData);
});
