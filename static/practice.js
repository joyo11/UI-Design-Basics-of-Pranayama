$(document).ready(function () {
	$("#start-btn").click(function(){
		console.log("yo");
		var videoURL = $('#sound').prop('src');
		videoURL += "&autoplay=1";
		$('#sound').prop('src',videoURL);
	});
});