// -*- coding: utf-8 -*-
// (c) 2013-2018 Andreas Motl <andreas.motl@ip-tools.org>
require('jquery.shorten.1.0');
var urljoin = require('url-join');
var bootbox = require('bootbox');
var screenfull = require('screenfull');

// NotificationFx
require('notificationfx/css/ns-default');
require('notificationfx/css/ns-style-attached');
require('notificationfx/js/notificationFx');

// Material Design Snackbar
import { SnackbarWidget } from 'patzilla.lib.mdc.snackbar';


const UiController = Backbone.Marionette.ItemView.extend({

    initialize: function() {
        log('UiController.initialize');
    },

    setup_ui: function() {

        var _this = this;

        // ------------------------------------------
        //   generic
        // ------------------------------------------

        // Snackbar notifications
        this.setup_snackbar();

        // apply popovers to all desired buttons
        $('.btn-popover').popover();

        this.setup_text_tools();

        // logout button
        if (navigatorApp.config.get('mode') == 'liveview') {
            $('.logout-button').hide();
        }

        // Switch query interface flavor to expert mode when receiving query via url
        if (navigatorApp.config.get('query')) {
            navigatorApp.queryBuilderView.set_flavor('cql');
        }

        // Switch query interface flavor to expert mode when signalled through url parameter
        if (navigatorApp.config.get('mode') == 'expert') {
            navigatorApp.queryBuilderView.set_flavor('cql');
        }

        // ------------------------------------------
        //   cql query area
        // ------------------------------------------

        // set cursor to end of query string, also focuses element
        //$('#query').caret($('#query').val().length);


        // ------------------------------------------
        //   online help
        // ------------------------------------------

        // Open help in modal dialog
        $('.action-help-shortcuts').off('click');
        $('.action-help-shortcuts').on('click', function() {
            var baseurl = navigatorApp.config.get('baseurl');
            var url = urljoin(baseurl, '/help#hotkeys');
            $(this).attr('href', url);
        });

        $('.action-help-ificlaims').off('click');
        $('.action-help-ificlaims').on('click', function() {
            var baseurl = navigatorApp.config.get('baseurl');
            var url = urljoin(baseurl, '/help#ificlaims');
            $(this).attr('href', url);
        });


        $('.action-fullscreen').off('click');
        $('.action-fullscreen').on('click', function() {
            if (screenfull.enabled) {
                screenfull.request();
            }
        });


        $('.report-issue-feature').off('click');
        $('.report-issue-feature').on('click', function(event) {
            navigatorApp.issues.dialog({
                element: this,
                event: event,
                what: 'feature',
                remark: 'It would be cool, if ...',
                // TODO: What about other targets like "log:error", "log:warning", "human:support", "human:user"?
                targets: 'email:support',
            });
        });

    },

    setup_text_tools: function() {
        // auto-shorten some texts
        $(".very-short").shorten({showChars: 5, moreText: 'more', lessText: 'less'});
    },

    reset_content: function(options) {
        options = options || {};

        $('#info-area').empty();
        //$('#pagination-info').hide();

        if (!options.keep_notifications) {
            $('#alert-area').empty();
        }
        if (!options.keep_pager) {
            //$('.pager-area').hide();
        }
        if (options.documents) {
            navigatorApp.documents.reset();
        }
    },

    indicate_activity: function(active) {
        if (active) {
            $('.idler').hide();
            $('.spinner').show();

        } else {
            $('.spinner').hide();
            $('.idler').show();
        }
    },

    propagate_backend_errors: function(xhr, options) {

        options = options || {};

        log('propagate_backend_errors');

        $('#alert-area').empty();
        try {
            var response = xhr.responseJSON;
            return this.propagate_cornice_errors(response);

        // Display detailed data from XHR response
        } catch (err) {

            console.error('Problem while propagating backend alerts.\nError:', err, '\nResponse:', xhr.responseText);

            // If decoding from JSON fails, make up a JSON error in
            // cornice-compatible format from XHR response information
            var error = xhr_decode_error(xhr, options);
            error.location = 'unknown';

            var response = {
                'status': 'error',
                'errors': [error],
            };
            return this.propagate_cornice_errors(response);

        }

    },

    propagate_cornice_errors: function(response) {
        log('propagate_cornice_errors');
        var _this = this;

        // FIXME: Uncaught TypeError: Cannot read property 'status' of undefined
        if (response['status'] == 'error') {
            _.each(response['errors'], function(error) {

                console.error('Backend error:', error);

                if (_.isString(error.description)) {
                    var tpl = require('./error-cornice.html');
                    //error.description = {content: error.description};

                } else if (_.isObject(error.description)) {

                    // Flavor 1: Handle objects with error.description.content
                    // Convert simple error format to detailed error format
                    if (error.description.content) {
                        var tpl = require('./error-backend.html');
                        error.description = error.description || {};
                        _(error.description).defaults({headers: {}});

                        // Beautifier
                        if (error.description.content) {
                            error.description.content = _.string.dedent(_.string.strip(_.string.stripTags(error.description.content)))
                        }

                    // Flavor 2: Handle objects with error.description.details
                    // Unwrap rich description
                    } else {
                        var tpl = require('./error-cornice.html');
                        error.details = error.description.details;
                        error.description = error.description.user;

                        // Beautifier
                        if (error.details) {
                            error.details = _.string.dedent(_.string.strip(_.string.stripTags(error.details)));
                        }
                        if (error.description) {
                            error.description = _.string.dedent(_.string.strip(_.string.stripTags(error.description)));
                        }

                    }

                }

                // Build error content and display in alert box
                var alert_html = tpl({error: error});
                $('#alert-area').append(alert_html);

                // Display text/html error responses from OPS inside iframe
                var html_error = $('#error-iframe').text();
                if (html_error) {
                    if (_.string.contains(html_error, 'OPS')) {
                        var base_href = '<base href="https://ops.epo.org/" />';
                        html_error = html_error.replace('<head>', '<head>' + base_href);
                    }
                    _this.iframe_write('error-iframe', html_error);
                }

            });
            $('.very-short').shorten({showChars: 0, moreText: 'more', lessText: 'less'});

            navigatorApp.issues.setup_ui();

            return true;
        }
        return false;
    },

    iframe_write: function(element_id, content) {
        var iframe = document.getElementById(element_id);
        iframe = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);
        iframe.document.open();
        iframe.document.write(content);
        iframe.document.close();
    },

    no_results_alert: function(search_info) {
        var query_display = JSON.stringify(search_info.query);
        if (search_info.flavor == 'comfort' &&
            _.isObject(search_info.query_data) && _.isObject(search_info.query_data.criteria)) {
            query_display = JSON.stringify(search_info.query_data.criteria);
        }
        search_info.query_display = query_display;
        var tpl = require('../results/no-results.html');
        var msg = tpl(search_info);
        this.user_alert(msg, 'warning');
    },

    do_element_visibility: function() {

        //log('do_element_visibility', navigatorApp.config);

        // hide all navigational- and action-elements when in print mode
        var MODE_PRINT = navigatorApp.config.get('mode') == 'print';
        if (MODE_PRINT) {
            $('.do-not-print').hide();
        }

        // hide all navigational- and action-elements when in view-only mode
        var MODE_LIVEVIEW = navigatorApp.config.get('mode') == 'liveview';
        if (MODE_LIVEVIEW) {
            $('.non-liveview').hide();
        }
    },

    do_elements_focus: function() {
        if (navigatorApp.documents.length) {
            $('#patentnumber').trigger('blur');
            $('#query').trigger('blur');
        }
    },

    confirm: function(message) {

        var deferred = $.Deferred();

        var dialog = bootbox.confirm('<h4>' + message + '</h4>', function(ack) {
            if (ack) {
                deferred.resolve();
            }
        });

        // style: danger, error
        dialog.css({
            'color': '#b94a48',
            'background-color': '#f2dede',
            'border-color': '#eed3d7',
        });

        return deferred.promise();
    },

    user_alert: function(message, kind, selector) {

        if (!message) {
            return;
        }

        var label = 'INFO';
        var clazz = 'alert-info';
        if (kind == 'success') {
            label = 'SUCCESS';
            clazz = 'alert-success';

        } else if (kind == 'warning') {
            label = 'WARNING';
            clazz = 'alert-warning';

        } else if (kind == 'error') {
            label = 'ERROR';
            clazz = 'alert-danger';

        }

        var tpl = require('./user-alert.html');
        var error = {
            'title': label,
            'description': message,
            'clazz': clazz,
        };
        var alert_html = tpl(error);

        selector = selector || '#info-area';
        $(selector).append(alert_html);
    },

    // Notify user of a thing just happened.
    notify: function(message, options) {
        //return this.notify_fx(message, options);
        return this.notify_snack(message, options);
    },

    work_in_progress: function() {
        this.notify('This feature is a work in progress.');
    },

    // Notifications using the "Snackbar" Material Design Component (MDC).
    // https://material.io/develop/web/components/snackbars/
    setup_snackbar: function() {
        this.snackbar = new SnackbarWidget();
    },

    notify_snack: function(message, options) {
        this.snackbar || this.setup_snackbar();
        this.snackbar.show(message, options);
    },

    // Notifications using the "NotificationFx" component.
    notify_fx: function(message, options) {

        options = options || {};
        options.wrapper = options.wrapper || document.body;

        if (options.icon) {
            message = '<span class="icon ' + options.icon + ' icon-large"></span>' + '<p>' + message + '</p>';
        }
        if (!options.type) {
            options.type = 'notice';
        }

        if (this.notification) {
            this.notification.dismiss();
        }

        // Adjust specific options from theme settings
        var header_layout = navigatorApp.theme.get('ui.header_layout');
        if (header_layout) {
            options.layout = header_layout;
        }

        // Force specific options
        //options.right = true;
        //options.layout = 'wide';

        var layout = 'attached-custom';
        if (options.right) {
            layout = 'attached-right';
        }
        if (options.layout) {
            layout = 'attached-' + options.layout;
        }

        //setTimeout( function() {

            // create the notification
            this.notification = new NotificationFx({
                message : message,
                layout : layout,
                effect : 'bouncyflip',
                //layout : 'box',
                //effect : 'flip',
                type :   options.type, // notice, warning, error, success
                wrapper: options.wrapper,
                onClose : function() {
                    //bttn.disabled = false;
                },
                ttl: 4000,
                //ttl: 100000,
            });

            /*
            if (options.right) {
                this.notification.ntf.className = this.notification.ntf.className.replace('ns-attached', 'ns-attached-right');
            }
            */

            // show the notification
            this.notification.show();

        //}, 1200 );

    },

    // perform animated scrolling
    scroll_smooth: function(target) {

        // Sanity checks
        if (!target) return;
        if (!$(target).exists()) return;

        if ($(target).offset()) {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500);
        }
    },

    scroll_to_document: function(document_number) {
        var selector = 'div[data-document-number="' + document_number + '"]';
        this.scroll_smooth(selector);
    },


    copy_to_clipboard: function(mimetype, payload, options) {
        options = options || {};
        var deferred = $.Deferred();

        var element = options.element;

        //log('copy_to_clipboard: mimetype, payload, options:', mimetype, payload, options);

        // Unwrap jQuery object
        if (element.length !== undefined) {
            element = element[0];
        }

        // Sanity checks
        //if (!element) return;

        // clipboard.js
        var ClipboardJS = require('clipboard');

        var clipboard = new ClipboardJS(element, {
            text: function(trigger) {
                if (_.isFunction(payload)) {
                    payload = payload();
                }
                return payload;
            },
        });

        // For use in Bootstrap Modals or with any other library that changes the focus
        // you'll want to set the focused element as the container value.
        var modal = $(element).closest('.modal');
        if (modal.exists()) {
            clipboard.container = modal[0];
        }

        // Event handlers
        clipboard.on('success', function(event) {
            console.info('Action:', event.action);
            console.info('Text:', event.text);
            console.info('Trigger:', event.trigger);

            if (_.isEmpty(event.text)) {
                var message = "Empty content, nothing copied to clipboard.";
                navigatorApp.ui.notify(message, {type: 'warning', icon: 'icon-copy', wrapper: options.wrapper});
                return;
            }
            var size_value = event.text.length;
            var size_label = 'Bytes';
            if (size_value >= 1000) {
                var size_value = Math.round(size_value / 1000);
                var size_label = 'kB';
            }
            var message = "Copied content to clipboard, size is " + size_value + ' ' + size_label + '.';
            navigatorApp.ui.notify(message, {type: 'success', icon: 'icon-copy', wrapper: options.wrapper});
            if (options.callback) {
                options.callback();
            }

        });

        clipboard.on('error', function(event) {
            var message = "Error copying content to clipboard.";
            console.error(message, event.action, event.trigger);
            navigatorApp.ui.notify(message, {type: 'warning', icon: 'icon-copy', wrapper: options.wrapper});
        });

    },

    /*
    copy_to_clipboard: function(mimetype, payload, options) {
        options = options || {};
        var deferred = $.Deferred();

        // ZeroClipboard
        var ZeroClipboard = require('zeroclipboard/dist/ZeroClipboard.js');
        ZeroClipboard.config({ swfPath: require('zeroclipboard/dist/ZeroClipboard.swf') });

        if (ZeroClipboard.isFlashUnusable()) {
            $(options.element).off('click');
            $(options.element).on('click', function() {
                var message =
                    'Copying data to clipboard not possible, Adobe Flash Player plugin is required.<br/>' +
                    '<a href="https://get.adobe.com/flashplayer/" target="_blank">Install Adobe Flash Player</a>.';
                navigatorApp.ui.notify(message, {type: 'warning', icon: 'icon-copy', wrapper: options.wrapper});
            });
            return;
        }

        var zeroclipboard = new ZeroClipboard(options.element);
        zeroclipboard.on('ready', function(readyEvent) {

            // intercept the copy event to set custom data
            zeroclipboard.on('copy', function(event) {
                var clipboard = event.clipboardData;
                if (_.isFunction(payload)) {
                    payload = payload();
                }
                clipboard.setData(mimetype, payload);
            });

            // when content was copied to clipboard, notify user
            zeroclipboard.on('aftercopy', function(event) {
                // `this` === `client`
                // `event.target` === the element that was clicked
                //event.target.style.display = "none";
                if (_.isEmpty(event.data)) {
                    var message = "Empty content, nothing copied to clipboard.";
                    navigatorApp.ui.notify(message, {type: 'warning', icon: 'icon-copy', wrapper: options.wrapper});
                    return;
                }
                var size_value = event.data[mimetype].length;
                var size_label = 'Bytes';
                if (size_value >= 1000) {
                    var size_value = Math.round(size_value / 1000);
                    var size_label = 'kB';
                }
                var message = "Copied content to clipboard, size is " + size_value + ' ' + size_label + '.';
                navigatorApp.ui.notify(message, {type: 'success', icon: 'icon-copy', wrapper: options.wrapper});
                if (options.callback) {
                    options.callback();
                }
            });

            deferred.resolve(zeroclipboard);

        });
        return deferred.promise();
    },
    */

    copy_to_clipboard_bind_button: function(mimetype, payload, options) {

        // prevent default action on copy button
        $(options.element).off('click').on('click', function(e) {
            e.preventDefault();
        });

        // copy permalink to clipboard
        this.copy_to_clipboard(mimetype, payload, options);

    },

    notify_module_locked: function(modulename) {
        var message = 'The module "' + modulename + '" is not available to your account. Please subscribe to this feature.';
        this.notify(message, {type: 'warning', icon: 'icon-lock'});
    },

    open_email: function(recipient, subject, body) {
        var address_email = 'mailto:' + recipient
        var address_more = 'subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        var address = address_email + '?' + address_more;
        $('<iframe src="' + address + '">').appendTo('body').css('display', 'none');
    },

    pdf_icon: function() {
        return '<img src="/static/img/icons/pdf.svg" class="pdf-svg"/>';
    },

});


// setup controller
navigatorApp.addInitializer(function(options) {

    this.ui = new UiController();

    this.listenTo(this, 'application:ready', function() {
        this.ui.setup_ui();
    });

    this.listenTo(this, 'results:ready', function() {
        this.ui.do_elements_focus();
    });

});
