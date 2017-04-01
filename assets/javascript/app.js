function openScreen() {
  var newHeader = $("<h2>");
  newHeader.html("<h1 id='openingGreeting'> What\'re you in the <span id='moodText2'> mood </span> for? </h1>");
  newHeader.css({
    marginLeft: "100px",
    color: "white",
    position: "fixed",
    right: "100px",
    fontFamily: "tinderFont"
  });
  $("#mainSection").append(newHeader);


  var foodTypes = ["Italian", "Chinese", "Mediterranean", "Mexican", "Suprise Me"];
  var counter = 1;
  for(var i = 0; i < foodTypes.length; i++) {
    var foodDiv = $("<div>");
    foodDiv.attr("class", "radio");
    foodDiv.attr("id", "foodDiv" + counter);
    $("#openingGreeting").append(foodDiv);

    var foodList = $("<label>");
    foodList.html("<input type='radio' name='optradio'>" + foodTypes[i]);
    foodList.css({
      fontFamily: "tinderFont"
    });
    $("#foodDiv"+ counter).append(foodList);
    counter++;
  }


  var getStarted = $("<p>");
  getStarted.attr("type", "button");
  getStarted.attr("id", "getStarted");
  getStarted.html("<a id='getStartedText'>Submit</a>");
  getStarted.css({
    borderRadius: "10px",
    fontFamily: "tinderFont",
    position: "absolute",
    top: "370px",
    right: "30%",
    fontSize: "36px"
  });
  $("#mainSection").append(getStarted);
}

openScreen();
