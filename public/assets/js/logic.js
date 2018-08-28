$(document).on("click", ".submit", function () {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    console.log(thisId);
})

