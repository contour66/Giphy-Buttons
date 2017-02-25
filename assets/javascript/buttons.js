
// Initial array of sports
var sports = ["German Shepard", "Pug", "Doberman", "Chihuahua", "St. Bernard", "Poodle", "Daschund", "Pitbull", "Terrier", "Bulldog", "Corgi", "Shibu Inu", "Great Dane", "Grey Hound"];
// Function for adding sports data
function renderButtons() {
  // Deleting the sport buttons prior to adding new sport buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#sports-view").empty();
  // Looping through the array of sports
  for (var i = 0; i < sports.length; i++) {
    // Then dynamicaly generating buttons for each sport in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("sports btn-default");
    // Adding a data-attribute with a value of the sports at index i
    a.attr("data-name", sports[i]);


    console.log();
    // Providing the button's text with a vatlue of the sport at index i
    a.text(sports[i]);
    // Adding the button to the HTML
    $("#sports-view").append(a);
  }
};
// This function handles events where one button is clicked
$("#add-sports").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();
  // This line will grab the text from the input box
  var sport = $("#sports-input").val().trim();
  // The sport from the textbox is then added to our array
  sports.push(sport);
  // calling renderButtons which handles the processing of our sport array
  renderButtons();
});
// Calling the renderButtons function at least once to display the initial list of sports
renderButtons();

$("#sports-view").on("click", ".sports", function() {
  $( "#gifs-appear-here" ).empty();
  var sports = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=dc6zaTOxFJmzC&limit=10";
    
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

  console.log(response);

  // Since the image information is inside of the data key,
  // a variable named results is equal to response.data
  var results = response.data;

  for (var i = 0; i < results.length; i++) {
    // Make a div with jQuery and store it in a variable named sportsDiv.
    var sportsDiv= $("<div>");
    // Make a paragraph tag with jQuery and store it in a variable named p.
    sportsDiv.addClass("col-md-6")
    var p = $("<p>");
    // Set the inner text of the paragraph to the rating of the image in results[i].
    p.text("Rating: " + results[i].rating);
    // Make an image tag with jQuery and store it in a variable named animalImage.
    var sportsImage = $("<img>").attr("data-state", "still");
    //This variable sets the attribute for the img to the animated gif result path from the  Giphy API. It will be use to call later in our If else statement.
    sportsImage.attr('data-animate', results[i].images.fixed_height.url);
    //This variable sets the attribute for the img to the animated gif result path from the  Giphy API. It will be use to call later in our If else statement.
    sportsImage.attr('data-still', results[i].images.fixed_height_still.url);
    // Set the image's src to results[i]'s fixed_height.url.
    sportsImage.attr( "src", results[i].images.fixed_height_still.url);
    // Append the p variable to the animalDiv variable.
    sportsDiv.append(p);
    // Append the sportsImage variable to the sportsDiv variable.
    sportsDiv.append(sportsImage);
    // Prepend the sportsDiv variable to the element with an id of gifs-appear-here.
    $("#gifs-appear-here").prepend(sportsDiv);
  }

    
    $("img").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // var still = $(this).attr("animate");
      // console.log(still);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        // console.log("this is still")
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        // console.log(animate);
      } 
      
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    
    });
  
  });

});



