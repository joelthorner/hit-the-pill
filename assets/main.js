// stars by https://codepen.io/seanseansean/pen/vEjOvy
(function() {
	'use strict';
	/* 	'To actually be able to display anything with Three.js, we need three things:
		A scene, a camera, and a renderer so we can render the scene with the camera.' 
	   		
	   		- https://threejs.org/docs/#Manual/Introduction/Creating_a_scene 		*/

	var scene, camera, renderer;

	/* We need this stuff too */
	var container, aspectRatio,
		HEIGHT, WIDTH, fieldOfView,
		nearPlane, farPlane,
		mouseX, mouseY, windowHalfX,
		windowHalfY, stats, geometry,
		starStuff, materialOptions, stars;

	init();
	animate();

	function init() {
		container = document.createElement('div');
		document.body.appendChild( container );
		document.body.style.overflow = 'hidden';

		HEIGHT = window.innerHeight;
		WIDTH = window.innerWidth;
		aspectRatio = WIDTH / HEIGHT;
		fieldOfView = 75;
		nearPlane = 1;
		farPlane = 1000;
		mouseX = 0;
		mouseY = 0;

		windowHalfX = WIDTH / 2;
		windowHalfY = HEIGHT / 2;

	/* 	fieldOfView — Camera frustum vertical field of view.
			aspectRatio — Camera frustum aspect ratio.
			nearPlane — Camera frustum near plane.
			farPlane — Camera frustum far plane.	

			- https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

		 	In geometry, a frustum (plural: frusta or frustums) 
		 	is the portion of a solid (normally a cone or pyramid) 
		 	that lies between two parallel planes cutting it. - wikipedia.		*/

		camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

		//Z positioning of camera

		camera.position.z = farPlane / 2;
		
		scene = new THREE.Scene({antialias:true});
		scene.fog = new THREE.FogExp2( 0x000000, 0.0003 );

		// The wizard's about to get busy.
		starForge();
		
		//check for browser Support
		if (webGLSupport()) {
			//yeah?  Right on...
			renderer = new THREE.WebGLRenderer({alpha: true});

		} else {
			//No?  Well that's okay.
			renderer = new THREE.CanvasRenderer();
		}

		// renderer.setClearColor(0x000011, 1); // black bg
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize( WIDTH, HEIGHT);
		container.appendChild(renderer.domElement);

		// stats = new Stats();
		// stats.domElement.style.position = 'absolute';
		// stats.domElement.style.top = '0px';
		// stats.domElement.style.right = '0px';
		// container.appendChild( stats.domElement );

		window.addEventListener( 'resize', onWindowResize, false );
		document.addEventListener( 'mousemove', onMouseMove, false );
		
	}

	function animate() {
		requestAnimationFrame(animate);
		render();
		// stats.update();
	}


	function render() {
		camera.position.x += ( mouseX - camera.position.x ) * 0.005;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.005;
		camera.lookAt( scene.position );
		renderer.render(scene, camera);
	}

	function webGLSupport() {
		/* 	The wizard of webGL only bestows his gifts of power
			to the worthy.  In this case, users with browsers who 'get it'.		*/

		try {
			var canvas = document.createElement('canvas');
			return !!(window.WebGLRenderingContext && (
				canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
			);
		} catch(e) {
			// console.warn('Hey bro, for some reason we\'re not able to use webGL for this.  No biggie, we\'ll use canvas.');
			return false;
		}
	}

	function onWindowResize() {

		// Everything should resize nicely if it needs to!
	  	var WIDTH = window.innerWidth,
	  		HEIGHT = window.innerHeight;

	  	camera.aspect = aspectRatio;
	  	camera.updateProjectionMatrix();
	  	renderer.setSize(WIDTH, HEIGHT);
	}

	function starForge() {
		/* 	Yep, it's a Star Wars: Knights of the Old Republic reference,
			are you really surprised at this point? 
													*/
		var starQty = 45000;
			geometry = new THREE.SphereGeometry(1000, 100, 50);

	    	materialOptions = {
	    		size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
	    		transparency: true, 
	    		opacity: 0.7
	    	};

	    	starStuff = new THREE.PointCloudMaterial(materialOptions);

		// The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms

		for (var i = 0; i < starQty; i++) {		

			var starVertex = new THREE.Vector3();
			starVertex.x = Math.random() * 2000 - 1000;
			starVertex.y = Math.random() * 2000 - 1000;
			starVertex.z = Math.random() * 2000 - 1000;

			geometry.vertices.push(starVertex);

		}


		stars = new THREE.PointCloud(geometry, starStuff);
		scene.add(stars);
	}

	function onMouseMove(e) {

		mouseX = e.clientX - windowHalfX;
		mouseY = e.clientY - windowHalfY;
	}	

})();


// Bg original by https://github.com/JoanClaret/html5-canvas-animation/blob/master/js/color.js
var colors = new Array(
  [41, 98, 255],
  [118, 255, 3],
  [255, 23, 68],
  [24, 255, 255],
  [213, 0, 249],
  [255, 145, 0]);


//  

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient(){

	if ( $===undefined ) return;
	  
	var c0_0 = colors[colorIndices[0]];
	var c0_1 = colors[colorIndices[1]];
	var c1_0 = colors[colorIndices[2]];
	var c1_1 = colors[colorIndices[3]];

	var istep = 1 - step;
	var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
	var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
	var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
	var color1 = "rgb("+r1+","+g1+","+b1+")";

	var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
	var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
	var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
	var color2 = "rgb("+r2+","+g2+","+b2+")";

 	$('.bg').css({
	   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
	   background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}



$(document).ready(function() {
	updateGradient();
	// setInterval(updateGradient, 5);

	var firstTime = true, prev = 1, newPath = $('#source symbol').eq(1).find('path').attr('d');

	$(document).click(function(event) {

		var max = $('#source symbol').length - 1;
		var min = 0;
		var rand = Math.floor(Math.random() * (max - min + 1) + min);

		if (!firstTime) {

			while(prev == rand){
				rand = Math.floor(Math.random() * (max - min + 1) + min);
			}
			prev = rand;
			newPath = $('#source symbol').eq(rand).find('path').attr('d');
		}
		firstTime = false;
		
		var morph1 = KUTE.fromTo('#path-1',  { path : '#path-1' }, { path : newPath }, {morphPrecision : 4}).start();

	});

});