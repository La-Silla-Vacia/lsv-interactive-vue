// v0.1.0

(function() {
	// base CSS file
	require("./src/interactive.less")

	// this assumes there is already a <div> on the page with the correct id, which Wordpress should have created (see README)
	module.exports = function(id, opts) {
		if (!id || (typeof id !== "string" && typeof id !== "object")) {
			console.log("Whoops -- you need to give time-interactive a string id of the element on the page in which to self-assemble or the element itself.");
			return;
		}
		opts = opts || {};

		if (typeof id === "string") {
			// make el, a $ object
			var sel = id[0] !== "#" ? ("#" + id) : id,
				$el = jQuery(sel);
		} else if (typeof id === "object") {
			var $el = jQuery(id);			
		}

		if ($el.length === 0) {
			console.log("Whoops -- the time-interactive function couldn't find a <div> on this page for the element it was given. You probably mistyped it in debug.js.");
			return;
		}

		var el = $el.get(0);

		// ought to already have this, but let's be sure
		$el.addClass("time-interactive");

		// remove the default screenshot placed by the short code unless you specify you want to keep
		if (!opts.keepScreenshot) {
			// remove screenshot
			$el.find(".screenshot").remove();	
		}

		// _$ and _d3 will only find elements inside the main div. 
		var _$ = function(selector) { 
			return $el.find(selector);
		};


		var _d3 = {
			select: function(selector) { 
				if (d3) {
					return d3.select(el).select(selector);
				} else {
					console.log("d3 isn't defined, so _d3 is confused");
					return null;
				}
			},
			selectAll: function(selector) { 
				if (d3) {
					return d3.select(el).selectAll(selector);
				} else {
					console.log("d3 isn't defined, so _d3 is confused");
					return null;
				}
			}			
		};

		// return the DOM object
		return {
			version: "0.0.8",
			id: id,
			el: el,
			_$: _$,
			_d3: _d3,
			width: function() { return $el.width(); },
			height: function() { return $el.height(); },
			page_width: jQuery(document).width(),
			page_height: jQuery(document).height(),
			aspect_ratio: jQuery(document).width() / jQuery(document).height(),
			params: $el.data() || {},
			onresize: function(f, delay) {
				delay = typeof delay === undefined ? 100 : delay;
				var resizeTimer;
				$(window).resize(function() { 
					clearTimeout(resizeTimer);
					resizeTimer = setTimeout(function() {				
						f($el.width(), $el.height());
					}, delay);
				});
			}
		};
	}


	/* CONVENIENCE FUNCTIONS */

	// add commas to numbers over 1000
	module.exports.commafy = function(val){
		if (typeof val !== "number") {
			return;
		}
		val = parseInt(val, 10);

	    while (/(\d+)(\d{3})/.test(val.toString())){
	      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	    }
	    return val;
	}

	// generate a unique GUID
	module.exports.guid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});		
	}

}());