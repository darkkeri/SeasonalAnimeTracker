
# Anime Tracker

This project is a website that I made as a part of my engineering studies. The website includes a home page with a small introduction and a page for tracking currently airing anime. It's hosted with Github Pages. 

Link to website: https://darkkeri.github.io/SeasonalAnimeTracker

## WEB-SOVELLUSTEN PERUSTEET - Course Evaluation Criteria
I will now go through each of the evaluation criteria with explanations of my implementation and line numbers with example code snippets.
## HTML (25%)

### 1/5: Basic HTML structure is present.
Both of my HTML files have a basic HTML structure. (index.html, anime.html)

### 2/5: HTML structure with clear content differentiation (headings, paragraphs, lists)
I use clear content differentiation all the way through my HTML files. (index.html, anime.html)

### 3/5: Use of forms, links, and media.
#### Form 
anime.html lines 84-88: 
```
<form id="usernameform">
                    <label id="usernamelabel" for="username">Anilist Username:</label>
                    <input id="usernameinput" type="text" name="username" placeholder="(Optional) Default: Elpmaxeanime">
                    <input id="refreshbutton" type="submit" value="Refresh">
                </form>
               
```
anime.js lines 3, 248-255:
```
const usernameForm = document.getElementById("usernameform");
``` 
```
usernameForm.addEventListener("submit", function(event){
    event.preventDefault();
    if(document.getElementById("usernameinput").value != ""){
    variables.userName = document.getElementById("usernameinput").value;
    }
    usernameForm.reset();
    getAnimeData();
});
``` 
#### Links
index.html lines 14-20, 51-57:
```
<li><a href="index.html">Home</a></li>
                <li><a href="anime.html">Anime Tracker</a></li>
            </ul>

            <ul>
                <div id="GitLogo">
                    <a href="https://github.com/darkkeri"><img alt="GitHub logo link" src="images/github-logo.png"></a>
``` 
```
<div class="footer-content">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="https://github.com/darkkeri">My Github</a></li>
                <li><a href="https://github.com/darkkeri/SeasonalAnimeTracker">Project GitHub</a></li> 
            </ul>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Mikael Anttila. All Rights Reserved.</p>
            <p>Powered by <a href="https://docs.anilist.co/">AniList API</a></p>
        </div>
``` 
#### Media
My website has a favicon and many images fetched from the AniList API for the Seasonal Calendar in the Anime Tracker tab. Also a demo image on the home page explaining how to use the website.

### 4/5: Tables are effectively used.  
In the Anime tab there is a Seasonal Ranking that utilizes a table to display currently airing anime ranked by user given score. You can press the Title or Score headers to sort the table by Title or Score. Pressing either header twice changes the order from descending to ascending. Data in the table aside from headers is created by iterating through object arrays that have been filled with data from the AniList API.

Code Examples:

anime.html lines 90-96: This is the basic structure in HTML
```
<table id="rankingtable">
                    <tr>
                        <th id="rankheader">Rank</th>
                        <th id="titleheader">Title</th>
                        <th id="scoreheader">Score</th>
                    </tr>
                </table>
``` 
anime.js lines 153-170(Creating a row of data for table), 173-194(Iterating through array to create table), 199-226(Sorting table based on user input), 231-234(Deleting table rows): Function to create one ranking entry row in the table
```
function createRankingEntry(anime, rank){
    let row = document.createElement("tr");
    let rankSpot = document.createElement("td");
    let titleSpot = document.createElement("td");
    let scoreSpot = document.createElement("td");
    rankSpot.classList.add("rank");
    scoreSpot.classList.add("score");

    rankSpot.textContent = rank.toString();
    titleSpot.textContent = anime.englishTitle;
    scoreSpot.textContent = anime.score;

    row.classList.add("rankingRow");
    row.appendChild(rankSpot);
    row.appendChild(titleSpot);
    row.appendChild(scoreSpot);

    document.querySelector("#rankingtable").appendChild(row);
}
``` 
anime.css: Styling of the table 
```
th::selection {
    background-color: transparent;
}
table{
    margin-top: 5px;
}
table, th, td {
    border-collapse: collapse;
    padding: 5px
}
#scoreheader, #rankheader, .rank, .score {
    text-align: center;
}
#titleheader{
    text-align: left;  
}
#titleheader:hover{
    background-color:#4b3673;
    border-radius: 7px;
    cursor: pointer;
}
#scoreheader:hover{
    background-color:#4b3673;
    border-radius: 7px;
    cursor: pointer;
}
table{
    border-radius: 9px;
    overflow: hidden;
    
}
tr:nth-child(even){
    background-color:rgba(92,67,142, 0.5);
}
tr:nth-child(odd){
    background-color: rgba(119, 94, 169, 0.5);
}
``` 
### 5/5: Consistent use of semantic HTML throughout, ensuring better structure and understanding of the content.  
My website uses a clear main structure for the body in both HTML files: 
```
<body>
    <header>
        <nav><nav>
    <header>

    <main><main>
    
    <footer><footer>
<body>
``` 
In addition to a clear semantic structure here is an example of elements with descriptive classes that describe the content inside

anime.html lines 29-77:
```
        <div class="calendar">
            <div class="calendarheader">
                <h2>Weekly Calendar</h2>
            </div>
            <div class="calendargrid">
                <div class="daymarker" id="monmarker">
                    <h3>M</h3>
                    <h3>O</h3>
                    <h3>N</h3>
                </div>
                <div class="daymarker" id="tuemarker">
                    <h3>T</h3> 
                    <h3>U</h3>
                    <h3>E</h3>
                </div>
                <div class="daymarker" id="wedmarker">
                    <h3>W</h3> 
                    <h3>E</h3>
                    <h3>D</h3>
                </div>
                <div class="daymarker" id="thumarker">
                    <h3>T</h3> 
                    <h3>H</h3>
                    <h3>U</h3>
                </div>
                <div class="daymarker" id="frimarker">
                    <h3>F</h3> 
                    <h3>R</h3>
                    <h3>I</h3>
                </div>
                <div class="daymarker" id="satmarker">
                    <h3>S</h3>
                    <h3>A</h3>
                    <h3>T</h3>
                </div>
                <div class="daymarker" id="sunmarker">
                    <h3>S</h3>
                    <h3>U</h3>
                    <h3>N</h3>
                </div>
                <div class="weekday" id="mon"></div>
                <div class="weekday" id="tue"></div>
                <div class="weekday" id="wed"></div>
                <div class="weekday" id="thu"></div>
                <div class="weekday" id="fri"></div>
                <div class="weekday" id="sat"></div>
                <div class="weekday" id="sun"></div>
            </div>
        </div>
``` 

---

## CSS (25%)

### 1/5: Basic CSS styling (colors, fonts).  
I use lots of basic styling in common.css, index.css and anime.css. 
### 2/5: Use of classes and IDs to style specific elements.  
I use lots of classes and ID for styling in common.css, index.css and anime.css. 

### 3/5: Implementation of responsive design elements.  
By using grids and flexboxes selectively I was able to make the Anime Tracker responsive without media queries. The home page isn't very complicated so it works well also. Try it out on mobile!

### 4/5: Use of layouts for advanced user interfaces (arrays, float, flexbox, css grid)
common.css: lines 13-45(flexbox: navigation bar) 

index.css: lines 28-31(float: image next to paragraph)

anime.css:

 lines 1-9(flexbox: includes Weekly Calendar div and Seasonal Ranking table div), lines 15-93(grid: structure of the Weekly Calendar), lines 94-111(flexbox: anime cover images inside correct weekdays)



### 5/5: Styling demonstrates a strong grasp of layout principles, aesthetics, and user experience.
My websites layout combines grids and flexboxes so that media queries are not needed for responsivity. The layout of Anime Tracker is also very scalable for the amount of entries someone could realistically watch at a time. 

The website also has a consistent color scheme that is nice to look at.

The cover images in the weekly calendar

I also use many hover stylings to indicate clickability of an element at lines: 

common.css: lines 38-41, 64-66

anime.css: lines 154-157, 181-190

---

## JavaScript Basics (25%)

### 1/5: Simple interactions (like alerts on button click).  
anime.js: line 63(alert when user tries to press refresh button and is API rate limited), lines 81-83(alert for errors related to API fetch "User not found" etc.) 

### 2/5: Multiple event listeners and basic DOM manipulations.  
#### Event Listeners
anime.js: lines 242-256(Adding 4 different event listeners)
#### Basic DOM manipulations
anime.js: lines 248-253(Handling Form submission), lines 141-240(Bunch of functions to create, change and delete DOM elements)  

### 3/5: Use of arrays, objects, and functions.  
In the anime.js file there are tons of arrays, objects and functions used in lines 6-9 and lines 38-256.

### 4/5: Advanced logic, looping through data, and dynamic DOM updates.  
#### Advanced Logic
Advanced logic like if-statements are used througout the anime.js file. 
#### Looping through data
anime.js lines 123-135, 179-193, 222-224, 229, 233

#### Dynamic DOM updates
The DOM updates I mentioned earlier in the Basic DOM manipulations section are dynamic. 

anime.js: lines 248-253(Handling Form submission), lines 141-240(Bunch of functions to create, change and delete DOM elements)
### 5/5: Consistent use of Object-Oriented JavaScript principles.  
I heavily utilize objects and use object-oriented javascript principles throughout the anime.js file but here are some example lines of the more heavy usage:

anime.js: lines 6-9, 86-139, 173-194

---

## Asynchronous Operations (25%)

### 1/5: Use of timers.  
anime.js: lines 237-239(Error message that dissapears after 10 seconds made with setTimeout()), lines 53-56(Rate Limiter for the API that lasts 60 seconds)

### 2/5: Successful implementation of an AJAX call or Fetch.  
Successfully implemented Fetch from AniList API in anime.js: lines 4-84.

### 3/5: Data from the asynchronous call is displayed on the webpage.
In the Anime Tracker tab there is a Weekly Calendar and Seasonal Ranking that get their data from an asyncronous call to the AniList API. 

### 4/5: Error handling is implemented (for failed API calls, etc.). 
anime.js: lines 51-58, 75-84



### 5/5: Effective use of asynchronous data to enhance user experience (like filtering, sorting)
Overview of handling and using asynchronous data to enhance user experience:

Fetching data from the AniList API happens when the user either loads the page, presses the refresh button or inputs their AniList username into the form and presses the refresh button. If the user doesn't input their own username into the form a default username "Elpmaxeanime" is used. 

The data that is received from the asynchronous call to the AniList contains information from all the Anime that the user is currently watching and is currently airing on TV also. From these shows is collected cover image, title, score given by user and airing time.

All that data is then sorted and filtered into the animeList and rankingList which contain Anime objects that store the before mentioned data. The rankingList differs in that it doesn't include Anime that have not been given a score since they can't be ranked. 

These lists then are used to create entry objects to the Weekly Calendar from the Anime List and ranking rows to the Seasonal Ranking from the rankingList. Before the cover images can be placed into the Weekly Calendar they need to be sorted based on airing time to get the right weekday for each entry. RankingList objects are sorted first by score and then added to the Seasonal Ranking. 

Once the Seasonal Ranking is generated the user can press the Title or Score headers to sort the Seasonal Ranking table by Title or Score. Pressing either header twice changes the order from descending to ascending. The refresh button is used for confirming new user and also can be used without the inputbox for making a new api request.


anime.js: lines 86-224
## API Reference

#### AniList API
The website interfaces with the AniList API to fetch and display a user's anime list for currently airing shows, including details such as scores, titles (in both romaji and native language), and cover images. To use the anime page of the site the user needs to input their AniList username to the input box. The default username for the page is set to an example account.

API Docs: https://docs.anilist.co/






## Authors

- [@Darkkeri](https://github.com/darkkeri)

