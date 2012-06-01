/*
 * Hidden Code For jQuery Plugin
 * Using the Hidden codes (as Konami one) easily configure and Easter Egg for your page
 * or any element on the page.
 *
 * Copyright 2012 CYRIL F, http://cyrilf.com
 * Released under the MIT License
 */

(function($) {

	$.fn.hiddenCode = function(options) {

		var opts = $.extend({}, $.fn.hiddenCode.defaults, options);
		return this.each(function() {

			var masterCode = 'konami';
			if (typeof opts.password !== 'undefined') {
			    masterCode = opts.password;
			}

			var isEncoded = false;
			if(typeof masterCode !== 'string'){
				isEncoded = true;
			}

			var masterKey = [];
			if(masterCode!='konami' && !isEncoded){
				masterCode = masterCode.toUpperCase();
				for(var i = 0; i<masterCode.length;i++){
					masterKey.push(masterCode.charCodeAt(i));
				}
			} else if(masterCode!='konami' && masterCode !== 'undefined'){
				masterKey = masterCode;
			} else {
				masterKey = [38,38,40,40,37,39,37,39,66,65];
			}

			var controllerKey = [];
			var state = false;
			var valid = false;
			$(window).keyup(function(evt) {
				var code = evt.keyCode ? evt.keyCode : evt.which;
				controllerKey.push(code);
				if(controllerKey.length <= masterKey.length && code == masterKey[controllerKey.length-1]){
					state = true;
				} else {
					var firstSame = true;
					if(controllerKey.length>1){
						for(var i=controllerKey.length;i>1;i--){
							if(controllerKey[i-1] != controllerKey[0]){
								firstSame = false;
							}
						}
						if(firstSame){
							state = true;
							controllerKey.pop();
						} else if(code == masterKey[0]){
							state = true;
							controllerKey = [code];
						} else {
							state = false;
							controllerKey = [];
						}
					} else {
						state = false;
						controllerKey = [];
					}
				}
				if(state === true && masterKey.length == controllerKey.length){
					valid = true;
				}
				if(valid) {
					opts.callback();
					state = valid = false;
					controllerKey = [];
				}
			}); // keyup
		}); // each
	}; // opts

	$.fn.hiddenCode.defaults = {
		callback: null
	};

})(jQuery);