$(() => {

    let data;
    let score = {};
    let totalQuestions;

    $.getJSON("assets/questions.json", function(json) {
        data = json;
        totalQuestions = Object.keys(data).length;
    });

    $("#start").on("click", () => {
        // hide and un-hide stuff
        $("#quiz-content").css("display", "grid")
        $("#intro-wrapper").fadeOut("fast")

        performQuiz();
    })

    function performQuiz() {
        let questionNum = 1;

        // Show question
        $("#quiz-content h2").text(data[questionNum]["q"])

        // On click of one of the three buttons
        $("#quiz-content").on("click", "button", (e) => {

            let answer = e.target.id;

            // Write score to score dict. If key (commission) not exists -> create it.
            updateScore(questionNum, answer);

            // Add one to the iterator and show next question
            questionNum += 1;
            if (questionNum < (totalQuestions + 1)) {
                $("#quiz-content h2").text(data[questionNum]["q"])
            } else {
                // end of quiz; show results and reset score and iterator
                console.log("All questions are answered")
                $("#quiz-content").css("display", "none")

                // fill the result container with actual results
                fillResultGrid()

                // show results
                $("#result-wrapper").css("display", "grid")
                $("#go-to-vijfje").css("display", "block")
            }
        })
    }

    function updateScore(questionNum, answer) {
        console.log(`Updating scores in dict based using answer: ${answer} for question ${data[questionNum]["q"]}`)
        let questionData = data[questionNum]
        if (answer !== "u") {
            let commissions = questionData[answer]

            for (let i = 0; i < commissions.length; i++) {
                if (Object.keys(score).includes(commissions[i])) {
                    // only add a point to the existing key
                    score[commissions[i]] = (score[commissions[i]] + 1)
                } else {
                    // add key with value to the dict
                    score[commissions[i]] = 1;
                }
            }
        }
    }

    function fillResultGrid() {

        let sortedScores = createSortedArray()

        // loop through final scores
        for (let i = 0; i < sortedScores.length; i++) {
            let commission = sortedScores[i][0];
            let commissionScore = sortedScores[i][1];
            let percentageScore = (commissionScore / totalQuestions * 100);
            let roundedPercentageScore = Math.round(percentageScore);

            $("#result-grid").append(
                `<div id="${commission}" class="result">
                    <span class="commission">
                        <span class="commission-name">${i+1}. ${commission}</span>
                        <span class="commission-score">${roundedPercentageScore}%</span>
                    </span>
                    <div class="percentage-bar">
                        <div class="unfilled">
                            <div class="fill" style="width: ${roundedPercentageScore}%"></div>
                        </div>
                    </div>
                </div>`
            )
        }
    }

    function createSortedArray() {
        let sortedScores = Object.keys(score).map( (key) => {
            return [key, score[key]];
        });

        sortedScores.sort( (first, second) => {
            return second[1] - first[1];
        });

        return sortedScores;
    }
});