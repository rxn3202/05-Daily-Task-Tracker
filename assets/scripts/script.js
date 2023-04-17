$(function () {
  $(".saveBtn").on("click", function () {
    var userInput = $(this).siblings(".description").val();
    var timeBlockId = $(this).parent().attr("id");
    localStorage.setItem(timeBlockId, userInput);
  });

  $(".time-block").each(function () {
    var currentHour = dayjs().format("H");
    var timeBlockHour = parseInt($(this).attr("id").replace("hour-", ""));

    if (timeBlockHour < currentHour) {
      $(this).addClass("past").removeClass("present future");
    } else if (timeBlockHour == currentHour) {
      $(this).addClass("present").removeClass("past future");
    } else {
      $(this).addClass("future").removeClass("past present");
    }

    var timeBlockId = $(this).attr("id");
    var userInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(userInput);
  });

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});