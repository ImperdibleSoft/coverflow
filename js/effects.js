/*	Configure your Cover Flow slider		*/

/*	In this case, 200px is the basic size	*/
/*	Place your basic size	*/
var mySize = 200;

/*	Just call cf.start() when you want to load the events	*/
$(document).ready(function(){
	cf.start();
});



/*	Do NOT touch from here	*/
var cf = {};
cf.standardWidth = mySize;
cf.activeWidth = cf.standardWidth * 1.5;
cf.smallWidth = cf.standardWidth / 2;

cf.start = function(){
	var elements = $(".cf-square").length;
	
	/*	Set the wrapper width	*/
	var size = cf.activeWidth;
	var eachone = cf.smallWidth;
	size = size + (eachone * (elements - 1));
	size = size * 1.1;
	$(".cf-wrapper").width(size);
	
	/*	Place onkeyup listener	*/
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

	/*	Setup the mousewheel config	*/
	var wheeljump = 2;
	var counter = 0;
	
	/*	Place the mousewheel listener	*/
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
	
	/*	Place the click listener	*/
	$(".cf-square").on("click", function(e){
		var active = parseInt( $(this).attr("id") );
		
		slide( active );
	})
	
	function slide( active ){
	
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
		
		/*	Get the middle of the screen	*/
		var center = parseInt( $(".cf-slider").width() )/2;
		
		/*	Get the active slide width	*/
		var activeTab = cf.activeWidth / 2;
		
		var beforeTabs = 0;
		$(".cf-before").each(function(){
			beforeTabs = beforeTabs + cf.smallWidth;
		});
		
		/*	Get the starting place	*/
		var left = center - activeTab - beforeTabs;
		
		/*	Move the wrapper	*/
		$(".cf-wrapper").css("left", left);
		$(".cf-wrapper").css("margin-left", "0px");
	}
	
	slide( 1 );
}