$(document).ready(function(){
	var elements = $(".cf-square").length;
	
	$(document).on("keyup", function(e){
		
		if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
			var elements = $(".cf-square").length;
			var active = parseInt( $(".cf-square.cf-active").attr("id") );
			
			/* Press left or up */
			if(e.keyCode == 37 || e.keyCode == 38){
				if(active > 1){
					active--;
				}
				else{
					active = elements;
				}
			}
			
			/* Press right or down */
			else if(e.keyCode == 39 || e.keyCode == 40){
				if(active < elements){
					active++;
				}
				else{
					active = 1;
				}
			}
			
			slide( active );
		}
	});

	$(".cf-slider").on("mousewheel", function (e) {

		// cross-browser wheel delta
		var e = window.event || e;
		e.preventDefault();
		var orientation = e.wheelDelta || -e.detail;
		
		if(orientation > 0){
			
		}
	
		var elements = $(".cf-square").length;
		var active = parseInt( $(".cf-square.cf-active").attr("id") );
		
		/* Scroll up */
		if(orientation > 0){
			if(active > 1){
				active--;
			}
		}
		
		/* Scroll down */
		else if(orientation < 0){
			if(active < elements){
				active++;
			}
		}
		
		slide( active );
	});
	
	$(".cf-square").on("click", function(e){
		var active = $(this).attr("id");
		
		slide( active );
	})
	
	function slide( active ){
		
		/*	Get the number of slides to the left	*/
		var prevSlides = active - 1;
		
		/*	Get the middle of the screen	*/
		var center = parseInt( $(".cf-slider").width() )/2;
		
		/*	Get the active slide width	*/
		var current = parseInt( $("#"+active).width() ) / 2;
		current = 150;
		
		/*	Get the starting place	*/
		var left = center - current - (prevSlides * 115);
		
		/*	Move the wrapper	*/
		$(".cf-wrapper").css("left", left);
		$(".cf-wrapper").css("margin-left", "0px");
	
		/* Determinate the level1 elements */
		var level1 = {
			"before": active - 1,
			"after": active + 1
		}
		
		/* Determinate the level2 elements */
		var level2 = {
			"before": active - 2,
			"after": active + 2
		}
		
		/*	Go throught all the elements	*/
		for(var x = 0; x < elements; x++){
			var temp = $(".cf-square")[x];
			var thisId = parseInt( $(temp).attr("id") );
			
			/*	Set the z-index	*/
			var distance = active - thisId;
			if(distance < 0){
				distance = distance * (-1);
			}
			$(temp).css("z-index", ( elements - distance ));
			
			/*	If it's the active element	*/
			if(active == thisId){
				$(temp).removeClass("cf-before");
				$(temp).addClass("cf-active");
				$(temp).removeClass("cf-after");
			}
			
			/*	If its a before element	*/
			else if(active > thisId){
				$(temp).addClass("cf-before");
				$(temp).removeClass("cf-active");
				$(temp).removeClass("cf-after");
			}
			
			/*	If its an after element	*/
			else if(active < thisId){
				$(temp).removeClass("cf-before");
				$(temp).removeClass("cf-active");
				$(temp).addClass("cf-after");
			}
			
			/*	If it's a level1 element	*/
			if(level1.before == thisId || level1.after == thisId){
				$(temp).addClass("cf-level1");
				$(temp).removeClass("cf-level2");
			}
			
			else{
				$(temp).removeClass("cf-level1");
				$(temp).addClass("cf-level2");
			}
		}
	}
});