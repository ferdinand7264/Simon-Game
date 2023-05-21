var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var firstKeyPress = true;

function playSound(name) {
    $("#"+name).addClass("pressed");
    $("#"+name).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    setTimeout(() => {
        $("#"+name).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
}

$(".btn").on("click", function () {
    var userChosenColor = event.srcElement.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
    console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        firstKeyPress = true;
        $("h1").text("Play Again");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $(".play").animate({
            opacity :1
        });
    }
}

$(".play").on("click", function () {
    if(firstKeyPress)
    {
        $(".play").animate({
            opacity :0
        });
        nextSequence();
        firstKeyPress = false;
    }
});

$(document).keypress(function () { 
    if(firstKeyPress)
    {
        $(".play").animate({
            opacity :0
        });
        nextSequence();
        firstKeyPress = false;
    }
});
