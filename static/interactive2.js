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
	
	function getCurrentPoints() {
		$.get('/get_points', function(data) {
			// Log current points to the console
			console.log('Current points:', data.points);
		});
	}
	
	getCurrentPoints();
	
	// Function to update points
	function updatePoints(points) {
		id = item["id"];
		console.log('Updating points with value:', points);
		// Send AJAX request to update points on the server
		$.ajax({
			type: 'POST',
			url: '/add_points',
			contentType: 'application/json',
			data: JSON.stringify({ points: points, id:id}),
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
			if (seconds >= 30) {
				stopTimer();
				
			}else {
				
				if ((seconds <= 15 || seconds > 20) && seconds > 5) {
					$('#space-btn').addClass('toclick');
				} else {
					$('#space-btn').removeClass('toclick');
				}
				
				if (seconds % 1 === 0) {
					console.log(seconds);
					
					toggle = true
					$(window).keydown(function(e) {   
						if (e.which === 32 && toggle) {
							toggle = false;
							if ((seconds <= 15 || seconds > 20) && seconds > 5) {
								points += 0.1;
							}
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
        // Save points in localStorage
        // Alert the user with the current points
        alert('You got ' + points + ' points!');
		$('#space-btn').removeClass('toclick');
		$('#space-btn').removeClass('clicked');
    }

    function clearTimer() {
        clearInterval(timerInterval);
        // Reset timer and points
		$('#right-btn').removeClass('toclick');
		$('#right-btn').removeClass('clicked');
		$('#left-btn').removeClass('toclick');
		$('#left-btn').removeClass('clicked');
        seconds = 0;
        intervalsOfFive = 0;
        points = 0;
        timerDisplay.textContent = seconds;
        pointsDisplay.textContent = points;
        // Update points immediately when timer is cleared
        stopTimer();
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
	
	$('#submit-btn').click(function() {
		updatePoints(points);
		window.location.href = item["next"];
    });

    clearBtn.addEventListener('click', function() {
        clearTimer();
    });
	
	$(window).keydown(function(e) {   
	   if (e.which === 32)  {
		 e.preventDefault();
		 $('#space-btn').addClass('clicked');
	   }
	});
	
	$(window).keyup(function(e) {   
	   if (e.which === 32)  {
		 $('#space-btn').removeClass('clicked');
	   }
	});
});