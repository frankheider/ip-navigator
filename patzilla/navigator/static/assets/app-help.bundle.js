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
/******/ 		"app-help": 0
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
/******/ 	deferredModules.push([2,"commons"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/keyboarder/keyboarder.css":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/node_modules/keyboarder/keyboarder.css ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../css-loader/lib/url/escape.js */ "../../../node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\nauthor:       L. Sauer 2011; lsauer.com\nproject:      KeyBoarder\ndescription:  keyBoarder is a small, fast javascript library which dynamically replaces text-written keyboard-shortcuts for visually appealing, stylizable, navigatable shortcuts.\nlicense:      MIT license\n*/\n/*\n Base class which all kb-classes should 'inherit':\n  e.g.: <kbd class=\"kbKey kbKeyNested\"> STRG+WIN+O </kbd>\n  or by listing all your derived classes:\n  e.g.: .kbKey,.kbKeyFancy, {...}\n */\n.kbKey,\n.kbKeyModern,\n.kbKeyDark,\n.kbKeylight,\n.kbKeyFancy,\n.kbKeySimple {\n  display: inline-block;\n  padding: .2em .3em;\n  margin: 2px 3px 2px 3px;\n  min-width: 1.3em;\n  min-height: 1.4em;\n  /*border*/\n  border: 0.25em solid;\n  border-top-width: 0.2em;\n  border-left-width: 0.2em;\n  border-color: #DDD #BBB #BBB #DDD;\n  border-radius: .2em;\n  -moz-border-radius: .3em;\n  -webkit-border-radius: .3em;\n  /*text*/\n  font: bold .9em \"Lucida Grande\", Lucida, Arial, sans-serif;\n  /*font-family: inherit;*/\n  color: #333;\n  text-align: center;\n  text-decoration: none;\n  white-space: nowrap;\n  line-height: 1.5em;\n  text-shadow: #a0a0a0 3px 3px 6px;\n  /* prevents selection of the text */\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  /*other*/\n  background: #EEE;\n  cursor: default; }\n\n/*\n Modern: Round, soft style with gradients, suitable for light, to grey backgrounds\n */\n.kbKeyModern {\n  color: #222;\n  border-color: #DDD #BBB #BBB #DDD;\n  margin: 2px 3px 2px 3px;\n  min-width: 1.3em;\n  min-height: 1.4em;\n  border-radius: .3em;\n  -moz-border-radius: .3em;\n  -webkit-border-radius: .3em;\n  cursor: pointer;\n  text-shadow: #a0a0a0 3px 3px 6px;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #e7e7e9), color-stop(1, #a6a6ac));\n  -webkit-box-shadow: 5px 4px 10px gray; }\n\n/*\nDark style for displaying keys on a white or light background\n */\n.kbKeyDark {\n  background-color: #aaa;\n  padding: .2em .3em;\n  font: bold .9em \"Lucida Grande\", Lucida, Arial, sans-serif;\n  color: #fff;\n  border-color: #666 #999 #999 #666;\n  border-radius: .5em;\n  -moz-border-radius: .5em;\n  -webkit-border-radius: .5em; }\n\n/*\nFancy style: css-class to experiments with\n */\n.kbKeyFancy {\n  cursor: url(" + escape(__webpack_require__(/*! ./res/ico/bluescreen16.ico */ "../../../node_modules/keyboarder/res/ico/bluescreen16.ico")) + "); }\n\n/*\nSimple style: ideal for formal documents, with a lighter background\n */\n.kbKeySimple {\n  border: 0.1em solid;\n  border-top-width: 0.2em;\n  border-left-width: 0.2em;\n  background: #EEE;\n  padding: .2em .3em;\n  font: bold .9em \"Courier New\", Courier, monospace;\n  color: #222;\n  text-align: center;\n  white-space: nowrap;\n  border-color: #DDD;\n  line-height: 1.5em;\n  margin: 2px 3px 2px 3px;\n  min-width: 1.3em;\n  min-height: 1.4em;\n  border-radius: .4em;\n  -moz-border-radius: .4em;\n  -webkit-border-radius: .4em;\n  text-shadow: none; }\n\n/*\nLight style: css-class to experiments with\n */\n/*@import: url(http://fonts.googleapis.com/css?family=Aldrich)*/\n.kbKeyLight {\n  padding: 3px;\n  text-align: center;\n  font-family: \"Aldrich\", sans-serif;\n  background: #fafafa;\n  background: -moz-linear-gradient(top, #d2d2d2, white);\n  background: -webkit-gradient(linear, left top, left bottom, from(#d2d2d2), to(white));\n  color: #3c3c3c;\n  -webkit-box-shadow: inset 0 0 1px white, inset 0 0 0.4em #c8c8c8, 0 0.1em 0 #828282, 0 0.1em 0 rgba(0, 0, 0, 0.4), 0 0.1em 0.1em rgba(0, 0, 0, 0.9);\n  box-shadow: inset 0 0 1px white, inset 0 0 0.4em #c8c8c8, 0 0.1em 0 #828282, 0 0.1em 0 rgba(0, 0, 0, 0.4), 0 0.1em 0.1em rgba(0, 0, 0, 0.9);\n  /*may become obsolete soon*/\n  -moz-box-shadow: inset 0 0 1px white, inset 0 0 0.3em #c8c8c8, 0 0.1em 0 #828282, 0 0.1em 0 rgba(0, 0, 0, 0.4), 0 0.1em 0.1em rgba(0, 0, 0, 0.9); }\n\n/** HOVER STYLES */\n/*\n Default key-shortcut style during an onmouseover mouse event\n */\n.kbKey:hover,\n.kbKeyModern:hover,\n.kbKeyDark:hover,\n.kbKeylight:hover,\n.kbKeySimple:hover,\n.kbKeyFancy:hover,\n.kbKeyHighlight {\n  opacity: 0.7;\n  -moz-transition: opacity 0.6s;\n  -webkit-transition: opacity 0.6s;\n  -o-transition: opacity 0.6s;\n  /*background: #fff;*/\n  font-color: #999;\n  /*border-color: #DDD #AAA #AAA #DDD;\n  border-style: groove;\n  */\n  /* looks like a key press: */\n  /*border-width: 0.1em 0.15em 0.15em 0.1em;*/\n  -webkit-box-shadow: 5px 4px 10px #aaa; }\n\n.kbKeyModern:hover {\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #b4b4b4), color-stop(1, #747470)); }\n\n/*\n Class for nesting of keys \n e.g.\n    This is a text with a shortcut: <kbd class=\"kbKey kbKeyNested\"> CTRL+WIN+P </kbd>\n */\n.kbKeyNested {\n  border-radius: .9em;\n  padding: .6em .5em;\n  background-color: #fff; }\n\n/*\n Default style applied when a key is focused by pressing the corresponding key of the shortcut\n */\n.kbKeyHighlight {\n  /*background: #333;\n  font-color: #fff;\n  border-color: #DDD #AAA #AAA #DDD;*/ }\n\n/*\n Default style for the concatenation symbol: default is '+' e.g. CTRL+WIN+P\n */\n.kbConcat {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  vertical-align: central;\n  display: inline-block;\n  text-align: center;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  background-color: #999;\n  color: #fff;\n  line-height: .9em;\n  width: 1.2em;\n  height: 1.2em;\n  max-height: 30px;\n  max-height: 30px;\n  font-family: verdana;\n  font-size: 1em;\n  font-weight: bold; }\n\n.kbConcatBold {\n  border: 2px solid #777;\n  line-height: .8em;\n  min-height: 20px;\n  min-width: 20px; }\n\n/*\n\tConcatenator in nested keys\n*/\nkbd > b.kbConcat {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  vertical-align: central;\n  display: inline-block;\n  text-align: center;\n  border: 1px solid #eee;\n  border-radius: 4px;\n  background-color: #fff;\n  color: #000;\n  line-height: .9em;\n  width: 1.2em;\n  height: 1.2em;\n  max-height: 30px;\n  max-height: 30px;\n  font-family: verdana;\n  font-size: 1em;\n  font-weight: bold; }\n\n/*\n  Default style for individual keys\n  Any declared key can be additionally styled by setting a css class for the literal-key match,\n  prefixed by 'kb'\n  e.g. CTRL + C will be rendered with an overline above the CTRL-key\n */\n/*\n.kbCTRL {\n  text-decoration:overline;\n  font-weight:bold;\n}\n*/\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/vendor/lib/bs3-list-group.css":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/patzilla-ui/vendor/lib/bs3-list-group.css ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".list-group {\n  padding-left: 0;\n  margin-bottom: 20px; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n\n.list-group-item:first-child {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px; }\n\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px; }\n\n.list-group-item > .badge {\n  float: right; }\n\n.list-group-item > .badge + .badge {\n  margin-right: 5px; }\n\na.list-group-item {\n  color: #555; }\n\na.list-group-item .list-group-item-heading {\n  color: #333; }\n\na.list-group-item:hover,\na.list-group-item:focus {\n  color: #555;\n  text-decoration: none;\n  background-color: #f5f5f5; }\n\n.list-group-item.disabled,\n.list-group-item.disabled:hover,\n.list-group-item.disabled:focus {\n  color: #777;\n  background-color: #eee; }\n\n.list-group-item.disabled .list-group-item-heading,\n.list-group-item.disabled:hover .list-group-item-heading,\n.list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit; }\n\n.list-group-item.disabled .list-group-item-text,\n.list-group-item.disabled:hover .list-group-item-text,\n.list-group-item.disabled:focus .list-group-item-text {\n  color: #777; }\n\n.list-group-item.active,\n.list-group-item.active:hover,\n.list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #428bca;\n  border-color: #428bca; }\n\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small,\n.list-group-item.active:hover .list-group-item-heading > .small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit; }\n\n.list-group-item.active .list-group-item-text,\n.list-group-item.active:hover .list-group-item-text,\n.list-group-item.active:focus .list-group-item-text {\n  color: #e1edf7; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success {\n  color: #3c763d; }\n\na.list-group-item-success .list-group-item-heading {\n  color: inherit; }\n\na.list-group-item-success:hover,\na.list-group-item-success:focus {\n  color: #3c763d;\n  background-color: #d0e9c6; }\n\na.list-group-item-success.active,\na.list-group-item-success.active:hover,\na.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info {\n  color: #31708f; }\n\na.list-group-item-info .list-group-item-heading {\n  color: inherit; }\n\na.list-group-item-info:hover,\na.list-group-item-info:focus {\n  color: #31708f;\n  background-color: #c4e3f3; }\n\na.list-group-item-info.active,\na.list-group-item-info.active:hover,\na.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning {\n  color: #8a6d3b; }\n\na.list-group-item-warning .list-group-item-heading {\n  color: inherit; }\n\na.list-group-item-warning:hover,\na.list-group-item-warning:focus {\n  color: #8a6d3b;\n  background-color: #faf2cc; }\n\na.list-group-item-warning.active,\na.list-group-item-warning.active:hover,\na.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger {\n  color: #a94442; }\n\na.list-group-item-danger .list-group-item-heading {\n  color: inherit; }\n\na.list-group-item-danger:hover,\na.list-group-item-danger:focus {\n  color: #a94442;\n  background-color: #ebcccc; }\n\na.list-group-item-danger.active,\na.list-group-item-danger.active:hover,\na.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442; }\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3; }\n\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.panel-body {\n  padding: 15px; }\n\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px; }\n\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit; }\n\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit; }\n\n.panel-title > a {\n  color: inherit; }\n\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px; }\n\n.panel > .list-group {\n  margin-bottom: 0; }\n\n.panel > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0; }\n\n.panel > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px; }\n\n.panel > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px; }\n\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0; }\n\n.list-group + .panel-footer {\n  border-top-width: 0; }\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/keyboarder/keyboarder.css":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/keyboarder/keyboarder.css ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../css-loader!../sass-loader/lib/loader.js??ref--8-2!./keyboarder.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/keyboarder/keyboarder.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../style-loader/lib/addStyles.js */ "../../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../../node_modules/keyboarder/keyboarder.js":
/*!*************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/keyboarder/keyboarder.js ***!
  \*************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
  author:       L. Sauer 2011 (c); lsauer.com
  project:      KeyBoarder
  description:  keyBoarder is a small, fast javascript library for dynamically rendering visually appealing, navigatable keyboard shortcuts.
  license:      MIT license (commercial use is ok)
*/
/*--------------START OF CONFIG--------------*/
//kbparams {object}: configuration parameters to be passed to the keyboarder constructor; usually the css-classNames of the Elements to be rendered suffices
//it's okay to pass no parameters and use the default ones: e.g. kb = new KeyBoarder()

kbparams = {
	clsNames : ["content"],				//css-classNames of the Elements in which shortcuts should be rendered e.g. <div class="content"> My blog-post content </div>
										//mixed-type: string of one class or array of classnames
	isDebug : false,					//useful during development; provides verbose output
	safeMode : false,					//fallback to an older better tested Regular expression
	concatenator : '+',					//the concat symbol used for declaring shortcuts e.g. ALT + X
	matchAtLeast : 0, 					//number of consecutive keys present for a match to occur
	keyHtmlElem : 'kbd',				//the HTML element type in which shortcuts are embedded 
	isStartCasing : true,				//if your shortcuts start with an upper case like this Alt + Ctrl + X
	isBothCasing : true,				//explicitly allows StartCasing and UPPERCASING
	stripPunctuation : true,			//whether any matched ASCI print symbols e.g. *#%&... should remain with the key or be stripped

	/**
	 * The most common keycodes defined by :
	 * @type {Object.<number>}
	 * @const
	 */
	KEYMAP : {
		/*delete: just for demonstration*/
		UPPERCASE : 0,
		Startcase : 0,
		
		STRG: 16,
		CTRL: 17,
		/*CTRL: 17,
		ALTRIGHT : 17,*/
		CTRLRIGHT: 18,
		CTRLR: 18,
		SHIFT: 16,
		RETURN: 13,
		ENTER: 13,
		BACKSPACE: 8,
		BCKSP:8,
		ALT: 18,
		SPACE: 32,
		TAB : 9,
		WIN: 91,
		INSERT: 0,
		END :0,
		PAGE : 0,
		HOME :0,
		MAC: 91,
		FN: null,
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
		ESC: 27,
		DEL: 46,
		F1: 112,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		F10: 121,
		F11: 122,
		F12: 123,
		PUNCTALNUM : 36 //sets the start for recognizing alphanummerical and punctuations
	},
}

/*--------------END OF CONFIG--------------*/
/**
HTMLElement css-class setter/getter Object
HTML Elements can have several classes, separated by space ' '. The rightmost css-class takes precedence
author: L.Sauer 2011, MIT License
*/
isOpera = (/opera/i.test(navigator.userAgent)) ? true : false;

Classy = function(el){
	//constructor
	if(el && el.constructor === String ){
		el = document.getElementsByClassName(el)[0];
	}
	//private shared
	var	that = el; //set to DOM element
	return {
		self : el,
		//set a new element
		set : function(ele){if(!ele.length){ this.self = ele; }else{this.self = ele[0]; that = ele;} return this;}, 
		//object, function, callbackEnd
		foreach : function (cls, o, f) {	//classname, object, function
			for(var i=0; i<o.length; i++) { // iterate through all objects
				f(cls, o[i]); // execute a function and make the obj, objIndex available
			}
		},
		has : function (cls, ele) {
			//this.foreach(this.self, has, )
			if( this.self ) {ele =  this.self;}
				var reg = new RegExp('(^|\\s)' + cls + '(\\s?)');
				return ele.className.match(reg);
		},
		add : function (cls, ele) {
			if( this.self ) {ele =  this.self;}
			if (!this.has(cls, ele)) {ele.className += ' ' + cls;}
			return this;
		},
		del : function (cls, ele) {
			if( this.self ) {ele =  this.self;}
			if (this.has(cls, ele)) {
				var reg = new RegExp('(^|\\s)' + cls + '(\\s?)');
				ele.className = ele.className.replace(reg, ' ');
			}
			return this;
		},
		repl : function (cls,clsNew, ele)  {
			if( this.self ) {ele =  this.self;}
			if(this.has(cls, ele)) {
				this.del(cls, ele);
			}
			this.add(clsNew, ele);
			return this;
		},
		focus : function(ele){
			if( this.self ) {ele =  this.self;}
			var i = 100;var pos = {x:0,y:0};
			while(ele != null ){
				pos.x += ele.offsetLeft;
				pos.y += ele.offsetTop;
				ele = ele.offsetParent;
			  }
			window.scrollTo(pos.x,pos.y);
		},
		prototype : {toString :function(){
			return JSON.stringify(self)
		}},
	};
};

with ((window && window.console && window.console._commandLineAPI) || {}) {

/**
 keyBorder: Create interactive shorcut keys from text
 
 @constructor
 @param clsNames {Object.<string>| Object.<object>}
 	class-name of the html elements which KeyBoarder should process/parse
 For a complete list of options, see the CONFIG object in the keyBoarder 'class'
 */
var KeyBoarder = (function () {
	//outer function expressions is used to return an class-like object

	//'private static variables'
	//reference for css class-setter/getter
	var csscls =  new Classy();
	
	/** 
	Default parameters
	 @type {Object.<string>}
	 @const
	 */
	var KEYCODESBASIC = {
		'backspace' : '8',
		'tab' : '9',
		'enter' : '13',
		'shift' : '16',
		'ctrl' : '17',
		'alt' : '18',
		'pause_break' : '19',
		'caps_lock' : '20',
		'escape' : '27',
		'page_up' : '33',
		'page down' : '34',
		'end' : '35',
		'home' : '36',
		'left_arrow' : '37',
		'up_arrow' : '38',
		'right_arrow' : '39',
		'down_arrow' : '40',
		'insert' : '45',
		'delete' : '46',
		'0' : '48',
		'1' : '49',
		'2' : '50',
		'3' : '51',
		'4' : '52',
		'5' : '53',
		'6' : '54',
		'7' : '55',
		'8' : '56',
		'9' : '57',
		'a' : '65',
		'b' : '66',
		'c' : '67',
		'd' : '68',
		'e' : '69',
		'f' : '70',
		'g' : '71',
		'h' : '72',
		'i' : '73',
		'j' : '74',
		'k' : '75',
		'l' : '76',
		'm' : '77',
		'n' : '78',
		'o' : '79',
		'p' : '80',
		'q' : '81',
		'r' : '82',
		's' : '83',
		't' : '84',
		'u' : '85',
		'v' : '86',
		'w' : '87',
		'x' : '88',
		'y' : '89',
		'z' : '90',
		'left_window key' : '91',
		'right_window key' : '92',
		'select_key' : '93',
		'numpad 0' : '96',
		'numpad 1' : '97',
		'numpad 2' : '98',
		'numpad 3' : '99',
		'numpad 4' : '100',
		'numpad 5' : '101',
		'numpad 6' : '102',
		'numpad 7' : '103',
		'numpad 8' : '104',
		'numpad 9' : '105',
		'multiply' : '106',
		'add' : '107',
		'subtract' : '109',
		'decimal point' : '110',
		'divide' : '111',
		'f1' : '112',
		'f2' : '113',
		'f3' : '114',
		'f4' : '115',
		'f5' : '116',
		'f6' : '117',
		'f7' : '118',
		'f8' : '119',
		'f9' : '120',
		'f10' : '121',
		'f11' : '122',
		'f12' : '123',
		'num_lock' : '144',
		'scroll_lock' : '145',
		'semi_colon' : '186',
		'equal_sign' : '187',
		'comma' : '188',
		'dash' : '189',
		'period' : '190',
		'forward_slash' : '191',
		'grave_accent' : '192',
		'open_bracket' : '219',
		'backslash' : '220',
		'closebracket' : '221',
		'single_quote' : '222'
	}
	
	//default parameters
	var CONFIG = {		
	clsNames : ["content", "claro"],	//css-classNames of the Elements in which shortcuts should be rendered e.g. <div class="content"> My blog-post content </div>
										//mixed-type: string of one class or array of classnames
	isDebug : false,					//useful during development; provides verbose output
	safeMode : false,					//fallback to an older better tested Regular expression
	concatenator : '+',					//the concat symbol used for declaring shortcuts e.g. ALT + X
	matchAtLeast : 0, 					//number of consecutive keys present for a match to occur
	keyHtmlElem : 'kbd',				//the HTML element type in which shortcuts are embedded 
	isStartCasing : true,				//if your shortcuts start with an upper case like this Alt + Ctrl + X
	isBothCasing : true,				//explicitly allows StartCasing and UPPERCASING
	stripPunctuation : true,			//whether any matched ASCI print symbols e.g. *#%&... should remain with the key or be stripped
		/**
		 * The most common keycodes defined by :
		 * @type {Object.<number>}
		 * @const
		 */
		KEYMAP : {
			STRG: 17,
			/*CTRL: 17,*/
			CTRLRIGHT: 18,
			CTRLR: 18,
			SHIFT: 16,
			RETURN: 13,
			ENTER: 13,
			BACKSPACE: 8,
			BCKSP:8,
			ALT: 18,
			ALTRIGHT: 17,
			SPACE: 32,
			WIN: 91,
			MAC: 91,
			FN: null,
			UP: 38,
			DOWN: 40,
			LEFT: 37,
			RIGHT: 39,
			ESC: 27,
			DEL: 46,
			F1: 112,
			F2: 113,
			F3: 114,
			F4: 115,
			F5: 116,
			F6: 117,
			F7: 118,
			F8: 119,
			F9: 120,
			F10: 121,
			F11: 122,
			F12: 123
		},
	};
	//internal variables / 'constants'
	var VERSION = 0.6;
	var DATE = '20/08/2011';
	var NAME = 'initial release';
	var kbkeys = []; 		//array with kb keys: serves as check wether an key is in the array; for generation the regex; 
	var KEYMAPIDX = {}		//holds a count of a highlighted key, when navigating kbd elements by pressing the corresponding key
	var KEYMAPflip = {} 	//flipped keymap to get the literal key from a keycode
	var Startcasing = function(str){ 
		if(!CONFIG.isStartCasing) return str; else return str.toUpperCase()[0] + str.substr(1,str.length).toLowerCase();
	}
	
	// global static
	isKeyBoarder = true;
	
	var __info__ = function () {
		return [NAME, ': <', VERSION, '>'].join('');
	};
	
	/**
	 keyBorder: Create interactive shorcut keys from text
	 
	 @constructor
	 @param kbconfig {Object.<object>}
		object with configuration options
	 For a complete list of options, see the CONFIG object in the keyBoarder 'class'
	 */
	var clsKb =  function (kbconfig) {
		//set self reference for public static methods
		this.self = this;
		if(arguments.length === 0){
			var kbconfig = {};
		}
		
		//override default settings
		for(var i in kbconfig){
			CONFIG[i] = kbconfig[i];
		}
		
		//build array with kbkeys, and index
		for(var i in CONFIG.KEYMAP){
			kbkeys.push( Startcasing(i) );
			if(CONFIG.isBothCasing)
				kbkeys.push( i.toUpperCase() );
			//KEYMAPIDX[i] = 0;
			//KEYMAPflip[ CONFIG.KEYMAP[i] ] = i; //+= i+'|'...to handle one to many relationships
		}
		//add basic keymap to the prototype chain
		CONFIG.KEYMAP.__proto__ = KEYCODESBASIC;
		for(var i in CONFIG.KEYMAP){
			KEYMAPIDX[i.toLowerCase()] = 0;
			KEYMAPflip[ CONFIG.KEYMAP[i] ] = i; //+= i+'|'...to handle one keyCode to many keyLiterals - relationships
		}
		//private variables
		
		//attach event handlers for shortcut navigation
		var elbody = document.getElementsByTagName('body')[0];
		elbody.addEventListener( 'keydown', KeyBoarder.highlightKeys);
		elbody.addEventListener( 'keyup', KeyBoarder.highlightKeys);
		
		var regkeys = kbkeys.join('|');
		if( !CONFIG.safeMode ){
			var qsym = CONFIG.matchAtLeast ? '+' : '?'; // if consecutive keys are set, then at least one concatenator symbol must exist
			var regstr = new RegExp('[\\s|,\\-]?((?:'+regkeys+'|F\\d\\d?\\s)\\s*\\'+CONFIG.concatenator+qsym+
							'\\s*){1,4}([A-Z0-9\\*\\+\\-](\\s*\\+\\s*[A-Z0-9])?|[A-Z0-9]\\'+CONFIG.concatenator+'[A-Z0-9]?){0,1}(?:[,\\s\\"\\\'<\\/])','g');
		}else{
			var regstr = /[\s|,]?((?:STRG|CTRL|SHIFT|RETURN|ENTER|ALT|ALTR|SPACE|WIN|FN|UP|DOWN|LEFT|RIGHT|ESC|DEL)\s{0,2}\+\s?){1,2}[A-Z0-9][,]?\s/g
		}
		if( CONFIG.isDEBUG )
			console.log(regstr)
		var regs = new Array(
			//first match function keys
			// /[\s|,-]?((?:STRG|CTRL|SHIFT|RETURN|ENTER|ALT|ALTR|SPACE|WIN|FN|UP|DOWN|LEFT|RIGHT|ESC|DEL|F\d\d?\s)\s*\+?\s*){1,4}([A-Z0-9]|[A-Z0-9]\+[A-Z0-9]?){0,1}[,]?\s/g,
			//this will also match RETURNR, WING etc.., since JS regex has no lookbehind. We can conveniently filter these later
			regstr
			//second, match single keys, etc...; useful for complex consecutive regex operations
			// /[\s|,-](STRG|CTRL|SHIFT|RETURN|ENTER|ALT|ALTR|SPACE|WIN|FN|UP|DOWN|LEFT|RIGHT|ESC|DEL)[\s|,]/g
		);
		/*
		//dynamically build a regex from KEYMAP
		var regstr = '[\\\\s|,\\\\-\\\\'+CONFIG.concatenator+']?((?:'
		var regsep = '[\\\\\s\\\\'+CONFIG.concatenator+'\\\\-~]*|'
		for(var i in CONFIG.KEYMAP){
			regstr += StartCase(i) +'|'//+ regsep
		}
		regstr += '){0,3}\\\\'+CONFIG.concatenator+'\\\\s?){1,2}[A-Z0-9][,]?\\\\s'
		regs[0] = new RegExp(regstr);
		console.log(regstr);
		this.regs = regs;
		*/
		
		/**
			function regmatch is passed the Regex-match from String.replace and embedds the match in html tags
			@param m {Object.<string>} ...contains entire match
		*/	
		var regmatch = function(m){
			if( CONFIG['isDebug'] ){
				console.log("matches:", m);
			}
			//filter, required because the regexp will also match any KEY\s*\+?\s*[:alnum:] e.g. WING, WINR, WIN  T courtesy of a JS regex's lack of lookbehind
			if( m.indexOf( CONFIG.concatenator ) === -1 && kbkeys.indexOf(m.trim()) === -1 ) //single key, yet not defined, so a mismatch
				return m;
			var tmp;
			if( CONFIG.matchAtLeast && (tmp = m.match(RegExp('\\'+CONFIG.concatenator, 'g') )) !== null && tmp.length < CONFIG.matchAtLeast)
				return m;
			//to a type cast, actually that would be: String(m)
			m = m.toString();
			//further clean up of the passed string
			if( CONFIG.stripPunctuation )
				m = m.replace( RegExp(',|\\"|\\-|\\\'|\\*|\\#|\\\\|\\;|\\:|\\||\\.|\\!|\\$|\\&|\\%', 'g'), '');
			
			var arg, endtag = ''; concat = '<b class="kbConcat">'+ CONFIG.concatenator +'</b>';
			if( m[m.length-1] === '<' ){//dirty fix; captured part of the endtag
				m = m.substr(0,m.length-1);
				endtag =  '<';
			}	
			var elHtml = CONFIG.keyHtmlElem;
			//'concatenator' must not be the first character e.g. text .... shortcut is +ALT text continues...
			if( m.indexOf( CONFIG.concatenator ) > -1 ){
				arg = m.split( RegExp('\\s*\\'+CONFIG.concatenator+'\\s*') );
				//faster than forEach / for in
				for(var i=0; i<arg.length; i++){
					//all individual CSS-Key classes are of the form .kbKEY {...} e.g. .kbCTRL {....}, 
					arg[i] = '<'+ elHtml +' class="kbKey kb'+ arg[i].toString().toUpperCase().trim() +'">' + arg[i].toString().trim() + '</'+ elHtml +'>'; 
				}
				arg = arg.join( concat );
			} else { // simple key e.g. ' ESC '
				arg = '<'+ elHtml +' class="kbKey kb'+m.toUpperCase().trim()+'">' + m.trim() + '</'+ elHtml +'>'; 
			}
			//commas before and after are allowed and included in the total-match
			return arg.replace(/,|\-/g, '')+endtag;
		}
		//add as a method to this class
		this.regmatch = regmatch;
		//string: HTML Elements property holding the html content
		this.htmlproptext = ''
		
		var restore = function(){
			for(var i=0; i< CONFIG.clsNames.length; i++) {
				var els = document.getElementsByClassName( CONFIG.clsNames[i] )[0];
				for(var j=0; j< els.length; j++)
				{				
					var ij_indexOrigtext = CONFIG.clsNames[i]+','+j; 
					if(typeof el === 'undefined')
						continue;
					if( typeof self.originaltext[ ij_indexOrigtext ] !== 'undefined'){
						el[self.htmlproptext] = self.originaltext[ ij_indexOrigtext ];
						return true;
					}else{
						return false;
					}
				}
			}
		}
		this.restore = restore;
		
		//Intitiliazing and update, e.g. when changing the classNames
		var init = function(){
			if(arguments.length > 0){ //were configuration parameters passed?
				if( kbconfig.constructor === String ){
					CONFIG.clsNames.push(kbconfig); //add
				} else if( kbconfig.constructor === Object ){
					CONFIG.clsNames = kbconfig['clsNames']; //replace
				}else{
					throw new TypeError("unexpected Object passed to constructor");	
				}
			}
			var reFlag = 'g';	//not used; global flag; RegExp's second param; 
			//var el, text, reFlag, regs;
			for(var i=0; i< CONFIG.clsNames.length; i++)
			{
				//variables declared in the immediate var-scope aid the garbage collector in being able to collect sooner dead references
				var els = document.getElementsByClassName( CONFIG.clsNames[i] );
				for(var j=0; j< els.length; j++)
				{
					var el = els[j];
					if(typeof el === 'undefined')
						continue;
					if( typeof this.originaltext === 'undefined'){
						//contains the original, unaltered html
						this.originaltext = {};
					}
					var ij_indexOrigtext = CONFIG.clsNames[i]+','+j; 
					if( typeof this.originaltext[ ij_indexOrigtext ] !== 'undefined'){
						var text  = this.originaltext[ ij_indexOrigtext ];
					}else{
						var text  = el.innerHTML || el.innerText || el.value;
						this.originaltext[ ij_indexOrigtext ] = text;
					}
					
					this.regmatch = '';
					for(var k =0; k<regs.length; k++) {
						text = text.replace( 
								regs[k],
								// The interpreter expects a closure here, to bypass this we are wrapping
								// the result in another function e.g. 'return regmatch( arguments[0] );'
								// within the closure, functions wouldn't be called;
								// The first argument contains the entire match, the last the entire text;
								function(){
									return regmatch( arguments[0] );
								}
						);
					}
					if( CONFIG['isDebug'] ){
							console.log( text);
					}
					var strLimitForChg = 10;
					if(typeof el.innerHTML !== 'undefined'){
						this.htmlproptext = 'innerHTML';
							//did the text actually change?
						if( Math.abs( el.innerHTML.length - text.length) > strLimitForChg)
							el.innerHTML = text;
					} else if( typeof el.innerText !== 'undefined' ){
						this.htmlproptext = 'innerText';
						if( Math.abs( el.innerText.length - text.length) > strLimitForChg)
							el.innerText = text;
					} else if( typeof el.value !== 'undefined' ){
						this.htmlproptext = 'value';
						if( Math.abs( el.value.length - text.length) > strLimitForChg)
							el.value = text;
					}else
						return false;
				}
			}//end for
			return true;
		};
		this.init = init;
		//initialize and set the status
		this.intStatus = init();
		this.reinit = init;
	}


    // public static 
	clsKb.highlightKeys = function(e){
		var charInt = e.keyCode ? e.keyCode : e.charCode
		
		if( CONFIG['isDebug'] ){
				console.log( charInt, e.ctrlKey, e  );
		}
		//is event key up or down?
		if(e.type === 'keydown' ){
			if( CONFIG['isDebug'] )
				console.log(KeyBoarder.keyCodeToKey(e.keyCode), KEYMAPflip);
			//evaluates to: if(  e.keyCode == + CONFIG.KEYMAP['STRG'] ){
			//keylit: keyliteral...contains the literal key-name
			if( keylit = KeyBoarder.keyCodeToKey(e.keyCode) ){
				var i = KEYMAPIDX[keylit];
				var ele =  document.getElementsByClassName('kb'+keylit.toUpperCase())
				if(!ele.length) 
					return
				//add class, and scroll to the element
				csscls.add( 'kbKeyHighlight',ele[i]).focus(ele[i]);
				if(KEYMAPIDX[keylit]+1 < ele.length)
					KEYMAPIDX[keylit]++;
				else
					KEYMAPIDX[keylit] = 0; //reset, begin at the first element
			}
			
		}else
		if(e.type === 'keyup' ){
			//evaluates to: if(  e.keyCode == + CONFIG.KEYMAP['STRG'] ){
			if( keylit = KeyBoarder.keyCodeToKey(e.keyCode) ){
				var ele =  document.getElementsByClassName('kb'+keylit.toUpperCase())
				if(!ele.length) 
					return
				var i = KEYMAPIDX[keylit] === 0 ? ele.length-1 : KEYMAPIDX[keylit]-1; //remove current css-class
				csscls.del( 'kbKeyHighlight', ele[i]);
			}
		}
		//prevent propagation along the DOM tree
		e.cancelBubble = true;
	}
	//returns a literal key from a key code
	clsKb.keyCodeToKey = function(keyCode){
		return KEYMAPflip[keyCode].toLowerCase();
	}
	
	//private static
	//returns the ASCII key code
	function keyCode(n) {
		if (n === null) {
			return 'undefined';
		}
		return String.fromCharCode(n)
	}

    // public (across instances)
	//serialization override, which outputs info e.g. ''+kb
    clsKb.prototype = {	
		toString : function(){
			return __info__();
		},
    };

    return clsKb;
})(); 
//var kb = new KeyBoarder(kbparams);

}//end with



//INIT,- meant for loading at the bottom at the document
(function(that) {
	//check if the script is already loaded:
	var elScript = document.getElementsByTagName("script");
	for(var i = 0; i<elScript.length; i++) {
		if( /KeyBoarder/ig.test(elScript[i].src) ){
			//throw new Error("KeyBoarder has already been loaded in another script element tag");
		}
	}
	if( typeof KeyBoarder === 'undefined') {
		throw new TypeError("A variable or object with the name KeyBoarder does not (yet) exist in the global scope.");
	}else{
		//TODO: error handling
		window.addEventListener("error", function(e){console.error("KeyBoarder-Error:", e)} );
		//example of how to initiate
		/* Opera converts the addEventListener inline, thus not allowing string concatenation*/
		if(/opera/i.test(navigator.userAgent )) //navigator.taintEnabled conveniently checks for Mozilla browsers
			window.addEventListener("DOMContentLoaded", function(e){ var kb = new KeyBoarder(kbparams); }, null ); //opera 11x exclusively requires newer event-conventions
			//document.addEventListener("domcontentready", function(e){ var kb = new KeyBoarder(kbparams); } ); // document.ondomcontentloaded 
		else
			window.addEventListener("load", function(e){ var kb = new KeyBoarder(kbparams); } );
		//var kb = new KeyBoarder( ["content", "claro"] );
		
	}
})(window);

/***/ }),

/***/ "../../../node_modules/keyboarder/res/ico/bluescreen16.ico":
/*!************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/keyboarder/res/ico/bluescreen16.ico ***!
  \************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "88112ac068ecb90902a509d9546ff7b6.ico";

/***/ }),

/***/ "../../../patzilla-ui/access/ificlaims-help.html":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/access/ificlaims-help.html ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';

// -*- coding: utf-8 -*-
// (c) 2017 Andreas Motl, Elmyra UG

__p+='\n\n<div class="container-fluid">\n    <div class="span9">\n        <h4>Überblick</h4>\n    </div>\n</div>\n<div class="container-fluid">\n\n    <div class="span9">\n\n        <div class="list-group">\n\n            <div class="list-group-item">\n                <p class="list-group-item-text">\n                    Die »CLAIMS® Global Patent Database« von »IFI CLAIMS Patent Services« (gegründet 1955)\n                    ist eine kommerzielle Datenbank für Patentdokumente.\n                    <br/><br/>\n\n                    Die Datenbank enthält über 90 Millionen Patentdokumente aus über 50 nationalen und internationalen Datenquellen\n                    und durchsuchbare Volltexte für Veröffentlichungen aus 22 Patentämtern\n                    (AT, BE, BR, CA, CH, CN, DE, DK, EP, ES, FI, FR, GB, IN, JP, KR, LU, NL, RU, TW, US, WO).\n                    Begleitend sind bibliographische Daten und Abstracts von 90 Patentämtern aus der DOCDB Datenbank\n                    sowie Rechtsstände von 60 Ämtern aus der INPADOC Datenbank enthalten.\n                    <br/><br/>\n\n                    Für detaillierte Informationen über die Datenabdeckung, Datenquellen und Aktualisierungszyklen wollen wir Sie\n                    auf die Originalinformationen des Datenbankbetreibers verweisen:\n                    <br/><br/>\n                    <ul>\n                        <li>\n                            <a href="http://docs.ificlaims.com/display/CDVDP/Claims+Global+Data+Coverage">Claims Global Data Coverage</a>\n                        </li>\n                        <li>\n                            <a href="http://docs.ificlaims.com/display/CDVDP/CLAIMS+Direct+Load+Sources">CLAIMS Direct Load Sources</a>\n                        </li>\n                        <li>\n                            <a href="http://docs.ificlaims.com/display/CDVDP/Content+Updates">Content Updates</a>\n                        </li>\n                    </ul>\n                </p>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n\n<div class="container-fluid">\n    <div class="span9">\n        <h4>Komfortsuche</h4>\n    </div>\n</div>\n<div class="container-fluid">\n\n    <div class="span9">\n\n        <div class="list-group">\n\n            <div class="list-group-item">\n                <!-- <h4 class="list-group-item-heading">Komfortsuche</h4> -->\n                <p class="list-group-item-text">\n                    Die Komfortsuche kann Sie wie gewohnt bei ad hoc Abfragen und bei der Erschließung der Suchausdrücke für die Expertensuche unterstützen.\n                    Eine Beispielsuche, um Patentschriften des Anmelders »BSH BOSCH UND SIEMENS HAUSGERÄTE GMBH«\n                    in Zusammenhang mit den Klassen H04L12/433 und H04L12/24 (sowohl IPC als auch CPC) zu finden, ist wie gewohnt:\n                    <br/><br/>\n<pre>\nApplicant: Siemens and Bosch\nClass:     H04L12/433 or H04L12/24\n</pre>\n                    <br/>\n\n                    Dies entspricht dem folgenden Suchausdruck im Expertenmodus,\n                    bitte beachten Sie die Syntax für die Feldtrenner (hier ":" statt "="),\n                    die Großschreibung der Booleschen Operatoren\n                    sowie die Formatierung von Klassenangaben:\n                    <br/><br/>\n                    <pre>pa:(Siemens AND Bosch) AND ((ic:H04L0012433 OR cpc:H04L0012433) OR (ic:H04L001224 OR cpc:H04L001224))</pre>\n\n                </p>\n            </div>\n\n        </div>\n\n    </div>\n\n</div>\n\n\n<div class="container-fluid">\n    <div class="span9">\n        <h4>Expertensuche</h4>\n    </div>\n</div>\n<div class="container-fluid">\n\n    <div class="span9">\n\n        <div class="list-group">\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Generelle Regeln</h4>\n                <p class="list-group-item-text">\n                    <ul>\n                        <li>\n                            Feldnamen sind case sensitive, bitte verwenden Sie immer Kleinbuchstaben.\n                        </li>\n                        <li>\n                            Operatoren müssen groß geschrieben werden (z.B. AND, OR, NOT, TO).\n                        </li>\n                        <li>\n                            Anführungszeichen, die verwendet werden, um Phrasen einzuschließen,\n                            müssen "gerade Anführungszeichen" sein.\n                            Dies ist manchmal ein Problem, wenn Sie Daten per copy/paste aus\n                            einer anderen Quelle einfügen, wo „intelligente Anführungszeichen“\n                            verwendet worden sein könnten.\n                        </li>\n                    </ul>\n                </p>\n            </div>\n\n            <br/>\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Operatoren</h4>\n                <p class="list-group-item-text">\n                    Der Suchindex unterstützt AND, OR und NOT als Boolesche Operatoren.\n                    Boolesche Operatoren müssen groß geschrieben werden. Wenn sie in Kleinbuchstaben eingegeben werden, werden sie als Begriffe gesucht.\n                    <br/><br/>\n\n                    <ul>\n                        <li>\n                            <b>AND</b>\n                            <br/>\n                            Der AND-Operator findet Dokumente, wenn beide Begriffe irgendwo im Text eines einzelnen Dokuments vorhanden sind.\n                            Dies entspricht einer Schnittmenge beider Suchmengen.\n                            Für die Suche nach Dokumenten, die "solar energy" und "heating" enthalten, verwenden Sie die Abfrage:\n                            <pre>"solar energy" AND heating</pre>\n                        </li>\n                        <li>\n                            <b>NOT</b>\n                            <br/>\n                            Der NOT-Operator schließt Dokumente aus, die den Suchbegriff nach "NOT" enthalten.\n                            Dies entspricht einer Differenz von Suchmengen. Das Symbol "!" kann an Stelle des Wortes "NOT" verwendet werden.\n                            Um nach Dokumenten zu suchen, die "solar energy" aber nicht "heating" enthalten, verwenden Sie die Abfrage:\n                            <pre>"solar energy" NOT heating</pre>\n                        </li>\n                        <li>\n                            <b>OR</b>\n                            <br/>\n                            Der ODER-Operator verknüpft zwei Begriffe und findet Dokumente, wenn eines der Begriffe in einem Dokument vorhanden ist.\n                            Dies entspricht einer Vereinigung von Suchmengen. Das Zeichen "||" Kann an Stelle des Wortes "OR" verwendet werden.\n                            Um nach Dokumenten zu suchen, die entweder "solar energy" oder "wind power" enthalten, verwenden Sie die Abfrage:\n                            <pre>"solar energy" OR "wind power"</pre>\n                        </li>\n                    </ul>\n                </p>\n            </div>\n\n            <br/>\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Suche mit Wildcards</h4>\n                <p class="list-group-item-text">\n                <ul>\n                    <li>\n                        <b>?</b>\n                        <br/>\n                        Verwenden Sie das Fragezeichen, um ein einzelnes Zeichen (eins und nur eins) am Ende oder innerhalb\n                        eines Wortes darzustellen. Um beispielsweise nach der britischen oder amerikanischen Schreibweise\n                        des Wortes "galvanisiert" zu suchen (also "galvanised" oder "galvanized"),\n                        verwenden Sie den Suchausdruck:\n                        <br/>\n                        <pre>text:"galvani?ed"</pre>\n                    </li>\n                    <li>\n                        <b>*</b>\n                        <br/>\n                        Verwenden Sie das Sternchen, um 0 bis beliebig viele Zeichen darzustellen.\n                        Um nach "test, tests, testing, tester" usw. zu suchen, verwenden Sie den Suchbegriff "test*".\n                        Um beispielsweise nach "Sulphur oder Sulfur" zu suchen, verwenden Sie den Suchausdruck:\n                        <br/>\n                        <pre>text:"sul*ur"</pre>\n                    </li>\n                    <li>\n                        Hinweis: Sie können die Symbole * oder ? nicht als erstes Zeichen eines Suchbegriffs verwenden.\n                    </li>\n                </ul>\n                </p>\n            </div>\n\n            <br/>\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Suche nach Phrasen</h4>\n                <p class="list-group-item-text">\n                    Eine Phrase ist eine Gruppe von Wörtern, umgeben von doppelten Anführungszeichen.\n                    Um nur die Dokumente abzurufen, die die Phrase genau so finden, wie sie gesucht wurde,\n                    platzieren Sie die Phrase in Anführungszeichen. Beispiel:\n                    <br/><br/>\n                    <pre>"fuel cell"</pre>\n                </p>\n            </div>\n\n            <br/>\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Suche mit Wortabstand (Näherungssuche)</h4>\n                <p class="list-group-item-text">\n                    Die Näherungssuche sucht nach Wörtern in Dokumenten, die in einer bestimmten Nähe zueinander liegen.\n                    Um eine Näherungssuche durchzuführen, verwenden Sie das Tilde Symbol "~" am Ende einer Phrase.\n                    Um zum Beispiel nach den Begriffen "solar" und "generation" zu suchen,\n                    die mit einem Abstand von maximal 5 Wörtern im gleichen Dokument vorkommen, verwenden Sie den Suchausdruck:\n                    <br/><br/>\n                    <pre>"solar generation"~5</pre>\n                </p>\n            </div>\n\n            <br/>\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Suche mit Wortabstand und Trunkierung</h4>\n                <p class="list-group-item-text">\n                    Um Suchausdrücke mit Wortabstand und Trunkierung zu kombinieren, muss dem Ausdruck die Zeichenkette\n                    <pre>{!complexphrase}</pre> vorangestellt werden.\n                    Die spezifische Syntax ist "{!complexphrase}[field name]:[query]".\n                    <br/><br/>\n\n                    Für eine Suche nach Dokumenten im Zusammenhang mit Solarenergiespeichermodulen\n                    könnte sich der folgende Suchausdruck eignen:\n                    <br/>\n                    <pre>{!complexphrase}text:"solar AND energy AND stor* AND modul*"~6</pre>\n                    <br/>\n\n                    Während die Standardvariante dieser Suche Wörter in der angegebenen Reihenfolge findet,\n                    ist es auch möglich, nach einer Phrase zu suchen, die dieselben Wörter in beliebiger Reihenfolge enthält:\n                    <br/>\n                    <pre>{!complexphrase inOrder=false}text:"solar AND energy AND stor* AND modul*"~6</pre>\n                    <br/>\n\n                    Für die Suche nach Dokumenten, die Informationen über thermische Barrieren enthalten,\n                    können Sie eine komplexe Phrasensuche wie folgt verwenden:\n                    <br/>\n                    <pre>{!complexphrase}text:"(thermal OR thermic OR thermo) barrier*"~8</pre>\n                    <br/>\n\n                    Um <span class="monospace">"complexphrase"</span> Ausdrücke miteinander zu verschneiden,\n                    können Sie sich an folgender Struktur orientieren:\n                    <br/>\n                    <pre>{!complexphrase}text:("parallel* AND schalt*"~6 AND "antrieb* AND stufe*"~3)</pre>\n\n                    <hr/>\n                    <b>Einschränkungen bei zu kurzen Suchmustern</b>\n                    <br/>\n                    Diese Abfragevariante ist sensibel auf die Anzahl der eindeutigen Begriffe, die mit einem Muster verbunden sind.\n                    Das System erzeugt vor der Abfrage im Hintergrund einen Suchausdruck, in dem alle auf das Muster passenden Begriffe\n                    per <span class="monospace">"OR"</span> verknüpft werden.\n                    Zum Beispiel wird die Suche nach <span class="monospace">"a*"</span> eine große <span class="monospace">"OR"</span>-Klausel\n                    für alle Begriffe erzeugen, die mit dem einzelnen Buchstaben <span class="monospace">"a"</span> beginnen.\n                    <br/>\n                    Es kann klug sein, Wildcards auf mindestens zwei oder vorzugsweise drei Buchstaben als Präfix zu beschränken.\n                    Die Verwendung von sehr kurzen Präfixen kann dazu führen, dass viele Dokumente mit geringer Qualität zurückgegeben werden\n                    oder die Fehlermeldung "Too many terms in phrase expression, wildcard term prefixes might by too short." ausgelöst wird.\n\n                    <hr/>\n                    <b>Einschränkungen bei der Kombination mit anderen Kriterien</b>\n                    <br/>\n                    <span class="monospace">{!complexphrase}</span> Fragmente sind sensibel bzgl. der Positionierung innerhalb\n                    eines Suchausdrucks mit weiteren Kriterien. Sie sollten am Anfang eines Suchausdrucks positioniert werden.\n                    Beispiel:\n                    <pre>{!complexphrase inOrder=false}text:"(palladium OR pd) (free OR no)"~3 AND pnctry:(de OR ep OR wo OR us) AND text:(flash AND (nickel OR ni)) AND ((ic:H01L002348 OR cpc:H01L002348))</pre>\n                </p>\n            </div>\n\n            <br/>\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Suche in Wertebereichen</h4>\n                <p class="list-group-item-text">\n                    Bereichsabfragen beschreiben Werte zwischen der unteren und oberen Grenze zweier Ausdrücke.\n                    In einer Bereichsabfrage muss der Operator \'TO\' groß geschrieben werden.\n                    Der folgende Suchausdruck findet Dokumente, deren Veröffentlichungstermine Werte\n                    zwischen einschließlich 20020101 und 20030101 enthalten:\n                    <br/><br/>\n                    <pre>pd:[20020101 TO 20030101]</pre>\n                </p>\n            </div>\n\n            <br/>\n\n            <div class="list-group-item">\n                <h4 class="list-group-item-heading">Smart search: Suche ohne Operatoren oder Feldbezeichner</h4>\n                <p class="list-group-item-text">\n                    <ul>\n                        <li>\n                            Der Standard-Operator für Boolesche Operatoren ist "AND". Das bedeutet, dass, wenn kein Operator angegeben\n                            wird, das System "AND" annimmt.\n                        </li>\n                        <li>\n                            Wenn in der Abfrage kein Feld angegeben ist, bezieht sich die Suche auf Titel, Abstract, Beschreibung und Ansprüche.\n                        </li>\n                    </ul>\n                </p>\n            </div>\n\n        </div>\n    </div>\n</div>\n';
}
return __p;
};


/***/ }),

/***/ "../../../patzilla-ui/access/ificlaims-help.js":
/*!************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/access/ificlaims-help.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Marionette) {// -*- coding: utf-8 -*-
// (c) 2017 Andreas Motl, Elmyra UG
__webpack_require__(/*! bs3-list-group */ "../../../patzilla-ui/vendor/lib/bs3-list-group.css");

IFIClaimsHandbookView = Marionette.ItemView.extend({
    template: __webpack_require__(/*! ./ificlaims-help.html */ "../../../patzilla-ui/access/ificlaims-help.html")
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! backbone.marionette */ "../../../node_modules/backbone.marionette/lib/core/amd/backbone.marionette.js")))

/***/ }),

/***/ "../../../patzilla-ui/navigator/app/help.js":
/*!*********************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/app/help.js ***!
  \*********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Backbone, Marionette, $, __webpack_provided_Backbone_dot_Marionette) {// -*- coding: utf-8 -*-
// (c) 2014,2017 Andreas Motl, Elmyra UG

// https://marionette.gitbooks.io/marionette-guides/content/en/approuter/
// https://marionette.gitbooks.io/marionette-guides/content/en/appendix/approuter/router.html
// https://marionette.gitbooks.io/marionette-guides/content/en/application/routing.html

// Foundation
__webpack_require__(/*! backbone.marionette */ "../../../node_modules/backbone.marionette/lib/core/amd/backbone.marionette.js");
__webpack_require__(/*! bootstrap-2.3.2/css/bootstrap.css */ "../../../node_modules/bootstrap-2.3.2/css/bootstrap.css");
__webpack_require__(/*! bootstrap-2.3.2/css/bootstrap-responsive.css */ "../../../node_modules/bootstrap-2.3.2/css/bootstrap-responsive.css");

__webpack_require__(/*! patzilla.navigator.style */ "../../../patzilla-ui/navigator/style/index.js");

// Patches to make the old Backbone Marionette 1.1.0 work with Webpack
Backbone.$ = window.jQuery;
Marionette.$ = window.jQuery;

var Controller = Marionette.Controller.extend({

    initialize: function initialize() {
        console.log('Controller.initialize');
        this.options.regionManager = new Marionette.RegionManager({});
        this.options.regionManager.addRegion('content', '#content-region');
    },

    hotkeys: function hotkeys() {
        __webpack_require__(/*! ../components/hotkeys/hotkeys-help.js */ "../../../patzilla-ui/navigator/components/hotkeys/hotkeys-help.js");
        var rmanager = Marionette.getOption(this, 'regionManager');
        $('#title-container').html('Hotkeys overview');
        rmanager.get('content').show(new HotkeysHelpView());
    },
    ificlaims: function ificlaims() {
        __webpack_require__(/*! ../../access/ificlaims-help.js */ "../../../patzilla-ui/access/ificlaims-help.js");
        var rmanager = Marionette.getOption(this, 'regionManager');
        $('#title-container').html('Benutzerhandbuch für die Suche bei IFI Claims');
        rmanager.get('content').show(new IFIClaimsHandbookView());
    }
});

var Router = Marionette.AppRouter.extend({

    appRoutes: {
        'hotkeys': 'hotkeys',
        'ificlaims': 'ificlaims'
    },

    initialize: function initialize() {
        console.log('Router.initialize');
        this.controller = new Controller({
            initialData: Marionette.getOption(this, 'initialData')
        });
    }

});

// Main
NavigatorHelp = __webpack_provided_Backbone_dot_Marionette.Application.extend({

    initialize: function initialize() {},

    onStart: function onStart(options) {
        console.info('NavigatorHelp:onStart');
        var router = new Router(options);
        Backbone.history.start();
    }

});

navigatorHelp = new NavigatorHelp({});

$(document).ready(function () {
    console.log("document.ready");
    navigatorHelp.start();
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! backbone */ "../../../node_modules/backbone/backbone.js"), __webpack_require__(/*! backbone.marionette */ "../../../node_modules/backbone.marionette/lib/core/amd/backbone.marionette.js"), __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js-exposed"), __webpack_require__(/*! backbone.marionette */ "../../../node_modules/backbone.marionette/lib/core/amd/backbone.marionette.js")))

/***/ }),

/***/ "../../../patzilla-ui/navigator/components/hotkeys/hotkeys-help.html":
/*!**********************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/components/hotkeys/hotkeys-help.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';

// -*- coding: utf-8 -*-
// (c) 2014 Andreas Motl, Elmyra UG

__p+='\n\n<div class="container-fluid">\n\n    <div class="span9">\n\n        <div class="list-group">\n\n            <!-- Global actions -->\n            <a href="#" class="list-group-item">\n                <h4 class="list-group-item-heading">Global actions</h4>\n                <p class="list-group-item-text">\n                <table class="table content">\n\n                    <tbody>\n                    <tr>\n                        <td class="span4">\n                            <kbd class="kbKey">META</kbd><b class="kbConcat">+</b><kbd class="kbKey">RETURN</kbd>\n                            <br/>\n                            CTRL+RETURN\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Submit search\n                            </p>\n                            <p>\n                                Submits search query to active data source. Only enabled in query input field.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + C\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to comfort search user interface\n                            </p>\n                            <p>\n                                Use a field-based form for specifying search criteria.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + X\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to expert search user interface\n                            </p>\n                            <p>\n                                Use a text area for submitting a CQL query expression.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + N\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to numberlist interface\n                            </p>\n                            <p>\n                                Use a numberlist as query expression.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + E\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to datasource EPO\n                            </p>\n                            <p>\n                                Search results and bibliographic information come from\n                                <a href="https://ops.epo.org/">EPO\'s OPS</a> web service.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + D\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to datasource DPMA\n                            </p>\n                            <p>\n                                Search results come from\n                                <a href="https://www.dpma.de/english/service/e-services/depatisnet/">DPMA\'s DEPATISnet</a>,\n                                while bibliographic information comes from OPS.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + I\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to datasource IFI Claims\n                            </p>\n                            <p>\n                                Search results originate from the commercial patent search database\n                                <a href="https://www.ificlaims.com/">IFI Claims</a>,\n                                while bibliographic information comes from OPS.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + T\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to datasource depa.tech\n                            </p>\n                            <p>\n                                Search results originate from the commercial patent search database\n                                <a href="https://depa.tech/">depa.tech</a>,\n                                while bibliographic information comes from OPS.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            CTRL + SHIFT + R\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Switch to review mode\n                            </p>\n                            <p>\n                                Present all documents collected in basket for review.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <kbd class="kbKey">H</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open online help\n                            </p>\n                        </td>\n                    </tr>\n                    </tbody>\n\n                </table>\n                </p>\n            </a>\n\n            <!-- Form actions -->\n            <a href="#" class="list-group-item">\n                <h4 class="list-group-item-heading">Form actions</h4>\n                <p class="list-group-item-text">\n                <table class="table content">\n\n                    <tbody>\n                    <tr>\n                        <td class="span4">\n                            SHIFT + RETURN\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Toggle form field zoom (in Comfort form)\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td class="span4">\n                            CTRL + ALT + F\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open CQL field chooser (in Expert form)\n                            </p>\n                        </td>\n                    </tr>\n                    </tbody>\n\n                </table>\n                </p>\n            </a>\n\n            <!-- List navigation -->\n            <a href="#" class="list-group-item">\n                <h4 class="list-group-item-heading">List navigation</h4>\n                <p class="list-group-item-text">\n                <table class="table content">\n\n                    <tbody>\n                    <tr>\n                        <td class="span4">\n                            <kbd class="kbKey">SPACE</kbd>\n                            <br/>\n                            <kbd class="kbKey">PAGEDOWN</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Scroll down to next result item\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + SPACE\n                            <br/>\n                            <kbd class="kbKey">PAGEUP</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Scroll up to previous result item\n                            </p>\n                        </td>\n                    </tr>\n                    </tbody>\n\n                </table>\n                </p>\n            </a>\n\n            <!-- Document navigation -->\n            <a href="#" class="list-group-item">\n                <h4 class="list-group-item-heading">Document navigation</h4>\n                <p class="list-group-item-text">\n                <table class="table content">\n\n                    <tbody>\n                    <tr>\n                        <td class="span4">\n                            <kbd class="kbKey">LEFT</kbd>\n                            <kbd class="kbKey">RIGHT</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                "Biblio, Claims, Description": Previous/next tab\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + LEFT\n                            &nbsp;\n                            SHIFT + RIGHT\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Drawings: Previous/next image\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + UP\n                            &nbsp;\n                            SHIFT + DOWN\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Drawings: Rotate image\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + P\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open PDF\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + E\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open Espacenet\n                            </p>\n                            <blockquote class="expandable">\n                                <p>\n                                    Espacenet offers free access to more than 80 million patent documents worldwide,\n                                    containing information about inventions and technical developments from 1836 to today.\n                                </p>\n                                <small>\n                                    <a target="_blank" href="https://www.epo.org/searching/free/espacenet.html">\n                                        https://www.epo.org/searching/free/espacenet.html\n                                    </a>\n                                </small>\n                                <small>\n                                    <a target="_blank" href="http://documents.epo.org/projects/babylon/eponet.nsf/0/4E8744EB66E8F944C12577D600598EEF/$File/espacenet_brochure_en.pdf">\n                                        Espacenet brochure\n                                    </a>\n                                </small>\n                            </blockquote>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + D\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open DEPATISnet\n                            </p>\n                            <blockquote class="expandable">\n                                <p>\n                                    DEPATISnet provides fast and comfortable access to the electronic DEPATIS document\n                                    archive (German patent information system) of the German Patent and Trade Mark Office (DPMA).\n                                    <br/><br/>\n\n                                    DEPATISnet covers all German patent documents since 1877 and also documents of many\n                                    other patent offices and organisations worldwide.\n                                    <br/><br/>\n\n                                    The document archive consists of approximately 88 million data records\n                                    from about 100 countries. Almost 60% million of these data records are\n                                    available in PDF format.\n                                    <br/><br/>\n                                </p>\n                                <small>\n                                    <a target="_blank" href="http://www.dpma.de/english/service/e-services/depatisnet/">\n                                        http://www.dpma.de/english/service/e-services/depatisnet/\n                                    </a>\n                                </small>\n                                <small>\n                                    <a target="_blank" href="http://www.dpma.de/docs/service/veroeffentlichungen/flyer_en/depatisnet_engl.pdf">\n                                        DEPATISnet brochure\n                                    </a>\n                                </small>\n                            </blockquote>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + ALT + E\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open European Patent Register\n                            </p>\n                            <blockquote class="expandable">\n                                <p>\n                                    The European Patent Register contains all the publicly available information on\n                                    European patent applications as they pass through the grant procedure, including\n                                    oppositions, patent attorney/EPO correspondence and more.\n                                    The service also provides for public file inspection.\n                                </p>\n                                <small>\n                                    <a target="_blank" href="https://www.epo.org/searching/free/register.html">\n                                        https://www.epo.org/searching/free/register.html\n                                    </a>\n                                </small>\n                            </blockquote>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + ALT + D\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open DPMAregister\n                            </p>\n                            <blockquote class="expandable">\n                                <p>\n                                    The DPMAregister service provides access to the german publications of patents,\n                                    trade marks, utility models and designs as well as the register data.\n                                    The service comprises the search for legal/procedural status information as well as\n                                    the corresponding publication data.\n                                </p>\n                                <small>\n                                    <a target="_blank" href="https://register.dpma.de/?lang=en">\n                                        https://register.dpma.de/?lang=en\n                                    </a>\n                                </small>\n                            </blockquote>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            SHIFT + C\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Open CCD Viewer\n                            </p>\n                            <blockquote class="expandable">\n                                <p>\n                                    The Common Citation Document (CCD) application aims to provide single point access\n                                    to up-to-date citation data relating to the patent applications of the IP5 Offices.\n                                    It consolidates the prior art cited by all participating offices for the family\n                                    members of a patent application, thus enabling the search results for the same\n                                    invention produced by several offices to be visualised on a single page.\n                                </p>\n                                <small>\n                                    <a target="_blank" href="http://www.fiveipoffices.org/material/ccd.html">\n                                        https://www.fiveipoffices.org/material/ccd.html\n                                    </a>\n                                </small>\n                            </blockquote>\n                        </td>\n                    </tr>\n                    </tbody>\n\n                </table>\n                </p>\n            </a>\n\n            <!-- Document actions -->\n            <a href="#" class="list-group-item">\n                <h4 class="list-group-item-heading">Document actions</h4>\n                <p class="list-group-item-text">\n                <table class="table content">\n\n                    <tbody>\n                    <tr>\n                        <td class="span4">\n                            <kbd class="kbKey">C</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Add or edit comments\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td class="span4">\n                            <kbd class="kbKey">1</kbd>\n                            <br/>\n                            <kbd class="kbKey">INSERT</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Rate the document with score "1"\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <kbd class="kbKey">2</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Rate the document with score "2"\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <kbd class="kbKey">3</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Rate the document with score "3"\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <kbd class="kbKey">0</kbd>\n                            <br/>\n                            <kbd class="kbKey">D</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Rate the document with "dismiss"\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <kbd class="kbKey">+</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Add the document to basket\n                            </p>\n                            <p>\n                                No rating value will be assigned.\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td>\n                            <kbd class="kbKey">-</kbd>\n                            <br/>\n                            <kbd class="kbKey">R</kbd>\n                            <br/>\n                            <kbd class="kbKey">DEL</kbd>\n                            <br/>\n                            CTRL+D\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Remove the document from basket\n                            </p>\n                        </td>\n                    </tr>\n\n                    <!-- Stack -->\n                    <tr>\n                        <td class="span4">\n                            <kbd class="kbKey">S</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Add document to stack\n                            </p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td class="span4">\n                            <kbd class="kbKey">X</kbd>\n                        </td>\n                        <td>\n                            <p class="lead">\n                                Remove document from stack\n                            </p>\n                        </td>\n                    </tr>\n\n                    </tbody>\n\n                </table>\n                </p>\n            </a>\n\n\n        </div>\n    </div>\n</div>\n';
}
return __p;
};


/***/ }),

/***/ "../../../patzilla-ui/navigator/components/hotkeys/hotkeys-help.js":
/*!********************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/components/hotkeys/hotkeys-help.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Marionette, $) {// -*- coding: utf-8 -*-
// (c) 2014 Andreas Motl, Elmyra UG
__webpack_require__(/*! jquery.shorten.1.0 */ "../../../patzilla-ui/vendor/lib/jquery.shorten.1.0.js");
__webpack_require__(/*! keyboarder/keyboarder.js */ "../../../node_modules/keyboarder/keyboarder.js");
__webpack_require__(/*! keyboarder/keyboarder.css */ "../../../node_modules/keyboarder/keyboarder.css");
__webpack_require__(/*! bs3-list-group */ "../../../patzilla-ui/vendor/lib/bs3-list-group.css");

HotkeysHelpView = Marionette.ItemView.extend({

    template: __webpack_require__(/*! ./hotkeys-help.html */ "../../../patzilla-ui/navigator/components/hotkeys/hotkeys-help.html"),

    initialize: function initialize() {
        console.log('HelpHotkeysView.initialize');
    },

    onDomRefresh: function onDomRefresh() {
        console.log('HelpHotkeysView.onDomRefresh');
        $(".expandable").shorten({ showChars: 0, moreText: 'more', lessText: 'less' });
    }

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! backbone.marionette */ "../../../node_modules/backbone.marionette/lib/core/amd/backbone.marionette.js"), __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js-exposed")))

/***/ }),

/***/ "../../../patzilla-ui/vendor/lib/bs3-list-group.css":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/vendor/lib/bs3-list-group.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./bs3-list-group.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/vendor/lib/bs3-list-group.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 2:
/*!************************************************************************************!*\
  !*** multi /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/app/help ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/app/help */"../../../patzilla-ui/navigator/app/help.js");


/***/ })

/******/ });
//# sourceMappingURL=app-help.bundle.js.map