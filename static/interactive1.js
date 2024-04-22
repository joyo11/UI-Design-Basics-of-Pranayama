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
	let isLeft = false;
	
	function getCurrentPoints() {
		$.get('/get_points', function(data) {
			// Log current points to the console
			console.log('Current points:', data.points);
		});
	}
	
	getCurrentPoints();
	
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

    function startTimer() {
        timerInterval = setInterval(function() {
			timerDisplay.textContent = seconds;
			pointsDisplay.textContent = points;
            // Check if 5 seconds interval has passed
			if (seconds >= 20) {
				stopTimer();
				
			}else {
				
				if (seconds % 5 === 0) {
					isLeft = !isLeft;
					intervalsOfFive++;
				}
				
				if (isLeft) {
					$('#left-btn').addClass('toclick');
					$('#right-btn').removeClass('toclick');
				}else {
					$('#right-btn').addClass('toclick');
					$('#left-btn').removeClass('toclick');
				}
				
				if (seconds % 1 === 0) {
					console.log(seconds);
					
					toggle = true
					$(window).keydown(function(e) {   
						if (isLeft && e.which === 37 && toggle) {
							points += 0.1;
							toggle = false;
						}
						
						if (!isLeft && e.which === 39 && toggle) {
							points += 0.1;
							toggle = false;
						}
						
						points = Math.round(points*10)/10;
					});
				}
				
				seconds++;
			}
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        // Save points in localStorage for question 4
        // Alert the user with the current points
        alert('You got ' + points + ' points!');
		$('#right-btn').removeClass('toclick');
		$('#right-btn').removeClass('clicked');
		$('#left-btn').removeClass('toclick');
		$('#left-btn').removeClass('clicked');
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
		clearInterval(timerInterval);
        // Reset timer and points
        seconds = 0;
        intervalsOfFive = 0;
        points = 0;
        timerDisplay.textContent = seconds;
        pointsDisplay.textContent = points;
		
        startTimer();
    });

    stopBtn.addEventListener('click', function() {
        stopTimer();
    });

    clearBtn.addEventListener('click', function() {
        clearTimer();
    });
	
	$('#submit-btn').click(function() {
		updatePoints(points);
		window.location.href = item["next"];
    });
	
	$(window).keyup(function(e) {   
	   if (e.which === 37)  {
		 $('#left-btn').removeClass('clicked');
	   }
	   if (e.which === 39)  {
		 $('#right-btn').removeClass('clicked');
	   }
	});
	
	$(window).keydown(function(e) {   
	   if (e.which === 37)  {
		 $('#left-btn').addClass('clicked');
	   }
	   if (e.which === 39)  {
		 $('#right-btn').addClass('clicked');
	   }
	});
});