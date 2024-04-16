document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.submit-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const backBtn = document.querySelector('.back-btn');

    submitBtn.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption && selectedOption.value === 'd') {
            // Answer is correct, update points and move to the next question
            updatePoints(2);
            window.location.href = 'question3.html';
        } else {
            // Answer is incorrect, update points and stay on the current question
            updatePoints(0);
        }
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
