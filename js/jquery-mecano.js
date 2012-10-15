$('document').ready(function(){
	var $window = $(window),
		$copyArea = $('#copy-area'),
		$divCtrl = $('#div-ctrl'),
		$divCtrlInput = $divCtrl.find('input'),
		$writeArea = $('#write-area'),
		$writeInput = $('#write-input'),
		
		draggingDivCtrl = false,
		drawDiv = function(num,win){
			$divCtrl.css('left',num+'px');
			$copyArea.css('width',num+'px');
			$writeArea.css('left',num+10+'px');
			if(!win){$divCtrlInput.val(num)}
		};
		
	/* START */
	if($divCtrlInput.val()==''){
		drawDiv($window.width()/2-5,'win');
	}else{
		drawDiv(parseInt($divCtrlInput.val()));
	}
		
	
	/* EVENTS */
	$divCtrl.mousedown(function(){
		draggingDivCtrl = true;
	});
	
	
	$('html,body,#div-ctrl').mousemove(function(event){
		if(draggingDivCtrl) drawDiv(event.pageX-5);
	}).mouseup(function(){
		draggingDivCtrl = false;
	});
	
	
	
	
	
	
	
	
	
});
