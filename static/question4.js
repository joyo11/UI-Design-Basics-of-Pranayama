document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.querySelector('.start-btn');
    const stopBtn = document.querySelector('.stop-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const pointsDisplay = document.getElementById('points');
    const timerDisplay = document.getElementById('timer');

    let timerInterval;
    let seconds = 0;
    let intervalsOfFive = 0;
    let points = 0;

    function startTimer() {
        timerInterval = setInterval(function() {
            seconds++;
            timerDisplay.textContent = seconds;
            // Check if 5 seconds interval has passed
            if (seconds % 5 === 0) {
                intervalsOfFive++;
                // Increment points by 0.5 every 5 seconds
                if (points < 2) {
                    points += 0.5;
                }
                // Update points display
                pointsDisplay.textContent = points;
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        // Save points in localStorage for question 4
        localStorage.setItem('question4Points', points);
        // Alert the user with the current points
        alert('You got ' + points + ' points!');
    }

    function clearTimer() {
        clearInterval(timerInterval);
        // Reset timer and points
        seconds = 0;
        intervalsOfFive = 0;
        points = 0;
        timerDisplay.textContent = seconds;
        pointsDisplay.textContent = points;
    }

    startBtn.addEventListener('click', function() {
        startTimer();
        // Reset timer and points
        seconds = 0;
        intervalsOfFive = 0;
        points = 0;
        timerDisplay.textContent = seconds;
        pointsDisplay.textContent = points;
    });

    stopBtn.addEventListener('click', function() {
        stopTimer();
    });

    clearBtn.addEventListener('click', function() {
        clearTimer();
    });
});