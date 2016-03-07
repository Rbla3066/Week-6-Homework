jQuery(document).ready(function() {
	var gifArr = ["Dachshund", "Beagle"];
	$("#makeButton").click(function(){
		makeButton();
		$("#inputText").focus();
		$("#inputText").select();	
	});
	document.onkeyup = function(e){
		if(e.keyCode == 13){
			makeButton();
		};
	};
	function makeButton(){
		if($("#inputText").val() != ""){
			gifArr.push($("#inputText").val());
			$("#inputText").val("");
			makeButtons();
		};
	};
	$("body").on("click", ".gifButton", function(){
		var input = $(this).attr("id");
		var url = "http://api.giphy.com/v1/gifs/search?q="+input+"&api_key=dc6zaTOxFJmzC "; 
		$.ajax({url: url, method: "GET"}).done(function(response) {
			$("#gifs").html("");
			console.log(response);
			for(var i=0; i<11; i++){
				var still = response.data[i].images.fixed_height_still.url;
				var gif = response.data[i].images.fixed_height.url;
				var rating = "<div class='rating'>Rating: " + response.data[i].rating +"</div>";
				$("#gifs").append("<div class='gifDiv text-center thumbnail'>"+rating+"<div class='gif' data-still='"+still+"' data-gif='"+gif+"' data-state='still'><img src='"+still+"'></div></div>");
			};
    	});
	});
	$("body").on("click", ".gif", function(){
		if($(this).attr("data-state") == "still"){
			$(this).attr("data-state", "animate");
			$(this).html("<img src='"+$(this).attr("data-gif")+"'>");
		} else {
			$(this).attr("data-state", "still");
			$(this).html("<img src='"+$(this).attr("data-still")+"'>");
		};
	});
	makeButtons();
	function makeButtons(){
		$("#buttons").html("");
		for(var i=0; i<gifArr.length; i++){
			$("#buttons").append("<button type='button' class='button btn gifButton' id='"+ gifArr[i] +"'>"+ gifArr[i] +"</button>");
		};
	};	
});
