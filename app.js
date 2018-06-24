//const CONTEXT = "http://192.168.0.222:8090/";
const CONTEXT = "http://192.168.0.222/";
const URL = "./lib.json";
const PAGE_SIZE = 12;
const SEARCH_ACTIVATE_LEN = 0;
const RECENT_LIST_KEY = "recentList";
const RECENT_QUEUE_LEN = 10;

const searchField = document.querySelector("#search");
const formField = document.querySelector("#my-form");
const searchResultField = document.querySelector("#searchResult");
const viewpane = document.querySelector(".container > .albums");
const player = document.querySelector("#player");

var songList;
var RECENT_LIST = [];

searchField.addEventListener("input", (evt) => {
    console.log(evt);
    if (evt.keyCode == 13) {
        console.log("submit clicked");
    }
});

formField.addEventListener('submit', (evt) => {
    evt.preventDefault();
    //console.log(searchField.value);
    searchSongs(searchField.value);
});

(function() {
    fetch(URL, {
        headers: {
            "Authorization": "Basic ftpuser:peed"
        }
    }).then(resp=>resp.json())
        .then(resp => resp.map(resp => resp.replace("E:/Songs/", "")))
        .then(resp => {songList = resp; return resp;})
        //.then(resp => resp.filter(resp => resp.includes("\\Arijit\\")))
        .then(resp => resp.slice(0, PAGE_SIZE))
        
        .then(songs => {
            //console.log(songs);
            viewpane.innerHTML = songs.map(song => createCard(song)).join("");
        });
    const recent = localStorage.getItem(RECENT_LIST_KEY);
    if (recent) {
        RECENT_LIST = RECENT_LIST.concat(recent);
    }
    console.log(RECENT_LIST);
})();

function play(song) {
    player.setAttribute("src", CONTEXT + song);
    player.setAttribute("autoplay", "");

    if (RECENT_LIST.length > RECENT_QUEUE_LEN) {
        RECENT_LIST.shift();
    }
    RECENT_LIST.push(song);
    localStorage.setItem(RECENT_LIST_KEY, RECENT_LIST);
}


async function searchSongs(searchKey) {
    //searchResultField.innerHTML = songList.filter(song => song.toUpperCase().includes(searchKey.toUpperCase())).slice(0, 3).join("<br>");
    viewpane.innerHTML = "";
    viewpane.innerHTML = songList.filter(song => song.toUpperCase().includes(searchKey.toUpperCase())).slice(0, PAGE_SIZE).map(song => createCard(song)).join("");
}

function createCard(song) {
    var name = song.substring(song.lastIndexOf("/")+1);
    if (name.length > 35) {
        name = name.substring(0, 35) + "...";
    }
    return `
    <div class="col-sm-12 m-1">
    <div class="row" onclick="play('${song}')">
        <div class="col-xs-9 mr-auto">
          <a href="#">${name}</a>
        </div>
    </div>
    </div>
    `;
}