# The assignment

## Part 1: The Personal Website

My personal site is deployed on Github Pages and can be accessed here:
https://rosemulazada.github.io/web-app-from-scratch-2324/

Here I will be discussing the how's and what's of the project. For detailed information about the actual process, please see my Wiki at the top of this page.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage and Features](#usage-and-features)
- [Reflection](#Reflection)
- [Version log](#version-log)
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

This project is mainly meant as an experiment of sorts; we pull data from our JSON file and an API, then, in turn, we pull that data from each of the members to our team app, and the teachers then pull all our team app data to one application for the entire class. Pretty cool.

This personal site had to be all about us; so, essentially, you can use it to get to know me a little..! Or as a base for a fun, interactive code. That also works.

The 'star of the show' in that regard would certainly be the last page, in my own opinion, where you have to turn the cards to reveal dynamic data.

It's features are as follows:

- Drag feature
- CSS Transitions
- Popup dialogue boxes
- Cards that you can actually turn
- Dynamic page loading
- **Dynamic HTML content (images/text) (API and JSON FILE)**

## Reflection

Of course, no project is without its ups and downs. So here, I have a checklist or wishlist of sorts, sorted into three categories:

### Things I wanted to achieve, and did!

- The dragging effect of the sword
- Wrote useful loops instead of doing things one-by-one
- Made the site fully accessible
- The audio effect really seals the deal and is synced nicely!
- Sought things out myself as much as I possibly could, or asked teammates if they knew of a way to achieve what I was struggling with, before consulting anything else
- Dynamic page loading
- Dynamic HTML content (images/text) (API and JSON file)

### Things I managed, but would have loved to do better

- Smoother between the pages (exclude the first page transition to the second)
- Made as little unnecessary new functions as possible (as in, if it can happen inside another function, do it there instead of making a separate one)
- Grouped functions and such together 'neatly'

### Things I couldn't do or had to omit

- More advanced animations
- A (fleshed out) third card
- Make a more convincing sword (it's cut in half currently hah)
- A black overlay behind the dialogue text that fades out when you click the dialogue box away
- Dialogue sound effects like in TLoZ games
- The slightly off-center triangle in the dialogue boxes.. if you hadn't noticed it before, you will now. Sorry.

That's just about the project itself though; there are other things not directly related to it that I find worthy of being reflected on. I'm beginning to build up my confidence as a developer, and I recognise that there is A) a lot to learn that has been out for long and B) forever and always something that will be the next hot thing to learn. But I have to say that I have the idea that I've expanded my knowledge so much in the span of this mini-project, and I could do so while creating something that I truly enjoy! So it was a win-win for me on all fronts.. and ends, badum tss.

But really. From Git to Github and Vercel and Pull Requests and whatnot, this little project allowed me the space to experiment with what I really wanted to learn, and I feel as though I am really setting my foot into the Front End Developer world, and it's nice to finally be able to speak to like-minded people, and like-minded people who I don't have to dumb down my code to, at that. So I'm excited to see what follows!

## Version log

### WAFS V1: Feb. 5th, '24

I committed my stylesheet. Seemingly, I couldn't remember to commit any more than that, that day.

### WAFS V2: Feb. 6th, '24

More than just a stylesheet, this time!

- A horizontally scrollable list of cards that could be flipped. (These cards could not be read with a screenreader yet, however).
- Immediately made responsive!

### WAFS V3: Feb. 8th, '24

- Dynamic page loading functional, proper triggers are in place
- API connected and loads images into cards.

### WAFS V4: Feb. 9th, '24

- Created an array that gathers all the entries from the API into an array.
- Wrote a for loop that loops over the four (at the time) cards I had, and appended the same image from the API to each one.

### WAFS V5: Feb. 10th, '24

- Able to log JSON data
- Edited the for loop to append a different entry image and name from the API to the four cards.

### WAFS V6: Feb. 11th, '24

- Removed said loop, change of plans in the concept.
- Updated README.md

### WAFS V7: Feb. 12th, '24

- Accidentally edited README.md remotely. Had to execute a `git push -f main` to overwrite this.
- In the meantime, while I had appended all my personal data to the cards dynamically, and combined this with the API where necessary to load in Champion names and Monster names/images.
- API did not have Champion images, unfortunately, so these are sourced from my personal JSON file.
- Added main styling to the cards section of the document (the styling you see today).
- Added favicon.
- Experimented with a version of the site where the sword would move on click, but this was removed.
- Added aria-labels and tab-indexes to cards so a screenreader can read and navigate it as intended.
- Master Sword can be controlled with the arrow up key for people using a screenreader or otherwise navigating using the keyboard.

### WAFS V8: Feb. 13th, '24

- Added dialog boxes to first- and second pages.
- Made dialog box on first page disappear on click

### WAFS V9: Feb. 14th, '24

- Cleaned up the code

## External data sources

1. [The flip cards CSS tutorial I used](https://www.youtube.com/watch?v=OenXGHmL48U&list=PL6UM04F9igDbjpbkKYuFnUvn6eNGOJlHT&index=13)
2. [W3Schools draggable element](https://www.w3schools.com/howto/howto_js_draggable.asp)
3. [The article about alternatives to innerHTML and appendChild()](https://marian-caikovski.medium.com/modern-alternatives-to-innerhtml-and-appendchild-296b9e5a5d28)
4. [The origin of the audio file I used](https://www.youtube.com/watch?v=OenXGHmL48U&list=PL6UM04F9igDbjpbkKYuFnUvn6eNGOJlHT&index=13)
5. [The Hyrule Compendium API](https://github.com/rosemulazada/web-app-from-scratch-2324/wiki/Hyrule-Compendium-API-&-Personal-Data-JSON)
6. [Difference between window.onload and document.ready](<https://www.edureka.co/community/183588/difference-between-window-load-and-document-readyfunctions#:~:text=The%20key%20difference%20between%20%24(,before%20all%20images%2Ciframes%20etc.)>)
7. [How to detect arrow key presses in JavaScript](https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript)
8. [The Zelda dialog box-popup](https://codepen.io/mHansen/pen/xxZwLVY)
9. [Background on the 'dynamic cards revealed' page](https://www.deviantart.com/sunnytp/art/Sheikah-system-wallpaper-1920-1080-764159748)
10. [The Hyrule Crest on the back of the cards](https://i.ebayimg.com/images/g/~aEAAOSwCQlZ7oE8/s-l1200.webp);
11. [The glass effect on the cards](https://css.glass/)
12. [The filter CSS property on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
13. [The used font: Hylia Serif](https://zeldauniverse.net/media/fonts/)
14. [The forest image used on the second page](https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-legend-of-zelda-breath-of-the-wild-2/0/0f/Korok_Forest.jpg?width=1024)
15. [The master sword image (background)](https://assetsio.reedpopcdn.com/zelda-breath-of-the-wild-meesterzwaard-master-sword-krijgen-1489684398301.jpg?width=690&quality=75&format=jpg&dpr=2&auto=webp)
16. [The Master Sword itself](https://preview.redd.it/c1dnsj3xn9e41.jpg?width=1080&crop=smart&auto=webp&s=c798ef8ef1a9b08f687fbfceb03bca5a39294319)
17. [Photo of Mipha from BOTW](https://zeldawiki.wiki/wiki/File:BotW_Mipha_Artwork.png)
18. [Photo of Urbosa from BOTW](https://zeldawiki.wiki/wiki/File:BotW_Urbosa_Artwork.png)
19. [Word boundaries for selecting the first letter of each word in a string](https://stackoverflow.com/questions/8279859/get-first-letter-of-each-word-in-a-string-in-javascript)
