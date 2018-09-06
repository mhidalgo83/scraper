//Submit button and AJAX call to mongoDB
$(document).on("click", "#submit", function () {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    console.log($("#title" + thisId).val().trim());
    console.log($("#body" + thisId).val().trim())
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#title" + thisId).val().trim(),
            body: $("#body" + thisId).val().trim()
        },
    }).then(function(data) {
        console.log(data);
        location.reload();
    });
    
});

//Close button in modal...
$(document).on("click", "#close", function () {
    event.preventDefault();
    $("#title").val("");
    $("#body").val("");
});

//Delete button in comments...
$(document).on("click", "#delete", function(){
    event.preventDefault();
    var thisId=$(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/notes/" + thisId
    }).then(function(){
        console.log(data);
    })
    location.reload();
})






