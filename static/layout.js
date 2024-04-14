function add_time(info){   
    $.ajax({
        type: "POST",
        url: "../add_time",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(info),
        success: function(result){
            let timestamp = result["timestamp"]
			console.log(timestamp);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function () {
	var timestamp = Date.now();
	add_time([timestamp, item]);
	
	$("#next-btn").on("click", function () {
        window.location.href = item["next"];
    });
	
	$("#prev-btn").on("click", function () {
        window.location.href = item["prev"];
    });
});