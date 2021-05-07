$(document).ready( () => {

    /**
     * Click on an answer results in unselecting all possible
     * answers, thereafter the clicked one is selected again.
     */
    $(document).on("click", ".answer", (e) => {
        let answer = $('#' + e.target.id);

        if (answer.hasClass("selected")) {
            answer.removeClass("selected");

            // make proceed button inactive
            $("#proceed").css("background", "grey").prop("disabled", true);
        } else {
            $(".answer").removeClass("selected");
            answer.addClass("selected");

            // make proceed button active
            $("#proceed").css("background", "#27ae60").prop("disabled", false);
        }
    })

    /**
     * On click proceed button, reset stuff
     */
    $(document).on("click", "#proceed", () => {
        console.log("proceeding!")
    })

});