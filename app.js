const URL = "./lib.json";
(function() {
    console.log("init");
    fetch(URL).then(resp => {
        console.log(resp);
    });
})();