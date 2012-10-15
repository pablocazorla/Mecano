$('document').ready(function(){
	var $window = $(window),
		$copyArea = $('#copy-area'),
		$divCtrl = $('#div-ctrl'),
		$divCtrlInput = $divCtrl.find('input'),
		$writeArea = $('#write-area'),
		$writeInput = $('#write-input'),
		$btnRecord = $('.btn-record'),
		$btnReset = $('.btn-reset'),
		$wpm = $('#wpm'),
		
		draggingDivCtrl = false,
		drawDiv = function(num,win){
			$divCtrl.css('left',num+'px');
			$copyArea.css('width',num-40+'px');
			$writeArea.css('left',num+10+'px');
			if(!win){$divCtrlInput.val(num)}
		},
		$enterTextCopy = $('#enter-text-copy'),
		
		
		
		
		
		
		status = 'none',//none,startRec,rec,pause
		wpm = 0,
		time = 0,
		
		record = function(){
			status = 'rec';
			$btnRecord.addClass('btn-recording').html('Recording');
		},
		
		pause = function(){
			$btnRecord.removeClass('btn-recording').html('Pause');
			recording = false;
		},
		reset = function(){},
		
		startRecord = function(){
			status = 'startRec';
			var num = 3,
				tim = setInterval(function(){
				$wpm.html(num);
				num--;
				if(num <= 0){
					clearInterval(tim);
					record();
				}
			},1000)
		}
		
		
		
		
		;
		
	/* START */
	if($divCtrlInput.val()==''){
		drawDiv($window.width()/2-5,'win');
	}else{
		drawDiv(parseInt($divCtrlInput.val()));
	}
	$copyArea.html($enterTextCopy.val());
	
	/* EVENTS */
	$divCtrl.mousedown(function(){
		draggingDivCtrl = true;
	});	
	$('html,body,#div-ctrl').mousemove(function(event){
		if(draggingDivCtrl) drawDiv(event.pageX-5);
	}).mouseup(function(){
		draggingDivCtrl = false;
	});	
	$enterTextCopy.change(function(){
		$copyArea.html($enterTextCopy.val());
	});
	
	$btnRecord.click(function(event){
		event.preventDefault();
		switch(status){
			case 'none':
				startRecord();
				break;
			case 'startRec':
				//Nothing
				break;
			case 'rec':
				pause();
				break;
			case 'pause':
				record();
				break;
		}
	});
	
	
	
	
	
	
	
	
});
