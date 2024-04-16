document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.submit-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const backBtn = document.querySelector('.back-btn');

    // Ensure jQuery is loaded before using it
    $(document).ready(function() {
        // Function to get and display current points
        function getCurrentPoints() {
            $.get('/get_points', function(data) {
                // Log current points to the console
                console.log('Current points:', data.points);
            });
        }

        // Call the function to get and display current points when the document is ready
        getCurrentPoints();

        // Event listener for submit button click
        $('.submit-btn').click(function() {
            const selectedOption = $('input[name="answer"]:checked');
            if (selectedOption.val() === 'a') {
                // Answer is correct, update points and move to the next question
                updatePoints(2);
                window.location.href = 'question3'; // Change to 'question3' if it's the next question
            } else {
                // Answer is incorrect, move to the next question without updating points
                window.location.href = 'question3'; // Change to 'question3' if it's the next question
            }
        });

        // Event listener for clear button click
        $('.clear-btn').click(function() {
            // Clear the selected option
            $('input[name="answer"]:checked').prop('checked', false);
        });

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
                    // Log current points to the console after updating
                    getCurrentPoints();
                    console.log('Points updated successfully. Current points:', response.points);
                },
                error: function(error) {
                    console.error('Error:', error);
                }
            });
        }
    });
});
