const CONTEXT = "http://192.168.0.222:8090/";
const URL = "./lib.json";
const SEARCH_ACTIVATE_LEN = 0;
const searchField = document.querySelector("#search");
const viewpane = document.querySelector(".container > .albums")
var songList;

searchField.addEventListener("input", (evt) => {
    if (searchField.value.length > SEARCH_ACTIVATE_LEN) {
        const searchKey = searchField.value;
        searchSongs(searchKey);
    }
});

function play1(songDiv, song) {
    songDiv.innerHTML = `<audio controls autoplay="">
        <source src="${CONTEXT + encodeURI(song)}" type="audio/mpeg" />
    </audio>`;
}


async function searchSongs(searchKey) {
    viewpane.innerHTML = "";
    viewpane.innerHTML = songList.filter(song => song.toUpperCase().includes(searchKey.toUpperCase())).slice(0, 10).map(song => createCard(song)).join("");
}

(function() {
    console.log("init");

    fetch(URL, {
        headers: {
            "Authorization": "Basic ftpuser:peed"
        }
    }).then(resp=>resp.json())
        .then(resp => resp.map(resp => resp.replace("E:\\Songs\\", "")))
        .then(resp => {songList = resp; return resp;})
        //.then(resp => resp.filter(resp => resp.includes("\\Arijit\\")))
        .then(resp => resp.slice(0, 10))
        
        .then(songs => {
            //console.log(songs);
            songs.forEach(song => document.querySelector(".container > .albums").innerHTML = document.querySelector(".container > .albums").innerHTML+createCard(song));
        });
})();


function createCard(song) {
    return `
        <div class="col-lg-4 col-sm-6 portfolio-item">
            <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">
                <a href="#">${song.replace("/^.*[\\\/]/", '')}</a>
                </h4>
                <p class="card-text"></p>
                <div class="player-${song}" ><button onclick="play1(this.parentElement, '${song}')";><i class="fa fa-play"></i></button></div>
                <!--audio controls>
                    <source src="${CONTEXT + encodeURI(song)}" type="audio/mpeg" />
                </audio-->
                <!--video controls="" autoplay="" name="media">
                    <source src="${encodeURI(song)}" type="audio/mpeg">
                </video-->
            </div>
            </div>
        </div>
    `;
}

function play(song) {
    return `<audio controls autoplay="">
        <source src="${CONTEXT + encodeURI(song)}" type="audio/mpeg" />
    </audio>`;
}