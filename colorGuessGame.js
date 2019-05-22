var hardMode = document.getElementById("hard");
var hard = true;
var easy = false;
var rbgAnswer = "";
var rgbArray = [];
var win = false;
// var colorGrid = document.querySelectorAll("div .color-grid");
var colorGrid = document.getElementsByClassName("color-grid");

hardMode.addEventListener("click", function() {
  if (!hard) {
    hard = true;
    easy = false;
    $("#secondRow").show();
    reset();
  }
});

for (var i = 0; i < colorGrid.length; i++) {
  colorGrid[i].addEventListener("click", function(element) {
    if (!win) {
      var color = element.target.style.backgroundColor;
      if (color == formatColor(rbgAnswer)) {
        win = true;
        $("#status").text("CORRECT");
        $("#gameStatus").text("PLAY AGAIN?");
        winGame();
      } else {
        element.target.style.backgroundColor = "transparent";
        $("#status").text("WRONG");
      }
    }
  });
}

function easyMode() {
  if (!easy) {
    easy = true;
    hard = false;
    $("#secondRow").hide();
    reset();
  }
}

function randomNumber() {
  return Math.floor(Math.random() * 256);
}

function getRandomRGB() {
  var red = randomNumber();
  var green = randomNumber();
  var blue = randomNumber();
  return { red, green, blue };
}

function reset() {
  win = false;
  rgbArray = [];
  var max = hard ? 6 : 3;
  for (var i = 0; i < max; i++) {
    rgbArray.push(getRandomRGB());
  }
  rbgAnswer = rgbArray[Math.floor(Math.random() * max)];

  document.getElementById("rbgColor").innerHTML =
    "RGB(" +
    rbgAnswer.red +
    ", " +
    rbgAnswer.green +
    ", " +
    rbgAnswer.blue +
    ")";
  $("#status").text("Click To Play");
  $("#gameStatus").text("NEW COLOR");
  document.querySelector(".jumbotron").style.backgroundColor = "steelblue";
  buildGrid();
}

function buildGrid() {
  var firstRow = document.getElementById("firstRow");
  var grid = firstRow.getElementsByTagName("div");
  for (var i = 0; i < grid.length; i++) {
    grid[i].textContent = "";
    grid[i].style.backgroundColor = formatColor(rgbArray[i]);
  }
  if (!easy) {
    var secondRow = document.getElementById("secondRow");
    var grid = secondRow.getElementsByTagName("div");
    for (var i = 0; i < grid.length; i++) {
      grid[i].textContent = "";
      grid[i].style.backgroundColor = formatColor(rgbArray[i + 3]);
    }
  }
}

function formatColor(color) {
  return "rgb(" + color.red + ", " + color.green + ", " + color.blue + ")";
}

function winGame() {
  var firstRow = document.getElementById("firstRow");
  var grid = firstRow.getElementsByTagName("div");
  for (var i = 0; i < grid.length; i++) {
    grid[i].textContent = "";
    grid[i].style.backgroundColor = formatColor(rbgAnswer);
  }
  if (!easy) {
    var secondRow = document.getElementById("secondRow");
    var grid = secondRow.getElementsByTagName("div");
    for (var i = 0; i < grid.length; i++) {
      grid[i].textContent = "";
      grid[i].style.backgroundColor = formatColor(rbgAnswer);
    }
  }
  document.querySelector(".jumbotron").style.backgroundColor = formatColor(
    rbgAnswer
  );
}

reset();
