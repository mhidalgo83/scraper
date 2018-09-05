//Submit button and AJAX call to mongoDB
$(document).on("click", ".submit", function () {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#title").val().trim(),
            body: $("#body").val().trim()
        }
    }).then(function () {
        $("#title").val("");
        $("#body").val("");
    })
});

//Close button in modal...
$(document).on("click", "#close", function () {
    event.preventDefault();
    $("#title").val("");
    $("#body").val("");
});






