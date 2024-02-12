<!-- Add a link to your live demo in Github Pages 🌐-->

#The assignment

##Part 1: The Personal Website
My personal site is deployed on Github Pages and can be accessed here:
https://rosemulazada.github.io/web-app-from-scratch-2324/

<!-- ☝️ replace this description with a description of your own work -->

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage and Features](#usage-and-features)
- [Checklist / Wishlist](#checklist--wishlist)
- [Process](#process)
- [External Data Sources](#external-data-sources)

## Introduction

We're kicking off the subject of Web Apps from Scratch on February 5th, and we're doing it with a personal website that should hold a JSON file with information about yourself and should receive data from an API. This data must be then collected in the second part of this assignment, the team application, in which the collective data of four sites is gathered to make a new website, for the teachers who can then take the students team apps and create something using that data. It's definitely curious and I'm excited to see how it will end up going! For now, let's start at the basics.

## Installation

Here are the steps to install my project.

1. Under the `Code` tab at the top (the big green button).
2. Download this repository as a `.zip` file and unpack it.
3. Locate the folder `web-app-from-scratch-2324.`
   - If you have `VS Code`: From here, all you need to do is open the folder in your editor and use the `Live Server` extension to start a local host. This allows you to also view the code and work more hands-on, should you desire.
   - If not, you can find the document on your device, navigate to the `index.html` file (this should be visible just by opening up `web-app-from-scratch-2324`), right-click it and open in a browser of your choosing: I can recommend Google Chrome, as this is the browser I've used personally.

## Usage and features

This is how you can use my project.

## Checklist / Wishlist

All of these points and, if necessary, possible revisions will be listed and addressed in detail in the next section: [Process](#process).

1 .✅ Draggable master sword

- Possible revision here for accessibility reasons: dragging is difficult on a keyboard.. View reference for this piece of code in the [External Data Sources](#external-data-sources) section.

2. ✅ Music syncing up with the dragging of the sword and the transition to the next 'page' (more on this in point 3).
   - Initially, I had one full audio element, but this became hard to time since I'd need to time it perfectly with a setInterval(). Later on, I ended up splitting this file into two parts: when the first audio stops, the page transitions, and when it does, the next half plays.
3. ✅ Dynamic page loading (considering this is meant to be a one-pager) ✅
   - Using an object, I'm dynamically updating the content of the page depending on certain trigger actions instead of using several HTML pages.
4.

?. ✅ Pop-up for the 'received items'

## Process

I wasn't sure where to start, I had a lot of things in mind, but I decided to break it down into bite-sized pieces. First things first, the sword. I knew dragging to be a chore to get to work properly (as later came to bite me as well), so I thought it might be wise to start with this.

3. Dynamic page loading:

```javascript
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
```

## External data sources

1. Draggable HTML Element: W3Schools https://www.w3schools.com/howto/howto_js_draggable.asp
2. Cards background https://www.deviantart.com/sunnytp/art/Sheikah-system-wallpaper-1920-1080-764159748
3. Zelda Dialogue Box: https://codepen.io/mHansen/pen/xxZwLVY

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
