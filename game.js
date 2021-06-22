var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;

$(".btn").click(handler);


$("body").keypress(function ()
{
    if(level == 0)
    {
        setTimeout(function ()
        {
            nextSequence();
        }, 200);
    }
});

function nextSequence()
{
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();

    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);    
}

function handler()
{
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);


    playSound(this.id);

    animatePress(this.id);

    check();
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(function ()
    {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function check()
{
    if(gamePattern[currentLevel] !== userClickedPattern[currentLevel])
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function ()
        {
            $("body").removeClass("game-over");
        }, 200);

        startOver();

        $("h1").text("Game Over, Press Any Key to Restart");
    }
    else if(userClickedPattern.length === gamePattern.length)
    {
        currentLevel = 0;
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
    else
    {
        currentLevel++;
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    currentLevel = 0;
}