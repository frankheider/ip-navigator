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
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons"],{

/***/ "../../../node_modules/backbone.babysitter/lib/amd/backbone.babysitter.js":
/*!***************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/backbone.babysitter/lib/amd/backbone.babysitter.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Backbone.BabySitter
// -------------------
// v0.0.6
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://github.com/babysitterjs/backbone.babysitter

(function (root, factory) {
  if (true) {

    var underscore = __webpack_require__(/*! underscore */ "../../../node_modules/underscore/underscore.js");
    var backbone = __webpack_require__(/*! backbone */ "../../../node_modules/backbone/backbone.js");

    module.exports = factory(underscore, backbone);

  } else {} 
}(this, function (_, Backbone) {
  "option strict";

  // Backbone.ChildViewContainer
// ---------------------------
//
// Provide a container to store, retrieve and
// shut down child views.

Backbone.ChildViewContainer = (function(Backbone, _){
  
  // Container Constructor
  // ---------------------

  var Container = function(views){
    this._views = {};
    this._indexByModel = {};
    this._indexByCustom = {};
    this._updateLength();

    _.each(views, this.add, this);
  };

  // Container Methods
  // -----------------

  _.extend(Container.prototype, {

    // Add a view to this container. Stores the view
    // by `cid` and makes it searchable by the model
    // cid (and model itself). Optionally specify
    // a custom key to store an retrieve the view.
    add: function(view, customIndex){
      var viewCid = view.cid;

      // store the view
      this._views[viewCid] = view;

      // index it by model
      if (view.model){
        this._indexByModel[view.model.cid] = viewCid;
      }

      // index by custom
      if (customIndex){
        this._indexByCustom[customIndex] = viewCid;
      }

      this._updateLength();
    },

    // Find a view by the model that was attached to
    // it. Uses the model's `cid` to find it.
    findByModel: function(model){
      return this.findByModelCid(model.cid);
    },

    // Find a view by the `cid` of the model that was attached to
    // it. Uses the model's `cid` to find the view `cid` and
    // retrieve the view using it.
    findByModelCid: function(modelCid){
      var viewCid = this._indexByModel[modelCid];
      return this.findByCid(viewCid);
    },

    // Find a view by a custom indexer.
    findByCustom: function(index){
      var viewCid = this._indexByCustom[index];
      return this.findByCid(viewCid);
    },

    // Find by index. This is not guaranteed to be a
    // stable index.
    findByIndex: function(index){
      return _.values(this._views)[index];
    },

    // retrieve a view by it's `cid` directly
    findByCid: function(cid){
      return this._views[cid];
    },

    // Remove a view
    remove: function(view){
      var viewCid = view.cid;

      // delete model index
      if (view.model){
        delete this._indexByModel[view.model.cid];
      }

      // delete custom index
      _.any(this._indexByCustom, function(cid, key) {
        if (cid === viewCid) {
          delete this._indexByCustom[key];
          return true;
        }
      }, this);

      // remove the view from the container
      delete this._views[viewCid];

      // update the length
      this._updateLength();
    },

    // Call a method on every view in the container,
    // passing parameters to the call method one at a
    // time, like `function.call`.
    call: function(method){
      this.apply(method, _.tail(arguments));
    },

    // Apply a method on every view in the container,
    // passing parameters to the call method one at a
    // time, like `function.apply`.
    apply: function(method, args){
      _.each(this._views, function(view){
        if (_.isFunction(view[method])){
          view[method].apply(view, args || []);
        }
      });
    },

    // Update the `.length` attribute on this container
    _updateLength: function(){
      this.length = _.size(this._views);
    }
  });

  // Borrowing this code from Backbone.Collection:
  // http://backbonejs.org/docs/backbone.html#section-106
  //
  // Mix in methods from Underscore, for iteration, and other
  // collection related features.
  var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
    'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
    'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
    'last', 'without', 'isEmpty', 'pluck'];

  _.each(methods, function(method) {
    Container.prototype[method] = function() {
      var views = _.values(this._views);
      var args = [views].concat(_.toArray(arguments));
      return _[method].apply(_, args);
    };
  });

  // return the public API
  return Container;
})(Backbone, _);

  return Backbone.ChildViewContainer; 

}));



/***/ }),

/***/ "../../../node_modules/backbone.marionette/lib/core/amd/backbone.marionette.js":
/*!********************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/backbone.marionette/lib/core/amd/backbone.marionette.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v1.1.0
//
// Copyright (c)2013 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com



/*!
 * Includes BabySitter
 * https://github.com/marionettejs/backbone.babysitter/
 *
 * Includes Wreqr
 * https://github.com/marionettejs/backbone.wreqr/
 */

(function (root, factory) {
  if (true) {

    var underscore = __webpack_require__(/*! underscore */ "../../../node_modules/underscore/underscore.js");
    var backbone = __webpack_require__(/*! backbone */ "../../../node_modules/backbone/backbone.js");
    var wreqr = __webpack_require__(/*! backbone.wreqr */ "../../../node_modules/backbone.wreqr/lib/amd/backbone.wreqr.js");
    var babysitter = __webpack_require__(/*! backbone.babysitter */ "../../../node_modules/backbone.babysitter/lib/amd/backbone.babysitter.js");

    module.exports = factory(underscore, backbone, wreqr, babysitter);

  } else {} 
}(this, function (_, Backbone) {

  var Marionette = (function(global, Backbone, _){
  "use strict";

  // Define and export the Marionette namespace
  var Marionette = {};
  Backbone.Marionette = Marionette;

  // Get the DOM manipulator for later use
  Marionette.$ = Backbone.$;

// Helpers
// -------

// For slicing `arguments` in functions
var protoSlice = Array.prototype.slice;
function slice(args) {
  return protoSlice.call(args);
}

function throwError(message, name) {
  var error = new Error(message);
  error.name = name || 'Error';
  throw error;
}

// Marionette.extend
// -----------------

// Borrow the Backbone `extend` method so we can use it as needed
Marionette.extend = Backbone.Model.extend;

// Marionette.getOption
// --------------------

// Retrieve an object, function or other value from a target
// object or its `options`, with `options` taking precedence.
Marionette.getOption = function(target, optionName){
  if (!target || !optionName){ return; }
  var value;

  if (target.options && (optionName in target.options) && (target.options[optionName] !== undefined)){
    value = target.options[optionName];
  } else {
    value = target[optionName];
  }

  return value;
};

// Trigger an event and/or a corresponding method name. Examples:
//
// `this.triggerMethod("foo")` will trigger the "foo" event and
// call the "onFoo" method.
//
// `this.triggerMethod("foo:bar") will trigger the "foo:bar" event and
// call the "onFooBar" method.
Marionette.triggerMethod = (function(){

  // split the event name on the :
  var splitter = /(^|:)(\w)/gi;

  // take the event section ("section1:section2:section3")
  // and turn it in to uppercase name
  function getEventName(match, prefix, eventName) {
    return eventName.toUpperCase();
  }

  // actual triggerMethod name
  var triggerMethod = function(event) {
    // get the method name from the event name
    var methodName = 'on' + event.replace(splitter, getEventName);
    var method = this[methodName];

    // trigger the event, if a trigger method exists
    if(_.isFunction(this.trigger)) {
      this.trigger.apply(this, arguments);
    }

    // call the onMethodName if it exists
    if (_.isFunction(method)) {
      // pass all arguments, except the event name
      return method.apply(this, _.tail(arguments));
    }
  };

  return triggerMethod;
})();

// DOMRefresh
// ----------
//
// Monitor a view's state, and after it has been rendered and shown
// in the DOM, trigger a "dom:refresh" event every time it is
// re-rendered.

Marionette.MonitorDOMRefresh = (function(){
  // track when the view has been shown in the DOM,
  // using a Marionette.Region (or by other means of triggering "show")
  function handleShow(view){
    view._isShown = true;
    triggerDOMRefresh(view);
  }

  // track when the view has been rendered
  function handleRender(view){
    view._isRendered = true;
    triggerDOMRefresh(view);
  }

  // Trigger the "dom:refresh" event and corresponding "onDomRefresh" method
  function triggerDOMRefresh(view){
    if (view._isShown && view._isRendered){
      if (_.isFunction(view.triggerMethod)){
        view.triggerMethod("dom:refresh");
      }
    }
  }

  // Export public API
  return function(view){
    view.listenTo(view, "show", function(){
      handleShow(view);
    });

    view.listenTo(view, "render", function(){
      handleRender(view);
    });
  };
})();


// Marionette.bindEntityEvents & unbindEntityEvents
// ---------------------------
//
// These methods are used to bind/unbind a backbone "entity" (collection/model) 
// to methods on a target object. 
//
// The first parameter, `target`, must have a `listenTo` method from the
// EventBinder object.
//
// The second parameter is the entity (Backbone.Model or Backbone.Collection)
// to bind the events from.
//
// The third parameter is a hash of { "event:name": "eventHandler" }
// configuration. Multiple handlers can be separated by a space. A
// function can be supplied instead of a string handler name. 

(function(Marionette){
  "use strict";

  // Bind the event to handlers specified as a string of
  // handler names on the target object
  function bindFromStrings(target, entity, evt, methods){
    var methodNames = methods.split(/\s+/);

    _.each(methodNames,function(methodName) {

      var method = target[methodName];
      if(!method) {
        throwError("Method '"+ methodName +"' was configured as an event handler, but does not exist.");
      }

      target.listenTo(entity, evt, method, target);
    });
  }

  // Bind the event to a supplied callback function
  function bindToFunction(target, entity, evt, method){
      target.listenTo(entity, evt, method, target);
  }

  // Bind the event to handlers specified as a string of
  // handler names on the target object
  function unbindFromStrings(target, entity, evt, methods){
    var methodNames = methods.split(/\s+/);

    _.each(methodNames,function(methodName) {
      var method = target[methodName];
      target.stopListening(entity, evt, method, target);
    });
  }

  // Bind the event to a supplied callback function
  function unbindToFunction(target, entity, evt, method){
      target.stopListening(entity, evt, method, target);
  }

  
  // generic looping function
  function iterateEvents(target, entity, bindings, functionCallback, stringCallback){
    if (!entity || !bindings) { return; }

    // allow the bindings to be a function
    if (_.isFunction(bindings)){
      bindings = bindings.call(target);
    }

    // iterate the bindings and bind them
    _.each(bindings, function(methods, evt){

      // allow for a function as the handler, 
      // or a list of event names as a string
      if (_.isFunction(methods)){
        functionCallback(target, entity, evt, methods);
      } else {
        stringCallback(target, entity, evt, methods);
      }

    });
  }
 
  // Export Public API
  Marionette.bindEntityEvents = function(target, entity, bindings){
    iterateEvents(target, entity, bindings, bindToFunction, bindFromStrings);
  };

  Marionette.unbindEntityEvents = function(target, entity, bindings){
    iterateEvents(target, entity, bindings, unbindToFunction, unbindFromStrings);
  };

})(Marionette);


// Callbacks
// ---------

// A simple way of managing a collection of callbacks
// and executing them at a later point in time, using jQuery's
// `Deferred` object.
Marionette.Callbacks = function(){
  this._deferred = Marionette.$.Deferred();
  this._callbacks = [];
};

_.extend(Marionette.Callbacks.prototype, {

  // Add a callback to be executed. Callbacks added here are
  // guaranteed to execute, even if they are added after the 
  // `run` method is called.
  add: function(callback, contextOverride){
    this._callbacks.push({cb: callback, ctx: contextOverride});

    this._deferred.done(function(context, options){
      if (contextOverride){ context = contextOverride; }
      callback.call(context, options);
    });
  },

  // Run all registered callbacks with the context specified. 
  // Additional callbacks can be added after this has been run 
  // and they will still be executed.
  run: function(options, context){
    this._deferred.resolve(context, options);
  },

  // Resets the list of callbacks to be run, allowing the same list
  // to be run multiple times - whenever the `run` method is called.
  reset: function(){
    var callbacks = this._callbacks;
    this._deferred = Marionette.$.Deferred();
    this._callbacks = [];
    
    _.each(callbacks, function(cb){
      this.add(cb.cb, cb.ctx);
    }, this);
  }
});


// Marionette Controller
// ---------------------
//
// A multi-purpose object to use as a controller for
// modules and routers, and as a mediator for workflow
// and coordination of other objects, views, and more.
Marionette.Controller = function(options){
  this.triggerMethod = Marionette.triggerMethod;
  this.options = options || {};

  if (_.isFunction(this.initialize)){
    this.initialize(this.options);
  }
};

Marionette.Controller.extend = Marionette.extend;

// Controller Methods
// --------------

// Ensure it can trigger events with Backbone.Events
_.extend(Marionette.Controller.prototype, Backbone.Events, {
  close: function(){
    this.stopListening();
    this.triggerMethod("close");
    this.unbind();
  }
});

// Region 
// ------
//
// Manage the visual regions of your composite application. See
// http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/

Marionette.Region = function(options){
  this.options = options || {};

  this.el = Marionette.getOption(this, "el");

  if (!this.el){
    var err = new Error("An 'el' must be specified for a region.");
    err.name = "NoElError";
    throw err;
  }

  if (this.initialize){
    var args = Array.prototype.slice.apply(arguments);
    this.initialize.apply(this, args);
  }
};


// Region Type methods
// -------------------

_.extend(Marionette.Region, {

  // Build an instance of a region by passing in a configuration object
  // and a default region type to use if none is specified in the config.
  //
  // The config object should either be a string as a jQuery DOM selector,
  // a Region type directly, or an object literal that specifies both
  // a selector and regionType:
  //
  // ```js
  // {
  //   selector: "#foo",
  //   regionType: MyCustomRegion
  // }
  // ```
  //
  buildRegion: function(regionConfig, defaultRegionType){

    var regionIsString = (typeof regionConfig === "string");
    var regionSelectorIsString = (typeof regionConfig.selector === "string");
    var regionTypeIsUndefined = (typeof regionConfig.regionType === "undefined");
    var regionIsType = (typeof regionConfig === "function");

    if (!regionIsType && !regionIsString && !regionSelectorIsString) {
      throw new Error("Region must be specified as a Region type, a selector string or an object with selector property");
    }

    var selector, RegionType;
   
    // get the selector for the region
    
    if (regionIsString) {
      selector = regionConfig;
    } 

    if (regionConfig.selector) {
      selector = regionConfig.selector;
    }

    // get the type for the region
    
    if (regionIsType){
      RegionType = regionConfig;
    }

    if (!regionIsType && regionTypeIsUndefined) {
      RegionType = defaultRegionType;
    }

    if (regionConfig.regionType) {
      RegionType = regionConfig.regionType;
    }
    
    // build the region instance
    var region = new RegionType({
      el: selector
    });

    // override the `getEl` function if we have a parentEl
    // this must be overridden to ensure the selector is found
    // on the first use of the region. if we try to assign the
    // region's `el` to `parentEl.find(selector)` in the object
    // literal to build the region, the element will not be
    // guaranteed to be in the DOM already, and will cause problems
    if (regionConfig.parentEl){

      region.getEl = function(selector) {
        var parentEl = regionConfig.parentEl;
        if (_.isFunction(parentEl)){
          parentEl = parentEl();
        }
        return parentEl.find(selector);
      };
    }

    return region;
  }

});

// Region Instance Methods
// -----------------------

_.extend(Marionette.Region.prototype, Backbone.Events, {

  // Displays a backbone view instance inside of the region.
  // Handles calling the `render` method for you. Reads content
  // directly from the `el` attribute. Also calls an optional
  // `onShow` and `close` method on your view, just after showing
  // or just before closing the view, respectively.
  show: function(view){

    this.ensureEl();

    var isViewClosed = view.isClosed || _.isUndefined(view.$el);

    var isDifferentView = view !== this.currentView;

    if (isDifferentView) {
      this.close();
    }

    view.render();

    if (isDifferentView || isViewClosed) {
      this.open(view);
    }
    
    this.currentView = view;

    Marionette.triggerMethod.call(this, "show", view);
    Marionette.triggerMethod.call(view, "show");
  },

  ensureEl: function(){
    if (!this.$el || this.$el.length === 0){
      this.$el = this.getEl(this.el);
    }
  },

  // Override this method to change how the region finds the
  // DOM element that it manages. Return a jQuery selector object.
  getEl: function(selector){
    return Marionette.$(selector);
  },

  // Override this method to change how the new view is
  // appended to the `$el` that the region is managing
  open: function(view){
    this.$el.empty().append(view.el);
  },

  // Close the current view, if there is one. If there is no
  // current view, it does nothing and returns immediately.
  close: function(){
    var view = this.currentView;
    if (!view || view.isClosed){ return; }

    // call 'close' or 'remove', depending on which is found
    if (view.close) { view.close(); }
    else if (view.remove) { view.remove(); }

    Marionette.triggerMethod.call(this, "close");

    delete this.currentView;
  },

  // Attach an existing view to the region. This 
  // will not call `render` or `onShow` for the new view, 
  // and will not replace the current HTML for the `el`
  // of the region.
  attachView: function(view){
    this.currentView = view;
  },

  // Reset the region by closing any existing view and
  // clearing out the cached `$el`. The next time a view
  // is shown via this region, the region will re-query the
  // DOM for the region's `el`.
  reset: function(){
    this.close();
    delete this.$el;
  }
});

// Copy the `extend` function used by Backbone's classes
Marionette.Region.extend = Marionette.extend;

// Marionette.RegionManager
// ------------------------
//
// Manage one or more related `Marionette.Region` objects.
Marionette.RegionManager = (function(Marionette){

  var RegionManager = Marionette.Controller.extend({
    constructor: function(options){
      this._regions = {};
      Marionette.Controller.prototype.constructor.call(this, options);
    },

    // Add multiple regions using an object literal, where
    // each key becomes the region name, and each value is
    // the region definition.
    addRegions: function(regionDefinitions, defaults){
      var regions = {};

      _.each(regionDefinitions, function(definition, name){
        if (typeof definition === "string"){
          definition = { selector: definition };
        }

        if (definition.selector){
          definition = _.defaults({}, definition, defaults);
        }

        var region = this.addRegion(name, definition);
        regions[name] = region;
      }, this);

      return regions;
    },

    // Add an individual region to the region manager,
    // and return the region instance
    addRegion: function(name, definition){
      var region;

      var isObject = _.isObject(definition);
      var isString = _.isString(definition);
      var hasSelector = !!definition.selector;

      if (isString || (isObject && hasSelector)){
        region = Marionette.Region.buildRegion(definition, Marionette.Region);
      } else if (_.isFunction(definition)){
        region = Marionette.Region.buildRegion(definition, Marionette.Region);
      } else {
        region = definition;
      }

      this._store(name, region);
      this.triggerMethod("region:add", name, region);
      return region;
    },

    // Get a region by name
    get: function(name){
      return this._regions[name];
    },

    // Remove a region by name
    removeRegion: function(name){
      var region = this._regions[name];
      this._remove(name, region);
    },

    // Close all regions in the region manager, and
    // remove them
    removeRegions: function(){
      _.each(this._regions, function(region, name){
        this._remove(name, region);
      }, this);
    },

    // Close all regions in the region manager, but
    // leave them attached
    closeRegions: function(){
      _.each(this._regions, function(region, name){
        region.close();
      }, this);
    },

    // Close all regions and shut down the region
    // manager entirely
    close: function(){
      this.removeRegions();
      var args = Array.prototype.slice.call(arguments);
      Marionette.Controller.prototype.close.apply(this, args);
    },

    // internal method to store regions
    _store: function(name, region){
      this._regions[name] = region;
      this._setLength();
    },

    // internal method to remove a region
    _remove: function(name, region){
      region.close();
      delete this._regions[name];
      this._setLength();
      this.triggerMethod("region:remove", name, region);
    },

    // set the number of regions current held
    _setLength: function(){
      this.length = _.size(this._regions);
    }

  });

  // Borrowing this code from Backbone.Collection:
  // http://backbonejs.org/docs/backbone.html#section-106
  //
  // Mix in methods from Underscore, for iteration, and other
  // collection related features.
  var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 
    'select', 'reject', 'every', 'all', 'some', 'any', 'include', 
    'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 
    'last', 'without', 'isEmpty', 'pluck'];

  _.each(methods, function(method) {
    RegionManager.prototype[method] = function() {
      var regions = _.values(this._regions);
      var args = [regions].concat(_.toArray(arguments));
      return _[method].apply(_, args);
    };
  });

  return RegionManager;
})(Marionette);


// Template Cache
// --------------

// Manage templates stored in `<script>` blocks,
// caching them for faster access.
Marionette.TemplateCache = function(templateId){
  this.templateId = templateId;
};

// TemplateCache object-level methods. Manage the template
// caches from these method calls instead of creating 
// your own TemplateCache instances
_.extend(Marionette.TemplateCache, {
  templateCaches: {},

  // Get the specified template by id. Either
  // retrieves the cached version, or loads it
  // from the DOM.
  get: function(templateId){
    var cachedTemplate = this.templateCaches[templateId];

    if (!cachedTemplate){
      cachedTemplate = new Marionette.TemplateCache(templateId);
      this.templateCaches[templateId] = cachedTemplate;
    }

    return cachedTemplate.load();
  },

  // Clear templates from the cache. If no arguments
  // are specified, clears all templates:
  // `clear()`
  //
  // If arguments are specified, clears each of the 
  // specified templates from the cache:
  // `clear("#t1", "#t2", "...")`
  clear: function(){
    var i;
    var args = slice(arguments);
    var length = args.length;

    if (length > 0){
      for(i=0; i<length; i++){
        delete this.templateCaches[args[i]];
      }
    } else {
      this.templateCaches = {};
    }
  }
});

// TemplateCache instance methods, allowing each
// template cache object to manage its own state
// and know whether or not it has been loaded
_.extend(Marionette.TemplateCache.prototype, {

  // Internal method to load the template
  load: function(){
    // Guard clause to prevent loading this template more than once
    if (this.compiledTemplate){
      return this.compiledTemplate;
    }

    // Load the template and compile it
    var template = this.loadTemplate(this.templateId);
    this.compiledTemplate = this.compileTemplate(template);

    return this.compiledTemplate;
  },

  // Load a template from the DOM, by default. Override
  // this method to provide your own template retrieval
  // For asynchronous loading with AMD/RequireJS, consider
  // using a template-loader plugin as described here: 
  // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
  loadTemplate: function(templateId){
    var template = Marionette.$(templateId).html();

    if (!template || template.length === 0){
      throwError("Could not find template: '" + templateId + "'", "NoTemplateError");
    }

    return template;
  },

  // Pre-compile the template before caching it. Override
  // this method if you do not need to pre-compile a template
  // (JST / RequireJS for example) or if you want to change
  // the template engine used (Handebars, etc).
  compileTemplate: function(rawTemplate){
    return _.template(rawTemplate);
  }
});


// Renderer
// --------

// Render a template with data by passing in the template
// selector and the data to render.
Marionette.Renderer = {

  // Render a template with data. The `template` parameter is
  // passed to the `TemplateCache` object to retrieve the
  // template function. Override this method to provide your own
  // custom rendering and template handling for all of Marionette.
  render: function(template, data){

    if (!template) {
      var error = new Error("Cannot render the template since it's false, null or undefined.");
      error.name = "TemplateNotFoundError";
      throw error;
    }

    var templateFunc;
    if (typeof template === "function"){
      templateFunc = template;
    } else {
      templateFunc = Marionette.TemplateCache.get(template);
    }

    return templateFunc(data);
  }
};



// Marionette.View
// ---------------

// The core view type that other Marionette views extend from.
Marionette.View = Backbone.View.extend({

  constructor: function(){
    _.bindAll(this, "render");

    var args = Array.prototype.slice.apply(arguments);
    Backbone.View.prototype.constructor.apply(this, args);

    Marionette.MonitorDOMRefresh(this);
    this.listenTo(this, "show", this.onShowCalled, this);
  },

  // import the "triggerMethod" to trigger events with corresponding
  // methods if the method exists 
  triggerMethod: Marionette.triggerMethod,

  // Get the template for this view
  // instance. You can set a `template` attribute in the view
  // definition or pass a `template: "whatever"` parameter in
  // to the constructor options.
  getTemplate: function(){
    return Marionette.getOption(this, "template");
  },

  // Mix in template helper methods. Looks for a
  // `templateHelpers` attribute, which can either be an
  // object literal, or a function that returns an object
  // literal. All methods and attributes from this object
  // are copies to the object passed in.
  mixinTemplateHelpers: function(target){
    target = target || {};
    var templateHelpers = Marionette.getOption(this, "templateHelpers");
    if (_.isFunction(templateHelpers)){
      templateHelpers = templateHelpers.call(this);
    }
    return _.extend(target, templateHelpers);
  },

  // Configure `triggers` to forward DOM events to view
  // events. `triggers: {"click .foo": "do:foo"}`
  configureTriggers: function(){
    if (!this.triggers) { return; }

    var triggerEvents = {};

    // Allow `triggers` to be configured as a function
    var triggers = _.result(this, "triggers");

    // Configure the triggers, prevent default
    // action and stop propagation of DOM events
    _.each(triggers, function(value, key){

      // build the event handler function for the DOM event
      triggerEvents[key] = function(e){

        // stop the event in its tracks
        if (e && e.preventDefault){ e.preventDefault(); }
        if (e && e.stopPropagation){ e.stopPropagation(); }

        // build the args for the event
        var args = {
          view: this,
          model: this.model,
          collection: this.collection
        };

        // trigger the event
        this.triggerMethod(value, args);
      };

    }, this);

    return triggerEvents;
  },

  // Overriding Backbone.View's delegateEvents to handle 
  // the `triggers`, `modelEvents`, and `collectionEvents` configuration
  delegateEvents: function(events){
    this._delegateDOMEvents(events);
    Marionette.bindEntityEvents(this, this.model, Marionette.getOption(this, "modelEvents"));
    Marionette.bindEntityEvents(this, this.collection, Marionette.getOption(this, "collectionEvents"));
  },

  // internal method to delegate DOM events and triggers
  _delegateDOMEvents: function(events){
    events = events || this.events;
    if (_.isFunction(events)){ events = events.call(this); }

    var combinedEvents = {};
    var triggers = this.configureTriggers();
    _.extend(combinedEvents, events, triggers);

    Backbone.View.prototype.delegateEvents.call(this, combinedEvents);
  },

  // Overriding Backbone.View's undelegateEvents to handle unbinding
  // the `triggers`, `modelEvents`, and `collectionEvents` config
  undelegateEvents: function(){
    var args = Array.prototype.slice.call(arguments);
    Backbone.View.prototype.undelegateEvents.apply(this, args);

    Marionette.unbindEntityEvents(this, this.model, Marionette.getOption(this, "modelEvents"));
    Marionette.unbindEntityEvents(this, this.collection, Marionette.getOption(this, "collectionEvents"));
  },

  // Internal method, handles the `show` event.
  onShowCalled: function(){},

  // Default `close` implementation, for removing a view from the
  // DOM and unbinding it. Regions will call this method
  // for you. You can specify an `onClose` method in your view to
  // add custom code that is called after the view is closed.
  close: function(){
    if (this.isClosed) { return; }

    // allow the close to be stopped by returning `false`
    // from the `onBeforeClose` method
    var shouldClose = this.triggerMethod("before:close");
    if (shouldClose === false){
      return;
    }

    // mark as closed before doing the actual close, to
    // prevent infinite loops within "close" event handlers
    // that are trying to close other views
    this.isClosed = true;
    this.triggerMethod("close");

    // unbind UI elements
    this.unbindUIElements();

    // remove the view from the DOM
    this.remove();
  },

  // This method binds the elements specified in the "ui" hash inside the view's code with
  // the associated jQuery selectors.
  bindUIElements: function(){
    if (!this.ui) { return; }

    // store the ui hash in _uiBindings so they can be reset later
    // and so re-rendering the view will be able to find the bindings
    if (!this._uiBindings){
      this._uiBindings = this.ui;
    }

    // get the bindings result, as a function or otherwise
    var bindings = _.result(this, "_uiBindings");

    // empty the ui so we don't have anything to start with
    this.ui = {};

    // bind each of the selectors
    _.each(_.keys(bindings), function(key) {
      var selector = bindings[key];
      this.ui[key] = this.$(selector);
    }, this);
  },

  // This method unbinds the elements specified in the "ui" hash
  unbindUIElements: function(){
    if (!this.ui || !this._uiBindings){ return; }

    // delete all of the existing ui bindings
    _.each(this.ui, function($el, name){
      delete this.ui[name];
    }, this);

    // reset the ui element to the original bindings configuration
    this.ui = this._uiBindings;
    delete this._uiBindings;
  }
});

// Item View
// ---------

// A single item view implementation that contains code for rendering
// with underscore.js templates, serializing the view's model or collection,
// and calling several methods on extended views, such as `onRender`.
Marionette.ItemView = Marionette.View.extend({
  
  // Setting up the inheritance chain which allows changes to 
  // Marionette.View.prototype.constructor which allows overriding
  constructor: function(){
    Marionette.View.prototype.constructor.apply(this, slice(arguments));
  },

  // Serialize the model or collection for the view. If a model is
  // found, `.toJSON()` is called. If a collection is found, `.toJSON()`
  // is also called, but is used to populate an `items` array in the
  // resulting data. If both are found, defaults to the model.
  // You can override the `serializeData` method in your own view
  // definition, to provide custom serialization for your view's data.
  serializeData: function(){
    var data = {};

    if (this.model) {
      data = this.model.toJSON();
    }
    else if (this.collection) {
      data = { items: this.collection.toJSON() };
    }

    return data;
  },

  // Render the view, defaulting to underscore.js templates.
  // You can override this in your view definition to provide
  // a very specific rendering for your view. In general, though,
  // you should override the `Marionette.Renderer` object to
  // change how Marionette renders views.
  render: function(){
    this.isClosed = false;

    this.triggerMethod("before:render", this);
    this.triggerMethod("item:before:render", this);

    var data = this.serializeData();
    data = this.mixinTemplateHelpers(data);

    var template = this.getTemplate();
    var html = Marionette.Renderer.render(template, data);

    this.$el.html(html);
    this.bindUIElements();

    this.triggerMethod("render", this);
    this.triggerMethod("item:rendered", this);

    return this;
  },

  // Override the default close event to add a few
  // more events that are triggered.
  close: function(){
    if (this.isClosed){ return; }

    this.triggerMethod('item:before:close');

    Marionette.View.prototype.close.apply(this, slice(arguments));

    this.triggerMethod('item:closed');
  }
});

// Collection View
// ---------------

// A view that iterates over a Backbone.Collection
// and renders an individual ItemView for each model.
Marionette.CollectionView = Marionette.View.extend({
  // used as the prefix for item view events
  // that are forwarded through the collectionview
  itemViewEventPrefix: "itemview",

  // constructor
  constructor: function(options){
    this._initChildViewStorage();

    Marionette.View.prototype.constructor.apply(this, slice(arguments));

    this._initialEvents();
  },

  // Configured the initial events that the collection view
  // binds to. Override this method to prevent the initial
  // events, or to add your own initial events.
  _initialEvents: function(){
    if (this.collection){
      this.listenTo(this.collection, "add", this.addChildView, this);
      this.listenTo(this.collection, "remove", this.removeItemView, this);
      this.listenTo(this.collection, "reset", this.render, this);
    }
  },

  // Handle a child item added to the collection
  addChildView: function(item, collection, options){
    this.closeEmptyView();
    var ItemView = this.getItemView(item);
    var index = this.collection.indexOf(item);
    this.addItemView(item, ItemView, index);
  },

  // Override from `Marionette.View` to guarantee the `onShow` method
  // of child views is called.
  onShowCalled: function(){
    this.children.each(function(child){
      Marionette.triggerMethod.call(child, "show");
    });
  },

  // Internal method to trigger the before render callbacks
  // and events
  triggerBeforeRender: function(){
    this.triggerMethod("before:render", this);
    this.triggerMethod("collection:before:render", this);
  },

  // Internal method to trigger the rendered callbacks and
  // events
  triggerRendered: function(){
    this.triggerMethod("render", this);
    this.triggerMethod("collection:rendered", this);
  },

  // Render the collection of items. Override this method to
  // provide your own implementation of a render function for
  // the collection view.
  render: function(){
    this.isClosed = false;
    this.triggerBeforeRender();
    this._renderChildren();
    this.triggerRendered();
    return this;
  },

  // Internal method. Separated so that CompositeView can have
  // more control over events being triggered, around the rendering
  // process
  _renderChildren: function(){
    this.closeEmptyView();
    this.closeChildren();

    if (this.collection && this.collection.length > 0) {
      this.showCollection();
    } else {
      this.showEmptyView();
    }
  },

  // Internal method to loop through each item in the
  // collection view and show it
  showCollection: function(){
    var ItemView;
    this.collection.each(function(item, index){
      ItemView = this.getItemView(item);
      this.addItemView(item, ItemView, index);
    }, this);
  },

  // Internal method to show an empty view in place of
  // a collection of item views, when the collection is
  // empty
  showEmptyView: function(){
    var EmptyView = Marionette.getOption(this, "emptyView");

    if (EmptyView && !this._showingEmptyView){
      this._showingEmptyView = true;
      var model = new Backbone.Model();
      this.addItemView(model, EmptyView, 0);
    }
  },

  // Internal method to close an existing emptyView instance
  // if one exists. Called when a collection view has been
  // rendered empty, and then an item is added to the collection.
  closeEmptyView: function(){
    if (this._showingEmptyView){
      this.closeChildren();
      delete this._showingEmptyView;
    }
  },

  // Retrieve the itemView type, either from `this.options.itemView`
  // or from the `itemView` in the object definition. The "options"
  // takes precedence.
  getItemView: function(item){
    var itemView = Marionette.getOption(this, "itemView");

    if (!itemView){
      throwError("An `itemView` must be specified", "NoItemViewError");
    }

    return itemView;
  },

  // Render the child item's view and add it to the
  // HTML for the collection view.
  addItemView: function(item, ItemView, index){
    // get the itemViewOptions if any were specified
    var itemViewOptions = Marionette.getOption(this, "itemViewOptions");
    if (_.isFunction(itemViewOptions)){
      itemViewOptions = itemViewOptions.call(this, item, index);
    }

    // build the view 
    var view = this.buildItemView(item, ItemView, itemViewOptions);
    
    // set up the child view event forwarding
    this.addChildViewEventForwarding(view);

    // this view is about to be added
    this.triggerMethod("before:item:added", view);

    // Store the child view itself so we can properly
    // remove and/or close it later
    this.children.add(view);

    // Render it and show it
    this.renderItemView(view, index);

    // call the "show" method if the collection view
    // has already been shown
    if (this._isShown){
      Marionette.triggerMethod.call(view, "show");
    }

    // this view was added
    this.triggerMethod("after:item:added", view);
  },

  // Set up the child view event forwarding. Uses an "itemview:"
  // prefix in front of all forwarded events.
  addChildViewEventForwarding: function(view){
    var prefix = Marionette.getOption(this, "itemViewEventPrefix");

    // Forward all child item view events through the parent,
    // prepending "itemview:" to the event name
    this.listenTo(view, "all", function(){
      var args = slice(arguments);
      args[0] = prefix + ":" + args[0];
      args.splice(1, 0, view);

      Marionette.triggerMethod.apply(this, args);
    }, this);
  },

  // render the item view
  renderItemView: function(view, index) {
    view.render();
    this.appendHtml(this, view, index);
  },

  // Build an `itemView` for every model in the collection.
  buildItemView: function(item, ItemViewType, itemViewOptions){
    var options = _.extend({model: item}, itemViewOptions);
    return new ItemViewType(options);
  },

  // get the child view by item it holds, and remove it
  removeItemView: function(item){
    var view = this.children.findByModel(item);
    this.removeChildView(view);
    this.checkEmpty();
  },

  // Remove the child view and close it
  removeChildView: function(view){

    // shut down the child view properly,
    // including events that the collection has from it
    if (view){
      this.stopListening(view);

      // call 'close' or 'remove', depending on which is found
      if (view.close) { view.close(); }
      else if (view.remove) { view.remove(); }

      this.children.remove(view);
    }

    this.triggerMethod("item:removed", view);
  },

  // helper to show the empty view if the collection is empty
  checkEmpty: function() {
    // check if we're empty now, and if we are, show the
    // empty view
    if (!this.collection || this.collection.length === 0){
      this.showEmptyView();
    }
  },

  // Append the HTML to the collection's `el`.
  // Override this method to do something other
  // then `.append`.
  appendHtml: function(collectionView, itemView, index){
    collectionView.$el.append(itemView.el);
  },

  // Internal method to set up the `children` object for
  // storing all of the child views
  _initChildViewStorage: function(){
    this.children = new Backbone.ChildViewContainer();
  },

  // Handle cleanup and other closing needs for
  // the collection of views.
  close: function(){
    if (this.isClosed){ return; }

    this.triggerMethod("collection:before:close");
    this.closeChildren();
    this.triggerMethod("collection:closed");

    Marionette.View.prototype.close.apply(this, slice(arguments));
  },

  // Close the child views that this collection view
  // is holding on to, if any
  closeChildren: function(){
    this.children.each(function(child){
      this.removeChildView(child);
    }, this);
    this.checkEmpty();
  }
});


// Composite View
// --------------

// Used for rendering a branch-leaf, hierarchical structure.
// Extends directly from CollectionView and also renders an
// an item view as `modelView`, for the top leaf
Marionette.CompositeView = Marionette.CollectionView.extend({

  // Setting up the inheritance chain which allows changes to
  // Marionette.CollectionView.prototype.constructor which allows overriding
  constructor: function(){
    Marionette.CollectionView.prototype.constructor.apply(this, slice(arguments));
  },

  // Configured the initial events that the composite view
  // binds to. Override this method to prevent the initial
  // events, or to add your own initial events.
  _initialEvents: function(){
    if (this.collection){
      this.listenTo(this.collection, "add", this.addChildView, this);
      this.listenTo(this.collection, "remove", this.removeItemView, this);
      this.listenTo(this.collection, "reset", this._renderChildren, this);
    }
  },

  // Retrieve the `itemView` to be used when rendering each of
  // the items in the collection. The default is to return
  // `this.itemView` or Marionette.CompositeView if no `itemView`
  // has been defined
  getItemView: function(item){
    var itemView = Marionette.getOption(this, "itemView") || this.constructor;

    if (!itemView){
      throwError("An `itemView` must be specified", "NoItemViewError");
    }

    return itemView;
  },

  // Serialize the collection for the view.
  // You can override the `serializeData` method in your own view
  // definition, to provide custom serialization for your view's data.
  serializeData: function(){
    var data = {};

    if (this.model){
      data = this.model.toJSON();
    }

    return data;
  },

  // Renders the model once, and the collection once. Calling
  // this again will tell the model's view to re-render itself
  // but the collection will not re-render.
  render: function(){
    this.isRendered = true;
    this.isClosed = false;
    this.resetItemViewContainer();

    this.triggerBeforeRender();
    var html = this.renderModel();
    this.$el.html(html);
    // the ui bindings is done here and not at the end of render since they
    // will not be available until after the model is rendered, but should be
    // available before the collection is rendered.
    this.bindUIElements();
    this.triggerMethod("composite:model:rendered");

    this._renderChildren();

    this.triggerMethod("composite:rendered");
    this.triggerRendered();
    return this;
  },

  _renderChildren: function(){
    if (this.isRendered){
      Marionette.CollectionView.prototype._renderChildren.call(this);
      this.triggerMethod("composite:collection:rendered");
    }
  },

  // Render an individual model, if we have one, as
  // part of a composite view (branch / leaf). For example:
  // a treeview.
  renderModel: function(){
    var data = {};
    data = this.serializeData();
    data = this.mixinTemplateHelpers(data);

    var template = this.getTemplate();
    return Marionette.Renderer.render(template, data);
  },

  // Appends the `el` of itemView instances to the specified
  // `itemViewContainer` (a jQuery selector). Override this method to
  // provide custom logic of how the child item view instances have their
  // HTML appended to the composite view instance.
  appendHtml: function(cv, iv, index){
    var $container = this.getItemViewContainer(cv);
    $container.append(iv.el);
  },

  // Internal method to ensure an `$itemViewContainer` exists, for the
  // `appendHtml` method to use.
  getItemViewContainer: function(containerView){
    if ("$itemViewContainer" in containerView){
      return containerView.$itemViewContainer;
    }

    var container;
    var itemViewContainer = Marionette.getOption(containerView, "itemViewContainer");
    if (itemViewContainer){

      var selector = _.isFunction(itemViewContainer) ? itemViewContainer() : itemViewContainer;
      container = containerView.$(selector);
      if (container.length <= 0) {
        throwError("The specified `itemViewContainer` was not found: " + containerView.itemViewContainer, "ItemViewContainerMissingError");
      }

    } else {
      container = containerView.$el;
    }

    containerView.$itemViewContainer = container;
    return container;
  },

  // Internal method to reset the `$itemViewContainer` on render
  resetItemViewContainer: function(){
    if (this.$itemViewContainer){
      delete this.$itemViewContainer;
    }
  }
});


// Layout
// ------

// Used for managing application layouts, nested layouts and
// multiple regions within an application or sub-application.
//
// A specialized view type that renders an area of HTML and then
// attaches `Region` instances to the specified `regions`.
// Used for composite view management and sub-application areas.
Marionette.Layout = Marionette.ItemView.extend({
  regionType: Marionette.Region,
  
  // Ensure the regions are available when the `initialize` method
  // is called.
  constructor: function (options) {
    options = options || {};

    this._firstRender = true;
    this._initializeRegions(options);
    
    Marionette.ItemView.prototype.constructor.call(this, options);
  },

  // Layout's render will use the existing region objects the
  // first time it is called. Subsequent calls will close the
  // views that the regions are showing and then reset the `el`
  // for the regions to the newly rendered DOM elements.
  render: function(){

    if (this.isClosed){
      // a previously closed layout means we need to 
      // completely re-initialize the regions
      this._initializeRegions();
    }
    if (this._firstRender) {
      // if this is the first render, don't do anything to
      // reset the regions
      this._firstRender = false;
    } else if (!this.isClosed){
      // If this is not the first render call, then we need to 
      // re-initializing the `el` for each region
      this._reInitializeRegions();
    }

    var args = Array.prototype.slice.apply(arguments);
    var result = Marionette.ItemView.prototype.render.apply(this, args);

    return result;
  },

  // Handle closing regions, and then close the view itself.
  close: function () {
    if (this.isClosed){ return; }
    this.regionManager.close();
    var args = Array.prototype.slice.apply(arguments);
    Marionette.ItemView.prototype.close.apply(this, args);
  },

  // Add a single region, by name, to the layout
  addRegion: function(name, definition){
    var regions = {};
    regions[name] = definition;
    return this._buildRegions(regions)[name];
  },

  // Add multiple regions as a {name: definition, name2: def2} object literal
  addRegions: function(regions){
    this.regions = _.extend({}, this.regions, regions);
    return this._buildRegions(regions);
  },

  // Remove a single region from the Layout, by name
  removeRegion: function(name){
    delete this.regions[name];
    return this.regionManager.removeRegion(name);
  },

  // internal method to build regions
  _buildRegions: function(regions){
    var that = this;

    var defaults = {
      regionType: Marionette.getOption(this, "regionType"),
      parentEl: function(){ return that.$el; }
    };

    return this.regionManager.addRegions(regions, defaults);
  },

  // Internal method to initialize the regions that have been defined in a
  // `regions` attribute on this layout. 
  _initializeRegions: function (options) {
    var regions;
    this._initRegionManager();

    if (_.isFunction(this.regions)) {
      regions = this.regions(options);
    } else {
      regions = this.regions || {};
    }

    this.addRegions(regions);
  },

  // Internal method to re-initialize all of the regions by updating the `el` that
  // they point to
  _reInitializeRegions: function(){
    this.regionManager.closeRegions();
    this.regionManager.each(function(region){
      region.reset();
    });
  },

  // Internal method to initialize the region manager
  // and all regions in it
  _initRegionManager: function(){
    this.regionManager = new Marionette.RegionManager();

    this.listenTo(this.regionManager, "region:add", function(name, region){
      this[name] = region;
      this.trigger("region:add", name, region);
    });

    this.listenTo(this.regionManager, "region:remove", function(name, region){
      delete this[name];
      this.trigger("region:remove", name, region);
    });
  }
});


// AppRouter
// ---------

// Reduce the boilerplate code of handling route events
// and then calling a single method on another object.
// Have your routers configured to call the method on
// your object, directly.
//
// Configure an AppRouter with `appRoutes`.
//
// App routers can only take one `controller` object. 
// It is recommended that you divide your controller
// objects in to smaller pieces of related functionality
// and have multiple routers / controllers, instead of
// just one giant router and controller.
//
// You can also add standard routes to an AppRouter.

Marionette.AppRouter = Backbone.Router.extend({

  constructor: function(options){
    Backbone.Router.prototype.constructor.apply(this, slice(arguments));
	
    this.options = options || {};

    var appRoutes = Marionette.getOption(this, "appRoutes");
    var controller = this._getController();
    this.processAppRoutes(controller, appRoutes);
  },

  // Similar to route method on a Backbone Router but
  // method is called on the controller
  appRoute: function(route, methodName) {
    var controller = this._getController();
    this._addAppRoute(controller, route, methodName);
  },

  // Internal method to process the `appRoutes` for the
  // router, and turn them in to routes that trigger the
  // specified method on the specified `controller`.
  processAppRoutes: function(controller, appRoutes) {
    if (!appRoutes){ return; }

    var routeNames = _.keys(appRoutes).reverse(); // Backbone requires reverted order of routes

    _.each(routeNames, function(route) {
      this._addAppRoute(controller, route, appRoutes[route]);
    }, this);
  },

  _getController: function(){
    return Marionette.getOption(this, "controller");
  },

  _addAppRoute: function(controller, route, methodName){
    var method = controller[methodName];

    if (!method) {
      throw new Error("Method '" + methodName + "' was not found on the controller");
    }

    this.route(route, methodName, _.bind(method, controller));
  }
});


// Application
// -----------

// Contain and manage the composite application as a whole.
// Stores and starts up `Region` objects, includes an
// event aggregator as `app.vent`
Marionette.Application = function(options){
  this._initRegionManager();
  this._initCallbacks = new Marionette.Callbacks();
  this.vent = new Backbone.Wreqr.EventAggregator();
  this.commands = new Backbone.Wreqr.Commands();
  this.reqres = new Backbone.Wreqr.RequestResponse();
  this.submodules = {};

  _.extend(this, options);

  this.triggerMethod = Marionette.triggerMethod;
};

_.extend(Marionette.Application.prototype, Backbone.Events, {
  // Command execution, facilitated by Backbone.Wreqr.Commands
  execute: function(){
    var args = Array.prototype.slice.apply(arguments);
    this.commands.execute.apply(this.commands, args);
  },

  // Request/response, facilitated by Backbone.Wreqr.RequestResponse
  request: function(){
    var args = Array.prototype.slice.apply(arguments);
    return this.reqres.request.apply(this.reqres, args);
  },

  // Add an initializer that is either run at when the `start`
  // method is called, or run immediately if added after `start`
  // has already been called.
  addInitializer: function(initializer){
    this._initCallbacks.add(initializer);
  },

  // kick off all of the application's processes.
  // initializes all of the regions that have been added
  // to the app, and runs all of the initializer functions
  start: function(options){
    this.triggerMethod("initialize:before", options);
    this._initCallbacks.run(options, this);
    this.triggerMethod("initialize:after", options);

    this.triggerMethod("start", options);
  },

  // Add regions to your app. 
  // Accepts a hash of named strings or Region objects
  // addRegions({something: "#someRegion"})
  // addRegions({something: Region.extend({el: "#someRegion"}) });
  addRegions: function(regions){
    return this._regionManager.addRegions(regions);
  },

  // Close all regions in the app, without removing them
  closeRegions: function(){
    this._regionManager.closeRegions();
  },

  // Removes a region from your app, by name
  // Accepts the regions name
  // removeRegion('myRegion')
  removeRegion: function(region) {
    this._regionManager.removeRegion(region);
  },
  
  // Provides alternative access to regions
  // Accepts the region name
  // getRegion('main')
  getRegion: function(region) {
    return this._regionManager.get(region);
  },

  // Create a module, attached to the application
  module: function(moduleNames, moduleDefinition){
    // slice the args, and add this application object as the
    // first argument of the array
    var args = slice(arguments);
    args.unshift(this);

    // see the Marionette.Module object for more information
    return Marionette.Module.create.apply(Marionette.Module, args);
  },

  // Internal method to set up the region manager
  _initRegionManager: function(){
    this._regionManager = new Marionette.RegionManager();

    this.listenTo(this._regionManager, "region:add", function(name, region){
      this[name] = region;
    });

    this.listenTo(this._regionManager, "region:remove", function(name, region){
      delete this[name];
    });
  }
});

// Copy the `extend` function used by Backbone's classes
Marionette.Application.extend = Marionette.extend;

// Module
// ------

// A simple module system, used to create privacy and encapsulation in
// Marionette applications
Marionette.Module = function(moduleName, app){
  this.moduleName = moduleName;

  // store sub-modules
  this.submodules = {};

  this._setupInitializersAndFinalizers();

  // store the configuration for this module
  this.app = app;
  this.startWithParent = true;

  this.triggerMethod = Marionette.triggerMethod;
};

// Extend the Module prototype with events / listenTo, so that the module
// can be used as an event aggregator or pub/sub.
_.extend(Marionette.Module.prototype, Backbone.Events, {

  // Initializer for a specific module. Initializers are run when the
  // module's `start` method is called.
  addInitializer: function(callback){
    this._initializerCallbacks.add(callback);
  },

  // Finalizers are run when a module is stopped. They are used to teardown
  // and finalize any variables, references, events and other code that the
  // module had set up.
  addFinalizer: function(callback){
    this._finalizerCallbacks.add(callback);
  },

  // Start the module, and run all of its initializers
  start: function(options){
    // Prevent re-starting a module that is already started
    if (this._isInitialized){ return; }

    // start the sub-modules (depth-first hierarchy)
    _.each(this.submodules, function(mod){
      // check to see if we should start the sub-module with this parent
      if (mod.startWithParent){
        mod.start(options);
      }
    });

    // run the callbacks to "start" the current module
    this.triggerMethod("before:start", options);

    this._initializerCallbacks.run(options, this);
    this._isInitialized = true;

    this.triggerMethod("start", options);
  },

  // Stop this module by running its finalizers and then stop all of
  // the sub-modules for this module
  stop: function(){
    // if we are not initialized, don't bother finalizing
    if (!this._isInitialized){ return; }
    this._isInitialized = false;

    Marionette.triggerMethod.call(this, "before:stop");

    // stop the sub-modules; depth-first, to make sure the
    // sub-modules are stopped / finalized before parents
    _.each(this.submodules, function(mod){ mod.stop(); });

    // run the finalizers
    this._finalizerCallbacks.run(undefined,this);

    // reset the initializers and finalizers
    this._initializerCallbacks.reset();
    this._finalizerCallbacks.reset();

    Marionette.triggerMethod.call(this, "stop");
  },

  // Configure the module with a definition function and any custom args
  // that are to be passed in to the definition function
  addDefinition: function(moduleDefinition, customArgs){
    this._runModuleDefinition(moduleDefinition, customArgs);
  },

  // Internal method: run the module definition function with the correct
  // arguments
  _runModuleDefinition: function(definition, customArgs){
    if (!definition){ return; }

    // build the correct list of arguments for the module definition
    var args = _.flatten([
      this,
      this.app,
      Backbone,
      Marionette,
      Marionette.$, _,
      customArgs
    ]);

    definition.apply(this, args);
  },

  // Internal method: set up new copies of initializers and finalizers.
  // Calling this method will wipe out all existing initializers and
  // finalizers.
  _setupInitializersAndFinalizers: function(){
    this._initializerCallbacks = new Marionette.Callbacks();
    this._finalizerCallbacks = new Marionette.Callbacks();
  }
});

// Type methods to create modules
_.extend(Marionette.Module, {

  // Create a module, hanging off the app parameter as the parent object.
  create: function(app, moduleNames, moduleDefinition){
    var module = app;

    // get the custom args passed in after the module definition and
    // get rid of the module name and definition function
    var customArgs = slice(arguments);
    customArgs.splice(0, 3);

    // split the module names and get the length
    moduleNames = moduleNames.split(".");
    var length = moduleNames.length;

    // store the module definition for the last module in the chain
    var moduleDefinitions = [];
    moduleDefinitions[length-1] = moduleDefinition;

    // Loop through all the parts of the module definition
    _.each(moduleNames, function(moduleName, i){
      var parentModule = module;
      module = this._getModule(parentModule, moduleName, app);
      this._addModuleDefinition(parentModule, module, moduleDefinitions[i], customArgs);
    }, this);

    // Return the last module in the definition chain
    return module;
  },

  _getModule: function(parentModule, moduleName, app, def, args){
    // Get an existing module of this name if we have one
    var module = parentModule[moduleName];

    if (!module){
      // Create a new module if we don't have one
      module = new Marionette.Module(moduleName, app);
      parentModule[moduleName] = module;
      // store the module on the parent
      parentModule.submodules[moduleName] = module;
    }

    return module;
  },

  _addModuleDefinition: function(parentModule, module, def, args){
    var fn; 
    var startWithParent;

    if (_.isFunction(def)){
      // if a function is supplied for the module definition
      fn = def;
      startWithParent = true;

    } else if (_.isObject(def)){
      // if an object is supplied
      fn = def.define;
      startWithParent = def.startWithParent;
      
    } else {
      // if nothing is supplied
      startWithParent = true;
    }

    // add module definition if needed
    if (fn){
      module.addDefinition(fn, args);
    }

    // `and` the two together, ensuring a single `false` will prevent it
    // from starting with the parent
    module.startWithParent = module.startWithParent && startWithParent;

    // setup auto-start if needed
    if (module.startWithParent && !module.startWithParentIsConfigured){

      // only configure this once
      module.startWithParentIsConfigured = true;

      // add the module initializer config
      parentModule.addInitializer(function(options){
        if (module.startWithParent){
          module.start(options);
        }
      });

    }

  }
});



  return Marionette;
})(this, Backbone, _);

  return Backbone.Marionette; 

}));


/***/ }),

/***/ "../../../node_modules/backbone.wreqr/lib/amd/backbone.wreqr.js":
/*!*****************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/backbone.wreqr/lib/amd/backbone.wreqr.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

(function (root, factory) {
  if (true) {

    var underscore = __webpack_require__(/*! underscore */ "../../../node_modules/underscore/underscore.js");
    var backbone = __webpack_require__(/*! backbone */ "../../../node_modules/backbone/backbone.js");

    module.exports = factory(underscore, backbone);

  } else {} 
}(this, function (_, Backbone) {
  "use strict";

  Backbone.Wreqr = (function(Backbone, Marionette, _){
  "use strict";
  var Wreqr = {};

  // Handlers
// --------
// A registry of functions to call, given a name

Wreqr.Handlers = (function(Backbone, _){
  "use strict";
  
  // Constructor
  // -----------

  var Handlers = function(options){
    this.options = options;
    this._wreqrHandlers = {};
    
    if (_.isFunction(this.initialize)){
      this.initialize(options);
    }
  };

  Handlers.extend = Backbone.Model.extend;

  // Instance Members
  // ----------------

  _.extend(Handlers.prototype, Backbone.Events, {

    // Add multiple handlers using an object literal configuration
    setHandlers: function(handlers){
      _.each(handlers, function(handler, name){
        var context = null;

        if (_.isObject(handler) && !_.isFunction(handler)){
          context = handler.context;
          handler = handler.callback;
        }

        this.setHandler(name, handler, context);
      }, this);
    },

    // Add a handler for the given name, with an
    // optional context to run the handler within
    setHandler: function(name, handler, context){
      var config = {
        callback: handler,
        context: context
      };

      this._wreqrHandlers[name] = config;

      this.trigger("handler:add", name, handler, context);
    },

    // Determine whether or not a handler is registered
    hasHandler: function(name){
      return !! this._wreqrHandlers[name];
    },

    // Get the currently registered handler for
    // the specified name. Throws an exception if
    // no handler is found.
    getHandler: function(name){
      var config = this._wreqrHandlers[name];

      if (!config){
        throw new Error("Handler not found for '" + name + "'");
      }

      return function(){
        var args = Array.prototype.slice.apply(arguments);
        return config.callback.apply(config.context, args);
      };
    },

    // Remove a handler for the specified name
    removeHandler: function(name){
      delete this._wreqrHandlers[name];
    },

    // Remove all handlers from this registry
    removeAllHandlers: function(){
      this._wreqrHandlers = {};
    }
  });

  return Handlers;
})(Backbone, _);

  // Wreqr.CommandStorage
// --------------------
//
// Store and retrieve commands for execution.
Wreqr.CommandStorage = (function(){
  "use strict";

  // Constructor function
  var CommandStorage = function(options){
    this.options = options;
    this._commands = {};

    if (_.isFunction(this.initialize)){
      this.initialize(options);
    }
  };

  // Instance methods
  _.extend(CommandStorage.prototype, Backbone.Events, {

    // Get an object literal by command name, that contains
    // the `commandName` and the `instances` of all commands
    // represented as an array of arguments to process
    getCommands: function(commandName){
      var commands = this._commands[commandName];

      // we don't have it, so add it
      if (!commands){

        // build the configuration
        commands = {
          command: commandName, 
          instances: []
        };

        // store it
        this._commands[commandName] = commands;
      }

      return commands;
    },

    // Add a command by name, to the storage and store the
    // args for the command
    addCommand: function(commandName, args){
      var command = this.getCommands(commandName);
      command.instances.push(args);
    },

    // Clear all commands for the given `commandName`
    clearCommands: function(commandName){
      var command = this.getCommands(commandName);
      command.instances = [];
    }
  });

  return CommandStorage;
})();

  // Wreqr.Commands
// --------------
//
// A simple command pattern implementation. Register a command
// handler and execute it.
Wreqr.Commands = (function(Wreqr){
  "use strict";

  return Wreqr.Handlers.extend({
    // default storage type
    storageType: Wreqr.CommandStorage,

    constructor: function(options){
      this.options = options || {};

      this._initializeStorage(this.options);
      this.on("handler:add", this._executeCommands, this);

      var args = Array.prototype.slice.call(arguments);
      Wreqr.Handlers.prototype.constructor.apply(this, args);
    },

    // Execute a named command with the supplied args
    execute: function(name, args){
      name = arguments[0];
      args = Array.prototype.slice.call(arguments, 1);

      if (this.hasHandler(name)){
        this.getHandler(name).apply(this, args);
      } else {
        this.storage.addCommand(name, args);
      }

    },

    // Internal method to handle bulk execution of stored commands
    _executeCommands: function(name, handler, context){
      var command = this.storage.getCommands(name);

      // loop through and execute all the stored command instances
      _.each(command.instances, function(args){
        handler.apply(context, args);
      });

      this.storage.clearCommands(name);
    },

    // Internal method to initialize storage either from the type's
    // `storageType` or the instance `options.storageType`.
    _initializeStorage: function(options){
      var storage;

      var StorageType = options.storageType || this.storageType;
      if (_.isFunction(StorageType)){
        storage = new StorageType();
      } else {
        storage = StorageType;
      }

      this.storage = storage;
    }
  });

})(Wreqr);

  // Wreqr.RequestResponse
// ---------------------
//
// A simple request/response implementation. Register a
// request handler, and return a response from it
Wreqr.RequestResponse = (function(Wreqr){
  "use strict";

  return Wreqr.Handlers.extend({
    request: function(){
      var name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);

      return this.getHandler(name).apply(this, args);
    }
  });

})(Wreqr);

  // Event Aggregator
// ----------------
// A pub-sub object that can be used to decouple various parts
// of an application through event-driven architecture.

Wreqr.EventAggregator = (function(Backbone, _){
  "use strict";
  var EA = function(){};

  // Copy the `extend` function used by Backbone's classes
  EA.extend = Backbone.Model.extend;

  // Copy the basic Backbone.Events on to the event aggregator
  _.extend(EA.prototype, Backbone.Events);

  return EA;
})(Backbone, _);


  return Wreqr;
})(Backbone, Backbone.Marionette, _);

  return Backbone.Wreqr; 

}));



/***/ }),

/***/ "../../../node_modules/backbone/backbone.js":
/*!*********************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/backbone/backbone.js ***!
  \*********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

//     Backbone.js 1.0.0

//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both the browser and the server.
  var Backbone;
  if (true) {
    Backbone = exports;
  } else {}

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.0.0';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && ("function" !== 'undefined')) _ = __webpack_require__(/*! underscore */ "../../../node_modules/backbone/node_modules/underscore/underscore.js");

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender || root.$;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeners = this._listeners;
      if (!listeners) return this;
      var deleteListener = !name && !callback;
      if (typeof name === 'object') callback = this;
      if (obj) (listeners = {})[obj._listenerId] = obj;
      for (var id in listeners) {
        listeners[id].off(name, callback, this);
        if (deleteListener) delete this._listeners[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
      listeners[id] = obj;
      if (typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    _.extend(this, _.pick(options, modelOptions));
    if (options.parse) attrs = this.parse(attrs, options) || {};
    if (defaults = _.result(this, 'defaults')) {
      attrs = _.defaults({}, attrs, defaults);
    }
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // A list of options to be attached directly to the model, if provided.
  var modelOptions = ['url', 'urlRoot', 'collection'];

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = true;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
      if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

      options = _.extend({validate: true}, options);

      // Do not persist invalid models.
      if (!this._validate(attrs, options)) return false;

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options || {}, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.url) this.url = options.url;
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, merge: false, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.defaults(options || {}, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      models = _.isArray(models) ? models.slice() : [models];
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults(options || {}, setOptions);
      if (options.parse) models = this.parse(models, options);
      if (!_.isArray(models)) models = models ? [models] : [];
      var i, l, model, attrs, existing, sort;
      var at = options.at;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        if (!(model = this._prepareModel(models[i], options))) continue;

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(model)) {
          if (options.remove) modelMap[existing.cid] = true;
          if (options.merge) {
            existing.set(model.attributes, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }

        // This is a new model, push it to the `toAdd` list.
        } else if (options.add) {
          toAdd.push(model);

          // Listen to added models' events, and index models for lookup by
          // `id` and by `cid`.
          model.on('all', this._onModelEvent, this);
          this._byId[model.cid] = model;
          if (model.id != null) this._byId[model.id] = model;
        }
      }

      // Remove nonexistent models if appropriate.
      if (options.remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          splice.apply(this.models, [at, 0].concat(toAdd));
        } else {
          push.apply(this.models, toAdd);
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      if (options.silent) return this;

      // Trigger `add` events.
      for (i = 0, l = toAdd.length; i < l; i++) {
        (model = toAdd[i]).trigger('add', model, this, options);
      }

      // Trigger `sort` if the collection was sorted.
      if (sort) this.trigger('sort', this, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id != null ? obj.id : obj.cid || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Figure out the smallest index at which a model should be inserted so as
    // to maintain order.
    sortedIndex: function(model, value, context) {
      value || (value = this.comparator);
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _.sortedIndex(this.models, model, iterator, context);
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) {
        this.trigger('invalid', this, attrs, options);
        return false;
      }
      return model;
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'indexOf', 'shuffle', 'lastIndexOf',
    'isEmpty', 'chain'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(e.g. model, collection, id, className)* are
    // attached directly to the view.  See `viewOptions` for an exhaustive
    // list.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && window.ActiveXObject &&
          !(window.external && window.external.msActiveXFilteringEnabled)) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional){
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param) {
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function (model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

}).call(this);


/***/ }),

/***/ "../../../node_modules/backbone/node_modules/underscore/underscore.js":
/*!***********************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/backbone/node_modules/underscore/underscore.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.9.1
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.9.1';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  var restArguments = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var shallowProperty = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  var has = function(obj, path) {
    return obj != null && hasOwnProperty.call(obj, path);
  }

  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection.
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = _.random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return n == null ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArguments(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArguments(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArguments(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // Returns the first index on an array-like that passes a predicate test.
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments.
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = restArguments(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  _.partial = restArguments(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  _.partial.placeholder = _;

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArguments(function(args) {
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(this, args);
      } else {
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  _.restArguments = restArguments;

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, path) {
    if (!_.isArray(path)) {
      return has(obj, path);
    }
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indexes.
  _.property = function(path) {
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    return function(obj) {
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "../../../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../../../node_modules/bootstrap-2.3.2/css/bootstrap-responsive.css":
/*!*********************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/bootstrap-2.3.2/css/bootstrap-responsive.css ***!
  \*********************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader!../../sass-loader/lib/loader.js??ref--8-2!./bootstrap-responsive.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/bootstrap-2.3.2/css/bootstrap-responsive.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "../../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../../node_modules/bootstrap-2.3.2/css/bootstrap.css":
/*!**********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/bootstrap-2.3.2/css/bootstrap.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader!../../sass-loader/lib/loader.js??ref--8-2!./bootstrap.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/bootstrap-2.3.2/css/bootstrap.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "../../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../../node_modules/bootstrap-2.3.2/img/glyphicons-halflings-white.png":
/*!***************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/bootstrap-2.3.2/img/glyphicons-halflings-white.png ***!
  \***************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9bbc6e9602998a385c2ea13df56470fd.png";

/***/ }),

/***/ "../../../node_modules/bootstrap-2.3.2/img/glyphicons-halflings.png":
/*!*********************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/bootstrap-2.3.2/img/glyphicons-halflings.png ***!
  \*********************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2516339970d710819585f90773aebe0a.png";

/***/ }),

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/bootstrap-2.3.2/css/bootstrap-responsive.css":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/node_modules/bootstrap-2.3.2/css/bootstrap-responsive.css ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*!\n * Bootstrap Responsive v2.3.2\n *\n * Copyright 2013 Twitter, Inc\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Designed and built with all the love in the world by @mdo and @fat.\n */\n.clearfix {\n  *zoom: 1; }\n\n.clearfix:before,\n.clearfix:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.clearfix:after {\n  clear: both; }\n\n.hide-text {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.input-block-level {\n  display: block;\n  width: 100%;\n  min-height: 30px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n@-ms-viewport {\n  width: device-width; }\n\n.hidden {\n  display: none;\n  visibility: hidden; }\n\n.visible-phone {\n  display: none !important; }\n\n.visible-tablet {\n  display: none !important; }\n\n.hidden-desktop {\n  display: none !important; }\n\n.visible-desktop {\n  display: inherit !important; }\n\n@media (min-width: 768px) and (max-width: 979px) {\n  .hidden-desktop {\n    display: inherit !important; }\n  .visible-desktop {\n    display: none !important; }\n  .visible-tablet {\n    display: inherit !important; }\n  .hidden-tablet {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-desktop {\n    display: inherit !important; }\n  .visible-desktop {\n    display: none !important; }\n  .visible-phone {\n    display: inherit !important; }\n  .hidden-phone {\n    display: none !important; } }\n\n.visible-print {\n  display: none !important; }\n\n@media print {\n  .visible-print {\n    display: inherit !important; }\n  .hidden-print {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .row {\n    margin-left: -30px;\n    *zoom: 1; }\n  .row:before,\n  .row:after {\n    display: table;\n    line-height: 0;\n    content: \"\"; }\n  .row:after {\n    clear: both; }\n  [class*=\"span\"] {\n    float: left;\n    min-height: 1px;\n    margin-left: 30px; }\n  .container,\n  .navbar-static-top .container,\n  .navbar-fixed-top .container,\n  .navbar-fixed-bottom .container {\n    width: 1170px; }\n  .span12 {\n    width: 1170px; }\n  .span11 {\n    width: 1070px; }\n  .span10 {\n    width: 970px; }\n  .span9 {\n    width: 870px; }\n  .span8 {\n    width: 770px; }\n  .span7 {\n    width: 670px; }\n  .span6 {\n    width: 570px; }\n  .span5 {\n    width: 470px; }\n  .span4 {\n    width: 370px; }\n  .span3 {\n    width: 270px; }\n  .span2 {\n    width: 170px; }\n  .span1 {\n    width: 70px; }\n  .offset12 {\n    margin-left: 1230px; }\n  .offset11 {\n    margin-left: 1130px; }\n  .offset10 {\n    margin-left: 1030px; }\n  .offset9 {\n    margin-left: 930px; }\n  .offset8 {\n    margin-left: 830px; }\n  .offset7 {\n    margin-left: 730px; }\n  .offset6 {\n    margin-left: 630px; }\n  .offset5 {\n    margin-left: 530px; }\n  .offset4 {\n    margin-left: 430px; }\n  .offset3 {\n    margin-left: 330px; }\n  .offset2 {\n    margin-left: 230px; }\n  .offset1 {\n    margin-left: 130px; }\n  .row-fluid {\n    width: 100%;\n    *zoom: 1; }\n  .row-fluid:before,\n  .row-fluid:after {\n    display: table;\n    line-height: 0;\n    content: \"\"; }\n  .row-fluid:after {\n    clear: both; }\n  .row-fluid [class*=\"span\"] {\n    display: block;\n    float: left;\n    width: 100%;\n    min-height: 30px;\n    margin-left: 2.564102564102564%;\n    *margin-left: 2.5109110747408616%;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n  .row-fluid [class*=\"span\"]:first-child {\n    margin-left: 0; }\n  .row-fluid .controls-row [class*=\"span\"] + [class*=\"span\"] {\n    margin-left: 2.564102564102564%; }\n  .row-fluid .span12 {\n    width: 100%;\n    *width: 99.94680851063829%; }\n  .row-fluid .span11 {\n    width: 91.45299145299145%;\n    *width: 91.39979996362975%; }\n  .row-fluid .span10 {\n    width: 82.90598290598291%;\n    *width: 82.8527914166212%; }\n  .row-fluid .span9 {\n    width: 74.35897435897436%;\n    *width: 74.30578286961266%; }\n  .row-fluid .span8 {\n    width: 65.81196581196582%;\n    *width: 65.75877432260411%; }\n  .row-fluid .span7 {\n    width: 57.26495726495726%;\n    *width: 57.21176577559556%; }\n  .row-fluid .span6 {\n    width: 48.717948717948715%;\n    *width: 48.664757228587014%; }\n  .row-fluid .span5 {\n    width: 40.17094017094017%;\n    *width: 40.11774868157847%; }\n  .row-fluid .span4 {\n    width: 31.623931623931625%;\n    *width: 31.570740134569924%; }\n  .row-fluid .span3 {\n    width: 23.076923076923077%;\n    *width: 23.023731587561375%; }\n  .row-fluid .span2 {\n    width: 14.52991452991453%;\n    *width: 14.476723040552828%; }\n  .row-fluid .span1 {\n    width: 5.982905982905983%;\n    *width: 5.929714493544281%; }\n  .row-fluid .offset12 {\n    margin-left: 105.12820512820512%;\n    *margin-left: 105.02182214948171%; }\n  .row-fluid .offset12:first-child {\n    margin-left: 102.56410256410257%;\n    *margin-left: 102.45771958537915%; }\n  .row-fluid .offset11 {\n    margin-left: 96.58119658119658%;\n    *margin-left: 96.47481360247316%; }\n  .row-fluid .offset11:first-child {\n    margin-left: 94.01709401709402%;\n    *margin-left: 93.91071103837061%; }\n  .row-fluid .offset10 {\n    margin-left: 88.03418803418803%;\n    *margin-left: 87.92780505546462%; }\n  .row-fluid .offset10:first-child {\n    margin-left: 85.47008547008548%;\n    *margin-left: 85.36370249136206%; }\n  .row-fluid .offset9 {\n    margin-left: 79.48717948717949%;\n    *margin-left: 79.38079650845607%; }\n  .row-fluid .offset9:first-child {\n    margin-left: 76.92307692307693%;\n    *margin-left: 76.81669394435352%; }\n  .row-fluid .offset8 {\n    margin-left: 70.94017094017094%;\n    *margin-left: 70.83378796144753%; }\n  .row-fluid .offset8:first-child {\n    margin-left: 68.37606837606839%;\n    *margin-left: 68.26968539734497%; }\n  .row-fluid .offset7 {\n    margin-left: 62.393162393162385%;\n    *margin-left: 62.28677941443899%; }\n  .row-fluid .offset7:first-child {\n    margin-left: 59.82905982905982%;\n    *margin-left: 59.72267685033642%; }\n  .row-fluid .offset6 {\n    margin-left: 53.84615384615384%;\n    *margin-left: 53.739770867430444%; }\n  .row-fluid .offset6:first-child {\n    margin-left: 51.28205128205128%;\n    *margin-left: 51.175668303327875%; }\n  .row-fluid .offset5 {\n    margin-left: 45.299145299145295%;\n    *margin-left: 45.1927623204219%; }\n  .row-fluid .offset5:first-child {\n    margin-left: 42.73504273504273%;\n    *margin-left: 42.62865975631933%; }\n  .row-fluid .offset4 {\n    margin-left: 36.75213675213675%;\n    *margin-left: 36.645753773413354%; }\n  .row-fluid .offset4:first-child {\n    margin-left: 34.18803418803419%;\n    *margin-left: 34.081651209310785%; }\n  .row-fluid .offset3 {\n    margin-left: 28.205128205128204%;\n    *margin-left: 28.0987452264048%; }\n  .row-fluid .offset3:first-child {\n    margin-left: 25.641025641025642%;\n    *margin-left: 25.53464266230224%; }\n  .row-fluid .offset2 {\n    margin-left: 19.65811965811966%;\n    *margin-left: 19.551736679396257%; }\n  .row-fluid .offset2:first-child {\n    margin-left: 17.094017094017094%;\n    *margin-left: 16.98763411529369%; }\n  .row-fluid .offset1 {\n    margin-left: 11.11111111111111%;\n    *margin-left: 11.004728132387708%; }\n  .row-fluid .offset1:first-child {\n    margin-left: 8.547008547008547%;\n    *margin-left: 8.440625568285142%; }\n  input,\n  textarea,\n  .uneditable-input {\n    margin-left: 0; }\n  .controls-row [class*=\"span\"] + [class*=\"span\"] {\n    margin-left: 30px; }\n  input.span12,\n  textarea.span12,\n  .uneditable-input.span12 {\n    width: 1156px; }\n  input.span11,\n  textarea.span11,\n  .uneditable-input.span11 {\n    width: 1056px; }\n  input.span10,\n  textarea.span10,\n  .uneditable-input.span10 {\n    width: 956px; }\n  input.span9,\n  textarea.span9,\n  .uneditable-input.span9 {\n    width: 856px; }\n  input.span8,\n  textarea.span8,\n  .uneditable-input.span8 {\n    width: 756px; }\n  input.span7,\n  textarea.span7,\n  .uneditable-input.span7 {\n    width: 656px; }\n  input.span6,\n  textarea.span6,\n  .uneditable-input.span6 {\n    width: 556px; }\n  input.span5,\n  textarea.span5,\n  .uneditable-input.span5 {\n    width: 456px; }\n  input.span4,\n  textarea.span4,\n  .uneditable-input.span4 {\n    width: 356px; }\n  input.span3,\n  textarea.span3,\n  .uneditable-input.span3 {\n    width: 256px; }\n  input.span2,\n  textarea.span2,\n  .uneditable-input.span2 {\n    width: 156px; }\n  input.span1,\n  textarea.span1,\n  .uneditable-input.span1 {\n    width: 56px; }\n  .thumbnails {\n    margin-left: -30px; }\n  .thumbnails > li {\n    margin-left: 30px; }\n  .row-fluid .thumbnails {\n    margin-left: 0; } }\n\n@media (min-width: 768px) and (max-width: 979px) {\n  .row {\n    margin-left: -20px;\n    *zoom: 1; }\n  .row:before,\n  .row:after {\n    display: table;\n    line-height: 0;\n    content: \"\"; }\n  .row:after {\n    clear: both; }\n  [class*=\"span\"] {\n    float: left;\n    min-height: 1px;\n    margin-left: 20px; }\n  .container,\n  .navbar-static-top .container,\n  .navbar-fixed-top .container,\n  .navbar-fixed-bottom .container {\n    width: 724px; }\n  .span12 {\n    width: 724px; }\n  .span11 {\n    width: 662px; }\n  .span10 {\n    width: 600px; }\n  .span9 {\n    width: 538px; }\n  .span8 {\n    width: 476px; }\n  .span7 {\n    width: 414px; }\n  .span6 {\n    width: 352px; }\n  .span5 {\n    width: 290px; }\n  .span4 {\n    width: 228px; }\n  .span3 {\n    width: 166px; }\n  .span2 {\n    width: 104px; }\n  .span1 {\n    width: 42px; }\n  .offset12 {\n    margin-left: 764px; }\n  .offset11 {\n    margin-left: 702px; }\n  .offset10 {\n    margin-left: 640px; }\n  .offset9 {\n    margin-left: 578px; }\n  .offset8 {\n    margin-left: 516px; }\n  .offset7 {\n    margin-left: 454px; }\n  .offset6 {\n    margin-left: 392px; }\n  .offset5 {\n    margin-left: 330px; }\n  .offset4 {\n    margin-left: 268px; }\n  .offset3 {\n    margin-left: 206px; }\n  .offset2 {\n    margin-left: 144px; }\n  .offset1 {\n    margin-left: 82px; }\n  .row-fluid {\n    width: 100%;\n    *zoom: 1; }\n  .row-fluid:before,\n  .row-fluid:after {\n    display: table;\n    line-height: 0;\n    content: \"\"; }\n  .row-fluid:after {\n    clear: both; }\n  .row-fluid [class*=\"span\"] {\n    display: block;\n    float: left;\n    width: 100%;\n    min-height: 30px;\n    margin-left: 2.7624309392265194%;\n    *margin-left: 2.709239449864817%;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n  .row-fluid [class*=\"span\"]:first-child {\n    margin-left: 0; }\n  .row-fluid .controls-row [class*=\"span\"] + [class*=\"span\"] {\n    margin-left: 2.7624309392265194%; }\n  .row-fluid .span12 {\n    width: 100%;\n    *width: 99.94680851063829%; }\n  .row-fluid .span11 {\n    width: 91.43646408839778%;\n    *width: 91.38327259903608%; }\n  .row-fluid .span10 {\n    width: 82.87292817679558%;\n    *width: 82.81973668743387%; }\n  .row-fluid .span9 {\n    width: 74.30939226519337%;\n    *width: 74.25620077583166%; }\n  .row-fluid .span8 {\n    width: 65.74585635359117%;\n    *width: 65.69266486422946%; }\n  .row-fluid .span7 {\n    width: 57.18232044198895%;\n    *width: 57.12912895262725%; }\n  .row-fluid .span6 {\n    width: 48.61878453038674%;\n    *width: 48.56559304102504%; }\n  .row-fluid .span5 {\n    width: 40.05524861878453%;\n    *width: 40.00205712942283%; }\n  .row-fluid .span4 {\n    width: 31.491712707182323%;\n    *width: 31.43852121782062%; }\n  .row-fluid .span3 {\n    width: 22.92817679558011%;\n    *width: 22.87498530621841%; }\n  .row-fluid .span2 {\n    width: 14.3646408839779%;\n    *width: 14.311449394616199%; }\n  .row-fluid .span1 {\n    width: 5.801104972375691%;\n    *width: 5.747913483013988%; }\n  .row-fluid .offset12 {\n    margin-left: 105.52486187845304%;\n    *margin-left: 105.41847889972962%; }\n  .row-fluid .offset12:first-child {\n    margin-left: 102.76243093922652%;\n    *margin-left: 102.6560479605031%; }\n  .row-fluid .offset11 {\n    margin-left: 96.96132596685082%;\n    *margin-left: 96.8549429881274%; }\n  .row-fluid .offset11:first-child {\n    margin-left: 94.1988950276243%;\n    *margin-left: 94.09251204890089%; }\n  .row-fluid .offset10 {\n    margin-left: 88.39779005524862%;\n    *margin-left: 88.2914070765252%; }\n  .row-fluid .offset10:first-child {\n    margin-left: 85.6353591160221%;\n    *margin-left: 85.52897613729868%; }\n  .row-fluid .offset9 {\n    margin-left: 79.8342541436464%;\n    *margin-left: 79.72787116492299%; }\n  .row-fluid .offset9:first-child {\n    margin-left: 77.07182320441989%;\n    *margin-left: 76.96544022569647%; }\n  .row-fluid .offset8 {\n    margin-left: 71.2707182320442%;\n    *margin-left: 71.16433525332079%; }\n  .row-fluid .offset8:first-child {\n    margin-left: 68.50828729281768%;\n    *margin-left: 68.40190431409427%; }\n  .row-fluid .offset7 {\n    margin-left: 62.70718232044199%;\n    *margin-left: 62.600799341718584%; }\n  .row-fluid .offset7:first-child {\n    margin-left: 59.94475138121547%;\n    *margin-left: 59.838368402492065%; }\n  .row-fluid .offset6 {\n    margin-left: 54.14364640883978%;\n    *margin-left: 54.037263430116376%; }\n  .row-fluid .offset6:first-child {\n    margin-left: 51.38121546961326%;\n    *margin-left: 51.27483249088986%; }\n  .row-fluid .offset5 {\n    margin-left: 45.58011049723757%;\n    *margin-left: 45.47372751851417%; }\n  .row-fluid .offset5:first-child {\n    margin-left: 42.81767955801105%;\n    *margin-left: 42.71129657928765%; }\n  .row-fluid .offset4 {\n    margin-left: 37.01657458563536%;\n    *margin-left: 36.91019160691196%; }\n  .row-fluid .offset4:first-child {\n    margin-left: 34.25414364640884%;\n    *margin-left: 34.14776066768544%; }\n  .row-fluid .offset3 {\n    margin-left: 28.45303867403315%;\n    *margin-left: 28.346655695309746%; }\n  .row-fluid .offset3:first-child {\n    margin-left: 25.69060773480663%;\n    *margin-left: 25.584224756083227%; }\n  .row-fluid .offset2 {\n    margin-left: 19.88950276243094%;\n    *margin-left: 19.783119783707537%; }\n  .row-fluid .offset2:first-child {\n    margin-left: 17.12707182320442%;\n    *margin-left: 17.02068884448102%; }\n  .row-fluid .offset1 {\n    margin-left: 11.32596685082873%;\n    *margin-left: 11.219583872105325%; }\n  .row-fluid .offset1:first-child {\n    margin-left: 8.56353591160221%;\n    *margin-left: 8.457152932878806%; }\n  input,\n  textarea,\n  .uneditable-input {\n    margin-left: 0; }\n  .controls-row [class*=\"span\"] + [class*=\"span\"] {\n    margin-left: 20px; }\n  input.span12,\n  textarea.span12,\n  .uneditable-input.span12 {\n    width: 710px; }\n  input.span11,\n  textarea.span11,\n  .uneditable-input.span11 {\n    width: 648px; }\n  input.span10,\n  textarea.span10,\n  .uneditable-input.span10 {\n    width: 586px; }\n  input.span9,\n  textarea.span9,\n  .uneditable-input.span9 {\n    width: 524px; }\n  input.span8,\n  textarea.span8,\n  .uneditable-input.span8 {\n    width: 462px; }\n  input.span7,\n  textarea.span7,\n  .uneditable-input.span7 {\n    width: 400px; }\n  input.span6,\n  textarea.span6,\n  .uneditable-input.span6 {\n    width: 338px; }\n  input.span5,\n  textarea.span5,\n  .uneditable-input.span5 {\n    width: 276px; }\n  input.span4,\n  textarea.span4,\n  .uneditable-input.span4 {\n    width: 214px; }\n  input.span3,\n  textarea.span3,\n  .uneditable-input.span3 {\n    width: 152px; }\n  input.span2,\n  textarea.span2,\n  .uneditable-input.span2 {\n    width: 90px; }\n  input.span1,\n  textarea.span1,\n  .uneditable-input.span1 {\n    width: 28px; } }\n\n@media (max-width: 767px) {\n  body {\n    padding-right: 20px;\n    padding-left: 20px; }\n  .navbar-fixed-top,\n  .navbar-fixed-bottom,\n  .navbar-static-top {\n    margin-right: -20px;\n    margin-left: -20px; }\n  .container-fluid {\n    padding: 0; }\n  .dl-horizontal dt {\n    float: none;\n    width: auto;\n    clear: none;\n    text-align: left; }\n  .dl-horizontal dd {\n    margin-left: 0; }\n  .container {\n    width: auto; }\n  .row-fluid {\n    width: 100%; }\n  .row,\n  .thumbnails {\n    margin-left: 0; }\n  .thumbnails > li {\n    float: none;\n    margin-left: 0; }\n  [class*=\"span\"],\n  .uneditable-input[class*=\"span\"],\n  .row-fluid [class*=\"span\"] {\n    display: block;\n    float: none;\n    width: 100%;\n    margin-left: 0;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n  .span12,\n  .row-fluid .span12 {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n  .row-fluid [class*=\"offset\"]:first-child {\n    margin-left: 0; }\n  .input-large,\n  .input-xlarge,\n  .input-xxlarge,\n  input[class*=\"span\"],\n  select[class*=\"span\"],\n  textarea[class*=\"span\"],\n  .uneditable-input {\n    display: block;\n    width: 100%;\n    min-height: 30px;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; }\n  .input-prepend input,\n  .input-append input,\n  .input-prepend input[class*=\"span\"],\n  .input-append input[class*=\"span\"] {\n    display: inline-block;\n    width: auto; }\n  .controls-row [class*=\"span\"] + [class*=\"span\"] {\n    margin-left: 0; }\n  .modal {\n    position: fixed;\n    top: 20px;\n    right: 20px;\n    left: 20px;\n    width: auto;\n    margin: 0; }\n  .modal.fade {\n    top: -100px; }\n  .modal.fade.in {\n    top: 20px; } }\n\n@media (max-width: 480px) {\n  .nav-collapse {\n    -webkit-transform: translate3d(0, 0, 0); }\n  .page-header h1 small {\n    display: block;\n    line-height: 20px; }\n  input[type=\"checkbox\"],\n  input[type=\"radio\"] {\n    border: 1px solid #ccc; }\n  .form-horizontal .control-label {\n    float: none;\n    width: auto;\n    padding-top: 0;\n    text-align: left; }\n  .form-horizontal .controls {\n    margin-left: 0; }\n  .form-horizontal .control-list {\n    padding-top: 0; }\n  .form-horizontal .form-actions {\n    padding-right: 10px;\n    padding-left: 10px; }\n  .media .pull-left,\n  .media .pull-right {\n    display: block;\n    float: none;\n    margin-bottom: 10px; }\n  .media-object {\n    margin-right: 0;\n    margin-left: 0; }\n  .modal {\n    top: 10px;\n    right: 10px;\n    left: 10px; }\n  .modal-header .close {\n    padding: 10px;\n    margin: -10px; }\n  .carousel-caption {\n    position: static; } }\n\n@media (max-width: 979px) {\n  body {\n    padding-top: 0; }\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    position: static; }\n  .navbar-fixed-top {\n    margin-bottom: 20px; }\n  .navbar-fixed-bottom {\n    margin-top: 20px; }\n  .navbar-fixed-top .navbar-inner,\n  .navbar-fixed-bottom .navbar-inner {\n    padding: 5px; }\n  .navbar .container {\n    width: auto;\n    padding: 0; }\n  .navbar .brand {\n    padding-right: 10px;\n    padding-left: 10px;\n    margin: 0 0 0 -5px; }\n  .nav-collapse {\n    clear: both; }\n  .nav-collapse .nav {\n    float: none;\n    margin: 0 0 10px; }\n  .nav-collapse .nav > li {\n    float: none; }\n  .nav-collapse .nav > li > a {\n    margin-bottom: 2px; }\n  .nav-collapse .nav > .divider-vertical {\n    display: none; }\n  .nav-collapse .nav .nav-header {\n    color: #777777;\n    text-shadow: none; }\n  .nav-collapse .nav > li > a,\n  .nav-collapse .dropdown-menu a {\n    padding: 9px 15px;\n    font-weight: bold;\n    color: #777777;\n    -webkit-border-radius: 3px;\n    -moz-border-radius: 3px;\n    border-radius: 3px; }\n  .nav-collapse .btn {\n    padding: 4px 10px 4px;\n    font-weight: normal;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px; }\n  .nav-collapse .dropdown-menu li + li a {\n    margin-bottom: 2px; }\n  .nav-collapse .nav > li > a:hover,\n  .nav-collapse .nav > li > a:focus,\n  .nav-collapse .dropdown-menu a:hover,\n  .nav-collapse .dropdown-menu a:focus {\n    background-color: #f2f2f2; }\n  .navbar-inverse .nav-collapse .nav > li > a,\n  .navbar-inverse .nav-collapse .dropdown-menu a {\n    color: #999999; }\n  .navbar-inverse .nav-collapse .nav > li > a:hover,\n  .navbar-inverse .nav-collapse .nav > li > a:focus,\n  .navbar-inverse .nav-collapse .dropdown-menu a:hover,\n  .navbar-inverse .nav-collapse .dropdown-menu a:focus {\n    background-color: #111111; }\n  .nav-collapse.in .btn-group {\n    padding: 0;\n    margin-top: 5px; }\n  .nav-collapse .dropdown-menu {\n    position: static;\n    top: auto;\n    left: auto;\n    display: none;\n    float: none;\n    max-width: none;\n    padding: 0;\n    margin: 0 15px;\n    background-color: transparent;\n    border: none;\n    -webkit-border-radius: 0;\n    -moz-border-radius: 0;\n    border-radius: 0;\n    -webkit-box-shadow: none;\n    -moz-box-shadow: none;\n    box-shadow: none; }\n  .nav-collapse .open > .dropdown-menu {\n    display: block; }\n  .nav-collapse .dropdown-menu:before,\n  .nav-collapse .dropdown-menu:after {\n    display: none; }\n  .nav-collapse .dropdown-menu .divider {\n    display: none; }\n  .nav-collapse .nav > li > .dropdown-menu:before,\n  .nav-collapse .nav > li > .dropdown-menu:after {\n    display: none; }\n  .nav-collapse .navbar-form,\n  .nav-collapse .navbar-search {\n    float: none;\n    padding: 10px 15px;\n    margin: 10px 0;\n    border-top: 1px solid #f2f2f2;\n    border-bottom: 1px solid #f2f2f2;\n    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.1); }\n  .navbar-inverse .nav-collapse .navbar-form,\n  .navbar-inverse .nav-collapse .navbar-search {\n    border-top-color: #111111;\n    border-bottom-color: #111111; }\n  .navbar .nav-collapse .nav.pull-right {\n    float: none;\n    margin-left: 0; }\n  .nav-collapse,\n  .nav-collapse.collapse {\n    height: 0;\n    overflow: hidden; }\n  .navbar .btn-navbar {\n    display: block; }\n  .navbar-static .navbar-inner {\n    padding-right: 10px;\n    padding-left: 10px; } }\n\n@media (min-width: 980px) {\n  .nav-collapse.collapse {\n    height: auto !important;\n    overflow: visible !important; } }\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/bootstrap-2.3.2/css/bootstrap.css":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/node_modules/bootstrap-2.3.2/css/bootstrap.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../css-loader/lib/url/escape.js */ "../../../node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*!\n * Bootstrap v2.3.2\n *\n * Copyright 2013 Twitter, Inc\n * Licensed under the Apache License v2.0\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Designed and built with all the love in the world by @mdo and @fat.\n */\n.clearfix {\n  *zoom: 1; }\n\n.clearfix:before,\n.clearfix:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.clearfix:after {\n  clear: both; }\n\n.hide-text {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.input-block-level {\n  display: block;\n  width: 100%;\n  min-height: 30px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nnav,\nsection {\n  display: block; }\n\naudio,\ncanvas,\nvideo {\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\naudio:not([controls]) {\n  display: none; }\n\nhtml {\n  font-size: 100%;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%; }\n\na:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px; }\n\na:hover,\na:active {\n  outline: 0; }\n\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  width: auto\\9;\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle;\n  border: 0;\n  -ms-interpolation-mode: bicubic; }\n\n#map_canvas img,\n.google-maps img {\n  max-width: none; }\n\nbutton,\ninput,\nselect,\ntextarea {\n  margin: 0;\n  font-size: 100%;\n  vertical-align: middle; }\n\nbutton,\ninput {\n  *overflow: visible;\n  line-height: normal; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  cursor: pointer;\n  -webkit-appearance: button; }\n\nlabel,\nselect,\nbutton,\ninput[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"],\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  cursor: pointer; }\n\ninput[type=\"search\"] {\n  -webkit-box-sizing: content-box;\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  -webkit-appearance: textfield; }\n\ninput[type=\"search\"]::-webkit-search-decoration,\ninput[type=\"search\"]::-webkit-search-cancel-button {\n  -webkit-appearance: none; }\n\ntextarea {\n  overflow: auto;\n  vertical-align: top; }\n\n@media print {\n  * {\n    color: #000 !important;\n    text-shadow: none !important;\n    background: transparent !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  a[href]:after {\n    content: \" (\" attr(href) \")\"; }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\"; }\n  .ir a:after,\n  a[href^=\"javascript:\"]:after,\n  a[href^=\"#\"]:after {\n    content: \"\"; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  img {\n    max-width: 100% !important; }\n  @page {\n    margin: 0.5cm; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; } }\n\nbody {\n  margin: 0;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 20px;\n  color: #333333;\n  background-color: #ffffff; }\n\na {\n  color: #0088cc;\n  text-decoration: none; }\n\na:hover,\na:focus {\n  color: #005580;\n  text-decoration: underline; }\n\n.img-rounded {\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px; }\n\n.img-polaroid {\n  padding: 4px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }\n\n.img-circle {\n  -webkit-border-radius: 500px;\n  -moz-border-radius: 500px;\n  border-radius: 500px; }\n\n.row {\n  margin-left: -20px;\n  *zoom: 1; }\n\n.row:before,\n.row:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.row:after {\n  clear: both; }\n\n[class*=\"span\"] {\n  float: left;\n  min-height: 1px;\n  margin-left: 20px; }\n\n.container,\n.navbar-static-top .container,\n.navbar-fixed-top .container,\n.navbar-fixed-bottom .container {\n  width: 940px; }\n\n.span12 {\n  width: 940px; }\n\n.span11 {\n  width: 860px; }\n\n.span10 {\n  width: 780px; }\n\n.span9 {\n  width: 700px; }\n\n.span8 {\n  width: 620px; }\n\n.span7 {\n  width: 540px; }\n\n.span6 {\n  width: 460px; }\n\n.span5 {\n  width: 380px; }\n\n.span4 {\n  width: 300px; }\n\n.span3 {\n  width: 220px; }\n\n.span2 {\n  width: 140px; }\n\n.span1 {\n  width: 60px; }\n\n.offset12 {\n  margin-left: 980px; }\n\n.offset11 {\n  margin-left: 900px; }\n\n.offset10 {\n  margin-left: 820px; }\n\n.offset9 {\n  margin-left: 740px; }\n\n.offset8 {\n  margin-left: 660px; }\n\n.offset7 {\n  margin-left: 580px; }\n\n.offset6 {\n  margin-left: 500px; }\n\n.offset5 {\n  margin-left: 420px; }\n\n.offset4 {\n  margin-left: 340px; }\n\n.offset3 {\n  margin-left: 260px; }\n\n.offset2 {\n  margin-left: 180px; }\n\n.offset1 {\n  margin-left: 100px; }\n\n.row-fluid {\n  width: 100%;\n  *zoom: 1; }\n\n.row-fluid:before,\n.row-fluid:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.row-fluid:after {\n  clear: both; }\n\n.row-fluid [class*=\"span\"] {\n  display: block;\n  float: left;\n  width: 100%;\n  min-height: 30px;\n  margin-left: 2.127659574468085%;\n  *margin-left: 2.074468085106383%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.row-fluid [class*=\"span\"]:first-child {\n  margin-left: 0; }\n\n.row-fluid .controls-row [class*=\"span\"] + [class*=\"span\"] {\n  margin-left: 2.127659574468085%; }\n\n.row-fluid .span12 {\n  width: 100%;\n  *width: 99.94680851063829%; }\n\n.row-fluid .span11 {\n  width: 91.48936170212765%;\n  *width: 91.43617021276594%; }\n\n.row-fluid .span10 {\n  width: 82.97872340425532%;\n  *width: 82.92553191489361%; }\n\n.row-fluid .span9 {\n  width: 74.46808510638297%;\n  *width: 74.41489361702126%; }\n\n.row-fluid .span8 {\n  width: 65.95744680851064%;\n  *width: 65.90425531914893%; }\n\n.row-fluid .span7 {\n  width: 57.44680851063829%;\n  *width: 57.39361702127659%; }\n\n.row-fluid .span6 {\n  width: 48.93617021276595%;\n  *width: 48.88297872340425%; }\n\n.row-fluid .span5 {\n  width: 40.42553191489362%;\n  *width: 40.37234042553192%; }\n\n.row-fluid .span4 {\n  width: 31.914893617021278%;\n  *width: 31.861702127659576%; }\n\n.row-fluid .span3 {\n  width: 23.404255319148934%;\n  *width: 23.351063829787233%; }\n\n.row-fluid .span2 {\n  width: 14.893617021276595%;\n  *width: 14.840425531914894%; }\n\n.row-fluid .span1 {\n  width: 6.382978723404255%;\n  *width: 6.329787234042553%; }\n\n.row-fluid .offset12 {\n  margin-left: 104.25531914893617%;\n  *margin-left: 104.14893617021275%; }\n\n.row-fluid .offset12:first-child {\n  margin-left: 102.12765957446808%;\n  *margin-left: 102.02127659574467%; }\n\n.row-fluid .offset11 {\n  margin-left: 95.74468085106382%;\n  *margin-left: 95.6382978723404%; }\n\n.row-fluid .offset11:first-child {\n  margin-left: 93.61702127659574%;\n  *margin-left: 93.51063829787232%; }\n\n.row-fluid .offset10 {\n  margin-left: 87.23404255319149%;\n  *margin-left: 87.12765957446807%; }\n\n.row-fluid .offset10:first-child {\n  margin-left: 85.1063829787234%;\n  *margin-left: 84.99999999999999%; }\n\n.row-fluid .offset9 {\n  margin-left: 78.72340425531914%;\n  *margin-left: 78.61702127659572%; }\n\n.row-fluid .offset9:first-child {\n  margin-left: 76.59574468085106%;\n  *margin-left: 76.48936170212764%; }\n\n.row-fluid .offset8 {\n  margin-left: 70.2127659574468%;\n  *margin-left: 70.10638297872339%; }\n\n.row-fluid .offset8:first-child {\n  margin-left: 68.08510638297872%;\n  *margin-left: 67.9787234042553%; }\n\n.row-fluid .offset7 {\n  margin-left: 61.70212765957446%;\n  *margin-left: 61.59574468085106%; }\n\n.row-fluid .offset7:first-child {\n  margin-left: 59.574468085106375%;\n  *margin-left: 59.46808510638297%; }\n\n.row-fluid .offset6 {\n  margin-left: 53.191489361702125%;\n  *margin-left: 53.085106382978715%; }\n\n.row-fluid .offset6:first-child {\n  margin-left: 51.063829787234035%;\n  *margin-left: 50.95744680851063%; }\n\n.row-fluid .offset5 {\n  margin-left: 44.68085106382979%;\n  *margin-left: 44.57446808510638%; }\n\n.row-fluid .offset5:first-child {\n  margin-left: 42.5531914893617%;\n  *margin-left: 42.4468085106383%; }\n\n.row-fluid .offset4 {\n  margin-left: 36.170212765957444%;\n  *margin-left: 36.06382978723405%; }\n\n.row-fluid .offset4:first-child {\n  margin-left: 34.04255319148936%;\n  *margin-left: 33.93617021276596%; }\n\n.row-fluid .offset3 {\n  margin-left: 27.659574468085104%;\n  *margin-left: 27.5531914893617%; }\n\n.row-fluid .offset3:first-child {\n  margin-left: 25.53191489361702%;\n  *margin-left: 25.425531914893618%; }\n\n.row-fluid .offset2 {\n  margin-left: 19.148936170212764%;\n  *margin-left: 19.04255319148936%; }\n\n.row-fluid .offset2:first-child {\n  margin-left: 17.02127659574468%;\n  *margin-left: 16.914893617021278%; }\n\n.row-fluid .offset1 {\n  margin-left: 10.638297872340425%;\n  *margin-left: 10.53191489361702%; }\n\n.row-fluid .offset1:first-child {\n  margin-left: 8.51063829787234%;\n  *margin-left: 8.404255319148938%; }\n\n[class*=\"span\"].hide,\n.row-fluid [class*=\"span\"].hide {\n  display: none; }\n\n[class*=\"span\"].pull-right,\n.row-fluid [class*=\"span\"].pull-right {\n  float: right; }\n\n.container {\n  margin-right: auto;\n  margin-left: auto;\n  *zoom: 1; }\n\n.container:before,\n.container:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.container:after {\n  clear: both; }\n\n.container-fluid {\n  padding-right: 20px;\n  padding-left: 20px;\n  *zoom: 1; }\n\n.container-fluid:before,\n.container-fluid:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.container-fluid:after {\n  clear: both; }\n\np {\n  margin: 0 0 10px; }\n\n.lead {\n  margin-bottom: 20px;\n  font-size: 21px;\n  font-weight: 200;\n  line-height: 30px; }\n\nsmall {\n  font-size: 85%; }\n\nstrong {\n  font-weight: bold; }\n\nem {\n  font-style: italic; }\n\ncite {\n  font-style: normal; }\n\n.muted {\n  color: #999999; }\n\na.muted:hover,\na.muted:focus {\n  color: #808080; }\n\n.text-warning {\n  color: #c09853; }\n\na.text-warning:hover,\na.text-warning:focus {\n  color: #a47e3c; }\n\n.text-error {\n  color: #b94a48; }\n\na.text-error:hover,\na.text-error:focus {\n  color: #953b39; }\n\n.text-info {\n  color: #3a87ad; }\n\na.text-info:hover,\na.text-info:focus {\n  color: #2d6987; }\n\n.text-success {\n  color: #468847; }\n\na.text-success:hover,\na.text-success:focus {\n  color: #356635; }\n\n.text-left {\n  text-align: left; }\n\n.text-right {\n  text-align: right; }\n\n.text-center {\n  text-align: center; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin: 10px 0;\n  font-family: inherit;\n  font-weight: bold;\n  line-height: 20px;\n  color: inherit;\n  text-rendering: optimizelegibility; }\n\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small {\n  font-weight: normal;\n  line-height: 1;\n  color: #999999; }\n\nh1,\nh2,\nh3 {\n  line-height: 40px; }\n\nh1 {\n  font-size: 38.5px; }\n\nh2 {\n  font-size: 31.5px; }\n\nh3 {\n  font-size: 24.5px; }\n\nh4 {\n  font-size: 17.5px; }\n\nh5 {\n  font-size: 14px; }\n\nh6 {\n  font-size: 11.9px; }\n\nh1 small {\n  font-size: 24.5px; }\n\nh2 small {\n  font-size: 17.5px; }\n\nh3 small {\n  font-size: 14px; }\n\nh4 small {\n  font-size: 14px; }\n\n.page-header {\n  padding-bottom: 9px;\n  margin: 20px 0 30px;\n  border-bottom: 1px solid #eeeeee; }\n\nul,\nol {\n  padding: 0;\n  margin: 0 0 10px 25px; }\n\nul ul,\nul ol,\nol ol,\nol ul {\n  margin-bottom: 0; }\n\nli {\n  line-height: 20px; }\n\nul.unstyled,\nol.unstyled {\n  margin-left: 0;\n  list-style: none; }\n\nul.inline,\nol.inline {\n  margin-left: 0;\n  list-style: none; }\n\nul.inline > li,\nol.inline > li {\n  display: inline-block;\n  *display: inline;\n  padding-right: 5px;\n  padding-left: 5px;\n  *zoom: 1; }\n\ndl {\n  margin-bottom: 20px; }\n\ndt,\ndd {\n  line-height: 20px; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-left: 10px; }\n\n.dl-horizontal {\n  *zoom: 1; }\n\n.dl-horizontal:before,\n.dl-horizontal:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.dl-horizontal:after {\n  clear: both; }\n\n.dl-horizontal dt {\n  float: left;\n  width: 160px;\n  overflow: hidden;\n  clear: left;\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.dl-horizontal dd {\n  margin-left: 180px; }\n\nhr {\n  margin: 20px 0;\n  border: 0;\n  border-top: 1px solid #eeeeee;\n  border-bottom: 1px solid #ffffff; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #999999; }\n\nabbr.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\nblockquote {\n  padding: 0 0 0 15px;\n  margin: 0 0 20px;\n  border-left: 5px solid #eeeeee; }\n\nblockquote p {\n  margin-bottom: 0;\n  font-size: 17.5px;\n  font-weight: 300;\n  line-height: 1.25; }\n\nblockquote small {\n  display: block;\n  line-height: 20px;\n  color: #999999; }\n\nblockquote small:before {\n  content: '\\2014   \\A0'; }\n\nblockquote.pull-right {\n  float: right;\n  padding-right: 15px;\n  padding-left: 0;\n  border-right: 5px solid #eeeeee;\n  border-left: 0; }\n\nblockquote.pull-right p,\nblockquote.pull-right small {\n  text-align: right; }\n\nblockquote.pull-right small:before {\n  content: ''; }\n\nblockquote.pull-right small:after {\n  content: '\\A0   \\2014'; }\n\nq:before,\nq:after,\nblockquote:before,\nblockquote:after {\n  content: \"\"; }\n\naddress {\n  display: block;\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 20px; }\n\ncode,\npre {\n  padding: 0 3px 2px;\n  font-family: Monaco, Menlo, Consolas, \"Courier New\", monospace;\n  font-size: 12px;\n  color: #333333;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px; }\n\ncode {\n  padding: 2px 4px;\n  color: #d14;\n  white-space: nowrap;\n  background-color: #f7f7f9;\n  border: 1px solid #e1e1e8; }\n\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 20px;\n  word-break: break-all;\n  word-wrap: break-word;\n  white-space: pre;\n  white-space: pre-wrap;\n  background-color: #f5f5f5;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\npre.prettyprint {\n  margin-bottom: 20px; }\n\npre code {\n  padding: 0;\n  color: inherit;\n  white-space: pre;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\nform {\n  margin: 0 0 20px; }\n\nfieldset {\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: 40px;\n  color: #333333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5; }\n\nlegend small {\n  font-size: 15px;\n  color: #999999; }\n\nlabel,\ninput,\nbutton,\nselect,\ntextarea {\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 20px; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif; }\n\nlabel {\n  display: block;\n  margin-bottom: 5px; }\n\nselect,\ntextarea,\ninput[type=\"text\"],\ninput[type=\"password\"],\ninput[type=\"datetime\"],\ninput[type=\"datetime-local\"],\ninput[type=\"date\"],\ninput[type=\"month\"],\ninput[type=\"time\"],\ninput[type=\"week\"],\ninput[type=\"number\"],\ninput[type=\"email\"],\ninput[type=\"url\"],\ninput[type=\"search\"],\ninput[type=\"tel\"],\ninput[type=\"color\"],\n.uneditable-input {\n  display: inline-block;\n  height: 20px;\n  padding: 4px 6px;\n  margin-bottom: 10px;\n  font-size: 14px;\n  line-height: 20px;\n  color: #555555;\n  vertical-align: middle;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\ninput,\ntextarea,\n.uneditable-input {\n  width: 206px; }\n\ntextarea {\n  height: auto; }\n\ntextarea,\ninput[type=\"text\"],\ninput[type=\"password\"],\ninput[type=\"datetime\"],\ninput[type=\"datetime-local\"],\ninput[type=\"date\"],\ninput[type=\"month\"],\ninput[type=\"time\"],\ninput[type=\"week\"],\ninput[type=\"number\"],\ninput[type=\"email\"],\ninput[type=\"url\"],\ninput[type=\"search\"],\ninput[type=\"tel\"],\ninput[type=\"color\"],\n.uneditable-input {\n  background-color: #ffffff;\n  border: 1px solid #cccccc;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;\n  -moz-transition: border linear 0.2s, box-shadow linear 0.2s;\n  -o-transition: border linear 0.2s, box-shadow linear 0.2s;\n  transition: border linear 0.2s, box-shadow linear 0.2s; }\n\ntextarea:focus,\ninput[type=\"text\"]:focus,\ninput[type=\"password\"]:focus,\ninput[type=\"datetime\"]:focus,\ninput[type=\"datetime-local\"]:focus,\ninput[type=\"date\"]:focus,\ninput[type=\"month\"]:focus,\ninput[type=\"time\"]:focus,\ninput[type=\"week\"]:focus,\ninput[type=\"number\"]:focus,\ninput[type=\"email\"]:focus,\ninput[type=\"url\"]:focus,\ninput[type=\"search\"]:focus,\ninput[type=\"tel\"]:focus,\ninput[type=\"color\"]:focus,\n.uneditable-input:focus {\n  border-color: rgba(82, 168, 236, 0.8);\n  outline: 0;\n  outline: thin dotted \\9;\n  /* IE6-9 */\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6); }\n\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  *margin-top: 0;\n  line-height: normal; }\n\ninput[type=\"file\"],\ninput[type=\"image\"],\ninput[type=\"submit\"],\ninput[type=\"reset\"],\ninput[type=\"button\"],\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  width: auto; }\n\nselect,\ninput[type=\"file\"] {\n  height: 30px;\n  /* In IE7, the height of the select element cannot be changed by height, only font-size */\n  *margin-top: 4px;\n  /* For IE7, add top margin to align select with labels */\n  line-height: 30px; }\n\nselect {\n  width: 220px;\n  background-color: #ffffff;\n  border: 1px solid #cccccc; }\n\nselect[multiple],\nselect[size] {\n  height: auto; }\n\nselect:focus,\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px; }\n\n.uneditable-input,\n.uneditable-textarea {\n  color: #999999;\n  cursor: not-allowed;\n  background-color: #fcfcfc;\n  border-color: #cccccc;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.025);\n  -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.025);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.025); }\n\n.uneditable-input {\n  overflow: hidden;\n  white-space: nowrap; }\n\n.uneditable-textarea {\n  width: auto;\n  height: auto; }\n\ninput:-moz-placeholder,\ntextarea:-moz-placeholder {\n  color: #999999; }\n\ninput:-ms-input-placeholder,\ntextarea:-ms-input-placeholder {\n  color: #999999; }\n\ninput::-webkit-input-placeholder,\ntextarea::-webkit-input-placeholder {\n  color: #999999; }\n\n.radio,\n.checkbox {\n  min-height: 20px;\n  padding-left: 20px; }\n\n.radio input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"] {\n  float: left;\n  margin-left: -20px; }\n\n.controls > .radio:first-child,\n.controls > .checkbox:first-child {\n  padding-top: 5px; }\n\n.radio.inline,\n.checkbox.inline {\n  display: inline-block;\n  padding-top: 5px;\n  margin-bottom: 0;\n  vertical-align: middle; }\n\n.radio.inline + .radio.inline,\n.checkbox.inline + .checkbox.inline {\n  margin-left: 10px; }\n\n.input-mini {\n  width: 60px; }\n\n.input-small {\n  width: 90px; }\n\n.input-medium {\n  width: 150px; }\n\n.input-large {\n  width: 210px; }\n\n.input-xlarge {\n  width: 270px; }\n\n.input-xxlarge {\n  width: 530px; }\n\ninput[class*=\"span\"],\nselect[class*=\"span\"],\ntextarea[class*=\"span\"],\n.uneditable-input[class*=\"span\"],\n.row-fluid input[class*=\"span\"],\n.row-fluid select[class*=\"span\"],\n.row-fluid textarea[class*=\"span\"],\n.row-fluid .uneditable-input[class*=\"span\"] {\n  float: none;\n  margin-left: 0; }\n\n.input-append input[class*=\"span\"],\n.input-append .uneditable-input[class*=\"span\"],\n.input-prepend input[class*=\"span\"],\n.input-prepend .uneditable-input[class*=\"span\"],\n.row-fluid input[class*=\"span\"],\n.row-fluid select[class*=\"span\"],\n.row-fluid textarea[class*=\"span\"],\n.row-fluid .uneditable-input[class*=\"span\"],\n.row-fluid .input-prepend [class*=\"span\"],\n.row-fluid .input-append [class*=\"span\"] {\n  display: inline-block; }\n\ninput,\ntextarea,\n.uneditable-input {\n  margin-left: 0; }\n\n.controls-row [class*=\"span\"] + [class*=\"span\"] {\n  margin-left: 20px; }\n\ninput.span12,\ntextarea.span12,\n.uneditable-input.span12 {\n  width: 926px; }\n\ninput.span11,\ntextarea.span11,\n.uneditable-input.span11 {\n  width: 846px; }\n\ninput.span10,\ntextarea.span10,\n.uneditable-input.span10 {\n  width: 766px; }\n\ninput.span9,\ntextarea.span9,\n.uneditable-input.span9 {\n  width: 686px; }\n\ninput.span8,\ntextarea.span8,\n.uneditable-input.span8 {\n  width: 606px; }\n\ninput.span7,\ntextarea.span7,\n.uneditable-input.span7 {\n  width: 526px; }\n\ninput.span6,\ntextarea.span6,\n.uneditable-input.span6 {\n  width: 446px; }\n\ninput.span5,\ntextarea.span5,\n.uneditable-input.span5 {\n  width: 366px; }\n\ninput.span4,\ntextarea.span4,\n.uneditable-input.span4 {\n  width: 286px; }\n\ninput.span3,\ntextarea.span3,\n.uneditable-input.span3 {\n  width: 206px; }\n\ninput.span2,\ntextarea.span2,\n.uneditable-input.span2 {\n  width: 126px; }\n\ninput.span1,\ntextarea.span1,\n.uneditable-input.span1 {\n  width: 46px; }\n\n.controls-row {\n  *zoom: 1; }\n\n.controls-row:before,\n.controls-row:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.controls-row:after {\n  clear: both; }\n\n.controls-row [class*=\"span\"],\n.row-fluid .controls-row [class*=\"span\"] {\n  float: left; }\n\n.controls-row .checkbox[class*=\"span\"],\n.controls-row .radio[class*=\"span\"] {\n  padding-top: 5px; }\n\ninput[disabled],\nselect[disabled],\ntextarea[disabled],\ninput[readonly],\nselect[readonly],\ntextarea[readonly] {\n  cursor: not-allowed;\n  background-color: #eeeeee; }\n\ninput[type=\"radio\"][disabled],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"radio\"][readonly],\ninput[type=\"checkbox\"][readonly] {\n  background-color: transparent; }\n\n.control-group.warning .control-label,\n.control-group.warning .help-block,\n.control-group.warning .help-inline {\n  color: #c09853; }\n\n.control-group.warning .checkbox,\n.control-group.warning .radio,\n.control-group.warning input,\n.control-group.warning select,\n.control-group.warning textarea {\n  color: #c09853; }\n\n.control-group.warning input,\n.control-group.warning select,\n.control-group.warning textarea {\n  border-color: #c09853;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n\n.control-group.warning input:focus,\n.control-group.warning select:focus,\n.control-group.warning textarea:focus {\n  border-color: #a47e3c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #dbc59e; }\n\n.control-group.warning .input-prepend .add-on,\n.control-group.warning .input-append .add-on {\n  color: #c09853;\n  background-color: #fcf8e3;\n  border-color: #c09853; }\n\n.control-group.error .control-label,\n.control-group.error .help-block,\n.control-group.error .help-inline {\n  color: #b94a48; }\n\n.control-group.error .checkbox,\n.control-group.error .radio,\n.control-group.error input,\n.control-group.error select,\n.control-group.error textarea {\n  color: #b94a48; }\n\n.control-group.error input,\n.control-group.error select,\n.control-group.error textarea {\n  border-color: #b94a48;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n\n.control-group.error input:focus,\n.control-group.error select:focus,\n.control-group.error textarea:focus {\n  border-color: #953b39;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #d59392; }\n\n.control-group.error .input-prepend .add-on,\n.control-group.error .input-append .add-on {\n  color: #b94a48;\n  background-color: #f2dede;\n  border-color: #b94a48; }\n\n.control-group.success .control-label,\n.control-group.success .help-block,\n.control-group.success .help-inline {\n  color: #468847; }\n\n.control-group.success .checkbox,\n.control-group.success .radio,\n.control-group.success input,\n.control-group.success select,\n.control-group.success textarea {\n  color: #468847; }\n\n.control-group.success input,\n.control-group.success select,\n.control-group.success textarea {\n  border-color: #468847;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n\n.control-group.success input:focus,\n.control-group.success select:focus,\n.control-group.success textarea:focus {\n  border-color: #356635;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7aba7b; }\n\n.control-group.success .input-prepend .add-on,\n.control-group.success .input-append .add-on {\n  color: #468847;\n  background-color: #dff0d8;\n  border-color: #468847; }\n\n.control-group.info .control-label,\n.control-group.info .help-block,\n.control-group.info .help-inline {\n  color: #3a87ad; }\n\n.control-group.info .checkbox,\n.control-group.info .radio,\n.control-group.info input,\n.control-group.info select,\n.control-group.info textarea {\n  color: #3a87ad; }\n\n.control-group.info input,\n.control-group.info select,\n.control-group.info textarea {\n  border-color: #3a87ad;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); }\n\n.control-group.info input:focus,\n.control-group.info select:focus,\n.control-group.info textarea:focus {\n  border-color: #2d6987;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7ab5d3;\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7ab5d3;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #7ab5d3; }\n\n.control-group.info .input-prepend .add-on,\n.control-group.info .input-append .add-on {\n  color: #3a87ad;\n  background-color: #d9edf7;\n  border-color: #3a87ad; }\n\ninput:focus:invalid,\ntextarea:focus:invalid,\nselect:focus:invalid {\n  color: #b94a48;\n  border-color: #ee5f5b; }\n\ninput:focus:invalid:focus,\ntextarea:focus:invalid:focus,\nselect:focus:invalid:focus {\n  border-color: #e9322d;\n  -webkit-box-shadow: 0 0 6px #f8b9b7;\n  -moz-box-shadow: 0 0 6px #f8b9b7;\n  box-shadow: 0 0 6px #f8b9b7; }\n\n.form-actions {\n  padding: 19px 20px 20px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border-top: 1px solid #e5e5e5;\n  *zoom: 1; }\n\n.form-actions:before,\n.form-actions:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.form-actions:after {\n  clear: both; }\n\n.help-block,\n.help-inline {\n  color: #595959; }\n\n.help-block {\n  display: block;\n  margin-bottom: 10px; }\n\n.help-inline {\n  display: inline-block;\n  *display: inline;\n  padding-left: 5px;\n  vertical-align: middle;\n  *zoom: 1; }\n\n.input-append,\n.input-prepend {\n  display: inline-block;\n  margin-bottom: 10px;\n  font-size: 0;\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-append input,\n.input-prepend input,\n.input-append select,\n.input-prepend select,\n.input-append .uneditable-input,\n.input-prepend .uneditable-input,\n.input-append .dropdown-menu,\n.input-prepend .dropdown-menu,\n.input-append .popover,\n.input-prepend .popover {\n  font-size: 14px; }\n\n.input-append input,\n.input-prepend input,\n.input-append select,\n.input-prepend select,\n.input-append .uneditable-input,\n.input-prepend .uneditable-input {\n  position: relative;\n  margin-bottom: 0;\n  *margin-left: 0;\n  vertical-align: top;\n  -webkit-border-radius: 0 4px 4px 0;\n  -moz-border-radius: 0 4px 4px 0;\n  border-radius: 0 4px 4px 0; }\n\n.input-append input:focus,\n.input-prepend input:focus,\n.input-append select:focus,\n.input-prepend select:focus,\n.input-append .uneditable-input:focus,\n.input-prepend .uneditable-input:focus {\n  z-index: 2; }\n\n.input-append .add-on,\n.input-prepend .add-on {\n  display: inline-block;\n  width: auto;\n  height: 20px;\n  min-width: 16px;\n  padding: 4px 5px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 20px;\n  text-align: center;\n  text-shadow: 0 1px 0 #ffffff;\n  background-color: #eeeeee;\n  border: 1px solid #ccc; }\n\n.input-append .add-on,\n.input-prepend .add-on,\n.input-append .btn,\n.input-prepend .btn,\n.input-append .btn-group > .dropdown-toggle,\n.input-prepend .btn-group > .dropdown-toggle {\n  vertical-align: top;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.input-append .active,\n.input-prepend .active {\n  background-color: #a9dba9;\n  border-color: #46a546; }\n\n.input-prepend .add-on,\n.input-prepend .btn {\n  margin-right: -1px; }\n\n.input-prepend .add-on:first-child,\n.input-prepend .btn:first-child {\n  -webkit-border-radius: 4px 0 0 4px;\n  -moz-border-radius: 4px 0 0 4px;\n  border-radius: 4px 0 0 4px; }\n\n.input-append input,\n.input-append select,\n.input-append .uneditable-input {\n  -webkit-border-radius: 4px 0 0 4px;\n  -moz-border-radius: 4px 0 0 4px;\n  border-radius: 4px 0 0 4px; }\n\n.input-append input + .btn-group .btn:last-child,\n.input-append select + .btn-group .btn:last-child,\n.input-append .uneditable-input + .btn-group .btn:last-child {\n  -webkit-border-radius: 0 4px 4px 0;\n  -moz-border-radius: 0 4px 4px 0;\n  border-radius: 0 4px 4px 0; }\n\n.input-append .add-on,\n.input-append .btn,\n.input-append .btn-group {\n  margin-left: -1px; }\n\n.input-append .add-on:last-child,\n.input-append .btn:last-child,\n.input-append .btn-group:last-child > .dropdown-toggle {\n  -webkit-border-radius: 0 4px 4px 0;\n  -moz-border-radius: 0 4px 4px 0;\n  border-radius: 0 4px 4px 0; }\n\n.input-prepend.input-append input,\n.input-prepend.input-append select,\n.input-prepend.input-append .uneditable-input {\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.input-prepend.input-append input + .btn-group .btn,\n.input-prepend.input-append select + .btn-group .btn,\n.input-prepend.input-append .uneditable-input + .btn-group .btn {\n  -webkit-border-radius: 0 4px 4px 0;\n  -moz-border-radius: 0 4px 4px 0;\n  border-radius: 0 4px 4px 0; }\n\n.input-prepend.input-append .add-on:first-child,\n.input-prepend.input-append .btn:first-child {\n  margin-right: -1px;\n  -webkit-border-radius: 4px 0 0 4px;\n  -moz-border-radius: 4px 0 0 4px;\n  border-radius: 4px 0 0 4px; }\n\n.input-prepend.input-append .add-on:last-child,\n.input-prepend.input-append .btn:last-child {\n  margin-left: -1px;\n  -webkit-border-radius: 0 4px 4px 0;\n  -moz-border-radius: 0 4px 4px 0;\n  border-radius: 0 4px 4px 0; }\n\n.input-prepend.input-append .btn-group:first-child {\n  margin-left: 0; }\n\ninput.search-query {\n  padding-right: 14px;\n  padding-right: 4px \\9;\n  padding-left: 14px;\n  padding-left: 4px \\9;\n  /* IE7-8 doesn't have border-radius, so don't indent the padding */\n  margin-bottom: 0;\n  -webkit-border-radius: 15px;\n  -moz-border-radius: 15px;\n  border-radius: 15px; }\n\n/* Allow for input prepend/append in search forms */\n.form-search .input-append .search-query,\n.form-search .input-prepend .search-query {\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.form-search .input-append .search-query {\n  -webkit-border-radius: 14px 0 0 14px;\n  -moz-border-radius: 14px 0 0 14px;\n  border-radius: 14px 0 0 14px; }\n\n.form-search .input-append .btn {\n  -webkit-border-radius: 0 14px 14px 0;\n  -moz-border-radius: 0 14px 14px 0;\n  border-radius: 0 14px 14px 0; }\n\n.form-search .input-prepend .search-query {\n  -webkit-border-radius: 0 14px 14px 0;\n  -moz-border-radius: 0 14px 14px 0;\n  border-radius: 0 14px 14px 0; }\n\n.form-search .input-prepend .btn {\n  -webkit-border-radius: 14px 0 0 14px;\n  -moz-border-radius: 14px 0 0 14px;\n  border-radius: 14px 0 0 14px; }\n\n.form-search input,\n.form-inline input,\n.form-horizontal input,\n.form-search textarea,\n.form-inline textarea,\n.form-horizontal textarea,\n.form-search select,\n.form-inline select,\n.form-horizontal select,\n.form-search .help-inline,\n.form-inline .help-inline,\n.form-horizontal .help-inline,\n.form-search .uneditable-input,\n.form-inline .uneditable-input,\n.form-horizontal .uneditable-input,\n.form-search .input-prepend,\n.form-inline .input-prepend,\n.form-horizontal .input-prepend,\n.form-search .input-append,\n.form-inline .input-append,\n.form-horizontal .input-append {\n  display: inline-block;\n  *display: inline;\n  margin-bottom: 0;\n  vertical-align: middle;\n  *zoom: 1; }\n\n.form-search .hide,\n.form-inline .hide,\n.form-horizontal .hide {\n  display: none; }\n\n.form-search label,\n.form-inline label,\n.form-search .btn-group,\n.form-inline .btn-group {\n  display: inline-block; }\n\n.form-search .input-append,\n.form-inline .input-append,\n.form-search .input-prepend,\n.form-inline .input-prepend {\n  margin-bottom: 0; }\n\n.form-search .radio,\n.form-search .checkbox,\n.form-inline .radio,\n.form-inline .checkbox {\n  padding-left: 0;\n  margin-bottom: 0;\n  vertical-align: middle; }\n\n.form-search .radio input[type=\"radio\"],\n.form-search .checkbox input[type=\"checkbox\"],\n.form-inline .radio input[type=\"radio\"],\n.form-inline .checkbox input[type=\"checkbox\"] {\n  float: left;\n  margin-right: 3px;\n  margin-left: 0; }\n\n.control-group {\n  margin-bottom: 10px; }\n\nlegend + .control-group {\n  margin-top: 20px;\n  -webkit-margin-top-collapse: separate; }\n\n.form-horizontal .control-group {\n  margin-bottom: 20px;\n  *zoom: 1; }\n\n.form-horizontal .control-group:before,\n.form-horizontal .control-group:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.form-horizontal .control-group:after {\n  clear: both; }\n\n.form-horizontal .control-label {\n  float: left;\n  width: 160px;\n  padding-top: 5px;\n  text-align: right; }\n\n.form-horizontal .controls {\n  *display: inline-block;\n  *padding-left: 20px;\n  margin-left: 180px;\n  *margin-left: 0; }\n\n.form-horizontal .controls:first-child {\n  *padding-left: 180px; }\n\n.form-horizontal .help-block {\n  margin-bottom: 0; }\n\n.form-horizontal input + .help-block,\n.form-horizontal select + .help-block,\n.form-horizontal textarea + .help-block,\n.form-horizontal .uneditable-input + .help-block,\n.form-horizontal .input-prepend + .help-block,\n.form-horizontal .input-append + .help-block {\n  margin-top: 10px; }\n\n.form-horizontal .form-actions {\n  padding-left: 180px; }\n\ntable {\n  max-width: 100%;\n  background-color: transparent;\n  border-collapse: collapse;\n  border-spacing: 0; }\n\n.table {\n  width: 100%;\n  margin-bottom: 20px; }\n\n.table th,\n.table td {\n  padding: 8px;\n  line-height: 20px;\n  text-align: left;\n  vertical-align: top;\n  border-top: 1px solid #dddddd; }\n\n.table th {\n  font-weight: bold; }\n\n.table thead th {\n  vertical-align: bottom; }\n\n.table caption + thead tr:first-child th,\n.table caption + thead tr:first-child td,\n.table colgroup + thead tr:first-child th,\n.table colgroup + thead tr:first-child td,\n.table thead:first-child tr:first-child th,\n.table thead:first-child tr:first-child td {\n  border-top: 0; }\n\n.table tbody + tbody {\n  border-top: 2px solid #dddddd; }\n\n.table .table {\n  background-color: #ffffff; }\n\n.table-condensed th,\n.table-condensed td {\n  padding: 4px 5px; }\n\n.table-bordered {\n  border: 1px solid #dddddd;\n  border-collapse: separate;\n  *border-collapse: collapse;\n  border-left: 0;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.table-bordered th,\n.table-bordered td {\n  border-left: 1px solid #dddddd; }\n\n.table-bordered caption + thead tr:first-child th,\n.table-bordered caption + tbody tr:first-child th,\n.table-bordered caption + tbody tr:first-child td,\n.table-bordered colgroup + thead tr:first-child th,\n.table-bordered colgroup + tbody tr:first-child th,\n.table-bordered colgroup + tbody tr:first-child td,\n.table-bordered thead:first-child tr:first-child th,\n.table-bordered tbody:first-child tr:first-child th,\n.table-bordered tbody:first-child tr:first-child td {\n  border-top: 0; }\n\n.table-bordered thead:first-child tr:first-child > th:first-child,\n.table-bordered tbody:first-child tr:first-child > td:first-child,\n.table-bordered tbody:first-child tr:first-child > th:first-child {\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -moz-border-radius-topleft: 4px; }\n\n.table-bordered thead:first-child tr:first-child > th:last-child,\n.table-bordered tbody:first-child tr:first-child > td:last-child,\n.table-bordered tbody:first-child tr:first-child > th:last-child {\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  -moz-border-radius-topright: 4px; }\n\n.table-bordered thead:last-child tr:last-child > th:first-child,\n.table-bordered tbody:last-child tr:last-child > td:first-child,\n.table-bordered tbody:last-child tr:last-child > th:first-child,\n.table-bordered tfoot:last-child tr:last-child > td:first-child,\n.table-bordered tfoot:last-child tr:last-child > th:first-child {\n  -webkit-border-bottom-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  -moz-border-radius-bottomleft: 4px; }\n\n.table-bordered thead:last-child tr:last-child > th:last-child,\n.table-bordered tbody:last-child tr:last-child > td:last-child,\n.table-bordered tbody:last-child tr:last-child > th:last-child,\n.table-bordered tfoot:last-child tr:last-child > td:last-child,\n.table-bordered tfoot:last-child tr:last-child > th:last-child {\n  -webkit-border-bottom-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  -moz-border-radius-bottomright: 4px; }\n\n.table-bordered tfoot + tbody:last-child tr:last-child td:first-child {\n  -webkit-border-bottom-left-radius: 0;\n  border-bottom-left-radius: 0;\n  -moz-border-radius-bottomleft: 0; }\n\n.table-bordered tfoot + tbody:last-child tr:last-child td:last-child {\n  -webkit-border-bottom-right-radius: 0;\n  border-bottom-right-radius: 0;\n  -moz-border-radius-bottomright: 0; }\n\n.table-bordered caption + thead tr:first-child th:first-child,\n.table-bordered caption + tbody tr:first-child td:first-child,\n.table-bordered colgroup + thead tr:first-child th:first-child,\n.table-bordered colgroup + tbody tr:first-child td:first-child {\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -moz-border-radius-topleft: 4px; }\n\n.table-bordered caption + thead tr:first-child th:last-child,\n.table-bordered caption + tbody tr:first-child td:last-child,\n.table-bordered colgroup + thead tr:first-child th:last-child,\n.table-bordered colgroup + tbody tr:first-child td:last-child {\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  -moz-border-radius-topright: 4px; }\n\n.table-striped tbody > tr:nth-child(odd) > td,\n.table-striped tbody > tr:nth-child(odd) > th {\n  background-color: #f9f9f9; }\n\n.table-hover tbody tr:hover > td,\n.table-hover tbody tr:hover > th {\n  background-color: #f5f5f5; }\n\ntable td[class*=\"span\"],\ntable th[class*=\"span\"],\n.row-fluid table td[class*=\"span\"],\n.row-fluid table th[class*=\"span\"] {\n  display: table-cell;\n  float: none;\n  margin-left: 0; }\n\n.table td.span1,\n.table th.span1 {\n  float: none;\n  width: 44px;\n  margin-left: 0; }\n\n.table td.span2,\n.table th.span2 {\n  float: none;\n  width: 124px;\n  margin-left: 0; }\n\n.table td.span3,\n.table th.span3 {\n  float: none;\n  width: 204px;\n  margin-left: 0; }\n\n.table td.span4,\n.table th.span4 {\n  float: none;\n  width: 284px;\n  margin-left: 0; }\n\n.table td.span5,\n.table th.span5 {\n  float: none;\n  width: 364px;\n  margin-left: 0; }\n\n.table td.span6,\n.table th.span6 {\n  float: none;\n  width: 444px;\n  margin-left: 0; }\n\n.table td.span7,\n.table th.span7 {\n  float: none;\n  width: 524px;\n  margin-left: 0; }\n\n.table td.span8,\n.table th.span8 {\n  float: none;\n  width: 604px;\n  margin-left: 0; }\n\n.table td.span9,\n.table th.span9 {\n  float: none;\n  width: 684px;\n  margin-left: 0; }\n\n.table td.span10,\n.table th.span10 {\n  float: none;\n  width: 764px;\n  margin-left: 0; }\n\n.table td.span11,\n.table th.span11 {\n  float: none;\n  width: 844px;\n  margin-left: 0; }\n\n.table td.span12,\n.table th.span12 {\n  float: none;\n  width: 924px;\n  margin-left: 0; }\n\n.table tbody tr.success > td {\n  background-color: #dff0d8; }\n\n.table tbody tr.error > td {\n  background-color: #f2dede; }\n\n.table tbody tr.warning > td {\n  background-color: #fcf8e3; }\n\n.table tbody tr.info > td {\n  background-color: #d9edf7; }\n\n.table-hover tbody tr.success:hover > td {\n  background-color: #d0e9c6; }\n\n.table-hover tbody tr.error:hover > td {\n  background-color: #ebcccc; }\n\n.table-hover tbody tr.warning:hover > td {\n  background-color: #faf2cc; }\n\n.table-hover tbody tr.info:hover > td {\n  background-color: #c4e3f3; }\n\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  margin-top: 1px;\n  *margin-right: .3em;\n  line-height: 14px;\n  vertical-align: text-top;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/glyphicons-halflings.png */ "../../../node_modules/bootstrap-2.3.2/img/glyphicons-halflings.png")) + ");\n  background-position: 14px 14px;\n  background-repeat: no-repeat; }\n\n/* White icons with optional class, or on hover/focus/active states of certain elements */\n.icon-white,\n.nav-pills > .active > a > [class^=\"icon-\"],\n.nav-pills > .active > a > [class*=\" icon-\"],\n.nav-list > .active > a > [class^=\"icon-\"],\n.nav-list > .active > a > [class*=\" icon-\"],\n.navbar-inverse .nav > .active > a > [class^=\"icon-\"],\n.navbar-inverse .nav > .active > a > [class*=\" icon-\"],\n.dropdown-menu > li > a:hover > [class^=\"icon-\"],\n.dropdown-menu > li > a:focus > [class^=\"icon-\"],\n.dropdown-menu > li > a:hover > [class*=\" icon-\"],\n.dropdown-menu > li > a:focus > [class*=\" icon-\"],\n.dropdown-menu > .active > a > [class^=\"icon-\"],\n.dropdown-menu > .active > a > [class*=\" icon-\"],\n.dropdown-submenu:hover > a > [class^=\"icon-\"],\n.dropdown-submenu:focus > a > [class^=\"icon-\"],\n.dropdown-submenu:hover > a > [class*=\" icon-\"],\n.dropdown-submenu:focus > a > [class*=\" icon-\"] {\n  background-image: url(" + escape(__webpack_require__(/*! ../img/glyphicons-halflings-white.png */ "../../../node_modules/bootstrap-2.3.2/img/glyphicons-halflings-white.png")) + "); }\n\n.icon-glass {\n  background-position: 0      0; }\n\n.icon-music {\n  background-position: -24px 0; }\n\n.icon-search {\n  background-position: -48px 0; }\n\n.icon-envelope {\n  background-position: -72px 0; }\n\n.icon-heart {\n  background-position: -96px 0; }\n\n.icon-star {\n  background-position: -120px 0; }\n\n.icon-star-empty {\n  background-position: -144px 0; }\n\n.icon-user {\n  background-position: -168px 0; }\n\n.icon-film {\n  background-position: -192px 0; }\n\n.icon-th-large {\n  background-position: -216px 0; }\n\n.icon-th {\n  background-position: -240px 0; }\n\n.icon-th-list {\n  background-position: -264px 0; }\n\n.icon-ok {\n  background-position: -288px 0; }\n\n.icon-remove {\n  background-position: -312px 0; }\n\n.icon-zoom-in {\n  background-position: -336px 0; }\n\n.icon-zoom-out {\n  background-position: -360px 0; }\n\n.icon-off {\n  background-position: -384px 0; }\n\n.icon-signal {\n  background-position: -408px 0; }\n\n.icon-cog {\n  background-position: -432px 0; }\n\n.icon-trash {\n  background-position: -456px 0; }\n\n.icon-home {\n  background-position: 0 -24px; }\n\n.icon-file {\n  background-position: -24px -24px; }\n\n.icon-time {\n  background-position: -48px -24px; }\n\n.icon-road {\n  background-position: -72px -24px; }\n\n.icon-download-alt {\n  background-position: -96px -24px; }\n\n.icon-download {\n  background-position: -120px -24px; }\n\n.icon-upload {\n  background-position: -144px -24px; }\n\n.icon-inbox {\n  background-position: -168px -24px; }\n\n.icon-play-circle {\n  background-position: -192px -24px; }\n\n.icon-repeat {\n  background-position: -216px -24px; }\n\n.icon-refresh {\n  background-position: -240px -24px; }\n\n.icon-list-alt {\n  background-position: -264px -24px; }\n\n.icon-lock {\n  background-position: -287px -24px; }\n\n.icon-flag {\n  background-position: -312px -24px; }\n\n.icon-headphones {\n  background-position: -336px -24px; }\n\n.icon-volume-off {\n  background-position: -360px -24px; }\n\n.icon-volume-down {\n  background-position: -384px -24px; }\n\n.icon-volume-up {\n  background-position: -408px -24px; }\n\n.icon-qrcode {\n  background-position: -432px -24px; }\n\n.icon-barcode {\n  background-position: -456px -24px; }\n\n.icon-tag {\n  background-position: 0 -48px; }\n\n.icon-tags {\n  background-position: -25px -48px; }\n\n.icon-book {\n  background-position: -48px -48px; }\n\n.icon-bookmark {\n  background-position: -72px -48px; }\n\n.icon-print {\n  background-position: -96px -48px; }\n\n.icon-camera {\n  background-position: -120px -48px; }\n\n.icon-font {\n  background-position: -144px -48px; }\n\n.icon-bold {\n  background-position: -167px -48px; }\n\n.icon-italic {\n  background-position: -192px -48px; }\n\n.icon-text-height {\n  background-position: -216px -48px; }\n\n.icon-text-width {\n  background-position: -240px -48px; }\n\n.icon-align-left {\n  background-position: -264px -48px; }\n\n.icon-align-center {\n  background-position: -288px -48px; }\n\n.icon-align-right {\n  background-position: -312px -48px; }\n\n.icon-align-justify {\n  background-position: -336px -48px; }\n\n.icon-list {\n  background-position: -360px -48px; }\n\n.icon-indent-left {\n  background-position: -384px -48px; }\n\n.icon-indent-right {\n  background-position: -408px -48px; }\n\n.icon-facetime-video {\n  background-position: -432px -48px; }\n\n.icon-picture {\n  background-position: -456px -48px; }\n\n.icon-pencil {\n  background-position: 0 -72px; }\n\n.icon-map-marker {\n  background-position: -24px -72px; }\n\n.icon-adjust {\n  background-position: -48px -72px; }\n\n.icon-tint {\n  background-position: -72px -72px; }\n\n.icon-edit {\n  background-position: -96px -72px; }\n\n.icon-share {\n  background-position: -120px -72px; }\n\n.icon-check {\n  background-position: -144px -72px; }\n\n.icon-move {\n  background-position: -168px -72px; }\n\n.icon-step-backward {\n  background-position: -192px -72px; }\n\n.icon-fast-backward {\n  background-position: -216px -72px; }\n\n.icon-backward {\n  background-position: -240px -72px; }\n\n.icon-play {\n  background-position: -264px -72px; }\n\n.icon-pause {\n  background-position: -288px -72px; }\n\n.icon-stop {\n  background-position: -312px -72px; }\n\n.icon-forward {\n  background-position: -336px -72px; }\n\n.icon-fast-forward {\n  background-position: -360px -72px; }\n\n.icon-step-forward {\n  background-position: -384px -72px; }\n\n.icon-eject {\n  background-position: -408px -72px; }\n\n.icon-chevron-left {\n  background-position: -432px -72px; }\n\n.icon-chevron-right {\n  background-position: -456px -72px; }\n\n.icon-plus-sign {\n  background-position: 0 -96px; }\n\n.icon-minus-sign {\n  background-position: -24px -96px; }\n\n.icon-remove-sign {\n  background-position: -48px -96px; }\n\n.icon-ok-sign {\n  background-position: -72px -96px; }\n\n.icon-question-sign {\n  background-position: -96px -96px; }\n\n.icon-info-sign {\n  background-position: -120px -96px; }\n\n.icon-screenshot {\n  background-position: -144px -96px; }\n\n.icon-remove-circle {\n  background-position: -168px -96px; }\n\n.icon-ok-circle {\n  background-position: -192px -96px; }\n\n.icon-ban-circle {\n  background-position: -216px -96px; }\n\n.icon-arrow-left {\n  background-position: -240px -96px; }\n\n.icon-arrow-right {\n  background-position: -264px -96px; }\n\n.icon-arrow-up {\n  background-position: -289px -96px; }\n\n.icon-arrow-down {\n  background-position: -312px -96px; }\n\n.icon-share-alt {\n  background-position: -336px -96px; }\n\n.icon-resize-full {\n  background-position: -360px -96px; }\n\n.icon-resize-small {\n  background-position: -384px -96px; }\n\n.icon-plus {\n  background-position: -408px -96px; }\n\n.icon-minus {\n  background-position: -433px -96px; }\n\n.icon-asterisk {\n  background-position: -456px -96px; }\n\n.icon-exclamation-sign {\n  background-position: 0 -120px; }\n\n.icon-gift {\n  background-position: -24px -120px; }\n\n.icon-leaf {\n  background-position: -48px -120px; }\n\n.icon-fire {\n  background-position: -72px -120px; }\n\n.icon-eye-open {\n  background-position: -96px -120px; }\n\n.icon-eye-close {\n  background-position: -120px -120px; }\n\n.icon-warning-sign {\n  background-position: -144px -120px; }\n\n.icon-plane {\n  background-position: -168px -120px; }\n\n.icon-calendar {\n  background-position: -192px -120px; }\n\n.icon-random {\n  width: 16px;\n  background-position: -216px -120px; }\n\n.icon-comment {\n  background-position: -240px -120px; }\n\n.icon-magnet {\n  background-position: -264px -120px; }\n\n.icon-chevron-up {\n  background-position: -288px -120px; }\n\n.icon-chevron-down {\n  background-position: -313px -119px; }\n\n.icon-retweet {\n  background-position: -336px -120px; }\n\n.icon-shopping-cart {\n  background-position: -360px -120px; }\n\n.icon-folder-close {\n  width: 16px;\n  background-position: -384px -120px; }\n\n.icon-folder-open {\n  width: 16px;\n  background-position: -408px -120px; }\n\n.icon-resize-vertical {\n  background-position: -432px -119px; }\n\n.icon-resize-horizontal {\n  background-position: -456px -118px; }\n\n.icon-hdd {\n  background-position: 0 -144px; }\n\n.icon-bullhorn {\n  background-position: -24px -144px; }\n\n.icon-bell {\n  background-position: -48px -144px; }\n\n.icon-certificate {\n  background-position: -72px -144px; }\n\n.icon-thumbs-up {\n  background-position: -96px -144px; }\n\n.icon-thumbs-down {\n  background-position: -120px -144px; }\n\n.icon-hand-right {\n  background-position: -144px -144px; }\n\n.icon-hand-left {\n  background-position: -168px -144px; }\n\n.icon-hand-up {\n  background-position: -192px -144px; }\n\n.icon-hand-down {\n  background-position: -216px -144px; }\n\n.icon-circle-arrow-right {\n  background-position: -240px -144px; }\n\n.icon-circle-arrow-left {\n  background-position: -264px -144px; }\n\n.icon-circle-arrow-up {\n  background-position: -288px -144px; }\n\n.icon-circle-arrow-down {\n  background-position: -312px -144px; }\n\n.icon-globe {\n  background-position: -336px -144px; }\n\n.icon-wrench {\n  background-position: -360px -144px; }\n\n.icon-tasks {\n  background-position: -384px -144px; }\n\n.icon-filter {\n  background-position: -408px -144px; }\n\n.icon-briefcase {\n  background-position: -432px -144px; }\n\n.icon-fullscreen {\n  background-position: -456px -144px; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle {\n  *margin-bottom: -3px; }\n\n.dropdown-toggle:active,\n.open .dropdown-toggle {\n  outline: 0; }\n\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  vertical-align: top;\n  border-top: 4px solid #000000;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n  content: \"\"; }\n\n.dropdown .caret {\n  margin-top: 8px;\n  margin-left: 2px; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  background-color: #ffffff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  *border-right-width: 2px;\n  *border-bottom-width: 2px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  -webkit-background-clip: padding-box;\n  -moz-background-clip: padding;\n  background-clip: padding-box; }\n\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu .divider {\n  *width: 100%;\n  height: 1px;\n  margin: 9px 1px;\n  *margin: -5px 0 5px;\n  overflow: hidden;\n  background-color: #e5e5e5;\n  border-bottom: 1px solid #ffffff; }\n\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 20px;\n  color: #333333;\n  white-space: nowrap; }\n\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus,\n.dropdown-submenu:hover > a,\n.dropdown-submenu:focus > a {\n  color: #ffffff;\n  text-decoration: none;\n  background-color: #0081c2;\n  background-image: -moz-linear-gradient(top, #0088cc, #0077b3);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0077b3));\n  background-image: -webkit-linear-gradient(top, #0088cc, #0077b3);\n  background-image: -o-linear-gradient(top, #0088cc, #0077b3);\n  background-image: linear-gradient(to bottom, #0088cc, #0077b3);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0077b3', GradientType=0); }\n\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #ffffff;\n  text-decoration: none;\n  background-color: #0081c2;\n  background-image: -moz-linear-gradient(top, #0088cc, #0077b3);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0077b3));\n  background-image: -webkit-linear-gradient(top, #0088cc, #0077b3);\n  background-image: -o-linear-gradient(top, #0088cc, #0077b3);\n  background-image: linear-gradient(to bottom, #0088cc, #0077b3);\n  background-repeat: repeat-x;\n  outline: 0;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0077b3', GradientType=0); }\n\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #999999; }\n\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  cursor: default;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.open {\n  *z-index: 1000; }\n\n.open > .dropdown-menu {\n  display: block; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto; }\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  border-top: 0;\n  border-bottom: 4px solid #000000;\n  content: \"\"; }\n\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 1px; }\n\n.dropdown-submenu {\n  position: relative; }\n\n.dropdown-submenu > .dropdown-menu {\n  top: 0;\n  left: 100%;\n  margin-top: -6px;\n  margin-left: -1px;\n  -webkit-border-radius: 0 6px 6px 6px;\n  -moz-border-radius: 0 6px 6px 6px;\n  border-radius: 0 6px 6px 6px; }\n\n.dropdown-submenu:hover > .dropdown-menu {\n  display: block; }\n\n.dropup .dropdown-submenu > .dropdown-menu {\n  top: auto;\n  bottom: 0;\n  margin-top: 0;\n  margin-bottom: -2px;\n  -webkit-border-radius: 5px 5px 5px 0;\n  -moz-border-radius: 5px 5px 5px 0;\n  border-radius: 5px 5px 5px 0; }\n\n.dropdown-submenu > a:after {\n  display: block;\n  float: right;\n  width: 0;\n  height: 0;\n  margin-top: 5px;\n  margin-right: -10px;\n  border-color: transparent;\n  border-left-color: #cccccc;\n  border-style: solid;\n  border-width: 5px 0 5px 5px;\n  content: \" \"; }\n\n.dropdown-submenu:hover > a:after {\n  border-left-color: #ffffff; }\n\n.dropdown-submenu.pull-left {\n  float: none; }\n\n.dropdown-submenu.pull-left > .dropdown-menu {\n  left: -100%;\n  margin-left: 10px;\n  -webkit-border-radius: 6px 0 6px 6px;\n  -moz-border-radius: 6px 0 6px 6px;\n  border-radius: 6px 0 6px 6px; }\n\n.dropdown .dropdown-menu .nav-header {\n  padding-right: 20px;\n  padding-left: 20px; }\n\n.typeahead {\n  z-index: 1051;\n  margin-top: 2px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #e3e3e3;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05); }\n\n.well blockquote {\n  border-color: #ddd;\n  border-color: rgba(0, 0, 0, 0.15); }\n\n.well-large {\n  padding: 24px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px; }\n\n.well-small {\n  padding: 9px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px; }\n\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -moz-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear; }\n\n.fade.in {\n  opacity: 1; }\n\n.collapse {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition: height 0.35s ease;\n  -moz-transition: height 0.35s ease;\n  -o-transition: height 0.35s ease;\n  transition: height 0.35s ease; }\n\n.collapse.in {\n  height: auto; }\n\n.close {\n  float: right;\n  font-size: 20px;\n  font-weight: bold;\n  line-height: 20px;\n  color: #000000;\n  text-shadow: 0 1px 0 #ffffff;\n  opacity: 0.2;\n  filter: alpha(opacity=20); }\n\n.close:hover,\n.close:focus {\n  color: #000000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: 0.4;\n  filter: alpha(opacity=40); }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.btn {\n  display: inline-block;\n  *display: inline;\n  padding: 4px 12px;\n  margin-bottom: 0;\n  *margin-left: .3em;\n  font-size: 14px;\n  line-height: 20px;\n  color: #333333;\n  text-align: center;\n  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);\n  vertical-align: middle;\n  cursor: pointer;\n  background-color: #f5f5f5;\n  *background-color: #e6e6e6;\n  background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));\n  background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);\n  background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);\n  background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);\n  background-repeat: repeat-x;\n  border: 1px solid #cccccc;\n  *border: 0;\n  border-color: #e6e6e6 #e6e6e6 #bfbfbf;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  border-bottom-color: #b3b3b3;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);\n  *zoom: 1;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); }\n\n.btn:hover,\n.btn:focus,\n.btn:active,\n.btn.active,\n.btn.disabled,\n.btn[disabled] {\n  color: #333333;\n  background-color: #e6e6e6;\n  *background-color: #d9d9d9; }\n\n.btn:active,\n.btn.active {\n  background-color: #cccccc \\9; }\n\n.btn:first-child {\n  *margin-left: 0; }\n\n.btn:hover,\n.btn:focus {\n  color: #333333;\n  text-decoration: none;\n  background-position: 0 -15px;\n  -webkit-transition: background-position 0.1s linear;\n  -moz-transition: background-position 0.1s linear;\n  -o-transition: background-position 0.1s linear;\n  transition: background-position 0.1s linear; }\n\n.btn:focus {\n  outline: thin dotted #333;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px; }\n\n.btn.active,\n.btn:active {\n  background-image: none;\n  outline: 0;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05); }\n\n.btn.disabled,\n.btn[disabled] {\n  cursor: default;\n  background-image: none;\n  opacity: 0.65;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none; }\n\n.btn-large {\n  padding: 11px 19px;\n  font-size: 17.5px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px; }\n\n.btn-large [class^=\"icon-\"],\n.btn-large [class*=\" icon-\"] {\n  margin-top: 4px; }\n\n.btn-small {\n  padding: 2px 10px;\n  font-size: 11.9px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px; }\n\n.btn-small [class^=\"icon-\"],\n.btn-small [class*=\" icon-\"] {\n  margin-top: 0; }\n\n.btn-mini [class^=\"icon-\"],\n.btn-mini [class*=\" icon-\"] {\n  margin-top: -1px; }\n\n.btn-mini {\n  padding: 0 6px;\n  font-size: 10.5px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px; }\n\n.btn-block {\n  display: block;\n  width: 100%;\n  padding-right: 0;\n  padding-left: 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.btn-block + .btn-block {\n  margin-top: 5px; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.btn-primary.active,\n.btn-warning.active,\n.btn-danger.active,\n.btn-success.active,\n.btn-info.active,\n.btn-inverse.active {\n  color: rgba(255, 255, 255, 0.75); }\n\n.btn-primary {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #006dcc;\n  *background-color: #0044cc;\n  background-image: -moz-linear-gradient(top, #0088cc, #0044cc);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0044cc));\n  background-image: -webkit-linear-gradient(top, #0088cc, #0044cc);\n  background-image: -o-linear-gradient(top, #0088cc, #0044cc);\n  background-image: linear-gradient(to bottom, #0088cc, #0044cc);\n  background-repeat: repeat-x;\n  border-color: #0044cc #0044cc #002a80;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0044cc', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.btn-primary:hover,\n.btn-primary:focus,\n.btn-primary:active,\n.btn-primary.active,\n.btn-primary.disabled,\n.btn-primary[disabled] {\n  color: #ffffff;\n  background-color: #0044cc;\n  *background-color: #003bb3; }\n\n.btn-primary:active,\n.btn-primary.active {\n  background-color: #003399 \\9; }\n\n.btn-warning {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #faa732;\n  *background-color: #f89406;\n  background-image: -moz-linear-gradient(top, #fbb450, #f89406);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fbb450), to(#f89406));\n  background-image: -webkit-linear-gradient(top, #fbb450, #f89406);\n  background-image: -o-linear-gradient(top, #fbb450, #f89406);\n  background-image: linear-gradient(to bottom, #fbb450, #f89406);\n  background-repeat: repeat-x;\n  border-color: #f89406 #f89406 #ad6704;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450', endColorstr='#fff89406', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.btn-warning:hover,\n.btn-warning:focus,\n.btn-warning:active,\n.btn-warning.active,\n.btn-warning.disabled,\n.btn-warning[disabled] {\n  color: #ffffff;\n  background-color: #f89406;\n  *background-color: #df8505; }\n\n.btn-warning:active,\n.btn-warning.active {\n  background-color: #c67605 \\9; }\n\n.btn-danger {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #da4f49;\n  *background-color: #bd362f;\n  background-image: -moz-linear-gradient(top, #ee5f5b, #bd362f);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ee5f5b), to(#bd362f));\n  background-image: -webkit-linear-gradient(top, #ee5f5b, #bd362f);\n  background-image: -o-linear-gradient(top, #ee5f5b, #bd362f);\n  background-image: linear-gradient(to bottom, #ee5f5b, #bd362f);\n  background-repeat: repeat-x;\n  border-color: #bd362f #bd362f #802420;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b', endColorstr='#ffbd362f', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.btn-danger:hover,\n.btn-danger:focus,\n.btn-danger:active,\n.btn-danger.active,\n.btn-danger.disabled,\n.btn-danger[disabled] {\n  color: #ffffff;\n  background-color: #bd362f;\n  *background-color: #a9302a; }\n\n.btn-danger:active,\n.btn-danger.active {\n  background-color: #942a25 \\9; }\n\n.btn-success {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #5bb75b;\n  *background-color: #51a351;\n  background-image: -moz-linear-gradient(top, #62c462, #51a351);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#62c462), to(#51a351));\n  background-image: -webkit-linear-gradient(top, #62c462, #51a351);\n  background-image: -o-linear-gradient(top, #62c462, #51a351);\n  background-image: linear-gradient(to bottom, #62c462, #51a351);\n  background-repeat: repeat-x;\n  border-color: #51a351 #51a351 #387038;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462', endColorstr='#ff51a351', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.btn-success:hover,\n.btn-success:focus,\n.btn-success:active,\n.btn-success.active,\n.btn-success.disabled,\n.btn-success[disabled] {\n  color: #ffffff;\n  background-color: #51a351;\n  *background-color: #499249; }\n\n.btn-success:active,\n.btn-success.active {\n  background-color: #408140 \\9; }\n\n.btn-info {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #49afcd;\n  *background-color: #2f96b4;\n  background-image: -moz-linear-gradient(top, #5bc0de, #2f96b4);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#5bc0de), to(#2f96b4));\n  background-image: -webkit-linear-gradient(top, #5bc0de, #2f96b4);\n  background-image: -o-linear-gradient(top, #5bc0de, #2f96b4);\n  background-image: linear-gradient(to bottom, #5bc0de, #2f96b4);\n  background-repeat: repeat-x;\n  border-color: #2f96b4 #2f96b4 #1f6377;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de', endColorstr='#ff2f96b4', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.btn-info:hover,\n.btn-info:focus,\n.btn-info:active,\n.btn-info.active,\n.btn-info.disabled,\n.btn-info[disabled] {\n  color: #ffffff;\n  background-color: #2f96b4;\n  *background-color: #2a85a0; }\n\n.btn-info:active,\n.btn-info.active {\n  background-color: #24748c \\9; }\n\n.btn-inverse {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #363636;\n  *background-color: #222222;\n  background-image: -moz-linear-gradient(top, #444444, #222222);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#444444), to(#222222));\n  background-image: -webkit-linear-gradient(top, #444444, #222222);\n  background-image: -o-linear-gradient(top, #444444, #222222);\n  background-image: linear-gradient(to bottom, #444444, #222222);\n  background-repeat: repeat-x;\n  border-color: #222222 #222222 #000000;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff444444', endColorstr='#ff222222', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.btn-inverse:hover,\n.btn-inverse:focus,\n.btn-inverse:active,\n.btn-inverse.active,\n.btn-inverse.disabled,\n.btn-inverse[disabled] {\n  color: #ffffff;\n  background-color: #222222;\n  *background-color: #151515; }\n\n.btn-inverse:active,\n.btn-inverse.active {\n  background-color: #080808 \\9; }\n\nbutton.btn,\ninput[type=\"submit\"].btn {\n  *padding-top: 3px;\n  *padding-bottom: 3px; }\n\nbutton.btn::-moz-focus-inner,\ninput[type=\"submit\"].btn::-moz-focus-inner {\n  padding: 0;\n  border: 0; }\n\nbutton.btn.btn-large,\ninput[type=\"submit\"].btn.btn-large {\n  *padding-top: 7px;\n  *padding-bottom: 7px; }\n\nbutton.btn.btn-small,\ninput[type=\"submit\"].btn.btn-small {\n  *padding-top: 3px;\n  *padding-bottom: 3px; }\n\nbutton.btn.btn-mini,\ninput[type=\"submit\"].btn.btn-mini {\n  *padding-top: 1px;\n  *padding-bottom: 1px; }\n\n.btn-link,\n.btn-link:active,\n.btn-link[disabled] {\n  background-color: transparent;\n  background-image: none;\n  -webkit-box-shadow: none;\n  -moz-box-shadow: none;\n  box-shadow: none; }\n\n.btn-link {\n  color: #0088cc;\n  cursor: pointer;\n  border-color: transparent;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.btn-link:hover,\n.btn-link:focus {\n  color: #005580;\n  text-decoration: underline;\n  background-color: transparent; }\n\n.btn-link[disabled]:hover,\n.btn-link[disabled]:focus {\n  color: #333333;\n  text-decoration: none; }\n\n.btn-group {\n  position: relative;\n  display: inline-block;\n  *display: inline;\n  *margin-left: .3em;\n  font-size: 0;\n  white-space: nowrap;\n  vertical-align: middle;\n  *zoom: 1; }\n\n.btn-group:first-child {\n  *margin-left: 0; }\n\n.btn-group + .btn-group {\n  margin-left: 5px; }\n\n.btn-toolbar {\n  margin-top: 10px;\n  margin-bottom: 10px;\n  font-size: 0; }\n\n.btn-toolbar > .btn + .btn,\n.btn-toolbar > .btn-group + .btn,\n.btn-toolbar > .btn + .btn-group {\n  margin-left: 5px; }\n\n.btn-group > .btn {\n  position: relative;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.btn-group > .btn + .btn {\n  margin-left: -1px; }\n\n.btn-group > .btn,\n.btn-group > .dropdown-menu,\n.btn-group > .popover {\n  font-size: 14px; }\n\n.btn-group > .btn-mini {\n  font-size: 10.5px; }\n\n.btn-group > .btn-small {\n  font-size: 11.9px; }\n\n.btn-group > .btn-large {\n  font-size: 17.5px; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0;\n  -webkit-border-bottom-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -moz-border-radius-bottomleft: 4px;\n  -moz-border-radius-topleft: 4px; }\n\n.btn-group > .btn:last-child,\n.btn-group > .dropdown-toggle {\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomright: 4px; }\n\n.btn-group > .btn.large:first-child {\n  margin-left: 0;\n  -webkit-border-bottom-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n  -webkit-border-top-left-radius: 6px;\n  border-top-left-radius: 6px;\n  -moz-border-radius-bottomleft: 6px;\n  -moz-border-radius-topleft: 6px; }\n\n.btn-group > .btn.large:last-child,\n.btn-group > .large.dropdown-toggle {\n  -webkit-border-top-right-radius: 6px;\n  border-top-right-radius: 6px;\n  -webkit-border-bottom-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n  -moz-border-radius-topright: 6px;\n  -moz-border-radius-bottomright: 6px; }\n\n.btn-group > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group > .btn:active,\n.btn-group > .btn.active {\n  z-index: 2; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn-group > .btn + .dropdown-toggle {\n  *padding-top: 5px;\n  padding-right: 8px;\n  *padding-bottom: 5px;\n  padding-left: 8px;\n  -webkit-box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.125), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.125), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.125), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05); }\n\n.btn-group > .btn-mini + .dropdown-toggle {\n  *padding-top: 2px;\n  padding-right: 5px;\n  *padding-bottom: 2px;\n  padding-left: 5px; }\n\n.btn-group > .btn-small + .dropdown-toggle {\n  *padding-top: 5px;\n  *padding-bottom: 4px; }\n\n.btn-group > .btn-large + .dropdown-toggle {\n  *padding-top: 7px;\n  padding-right: 12px;\n  *padding-bottom: 7px;\n  padding-left: 12px; }\n\n.btn-group.open .dropdown-toggle {\n  background-image: none;\n  -webkit-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05); }\n\n.btn-group.open .btn.dropdown-toggle {\n  background-color: #e6e6e6; }\n\n.btn-group.open .btn-primary.dropdown-toggle {\n  background-color: #0044cc; }\n\n.btn-group.open .btn-warning.dropdown-toggle {\n  background-color: #f89406; }\n\n.btn-group.open .btn-danger.dropdown-toggle {\n  background-color: #bd362f; }\n\n.btn-group.open .btn-success.dropdown-toggle {\n  background-color: #51a351; }\n\n.btn-group.open .btn-info.dropdown-toggle {\n  background-color: #2f96b4; }\n\n.btn-group.open .btn-inverse.dropdown-toggle {\n  background-color: #222222; }\n\n.btn .caret {\n  margin-top: 8px;\n  margin-left: 0; }\n\n.btn-large .caret {\n  margin-top: 6px; }\n\n.btn-large .caret {\n  border-top-width: 5px;\n  border-right-width: 5px;\n  border-left-width: 5px; }\n\n.btn-mini .caret,\n.btn-small .caret {\n  margin-top: 8px; }\n\n.dropup .btn-large .caret {\n  border-bottom-width: 5px; }\n\n.btn-primary .caret,\n.btn-warning .caret,\n.btn-danger .caret,\n.btn-info .caret,\n.btn-success .caret,\n.btn-inverse .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff; }\n\n.btn-group-vertical {\n  display: inline-block;\n  *display: inline;\n  /* IE7 inline-block hack */\n  *zoom: 1; }\n\n.btn-group-vertical > .btn {\n  display: block;\n  float: none;\n  max-width: 100%;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.btn-group-vertical > .btn + .btn {\n  margin-top: -1px;\n  margin-left: 0; }\n\n.btn-group-vertical > .btn:first-child {\n  -webkit-border-radius: 4px 4px 0 0;\n  -moz-border-radius: 4px 4px 0 0;\n  border-radius: 4px 4px 0 0; }\n\n.btn-group-vertical > .btn:last-child {\n  -webkit-border-radius: 0 0 4px 4px;\n  -moz-border-radius: 0 0 4px 4px;\n  border-radius: 0 0 4px 4px; }\n\n.btn-group-vertical > .btn-large:first-child {\n  -webkit-border-radius: 6px 6px 0 0;\n  -moz-border-radius: 6px 6px 0 0;\n  border-radius: 6px 6px 0 0; }\n\n.btn-group-vertical > .btn-large:last-child {\n  -webkit-border-radius: 0 0 6px 6px;\n  -moz-border-radius: 0 0 6px 6px;\n  border-radius: 0 0 6px 6px; }\n\n.alert {\n  padding: 8px 35px 8px 14px;\n  margin-bottom: 20px;\n  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n  background-color: #fcf8e3;\n  border: 1px solid #fbeed5;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.alert,\n.alert h4 {\n  color: #c09853; }\n\n.alert h4 {\n  margin: 0; }\n\n.alert .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  line-height: 20px; }\n\n.alert-success {\n  color: #468847;\n  background-color: #dff0d8;\n  border-color: #d6e9c6; }\n\n.alert-success h4 {\n  color: #468847; }\n\n.alert-danger,\n.alert-error {\n  color: #b94a48;\n  background-color: #f2dede;\n  border-color: #eed3d7; }\n\n.alert-danger h4,\n.alert-error h4 {\n  color: #b94a48; }\n\n.alert-info {\n  color: #3a87ad;\n  background-color: #d9edf7;\n  border-color: #bce8f1; }\n\n.alert-info h4 {\n  color: #3a87ad; }\n\n.alert-block {\n  padding-top: 14px;\n  padding-bottom: 14px; }\n\n.alert-block > p,\n.alert-block > ul {\n  margin-bottom: 0; }\n\n.alert-block p + p {\n  margin-top: 5px; }\n\n.nav {\n  margin-bottom: 20px;\n  margin-left: 0;\n  list-style: none; }\n\n.nav > li > a {\n  display: block; }\n\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eeeeee; }\n\n.nav > li > a > img {\n  max-width: none; }\n\n.nav > .pull-right {\n  float: right; }\n\n.nav-header {\n  display: block;\n  padding: 3px 15px;\n  font-size: 11px;\n  font-weight: bold;\n  line-height: 20px;\n  color: #999999;\n  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\n  text-transform: uppercase; }\n\n.nav li + .nav-header {\n  margin-top: 9px; }\n\n.nav-list {\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-bottom: 0; }\n\n.nav-list > li > a,\n.nav-list .nav-header {\n  margin-right: -15px;\n  margin-left: -15px;\n  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5); }\n\n.nav-list > li > a {\n  padding: 3px 15px; }\n\n.nav-list > .active > a,\n.nav-list > .active > a:hover,\n.nav-list > .active > a:focus {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.2);\n  background-color: #0088cc; }\n\n.nav-list [class^=\"icon-\"],\n.nav-list [class*=\" icon-\"] {\n  margin-right: 2px; }\n\n.nav-list .divider {\n  *width: 100%;\n  height: 1px;\n  margin: 9px 1px;\n  *margin: -5px 0 5px;\n  overflow: hidden;\n  background-color: #e5e5e5;\n  border-bottom: 1px solid #ffffff; }\n\n.nav-tabs,\n.nav-pills {\n  *zoom: 1; }\n\n.nav-tabs:before,\n.nav-pills:before,\n.nav-tabs:after,\n.nav-pills:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.nav-tabs:after,\n.nav-pills:after {\n  clear: both; }\n\n.nav-tabs > li,\n.nav-pills > li {\n  float: left; }\n\n.nav-tabs > li > a,\n.nav-pills > li > a {\n  padding-right: 12px;\n  padding-left: 12px;\n  margin-right: 2px;\n  line-height: 14px; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n\n.nav-tabs > li {\n  margin-bottom: -1px; }\n\n.nav-tabs > li > a {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  line-height: 20px;\n  border: 1px solid transparent;\n  -webkit-border-radius: 4px 4px 0 0;\n  -moz-border-radius: 4px 4px 0 0;\n  border-radius: 4px 4px 0 0; }\n\n.nav-tabs > li > a:hover,\n.nav-tabs > li > a:focus {\n  border-color: #eeeeee #eeeeee #dddddd; }\n\n.nav-tabs > .active > a,\n.nav-tabs > .active > a:hover,\n.nav-tabs > .active > a:focus {\n  color: #555555;\n  cursor: default;\n  background-color: #ffffff;\n  border: 1px solid #ddd;\n  border-bottom-color: transparent; }\n\n.nav-pills > li > a {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  margin-top: 2px;\n  margin-bottom: 2px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.nav-pills > .active > a,\n.nav-pills > .active > a:hover,\n.nav-pills > .active > a:focus {\n  color: #ffffff;\n  background-color: #0088cc; }\n\n.nav-stacked > li {\n  float: none; }\n\n.nav-stacked > li > a {\n  margin-right: 0; }\n\n.nav-tabs.nav-stacked {\n  border-bottom: 0; }\n\n.nav-tabs.nav-stacked > li > a {\n  border: 1px solid #ddd;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.nav-tabs.nav-stacked > li:first-child > a {\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-topleft: 4px; }\n\n.nav-tabs.nav-stacked > li:last-child > a {\n  -webkit-border-bottom-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  -webkit-border-bottom-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  -moz-border-radius-bottomright: 4px;\n  -moz-border-radius-bottomleft: 4px; }\n\n.nav-tabs.nav-stacked > li > a:hover,\n.nav-tabs.nav-stacked > li > a:focus {\n  z-index: 2;\n  border-color: #ddd; }\n\n.nav-pills.nav-stacked > li > a {\n  margin-bottom: 3px; }\n\n.nav-pills.nav-stacked > li:last-child > a {\n  margin-bottom: 1px; }\n\n.nav-tabs .dropdown-menu {\n  -webkit-border-radius: 0 0 6px 6px;\n  -moz-border-radius: 0 0 6px 6px;\n  border-radius: 0 0 6px 6px; }\n\n.nav-pills .dropdown-menu {\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px; }\n\n.nav .dropdown-toggle .caret {\n  margin-top: 6px;\n  border-top-color: #0088cc;\n  border-bottom-color: #0088cc; }\n\n.nav .dropdown-toggle:hover .caret,\n.nav .dropdown-toggle:focus .caret {\n  border-top-color: #005580;\n  border-bottom-color: #005580; }\n\n/* move down carets for tabs */\n.nav-tabs .dropdown-toggle .caret {\n  margin-top: 8px; }\n\n.nav .active .dropdown-toggle .caret {\n  border-top-color: #fff;\n  border-bottom-color: #fff; }\n\n.nav-tabs .active .dropdown-toggle .caret {\n  border-top-color: #555555;\n  border-bottom-color: #555555; }\n\n.nav > .dropdown.active > a:hover,\n.nav > .dropdown.active > a:focus {\n  cursor: pointer; }\n\n.nav-tabs .open .dropdown-toggle,\n.nav-pills .open .dropdown-toggle,\n.nav > li.dropdown.open.active > a:hover,\n.nav > li.dropdown.open.active > a:focus {\n  color: #ffffff;\n  background-color: #999999;\n  border-color: #999999; }\n\n.nav li.dropdown.open .caret,\n.nav li.dropdown.open.active .caret,\n.nav li.dropdown.open a:hover .caret,\n.nav li.dropdown.open a:focus .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff;\n  opacity: 1;\n  filter: alpha(opacity=100); }\n\n.tabs-stacked .open > a:hover,\n.tabs-stacked .open > a:focus {\n  border-color: #999999; }\n\n.tabbable {\n  *zoom: 1; }\n\n.tabbable:before,\n.tabbable:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.tabbable:after {\n  clear: both; }\n\n.tab-content {\n  overflow: auto; }\n\n.tabs-below > .nav-tabs,\n.tabs-right > .nav-tabs,\n.tabs-left > .nav-tabs {\n  border-bottom: 0; }\n\n.tab-content > .tab-pane,\n.pill-content > .pill-pane {\n  display: none; }\n\n.tab-content > .active,\n.pill-content > .active {\n  display: block; }\n\n.tabs-below > .nav-tabs {\n  border-top: 1px solid #ddd; }\n\n.tabs-below > .nav-tabs > li {\n  margin-top: -1px;\n  margin-bottom: 0; }\n\n.tabs-below > .nav-tabs > li > a {\n  -webkit-border-radius: 0 0 4px 4px;\n  -moz-border-radius: 0 0 4px 4px;\n  border-radius: 0 0 4px 4px; }\n\n.tabs-below > .nav-tabs > li > a:hover,\n.tabs-below > .nav-tabs > li > a:focus {\n  border-top-color: #ddd;\n  border-bottom-color: transparent; }\n\n.tabs-below > .nav-tabs > .active > a,\n.tabs-below > .nav-tabs > .active > a:hover,\n.tabs-below > .nav-tabs > .active > a:focus {\n  border-color: transparent #ddd #ddd #ddd; }\n\n.tabs-left > .nav-tabs > li,\n.tabs-right > .nav-tabs > li {\n  float: none; }\n\n.tabs-left > .nav-tabs > li > a,\n.tabs-right > .nav-tabs > li > a {\n  min-width: 74px;\n  margin-right: 0;\n  margin-bottom: 3px; }\n\n.tabs-left > .nav-tabs {\n  float: left;\n  margin-right: 19px;\n  border-right: 1px solid #ddd; }\n\n.tabs-left > .nav-tabs > li > a {\n  margin-right: -1px;\n  -webkit-border-radius: 4px 0 0 4px;\n  -moz-border-radius: 4px 0 0 4px;\n  border-radius: 4px 0 0 4px; }\n\n.tabs-left > .nav-tabs > li > a:hover,\n.tabs-left > .nav-tabs > li > a:focus {\n  border-color: #eeeeee #dddddd #eeeeee #eeeeee; }\n\n.tabs-left > .nav-tabs .active > a,\n.tabs-left > .nav-tabs .active > a:hover,\n.tabs-left > .nav-tabs .active > a:focus {\n  border-color: #ddd transparent #ddd #ddd;\n  *border-right-color: #ffffff; }\n\n.tabs-right > .nav-tabs {\n  float: right;\n  margin-left: 19px;\n  border-left: 1px solid #ddd; }\n\n.tabs-right > .nav-tabs > li > a {\n  margin-left: -1px;\n  -webkit-border-radius: 0 4px 4px 0;\n  -moz-border-radius: 0 4px 4px 0;\n  border-radius: 0 4px 4px 0; }\n\n.tabs-right > .nav-tabs > li > a:hover,\n.tabs-right > .nav-tabs > li > a:focus {\n  border-color: #eeeeee #eeeeee #eeeeee #dddddd; }\n\n.tabs-right > .nav-tabs .active > a,\n.tabs-right > .nav-tabs .active > a:hover,\n.tabs-right > .nav-tabs .active > a:focus {\n  border-color: #ddd #ddd #ddd transparent;\n  *border-left-color: #ffffff; }\n\n.nav > .disabled > a {\n  color: #999999; }\n\n.nav > .disabled > a:hover,\n.nav > .disabled > a:focus {\n  text-decoration: none;\n  cursor: default;\n  background-color: transparent; }\n\n.navbar {\n  *position: relative;\n  *z-index: 2;\n  margin-bottom: 20px;\n  overflow: visible; }\n\n.navbar-inner {\n  min-height: 40px;\n  padding-right: 20px;\n  padding-left: 20px;\n  background-color: #fafafa;\n  background-image: -moz-linear-gradient(top, #ffffff, #f2f2f2);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#f2f2f2));\n  background-image: -webkit-linear-gradient(top, #ffffff, #f2f2f2);\n  background-image: -o-linear-gradient(top, #ffffff, #f2f2f2);\n  background-image: linear-gradient(to bottom, #ffffff, #f2f2f2);\n  background-repeat: repeat-x;\n  border: 1px solid #d4d4d4;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#fff2f2f2', GradientType=0);\n  *zoom: 1;\n  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);\n  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065); }\n\n.navbar-inner:before,\n.navbar-inner:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.navbar-inner:after {\n  clear: both; }\n\n.navbar .container {\n  width: auto; }\n\n.nav-collapse.collapse {\n  height: auto;\n  overflow: visible; }\n\n.navbar .brand {\n  display: block;\n  float: left;\n  padding: 10px 20px 10px;\n  margin-left: -20px;\n  font-size: 20px;\n  font-weight: 200;\n  color: #777777;\n  text-shadow: 0 1px 0 #ffffff; }\n\n.navbar .brand:hover,\n.navbar .brand:focus {\n  text-decoration: none; }\n\n.navbar-text {\n  margin-bottom: 0;\n  line-height: 40px;\n  color: #777777; }\n\n.navbar-link {\n  color: #777777; }\n\n.navbar-link:hover,\n.navbar-link:focus {\n  color: #333333; }\n\n.navbar .divider-vertical {\n  height: 40px;\n  margin: 0 9px;\n  border-right: 1px solid #ffffff;\n  border-left: 1px solid #f2f2f2; }\n\n.navbar .btn,\n.navbar .btn-group {\n  margin-top: 5px; }\n\n.navbar .btn-group .btn,\n.navbar .input-prepend .btn,\n.navbar .input-append .btn,\n.navbar .input-prepend .btn-group,\n.navbar .input-append .btn-group {\n  margin-top: 0; }\n\n.navbar-form {\n  margin-bottom: 0;\n  *zoom: 1; }\n\n.navbar-form:before,\n.navbar-form:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.navbar-form:after {\n  clear: both; }\n\n.navbar-form input,\n.navbar-form select,\n.navbar-form .radio,\n.navbar-form .checkbox {\n  margin-top: 5px; }\n\n.navbar-form input,\n.navbar-form select,\n.navbar-form .btn {\n  display: inline-block;\n  margin-bottom: 0; }\n\n.navbar-form input[type=\"image\"],\n.navbar-form input[type=\"checkbox\"],\n.navbar-form input[type=\"radio\"] {\n  margin-top: 3px; }\n\n.navbar-form .input-append,\n.navbar-form .input-prepend {\n  margin-top: 5px;\n  white-space: nowrap; }\n\n.navbar-form .input-append input,\n.navbar-form .input-prepend input {\n  margin-top: 0; }\n\n.navbar-search {\n  position: relative;\n  float: left;\n  margin-top: 5px;\n  margin-bottom: 0; }\n\n.navbar-search .search-query {\n  padding: 4px 14px;\n  margin-bottom: 0;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 13px;\n  font-weight: normal;\n  line-height: 1;\n  -webkit-border-radius: 15px;\n  -moz-border-radius: 15px;\n  border-radius: 15px; }\n\n.navbar-static-top {\n  position: static;\n  margin-bottom: 0; }\n\n.navbar-static-top .navbar-inner {\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n  margin-bottom: 0; }\n\n.navbar-fixed-top .navbar-inner,\n.navbar-static-top .navbar-inner {\n  border-width: 0 0 1px; }\n\n.navbar-fixed-bottom .navbar-inner {\n  border-width: 1px 0 0; }\n\n.navbar-fixed-top .navbar-inner,\n.navbar-fixed-bottom .navbar-inner {\n  padding-right: 0;\n  padding-left: 0;\n  -webkit-border-radius: 0;\n  -moz-border-radius: 0;\n  border-radius: 0; }\n\n.navbar-static-top .container,\n.navbar-fixed-top .container,\n.navbar-fixed-bottom .container {\n  width: 940px; }\n\n.navbar-fixed-top {\n  top: 0; }\n\n.navbar-fixed-top .navbar-inner,\n.navbar-static-top .navbar-inner {\n  -webkit-box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1); }\n\n.navbar-fixed-bottom {\n  bottom: 0; }\n\n.navbar-fixed-bottom .navbar-inner {\n  -webkit-box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1); }\n\n.navbar .nav {\n  position: relative;\n  left: 0;\n  display: block;\n  float: left;\n  margin: 0 10px 0 0; }\n\n.navbar .nav.pull-right {\n  float: right;\n  margin-right: 0; }\n\n.navbar .nav > li {\n  float: left; }\n\n.navbar .nav > li > a {\n  float: none;\n  padding: 10px 15px 10px;\n  color: #777777;\n  text-decoration: none;\n  text-shadow: 0 1px 0 #ffffff; }\n\n.navbar .nav .dropdown-toggle .caret {\n  margin-top: 8px; }\n\n.navbar .nav > li > a:focus,\n.navbar .nav > li > a:hover {\n  color: #333333;\n  text-decoration: none;\n  background-color: transparent; }\n\n.navbar .nav > .active > a,\n.navbar .nav > .active > a:hover,\n.navbar .nav > .active > a:focus {\n  color: #555555;\n  text-decoration: none;\n  background-color: #e5e5e5;\n  -webkit-box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.125);\n  -moz-box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.125);\n  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.125); }\n\n.navbar .btn-navbar {\n  display: none;\n  float: right;\n  padding: 7px 10px;\n  margin-right: 5px;\n  margin-left: 5px;\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #ededed;\n  *background-color: #e5e5e5;\n  background-image: -moz-linear-gradient(top, #f2f2f2, #e5e5e5);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#f2f2f2), to(#e5e5e5));\n  background-image: -webkit-linear-gradient(top, #f2f2f2, #e5e5e5);\n  background-image: -o-linear-gradient(top, #f2f2f2, #e5e5e5);\n  background-image: linear-gradient(to bottom, #f2f2f2, #e5e5e5);\n  background-repeat: repeat-x;\n  border-color: #e5e5e5 #e5e5e5 #bfbfbf;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff2f2f2', endColorstr='#ffe5e5e5', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.075);\n  -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.075);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.075); }\n\n.navbar .btn-navbar:hover,\n.navbar .btn-navbar:focus,\n.navbar .btn-navbar:active,\n.navbar .btn-navbar.active,\n.navbar .btn-navbar.disabled,\n.navbar .btn-navbar[disabled] {\n  color: #ffffff;\n  background-color: #e5e5e5;\n  *background-color: #d9d9d9; }\n\n.navbar .btn-navbar:active,\n.navbar .btn-navbar.active {\n  background-color: #cccccc \\9; }\n\n.navbar .btn-navbar .icon-bar {\n  display: block;\n  width: 18px;\n  height: 2px;\n  background-color: #f5f5f5;\n  -webkit-border-radius: 1px;\n  -moz-border-radius: 1px;\n  border-radius: 1px;\n  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);\n  -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);\n  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25); }\n\n.btn-navbar .icon-bar + .icon-bar {\n  margin-top: 3px; }\n\n.navbar .nav > li > .dropdown-menu:before {\n  position: absolute;\n  top: -7px;\n  left: 9px;\n  display: inline-block;\n  border-right: 7px solid transparent;\n  border-bottom: 7px solid #ccc;\n  border-left: 7px solid transparent;\n  border-bottom-color: rgba(0, 0, 0, 0.2);\n  content: ''; }\n\n.navbar .nav > li > .dropdown-menu:after {\n  position: absolute;\n  top: -6px;\n  left: 10px;\n  display: inline-block;\n  border-right: 6px solid transparent;\n  border-bottom: 6px solid #ffffff;\n  border-left: 6px solid transparent;\n  content: ''; }\n\n.navbar-fixed-bottom .nav > li > .dropdown-menu:before {\n  top: auto;\n  bottom: -7px;\n  border-top: 7px solid #ccc;\n  border-bottom: 0;\n  border-top-color: rgba(0, 0, 0, 0.2); }\n\n.navbar-fixed-bottom .nav > li > .dropdown-menu:after {\n  top: auto;\n  bottom: -6px;\n  border-top: 6px solid #ffffff;\n  border-bottom: 0; }\n\n.navbar .nav li.dropdown > a:hover .caret,\n.navbar .nav li.dropdown > a:focus .caret {\n  border-top-color: #333333;\n  border-bottom-color: #333333; }\n\n.navbar .nav li.dropdown.open > .dropdown-toggle,\n.navbar .nav li.dropdown.active > .dropdown-toggle,\n.navbar .nav li.dropdown.open.active > .dropdown-toggle {\n  color: #555555;\n  background-color: #e5e5e5; }\n\n.navbar .nav li.dropdown > .dropdown-toggle .caret {\n  border-top-color: #777777;\n  border-bottom-color: #777777; }\n\n.navbar .nav li.dropdown.open > .dropdown-toggle .caret,\n.navbar .nav li.dropdown.active > .dropdown-toggle .caret,\n.navbar .nav li.dropdown.open.active > .dropdown-toggle .caret {\n  border-top-color: #555555;\n  border-bottom-color: #555555; }\n\n.navbar .pull-right > li > .dropdown-menu,\n.navbar .nav > li > .dropdown-menu.pull-right {\n  right: 0;\n  left: auto; }\n\n.navbar .pull-right > li > .dropdown-menu:before,\n.navbar .nav > li > .dropdown-menu.pull-right:before {\n  right: 12px;\n  left: auto; }\n\n.navbar .pull-right > li > .dropdown-menu:after,\n.navbar .nav > li > .dropdown-menu.pull-right:after {\n  right: 13px;\n  left: auto; }\n\n.navbar .pull-right > li > .dropdown-menu .dropdown-menu,\n.navbar .nav > li > .dropdown-menu.pull-right .dropdown-menu {\n  right: 100%;\n  left: auto;\n  margin-right: -1px;\n  margin-left: 0;\n  -webkit-border-radius: 6px 0 6px 6px;\n  -moz-border-radius: 6px 0 6px 6px;\n  border-radius: 6px 0 6px 6px; }\n\n.navbar-inverse .navbar-inner {\n  background-color: #1b1b1b;\n  background-image: -moz-linear-gradient(top, #222222, #111111);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#222222), to(#111111));\n  background-image: -webkit-linear-gradient(top, #222222, #111111);\n  background-image: -o-linear-gradient(top, #222222, #111111);\n  background-image: linear-gradient(to bottom, #222222, #111111);\n  background-repeat: repeat-x;\n  border-color: #252525;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff222222', endColorstr='#ff111111', GradientType=0); }\n\n.navbar-inverse .brand,\n.navbar-inverse .nav > li > a {\n  color: #999999;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }\n\n.navbar-inverse .brand:hover,\n.navbar-inverse .nav > li > a:hover,\n.navbar-inverse .brand:focus,\n.navbar-inverse .nav > li > a:focus {\n  color: #ffffff; }\n\n.navbar-inverse .brand {\n  color: #999999; }\n\n.navbar-inverse .navbar-text {\n  color: #999999; }\n\n.navbar-inverse .nav > li > a:focus,\n.navbar-inverse .nav > li > a:hover {\n  color: #ffffff;\n  background-color: transparent; }\n\n.navbar-inverse .nav .active > a,\n.navbar-inverse .nav .active > a:hover,\n.navbar-inverse .nav .active > a:focus {\n  color: #ffffff;\n  background-color: #111111; }\n\n.navbar-inverse .navbar-link {\n  color: #999999; }\n\n.navbar-inverse .navbar-link:hover,\n.navbar-inverse .navbar-link:focus {\n  color: #ffffff; }\n\n.navbar-inverse .divider-vertical {\n  border-right-color: #222222;\n  border-left-color: #111111; }\n\n.navbar-inverse .nav li.dropdown.open > .dropdown-toggle,\n.navbar-inverse .nav li.dropdown.active > .dropdown-toggle,\n.navbar-inverse .nav li.dropdown.open.active > .dropdown-toggle {\n  color: #ffffff;\n  background-color: #111111; }\n\n.navbar-inverse .nav li.dropdown > a:hover .caret,\n.navbar-inverse .nav li.dropdown > a:focus .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff; }\n\n.navbar-inverse .nav li.dropdown > .dropdown-toggle .caret {\n  border-top-color: #999999;\n  border-bottom-color: #999999; }\n\n.navbar-inverse .nav li.dropdown.open > .dropdown-toggle .caret,\n.navbar-inverse .nav li.dropdown.active > .dropdown-toggle .caret,\n.navbar-inverse .nav li.dropdown.open.active > .dropdown-toggle .caret {\n  border-top-color: #ffffff;\n  border-bottom-color: #ffffff; }\n\n.navbar-inverse .navbar-search .search-query {\n  color: #ffffff;\n  background-color: #515151;\n  border-color: #111111;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.15);\n  -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.15);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(255, 255, 255, 0.15);\n  -webkit-transition: none;\n  -moz-transition: none;\n  -o-transition: none;\n  transition: none; }\n\n.navbar-inverse .navbar-search .search-query:-moz-placeholder {\n  color: #cccccc; }\n\n.navbar-inverse .navbar-search .search-query:-ms-input-placeholder {\n  color: #cccccc; }\n\n.navbar-inverse .navbar-search .search-query::-webkit-input-placeholder {\n  color: #cccccc; }\n\n.navbar-inverse .navbar-search .search-query:focus,\n.navbar-inverse .navbar-search .search-query.focused {\n  padding: 5px 15px;\n  color: #333333;\n  text-shadow: 0 1px 0 #ffffff;\n  background-color: #ffffff;\n  border: 0;\n  outline: 0;\n  -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);\n  -moz-box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);\n  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15); }\n\n.navbar-inverse .btn-navbar {\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #0e0e0e;\n  *background-color: #040404;\n  background-image: -moz-linear-gradient(top, #151515, #040404);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#151515), to(#040404));\n  background-image: -webkit-linear-gradient(top, #151515, #040404);\n  background-image: -o-linear-gradient(top, #151515, #040404);\n  background-image: linear-gradient(to bottom, #151515, #040404);\n  background-repeat: repeat-x;\n  border-color: #040404 #040404 #000000;\n  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff151515', endColorstr='#ff040404', GradientType=0);\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false); }\n\n.navbar-inverse .btn-navbar:hover,\n.navbar-inverse .btn-navbar:focus,\n.navbar-inverse .btn-navbar:active,\n.navbar-inverse .btn-navbar.active,\n.navbar-inverse .btn-navbar.disabled,\n.navbar-inverse .btn-navbar[disabled] {\n  color: #ffffff;\n  background-color: #040404;\n  *background-color: #000000; }\n\n.navbar-inverse .btn-navbar:active,\n.navbar-inverse .btn-navbar.active {\n  background-color: #000000 \\9; }\n\n.breadcrumb {\n  padding: 8px 15px;\n  margin: 0 0 20px;\n  list-style: none;\n  background-color: #f5f5f5;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.breadcrumb > li {\n  display: inline-block;\n  *display: inline;\n  text-shadow: 0 1px 0 #ffffff;\n  *zoom: 1; }\n\n.breadcrumb > li > .divider {\n  padding: 0 5px;\n  color: #ccc; }\n\n.breadcrumb > .active {\n  color: #999999; }\n\n.pagination {\n  margin: 20px 0; }\n\n.pagination ul {\n  display: inline-block;\n  *display: inline;\n  margin-bottom: 0;\n  margin-left: 0;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  *zoom: 1;\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }\n\n.pagination ul > li {\n  display: inline; }\n\n.pagination ul > li > a,\n.pagination ul > li > span {\n  float: left;\n  padding: 4px 12px;\n  line-height: 20px;\n  text-decoration: none;\n  background-color: #ffffff;\n  border: 1px solid #dddddd;\n  border-left-width: 0; }\n\n.pagination ul > li > a:hover,\n.pagination ul > li > a:focus,\n.pagination ul > .active > a,\n.pagination ul > .active > span {\n  background-color: #f5f5f5; }\n\n.pagination ul > .active > a,\n.pagination ul > .active > span {\n  color: #999999;\n  cursor: default; }\n\n.pagination ul > .disabled > span,\n.pagination ul > .disabled > a,\n.pagination ul > .disabled > a:hover,\n.pagination ul > .disabled > a:focus {\n  color: #999999;\n  cursor: default;\n  background-color: transparent; }\n\n.pagination ul > li:first-child > a,\n.pagination ul > li:first-child > span {\n  border-left-width: 1px;\n  -webkit-border-bottom-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -moz-border-radius-bottomleft: 4px;\n  -moz-border-radius-topleft: 4px; }\n\n.pagination ul > li:last-child > a,\n.pagination ul > li:last-child > span {\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  -moz-border-radius-topright: 4px;\n  -moz-border-radius-bottomright: 4px; }\n\n.pagination-centered {\n  text-align: center; }\n\n.pagination-right {\n  text-align: right; }\n\n.pagination-large ul > li > a,\n.pagination-large ul > li > span {\n  padding: 11px 19px;\n  font-size: 17.5px; }\n\n.pagination-large ul > li:first-child > a,\n.pagination-large ul > li:first-child > span {\n  -webkit-border-bottom-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n  -webkit-border-top-left-radius: 6px;\n  border-top-left-radius: 6px;\n  -moz-border-radius-bottomleft: 6px;\n  -moz-border-radius-topleft: 6px; }\n\n.pagination-large ul > li:last-child > a,\n.pagination-large ul > li:last-child > span {\n  -webkit-border-top-right-radius: 6px;\n  border-top-right-radius: 6px;\n  -webkit-border-bottom-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n  -moz-border-radius-topright: 6px;\n  -moz-border-radius-bottomright: 6px; }\n\n.pagination-mini ul > li:first-child > a,\n.pagination-small ul > li:first-child > a,\n.pagination-mini ul > li:first-child > span,\n.pagination-small ul > li:first-child > span {\n  -webkit-border-bottom-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n  -webkit-border-top-left-radius: 3px;\n  border-top-left-radius: 3px;\n  -moz-border-radius-bottomleft: 3px;\n  -moz-border-radius-topleft: 3px; }\n\n.pagination-mini ul > li:last-child > a,\n.pagination-small ul > li:last-child > a,\n.pagination-mini ul > li:last-child > span,\n.pagination-small ul > li:last-child > span {\n  -webkit-border-top-right-radius: 3px;\n  border-top-right-radius: 3px;\n  -webkit-border-bottom-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n  -moz-border-radius-topright: 3px;\n  -moz-border-radius-bottomright: 3px; }\n\n.pagination-small ul > li > a,\n.pagination-small ul > li > span {\n  padding: 2px 10px;\n  font-size: 11.9px; }\n\n.pagination-mini ul > li > a,\n.pagination-mini ul > li > span {\n  padding: 0 6px;\n  font-size: 10.5px; }\n\n.pager {\n  margin: 20px 0;\n  text-align: center;\n  list-style: none;\n  *zoom: 1; }\n\n.pager:before,\n.pager:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.pager:after {\n  clear: both; }\n\n.pager li {\n  display: inline; }\n\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  -webkit-border-radius: 15px;\n  -moz-border-radius: 15px;\n  border-radius: 15px; }\n\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #f5f5f5; }\n\n.pager .next > a,\n.pager .next > span {\n  float: right; }\n\n.pager .previous > a,\n.pager .previous > span {\n  float: left; }\n\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #999999;\n  cursor: default;\n  background-color: #fff; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000000; }\n\n.modal-backdrop.fade {\n  opacity: 0; }\n\n.modal-backdrop,\n.modal-backdrop.fade.in {\n  opacity: 0.8;\n  filter: alpha(opacity=80); }\n\n.modal {\n  position: fixed;\n  top: 10%;\n  left: 50%;\n  z-index: 1050;\n  width: 560px;\n  margin-left: -280px;\n  background-color: #ffffff;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, 0.3);\n  *border: 1px solid #999;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n  outline: none;\n  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);\n  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);\n  -webkit-background-clip: padding-box;\n  -moz-background-clip: padding-box;\n  background-clip: padding-box; }\n\n.modal.fade {\n  top: -25%;\n  -webkit-transition: opacity 0.3s linear, top 0.3s ease-out;\n  -moz-transition: opacity 0.3s linear, top 0.3s ease-out;\n  -o-transition: opacity 0.3s linear, top 0.3s ease-out;\n  transition: opacity 0.3s linear, top 0.3s ease-out; }\n\n.modal.fade.in {\n  top: 10%; }\n\n.modal-header {\n  padding: 9px 15px;\n  border-bottom: 1px solid #eee; }\n\n.modal-header .close {\n  margin-top: 2px; }\n\n.modal-header h3 {\n  margin: 0;\n  line-height: 30px; }\n\n.modal-body {\n  position: relative;\n  max-height: 400px;\n  padding: 15px;\n  overflow-y: auto; }\n\n.modal-form {\n  margin-bottom: 0; }\n\n.modal-footer {\n  padding: 14px 15px 15px;\n  margin-bottom: 0;\n  text-align: right;\n  background-color: #f5f5f5;\n  border-top: 1px solid #ddd;\n  -webkit-border-radius: 0 0 6px 6px;\n  -moz-border-radius: 0 0 6px 6px;\n  border-radius: 0 0 6px 6px;\n  *zoom: 1;\n  -webkit-box-shadow: inset 0 1px 0 #ffffff;\n  -moz-box-shadow: inset 0 1px 0 #ffffff;\n  box-shadow: inset 0 1px 0 #ffffff; }\n\n.modal-footer:before,\n.modal-footer:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.modal-footer:after {\n  clear: both; }\n\n.modal-footer .btn + .btn {\n  margin-bottom: 0;\n  margin-left: 5px; }\n\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px; }\n\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0; }\n\n.tooltip {\n  position: absolute;\n  z-index: 1030;\n  display: block;\n  font-size: 11px;\n  line-height: 1.4;\n  opacity: 0;\n  filter: alpha(opacity=0);\n  visibility: visible; }\n\n.tooltip.in {\n  opacity: 0.8;\n  filter: alpha(opacity=80); }\n\n.tooltip.top {\n  padding: 5px 0;\n  margin-top: -3px; }\n\n.tooltip.right {\n  padding: 0 5px;\n  margin-left: 3px; }\n\n.tooltip.bottom {\n  padding: 5px 0;\n  margin-top: 3px; }\n\n.tooltip.left {\n  padding: 0 5px;\n  margin-left: -3px; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 8px;\n  color: #ffffff;\n  text-align: center;\n  text-decoration: none;\n  background-color: #000000;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-top-color: #000000;\n  border-width: 5px 5px 0; }\n\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-right-color: #000000;\n  border-width: 5px 5px 5px 0; }\n\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-left-color: #000000;\n  border-width: 5px 0 5px 5px; }\n\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-bottom-color: #000000;\n  border-width: 0 5px 5px; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1010;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  text-align: left;\n  white-space: normal;\n  background-color: #ffffff;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  -webkit-background-clip: padding-box;\n  -moz-background-clip: padding;\n  background-clip: padding-box; }\n\n.popover.top {\n  margin-top: -10px; }\n\n.popover.right {\n  margin-left: 10px; }\n\n.popover.bottom {\n  margin-top: 10px; }\n\n.popover.left {\n  margin-left: -10px; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin: 0;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 18px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  -webkit-border-radius: 5px 5px 0 0;\n  -moz-border-radius: 5px 5px 0 0;\n  border-radius: 5px 5px 0 0; }\n\n.popover-title:empty {\n  display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover .arrow,\n.popover .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover .arrow {\n  border-width: 11px; }\n\n.popover .arrow:after {\n  border-width: 10px;\n  content: \"\"; }\n\n.popover.top .arrow {\n  bottom: -11px;\n  left: 50%;\n  margin-left: -11px;\n  border-top-color: #999;\n  border-top-color: rgba(0, 0, 0, 0.25);\n  border-bottom-width: 0; }\n\n.popover.top .arrow:after {\n  bottom: 1px;\n  margin-left: -10px;\n  border-top-color: #ffffff;\n  border-bottom-width: 0; }\n\n.popover.right .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-right-color: #999;\n  border-right-color: rgba(0, 0, 0, 0.25);\n  border-left-width: 0; }\n\n.popover.right .arrow:after {\n  bottom: -10px;\n  left: 1px;\n  border-right-color: #ffffff;\n  border-left-width: 0; }\n\n.popover.bottom .arrow {\n  top: -11px;\n  left: 50%;\n  margin-left: -11px;\n  border-bottom-color: #999;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n  border-top-width: 0; }\n\n.popover.bottom .arrow:after {\n  top: 1px;\n  margin-left: -10px;\n  border-bottom-color: #ffffff;\n  border-top-width: 0; }\n\n.popover.left .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-left-color: #999;\n  border-left-color: rgba(0, 0, 0, 0.25);\n  border-right-width: 0; }\n\n.popover.left .arrow:after {\n  right: 1px;\n  bottom: -10px;\n  border-left-color: #ffffff;\n  border-right-width: 0; }\n\n.thumbnails {\n  margin-left: -20px;\n  list-style: none;\n  *zoom: 1; }\n\n.thumbnails:before,\n.thumbnails:after {\n  display: table;\n  line-height: 0;\n  content: \"\"; }\n\n.thumbnails:after {\n  clear: both; }\n\n.row-fluid .thumbnails {\n  margin-left: 0; }\n\n.thumbnails > li {\n  float: left;\n  margin-bottom: 20px;\n  margin-left: 20px; }\n\n.thumbnail {\n  display: block;\n  padding: 4px;\n  line-height: 20px;\n  border: 1px solid #ddd;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);\n  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);\n  -webkit-transition: all 0.2s ease-in-out;\n  -moz-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out; }\n\na.thumbnail:hover,\na.thumbnail:focus {\n  border-color: #0088cc;\n  -webkit-box-shadow: 0 1px 4px rgba(0, 105, 214, 0.25);\n  -moz-box-shadow: 0 1px 4px rgba(0, 105, 214, 0.25);\n  box-shadow: 0 1px 4px rgba(0, 105, 214, 0.25); }\n\n.thumbnail > img {\n  display: block;\n  max-width: 100%;\n  margin-right: auto;\n  margin-left: auto; }\n\n.thumbnail .caption {\n  padding: 9px;\n  color: #555555; }\n\n.media,\n.media-body {\n  overflow: hidden;\n  *overflow: visible;\n  zoom: 1; }\n\n.media,\n.media .media {\n  margin-top: 15px; }\n\n.media:first-child {\n  margin-top: 0; }\n\n.media-object {\n  display: block; }\n\n.media-heading {\n  margin: 0 0 5px; }\n\n.media > .pull-left {\n  margin-right: 10px; }\n\n.media > .pull-right {\n  margin-left: 10px; }\n\n.media-list {\n  margin-left: 0;\n  list-style: none; }\n\n.label,\n.badge {\n  display: inline-block;\n  padding: 2px 4px;\n  font-size: 11.844px;\n  font-weight: bold;\n  line-height: 14px;\n  color: #ffffff;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  white-space: nowrap;\n  vertical-align: baseline;\n  background-color: #999999; }\n\n.label {\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px; }\n\n.badge {\n  padding-right: 9px;\n  padding-left: 9px;\n  -webkit-border-radius: 9px;\n  -moz-border-radius: 9px;\n  border-radius: 9px; }\n\n.label:empty,\n.badge:empty {\n  display: none; }\n\na.label:hover,\na.label:focus,\na.badge:hover,\na.badge:focus {\n  color: #ffffff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.label-important,\n.badge-important {\n  background-color: #b94a48; }\n\n.label-important[href],\n.badge-important[href] {\n  background-color: #953b39; }\n\n.label-warning,\n.badge-warning {\n  background-color: #f89406; }\n\n.label-warning[href],\n.badge-warning[href] {\n  background-color: #c67605; }\n\n.label-success,\n.badge-success {\n  background-color: #468847; }\n\n.label-success[href],\n.badge-success[href] {\n  background-color: #356635; }\n\n.label-info,\n.badge-info {\n  background-color: #3a87ad; }\n\n.label-info[href],\n.badge-info[href] {\n  background-color: #2d6987; }\n\n.label-inverse,\n.badge-inverse {\n  background-color: #333333; }\n\n.label-inverse[href],\n.badge-inverse[href] {\n  background-color: #1a1a1a; }\n\n.btn .label,\n.btn .badge {\n  position: relative;\n  top: -1px; }\n\n.btn-mini .label,\n.btn-mini .badge {\n  top: 0; }\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@-moz-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@-ms-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n@-o-keyframes progress-bar-stripes {\n  from {\n    background-position: 0 0; }\n  to {\n    background-position: 40px 0; } }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  height: 20px;\n  margin-bottom: 20px;\n  overflow: hidden;\n  background-color: #f7f7f7;\n  background-image: -moz-linear-gradient(top, #f5f5f5, #f9f9f9);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#f9f9f9));\n  background-image: -webkit-linear-gradient(top, #f5f5f5, #f9f9f9);\n  background-image: -o-linear-gradient(top, #f5f5f5, #f9f9f9);\n  background-image: linear-gradient(to bottom, #f5f5f5, #f9f9f9);\n  background-repeat: repeat-x;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff5f5f5', endColorstr='#fff9f9f9', GradientType=0);\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); }\n\n.progress .bar {\n  float: left;\n  width: 0;\n  height: 100%;\n  font-size: 12px;\n  color: #ffffff;\n  text-align: center;\n  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\n  background-color: #0e90d2;\n  background-image: -moz-linear-gradient(top, #149bdf, #0480be);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#149bdf), to(#0480be));\n  background-image: -webkit-linear-gradient(top, #149bdf, #0480be);\n  background-image: -o-linear-gradient(top, #149bdf, #0480be);\n  background-image: linear-gradient(to bottom, #149bdf, #0480be);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff149bdf', endColorstr='#ff0480be', GradientType=0);\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -moz-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-transition: width 0.6s ease;\n  -moz-transition: width 0.6s ease;\n  -o-transition: width 0.6s ease;\n  transition: width 0.6s ease; }\n\n.progress .bar + .bar {\n  -webkit-box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  -moz-box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.15);\n  box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.15), inset 0 -1px 0 rgba(0, 0, 0, 0.15); }\n\n.progress-striped .bar {\n  background-color: #149bdf;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  -webkit-background-size: 40px 40px;\n  -moz-background-size: 40px 40px;\n  -o-background-size: 40px 40px;\n  background-size: 40px 40px; }\n\n.progress.active .bar {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n  -moz-animation: progress-bar-stripes 2s linear infinite;\n  -ms-animation: progress-bar-stripes 2s linear infinite;\n  -o-animation: progress-bar-stripes 2s linear infinite;\n  animation: progress-bar-stripes 2s linear infinite; }\n\n.progress-danger .bar,\n.progress .bar-danger {\n  background-color: #dd514c;\n  background-image: -moz-linear-gradient(top, #ee5f5b, #c43c35);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ee5f5b), to(#c43c35));\n  background-image: -webkit-linear-gradient(top, #ee5f5b, #c43c35);\n  background-image: -o-linear-gradient(top, #ee5f5b, #c43c35);\n  background-image: linear-gradient(to bottom, #ee5f5b, #c43c35);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b', endColorstr='#ffc43c35', GradientType=0); }\n\n.progress-danger.progress-striped .bar,\n.progress-striped .bar-danger {\n  background-color: #ee5f5b;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-success .bar,\n.progress .bar-success {\n  background-color: #5eb95e;\n  background-image: -moz-linear-gradient(top, #62c462, #57a957);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#62c462), to(#57a957));\n  background-image: -webkit-linear-gradient(top, #62c462, #57a957);\n  background-image: -o-linear-gradient(top, #62c462, #57a957);\n  background-image: linear-gradient(to bottom, #62c462, #57a957);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462', endColorstr='#ff57a957', GradientType=0); }\n\n.progress-success.progress-striped .bar,\n.progress-striped .bar-success {\n  background-color: #62c462;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-info .bar,\n.progress .bar-info {\n  background-color: #4bb1cf;\n  background-image: -moz-linear-gradient(top, #5bc0de, #339bb9);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#5bc0de), to(#339bb9));\n  background-image: -webkit-linear-gradient(top, #5bc0de, #339bb9);\n  background-image: -o-linear-gradient(top, #5bc0de, #339bb9);\n  background-image: linear-gradient(to bottom, #5bc0de, #339bb9);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff5bc0de', endColorstr='#ff339bb9', GradientType=0); }\n\n.progress-info.progress-striped .bar,\n.progress-striped .bar-info {\n  background-color: #5bc0de;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.progress-warning .bar,\n.progress .bar-warning {\n  background-color: #faa732;\n  background-image: -moz-linear-gradient(top, #fbb450, #f89406);\n  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fbb450), to(#f89406));\n  background-image: -webkit-linear-gradient(top, #fbb450, #f89406);\n  background-image: -o-linear-gradient(top, #fbb450, #f89406);\n  background-image: linear-gradient(to bottom, #fbb450, #f89406);\n  background-repeat: repeat-x;\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fffbb450', endColorstr='#fff89406', GradientType=0); }\n\n.progress-warning.progress-striped .bar,\n.progress-striped .bar-warning {\n  background-color: #fbb450;\n  background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, rgba(255, 255, 255, 0.15)), color-stop(0.25, transparent), color-stop(0.5, transparent), color-stop(0.5, rgba(255, 255, 255, 0.15)), color-stop(0.75, rgba(255, 255, 255, 0.15)), color-stop(0.75, transparent), to(transparent));\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -moz-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent); }\n\n.accordion {\n  margin-bottom: 20px; }\n\n.accordion-group {\n  margin-bottom: 2px;\n  border: 1px solid #e5e5e5;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.accordion-heading {\n  border-bottom: 0; }\n\n.accordion-heading .accordion-toggle {\n  display: block;\n  padding: 8px 15px; }\n\n.accordion-toggle {\n  cursor: pointer; }\n\n.accordion-inner {\n  padding: 9px 15px;\n  border-top: 1px solid #e5e5e5; }\n\n.carousel {\n  position: relative;\n  margin-bottom: 20px;\n  line-height: 1; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n\n.carousel-inner > .item {\n  position: relative;\n  display: none;\n  -webkit-transition: 0.6s ease-in-out left;\n  -moz-transition: 0.6s ease-in-out left;\n  -o-transition: 0.6s ease-in-out left;\n  transition: 0.6s ease-in-out left; }\n\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  line-height: 1; }\n\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block; }\n\n.carousel-inner > .active {\n  left: 0; }\n\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%; }\n\n.carousel-inner > .next {\n  left: 100%; }\n\n.carousel-inner > .prev {\n  left: -100%; }\n\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0; }\n\n.carousel-inner > .active.left {\n  left: -100%; }\n\n.carousel-inner > .active.right {\n  left: 100%; }\n\n.carousel-control {\n  position: absolute;\n  top: 40%;\n  left: 15px;\n  width: 40px;\n  height: 40px;\n  margin-top: -20px;\n  font-size: 60px;\n  font-weight: 100;\n  line-height: 30px;\n  color: #ffffff;\n  text-align: center;\n  background: #222222;\n  border: 3px solid #ffffff;\n  -webkit-border-radius: 23px;\n  -moz-border-radius: 23px;\n  border-radius: 23px;\n  opacity: 0.5;\n  filter: alpha(opacity=50); }\n\n.carousel-control.right {\n  right: 15px;\n  left: auto; }\n\n.carousel-control:hover,\n.carousel-control:focus {\n  color: #ffffff;\n  text-decoration: none;\n  opacity: 0.9;\n  filter: alpha(opacity=90); }\n\n.carousel-indicators {\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  z-index: 5;\n  margin: 0;\n  list-style: none; }\n\n.carousel-indicators li {\n  display: block;\n  float: left;\n  width: 10px;\n  height: 10px;\n  margin-left: 5px;\n  text-indent: -999px;\n  background-color: #ccc;\n  background-color: rgba(255, 255, 255, 0.25);\n  border-radius: 5px; }\n\n.carousel-indicators .active {\n  background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 15px;\n  background: #333333;\n  background: rgba(0, 0, 0, 0.75); }\n\n.carousel-caption h4,\n.carousel-caption p {\n  line-height: 20px;\n  color: #ffffff; }\n\n.carousel-caption h4 {\n  margin: 0 0 5px; }\n\n.carousel-caption p {\n  margin-bottom: 0; }\n\n.hero-unit {\n  padding: 60px;\n  margin-bottom: 30px;\n  font-size: 18px;\n  font-weight: 200;\n  line-height: 30px;\n  color: inherit;\n  background-color: #eeeeee;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px; }\n\n.hero-unit h1 {\n  margin-bottom: 0;\n  font-size: 60px;\n  line-height: 1;\n  letter-spacing: -1px;\n  color: inherit; }\n\n.hero-unit li {\n  line-height: 30px; }\n\n.pull-right {\n  float: right; }\n\n.pull-left {\n  float: left; }\n\n.hide {\n  display: none; }\n\n.show {\n  display: block; }\n\n.invisible {\n  visibility: hidden; }\n\n.affix {\n  position: fixed; }\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/font-awesome/css/font-awesome.css":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/node_modules/font-awesome/css/font-awesome.css ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../css-loader/lib/url/escape.js */ "../../../node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*!\n *  Font Awesome 3.2.1\n *  the iconic font designed for Bootstrap\n *  ------------------------------------------------------------------------------\n *  The full suite of pictographic icons, examples, and documentation can be\n *  found at http://fontawesome.io.  Stay up to date on Twitter at\n *  http://twitter.com/fontawesome.\n *\n *  License\n *  ------------------------------------------------------------------------------\n *  - The Font Awesome font is licensed under SIL OFL 1.1 -\n *    http://scripts.sil.org/OFL\n *  - Font Awesome CSS, LESS, and SASS files are licensed under MIT License -\n *    http://opensource.org/licenses/mit-license.html\n *  - Font Awesome documentation licensed under CC BY 3.0 -\n *    http://creativecommons.org/licenses/by/3.0/\n *  - Attribution is no longer required in Font Awesome 3.0, but much appreciated:\n *    \"Font Awesome by Dave Gandy - http://fontawesome.io\"\n *\n *  Author - Dave Gandy\n *  ------------------------------------------------------------------------------\n *  Email: dave@fontawesome.io\n *  Twitter: http://twitter.com/davegandy\n *  Work: Lead Product Designer @ Kyruus - http://kyruus.com\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(" + escape(__webpack_require__(/*! ../font/fontawesome-webfont.eot?v=3.2.1 */ "../../../node_modules/font-awesome/font/fontawesome-webfont.eot?v=3.2.1")) + ");\n  src: url(" + escape(__webpack_require__(/*! ../font/fontawesome-webfont.eot */ "../../../node_modules/font-awesome/font/fontawesome-webfont.eot")) + "?#iefix&v=3.2.1) format(\"embedded-opentype\"), url(" + escape(__webpack_require__(/*! ../font/fontawesome-webfont.woff?v=3.2.1 */ "../../../node_modules/font-awesome/font/fontawesome-webfont.woff?v=3.2.1")) + ") format(\"woff\"), url(" + escape(__webpack_require__(/*! ../font/fontawesome-webfont.ttf?v=3.2.1 */ "../../../node_modules/font-awesome/font/fontawesome-webfont.ttf?v=3.2.1")) + ") format(\"truetype\"), url(" + escape(__webpack_require__(/*! ../font/fontawesome-webfont.svg */ "../../../node_modules/font-awesome/font/fontawesome-webfont.svg")) + "#fontawesomeregular?v=3.2.1) format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n/* FONT AWESOME CORE\n * -------------------------- */\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  font-family: FontAwesome;\n  font-weight: normal;\n  font-style: normal;\n  text-decoration: inherit;\n  -webkit-font-smoothing: antialiased;\n  *margin-right: .3em; }\n\n[class^=\"icon-\"]:before,\n[class*=\" icon-\"]:before {\n  text-decoration: inherit;\n  display: inline-block;\n  speak: none; }\n\n/* makes the font 33% larger relative to the icon container */\n.icon-large:before {\n  vertical-align: -10%;\n  font-size: 1.3333333333333333em; }\n\n/* makes sure icons active on rollover in links */\na [class^=\"icon-\"],\na [class*=\" icon-\"] {\n  display: inline; }\n\n/* increased font size for icon-large */\n[class^=\"icon-\"].icon-fixed-width,\n[class*=\" icon-\"].icon-fixed-width {\n  display: inline-block;\n  width: 1.1428571428571428em;\n  text-align: right;\n  padding-right: 0.2857142857142857em; }\n\n[class^=\"icon-\"].icon-fixed-width.icon-large,\n[class*=\" icon-\"].icon-fixed-width.icon-large {\n  width: 1.4285714285714286em; }\n\n.icons-ul {\n  margin-left: 2.142857142857143em;\n  list-style-type: none; }\n\n.icons-ul > li {\n  position: relative; }\n\n.icons-ul .icon-li {\n  position: absolute;\n  left: -2.142857142857143em;\n  width: 2.142857142857143em;\n  text-align: center;\n  line-height: inherit; }\n\n[class^=\"icon-\"].hide,\n[class*=\" icon-\"].hide {\n  display: none; }\n\n.icon-muted {\n  color: #eeeeee; }\n\n.icon-light {\n  color: #ffffff; }\n\n.icon-dark {\n  color: #333333; }\n\n.icon-border {\n  border: solid 1px #eeeeee;\n  padding: .2em .25em .15em;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px; }\n\n.icon-2x {\n  font-size: 2em; }\n\n.icon-2x.icon-border {\n  border-width: 2px;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.icon-3x {\n  font-size: 3em; }\n\n.icon-3x.icon-border {\n  border-width: 3px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.icon-4x {\n  font-size: 4em; }\n\n.icon-4x.icon-border {\n  border-width: 4px;\n  -webkit-border-radius: 6px;\n  -moz-border-radius: 6px;\n  border-radius: 6px; }\n\n.icon-5x {\n  font-size: 5em; }\n\n.icon-5x.icon-border {\n  border-width: 5px;\n  -webkit-border-radius: 7px;\n  -moz-border-radius: 7px;\n  border-radius: 7px; }\n\n.pull-right {\n  float: right; }\n\n.pull-left {\n  float: left; }\n\n[class^=\"icon-\"].pull-left,\n[class*=\" icon-\"].pull-left {\n  margin-right: .3em; }\n\n[class^=\"icon-\"].pull-right,\n[class*=\" icon-\"].pull-right {\n  margin-left: .3em; }\n\n/* BOOTSTRAP SPECIFIC CLASSES\n * -------------------------- */\n/* Bootstrap 2.0 sprites.less reset */\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  display: inline;\n  width: auto;\n  height: auto;\n  line-height: normal;\n  vertical-align: baseline;\n  background-image: none;\n  background-position: 0% 0%;\n  background-repeat: repeat;\n  margin-top: 0; }\n\n/* more sprites.less reset */\n.icon-white,\n.nav-pills > .active > a > [class^=\"icon-\"],\n.nav-pills > .active > a > [class*=\" icon-\"],\n.nav-list > .active > a > [class^=\"icon-\"],\n.nav-list > .active > a > [class*=\" icon-\"],\n.navbar-inverse .nav > .active > a > [class^=\"icon-\"],\n.navbar-inverse .nav > .active > a > [class*=\" icon-\"],\n.dropdown-menu > li > a:hover > [class^=\"icon-\"],\n.dropdown-menu > li > a:hover > [class*=\" icon-\"],\n.dropdown-menu > .active > a > [class^=\"icon-\"],\n.dropdown-menu > .active > a > [class*=\" icon-\"],\n.dropdown-submenu:hover > a > [class^=\"icon-\"],\n.dropdown-submenu:hover > a > [class*=\" icon-\"] {\n  background-image: none; }\n\n/* keeps Bootstrap styles with and without icons the same */\n.btn [class^=\"icon-\"].icon-large,\n.nav [class^=\"icon-\"].icon-large,\n.btn [class*=\" icon-\"].icon-large,\n.nav [class*=\" icon-\"].icon-large {\n  line-height: .9em; }\n\n.btn [class^=\"icon-\"].icon-spin,\n.nav [class^=\"icon-\"].icon-spin,\n.btn [class*=\" icon-\"].icon-spin,\n.nav [class*=\" icon-\"].icon-spin {\n  display: inline-block; }\n\n.nav-tabs [class^=\"icon-\"],\n.nav-pills [class^=\"icon-\"],\n.nav-tabs [class*=\" icon-\"],\n.nav-pills [class*=\" icon-\"],\n.nav-tabs [class^=\"icon-\"].icon-large,\n.nav-pills [class^=\"icon-\"].icon-large,\n.nav-tabs [class*=\" icon-\"].icon-large,\n.nav-pills [class*=\" icon-\"].icon-large {\n  line-height: .9em; }\n\n.btn [class^=\"icon-\"].pull-left.icon-2x,\n.btn [class*=\" icon-\"].pull-left.icon-2x,\n.btn [class^=\"icon-\"].pull-right.icon-2x,\n.btn [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .18em; }\n\n.btn [class^=\"icon-\"].icon-spin.icon-large,\n.btn [class*=\" icon-\"].icon-spin.icon-large {\n  line-height: .8em; }\n\n.btn.btn-small [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-small [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-small [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .25em; }\n\n.btn.btn-large [class^=\"icon-\"],\n.btn.btn-large [class*=\" icon-\"] {\n  margin-top: 0; }\n\n.btn.btn-large [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-left.icon-2x,\n.btn.btn-large [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-right.icon-2x {\n  margin-top: .05em; }\n\n.btn.btn-large [class^=\"icon-\"].pull-left.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-left.icon-2x {\n  margin-right: .2em; }\n\n.btn.btn-large [class^=\"icon-\"].pull-right.icon-2x,\n.btn.btn-large [class*=\" icon-\"].pull-right.icon-2x {\n  margin-left: .2em; }\n\n/* Fixes alignment in nav lists */\n.nav-list [class^=\"icon-\"],\n.nav-list [class*=\" icon-\"] {\n  line-height: inherit; }\n\n/* EXTRAS\n * -------------------------- */\n/* Stacked and layered icon */\n.icon-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: -35%; }\n\n.icon-stack [class^=\"icon-\"],\n.icon-stack [class*=\" icon-\"] {\n  display: block;\n  text-align: center;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  font-size: 1em;\n  line-height: inherit;\n  *line-height: 2em; }\n\n.icon-stack .icon-stack-base {\n  font-size: 2em;\n  *line-height: 1em; }\n\n/* Animated rotating icon */\n.icon-spin {\n  display: inline-block;\n  -moz-animation: spin 2s infinite linear;\n  -o-animation: spin 2s infinite linear;\n  -webkit-animation: spin 2s infinite linear;\n  animation: spin 2s infinite linear; }\n\n/* Prevent stack and spinners from being taken inline when inside a link */\na .icon-stack,\na .icon-spin {\n  display: inline-block;\n  text-decoration: none; }\n\n@-moz-keyframes spin {\n  0% {\n    -moz-transform: rotate(0deg); }\n  100% {\n    -moz-transform: rotate(359deg); } }\n\n@-webkit-keyframes spin {\n  0% {\n    -webkit-transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(359deg); } }\n\n@-o-keyframes spin {\n  0% {\n    -o-transform: rotate(0deg); }\n  100% {\n    -o-transform: rotate(359deg); } }\n\n@-ms-keyframes spin {\n  0% {\n    -ms-transform: rotate(0deg); }\n  100% {\n    -ms-transform: rotate(359deg); } }\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(359deg); } }\n\n/* Icon rotations and mirroring */\n.icon-rotate-90:before {\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  -o-transform: rotate(90deg);\n  transform: rotate(90deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1); }\n\n.icon-rotate-180:before {\n  -webkit-transform: rotate(180deg);\n  -moz-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  -o-transform: rotate(180deg);\n  transform: rotate(180deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2); }\n\n.icon-rotate-270:before {\n  -webkit-transform: rotate(270deg);\n  -moz-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  -o-transform: rotate(270deg);\n  transform: rotate(270deg);\n  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3); }\n\n.icon-flip-horizontal:before {\n  -webkit-transform: scale(-1, 1);\n  -moz-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  -o-transform: scale(-1, 1);\n  transform: scale(-1, 1); }\n\n.icon-flip-vertical:before {\n  -webkit-transform: scale(1, -1);\n  -moz-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  -o-transform: scale(1, -1);\n  transform: scale(1, -1); }\n\n/* ensure rotation occurs inside anchor tags */\na .icon-rotate-90:before,\na .icon-rotate-180:before,\na .icon-rotate-270:before,\na .icon-flip-horizontal:before,\na .icon-flip-vertical:before {\n  display: inline-block; }\n\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.icon-glass:before {\n  content: \"\\F000\"; }\n\n.icon-music:before {\n  content: \"\\F001\"; }\n\n.icon-search:before {\n  content: \"\\F002\"; }\n\n.icon-envelope-alt:before {\n  content: \"\\F003\"; }\n\n.icon-heart:before {\n  content: \"\\F004\"; }\n\n.icon-star:before {\n  content: \"\\F005\"; }\n\n.icon-star-empty:before {\n  content: \"\\F006\"; }\n\n.icon-user:before {\n  content: \"\\F007\"; }\n\n.icon-film:before {\n  content: \"\\F008\"; }\n\n.icon-th-large:before {\n  content: \"\\F009\"; }\n\n.icon-th:before {\n  content: \"\\F00A\"; }\n\n.icon-th-list:before {\n  content: \"\\F00B\"; }\n\n.icon-ok:before {\n  content: \"\\F00C\"; }\n\n.icon-remove:before {\n  content: \"\\F00D\"; }\n\n.icon-zoom-in:before {\n  content: \"\\F00E\"; }\n\n.icon-zoom-out:before {\n  content: \"\\F010\"; }\n\n.icon-power-off:before,\n.icon-off:before {\n  content: \"\\F011\"; }\n\n.icon-signal:before {\n  content: \"\\F012\"; }\n\n.icon-gear:before,\n.icon-cog:before {\n  content: \"\\F013\"; }\n\n.icon-trash:before {\n  content: \"\\F014\"; }\n\n.icon-home:before {\n  content: \"\\F015\"; }\n\n.icon-file-alt:before {\n  content: \"\\F016\"; }\n\n.icon-time:before {\n  content: \"\\F017\"; }\n\n.icon-road:before {\n  content: \"\\F018\"; }\n\n.icon-download-alt:before {\n  content: \"\\F019\"; }\n\n.icon-download:before {\n  content: \"\\F01A\"; }\n\n.icon-upload:before {\n  content: \"\\F01B\"; }\n\n.icon-inbox:before {\n  content: \"\\F01C\"; }\n\n.icon-play-circle:before {\n  content: \"\\F01D\"; }\n\n.icon-rotate-right:before,\n.icon-repeat:before {\n  content: \"\\F01E\"; }\n\n.icon-refresh:before {\n  content: \"\\F021\"; }\n\n.icon-list-alt:before {\n  content: \"\\F022\"; }\n\n.icon-lock:before {\n  content: \"\\F023\"; }\n\n.icon-flag:before {\n  content: \"\\F024\"; }\n\n.icon-headphones:before {\n  content: \"\\F025\"; }\n\n.icon-volume-off:before {\n  content: \"\\F026\"; }\n\n.icon-volume-down:before {\n  content: \"\\F027\"; }\n\n.icon-volume-up:before {\n  content: \"\\F028\"; }\n\n.icon-qrcode:before {\n  content: \"\\F029\"; }\n\n.icon-barcode:before {\n  content: \"\\F02A\"; }\n\n.icon-tag:before {\n  content: \"\\F02B\"; }\n\n.icon-tags:before {\n  content: \"\\F02C\"; }\n\n.icon-book:before {\n  content: \"\\F02D\"; }\n\n.icon-bookmark:before {\n  content: \"\\F02E\"; }\n\n.icon-print:before {\n  content: \"\\F02F\"; }\n\n.icon-camera:before {\n  content: \"\\F030\"; }\n\n.icon-font:before {\n  content: \"\\F031\"; }\n\n.icon-bold:before {\n  content: \"\\F032\"; }\n\n.icon-italic:before {\n  content: \"\\F033\"; }\n\n.icon-text-height:before {\n  content: \"\\F034\"; }\n\n.icon-text-width:before {\n  content: \"\\F035\"; }\n\n.icon-align-left:before {\n  content: \"\\F036\"; }\n\n.icon-align-center:before {\n  content: \"\\F037\"; }\n\n.icon-align-right:before {\n  content: \"\\F038\"; }\n\n.icon-align-justify:before {\n  content: \"\\F039\"; }\n\n.icon-list:before {\n  content: \"\\F03A\"; }\n\n.icon-indent-left:before {\n  content: \"\\F03B\"; }\n\n.icon-indent-right:before {\n  content: \"\\F03C\"; }\n\n.icon-facetime-video:before {\n  content: \"\\F03D\"; }\n\n.icon-picture:before {\n  content: \"\\F03E\"; }\n\n.icon-pencil:before {\n  content: \"\\F040\"; }\n\n.icon-map-marker:before {\n  content: \"\\F041\"; }\n\n.icon-adjust:before {\n  content: \"\\F042\"; }\n\n.icon-tint:before {\n  content: \"\\F043\"; }\n\n.icon-edit:before {\n  content: \"\\F044\"; }\n\n.icon-share:before {\n  content: \"\\F045\"; }\n\n.icon-check:before {\n  content: \"\\F046\"; }\n\n.icon-move:before {\n  content: \"\\F047\"; }\n\n.icon-step-backward:before {\n  content: \"\\F048\"; }\n\n.icon-fast-backward:before {\n  content: \"\\F049\"; }\n\n.icon-backward:before {\n  content: \"\\F04A\"; }\n\n.icon-play:before {\n  content: \"\\F04B\"; }\n\n.icon-pause:before {\n  content: \"\\F04C\"; }\n\n.icon-stop:before {\n  content: \"\\F04D\"; }\n\n.icon-forward:before {\n  content: \"\\F04E\"; }\n\n.icon-fast-forward:before {\n  content: \"\\F050\"; }\n\n.icon-step-forward:before {\n  content: \"\\F051\"; }\n\n.icon-eject:before {\n  content: \"\\F052\"; }\n\n.icon-chevron-left:before {\n  content: \"\\F053\"; }\n\n.icon-chevron-right:before {\n  content: \"\\F054\"; }\n\n.icon-plus-sign:before {\n  content: \"\\F055\"; }\n\n.icon-minus-sign:before {\n  content: \"\\F056\"; }\n\n.icon-remove-sign:before {\n  content: \"\\F057\"; }\n\n.icon-ok-sign:before {\n  content: \"\\F058\"; }\n\n.icon-question-sign:before {\n  content: \"\\F059\"; }\n\n.icon-info-sign:before {\n  content: \"\\F05A\"; }\n\n.icon-screenshot:before {\n  content: \"\\F05B\"; }\n\n.icon-remove-circle:before {\n  content: \"\\F05C\"; }\n\n.icon-ok-circle:before {\n  content: \"\\F05D\"; }\n\n.icon-ban-circle:before {\n  content: \"\\F05E\"; }\n\n.icon-arrow-left:before {\n  content: \"\\F060\"; }\n\n.icon-arrow-right:before {\n  content: \"\\F061\"; }\n\n.icon-arrow-up:before {\n  content: \"\\F062\"; }\n\n.icon-arrow-down:before {\n  content: \"\\F063\"; }\n\n.icon-mail-forward:before,\n.icon-share-alt:before {\n  content: \"\\F064\"; }\n\n.icon-resize-full:before {\n  content: \"\\F065\"; }\n\n.icon-resize-small:before {\n  content: \"\\F066\"; }\n\n.icon-plus:before {\n  content: \"\\F067\"; }\n\n.icon-minus:before {\n  content: \"\\F068\"; }\n\n.icon-asterisk:before {\n  content: \"\\F069\"; }\n\n.icon-exclamation-sign:before {\n  content: \"\\F06A\"; }\n\n.icon-gift:before {\n  content: \"\\F06B\"; }\n\n.icon-leaf:before {\n  content: \"\\F06C\"; }\n\n.icon-fire:before {\n  content: \"\\F06D\"; }\n\n.icon-eye-open:before {\n  content: \"\\F06E\"; }\n\n.icon-eye-close:before {\n  content: \"\\F070\"; }\n\n.icon-warning-sign:before {\n  content: \"\\F071\"; }\n\n.icon-plane:before {\n  content: \"\\F072\"; }\n\n.icon-calendar:before {\n  content: \"\\F073\"; }\n\n.icon-random:before {\n  content: \"\\F074\"; }\n\n.icon-comment:before {\n  content: \"\\F075\"; }\n\n.icon-magnet:before {\n  content: \"\\F076\"; }\n\n.icon-chevron-up:before {\n  content: \"\\F077\"; }\n\n.icon-chevron-down:before {\n  content: \"\\F078\"; }\n\n.icon-retweet:before {\n  content: \"\\F079\"; }\n\n.icon-shopping-cart:before {\n  content: \"\\F07A\"; }\n\n.icon-folder-close:before {\n  content: \"\\F07B\"; }\n\n.icon-folder-open:before {\n  content: \"\\F07C\"; }\n\n.icon-resize-vertical:before {\n  content: \"\\F07D\"; }\n\n.icon-resize-horizontal:before {\n  content: \"\\F07E\"; }\n\n.icon-bar-chart:before {\n  content: \"\\F080\"; }\n\n.icon-twitter-sign:before {\n  content: \"\\F081\"; }\n\n.icon-facebook-sign:before {\n  content: \"\\F082\"; }\n\n.icon-camera-retro:before {\n  content: \"\\F083\"; }\n\n.icon-key:before {\n  content: \"\\F084\"; }\n\n.icon-gears:before,\n.icon-cogs:before {\n  content: \"\\F085\"; }\n\n.icon-comments:before {\n  content: \"\\F086\"; }\n\n.icon-thumbs-up-alt:before {\n  content: \"\\F087\"; }\n\n.icon-thumbs-down-alt:before {\n  content: \"\\F088\"; }\n\n.icon-star-half:before {\n  content: \"\\F089\"; }\n\n.icon-heart-empty:before {\n  content: \"\\F08A\"; }\n\n.icon-signout:before {\n  content: \"\\F08B\"; }\n\n.icon-linkedin-sign:before {\n  content: \"\\F08C\"; }\n\n.icon-pushpin:before {\n  content: \"\\F08D\"; }\n\n.icon-external-link:before {\n  content: \"\\F08E\"; }\n\n.icon-signin:before {\n  content: \"\\F090\"; }\n\n.icon-trophy:before {\n  content: \"\\F091\"; }\n\n.icon-github-sign:before {\n  content: \"\\F092\"; }\n\n.icon-upload-alt:before {\n  content: \"\\F093\"; }\n\n.icon-lemon:before {\n  content: \"\\F094\"; }\n\n.icon-phone:before {\n  content: \"\\F095\"; }\n\n.icon-unchecked:before,\n.icon-check-empty:before {\n  content: \"\\F096\"; }\n\n.icon-bookmark-empty:before {\n  content: \"\\F097\"; }\n\n.icon-phone-sign:before {\n  content: \"\\F098\"; }\n\n.icon-twitter:before {\n  content: \"\\F099\"; }\n\n.icon-facebook:before {\n  content: \"\\F09A\"; }\n\n.icon-github:before {\n  content: \"\\F09B\"; }\n\n.icon-unlock:before {\n  content: \"\\F09C\"; }\n\n.icon-credit-card:before {\n  content: \"\\F09D\"; }\n\n.icon-rss:before {\n  content: \"\\F09E\"; }\n\n.icon-hdd:before {\n  content: \"\\F0A0\"; }\n\n.icon-bullhorn:before {\n  content: \"\\F0A1\"; }\n\n.icon-bell:before {\n  content: \"\\F0A2\"; }\n\n.icon-certificate:before {\n  content: \"\\F0A3\"; }\n\n.icon-hand-right:before {\n  content: \"\\F0A4\"; }\n\n.icon-hand-left:before {\n  content: \"\\F0A5\"; }\n\n.icon-hand-up:before {\n  content: \"\\F0A6\"; }\n\n.icon-hand-down:before {\n  content: \"\\F0A7\"; }\n\n.icon-circle-arrow-left:before {\n  content: \"\\F0A8\"; }\n\n.icon-circle-arrow-right:before {\n  content: \"\\F0A9\"; }\n\n.icon-circle-arrow-up:before {\n  content: \"\\F0AA\"; }\n\n.icon-circle-arrow-down:before {\n  content: \"\\F0AB\"; }\n\n.icon-globe:before {\n  content: \"\\F0AC\"; }\n\n.icon-wrench:before {\n  content: \"\\F0AD\"; }\n\n.icon-tasks:before {\n  content: \"\\F0AE\"; }\n\n.icon-filter:before {\n  content: \"\\F0B0\"; }\n\n.icon-briefcase:before {\n  content: \"\\F0B1\"; }\n\n.icon-fullscreen:before {\n  content: \"\\F0B2\"; }\n\n.icon-group:before {\n  content: \"\\F0C0\"; }\n\n.icon-link:before {\n  content: \"\\F0C1\"; }\n\n.icon-cloud:before {\n  content: \"\\F0C2\"; }\n\n.icon-beaker:before {\n  content: \"\\F0C3\"; }\n\n.icon-cut:before {\n  content: \"\\F0C4\"; }\n\n.icon-copy:before {\n  content: \"\\F0C5\"; }\n\n.icon-paperclip:before,\n.icon-paper-clip:before {\n  content: \"\\F0C6\"; }\n\n.icon-save:before {\n  content: \"\\F0C7\"; }\n\n.icon-sign-blank:before {\n  content: \"\\F0C8\"; }\n\n.icon-reorder:before {\n  content: \"\\F0C9\"; }\n\n.icon-list-ul:before {\n  content: \"\\F0CA\"; }\n\n.icon-list-ol:before {\n  content: \"\\F0CB\"; }\n\n.icon-strikethrough:before {\n  content: \"\\F0CC\"; }\n\n.icon-underline:before {\n  content: \"\\F0CD\"; }\n\n.icon-table:before {\n  content: \"\\F0CE\"; }\n\n.icon-magic:before {\n  content: \"\\F0D0\"; }\n\n.icon-truck:before {\n  content: \"\\F0D1\"; }\n\n.icon-pinterest:before {\n  content: \"\\F0D2\"; }\n\n.icon-pinterest-sign:before {\n  content: \"\\F0D3\"; }\n\n.icon-google-plus-sign:before {\n  content: \"\\F0D4\"; }\n\n.icon-google-plus:before {\n  content: \"\\F0D5\"; }\n\n.icon-money:before {\n  content: \"\\F0D6\"; }\n\n.icon-caret-down:before {\n  content: \"\\F0D7\"; }\n\n.icon-caret-up:before {\n  content: \"\\F0D8\"; }\n\n.icon-caret-left:before {\n  content: \"\\F0D9\"; }\n\n.icon-caret-right:before {\n  content: \"\\F0DA\"; }\n\n.icon-columns:before {\n  content: \"\\F0DB\"; }\n\n.icon-sort:before {\n  content: \"\\F0DC\"; }\n\n.icon-sort-down:before {\n  content: \"\\F0DD\"; }\n\n.icon-sort-up:before {\n  content: \"\\F0DE\"; }\n\n.icon-envelope:before {\n  content: \"\\F0E0\"; }\n\n.icon-linkedin:before {\n  content: \"\\F0E1\"; }\n\n.icon-rotate-left:before,\n.icon-undo:before {\n  content: \"\\F0E2\"; }\n\n.icon-legal:before {\n  content: \"\\F0E3\"; }\n\n.icon-dashboard:before {\n  content: \"\\F0E4\"; }\n\n.icon-comment-alt:before {\n  content: \"\\F0E5\"; }\n\n.icon-comments-alt:before {\n  content: \"\\F0E6\"; }\n\n.icon-bolt:before {\n  content: \"\\F0E7\"; }\n\n.icon-sitemap:before {\n  content: \"\\F0E8\"; }\n\n.icon-umbrella:before {\n  content: \"\\F0E9\"; }\n\n.icon-paste:before {\n  content: \"\\F0EA\"; }\n\n.icon-lightbulb:before {\n  content: \"\\F0EB\"; }\n\n.icon-exchange:before {\n  content: \"\\F0EC\"; }\n\n.icon-cloud-download:before {\n  content: \"\\F0ED\"; }\n\n.icon-cloud-upload:before {\n  content: \"\\F0EE\"; }\n\n.icon-user-md:before {\n  content: \"\\F0F0\"; }\n\n.icon-stethoscope:before {\n  content: \"\\F0F1\"; }\n\n.icon-suitcase:before {\n  content: \"\\F0F2\"; }\n\n.icon-bell-alt:before {\n  content: \"\\F0F3\"; }\n\n.icon-coffee:before {\n  content: \"\\F0F4\"; }\n\n.icon-food:before {\n  content: \"\\F0F5\"; }\n\n.icon-file-text-alt:before {\n  content: \"\\F0F6\"; }\n\n.icon-building:before {\n  content: \"\\F0F7\"; }\n\n.icon-hospital:before {\n  content: \"\\F0F8\"; }\n\n.icon-ambulance:before {\n  content: \"\\F0F9\"; }\n\n.icon-medkit:before {\n  content: \"\\F0FA\"; }\n\n.icon-fighter-jet:before {\n  content: \"\\F0FB\"; }\n\n.icon-beer:before {\n  content: \"\\F0FC\"; }\n\n.icon-h-sign:before {\n  content: \"\\F0FD\"; }\n\n.icon-plus-sign-alt:before {\n  content: \"\\F0FE\"; }\n\n.icon-double-angle-left:before {\n  content: \"\\F100\"; }\n\n.icon-double-angle-right:before {\n  content: \"\\F101\"; }\n\n.icon-double-angle-up:before {\n  content: \"\\F102\"; }\n\n.icon-double-angle-down:before {\n  content: \"\\F103\"; }\n\n.icon-angle-left:before {\n  content: \"\\F104\"; }\n\n.icon-angle-right:before {\n  content: \"\\F105\"; }\n\n.icon-angle-up:before {\n  content: \"\\F106\"; }\n\n.icon-angle-down:before {\n  content: \"\\F107\"; }\n\n.icon-desktop:before {\n  content: \"\\F108\"; }\n\n.icon-laptop:before {\n  content: \"\\F109\"; }\n\n.icon-tablet:before {\n  content: \"\\F10A\"; }\n\n.icon-mobile-phone:before {\n  content: \"\\F10B\"; }\n\n.icon-circle-blank:before {\n  content: \"\\F10C\"; }\n\n.icon-quote-left:before {\n  content: \"\\F10D\"; }\n\n.icon-quote-right:before {\n  content: \"\\F10E\"; }\n\n.icon-spinner:before {\n  content: \"\\F110\"; }\n\n.icon-circle:before {\n  content: \"\\F111\"; }\n\n.icon-mail-reply:before,\n.icon-reply:before {\n  content: \"\\F112\"; }\n\n.icon-github-alt:before {\n  content: \"\\F113\"; }\n\n.icon-folder-close-alt:before {\n  content: \"\\F114\"; }\n\n.icon-folder-open-alt:before {\n  content: \"\\F115\"; }\n\n.icon-expand-alt:before {\n  content: \"\\F116\"; }\n\n.icon-collapse-alt:before {\n  content: \"\\F117\"; }\n\n.icon-smile:before {\n  content: \"\\F118\"; }\n\n.icon-frown:before {\n  content: \"\\F119\"; }\n\n.icon-meh:before {\n  content: \"\\F11A\"; }\n\n.icon-gamepad:before {\n  content: \"\\F11B\"; }\n\n.icon-keyboard:before {\n  content: \"\\F11C\"; }\n\n.icon-flag-alt:before {\n  content: \"\\F11D\"; }\n\n.icon-flag-checkered:before {\n  content: \"\\F11E\"; }\n\n.icon-terminal:before {\n  content: \"\\F120\"; }\n\n.icon-code:before {\n  content: \"\\F121\"; }\n\n.icon-reply-all:before {\n  content: \"\\F122\"; }\n\n.icon-mail-reply-all:before {\n  content: \"\\F122\"; }\n\n.icon-star-half-full:before,\n.icon-star-half-empty:before {\n  content: \"\\F123\"; }\n\n.icon-location-arrow:before {\n  content: \"\\F124\"; }\n\n.icon-crop:before {\n  content: \"\\F125\"; }\n\n.icon-code-fork:before {\n  content: \"\\F126\"; }\n\n.icon-unlink:before {\n  content: \"\\F127\"; }\n\n.icon-question:before {\n  content: \"\\F128\"; }\n\n.icon-info:before {\n  content: \"\\F129\"; }\n\n.icon-exclamation:before {\n  content: \"\\F12A\"; }\n\n.icon-superscript:before {\n  content: \"\\F12B\"; }\n\n.icon-subscript:before {\n  content: \"\\F12C\"; }\n\n.icon-eraser:before {\n  content: \"\\F12D\"; }\n\n.icon-puzzle-piece:before {\n  content: \"\\F12E\"; }\n\n.icon-microphone:before {\n  content: \"\\F130\"; }\n\n.icon-microphone-off:before {\n  content: \"\\F131\"; }\n\n.icon-shield:before {\n  content: \"\\F132\"; }\n\n.icon-calendar-empty:before {\n  content: \"\\F133\"; }\n\n.icon-fire-extinguisher:before {\n  content: \"\\F134\"; }\n\n.icon-rocket:before {\n  content: \"\\F135\"; }\n\n.icon-maxcdn:before {\n  content: \"\\F136\"; }\n\n.icon-chevron-sign-left:before {\n  content: \"\\F137\"; }\n\n.icon-chevron-sign-right:before {\n  content: \"\\F138\"; }\n\n.icon-chevron-sign-up:before {\n  content: \"\\F139\"; }\n\n.icon-chevron-sign-down:before {\n  content: \"\\F13A\"; }\n\n.icon-html5:before {\n  content: \"\\F13B\"; }\n\n.icon-css3:before {\n  content: \"\\F13C\"; }\n\n.icon-anchor:before {\n  content: \"\\F13D\"; }\n\n.icon-unlock-alt:before {\n  content: \"\\F13E\"; }\n\n.icon-bullseye:before {\n  content: \"\\F140\"; }\n\n.icon-ellipsis-horizontal:before {\n  content: \"\\F141\"; }\n\n.icon-ellipsis-vertical:before {\n  content: \"\\F142\"; }\n\n.icon-rss-sign:before {\n  content: \"\\F143\"; }\n\n.icon-play-sign:before {\n  content: \"\\F144\"; }\n\n.icon-ticket:before {\n  content: \"\\F145\"; }\n\n.icon-minus-sign-alt:before {\n  content: \"\\F146\"; }\n\n.icon-check-minus:before {\n  content: \"\\F147\"; }\n\n.icon-level-up:before {\n  content: \"\\F148\"; }\n\n.icon-level-down:before {\n  content: \"\\F149\"; }\n\n.icon-check-sign:before {\n  content: \"\\F14A\"; }\n\n.icon-edit-sign:before {\n  content: \"\\F14B\"; }\n\n.icon-external-link-sign:before {\n  content: \"\\F14C\"; }\n\n.icon-share-sign:before {\n  content: \"\\F14D\"; }\n\n.icon-compass:before {\n  content: \"\\F14E\"; }\n\n.icon-collapse:before {\n  content: \"\\F150\"; }\n\n.icon-collapse-top:before {\n  content: \"\\F151\"; }\n\n.icon-expand:before {\n  content: \"\\F152\"; }\n\n.icon-euro:before,\n.icon-eur:before {\n  content: \"\\F153\"; }\n\n.icon-gbp:before {\n  content: \"\\F154\"; }\n\n.icon-dollar:before,\n.icon-usd:before {\n  content: \"\\F155\"; }\n\n.icon-rupee:before,\n.icon-inr:before {\n  content: \"\\F156\"; }\n\n.icon-yen:before,\n.icon-jpy:before {\n  content: \"\\F157\"; }\n\n.icon-renminbi:before,\n.icon-cny:before {\n  content: \"\\F158\"; }\n\n.icon-won:before,\n.icon-krw:before {\n  content: \"\\F159\"; }\n\n.icon-bitcoin:before,\n.icon-btc:before {\n  content: \"\\F15A\"; }\n\n.icon-file:before {\n  content: \"\\F15B\"; }\n\n.icon-file-text:before {\n  content: \"\\F15C\"; }\n\n.icon-sort-by-alphabet:before {\n  content: \"\\F15D\"; }\n\n.icon-sort-by-alphabet-alt:before {\n  content: \"\\F15E\"; }\n\n.icon-sort-by-attributes:before {\n  content: \"\\F160\"; }\n\n.icon-sort-by-attributes-alt:before {\n  content: \"\\F161\"; }\n\n.icon-sort-by-order:before {\n  content: \"\\F162\"; }\n\n.icon-sort-by-order-alt:before {\n  content: \"\\F163\"; }\n\n.icon-thumbs-up:before {\n  content: \"\\F164\"; }\n\n.icon-thumbs-down:before {\n  content: \"\\F165\"; }\n\n.icon-youtube-sign:before {\n  content: \"\\F166\"; }\n\n.icon-youtube:before {\n  content: \"\\F167\"; }\n\n.icon-xing:before {\n  content: \"\\F168\"; }\n\n.icon-xing-sign:before {\n  content: \"\\F169\"; }\n\n.icon-youtube-play:before {\n  content: \"\\F16A\"; }\n\n.icon-dropbox:before {\n  content: \"\\F16B\"; }\n\n.icon-stackexchange:before {\n  content: \"\\F16C\"; }\n\n.icon-instagram:before {\n  content: \"\\F16D\"; }\n\n.icon-flickr:before {\n  content: \"\\F16E\"; }\n\n.icon-adn:before {\n  content: \"\\F170\"; }\n\n.icon-bitbucket:before {\n  content: \"\\F171\"; }\n\n.icon-bitbucket-sign:before {\n  content: \"\\F172\"; }\n\n.icon-tumblr:before {\n  content: \"\\F173\"; }\n\n.icon-tumblr-sign:before {\n  content: \"\\F174\"; }\n\n.icon-long-arrow-down:before {\n  content: \"\\F175\"; }\n\n.icon-long-arrow-up:before {\n  content: \"\\F176\"; }\n\n.icon-long-arrow-left:before {\n  content: \"\\F177\"; }\n\n.icon-long-arrow-right:before {\n  content: \"\\F178\"; }\n\n.icon-apple:before {\n  content: \"\\F179\"; }\n\n.icon-windows:before {\n  content: \"\\F17A\"; }\n\n.icon-android:before {\n  content: \"\\F17B\"; }\n\n.icon-linux:before {\n  content: \"\\F17C\"; }\n\n.icon-dribbble:before {\n  content: \"\\F17D\"; }\n\n.icon-skype:before {\n  content: \"\\F17E\"; }\n\n.icon-foursquare:before {\n  content: \"\\F180\"; }\n\n.icon-trello:before {\n  content: \"\\F181\"; }\n\n.icon-female:before {\n  content: \"\\F182\"; }\n\n.icon-male:before {\n  content: \"\\F183\"; }\n\n.icon-gittip:before {\n  content: \"\\F184\"; }\n\n.icon-sun:before {\n  content: \"\\F185\"; }\n\n.icon-moon:before {\n  content: \"\\F186\"; }\n\n.icon-archive:before {\n  content: \"\\F187\"; }\n\n.icon-bug:before {\n  content: \"\\F188\"; }\n\n.icon-vk:before {\n  content: \"\\F189\"; }\n\n.icon-weibo:before {\n  content: \"\\F18A\"; }\n\n.icon-renren:before {\n  content: \"\\F18B\"; }\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/navigator/style/app.css":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/style/app.css ***!
  \********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n// -*- coding: utf-8 -*-\n// (c) 2013-2018 Andreas Motl <andreas.motl@ip-tools.org>\n*/\n/* Document */\nbody {\n  background-color: #e7e7e7; }\n\n/* Grid layout */\n/* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout */\n.main-grid {\n  display: grid;\n  grid-template-columns: 1.7fr 2px 4fr; }\n\n.gutter {\n  cursor: ew-resize; }\n\n.gutter.gutter-horizontal {\n  float: left;\n  background-color: darkgrey; }\n\n/* Sidebars */\n#sidebar-left {\n  overflow-x: hidden; }\n\n/* Header */\n.header-container #menu-region {\n  margin-right: 1.2em; }\n\n.environment-badge {\n  margin-left: 2rem;\n  margin-top: 0.5rem; }\n\n/* Tweak menu opener based on layout */\n.menu-wide {\n  align-self: center;\n  margin-left: 1rem; }\n\n/*\n.menu-wide .icon-bars {\n    font-size: 2em;\n}\n*/\n.header-content {\n  min-height: 5rem; }\n\n.header-content-left {\n  display: flex !important; }\n\n.header-logo {\n  font-size: 24.5px;\n  line-height: 40px;\n  font-weight: bold; }\n\n/* Footer */\n.footer-container {\n  margin-top: 50px; }\n\n.page-footer, .page-footer a {\n  color: #555555; }\n\n/* Elements */\n/* Menu opener button */\n.btn-menu {\n  color: #333; }\n\n.btn-menu:hover, .btn-menu:focus {\n  text-decoration-line: none; }\n\n/* Text */\n.text-muted {\n  color: #777777; }\n\n.icon-bars:before {\n  content: \"\\F0C9\"; }\n\n.label-large {\n  font-size: large;\n  padding: 9px; }\n\n.header-title {\n  font-size: 24.5px;\n  line-height: 40px;\n  font-weight: bold;\n  text-rendering: optimizelegibility; }\n\n/* Export dialog */\n#export-dialog .modal-body .row-fluid {\n  margin-bottom: 2em; }\n\n.lead.inline {\n  margin: inherit;\n  vertical-align: middle; }\n\n.lead.section {\n  margin: inherit; }\n\n.lead.footer {\n  margin: inherit;\n  line-height: 42px;\n  vertical-align: middle; }\n\n/* Icons */\ni.circle-icon {\n  border: 4px solid #000000;\n  border-radius: 50%;\n  display: inline-block;\n  font-size: 1.1em;\n  width: 40px;\n  height: 40px;\n  vertical-align: middle;\n  text-align: center; }\n\n/* Links */\na.incognito, a.editable-click {\n  color: #333333; }\n\na.pointer {\n  text-decoration: none;\n  cursor: pointer; }\n\na.editable-click {\n  color: #333333;\n  border-bottom: dashed 1px #333333; }\n\n.dropdown-menu a {\n  cursor: pointer; }\n\np.hero-smaller {\n  font-size: 75%;\n  line-height: 1.5em; }\n\n/* bootstrap modifiers */\n.accordion-group.noborder {\n  border: none; }\n\n/* more modifiers */\nul.breathe li {\n  margin-bottom: 1em; }\n\n/*\n * Query builder\n */\n#querybuilder-area .row-fluid {\n  margin-bottom: 1rem; }\n\n/* Query builder: Data source and flavor chooser */\n.querybuilder-datasource-flavor-chooser {\n  /* Flex, baby */\n  display: flex;\n  /*\n     * Define the flow direction and allow wrapping.\n     * This is the same as:\n     * flex-direction: row;\n     * flex-wrap: wrap;\n     */\n  flex-flow: row wrap;\n  /* Add some nice spacing between elements */\n  justify-content: space-between;\n  margin-bottom: 0.25rem; }\n\n/* Combine CSS Element Queries with CSS Flexbox to style\n * elements based on container size, not screen size. */\n.querybuilder-datasource-flavor-chooser[max-width~=\"910px\"] {\n  flex-wrap: wrap-reverse; }\n\n.querybuilder-datasource-flavor-chooser * {\n  margin-bottom: 1px; }\n\n/* Query builder: Data source chooser */\n#datasource img[class=wider] {\n  height/*\\**/: 20px;\n  width/*\\**/: 30px; }\n\n#datasource img[class=square] {\n  height/*\\**/: 20px;\n  width/*\\**/: 20px; }\n\n#datasource button[class~=h-32] {\n  height/*\\**/: 32px; }\n\n.query-actions div {\n  margin: 0.15rem; }\n\n.start-search-buttons .btn {\n  color: #333; }\n\n#querybuilder-nav {\n  margin-bottom: 0px; }\n\n#querybuilder-nav li a {\n  padding-bottom: 0px; }\n\n/* Query builder comfort form */\n#querybuilder-comfort-form {\n  padding-top: 5px; }\n\n.querybuilder-comfort-form-fieldset {\n  /* Flex, baby */\n  display: flex;\n  /*\n     * Define the flow direction and allow wrapping.\n     * This is the same as:\n     * flex-direction: row;\n     * flex-wrap: wrap;\n     */\n  flex-flow: row wrap; }\n\n/* When expanded, align to the beginning of its parent container */\n.querybuilder-comfort-form-fieldset[min-width~=\"871px\"] {\n  justify-content: flex-start; }\n\n.querybuilder-comfort-form-fieldset[min-width~=\"871px\"] .field-regular:nth-child(n+2) {\n  margin-left: 1rem; }\n\n#querybuilder-comfort-form .input-xlarge {\n  width: 250px; }\n\n#querybuilder-comfort-form .input-xlarge.smaller {\n  width: 225px; }\n\n/* A little vertical spacing between elements */\n#querybuilder-comfort-form * {\n  margin-bottom: 1px; }\n\n#querybuilder-comfort-form .add-on.add-on-label {\n  width: 8rem;\n  margin-left: unset; }\n\n#querybuilder-comfort-form input::-webkit-input-placeholder {\n  color: #DDDDDD; }\n\n#querybuilder-comfort-form input:-moz-placeholder {\n  color: #DDDDDD; }\n\n#querybuilder-comfort-form input::-moz-placeholder {\n  color: #DDDDDD; }\n\n#querybuilder-comfort-form input:-ms-input-placeholder {\n  color: #DDDDDD; }\n\n/* Wrap querybuilder form fields more early */\n@media (max-width: 1280px) {\n  [class*=\"span\"], .uneditable-input[class*=\"span\"], .row-fluid [class*=\"span\"] {\n    display: block;\n    float: none;\n    width: 100%;\n    margin-left: 0;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box; } }\n\n/* Dossier management */\n#querybuilder-basket-area {\n  margin-top: 1.2em; }\n\n/* Query expression history chooser */\n#cql-history-chooser-container {\n  width: 770px; }\n\n.history-dropdown .select2-result {\n  min-height: 3.5em;\n  border-bottom: 1px solid #a9a9a9; }\n\n.history-container {\n  margin-top: 0.5em;\n  padding-left: inherit;\n  padding-right: inherit; }\n\n.history-row-1 {\n  margin-bottom: 1em; }\n\n.history-entry-labels {\n  text-align: right;\n  vertical-align: top; }\n\n.history-entry-labels .label, .badge, .text {\n  text-align: center;\n  font-weight: normal;\n  margin-left: 0.3em;\n  margin-right: 0.3em; }\n\n.history-tag-datasource {\n  width: 6em; }\n\n.history-tag-flavor {\n  width: 6em; }\n\n.history-tag-hits {\n  width: 5em; }\n\n.history-tag-narrow {\n  width: 5.25em; }\n\n.history-tag-wide {\n  width: 12em; }\n\n.history-tag-x-wide {\n  width: 16em; }\n\n/* MDC Snackbar */\n.mdc-snackbar {\n  z-index: 9999;\n  padding: 1.4rem; }\n\n/* Notification box */\n.ns-box {\n  font-size: 130% !important; }\n\n.ns-type-success {\n  color: #468847 !important;\n  background-color: #dff0d8 !important;\n  border-color: #d6e9c6 !important; }\n\n.ns-type-error {\n  color: #b94a48 !important;\n  background-color: #f2dede !important;\n  border-color: #eed3d7 !important; }\n\n.ns-type-warning {\n  color: #ffffff !important;\n  background-color: #f89406 !important;\n  border-color: #c67605 !important; }\n\n/* Notification box slightly shifted to the right */\n.ns-attached-custom {\n  left: 110px;\n  max-width: 300px; }\n\n/* Notification box on the right side */\n.ns-attached-right {\n  right: 30px;\n  max-width: 300px; }\n\n/* Notification box for wide header */\n.ns-attached-wide {\n  left: 435px;\n  max-width: 185px; }\n\n/* IFRAME for upstream errors in HTML */\n#error-iframe {\n  width: 100%;\n  height: 20em; }\n\n/* Expression field chooser */\n/* .bigdrop .select2-container .select2-results {max-height: 200px;} */\n.bigdrop .select2-results {\n  max-height: 35em; }\n\n/* .bigdrop .select2-choices {max-height: 150px; overflow-y: auto;} */\n/* Pager, pagination */\n.pager-area {\n  margin-top: 10px;\n  margin-bottom: 20px; }\n\n.pagination-chooser {\n  display: flex;\n  flex-flow: row wrap; }\n\n/* Medium pagination for production purposes */\n.medium.pagination {\n  margin: 0px; }\n\n.medium.pagination a {\n  height: 30px;\n  width: 30px;\n  font-size: 25px;\n  line-height: 25px; }\n\n.medium.pagination input {\n  width: 300px;\n  height: 30px;\n  font-size: 15px; }\n\n/* Alert boxes */\n.alert-inline {\n  margin-bottom: inherit; }\n\n.user-alert {\n  margin-bottom: 1em; }\n\n/* Modal boxes */\n.modal-not-rounded {\n  border-radius: 0; }\n\n.modal-warning .modal-header {\n  background-color: #f89406;\n  color: black; }\n\n.modal-success .modal-header {\n  background-color: #51a351;\n  color: white; }\n\n.modal-info .modal-header {\n  background-color: #3a87ad;\n  color: white; }\n\n/* http://www.revillwebdesign.com/change-the-height-width-and-position-of-a-modal-in-twitter-bootstrap/ */\n#ops-pdf-modal .modal-body {\n  max-height: 600px;\n  height: 600px; }\n\n#ops-pdf-modal {\n  width: 900px;\n  /* SET THE WIDTH OF THE MODAL */\n  margin: -50px 0 0 -450px;\n  /* CHANGE MARGINS TO ACCOMODATE THE NEW WIDTH (original = margin: -250px 0 0 -280px;) */ }\n\n/* Generalization of a large modal */\n.modal-high .modal-body {\n  max-height: 750px;\n  height: 550px; }\n\n.modal-wide {\n  width: 950px;\n  /* SET THE WIDTH OF THE MODAL */\n  margin: -50px 0 0 -500px;\n  /* CHANGE MARGINS TO ACCOMODATE THE NEW WIDTH (original = margin: -250px 0 0 -280px;) */ }\n\n.btn-symbol {\n  padding: 0.6em;\n  min-width: 5.5em; }\n\n/* Clipboard modifier */\n.btn-clipboard-modifier {\n  min-width: 30em;\n  min-height: 7em; }\n\n#keyword-editor {\n  width: 800px;\n  margin-left: -400px; }\n\n/* Document / result entry */\nimg.pdf-svg[src*=svg] {\n  height/*\\**/: 18px;\n  width/*\\**/: 18px; }\n\n.ops-collection-entry, .ops-collection-meta, .light-panel {\n  position: relative;\n  margin-bottom: 1.3rem;\n  padding: 0px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  border-radius: 4px; }\n\n.ops-collection-meta:first-child, .light-panel {\n  padding: 9px 15px;\n  border-bottom: 0px; }\n\n/* Document header */\n.ops-collection-entry-heading {\n  padding: 1.0rem;\n  border-bottom: 3px solid #e5e5e5;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: space-between; }\n\n.document-header-main {\n  width: 100%;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  grid-column-gap: 1rem;\n  grid-row-gap: 0.5rem;\n  justify-items: center;\n  align-items: center; }\n\n/* Narrow layouts for document header based on CSS Element Queries */\n.document-header-main[max-width~=\"700px\"] {\n  grid-template-columns: auto auto;\n  justify-items: start;\n  align-items: start; }\n\n.document-header-main[max-width~=\"440px\"] {\n  grid-template-columns: auto;\n  justify-items: start; }\n\n/* Document header: Justify outer columns */\n.document-header-main :first-child {\n  justify-self: start; }\n\n.document-header-main :last-child {\n  justify-self: end; }\n\n.document-title {\n  font-size: 24.5px;\n  font-weight: bold; }\n\n/* Tabs */\n.document-details.tab-content {\n  overflow: visible; }\n\n/* Rating */\n.dismiss {\n  border-bottom: 3px solid #51a351; }\n\n.score1 {\n  border-bottom: 3px solid #ffe303; }\n\n.score2 {\n  border-bottom: 3px solid #f89406; }\n\n.score3 {\n  border-bottom: 3px solid #bd362f; }\n\n/* Stack */\n.document-stack-decorated {\n  border-left: 3px solid #2196F3;\n  margin-left: -3px; }\n\n.stack-menu {\n  min-width: calc(25vw - 32px); }\n\n/* More info */\n.document-header-more-menu {\n  top: unset; }\n\n.more-links-menu-container {\n  left: -230px !important;\n  top: unset !important;\n  margin-top: unset !important; }\n\n/* Document: Content */\n.ops-collection-entry-inner {\n  display: block;\n  padding: 9px 15px; }\n\n/* Document: Permalink */\n#permalink-uri-textinput {\n  font-size: 8px;\n  line-height: 8px;\n  padding: 0px;\n  margin: 0px; }\n\n#permalink-uri-textinput.uneditable-input {\n  overflow: scroll;\n  white-space: normal;\n  height: auto; }\n\n.dl-horizontal-biblio {\n  margin-bottom: 0px; }\n\n.dl-horizontal-biblio dt {\n  width: 30px;\n  text-align: left; }\n\n.dl-horizontal-biblio dd {\n  margin-left: 40px; }\n\ndl.dl-horizontal-inline {\n  -webkit-margin-before: 0em;\n  -webkit-margin-after: 0em; }\n\n@media (min-width: 768px) {\n  .dl-horizontal-inline-container {\n    position: relative;\n    top: -1.4em; } }\n\n.dl-horizontal-inline dt {\n  width: 60px;\n  text-align: left; }\n\n.dl-horizontal-inline dd {\n  margin-left: 60px; }\n\n.label-document-missing {\n  font-size: large;\n  padding: 7px; }\n\n/* Carousel for drawings */\n/* Align control arrows at bottom of image */\n.carousel-control {\n  position: absolute;\n  top: 95%;\n  margin-top: inherit; }\n\n/* Center drawings inside container */\n.carousel-inner {\n  text-align: center; }\n\n.carousel-inner > .item > img, .carousel-inner > .item > a > img {\n  display: inline-block; }\n\n.carousel-control.rotate {\n  left: 50%;\n  right: 50%;\n  font-size: inherit;\n  font-weight: inherit;\n  line-height: 2.8em; }\n\n.carousel-control.rotate > i {\n  margin-top2: 15px;\n  vertical-align: middle; }\n\n/* Keyword highlighting */\n/* https://github.com/alanphoon/jquery-keyword-highlight */\n.highlight-base {\n  padding: 2px; }\n\n.highlight .highlight-mouseover {\n  display: none;\n  background-color: white; }\n\n.highlight:hover .highlight-mouseover {\n  display: inline-block;\n  padding-left: 0.5em; }\n\n.highlight-circle {\n  border: solid 1px #eee;\n  border-radius: 3px;\n  padding: 2px;\n  background-color: #eee;\n  color: #333;\n  font-weight: 600; }\n\n/* Project management */\n#project-chooser-list .dropdown-menu {\n  width: 300px; }\n\n/*\n#project-chooser-actions button {\n    margin-bottom: 1em;\n}\n*/\n.dropdown-section-header {\n  margin-left: 10px;\n  padding: 5px; }\n\n#basket {\n  font-size: smaller; }\n\n#share-numberlist-clipboard {\n  cursor: pointer; }\n\n.form-single-bibdata {\n  display: inline; }\n\n.area-comment-text {\n  padding: 10px; }\n\n/* Login form */\n.login-modal {\n  z-index: 1050;\n  position: fixed;\n  top: 10%;\n  left: 38%; }\n\n.login-box {\n  max-width: 350px;\n  padding-top: 9px;\n  padding-left: 29px;\n  padding-right: 29px;\n  margin: 0 auto 20px;\n  background-color: #fff;\n  border: 1px solid #e5e5e5;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }\n\n.form-signin .form-signin-heading,\n.form-signin .checkbox {\n  margin-bottom: 10px; }\n\n.form-signin-heading-logo {\n  margin-bottom: 20px; }\n\n.form-signin input[type=\"text\"],\n.form-signin input[type=\"password\"] {\n  font-size: 16px;\n  height: auto;\n  margin-bottom: 15px;\n  padding: 7px 9px; }\n\n/* Sticky waypoint */\n/* TODO: for letting the drawing follow the text */\n/*\n.stuck {\n    position: fixed;\n    top: 0;\n    z-index: 9999;\n}\n*/\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/navigator/style/generic.css":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/style/generic.css ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*\n// -*- coding: utf-8 -*-\n// (c) 2013-2018 Andreas Motl <andreas.motl@ip-tools.org>\n*/\n/* Text */\n.monospace {\n  font-family: Monaco, \"Lucida Console\", monospace; }\n\n.text-small {\n  font-size: small; }\n\n.text-large {\n  font-size: large; }\n\n.text-larger {\n  font-size: larger; }\n\n.text-align-left {\n  text-align: left; }\n\n.text-align-right {\n  text-align: right; }\n\n.strong {\n  font-weight: bold; }\n\n/* Alignment */\npre.inline {\n  display: inline-block; }\n\n.inline-head {\n  display: inline; }\n\n.full-width {\n  width: 100%; }\n\n.clear-margin {\n  margin: 0px; }\n\n.container-fluid.nopadding {\n  padding: 0px; }\n\n.nomargin {\n  margin: 0 !important; }\n\nhr.no-margin {\n  margin: inherit; }\n\n.vertical-align-middle {\n  /* http://zerosixthree.se/vertical-align-anything-with-just-3-lines-of-css/ */\n  position: relative;\n  top: 50%;\n  transform: translateY(50%); }\n\n.align-middle {\n  display: flex;\n  align-items: center; }\n\n.align-center-middle {\n  /* https://alligator.io/css/centering-using-flexbox/ */\n  /* Flex, baby */\n  display: flex;\n  /* Vertical centering */\n  align-items: center;\n  /* Horizontal centering */\n  justify-content: center;\n  /* Make the container cover the full page height */\n  height: 100vh; }\n\n.align-center {\n  display: flex;\n  justify-content: center; }\n\n.align-left {\n  display: flex;\n  justify-content: left; }\n\n.align-right {\n  display: flex;\n  justify-content: right; }\n\n/* Buttons */\n.btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px; }\n\n.btn-group-larger > .btn, .btn-larger {\n  padding: 8px 13px;\n  font-size: 16px;\n  line-height: 1.2; }\n\n.btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.33; }\n\n/* Page breaks */\n/*\nhttps://stackoverflow.com/questions/27058472/wkhtmltopdf-page-break-after-have-whitespace\nhttps://stackoverflow.com/questions/27103312/wkhtmltopdf-does-not-respect-page-break-after\n*/\n/*\n* {\n    overflow: visible !important;\n}\n*/\n.page-break-after {\n  page-break-inside: avoid;\n  page-break-after: always; }\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/navigator/style/material.css":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader!/home/frank/DATA/Development/ipnav-py37/node_modules/sass-loader/lib/loader.js??ref--8-2!/home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/style/material.css ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../../../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Material Components for the web *\n/* https://github.com/material-components/material-components-web */\n/* Use custom color theme */\n/* https://material-components.github.io/material-components-web-catalog/#/component/theme */\n/* Use default font */\n/* https://material-components.github.io/material-components-web-catalog/#/component/typography */\n/* MDC Styles */\n/* https://material-components.github.io/material-components-web-catalog/#/component/button */\n@keyframes mdc-ripple-fg-radius-in {\n  from {\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    transform: translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1); }\n  to {\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); } }\n\n@keyframes mdc-ripple-fg-opacity-in {\n  from {\n    animation-timing-function: linear;\n    opacity: 0; }\n  to {\n    opacity: var(--mdc-ripple-fg-opacity, 0); } }\n\n@keyframes mdc-ripple-fg-opacity-out {\n  from {\n    animation-timing-function: linear;\n    opacity: var(--mdc-ripple-fg-opacity, 0); }\n  to {\n    opacity: 0; } }\n\n.mdc-ripple-surface--test-edge-var-bug {\n  --mdc-ripple-surface-test-edge-var: 1px solid #000;\n  visibility: hidden; }\n  .mdc-ripple-surface--test-edge-var-bug::before {\n    border: var(--mdc-ripple-surface-test-edge-var); }\n\n.mdc-button {\n  font-family: unset;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity;\n  padding: 0 8px 0 8px;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  justify-content: center;\n  box-sizing: border-box;\n  min-width: 64px;\n  height: 36px;\n  border: none;\n  outline: none;\n  /* @alternate */\n  line-height: inherit;\n  user-select: none;\n  -webkit-appearance: none;\n  overflow: hidden;\n  vertical-align: middle;\n  border-radius: 4px; }\n  .mdc-button::before, .mdc-button::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  .mdc-button::before {\n    transition: opacity 15ms linear, background-color 15ms linear;\n    z-index: 1; }\n  .mdc-button.mdc-ripple-upgraded::before {\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-button.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    transform: scale(0);\n    transform-origin: center center; }\n  .mdc-button.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  .mdc-button.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  .mdc-button.mdc-ripple-upgraded--foreground-deactivation::after {\n    animation: 150ms mdc-ripple-fg-opacity-out;\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  .mdc-button::before, .mdc-button::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  .mdc-button.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  .mdc-button::-moz-focus-inner {\n    padding: 0;\n    border: 0; }\n  .mdc-button:active {\n    outline: none; }\n  .mdc-button:hover {\n    cursor: pointer; }\n  .mdc-button:disabled {\n    background-color: transparent;\n    color: rgba(0, 0, 0, 0.37);\n    cursor: default;\n    pointer-events: none; }\n  .mdc-button.mdc-button--dense {\n    border-radius: 4px; }\n  .mdc-button:not(:disabled) {\n    background-color: transparent; }\n  .mdc-button:not(:disabled) {\n    color: #1565c0;\n    /* @alternate */\n    color: var(--mdc-theme-primary, #1565c0); }\n  .mdc-button::before, .mdc-button::after {\n    background-color: #1565c0; }\n    @supports not (-ms-ime-align: auto) {\n      .mdc-button::before, .mdc-button::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #1565c0); } }\n  .mdc-button:hover::before {\n    opacity: 0.04; }\n  .mdc-button:not(.mdc-ripple-upgraded):focus::before, .mdc-button.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  .mdc-button:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  .mdc-button:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.16; }\n  .mdc-button.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.16; }\n  .mdc-button .mdc-button__icon {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 8px;\n    display: inline-block;\n    width: 18px;\n    height: 18px;\n    font-size: 18px;\n    vertical-align: top; }\n    [dir=\"rtl\"] .mdc-button .mdc-button__icon, .mdc-button .mdc-button__icon[dir=\"rtl\"] {\n      /* @noflip */\n      margin-left: 8px;\n      /* @noflip */\n      margin-right: 0; }\n  .mdc-button svg.mdc-button__icon {\n    fill: currentColor; }\n\n.mdc-button--raised .mdc-button__icon,\n.mdc-button--unelevated .mdc-button__icon,\n.mdc-button--outlined .mdc-button__icon {\n  /* @noflip */\n  margin-left: -4px;\n  /* @noflip */\n  margin-right: 8px; }\n  [dir=\"rtl\"] .mdc-button--raised .mdc-button__icon, .mdc-button--raised .mdc-button__icon[dir=\"rtl\"], [dir=\"rtl\"]\n  .mdc-button--unelevated .mdc-button__icon,\n  .mdc-button--unelevated .mdc-button__icon[dir=\"rtl\"], [dir=\"rtl\"]\n  .mdc-button--outlined .mdc-button__icon,\n  .mdc-button--outlined .mdc-button__icon[dir=\"rtl\"] {\n    /* @noflip */\n    margin-left: 8px;\n    /* @noflip */\n    margin-right: -4px; }\n\n.mdc-button--raised,\n.mdc-button--unelevated {\n  padding: 0 16px 0 16px; }\n  .mdc-button--raised:disabled,\n  .mdc-button--unelevated:disabled {\n    background-color: rgba(0, 0, 0, 0.12);\n    color: rgba(0, 0, 0, 0.37); }\n  .mdc-button--raised:not(:disabled),\n  .mdc-button--unelevated:not(:disabled) {\n    background-color: #1565c0; }\n    @supports not (-ms-ime-align: auto) {\n      .mdc-button--raised:not(:disabled),\n      .mdc-button--unelevated:not(:disabled) {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #1565c0); } }\n  .mdc-button--raised:not(:disabled),\n  .mdc-button--unelevated:not(:disabled) {\n    color: #5e92f3;\n    /* @alternate */\n    color: var(--mdc-theme-on-primary, #5e92f3); }\n  .mdc-button--raised::before, .mdc-button--raised::after,\n  .mdc-button--unelevated::before,\n  .mdc-button--unelevated::after {\n    background-color: #5e92f3; }\n    @supports not (-ms-ime-align: auto) {\n      .mdc-button--raised::before, .mdc-button--raised::after,\n      .mdc-button--unelevated::before,\n      .mdc-button--unelevated::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-on-primary, #5e92f3); } }\n  .mdc-button--raised:hover::before,\n  .mdc-button--unelevated:hover::before {\n    opacity: 0.08; }\n  .mdc-button--raised:not(.mdc-ripple-upgraded):focus::before, .mdc-button--raised.mdc-ripple-upgraded--background-focused::before,\n  .mdc-button--unelevated:not(.mdc-ripple-upgraded):focus::before,\n  .mdc-button--unelevated.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  .mdc-button--raised:not(.mdc-ripple-upgraded)::after,\n  .mdc-button--unelevated:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  .mdc-button--raised:not(.mdc-ripple-upgraded):active::after,\n  .mdc-button--unelevated:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.32; }\n  .mdc-button--raised.mdc-ripple-upgraded,\n  .mdc-button--unelevated.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.32; }\n\n.mdc-button--raised {\n  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);\n  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1); }\n  .mdc-button--raised:hover, .mdc-button--raised:focus {\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12); }\n  .mdc-button--raised:active {\n    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12); }\n  .mdc-button--raised:disabled {\n    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12); }\n\n.mdc-button--outlined {\n  border-style: solid;\n  padding: 0 14px 0 14px;\n  border-width: 2px; }\n  .mdc-button--outlined:disabled {\n    border-color: rgba(0, 0, 0, 0.37); }\n  .mdc-button--outlined:not(:disabled) {\n    border-color: #1565c0;\n    /* @alternate */\n    border-color: var(--mdc-theme-primary, #1565c0); }\n\n.mdc-button--dense {\n  height: 32px;\n  font-size: .8125rem; }\n\n.mdc-snackbar {\n  display: flex;\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  align-items: center;\n  justify-content: flex-start;\n  box-sizing: border-box;\n  padding-right: 24px;\n  padding-left: 24px;\n  transform: translate(-50%, 100%);\n  transition: transform 0.25s 0ms cubic-bezier(0.4, 0, 1, 1);\n  background-color: #323232;\n  pointer-events: none;\n  will-change: transform; }\n  @media (max-width: 599px) {\n    .mdc-snackbar {\n      left: 0;\n      width: 100%;\n      transform: translate(0, 100%); } }\n  @media (min-width: 600px) {\n    .mdc-snackbar {\n      min-width: 288px;\n      max-width: 568px;\n      border-radius: 2px; } }\n\n@media (min-width: 600px) {\n  .mdc-snackbar--align-start {\n    /* @noflip */\n    left: 24px;\n    /* @noflip */\n    right: initial;\n    bottom: 24px;\n    transform: translate(0, 200%); }\n    [dir=\"rtl\"] .mdc-snackbar--align-start, .mdc-snackbar--align-start[dir=\"rtl\"] {\n      /* @noflip */\n      left: initial;\n      /* @noflip */\n      right: 24px; } }\n\n@media (max-width: 599px) {\n  .mdc-snackbar--align-start {\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    transform: translate(0, 100%); } }\n\n.mdc-snackbar--active {\n  transform: translate(0);\n  transition: transform 0.25s 0ms cubic-bezier(0, 0, 0.2, 1);\n  pointer-events: auto; }\n  .mdc-snackbar--active:not(.mdc-snackbar--align-start) {\n    transform: translate(-50%, 0); }\n    @media (max-width: 599px) {\n      .mdc-snackbar--active:not(.mdc-snackbar--align-start) {\n        bottom: 0;\n        left: 0;\n        width: 100%;\n        transform: translate(0); } }\n\n.mdc-snackbar__action-wrapper {\n  /* @noflip */\n  padding-left: 24px;\n  /* @noflip */\n  padding-right: 0; }\n  [dir=\"rtl\"] .mdc-snackbar__action-wrapper, .mdc-snackbar__action-wrapper[dir=\"rtl\"] {\n    /* @noflip */\n    padding-left: 0;\n    /* @noflip */\n    padding-right: 24px; }\n\n.mdc-snackbar--action-on-bottom {\n  flex-direction: column; }\n\n.mdc-snackbar__text {\n  font-family: unset;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.5rem;\n  font-weight: 400;\n  letter-spacing: 0.03125em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: auto;\n  display: flex;\n  align-items: center;\n  height: 48px;\n  transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  opacity: 0;\n  color: white; }\n  .mdc-snackbar[dir=\"rtl\"] .mdc-snackbar__text,\n  [dir=\"rtl\"] .mdc-snackbar .mdc-snackbar__text {\n    /* @noflip */\n    margin-left: auto;\n    /* @noflip */\n    margin-right: 0; }\n  @media (min-width: 600px) {\n    .mdc-snackbar__text {\n      /* @noflip */\n      padding-left: 0;\n      /* @noflip */\n      padding-right: 24px; }\n      [dir=\"rtl\"] .mdc-snackbar__text, .mdc-snackbar__text[dir=\"rtl\"] {\n        /* @noflip */\n        padding-left: 24px;\n        /* @noflip */\n        padding-right: 0; } }\n\n.mdc-snackbar--action-on-bottom .mdc-snackbar__text {\n  margin-right: inherit; }\n\n.mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper {\n  /* @noflip */\n  margin-left: auto;\n  /* @noflip */\n  margin-right: 0;\n  flex-direction: column;\n  justify-content: flex-start;\n  margin-top: -12px;\n  margin-bottom: 8px; }\n  [dir=\"rtl\"] .mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper, .mdc-snackbar--action-on-bottom .mdc-snackbar__action-wrapper[dir=\"rtl\"] {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: auto; }\n\n.mdc-snackbar--multiline .mdc-snackbar__text {\n  height: 80px; }\n\n.mdc-snackbar__action-button {\n  font-family: unset;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 2.25rem;\n  font-weight: 500;\n  letter-spacing: 0.08929em;\n  text-decoration: none;\n  text-transform: uppercase;\n  color: #ffffff;\n  /* @alternate */\n  color: var(--mdc-theme-secondary, #ffffff);\n  padding: 0;\n  transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  border: none;\n  outline: none;\n  background-color: transparent;\n  opacity: 0;\n  user-select: none;\n  -webkit-appearance: none;\n  visibility: hidden; }\n  .mdc-snackbar__action-button::-moz-focus-inner {\n    border: 0; }\n  .mdc-snackbar__action-button:hover {\n    cursor: pointer; }\n  .mdc-snackbar__action-button:not([aria-hidden]) {\n    visibility: inherit; }\n\n.mdc-snackbar--active .mdc-snackbar__text,\n.mdc-snackbar--active .mdc-snackbar__action-button:not([aria-hidden]) {\n  transition: opacity 0.3s 0ms cubic-bezier(0.4, 0, 1, 1);\n  opacity: 1; }\n\n.mdc-snackbar--multiline.mdc-snackbar--action-on-bottom .mdc-snackbar__text {\n  margin: 0; }\n\n/* https://material.io/develop/web/components/menus/ */\n.mdc-list {\n  font-family: unset;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));\n  margin: 0;\n  padding: 8px 0;\n  /* @alternate */\n  line-height: 1.5rem;\n  list-style-type: none; }\n\n.mdc-list-item__secondary-text {\n  color: rgba(0, 0, 0, 0.54);\n  /* @alternate */\n  color: var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54)); }\n\n.mdc-list-item__graphic {\n  background-color: transparent; }\n\n.mdc-list-item__graphic {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__meta {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list--dense {\n  padding-top: 4px;\n  padding-bottom: 4px;\n  font-size: .812rem; }\n\n.mdc-list-item {\n  display: flex;\n  position: relative;\n  align-items: center;\n  justify-content: flex-start;\n  height: 48px;\n  padding: 0 16px;\n  overflow: hidden; }\n  .mdc-list-item:focus {\n    outline: none; }\n\n.mdc-list-item--selected,\n.mdc-list-item--activated {\n  color: #1565c0;\n  /* @alternate */\n  color: var(--mdc-theme-primary, #1565c0); }\n  .mdc-list-item--selected .mdc-list-item__graphic,\n  .mdc-list-item--activated .mdc-list-item__graphic {\n    color: #1565c0;\n    /* @alternate */\n    color: var(--mdc-theme-primary, #1565c0); }\n\n.mdc-list-item--disabled {\n  color: rgba(0, 0, 0, 0.38);\n  /* @alternate */\n  color: var(--mdc-theme-text-disabled-on-background, rgba(0, 0, 0, 0.38)); }\n\n.mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 32px;\n  width: 24px;\n  height: 24px;\n  font-size: 24px;\n  display: inline-flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n  fill: currentColor; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 32px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list-item__meta {\n  /* @noflip */\n  margin-left: auto;\n  /* @noflip */\n  margin-right: 0; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list-item__meta,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list-item__meta {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: auto; }\n\n.mdc-list-item__text {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden; }\n\n.mdc-list-item__primary-text {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: block;\n  margin-top: 0;\n  /* @alternate */\n  line-height: normal;\n  margin-bottom: -20px;\n  display: block; }\n  .mdc-list-item__primary-text::before {\n    display: inline-block;\n    width: 0;\n    height: 32px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list-item__primary-text::after {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: -20px; }\n  .mdc-list--dense .mdc-list-item__primary-text {\n    display: block;\n    margin-top: 0;\n    /* @alternate */\n    line-height: normal;\n    margin-bottom: -20px; }\n    .mdc-list--dense .mdc-list-item__primary-text::before {\n      display: inline-block;\n      width: 0;\n      height: 24px;\n      content: \"\";\n      vertical-align: 0; }\n    .mdc-list--dense .mdc-list-item__primary-text::after {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: -20px; }\n\n.mdc-list-item__secondary-text {\n  font-family: unset;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n  font-weight: 400;\n  letter-spacing: 0.01786em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: block;\n  margin-top: 0;\n  /* @alternate */\n  line-height: normal;\n  display: block; }\n  .mdc-list-item__secondary-text::before {\n    display: inline-block;\n    width: 0;\n    height: 20px;\n    content: \"\";\n    vertical-align: 0; }\n  .mdc-list--dense .mdc-list-item__secondary-text {\n    display: block;\n    margin-top: 0;\n    /* @alternate */\n    line-height: normal;\n    font-size: inherit; }\n    .mdc-list--dense .mdc-list-item__secondary-text::before {\n      display: inline-block;\n      width: 0;\n      height: 20px;\n      content: \"\";\n      vertical-align: 0; }\n\n.mdc-list--dense .mdc-list-item {\n  height: 40px; }\n\n.mdc-list--dense .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 36px;\n  width: 20px;\n  height: 20px;\n  font-size: 20px; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--dense .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 36px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list--avatar-list .mdc-list-item {\n  height: 56px; }\n\n.mdc-list--avatar-list .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 16px;\n  width: 40px;\n  height: 40px;\n  font-size: 40px;\n  border-radius: 50%; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--avatar-list .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 16px;\n    /* @noflip */\n    margin-right: 0; }\n\n.mdc-list--two-line .mdc-list-item__text {\n  align-self: flex-start; }\n\n.mdc-list--two-line .mdc-list-item {\n  height: 72px; }\n\n.mdc-list--two-line.mdc-list--dense .mdc-list-item {\n  height: 60px; }\n\n.mdc-list--avatar-list.mdc-list--dense .mdc-list-item {\n  height: 60px; }\n\n.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {\n  /* @noflip */\n  margin-left: 0;\n  /* @noflip */\n  margin-right: 20px;\n  width: 36px;\n  height: 36px;\n  font-size: 36px; }\n  .mdc-list-item[dir=\"rtl\"] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,\n  [dir=\"rtl\"] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {\n    /* @noflip */\n    margin-left: 20px;\n    /* @noflip */\n    margin-right: 0; }\n\n:not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item {\n  --mdc-ripple-fg-size: 0;\n  --mdc-ripple-left: 0;\n  --mdc-ripple-top: 0;\n  --mdc-ripple-fg-scale: 1;\n  --mdc-ripple-fg-translate-end: 0;\n  --mdc-ripple-fg-translate-start: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  will-change: transform, opacity; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    position: absolute;\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none;\n    content: \"\"; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before {\n    transition: opacity 15ms linear, background-color 15ms linear;\n    z-index: 1; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::before {\n    transform: scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    top: 0;\n    /* @noflip */\n    left: 0;\n    transform: scale(0);\n    transform-origin: center center; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded::after {\n    top: var(--mdc-ripple-top, 0);\n    /* @noflip */\n    left: var(--mdc-ripple-left, 0); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation::after {\n    animation: 225ms mdc-ripple-fg-radius-in forwards, 75ms mdc-ripple-fg-opacity-in forwards; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after {\n    animation: 150ms mdc-ripple-fg-opacity-out;\n    transform: translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1)); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    top: calc(50% - 100%);\n    /* @noflip */\n    left: calc(50% - 100%);\n    width: 200%;\n    height: 200%; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {\n    width: var(--mdc-ripple-fg-size, 100%);\n    height: var(--mdc-ripple-fg-size, 100%); }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item::after {\n    background-color: #000; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:hover::before {\n    opacity: 0.04; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.16; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.16; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before {\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n    background-color: #1565c0; }\n    @supports not (-ms-ime-align: auto) {\n      :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #1565c0); } }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:hover::before {\n    opacity: 0.16; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.28; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.28; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before {\n    opacity: 0.08; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n    background-color: #1565c0; }\n    @supports not (-ms-ime-align: auto) {\n      :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected::after {\n        /* @alternate */\n        background-color: var(--mdc-theme-primary, #1565c0); } }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:hover::before {\n    opacity: 0.12; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before, :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before {\n    transition-duration: 75ms;\n    opacity: 0.2; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded)::after {\n    transition: opacity 150ms linear; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after {\n    transition-duration: 75ms;\n    opacity: 0.24; }\n  :not(.mdc-list--non-interactive) > :not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded {\n    --mdc-ripple-fg-opacity: 0.24; }\n\na.mdc-list-item {\n  color: inherit;\n  text-decoration: none; }\n\n.mdc-list-divider {\n  height: 0;\n  margin: 0;\n  border: none;\n  border-bottom-width: 1px;\n  border-bottom-style: solid; }\n\n.mdc-list-divider {\n  border-bottom-color: rgba(0, 0, 0, 0.12); }\n\n.mdc-list-divider--padded {\n  margin: 0 16px; }\n\n.mdc-list-divider--inset {\n  /* @noflip */\n  margin-left: 72px;\n  /* @noflip */\n  margin-right: 0;\n  width: calc(100% - 72px); }\n  .mdc-list-group[dir=\"rtl\"] .mdc-list-divider--inset,\n  [dir=\"rtl\"] .mdc-list-group .mdc-list-divider--inset {\n    /* @noflip */\n    margin-left: 0;\n    /* @noflip */\n    margin-right: 72px; }\n\n.mdc-list-divider--inset.mdc-list-divider--padded {\n  width: calc(100% - 72px - 16px); }\n\n.mdc-list-group .mdc-list {\n  padding: 0; }\n\n.mdc-list-group__subheader {\n  font-family: unset;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  font-size: 1rem;\n  line-height: 1.75rem;\n  font-weight: 400;\n  letter-spacing: 0.00937em;\n  text-decoration: inherit;\n  text-transform: inherit;\n  margin: 0.75rem 16px; }\n\n.mdc-list-group__subheader {\n  color: rgba(0, 0, 0, 0.87);\n  /* @alternate */\n  color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n\n.mdc-menu-surface {\n  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);\n  background-color: #fff;\n  /* @alternate */\n  background-color: var(--mdc-theme-surface, #fff);\n  color: #000;\n  /* @alternate */\n  color: var(--mdc-theme-on-surface, #000);\n  /* @noflip */\n  transform-origin-left: top left;\n  /* @noflip */\n  transform-origin-right: top right;\n  border-radius: 4px;\n  display: none;\n  position: absolute;\n  box-sizing: border-box;\n  max-width: calc(100vw - 32px);\n  max-height: calc(100vh - 32px);\n  margin: 0;\n  padding: 0;\n  transform: scale(1);\n  transform-origin: top left;\n  opacity: 0;\n  overflow: auto;\n  will-change: transform, opacity;\n  z-index: 4; }\n  [dir=\"rtl\"] .mdc-menu-surface, .mdc-menu-surface[dir=\"rtl\"] {\n    /* @noflip */\n    transform-origin-left: top right;\n    /* @noflip */\n    transform-origin-right: top left; }\n  .mdc-menu-surface:focus {\n    outline: none; }\n  .mdc-menu-surface--animating-open {\n    display: inline-block;\n    transform: scale(0.8);\n    transition: opacity 0.03s linear, transform 0.12s cubic-bezier(0, 0, 0.2, 1);\n    opacity: 0; }\n  .mdc-menu-surface--open {\n    display: inline-block;\n    transform: scale(1);\n    opacity: 1; }\n  .mdc-menu-surface--animating-closed {\n    display: inline-block;\n    transition: opacity 0.075s linear;\n    opacity: 0; }\n\n.mdc-menu-surface--anchor {\n  position: relative;\n  overflow: visible; }\n\n.mdc-menu-surface--fixed {\n  position: fixed; }\n\n.mdc-menu {\n  min-width: 112px; }\n  .mdc-menu .mdc-list-item__meta {\n    color: rgba(0, 0, 0, 0.87);\n    /* @alternate */\n    color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n  .mdc-menu .mdc-list-item__graphic {\n    color: rgba(0, 0, 0, 0.87);\n    /* @alternate */\n    color: var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87)); }\n  .mdc-menu .mdc-list-divider {\n    margin: 8px 0; }\n  .mdc-menu .mdc-list-item {\n    cursor: pointer;\n    user-select: none; }\n  .mdc-menu .mdc-list-item--disabled {\n    cursor: auto; }\n  .mdc-menu a.mdc-list-item .mdc-list-item__text,\n  .mdc-menu a.mdc-list-item .mdc-list-item__graphic {\n    pointer-events: none; }\n\n.mdc-menu__selection-group {\n  padding: 0;\n  fill: currentColor; }\n  .mdc-menu__selection-group .mdc-list-item {\n    /* @noflip */\n    padding-left: 56px;\n    /* @noflip */\n    padding-right: 0; }\n    [dir=\"rtl\"] .mdc-menu__selection-group .mdc-list-item, .mdc-menu__selection-group .mdc-list-item[dir=\"rtl\"] {\n      /* @noflip */\n      padding-left: 0;\n      /* @noflip */\n      padding-right: 56px; }\n\n.mdc-menu__selection-group-icon {\n  /* @noflip */\n  left: 16px;\n  /* @noflip */\n  right: initial;\n  display: none;\n  position: absolute; }\n  [dir=\"rtl\"] .mdc-menu__selection-group-icon, .mdc-menu__selection-group-icon[dir=\"rtl\"] {\n    /* @noflip */\n    left: initial;\n    /* @noflip */\n    right: 16px; }\n\n.mdc-menu-item--selected .mdc-menu__selection-group-icon {\n  display: inline; }\n\n/* Custom */\n/*\n.foo-button {\n    @include mdc-button-ink-color(#1565c0);\n    @include mdc-button-outline-color(#5e92f3);\n    @include mdc-states(#1565c0);\n}\n*/\n", ""]);

// exports


/***/ }),

/***/ "../../../node_modules/css-loader/lib/css-base.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader/lib/css-base.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../node_modules/css-loader/lib/url/escape.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/css-loader/lib/url/escape.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "../../../node_modules/expose-loader/index.js?$!../../../node_modules/jquery/dist/jquery.js-exposed":
/*!***************************************************************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/expose-loader?$!/home/frank/DATA/Development/ipnav-py37/node_modules/jquery/dist/jquery.js-exposed ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["$"] = __webpack_require__(/*! -!./jquery.js */ "../../../node_modules/jquery/dist/jquery.js");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/font-awesome/css/font-awesome.css":
/*!**********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/font-awesome/css/font-awesome.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader!../../sass-loader/lib/loader.js??ref--8-2!./font-awesome.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../node_modules/font-awesome/css/font-awesome.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "../../../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../../../node_modules/font-awesome/font/fontawesome-webfont.eot":
/*!******************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/font-awesome/font/fontawesome-webfont.eot ***!
  \******************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ae23ad29b67289a1375d2043e289c52.eot";

/***/ }),

/***/ "../../../node_modules/font-awesome/font/fontawesome-webfont.eot?v=3.2.1":
/*!**************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/font-awesome/font/fontawesome-webfont.eot?v=3.2.1 ***!
  \**************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5ae23ad29b67289a1375d2043e289c52.eot";

/***/ }),

/***/ "../../../node_modules/font-awesome/font/fontawesome-webfont.svg":
/*!******************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/font-awesome/font/fontawesome-webfont.svg ***!
  \******************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f99a231ed57ee113b50b1c3e9f9fcdc3.svg";

/***/ }),

/***/ "../../../node_modules/font-awesome/font/fontawesome-webfont.ttf?v=3.2.1":
/*!**************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/font-awesome/font/fontawesome-webfont.ttf?v=3.2.1 ***!
  \**************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8cca2f02b0af2da365ff4d1755f29146.ttf";

/***/ }),

/***/ "../../../node_modules/font-awesome/font/fontawesome-webfont.woff?v=3.2.1":
/*!***************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/font-awesome/font/fontawesome-webfont.woff?v=3.2.1 ***!
  \***************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b683029bafe0305ac2234038a03e1541.woff";

/***/ }),

/***/ "../../../node_modules/jquery/dist/jquery.js":
/*!**********************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/jquery/dist/jquery.js ***!
  \**********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "../../../node_modules/jquery/dist/jquery.js-exposed":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/jquery/dist/jquery.js-exposed ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["jQuery"] = __webpack_require__(/*! -!/home/frank/DATA/Development/ipnav-py37/node_modules/expose-loader?$!./jquery.js */ "../../../node_modules/expose-loader/index.js?$!../../../node_modules/jquery/dist/jquery.js-exposed");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/purl/purl.js":
/*!*************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/purl/purl.js ***!
  \*************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */

;(function(factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
})(function() {

    var tag2attr = {
            a       : 'href',
            img     : 'src',
            form    : 'action',
            base    : 'href',
            script  : 'src',
            iframe  : 'src',
            link    : 'href',
            embed   : 'src',
            object  : 'data'
        },

        key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

        aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability

        parser = {
            strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
            loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
        },

        isint = /^[0-9]+$/;

    function parseUri( url, strictMode ) {
        var str = decodeURI( url ),
        res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
        uri = { attr : {}, param : {}, seg : {} },
        i   = 14;

        while ( i-- ) {
            uri.attr[ key[i] ] = res[i] || '';
        }

        // build query and fragment parameters
        uri.param['query'] = parseString(uri.attr['query']);
        uri.param['fragment'] = parseString(uri.attr['fragment']);

        // split path and fragement into segments
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');

        // compile a 'base' domain attribute
        uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';

        return uri;
    }

    function getAttrName( elm ) {
        var tn = elm.tagName;
        if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
        return tn;
    }

    function promote(parent, key) {
        if (parent[key].length === 0) return parent[key] = {};
        var t = {};
        for (var i in parent[key]) t[i] = parent[key][i];
        parent[key] = t;
        return t;
    }

    function parse(parts, parent, key, val) {
        var part = parts.shift();
        if (!part) {
            if (isArray(parent[key])) {
                parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
                parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [parent[key], val];
            }
        } else {
            var obj = parent[key] = parent[key] || [];
            if (']' == part) {
                if (isArray(obj)) {
                    if ('' !== val) obj.push(val);
                } else if ('object' == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [parent[key], val];
                }
            } else if (~part.indexOf(']')) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
                // key
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }

    function merge(parent, key, val) {
        if (~key.indexOf(']')) {
            var parts = key.split('[');
            parse(parts, parent, 'base', val);
        } else {
            if (!isint.test(key) && isArray(parent.base)) {
                var t = {};
                for (var k in parent.base) t[k] = parent.base[k];
                parent.base = t;
            }
            if (key !== '') {
                set(parent.base, key, val);
            }
        }
        return parent;
    }

    function parseString(str) {
        return reduce(String(str).split(/&|;/), function(ret, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, ' '));
            } catch(e) {
                // ignore
            }
            var eql = pair.indexOf('='),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length);

            val = val.substr(val.indexOf('=') + 1, val.length);

            if (key === '') {
                key = pair;
                val = '';
            }

            return merge(ret, key, val);
        }, { base: {} }).base;
    }

    function set(obj, key, val) {
        var v = obj[key];
        if (typeof v === 'undefined') {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [v, val];
        }
    }

    function lastBraceInKey(str) {
        var len = str.length,
            brace,
            c;
        for (var i = 0; i < len; ++i) {
            c = str[i];
            if (']' == c) brace = false;
            if ('[' == c) brace = true;
            if ('=' == c && !brace) return i;
        }
    }

    function reduce(obj, accumulator){
        var i = 0,
            l = obj.length >> 0,
            curr = arguments[2];
        while (i < l) {
            if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
            ++i;
        }
        return curr;
    }

    function isArray(vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    }

    function keys(obj) {
        var key_array = [];
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) key_array.push(prop);
        }
        return key_array;
    }

    function purl( url, strictMode ) {
        if ( arguments.length === 1 && url === true ) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data : parseUri(url, strictMode),

            // get various attributes from the URI
            attr : function( attr ) {
                attr = aliases[attr] || attr;
                return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    }
    
    purl.jQuery = function($){
        if ($ != null) {
            $.fn.url = function( strictMode ) {
                var url = '';
                if ( this.length ) {
                    url = $(this).attr( getAttrName(this[0]) ) || '';
                }
                return purl( url, strictMode );
            };

            $.url = purl;
        }
    };

    purl.jQuery(window.jQuery);

    return purl;

});


/***/ }),

/***/ "../../../node_modules/sprintf-js/src/sprintf.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/sprintf-js/src/sprintf.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (true) {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line


/***/ }),

/***/ "../../../node_modules/style-loader/lib/addStyles.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/style-loader/lib/addStyles.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../../../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../../../node_modules/style-loader/lib/urls.js":
/*!*************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/style-loader/lib/urls.js ***!
  \*************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/camelize.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/camelize.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");
var decap = __webpack_require__(/*! ./decapitalize */ "../../../node_modules/underscore.string/decapitalize.js");

module.exports = function camelize(str, decapitalize) {
  str = trim(str).replace(/[-_\s]+(.)?/g, function(match, c) {
    return c ? c.toUpperCase() : '';
  });

  if (decapitalize === true) {
    return decap(str);
  } else {
    return str;
  }
};


/***/ }),

/***/ "../../../node_modules/underscore.string/capitalize.js":
/*!********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/capitalize.js ***!
  \********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function capitalize(str, lowercaseRest) {
  str = makeString(str);
  var remainingChars = !lowercaseRest ? str.slice(1) : str.slice(1).toLowerCase();

  return str.charAt(0).toUpperCase() + remainingChars;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/chars.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/chars.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function chars(str) {
  return makeString(str).split('');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/chop.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/chop.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function chop(str, step) {
  if (str == null) return [];
  str = String(str);
  step = ~~step;
  return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
};


/***/ }),

/***/ "../../../node_modules/underscore.string/classify.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/classify.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(/*! ./capitalize */ "../../../node_modules/underscore.string/capitalize.js");
var camelize = __webpack_require__(/*! ./camelize */ "../../../node_modules/underscore.string/camelize.js");
var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function classify(str) {
  str = makeString(str);
  return capitalize(camelize(str.replace(/[\W_]/g, ' ')).replace(/\s/g, ''));
};


/***/ }),

/***/ "../../../node_modules/underscore.string/clean.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/clean.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");

module.exports = function clean(str) {
  return trim(str).replace(/\s\s+/g, ' ');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/cleanDiacritics.js":
/*!*************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/cleanDiacritics.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

var from  = 'ąàáäâãåæăćčĉęèéëêĝĥìíïîĵłľńňòóöőôõðøśșşšŝťțţŭùúüűûñÿýçżźž',
  to    = 'aaaaaaaaaccceeeeeghiiiijllnnoooooooossssstttuuuuuunyyczzz';

from += from.toUpperCase();
to += to.toUpperCase();

to = to.split('');

// for tokens requireing multitoken output
from += 'ß';
to.push('ss');


module.exports = function cleanDiacritics(str) {
  return makeString(str).replace(/.{1}/g, function(c){
    var index = from.indexOf(c);
    return index === -1 ? c : to[index];
  });
};


/***/ }),

/***/ "../../../node_modules/underscore.string/count.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/count.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function(str, substr) {
  str = makeString(str);
  substr = makeString(substr);

  if (str.length === 0 || substr.length === 0) return 0;
  
  return str.split(substr).length - 1;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/dasherize.js":
/*!*******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/dasherize.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");

module.exports = function dasherize(str) {
  return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
};


/***/ }),

/***/ "../../../node_modules/underscore.string/decapitalize.js":
/*!**********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/decapitalize.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function decapitalize(str) {
  str = makeString(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/dedent.js":
/*!****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/dedent.js ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

function getIndent(str) {
  var matches = str.match(/^[\s\\t]*/gm);
  var indent = matches[0].length;
  
  for (var i = 1; i < matches.length; i++) {
    indent = Math.min(matches[i].length, indent);
  }

  return indent;
}

module.exports = function dedent(str, pattern) {
  str = makeString(str);
  var indent = getIndent(str);
  var reg;

  if (indent === 0) return str;

  if (typeof pattern === 'string') {
    reg = new RegExp('^' + pattern, 'gm');
  } else {
    reg = new RegExp('^[ \\t]{' + indent + '}', 'gm');
  }

  return str.replace(reg, '');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/endsWith.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/endsWith.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var toPositive = __webpack_require__(/*! ./helper/toPositive */ "../../../node_modules/underscore.string/helper/toPositive.js");

module.exports = function endsWith(str, ends, position) {
  str = makeString(str);
  ends = '' + ends;
  if (typeof position == 'undefined') {
    position = str.length - ends.length;
  } else {
    position = Math.min(toPositive(position), str.length) - ends.length;
  }
  return position >= 0 && str.indexOf(ends, position) === position;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/escapeHTML.js":
/*!********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/escapeHTML.js ***!
  \********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var escapeChars = __webpack_require__(/*! ./helper/escapeChars */ "../../../node_modules/underscore.string/helper/escapeChars.js");

var regexString = '[';
for(var key in escapeChars) {
  regexString += key;
}
regexString += ']';

var regex = new RegExp( regexString, 'g');

module.exports = function escapeHTML(str) {

  return makeString(str).replace(regex, function(m) {
    return '&' + escapeChars[m] + ';';
  });
};


/***/ }),

/***/ "../../../node_modules/underscore.string/exports.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/exports.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function() {
  var result = {};

  for (var prop in this) {
    if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse|join|map|wrap)$/)) continue;
    result[prop] = this[prop];
  }

  return result;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/adjacent.js":
/*!*************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/adjacent.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function adjacent(str, direction) {
  str = makeString(str);
  if (str.length === 0) {
    return '';
  }
  return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length - 1) + direction);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/defaultToWhiteSpace.js":
/*!************************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/defaultToWhiteSpace.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var escapeRegExp = __webpack_require__(/*! ./escapeRegExp */ "../../../node_modules/underscore.string/helper/escapeRegExp.js");

module.exports = function defaultToWhiteSpace(characters) {
  if (characters == null)
    return '\\s';
  else if (characters.source)
    return characters.source;
  else
    return '[' + escapeRegExp(characters) + ']';
};


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/escapeChars.js":
/*!****************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/escapeChars.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/* We're explicitly defining the list of entities we want to escape.
nbsp is an HTML entity, but we don't want to escape all space characters in a string, hence its omission in this map.

*/
var escapeChars = {
  '¢' : 'cent',
  '£' : 'pound',
  '¥' : 'yen',
  '€': 'euro',
  '©' :'copy',
  '®' : 'reg',
  '<' : 'lt',
  '>' : 'gt',
  '"' : 'quot',
  '&' : 'amp',
  '\'' : '#39'
};

module.exports = escapeChars;


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/escapeRegExp.js":
/*!*****************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/escapeRegExp.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function escapeRegExp(str) {
  return makeString(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/htmlEntities.js":
/*!*****************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/htmlEntities.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/*
We're explicitly defining the list of entities that might see in escape HTML strings
*/
var htmlEntities = {
  nbsp: ' ',
  cent: '¢',
  pound: '£',
  yen: '¥',
  euro: '€',
  copy: '©',
  reg: '®',
  lt: '<',
  gt: '>',
  quot: '"',
  amp: '&',
  apos: '\''
};

module.exports = htmlEntities;


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/makeString.js":
/*!***************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/makeString.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/**
 * Ensure some object is a coerced to a string
 **/
module.exports = function makeString(object) {
  if (object == null) return '';
  return '' + object;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/strRepeat.js":
/*!**************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/strRepeat.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function strRepeat(str, qty){
  if (qty < 1) return '';
  var result = '';
  while (qty > 0) {
    if (qty & 1) result += str;
    qty >>= 1, str += str;
  }
  return result;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/helper/toPositive.js":
/*!***************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/helper/toPositive.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function toPositive(number) {
  return number < 0 ? 0 : (+number || 0);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/humanize.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/humanize.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var capitalize = __webpack_require__(/*! ./capitalize */ "../../../node_modules/underscore.string/capitalize.js");
var underscored = __webpack_require__(/*! ./underscored */ "../../../node_modules/underscore.string/underscored.js");
var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");

module.exports = function humanize(str) {
  return capitalize(trim(underscored(str).replace(/_id$/, '').replace(/_/g, ' ')));
};


/***/ }),

/***/ "../../../node_modules/underscore.string/include.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/include.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function include(str, needle) {
  if (needle === '') return true;
  return makeString(str).indexOf(needle) !== -1;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/index.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* Underscore.string
* (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
* Underscore.string is freely distributable under the terms of the MIT license.
* Documentation: https://github.com/epeli/underscore.string
* Some code is borrowed from MooTools and Alexandru Marasteanu.
* Version '3.3.4'
* @preserve
*/



function s(value) {
  /* jshint validthis: true */
  if (!(this instanceof s)) return new s(value);
  this._wrapped = value;
}

s.VERSION = '3.3.4';

s.isBlank          = __webpack_require__(/*! ./isBlank */ "../../../node_modules/underscore.string/isBlank.js");
s.stripTags        = __webpack_require__(/*! ./stripTags */ "../../../node_modules/underscore.string/stripTags.js");
s.capitalize       = __webpack_require__(/*! ./capitalize */ "../../../node_modules/underscore.string/capitalize.js");
s.decapitalize     = __webpack_require__(/*! ./decapitalize */ "../../../node_modules/underscore.string/decapitalize.js");
s.chop             = __webpack_require__(/*! ./chop */ "../../../node_modules/underscore.string/chop.js");
s.trim             = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");
s.clean            = __webpack_require__(/*! ./clean */ "../../../node_modules/underscore.string/clean.js");
s.cleanDiacritics  = __webpack_require__(/*! ./cleanDiacritics */ "../../../node_modules/underscore.string/cleanDiacritics.js");
s.count            = __webpack_require__(/*! ./count */ "../../../node_modules/underscore.string/count.js");
s.chars            = __webpack_require__(/*! ./chars */ "../../../node_modules/underscore.string/chars.js");
s.swapCase         = __webpack_require__(/*! ./swapCase */ "../../../node_modules/underscore.string/swapCase.js");
s.escapeHTML       = __webpack_require__(/*! ./escapeHTML */ "../../../node_modules/underscore.string/escapeHTML.js");
s.unescapeHTML     = __webpack_require__(/*! ./unescapeHTML */ "../../../node_modules/underscore.string/unescapeHTML.js");
s.splice           = __webpack_require__(/*! ./splice */ "../../../node_modules/underscore.string/splice.js");
s.insert           = __webpack_require__(/*! ./insert */ "../../../node_modules/underscore.string/insert.js");
s.replaceAll       = __webpack_require__(/*! ./replaceAll */ "../../../node_modules/underscore.string/replaceAll.js");
s.include          = __webpack_require__(/*! ./include */ "../../../node_modules/underscore.string/include.js");
s.join             = __webpack_require__(/*! ./join */ "../../../node_modules/underscore.string/join.js");
s.lines            = __webpack_require__(/*! ./lines */ "../../../node_modules/underscore.string/lines.js");
s.dedent           = __webpack_require__(/*! ./dedent */ "../../../node_modules/underscore.string/dedent.js");
s.reverse          = __webpack_require__(/*! ./reverse */ "../../../node_modules/underscore.string/reverse.js");
s.startsWith       = __webpack_require__(/*! ./startsWith */ "../../../node_modules/underscore.string/startsWith.js");
s.endsWith         = __webpack_require__(/*! ./endsWith */ "../../../node_modules/underscore.string/endsWith.js");
s.pred             = __webpack_require__(/*! ./pred */ "../../../node_modules/underscore.string/pred.js");
s.succ             = __webpack_require__(/*! ./succ */ "../../../node_modules/underscore.string/succ.js");
s.titleize         = __webpack_require__(/*! ./titleize */ "../../../node_modules/underscore.string/titleize.js");
s.camelize         = __webpack_require__(/*! ./camelize */ "../../../node_modules/underscore.string/camelize.js");
s.underscored      = __webpack_require__(/*! ./underscored */ "../../../node_modules/underscore.string/underscored.js");
s.dasherize        = __webpack_require__(/*! ./dasherize */ "../../../node_modules/underscore.string/dasherize.js");
s.classify         = __webpack_require__(/*! ./classify */ "../../../node_modules/underscore.string/classify.js");
s.humanize         = __webpack_require__(/*! ./humanize */ "../../../node_modules/underscore.string/humanize.js");
s.ltrim            = __webpack_require__(/*! ./ltrim */ "../../../node_modules/underscore.string/ltrim.js");
s.rtrim            = __webpack_require__(/*! ./rtrim */ "../../../node_modules/underscore.string/rtrim.js");
s.truncate         = __webpack_require__(/*! ./truncate */ "../../../node_modules/underscore.string/truncate.js");
s.prune            = __webpack_require__(/*! ./prune */ "../../../node_modules/underscore.string/prune.js");
s.words            = __webpack_require__(/*! ./words */ "../../../node_modules/underscore.string/words.js");
s.pad              = __webpack_require__(/*! ./pad */ "../../../node_modules/underscore.string/pad.js");
s.lpad             = __webpack_require__(/*! ./lpad */ "../../../node_modules/underscore.string/lpad.js");
s.rpad             = __webpack_require__(/*! ./rpad */ "../../../node_modules/underscore.string/rpad.js");
s.lrpad            = __webpack_require__(/*! ./lrpad */ "../../../node_modules/underscore.string/lrpad.js");
s.sprintf          = __webpack_require__(/*! ./sprintf */ "../../../node_modules/underscore.string/sprintf.js");
s.vsprintf         = __webpack_require__(/*! ./vsprintf */ "../../../node_modules/underscore.string/vsprintf.js");
s.toNumber         = __webpack_require__(/*! ./toNumber */ "../../../node_modules/underscore.string/toNumber.js");
s.numberFormat     = __webpack_require__(/*! ./numberFormat */ "../../../node_modules/underscore.string/numberFormat.js");
s.strRight         = __webpack_require__(/*! ./strRight */ "../../../node_modules/underscore.string/strRight.js");
s.strRightBack     = __webpack_require__(/*! ./strRightBack */ "../../../node_modules/underscore.string/strRightBack.js");
s.strLeft          = __webpack_require__(/*! ./strLeft */ "../../../node_modules/underscore.string/strLeft.js");
s.strLeftBack      = __webpack_require__(/*! ./strLeftBack */ "../../../node_modules/underscore.string/strLeftBack.js");
s.toSentence       = __webpack_require__(/*! ./toSentence */ "../../../node_modules/underscore.string/toSentence.js");
s.toSentenceSerial = __webpack_require__(/*! ./toSentenceSerial */ "../../../node_modules/underscore.string/toSentenceSerial.js");
s.slugify          = __webpack_require__(/*! ./slugify */ "../../../node_modules/underscore.string/slugify.js");
s.surround         = __webpack_require__(/*! ./surround */ "../../../node_modules/underscore.string/surround.js");
s.quote            = __webpack_require__(/*! ./quote */ "../../../node_modules/underscore.string/quote.js");
s.unquote          = __webpack_require__(/*! ./unquote */ "../../../node_modules/underscore.string/unquote.js");
s.repeat           = __webpack_require__(/*! ./repeat */ "../../../node_modules/underscore.string/repeat.js");
s.naturalCmp       = __webpack_require__(/*! ./naturalCmp */ "../../../node_modules/underscore.string/naturalCmp.js");
s.levenshtein      = __webpack_require__(/*! ./levenshtein */ "../../../node_modules/underscore.string/levenshtein.js");
s.toBoolean        = __webpack_require__(/*! ./toBoolean */ "../../../node_modules/underscore.string/toBoolean.js");
s.exports          = __webpack_require__(/*! ./exports */ "../../../node_modules/underscore.string/exports.js");
s.escapeRegExp     = __webpack_require__(/*! ./helper/escapeRegExp */ "../../../node_modules/underscore.string/helper/escapeRegExp.js");
s.wrap             = __webpack_require__(/*! ./wrap */ "../../../node_modules/underscore.string/wrap.js");
s.map              = __webpack_require__(/*! ./map */ "../../../node_modules/underscore.string/map.js");

// Aliases
s.strip     = s.trim;
s.lstrip    = s.ltrim;
s.rstrip    = s.rtrim;
s.center    = s.lrpad;
s.rjust     = s.lpad;
s.ljust     = s.rpad;
s.contains  = s.include;
s.q         = s.quote;
s.toBool    = s.toBoolean;
s.camelcase = s.camelize;
s.mapChars  = s.map;


// Implement chaining
s.prototype = {
  value: function value() {
    return this._wrapped;
  }
};

function fn2method(key, fn) {
  if (typeof fn !== 'function') return;
  s.prototype[key] = function() {
    var args = [this._wrapped].concat(Array.prototype.slice.call(arguments));
    var res = fn.apply(null, args);
    // if the result is non-string stop the chain and return the value
    return typeof res === 'string' ? new s(res) : res;
  };
}

// Copy functions to instance methods for chaining
for (var key in s) fn2method(key, s[key]);

fn2method('tap', function tap(string, fn) {
  return fn(string);
});

function prototype2method(methodName) {
  fn2method(methodName, function(context) {
    var args = Array.prototype.slice.call(arguments, 1);
    return String.prototype[methodName].apply(context, args);
  });
}

var prototypeMethods = [
  'toUpperCase',
  'toLowerCase',
  'split',
  'replace',
  'slice',
  'substring',
  'substr',
  'concat'
];

for (var method in prototypeMethods) prototype2method(prototypeMethods[method]);


module.exports = s;


/***/ }),

/***/ "../../../node_modules/underscore.string/insert.js":
/*!****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/insert.js ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var splice = __webpack_require__(/*! ./splice */ "../../../node_modules/underscore.string/splice.js");

module.exports = function insert(str, i, substr) {
  return splice(str, i, 0, substr);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/isBlank.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/isBlank.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function isBlank(str) {
  return (/^\s*$/).test(makeString(str));
};


/***/ }),

/***/ "../../../node_modules/underscore.string/join.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/join.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var slice = [].slice;

module.exports = function join() {
  var args = slice.call(arguments),
    separator = args.shift();

  return args.join(makeString(separator));
};


/***/ }),

/***/ "../../../node_modules/underscore.string/levenshtein.js":
/*!*********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/levenshtein.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

/**
 * Based on the implementation here: https://github.com/hiddentao/fast-levenshtein
 */
module.exports = function levenshtein(str1, str2) {
  'use strict';
  str1 = makeString(str1);
  str2 = makeString(str2);

  // Short cut cases  
  if (str1 === str2) return 0;
  if (!str1 || !str2) return Math.max(str1.length, str2.length);

  // two rows
  var prevRow = new Array(str2.length + 1);

  // initialise previous row
  for (var i = 0; i < prevRow.length; ++i) {
    prevRow[i] = i;
  }

  // calculate current row distance from previous row
  for (i = 0; i < str1.length; ++i) {
    var nextCol = i + 1;

    for (var j = 0; j < str2.length; ++j) {
      var curCol = nextCol;

      // substution
      nextCol = prevRow[j] + ( (str1.charAt(i) === str2.charAt(j)) ? 0 : 1 );
      // insertion
      var tmp = curCol + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }
      // deletion
      tmp = prevRow[j + 1] + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    }

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  }

  return nextCol;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/lines.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/lines.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function lines(str) {
  if (str == null) return [];
  return String(str).split(/\r\n?|\n/);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/lpad.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/lpad.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pad = __webpack_require__(/*! ./pad */ "../../../node_modules/underscore.string/pad.js");

module.exports = function lpad(str, length, padStr) {
  return pad(str, length, padStr);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/lrpad.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/lrpad.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pad = __webpack_require__(/*! ./pad */ "../../../node_modules/underscore.string/pad.js");

module.exports = function lrpad(str, length, padStr) {
  return pad(str, length, padStr, 'both');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/ltrim.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/ltrim.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var defaultToWhiteSpace = __webpack_require__(/*! ./helper/defaultToWhiteSpace */ "../../../node_modules/underscore.string/helper/defaultToWhiteSpace.js");
var nativeTrimLeft = String.prototype.trimLeft;

module.exports = function ltrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+'), '');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/map.js":
/*!*************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/map.js ***!
  \*************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function(str, callback) {
  str = makeString(str);

  if (str.length === 0 || typeof callback !== 'function') return str;

  return str.replace(/./g, callback);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/naturalCmp.js":
/*!********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/naturalCmp.js ***!
  \********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function naturalCmp(str1, str2) {
  if (str1 == str2) return 0;
  if (!str1) return -1;
  if (!str2) return 1;

  var cmpRegex = /(\.\d+|\d+|\D+)/g,
    tokens1 = String(str1).match(cmpRegex),
    tokens2 = String(str2).match(cmpRegex),
    count = Math.min(tokens1.length, tokens2.length);

  for (var i = 0; i < count; i++) {
    var a = tokens1[i],
      b = tokens2[i];

    if (a !== b) {
      var num1 = +a;
      var num2 = +b;
      if (num1 === num1 && num2 === num2) {
        return num1 > num2 ? 1 : -1;
      }
      return a < b ? -1 : 1;
    }
  }

  if (tokens1.length != tokens2.length)
    return tokens1.length - tokens2.length;

  return str1 < str2 ? -1 : 1;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/numberFormat.js":
/*!**********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/numberFormat.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function numberFormat(number, dec, dsep, tsep) {
  if (isNaN(number) || number == null) return '';

  number = number.toFixed(~~dec);
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/pad.js":
/*!*************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/pad.js ***!
  \*************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var strRepeat = __webpack_require__(/*! ./helper/strRepeat */ "../../../node_modules/underscore.string/helper/strRepeat.js");

module.exports = function pad(str, length, padStr, type) {
  str = makeString(str);
  length = ~~length;

  var padlen = 0;

  if (!padStr)
    padStr = ' ';
  else if (padStr.length > 1)
    padStr = padStr.charAt(0);

  switch (type) {
  case 'right':
    padlen = length - str.length;
    return str + strRepeat(padStr, padlen);
  case 'both':
    padlen = length - str.length;
    return strRepeat(padStr, Math.ceil(padlen / 2)) + str + strRepeat(padStr, Math.floor(padlen / 2));
  default: // 'left'
    padlen = length - str.length;
    return strRepeat(padStr, padlen) + str;
  }
};


/***/ }),

/***/ "../../../node_modules/underscore.string/pred.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/pred.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var adjacent = __webpack_require__(/*! ./helper/adjacent */ "../../../node_modules/underscore.string/helper/adjacent.js");

module.exports = function succ(str) {
  return adjacent(str, -1);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/prune.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/prune.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/**
 * _s.prune: a more elegant version of truncate
 * prune extra chars, never leaving a half-chopped word.
 * @author github.com/rwz
 */
var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var rtrim = __webpack_require__(/*! ./rtrim */ "../../../node_modules/underscore.string/rtrim.js");

module.exports = function prune(str, length, pruneStr) {
  str = makeString(str);
  length = ~~length;
  pruneStr = pruneStr != null ? String(pruneStr) : '...';

  if (str.length <= length) return str;

  var tmpl = function(c) {
      return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' ';
    },
    template = str.slice(0, length + 1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

  if (template.slice(template.length - 2).match(/\w\w/))
    template = template.replace(/\s*\S+$/, '');
  else
    template = rtrim(template.slice(0, template.length - 1));

  return (template + pruneStr).length > str.length ? str : str.slice(0, template.length) + pruneStr;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/quote.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/quote.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var surround = __webpack_require__(/*! ./surround */ "../../../node_modules/underscore.string/surround.js");

module.exports = function quote(str, quoteChar) {
  return surround(str, quoteChar || '"');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/repeat.js":
/*!****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/repeat.js ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var strRepeat = __webpack_require__(/*! ./helper/strRepeat */ "../../../node_modules/underscore.string/helper/strRepeat.js");

module.exports = function repeat(str, qty, separator) {
  str = makeString(str);

  qty = ~~qty;

  // using faster implementation if separator is not needed;
  if (separator == null) return strRepeat(str, qty);

  // this one is about 300x slower in Google Chrome
  /*eslint no-empty: 0*/
  for (var repeat = []; qty > 0; repeat[--qty] = str) {}
  return repeat.join(separator);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/replaceAll.js":
/*!********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/replaceAll.js ***!
  \********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function replaceAll(str, find, replace, ignorecase) {
  var flags = (ignorecase === true)?'gi':'g';
  var reg = new RegExp(find, flags);

  return makeString(str).replace(reg, replace);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/reverse.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/reverse.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var chars = __webpack_require__(/*! ./chars */ "../../../node_modules/underscore.string/chars.js");

module.exports = function reverse(str) {
  return chars(str).reverse().join('');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/rpad.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/rpad.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pad = __webpack_require__(/*! ./pad */ "../../../node_modules/underscore.string/pad.js");

module.exports = function rpad(str, length, padStr) {
  return pad(str, length, padStr, 'right');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/rtrim.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/rtrim.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var defaultToWhiteSpace = __webpack_require__(/*! ./helper/defaultToWhiteSpace */ "../../../node_modules/underscore.string/helper/defaultToWhiteSpace.js");
var nativeTrimRight = String.prototype.trimRight;

module.exports = function rtrim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp(characters + '+$'), '');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/slugify.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/slugify.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");
var dasherize = __webpack_require__(/*! ./dasherize */ "../../../node_modules/underscore.string/dasherize.js");
var cleanDiacritics = __webpack_require__(/*! ./cleanDiacritics */ "../../../node_modules/underscore.string/cleanDiacritics.js");

module.exports = function slugify(str) {
  return trim(dasherize(cleanDiacritics(str).replace(/[^\w\s-]/g, '-').toLowerCase()), '-');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/splice.js":
/*!****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/splice.js ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var chars = __webpack_require__(/*! ./chars */ "../../../node_modules/underscore.string/chars.js");

module.exports = function splice(str, i, howmany, substr) {
  var arr = chars(str);
  arr.splice(~~i, ~~howmany, substr);
  return arr.join('');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/sprintf.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/sprintf.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var deprecate = __webpack_require__(/*! util-deprecate */ "../../../node_modules/util-deprecate/browser.js");

module.exports = deprecate(__webpack_require__(/*! sprintf-js */ "../../../node_modules/sprintf-js/src/sprintf.js").sprintf,
  'sprintf() will be removed in the next major release, use the sprintf-js package instead.');


/***/ }),

/***/ "../../../node_modules/underscore.string/startsWith.js":
/*!********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/startsWith.js ***!
  \********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var toPositive = __webpack_require__(/*! ./helper/toPositive */ "../../../node_modules/underscore.string/helper/toPositive.js");

module.exports = function startsWith(str, starts, position) {
  str = makeString(str);
  starts = '' + starts;
  position = position == null ? 0 : Math.min(toPositive(position), str.length);
  return str.lastIndexOf(starts, position) === position;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/strLeft.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/strLeft.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function strLeft(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/strLeftBack.js":
/*!*********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/strLeftBack.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function strLeftBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = str.lastIndexOf(sep);
  return~ pos ? str.slice(0, pos) : str;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/strRight.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/strRight.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function strRight(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.indexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/strRightBack.js":
/*!**********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/strRightBack.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function strRightBack(str, sep) {
  str = makeString(str);
  sep = makeString(sep);
  var pos = !sep ? -1 : str.lastIndexOf(sep);
  return~ pos ? str.slice(pos + sep.length, str.length) : str;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/stripTags.js":
/*!*******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/stripTags.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function stripTags(str) {
  return makeString(str).replace(/<\/?[^>]+>/g, '');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/succ.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/succ.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var adjacent = __webpack_require__(/*! ./helper/adjacent */ "../../../node_modules/underscore.string/helper/adjacent.js");

module.exports = function succ(str) {
  return adjacent(str, 1);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/surround.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/surround.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function surround(str, wrapper) {
  return [wrapper, str, wrapper].join('');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/swapCase.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/swapCase.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function swapCase(str) {
  return makeString(str).replace(/\S/g, function(c) {
    return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
  });
};


/***/ }),

/***/ "../../../node_modules/underscore.string/titleize.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/titleize.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function titleize(str) {
  return makeString(str).toLowerCase().replace(/(?:^|\s|-)\S/g, function(c) {
    return c.toUpperCase();
  });
};


/***/ }),

/***/ "../../../node_modules/underscore.string/toBoolean.js":
/*!*******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/toBoolean.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");

function boolMatch(s, matchers) {
  var i, matcher, down = s.toLowerCase();
  matchers = [].concat(matchers);
  for (i = 0; i < matchers.length; i += 1) {
    matcher = matchers[i];
    if (!matcher) continue;
    if (matcher.test && matcher.test(s)) return true;
    if (matcher.toLowerCase() === down) return true;
  }
}

module.exports = function toBoolean(str, trueValues, falseValues) {
  if (typeof str === 'number') str = '' + str;
  if (typeof str !== 'string') return !!str;
  str = trim(str);
  if (boolMatch(str, trueValues || ['true', '1'])) return true;
  if (boolMatch(str, falseValues || ['false', '0'])) return false;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/toNumber.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/toNumber.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function toNumber(num, precision) {
  if (num == null) return 0;
  var factor = Math.pow(10, isFinite(precision) ? precision : 0);
  return Math.round(num * factor) / factor;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/toSentence.js":
/*!********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/toSentence.js ***!
  \********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var rtrim = __webpack_require__(/*! ./rtrim */ "../../../node_modules/underscore.string/rtrim.js");

module.exports = function toSentence(array, separator, lastSeparator, serial) {
  separator = separator || ', ';
  lastSeparator = lastSeparator || ' and ';
  var a = array.slice(),
    lastMember = a.pop();

  if (array.length > 2 && serial) lastSeparator = rtrim(separator) + lastSeparator;

  return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/toSentenceSerial.js":
/*!**************************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/toSentenceSerial.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toSentence = __webpack_require__(/*! ./toSentence */ "../../../node_modules/underscore.string/toSentence.js");

module.exports = function toSentenceSerial(array, sep, lastSep) {
  return toSentence(array, sep, lastSep, true);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/trim.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/trim.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var defaultToWhiteSpace = __webpack_require__(/*! ./helper/defaultToWhiteSpace */ "../../../node_modules/underscore.string/helper/defaultToWhiteSpace.js");
var nativeTrim = String.prototype.trim;

module.exports = function trim(str, characters) {
  str = makeString(str);
  if (!characters && nativeTrim) return nativeTrim.call(str);
  characters = defaultToWhiteSpace(characters);
  return str.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
};


/***/ }),

/***/ "../../../node_modules/underscore.string/truncate.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/truncate.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function truncate(str, length, truncateStr) {
  str = makeString(str);
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/underscored.js":
/*!*********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/underscored.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");

module.exports = function underscored(str) {
  return trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};


/***/ }),

/***/ "../../../node_modules/underscore.string/unescapeHTML.js":
/*!**********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/unescapeHTML.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");
var htmlEntities = __webpack_require__(/*! ./helper/htmlEntities */ "../../../node_modules/underscore.string/helper/htmlEntities.js");

module.exports = function unescapeHTML(str) {
  return makeString(str).replace(/\&([^;]+);/g, function(entity, entityCode) {
    var match;

    if (entityCode in htmlEntities) {
      return htmlEntities[entityCode];
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
      return String.fromCharCode(parseInt(match[1], 16));
    /*eslint no-cond-assign: 0*/
    } else if (match = entityCode.match(/^#(\d+)$/)) {
      return String.fromCharCode(~~match[1]);
    } else {
      return entity;
    }
  });
};


/***/ }),

/***/ "../../../node_modules/underscore.string/unquote.js":
/*!*****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/unquote.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function unquote(str, quoteChar) {
  quoteChar = quoteChar || '"';
  if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
    return str.slice(1, str.length - 1);
  else return str;
};


/***/ }),

/***/ "../../../node_modules/underscore.string/vsprintf.js":
/*!******************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/vsprintf.js ***!
  \******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var deprecate = __webpack_require__(/*! util-deprecate */ "../../../node_modules/util-deprecate/browser.js");

module.exports = deprecate(__webpack_require__(/*! sprintf-js */ "../../../node_modules/sprintf-js/src/sprintf.js").vsprintf,
  'vsprintf() will be removed in the next major release, use the sprintf-js package instead.');


/***/ }),

/***/ "../../../node_modules/underscore.string/words.js":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/words.js ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isBlank = __webpack_require__(/*! ./isBlank */ "../../../node_modules/underscore.string/isBlank.js");
var trim = __webpack_require__(/*! ./trim */ "../../../node_modules/underscore.string/trim.js");

module.exports = function words(str, delimiter) {
  if (isBlank(str)) return [];
  return trim(str, delimiter).split(delimiter || /\s+/);
};


/***/ }),

/***/ "../../../node_modules/underscore.string/wrap.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore.string/wrap.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Wrap
// wraps a string by a certain width

var makeString = __webpack_require__(/*! ./helper/makeString */ "../../../node_modules/underscore.string/helper/makeString.js");

module.exports = function wrap(str, options){
  str = makeString(str);
  
  options = options || {};
  
  var width = options.width || 75;
  var seperator = options.seperator || '\n';
  var cut = options.cut || false;
  var preserveSpaces = options.preserveSpaces || false;
  var trailingSpaces = options.trailingSpaces || false;
  
  var result;
  
  if(width <= 0){
    return str;
  }
  
  else if(!cut){
  
    var words = str.split(' ');
    var current_column = 0;
    result = '';
  
    while(words.length > 0){
      
      // if adding a space and the next word would cause this line to be longer than width...
      if(1 + words[0].length + current_column > width){
        //start a new line if this line is not already empty
        if(current_column > 0){
          // add a space at the end of the line is preserveSpaces is true
          if (preserveSpaces){
            result += ' ';
            current_column++;
          }
          // fill the rest of the line with spaces if trailingSpaces option is true
          else if(trailingSpaces){
            while(current_column < width){
              result += ' ';
              current_column++;
            }            
          }
          //start new line
          result += seperator;
          current_column = 0;
        }
      }
  
      // if not at the begining of the line, add a space in front of the word
      if(current_column > 0){
        result += ' ';
        current_column++;
      }
  
      // tack on the next word, update current column, a pop words array
      result += words[0];
      current_column += words[0].length;
      words.shift();
  
    }
  
    // fill the rest of the line with spaces if trailingSpaces option is true
    if(trailingSpaces){
      while(current_column < width){
        result += ' ';
        current_column++;
      }            
    }
  
    return result;
  
  }
  
  else {
  
    var index = 0;
    result = '';
  
    // walk through each character and add seperators where appropriate
    while(index < str.length){
      if(index % width == 0 && index > 0){
        result += seperator;
      }
      result += str.charAt(index);
      index++;
    }
  
    // fill the rest of the line with spaces if trailingSpaces option is true
    if(trailingSpaces){
      while(index % width > 0){
        result += ' ';
        index++;
      }            
    }
    
    return result;
  }
};


/***/ }),

/***/ "../../../node_modules/underscore/underscore.js":
/*!*************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/underscore/underscore.js ***!
  \*************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {}

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return _;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),

/***/ "../../../node_modules/util-deprecate/browser.js":
/*!**************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/node_modules/util-deprecate/browser.js ***!
  \**************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../../../node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "../../../patzilla-ui/navigator/style/app.css":
/*!***********************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/style/app.css ***!
  \***********************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./app.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/navigator/style/app.css");

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

/***/ "../../../patzilla-ui/navigator/style/generic.css":
/*!***************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/style/generic.css ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./generic.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/navigator/style/generic.css");

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

/***/ "../../../patzilla-ui/navigator/style/index.js":
/*!************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/style/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
// -*- coding: utf-8 -*-
// (c) 2018 Andreas Motl <andreas.motl@ip-tools.org>
*/

/* Material Components for the web */
__webpack_require__(/*! ./material.css */ "../../../patzilla-ui/navigator/style/material.css");

/* Generic CSS styles */
__webpack_require__(/*! ./generic.css */ "../../../patzilla-ui/navigator/style/generic.css");

/* Application-specific CSS styles */
__webpack_require__(/*! ./app.css */ "../../../patzilla-ui/navigator/style/app.css");

/***/ }),

/***/ "../../../patzilla-ui/navigator/style/material.css":
/*!****************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/navigator/style/material.css ***!
  \****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!./material.css */ "../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js??ref--8-2!../../../patzilla-ui/navigator/style/material.css");

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

/***/ "../../../patzilla-ui/vendor/lib/jquery.shorten.1.0.js":
/*!********************************************************************************************!*\
  !*** /home/frank/DATA/Development/ipnav-py37/patzilla-ui/vendor/lib/jquery.shorten.1.0.js ***!
  \********************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {/*
 * jQuery Shorten plugin 1.0.0
 *
 * Copyright (c) 2013 Viral Patel
 * http://viralpatel.net
 *
 * Dual licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
	$.fn.shorten = function (settings) {

		var config = {
			showChars: 100,
			ellipsesText: "...",
			moreText: "more",
			lessText: "less"
		};

		if (settings) {
			$.extend(config, settings);
		}

		$(document).off("click", '.morelink');

		$(document).on({ click: function click() {

				var $this = $(this);
				if ($this.hasClass('less')) {
					$this.removeClass('less');
					$this.html(config.moreText);
				} else {
					$this.addClass('less');
					$this.html(config.lessText);
				}
				$this.parent().prev().toggle();
				$this.prev().toggle();
				return false;
			}
		}, '.morelink');

		return this.each(function () {
			var $this = $(this);
			if ($this.hasClass("shortened")) return;

			$this.addClass("shortened");
			var content = $this.html();
			if (content.length > config.showChars) {
				var c = content.substr(0, config.showChars);
				var h = content.substr(config.showChars, content.length - config.showChars);
				var html = c + '<span class="moreellipses">' + config.ellipsesText + ' </span><span class="morecontent"><span>' + h + '</span> <a href="#" class="morelink">' + config.moreText + '</a></span>';
				$this.html(html);
				$(".morecontent span").hide();
			}
		});
	};
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "../../../node_modules/jquery/dist/jquery.js-exposed")))

/***/ })

}]);
//# sourceMappingURL=commons.bundle.js.map