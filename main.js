$(() => {

    $.getJSON("assets/questions.json", function(json) {
        console.log(json);
    });

    $("#start").on("click", () => {

        $("#quiz-content").css("display", "grid")
        $("#start, #introduction").fadeOut("fast")
    })

});