/* Joelthorner 2017 - http://joelthorner.github.io/hit-the-pill/ */

const ITEMS = 8;
var morph1 = null;

function updateList(){
	var findeds = 0;
	for (var i = 0; i < ITEMS; i++) {
		var finded = localStorage.getItem('i-' + i + '-finded');
		var n = localStorage.getItem('i-' + i + '-n');

		if (finded == "true") {
			$('.menu ul .i-' + i + ' svg')
				.html( $('#source symbol').eq(i).html() );
			$('.menu ul .i-' + i + ' .n').text(n);
			findeds++;
		}
	}
	
	if (findeds == ITEMS || localStorage.getItem('WINNER') == 'true') {
		localStorage.setItem('WINNER', true);
		
		if (morph1) morph1.stop();
		morph1 = KUTE.to('#path-1',  { path : $('#winner path').attr('d') }, { morphPrecision : 3, duration: 500 });//.start();
		!morph1.playing && morph1.start();

		var myTextTween = KUTE.to('#winner', { text: 'Winner'}).start();;
	}else{
		localStorage.setItem('WINNER', false);
	}
}

function initStorage(){
	for (var i = 0; i < ITEMS; i++) {
		localStorage.setItem('i-' + i + '-finded', false);
		localStorage.setItem('i-' + i + '-n', 0);
	}
}

$(document).ready(function() {
	updateGradient();
	// setInterval(updateGradient, 35);

	var saveData = localStorage.getItem('saveData');
	var min = 0, max = ITEMS -1, prev, rand, newPath;//, morph1;

	if (saveData == 'true') {
		$('html').addClass('open-init');
		prev = localStorage.getItem('prev');
	   newPath = $('#source symbol').eq(prev).find('path');
	}else{
		initStorage();
	}

	updateList();

	$('#svg').on('click.change', function(event) {
		if(localStorage.getItem('WINNER') != 'true')	{

			if (morph1) morph1.stop();

			rand = Math.floor(Math.random() * (max - min + 1) + min);

			while(prev == rand){
				console.log(prev, rand);
				rand = Math.floor(Math.random() * (max - min + 1) + min);
			}
			prev = rand;
			localStorage.setItem('prev', prev);
			localStorage.setItem('i-' + rand + '-finded', true);
			localStorage.setItem('i-' + rand + '-n', parseInt(localStorage.getItem('i-' + rand + '-n')) + 1 );
			newPath = $('#source symbol').eq(rand).find('path');

			
			$('html').addClass('open');
			localStorage.setItem('saveData', true);
			
			morph1 = KUTE.to('#path-1',  { path : newPath.attr('d') }, { morphPrecision : 3, duration: 500 });//.start();
			!morph1.playing && morph1.start();
			
			updateList();
		}

	});

	
	$('#clear').click(function(event) {
		
		$('html').removeClass('open-init open');
		
		setTimeout(function(){
			$('.menu ul li svg, .menu ul li .n').html('');
		}, 380);

		localStorage.removeItem("saveData");
		localStorage.removeItem("prev");
		localStorage.removeItem('WINNER');
		for (var i = 0; i < ITEMS; i++) {
			localStorage.removeItem('i-' + i + '-finded');
			localStorage.removeItem('i-' + i + '-n');
		}
		initStorage();
	});

});