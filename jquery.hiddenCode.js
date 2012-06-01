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

			//mastercode is the password send by the user. Else it's 'konami'
			var masterCode = 'konami';
			if (typeof opts.password !== 'undefined') {
			    masterCode = opts.password;
			}

			//isEncoded == true if the password of the user is an array of key control
			//if it's a string, it's not encoded so we will do it later
			var isEncoded = false;
			if(typeof masterCode !== 'string'){
				isEncoded = true;
			}

			//masterKey is the translation of the user password in key control
			var masterKey = [];
			if(masterCode!='konami' && !isEncoded){
				//keyup event doesn't differenciate upper and lowercase, so each password is compare upper
				masterCode = masterCode.toUpperCase();
				for(var i = 0; i<masterCode.length;i++){
					masterKey.push(masterCode.charCodeAt(i));
				}
			} else if(masterCode!='konami' && masterCode !== 'undefined'){
				masterKey = masterCode;
			} else {
				masterKey = [38,38,40,40,37,39,37,39,66,65];
			}

			//controllerKey contains the user input as he types
			var controllerKey = [];
			var state = false;
			var valid = false;
			$(window).keyup(function(evt) {
				var code = evt.keyCode ? evt.keyCode : evt.which;
				controllerKey.push(code);
				//If this letter equals the masterKey one (at the same position)
				if(controllerKey.length <= masterKey.length && code == masterKey[controllerKey.length-1]){
					state = true;
				} else {
					var firstSame = true;
					if(controllerKey.length>1){
						//This code fix a bug (if we have the same character for the first letters we have to keep this characters on memory)(hard to explain but resolve)
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
				//if the password is found, we execute the callback function and we restore the controllerKey
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