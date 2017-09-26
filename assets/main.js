$(document).ready(function() {
	
	var prev = 0, 
		 pillPath = {
		 	p1 : $('#pill .path-1'),
		 	p2 : $('#pill .path-2')
		 },
		 semafort = false;

	$('#svg').click(function(event) {
		var max = $('#source symbol').length - 1;
		var min = 0;
		var path = {};
		var rand = Math.floor(Math.random() * (max - min + 1) + min);

		if (semafort) {
			path = pillPath;
		
		}else{

			if(prev == undefined) {
				prev = rand;
			
			}else{

				while(prev == rand){
					rand = Math.floor(Math.random() * (max - min + 1) + min);
				}
				prev = rand;
			}

			path = {
				p1 : $('#source symbol').eq(rand).find('.path-1'),
				p2 : $('#source symbol').eq(rand).find('.path-2')
			};
				
		}
		semafort=!semafort;
// reverseSecondPath:true
console.log(path.p2.attr('fill'));

		var morph1 = KUTE.fromTo('#path-1',  { 
			attr : { 
				fill : $('#path-1').attr('fill') 
			}, 
			path : $('#path-1').attr('d') 
		}, { 
			attr : { 
				fill : path.p1.attr('fill') 
			}, 
			path : path.p1.attr('d')
		}).start();

		var morph2 = KUTE.fromTo('#path-2',  { 
			attr : { 
				fill : $('#path-2').attr('fill') 
			}, 
			path : $('#path-2').attr('d') 
		}, { 
			attr : { 
				fill : path.p2.attr('fill') 
			}, 
			path : path.p2.attr('d')
		}).start();
	});

});