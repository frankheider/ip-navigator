/*!
 * 
 * Licensed to ACME, Inc. under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  ACME, Inc. licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1]
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fullfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fullfilled = false;
/******/ 			}
/******/ 			if(fullfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"app-login": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/assets/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/jrumble/jquery.jrumble.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/jrumble/jquery.jrumble.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*
jRumble v1.3 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com

MIT License
-----------------------------------------------------------------------------
Copyright (c) 2012 Jack Rugile, http://jackrugile.com
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
	$.fn.jrumble = function(options){
		
		/*========================================================*/
		/* Options
		/*========================================================*/
		var defaults = {
			x: 2,
			y: 2,
			rotation: 1,
			speed: 15,
			opacity: false,
			opacityMin: .5
		},
		opt = $.extend(defaults, options);	
				
		return this.each(function(){
								  
			/*========================================================*/
			/* Variables
			/*========================================================*/
			var $this = $(this),				
				x = opt.x*2,
				y = opt.y*2,
				rot = opt.rotation*2,
				speed = (opt.speed === 0) ? 1 : opt.speed,			
				opac = opt.opacity,
				opacm = opt.opacityMin,
				inline,
				interval;
			
			/*========================================================*/
			/* Rumble Function
			/*========================================================*/		
			var rumbler = function(){				
				var rx = Math.floor(Math.random() * (x+1)) -x/2,
					ry = Math.floor(Math.random() * (y+1)) -y/2,
					rrot = Math.floor(Math.random() * (rot+1)) -rot/2,
					ropac = opac ? Math.random() + opacm : 1;
					
				/*========================================================*/
				/* Ensure Movement From Original Position
				/*========================================================*/				
				rx = (rx === 0 && x !== 0) ? ((Math.random() < .5) ? 1 : -1) : rx;
				ry = (ry === 0 && y !== 0) ? ((Math.random() < .5) ? 1 : -1) : ry;	
				
				/*========================================================*/
				/* Check Inline
				/*========================================================*/
				if($this.css('display') === 'inline'){
					inline = true;
					$this.css('display', 'inline-block');
				}
				
				/*========================================================*/
				/* Rumble Element
				/*========================================================*/			
				$this.css({
					'position':'relative',
					'left':rx+'px',
					'top':ry+'px',
					'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ropac*100+')',
					'filter':'alpha(opacity='+ropac*100+')',					
					'-moz-opacity':ropac,					
					'-khtml-opacity':ropac,					
					'opacity':ropac,
					'-webkit-transform':'rotate('+rrot+'deg)', 
					'-moz-transform':'rotate('+rrot+'deg)', 
					'-ms-transform':'rotate('+rrot+'deg)',
					'-o-transform':'rotate('+rrot+'deg)', 
					'transform':'rotate('+rrot+'deg)'
				});
			};
			
			/*========================================================*/
			/* Rumble CSS Reset
			/*========================================================*/
			var reset = {
				'left':0,
				'top':0,
				'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',
				'filter':'alpha(opacity=100)',					
				'-moz-opacity':1,					
				'-khtml-opacity':1,					
				'opacity':1,
				'-webkit-transform':'rotate(0deg)',
				'-moz-transform':'rotate(0deg)',
				'-ms-transform':'rotate(0deg)',
				'-o-transform':'rotate(0deg)',
				'transform':'rotate(0deg)'
			};
			
			/*========================================================*/
			/* Rumble Start/Stop Trigger
			/*========================================================*/
			$this.bind({
				'startRumble': function(e){
					e.stopPropagation();
					clearInterval(interval);
					interval = setInterval(rumbler, speed)
				},
				'stopRumble': function(e){
					e.stopPropagation();
					clearInterval(interval);
					if(inline){
						$this.css('display', 'inline');
					}
					$this.css(reset);
				}
			});		
			
		});// End return this.each
	};// End $.fn.jrumble
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js-exposed")))

/***/ }),

/***/ "../../../patzilla-ui/common/login.js":
/*!***************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/common/login.js ***!
  \***************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($, _, __webpack_provided___dot_string, jQuery) {// -*- coding: utf-8 -*-
// (c) 2014-2016 Andreas Motl, Elmyra UG
__webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js-exposed");
__webpack_require__(/*! jrumble */ "../../../node_modules/jrumble/jquery.jrumble.js");
__webpack_require__(/*! purl/purl */ "../../../node_modules/purl/purl.js");
__webpack_require__(/*! bootstrap-2.3.2/css/bootstrap.css */ "../../../node_modules/bootstrap-2.3.2/css/bootstrap.css");
__webpack_require__(/*! bootstrap-2.3.2/css/bootstrap-responsive.css */ "../../../node_modules/bootstrap-2.3.2/css/bootstrap-responsive.css");
// Font Awesome 3.2.1; TODO: Upgrade to more recent version
__webpack_require__(/*! font-awesome/css/font-awesome.css */ "../../../node_modules/font-awesome/css/font-awesome.css");
__webpack_require__(/*! patzilla.navigator.style */ "../../../patzilla-ui/navigator/style/index.js");

$(document).ready(function () {
    console.log("document.ready");

    var url = $.url(window.location.href);
    var domain = url.attr('host');

    $.extend(login_settings, { domain: domain });

    if (url.param('error') == 'true') {
        console.warn('Login failed (reason=' + url.param('reason') + '). Please check your credentials or contact us for support at ' + login_settings.support_email + '.');
        window.setTimeout(function () {
            $('.login-box').jrumble();
            $('.login-box').trigger('startRumble');
            window.setTimeout(function () {
                $('.login-box').trigger('stopRumble');
            }, 333);
        }, 150);
    }

    $('#mail-register').off('click');
    $('#mail-register').on('click', function () {

        var subject = _.template('<%= productname %>: Account registration on domain "<%= domain %>"')(login_settings);
        var body = _.template(__webpack_provided___dot_string.ltrim($('#template-mail-register').html()))(login_settings);

        tweak_mailto(this, subject, body);
    });

    $('#mail-login-failed').off('click');
    $('#mail-login-failed').on('click', function () {

        var subject = _.template('<%= productname %>: Login keeps failing for account "<%= username %>" on domain "<%= domain %>"')(login_settings);
        var body = _.template(__webpack_provided___dot_string.ltrim($('#template-mail-login-failed').html()))(login_settings);

        tweak_mailto(this, subject, body);
    });

    $('#visit-demo').off('click');
    $('#visit-demo').on('click', function () {

        var demourl = url.attr('protocol') + '://' + url.attr('host');
        if (url.attr('port')) demourl += ':' + url.attr('port');
        if (__webpack_provided___dot_string.contains(demourl, 'patentsearch')) {
            demourl = demourl.replace('patentsearch', 'patentview');
        } else if (__webpack_provided___dot_string.contains(demourl, 'navigator')) {
            demourl = demourl.replace('navigator', 'viewer');
        } else if (__webpack_provided___dot_string.contains(demourl, 'patbib')) {
            demourl = demourl.replace('patbib', 'patview');
        } else if (!__webpack_provided___dot_string.contains(demourl, 'localhost')) {
            demourl = demourl.replace(url.attr('host'), 'patentview.ip-tools.io');
        }
        demourl += '?op=eyJhbGciOiAiUlMyNTYiLCAidHlwIjogIkpXVCJ9.eyJqdGkiOiAiZDZUT3Ewc3NkRDB6TTVCSGdhOEJrQT09IiwgImRhdGEiOiB7InByb2plY3QiOiAicXVlcnktcGVybWFsaW5rIiwgInF1ZXJ5IjogInR4dD0oU1M3IG9yICh0ZWxlY29tbXVuaWNhdGlvbiBvciBjb21tdW5pY2F0aW9uIG9yIGNvbXVuaWNhY2lcdTAwZjNuKSBvciAobW9iaWxlIG9yIE1vYmlsZnVua25ldHopIG9yIChuZXR3b3JrIG9yIChzZWN1cml0eSBvciBTaWNoZXJ1bmcpKSkgYW5kIHBhPShtb2JpbCBvciBrb21tdW5pa2F0aW9uKSBhbmQgY2w9KEgwNFcxMi8xMiBvciBIMDRMNjMvMDI4MSBvciBIMDRMNjMvMDQxNCkgbm90IHBuPShDTiBvciBDQSBvciBKUCkiLCAibW9kZSI6ICJsaXZldmlldyIsICJjb250ZXh0IjogInZpZXdlciIsICJkYXRhc291cmNlIjogIm9wcyJ9LCAibmJmIjogMTUwNzgyNjYxNywgImV4cCI6IDE2NjMzNDY2MTcsICJpYXQiOiAxNTA3ODI2NjE3fQ.fCl7I5wPd0r48O48UkVQxzw9QOy5PjFaFecmAoYisbM-Her9Z6R0E2hxc82TSdH68gz379jQe5v9eF6g620aG4odTOXtdhyoDrWcb-GJcfR-0BfpiqPRwzLng53ape69';

        //console.log(demourl);
        $(this).attr('href', demourl);
    });
});

function tweak_mailto(element, subject, body) {

    // prevent double tweaking
    if ($(element).data('tweaked')) {
        return;
    }
    $(element).data('tweaked', true);

    var mailto_data = {
        'subject': subject,
        'body': body
    };

    var href = $(element).attr('href');
    href += '?' + jQuery.param(mailto_data).replace(/\+/g, '%20');
    $(element).attr('href', href);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js-exposed"), __webpack_require__(/*! underscore */ "../../../node_modules/underscore/underscore.js"), __webpack_require__(/*! underscore.string */ "../../../node_modules/underscore.string/index.js"), __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js-exposed")))

/***/ }),

/***/ 1:
/*!******************************************************************************!*\
  !*** multi /home/frank/DATA/Development/ipnav-py37/patzilla-ui/common/login ***!
  \******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/frank/DATA/Development/ipnav-py37/patzilla-ui/common/login */"../../../patzilla-ui/common/login.js");


/***/ })

/******/ });
//# sourceMappingURL=app-login.bundle.js.map