// Execute the function when the DOM is ready
$(function () {
  // Add a click event listener to the save button
  $(".saveBtn").on("click", function () {
    // Get the user input from the textarea
    var userInput = $(this).siblings(".description").val();
    // Get the ID of the containing time-block div
    var timeBlockId = $(this).parent().attr("id");
    // Save the user input in localStorage using the time-block ID as a key
    localStorage.setItem(timeBlockId, userInput);
  });

  // Loop through each time-block div
  $(".time-block").each(function () {
    // Get the current hour in 24-hour time using Day.js
    var currentHour = dayjs().format("H");
    // Get the hour from the time-block ID by removing the "hour-" prefix and converting it to a number
    var timeBlockHour = parseInt($(this).attr("id").replace("hour-", ""));

    // Compare the time-block hour to the current hour and add/remove classes accordingly
    if (timeBlockHour < currentHour) {
      $(this).addClass("past").removeClass("present future");
    } else if (timeBlockHour == currentHour) {
      $(this).addClass("present").removeClass("past future");
    } else {
      $(this).addClass("future").removeClass("past present");
    }

    // Get the ID of the current time-block div
    var timeBlockId = $(this).attr("id");
    // Get the user input from localStorage using the time-block ID as a key
    var userInput = localStorage.getItem(timeBlockId);
    // Set the textarea value with the retrieved user input
    $(this).find(".description").val(userInput);
  });

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});