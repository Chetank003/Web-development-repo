var gamePattern = [];
var userEnteredPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

$(document).keypress(function() {
  if (!start) {
    nextSequence();
    $(".game-header").text("Level " + level);
    start = true;
  }
});

$(".btn").click(function() {
  var tileId = $(this).attr("id");
  buttonAnimation(tileId);
  playSound(tileId);
  userEnteredPattern.push(tileId);

  verifyPattern(userEnteredPattern.length - 1);
});

function verifyPattern(index) {
  if (gamePattern[index] === userEnteredPattern[index]) {
    console.log(userEnteredPattern + " --> " + gamePattern);
    if (gamePattern.length === userEnteredPattern.length) {
      setTimeout(function() {
        nextSequence();
        $(".game-header").text("Level " + level);
      }, 1000);
    }
  } else {
    playSound("wrong");
    gameOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  userEnteredPattern = [];
  level++;
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  var tile = $("#" + randomColor);
  tile.fadeToggle(100).fadeToggle(100);

  //console.log(gamePattern);
  playSound(randomColor);
}

function gameOver() {
  $("body").addClass("gameover");
  setTimeout(function() {
    $("body").removeClass("gameover");
  }, 100);

  $(".game-header").text("Game Over, Press any key to retry!!");
  start = false;
  gamePattern = [];
  level = 0;
}

function playSound(text) {
  var audio = new Audio('./sounds/' + text + '.mp3');
  audio.play();
}

function buttonAnimation(tileId) {
  var colorTile = $("#" + tileId);
  colorTile.addClass("pressed");
  setTimeout(function() {
    colorTile.removeClass("pressed");
  }, 100);
}