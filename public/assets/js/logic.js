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


$(document).on("click", ".comments", function(){
    console.log("This works");
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
    }).then(function (data) {
        console.log(data);
    })
});




