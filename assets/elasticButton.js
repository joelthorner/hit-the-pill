/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


// https://tympanus.net/Development/ElasticSVGElements/button.html
(function() {

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	function SVGButton( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this.init();
	}

	SVGButton.prototype.options = {
		speed : { reset : 800, active : 150 },
		easing : { reset : mina.elastic, active : mina.easein }
	};

	SVGButton.prototype.init = function() {
		this.shapeEl = this.el.querySelector( 'span.morph-shape' );

		var s = Snap( this.shapeEl.querySelector( 'svg' ) );
		this.pathEl = s.select( 'path' );
		this.paths = {
			reset : this.pathEl.attr( 'd' ),
			active : this.shapeEl.getAttribute( 'data-morph-active' )
		};

		this.initEvents();
	};

	SVGButton.prototype.initEvents = function() {
		this.el.addEventListener( 'mousedown', this.down.bind(this) );
		this.el.addEventListener( 'touchstart', this.down.bind(this) );

		this.el.addEventListener( 'mouseup', this.up.bind(this) );
		this.el.addEventListener( 'touchend', this.up.bind(this) );

		this.el.addEventListener( 'mouseout', this.up.bind(this) );
	};

	SVGButton.prototype.down = function() {
		this.pathEl.stop().animate( { 'path' : this.paths.active }, this.options.speed.active, this.options.easing.active );
	};

	SVGButton.prototype.up = function() {
		this.pathEl.stop().animate( { 'path' : this.paths.reset }, this.options.speed.reset, this.options.easing.reset );
	};

	[].slice.call( document.querySelectorAll( 'button.button--effect-1' ) ).forEach( function( el ) {
		new SVGButton( el );
	} );

	[].slice.call( document.querySelectorAll( 'button.button--effect-2' ) ).forEach( function( el ) {
		new SVGButton( el, {
			speed : { reset : 650, active : 650 },
			easing : { reset : mina.elastic, active : mina.elastic }
		} );
	} );

})();