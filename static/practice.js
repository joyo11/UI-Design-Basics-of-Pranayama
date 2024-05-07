$(document).ready(function () {
	
	var interval;
	var timeouts = [];
	var count = 0;
	
	$("#start-btn").click(function(){
		console.log("yo");
		var videoURL = $('#sound').prop('src');
		videoURL += "&autoplay=1";
		$('#sound').prop('src',videoURL);
		
		count = 0
		$('.overlay-text').text("Ready?").removeClass("done");
		startSequence();
	});
	
	function startTimer() {
		clearInterval(interval); // Clear any existing interval

		var start = new Date().getTime(); // Get the current time

		interval = setInterval(function() {
			$('.overlay-text').text(Math.round((new Date() - start) / 1000));
		}, 1000); // Update every second
	}

	function clearTimer() {
		clearInterval(interval); // Clear the interval
		timeouts.forEach(function(timeout) {
			clearTimeout(timeout); // Clear all timeouts
		});
	}
	
	if (item["id"] == 1) {

		function startSequence() {
			clearTimer(); // Clear any existing timer

			timeouts.push(setTimeout(function() {
				function sequence() {
					if (count < 8) {
						startTimer(); // Start the timer
						count++;
						timeouts.push(setTimeout(function() {
							clearTimer(); // Clear the timer after 5 seconds
							sequence(); // Start next sequence immediately
						}, 5000)); // 5 seconds
					} else {
						clearTimer(); // Clear the timer
						$('.overlay-text').text("Done!").addClass("done");
					}
				}

				sequence(); // Start the sequence
			}, 14500)); // Delay for 14.5 seconds before starting
		}
		
	} else if (item["id"] == 2) {
		
		function startSequence() {
			clearTimer(); // Clear any existing timer

			timeouts.push(setTimeout(function() {
				function sequence() {
					startTimer(); // Start the timer
					timeouts.push(setTimeout(function() {
						clearTimer(); // Clear the timer after 20 seconds
						$('.overlay-text').text("Done!").addClass("done"); // Start next sequence immediately
					}, 20000)); // 20 seconds
				}

				sequence(); // Start the sequence
			}, 5500)); // Delay for 5.5 seconds before starting
		}
		
	} else {
		
		function startSequence() {
			clearTimer(); // Clear any existing timer

			timeouts.push(setTimeout(function() {
				function sequence() {
					if (count < 28) {
						if (count % 2 == 0) {
							$('.overlay-text').text("IN");
						} else {
							$('.overlay-text').text("OUT");
						}
						count++;
						timeouts.push(setTimeout(function() {
							clearTimer(); // Clear the timer after 1 second
							sequence(); // Start next sequence immediately
						}, 1000)); // 1 second
					} else {
						clearTimer(); // Clear the timer
						$('.overlay-text').text("Done!").addClass("done");
					}
				}

				sequence(); // Start the sequence
			}, 5800)); // Delay for 5.8 seconds before starting
		}
		
	}
});