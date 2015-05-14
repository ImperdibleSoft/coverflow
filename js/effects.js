$(document).ready(function(){
	var elements = $(".cf-square").length;
	var wheeljump = 2;
	var counter = 0;
	
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
		if(orientation > 0 && active > 1){
			counter--;
			if((counter * (-1)) >= wheeljump){
				counter = 0;
				active--;
				slide( active );
			}
		}
		
		/* Scroll down */
		else if(orientation < 0 && active < elements){
			counter++
			if(counter >= wheeljump){
				counter = 0;
				active++;
				slide( active );
			}
		}
		
	});
	
	$(".cf-square").on("click", function(e){
		var active = parseInt( $(this).attr("id") );
		
		slide( active );
	})
	
	function slide( active ){
		
		/*	Get the number of slides to the left	*/
		var prevSlides = active - 1;
		
		/*	Get the middle of the screen	*/
		var center = parseInt( $(".cf-slider").width() )/2;
		
		/*	Get the active slide width	*/
		var current = parseInt( $("#"+active).width() ) / 2;
		//current = 150;
		
		/*	Get the starting place	*/
		var temp = parseInt( $(".cf-active").attr("id") );
		var normal = temp >= elements ? parseInt( $($(".cf-before")[0]).width() ) : parseInt( $($(".cf-after")[0]).width() );
		var margin = temp >= elements ? parseInt( $($(".cf-before")[0]).css("margin-right") ) : parseInt( $($(".cf-after")[0]).css("margin-left") );
		margin = margin * 0.85;
		if(margin < 0){
			margin = margin * (-1);
		}
		var diff = normal - margin;
		var left = center - current - (prevSlides * diff);
		
		/*	Move the wrapper	*/
		$(".cf-wrapper").css("left", left);
		$(".cf-wrapper").css("margin-left", "0px");
	
		/* Determinate the level1 elements */
		var level1 = {
			"before": (active - 1),
			"after": (active + 1)
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
				
				$(temp).removeClass("cf-level1");
				$(temp).removeClass("cf-level2");
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
			
			else if(active != thisId){
				$(temp).removeClass("cf-level1");
				$(temp).addClass("cf-level2");
			}
		}
	}
	
	var active = parseInt( $(".cf-active").attr("id") );
	slide( active );
});