
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[]

var started = false;
var level=0;
var highScore = 0;
var currentScore =0;
//to start the game

$(".start").click(function() {
  currentScore = 0;
  $(".start").toggle();
  if (!started) {
    started = true;
    $("#level-title").html("Let's Play!");
    setTimeout(function () {
      nextSequence();
    }, 1000);

  }
});

//animation for keypressed by user

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
     $("#"+currentColor).removeClass("pressed");
   }, 100);
}

// playing sound

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// user action operation

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

//checking answer

function checkAnswer(currentlevel) {

    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {


    if(userClickedPattern.length === gamePattern.length) {
      //calling next level
      $("#level-title").html("Level UP!😍")
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }
  }
  else {
    // terminating game
    console.log("wrong");
    $("#level-title").html("Game Over 😭");
    if ( highScore < currentlevel)
    highScore = currentlevel;
    setTimeout(function () {
        $("#level-title").html("Press start to play again! 🔥");
        $(".start").toggle();
    }, 2000);
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//next level sequence generation

function nextSequence() {

  level=level+1;
  $("#level-title").html("Level " + level);

  setTimeout(function () {

    userClickedPattern = [];



    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


  }, 1000);

}

//start over
function startOver() {
  $(".score").html("Best score : " + highScore);
  console.log(highScore)
  level = 0;
  gamePattern = [];
  started = false;
}
