// Function to display the score
function displayScore() {
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');
    if (scoreElement && resultElement) {
        // Retrieve points from localStorage for both question 4 and question 5
        const pointsQuestion4 = parseFloat(localStorage.getItem('question4Points'));
        const pointsQuestion5 = parseFloat(localStorage.getItem('question5Points'));
        // Calculate the total score
        const totalScore = pointsQuestion4 + pointsQuestion5;
        // Display the total score on the page
        scoreElement.textContent = totalScore;
        // Check if the user passed or failed based on the total score
        if (totalScore >= 3) {
            resultElement.textContent = "Congratulations! You passed the quiz.";
        } else {
            resultElement.textContent = "Sorry, you failed the quiz. Better luck next time.";
        }
    }
}

// Call the displayScore function when the page loads
window.onload = displayScore;