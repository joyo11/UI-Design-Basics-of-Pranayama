// Function to display the score
function displayScore() {
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');
    if (scoreElement && resultElement) {
		scoreElement.textContent = points;
        if (points >= 3) {
		resultElement.textContent = "Congratulations! You passed the quiz.";
		} else {
			resultElement.textContent = "Sorry, you failed the quiz. Better luck next time.";
		}
    }
	
	updatePoints(-1*points);
	
	// Function to update points
	function updatePoints(points) {
		console.log('Updating points with value:', points);
		// Send AJAX request to update points on the server
		$.ajax({
			type: 'POST',
			url: '/add_points',
			contentType: 'application/json',
			data: JSON.stringify({ points: points }),
			success: function(response) {
				console.log('Points updated successfully. Current points:', response.points);
			},
			error: function(error) {
				console.error('Error:', error);
			}
		});
	}
}

// Call the displayScore function when the page loads
window.onload = displayScore;