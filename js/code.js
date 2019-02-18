document.getElementById("start").addEventListener("click", function (event) {
    var count = parseInt(document.getElementById("count").value);
    var startQuadSize = parseInt(document.getElementById("start-size").value);
    var minQuadSize = parseInt(document.getElementById("min-size").value);
    document.getElementById("settings").style.display = "none";
    var gameContainer = document.getElementById("game");
    gameContainer.style.display = "block";
    var game = new Game(gameContainer, count, startQuadSize, minQuadSize);
});
