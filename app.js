// Web App that will take you favorite Sport and 
// provide 10 great gifs to use for to impress 
// your friends = Created by Kevin Lawler 2016

var topics = ['Golf', 'Basketball', 'Football'];

var userInput = $("#myTextInput").val;

console.log(userInput);

topics.push(userInput);

for (var i = 0; i < topics.length; i++) {
    document.write("<button data-sport='" + topics[i] + "'>" + topics[i] + "</button>");
};



// Adding click event listen listener to all buttons
$("button").on("click", function() {
  // Grabbing and storing the data-sport property value from the button
  var sport = $(this).data("sport");

  // Constructing a queryURL using the sports name
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    sport + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .done(function(response) {

      // storing the data from the AJAX request in the results variable
      var results = response.data;
      console.log(results);
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var sportsDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating:  " + results[i].rating);

        // Creating and storing an image tag
        var sportsImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        sportsImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the sportsDiv
        sportsDiv.append(p);
        sportsDiv.append(sportsImage);

        // Prependng the sportsDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(sportsDiv);
      }
    });
});
