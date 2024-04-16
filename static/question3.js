document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.submit-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const backBtn = document.querySelector('.back-btn');

    submitBtn.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption && selectedOption.value === 'b') {
            // Answer is correct, update points
            updatePoints(2);
            window.location.href = 'question4';
        } else {
            // Answer is incorrect, update points
            updatePoints(0);
            window.location.href = 'question4';
        }
        // Move to the next question
        alert('You have completed the quiz.');
        // You can redirect to a result page or any other page here
    });

    clearBtn.addEventListener('click', function() {
        // Clear the selected option
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            selectedOption.checked = false;
        }
    });

    backBtn.addEventListener('click', function() {
        // Navigate back to the previous question
        window.history.back();
    });

    function updatePoints(points) {
        // Send AJAX request to update points on the server
        fetch('/add_points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ points: points })
        }).then(response => {
            // Handle response if needed
        }).catch(error => {
            console.error('Error:', error);
        });
    }
});
