$(document).ready(function(){
	var elements = $(".square").length;
	
	$(".square").each(function(){
	
		/*	place the event listeners	*/
		$(this).on("mouseenter", function(){
			
			/* Determinate the active element */
			var active = parseInt( $(this).attr("id") );
			
			animate( active );
		});
	});
	
	$(document).on("keyup", function(e){
		
		if(e.keyCode == 37 || e.keyCode == 39){
			var elements = $(".square").length;
			var active = parseInt( $(".square.active").attr("id") );
			
			/* Press left <- */
			if(e.keyCode == 37){
				if(active > 1){
					active--;
				}
				else{
					active = elements;
				}
			}
			
			/* Press right -> */
			else if(e.keyCode == 39){
				if(active < elements){
					active++;
				}
				else{
					active = 1;
				}
			}
			
			animate( active );
		}
	});

	$(document).on("mousewheel", function(e){
		console.log(e);
	})

	function animate( active ){
		
		/*	Get the number of slides to the left	*/
		var prevSlides = active - 1;
		
		/*	Get the middle of the screen	*/
		var center = window.innerWidth/2;
		
		/*	Get the active slide width	*/
		var current = parseInt( $("#"+active).width() ) / 2;
		current = 230;
		
		/*	Get the starting place	*/
		var left = center - current - (prevSlides * 115);
		
		/*	Move the wrapper	*/
		$(".wrapper").css("left", left);
		$(".wrapper").css("margin-left", "0px");
	
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
			var temp = $(".square")[x];
			var thisId = parseInt( $(temp).attr("id") );
			
			/*	Set the z-index	*/
			var distance = active - thisId;
			if(distance < 0){
				distance = distance * (-1);
			}
			$(temp).css("z-index", ( elements - distance ));
			
			/*	If it's the active element	*/
			if(active == thisId){
				$(temp).removeClass("before");
				$(temp).addClass("active");
				$(temp).removeClass("after");
				$(temp).css("z-index", elements);
			}
			
			/*	If its a before element	*/
			else if(active > thisId){
				$(temp).addClass("before");
				$(temp).removeClass("active");
				$(temp).removeClass("after");
			}
			
			/*	If its an after element	*/
			else if(active < thisId){
				$(temp).removeClass("before");
				$(temp).removeClass("active");
				$(temp).addClass("after");
			}
			
			
			/*	If it's a level1 element	*/
			if(level1.before == thisId || level1.after == thisId){
				$(temp).addClass("level1");
				$(temp).removeClass("level2");
			}
			
			else{
				$(temp).removeClass("level1");
				$(temp).addClass("level2");
			
			}
		}
	}
});