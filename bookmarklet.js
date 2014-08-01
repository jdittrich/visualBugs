	// use https://github.com/ardcore/bookbu.js to convert to bookmarklet
	
	function callback() {
		(function ($) {
	var url_html2canvas=""; //url for  html2canvs
	var url_sketchjs=""; //url for sketchjs
	var url_sentTo=""; //url the image and Text is POSTed to. 
	var $canvas_screenshot;
	var $canvas_paint; 
	var $canvas_merged;
	var $toolbox;
	var $indicator=$('<div style="position:fixed; right:0; top:0; background: white; color:black; font-size:25px;">loading…</div>').appendTo("body");
	//using a when promise, executing done WHEN both are resolved
	$.when($.getScript(url_html2canvas),$.getScript(url_sketchjs))
	.done(function(){
		//console.log($,jQuery,$.fn.sketch,html2canvas);
		//init sketchjs by its global var (custom hack)
		$indicator.text("finished loading").hide();
		__sketchjsglobal($); //initialize Sketch.js. Actually it should not need such a global but jQuery getScript executes globlay and including an AMD loader seemed a bit like overengineering it. 
		
		html2canvas(document.body, { //Init Screenshot. same here in regard to the global var 
			onrendered: function(canvas) { //on rendered called when screenshot is ready
				$canvas_screenshot = $(canvas);
				paintOnThis();//hand canvas element over to function
				createToolbox(); //create a toolbox
			},
			height:$(document).height()<1500 ? $(document).height():1000 //prevent huuuuge images. And prevent needless space by choosing the smallest of documentsize and maximal size. 
			
		});
	});
	var paintOnThis = function(){
		//create the canvas to draw on
		$canvas_paint=$("<canvas>");
		$canvas_paint.css(//the following overlays the paint-on-canvas with the screenshot
		{ 
			top:0,
			left:0,
			position:"absolute"
		}).attr({ //and copy the widht/heigt from the screenshot canvas
		width:$canvas_screenshot.attr("width"),
		height:$canvas_screenshot.attr("height"),
		id:"paintCanvas"
	})
	.appendTo("body");
	$canvas_paint.sketch({defaultColor: "#ff0"}); //activate sketch script; set default color
	};
	
	var resetCanvas = function(){ //the eraser function of the lib erases whole drawing but needs additional click on image before. Bad Usability. 
		$canvas_paint.remove(); //remove paint canvas
		paintOnThis(); //recreate new
	}
			
	var createToolbox=function(){ 
		//BUG: Since there is few style it takes the sites defaults. If they are wired, the form looks wired.
		$toolbox = $('<div id="screenshot_annotationTools" style="background-color:rgba(255,255,255,0.9); font-size:1em; font-family:sans-serif; border:1px solid lightgray"><a id="canvasscreenshot_hide">toggle overlay</a><a id="canvasscreenshot_restCanvas">&nbsp;Reset Drawing</a><h3>What did you do?</h3><input id="screenshot_whatDone" style="border:1px solid lightgray"/><h3>What did you expect/hoped to happen?</h3><textarea rows="4" cols="50" id="screenshot_whatExpected" style="border:1px solid lightgray"/><h3>What happened instead?</h3><textarea rows="4" cols="50" id="screenshot_whatHappened" style="border:1px solid lightgray"/><br/><button id="annotateSend">Send report</button><button id="annotateCancel">Cancel</button></div>').css(
{
			position:'absolute',
			zIndex:'9999',
			right:0,
			top:0
		}).appendTo("body");
		$("#annotateSend").click(sendIt);
		$("#annotateCancel").click(destroy);
		$("#canvasscreenshot_restCanvas").click(resetCanvas);
		$("#canvasscreenshot_hide").click(function(){
			$("#screenshot_annotationTools *").not("#canvasscreenshot_hide").fadeToggle();
		})
	};
	var destroy = function(){
		$canvas_screenshot.remove();
		$canvas_paint.remove();
		$indicator.remove();
		$toolbox.remove();
	}
	var sendIt = function(){ //merges the screenshot and the paint; collects and concartinates the bugreport;  sends the image and the text to the address in url_sentTo.
	$indicator.text("uploading in progress…").show({duration:1000});
	$toolbox.hide();
	//create the merged canvas: http://stackoverflow.com/questions/6787899/combining-two-or-more-canvas-elements-with-some-sort-of-blending
	var imagedata;
	var usercommentsdata = "Done:"+$("#screenshot_whatDone").val()+"; "+"Expect"+$("#screenshot_whatExpected").val()+"; "+"happened:"+$("#screenshot_whatHappened").val();
	var $canvas_merged= $("<canvas>").css(//the following overlays the paint-on-canvas with the screenshot
		{ 
			top:0,
			left:0,
			position:"absolute",
			zIndex:999
		}).attr({ //and copy the widht/height from the screenshot canvas
		width:$canvas_screenshot.attr("width"),
		height:$canvas_screenshot.attr("height"),
		id:"mergedcanvas"
	});//is not appended to body!

	var ctx = $canvas_merged[0].getContext("2d");
	ctx.drawImage($canvas_screenshot[0],0,0); //draw the first image (the screenshot)
	ctx.drawImage($canvas_paint[0],0,0);//draw the annotations on top
	
	imagedata= $canvas_merged[0].toDataURL();
	$.ajax({
		crossDomain:true,
		type:'POST',
		url:url_sentTo,
		data: {
			"name":usercommentsdata,
			"image":imagedata
		}
	}).
	always(function(){ //need always to remove these
		destroy();
	}).
	then(function(){ //first argument success: Data was send
		alert("thanks for reporting!");
	},function(){ //2nd argument fail
		alert("NOOOO… Your report can't be send. Please send a mail to us. Pass your report by copypasting this: \n"+usercommentsdata);
	});
};
		})(jQuery.noConflict(true));
	}
	var s = document.createElement("script");
	s.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
	if (s.addEventListener) {
		s.addEventListener("load", callback, false);
	} else if (s.readyState) {
		s.onreadystatechange = callback;
	}
	document.body.appendChild(s);


