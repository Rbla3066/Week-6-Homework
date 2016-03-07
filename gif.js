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
		popGifs(0, $(this).attr("id"));
	});
	function popGifs(number, input){
		var reference = parseInt(number);
		var url = "https://api.giphy.com/v1/gifs/search?q="+input+"&limit=100&api_key=dc6zaTOxFJmzC "; 
		$.ajax({url: url, method: "GET"}).done(function(response) {
			$("#gifs").html("");
			for(var i=reference; i<reference+10; i++){
				var still = response.data[i].images.fixed_height_still.url;
				var gif = response.data[i].images.fixed_height.url;
				var rating = "<div class='rating'>Rating: " + response.data[i].rating +"</div>";
				$("#gifs").append("<span class='gifDiv text-center thumbnail'>"+rating+"<div class='gif' data-still='"+still+"' data-gif='"+gif+"' data-state='still'><img src='"+still+"' class='img-responsive center-block'></div></span>");
			};
			if(response.data.length > 10){
				var pages = (response.data.length - (response.data.length % 10)) / 10;
				if(response.data.length % 10 != 0) pages++;
				$("#pages").html("<span style='font-size: 24px; font-weight: bold;'>Pages: </span>");
				for(i=1; i<=pages; i++){
					$("#pages").append("<span class='pageButton' data-input='"+input+"' data-num='"+((i-1)*10)+"'><button type='button' class='btn button'>"+i+"</button></span>");
				};
			};
    	});
    };
    $("body").on("click", ".pageButton", function(){
    	popGifs($(this).attr("data-num"), $(this).attr("data-input"));
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
