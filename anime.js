const rankingTitleButton = document.getElementById("titleheader");
const rankingScoreButton = document.getElementById("scoreheader");
const usernameForm = document.getElementById("usernameform");
const url ='https://graphql.anilist.co';

const variables = {
    userName: "Elpmaxeanime", 
    status: "CURRENT", 
    type: "ANIME"};

const query = `
query ($userName: String, $status: MediaListStatus, $type: MediaType) {
    MediaListCollection(userName: $userName, status: $status, type: $type) {
      lists {
        name
        entries {
            score
            media {
                title {
                    native
                    romaji
                    english
            }
            coverImage {
              large
            }
            nextAiringEpisode {
                airingAt
            }
          }
        }
      }
    }
  }`;

var rateLimiter = false;

function getAnimeData(){
    const config = {
        method: "POST" ,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    if(rateLimiter == false){
    rateLimiter = true;
    setTimeout(() => {
        rateLimiter = false;
        console.log("Ratelimiter released")
    }, 60000);

    fetch(url, config)
    .then(handleResponse)
    .then(updateAnimeList)
    .catch(handleError);
    } else {
        alert("Rate limited. Retry in 1 minute");
        sendRefreshErrorMessage("Rate limited. Retry in 1 minute");
    }
}

function handleResponse(response) {
    console.log(response);
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleError(error) {  
    console.log(error);
    console.error(error);
    if(error.errors[0].message == "User not found"){
        variables.userName = "Elpmaxeanime";
        sendRefreshErrorMessage("User not found. Defaulted to username: Elpmaxeanime")
        alert("User not found. Defaulted to username: Elpmaxeanime");
    } else {
    alert("Error, check console");}
}

var animeList = [];
var rankingList = [];

function Anime(romajiTitle, nativeTitle, englishTitle, coverImage, score, airingAt){
    const airingTime = new Date(airingAt * 1000);
    const weekdays = ["sun","mon","tue","wed","thu","fri","sat"];

    this.romajiTitle = romajiTitle;
    this.nativeTitle = nativeTitle;
    this.englishTitle = englishTitle;
    this.coverImage = coverImage;
    this.score = score;
    this.airingTime =  airingTime;
    this.airingDay = weekdays[airingTime.getDay()];
    
    this.addToAnimeList = function() {
        animeList.push(this);
    }
}
function RankingItem(romajiTitle, nativeTitle, englishTitle, score, rank){
    this.romajiTitle = romajiTitle;
    this.nativeTitle = nativeTitle;
    this.englishTitle = englishTitle;
    this.score = score;
    this.rank = rank;

    this.addToRankingList = function() {
        rankingList.push(this);
    }
}

function updateAnimeList(data){
    if(data && data.data && data.data.MediaListCollection 
        && Array.isArray(data.data.MediaListCollection.lists) 
        && data.data.MediaListCollection.lists.length > 0){
    animeList.length = 0;
    const entryList = data.data.MediaListCollection.lists[0].entries;
    for(let entry of entryList){
        if(entry.media.nextAiringEpisode != null){
        const newAnime = new Anime(
            entry.media.title.romaji, 
            entry.media.title.native,
            entry.media.title.english,
            entry.media.coverImage.large,
            entry.score,
            entry.media.nextAiringEpisode.airingAt
        )
        newAnime.addToAnimeList();
        }
    }
    console.log(animeList);
    updateCalendarRanking(animeList);
}
}

function createCalendarEntry(anime){
    let entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");
    document.getElementById(anime.airingDay).appendChild(entryDiv);

    let newCover = document.createElement("img");
    newCover.classList.add("poster");
    newCover.src = anime.coverImage;
    newCover.alt = `Poster of ${anime.romajiTitle}`;
    entryDiv.appendChild(newCover);
}

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

function updateCalendarRanking(animeList){
    animeList.sort((a,b) => b.score - a.score);
    let i = 1;
    clearCalendar();
    clearRanking();
    rankingList.length = 0;
    for(let anime of animeList){
        createCalendarEntry(anime);
        if(anime.score != 0){
            const newRankedAnime = new RankingItem(
                anime.romajiTitle,
                anime.nativeTitle,
                anime.englishTitle,
                anime.score,
                i
            )
            newRankedAnime.addToRankingList();
            createRankingEntry(anime, i);
            i++;
        }
    }
}

let rankdescend = true;
let titledescend = true;

function sortRankingBy(rankingList, mode){
    clearRanking();
    if(mode == "score"){
        titledescend = false;

        if(rankdescend){
            rankdescend = false;
            rankingList.sort((a,b) => a.score - b.score);
        } else {
            rankdescend = true;
            rankingList.sort((a,b) => b.score - a.score);
        }
    } else if(mode == "title"){
        rankdescend = false

        if(titledescend){
            titledescend = false;
            rankingList.sort((a, b) => a.englishTitle.localeCompare(b.englishTitle)).reverse();
        } else {
            titledescend = true;
            rankingList.sort((a, b) => a.englishTitle.localeCompare(b.englishTitle));
        }
    }
    for(let rankingItem of rankingList){
        createRankingEntry(rankingItem, rankingItem.rank);
        }

}
function clearCalendar(){
    const entrys = document.querySelectorAll(".entry");
    entrys.forEach(entry => entry.remove());
}
function clearRanking(){
    const rankingRows = document.querySelectorAll(".rankingRow");
    rankingRows.forEach(rankingRow => rankingRow.remove());
}
function sendRefreshErrorMessage(errorMessage){
    document.getElementById("refresherrormsg").textContent = errorMessage;
    setTimeout(()=> {
        document.getElementById("refresherrormsg").textContent = "";
    },10000);
}

rankingScoreButton.addEventListener("click", function(){
    sortRankingBy(rankingList, "score");
});
rankingTitleButton.addEventListener("click", function(){
    sortRankingBy(rankingList, "title");
});
usernameForm.addEventListener("submit", function(event){
    event.preventDefault();
    if(document.getElementById("usernameinput").value != ""){
    variables.userName = document.getElementById("usernameinput").value;
    }
    usernameForm.reset();
    getAnimeData();
});
document.addEventListener('DOMContentLoaded', getAnimeData);
