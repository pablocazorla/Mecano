$('document').ready(function(){
	var $window = $(window),
		$copyArea = $('#copy-area'),
		$copyText = $('#copy-text'),
		$copyIframe = $('#copy-iframe'),
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
		$enterUrlCopy = $('#enter-url-copy'),
		
		enterCopy = function(){
			var urlCont = $enterUrlCopy.val();
			
			if(urlCont == ''){
				$copyText.show().html($enterTextCopy.val());
				$copyIframe.hide();
			}else{				
				$copyIframe.show().attr('src',urlCont);
				$copyText.hide();
			}
		},
		
		
		
		
		
		
		
		status = 'none',//none,startRec,rec,pause
		
		wordCounts = 0,
		wpm = 0,
		time = 0,
		timer = null,
		
		record = function(){
			status = 'rec';
			$btnRecord.addClass('btn-recording').html('Recording');
			$writeInput.focus();
			timer = setInterval(function(){
				wordCounts = $writeInput.val().split(' ').length;
				time++;
				wpm = Math.round(wordCounts*60/time);
				$wpm.html(wpm);
			},1000)
		},
		
		pause = function(){
			status = 'pause';
			$btnRecord.html('Pause');
			clearInterval(timer);
		},
		reset = function(){
			status = 'none';
			clearInterval(timer);
			$btnRecord.removeClass('btn-recording').html('Record');
			wordCounts = 0;
			wpm = 0;
			time = 0;
			$wpm.html(wpm);
			$writeInput.val('');
		},
		
		startRecord = function(){
			status = 'startRec';
			var num = 3,
				tim = setInterval(function(){
				$btnRecord.html(num);
				num--;
				if(num < 0){
					clearInterval(tim);
					record();
				}
			},1000);
			$btnRecord.html(num);
			num--;
		}
		
		
		
		
		;
		
	/* START */
	if($divCtrlInput.val()==''){
		drawDiv($window.width()/2-5,'win');
	}else{
		drawDiv(parseInt($divCtrlInput.val()));
	}
	enterCopy();
	$writeInput.val('');
	
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
		enterCopy();
	});
	$enterUrlCopy.change(function(){
		enterCopy();
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
	
	$btnReset.click(function(event){
		event.preventDefault();
		reset();
	});
	
	
	
	
	
	
});
