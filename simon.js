var green = "rgba(31, 219, 0,";
var red = "rgba(214, 0, 0,";
var yellow = "rgba(255, 230, 0,";
var blue = "rgba(0, 30, 235,";
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var colorToNum = [
  ["green",green, greenAudio],
  ["red",red, redAudio],
  ["yellow", yellow, yellowAudio],
  ["blue",blue, blueAudio]
];
var compSequence = [];
var userSequence = [];
var steps = 0;
var accurate = true;
var AIrunning = false;

$(document).ready(function() {
  $("#green").on("click",function() {
    if (!AIrunning) {
      userClick(0);
    }
  })
  $("#red").on("click",function() {
    if (!AIrunning) {
      userClick(1);
    }
  })
  $("#yellow").on("click",function() {
    if (!AIrunning) {
      userClick(2);
    }
  })
  $("#blue").on("click",function() {
    if (!AIrunning) {
      userClick(3);
    }
  })
  $("#start").on("click",function() {
    lightUpAI();
  })
  $("#reset").on("click",function() {
    reset();
    lightUpAI();
  })
});

function userClick(num) {
  lightUp(num);
  userSequence.push(num);
  if (checkAccuracy() && userSequence.length == compSequence.length) {
    $("#steps").html("Steps: " + steps);
    lightUpAI();
  }
  else if (!checkAccuracy()) {
    accurate = false;
    lightUpAI();
  }
}

function reset() {
  userSequence = [];
  compSequence = [];
  steps = 0;
}

function lightUp(index) {
  $("#" + colorToNum[index][0]).css("background-color",colorToNum[index][1] + "1)");
  colorToNum[index][2].play();
  setTimeout(function () {
    $("#" + colorToNum[index][0]).css("background-color",colorToNum[index][1] + "0.7)");
  }, 300);
}

var AIlightID;
var counter = 0;

function lightUpAI() {
  if (userSequence.length == 3 && accurate) {
    $("#win").html("YOU WIN");
    setTimeout(function () {
      $("#win").html("");
    }, 5000);
    steps = 0;
    $("#steps").html("Steps: " + steps);
    compSequence = [];
    userSequence = [];
  }
  else {
    if (accurate) {
      compSequence.push(Math.floor(Math.random()*4));
    }
    else {
      $("#steps").html("Get it together");
      if ($("#strict-on").is(":checked")) {
        reset();
        accurate = true;
        lightUpAI();
        return 0;
      }
    }
    AIrunning = true;
    AIlightID = setInterval(function () {
      if (counter == compSequence.length) {
        counter = 0;
        if (accurate) {
          steps++;
          $("#steps").html("Steps: " + steps);
        }
        else {
          accurate = true;
        }
        stopLightUpAI();
      }
      else {
        lightUp(compSequence[counter]);
        counter++;
      }
    }, 1000);
  }
}

function stopLightUpAI() {
    userSequence = [];
    AIrunning = false;
    clearInterval(AIlightID);
}

function checkAccuracy() {
  for (var i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== compSequence[i]) {
      return false;
    }
  }
  return true;
}
