var userLocation;
var cuisineChosen;

function homeScreen() {
  var openingGreeting = $("<div>");
  openingGreeting.html("<h1 id ='openingGreeting'> What\'re you in the <span id='moodText2'> mood </span> for?</h1>");

  var locationForm = $("<form>");
  locationForm.attr("id", "locationForm");
  locationForm.css({
    textAlign: "center",
    position: "absolute",
    left: "500px",
    top: "400px",
    width: "500px"
  });
  locationForm.html("<input class='form-control' id='userLocation' type='text' name='userLocation' placeholder='zipcode or city'/>");

  var homeScreenSubmit = $("<button>");
  homeScreenSubmit.attr("class", "btn btn-default");
  homeScreenSubmit.attr("type", "button");
  homeScreenSubmit.attr("id", "homeScreenSubmit");
  homeScreenSubmit.css({
    position: "absolute",
    right: "-5px",
    bottom: "0px"
  });
  homeScreenSubmit.html("Submit");

  $("#mainSection").append(locationForm);
  $("#mainSection").append(openingGreeting);
  $("#locationForm").append(homeScreenSubmit);

}


function openScreen() {
  var cuisineType = $("<div class='cusineType'>");
  cuisineType.html("<h1 class='cuisineType'> What type of cuisine? </h1>");
  cuisineType.css({
    marginTop : "10px",
    color: "white",
    position: "absolute",
    right: "35%",
    fontFamily: "tinderFont"
  });
  $("#mainSection").append(cuisineType);


  var foodTypes = ["Italian", "Chinese", "Mediterranean", "Mexican", "Surprise Me"];
  var counter = 1;
  for(var i = 0; i < foodTypes.length; i++) {
    var foodDiv = $("<div>");
    foodDiv.attr("class", "radio");
    foodDiv.attr("id", "foodDiv" + counter);
    $(".cuisineType").append(foodDiv);

    var foodList = $("<label>");
    foodList.attr("class", "foodList");
    foodList.html("<input value=" + foodTypes[i] + " " + "type='radio' name='optradio' class='foodValue'>" + foodTypes[i]);
    foodList.css({
      fontFamily: "tinderFont"
    });
    $("#foodDiv"+ counter).append(foodList);
    counter++;
  }


  var getStarted = $("<p>");
  getStarted.attr("id", "getStarted");
  getStarted.html("<a id='getStartedText'>Submit</a>");
  getStarted.css({
    marginTop: "10px",
    borderRadius: "10px",
    fontFamily: "tinderFont",
    position: "absolute",
    top: "40px",
    right: "60%",
    fontSize: "36px"
  });
  $("#foodDiv" + 5).append(getStarted);
}

homeScreen();

$(document).on("click", "#homeScreenSubmit", function(event) {
  event.preventDefault();

  userLocation = $("#userLocation").val().trim();
  $("#userLocation").val("");
  console.log(userLocation);
  $("#mainSection").empty();

  openScreen();
});

$(document).on("click", "#getStarted", function(event) {
  event.preventDefault();

  cuisineChosen = $('input[name=optradio]:checked').val();
  console.log(cuisineChosen);
  yelpSearch();
});


function yelpSearch() {
  var queryURL = 'https://api.yelp.com/v2/search';

  var auth= {
    consumerKey: 'auktxeLEVeqlzAMSmT6CzQ',
    consumerSecret: 'kGoz9Jmvzxwuu3FiTvyhgbkRkaI',
    accessToken: 'JCT1veuw5aGAVPpGKeHyEqY-m4b1Om5k',
    accessTokenSecret: 'B5fgXIsqZ--6_cTGZb356yPiiSc',
    serviceProvider: {
      signatureMethod: "HMAC-SHA1"
    }
  };

  var terms = cuisineChosen;
  var near = userLocation;
  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  var parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', userLocation]);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
    parameters.push(['callback', 'cb']);

  var parameters2 = [];
    parameters2.push(['oauth_consumer_key', auth.consumerKey]);
    parameters2.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters2.push(['oauth_token', auth.accessToken]);
    parameters2.push(['oauth_signature_method', 'HMAC-SHA1']);
    parameters2.push(['callback', 'cb']);

  var message = {
    'action': 'https://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
  };

  // console.log(message.action);

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
  // console.log(parameterMap);


  $.ajax({
    'url' : message.action,
    'data' : parameterMap,
    'dataType' : 'jsonp',
    'jsonpCallback' : 'cb',
    'cache': true
  }).done(function(data) {
      console.log(data);
      var businessId = data.businesses[0].id;
      console.log(businessId);

      var message2 = {
        'action': 'https://api.yelp.com/v2/business/' + businessId,
        'method': 'GET',
        'parameters': parameters2
      };

      OAuth.setTimestampAndNonce(message2);
      OAuth.SignatureMethod.sign(message2, accessor);
      var parameterMap2 = OAuth.getParameterMap(message2.parameters);
      parameterMap2.oauth_signature =
      OAuth.percentEncode(parameterMap2.oauth_signature);

        $.ajax({
          'url': message2.action,
          'data': parameterMap2,
          'dataType' : 'jsonp',
          'jsonpCallback' : 'cb',
          'cache': true
        }).done(function(response) {
          console.log(response);
        }).fail(function(errorThrown) {
          console.log(errorThrown);
        });
        
      }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
  });
}
