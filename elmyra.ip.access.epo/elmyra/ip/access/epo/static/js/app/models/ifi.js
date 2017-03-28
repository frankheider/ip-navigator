// -*- coding: utf-8 -*-
// (c) 2015-2017 Andreas Motl, Elmyra UG

IFIClaimsSearch = DatasourceSearch.extend({
    url: '/api/ifi/published-data/search',
});

IFIClaimsResultEntry = Backbone.Model.extend({
    defaults: {
    },
});

IFIClaimsCrawler = DatasourceCrawler.extend({

    initialize: function(options) {
        log('IFIClaimsCrawler.initialize');
        options = options || {};
        options.datasource = 'ifi';
        this.__proto__.constructor.__super__.initialize.apply(this, arguments);
    },

});



IFIClaimsDocument = Backbone.Model.extend({});

_.extend(IFIClaimsDocument.prototype, OpsHelpers.prototype, OpsBaseModel.prototype, {

    initialize: function(options) {
        log('IFIClaimsDocument.initialize');
        this.set('datasource', 'ifi');
        options = options || {};
        options.datasource = 'ifi';
        this.__proto__.constructor.__super__.initialize.apply(this, arguments);
    },

    url: function() {
        return _.template('/api/ifi/download/<%= document_number %>.json')({ document_number: this.get('document_number')});
    },

    sync: function() {
        var outcome = Backbone.sync.apply(this, arguments);

        // Mungle local attributes to make it almost compliant to OPS model
        this.set(this.get('patent-document'), { silent: true });
        this.unset('patent-document', { silent: true });

        log('IFIClaimsDocument:', this);
        return outcome;
    },

    get_patent_number: function() {
        return this.get('@country') + this.get('@doc-number') + this.get('@kind');
    },

    get_document_number: function() {
        return this.get_patent_number();
    },

    get_document_id: function(node, reference_type, format) {
        /*
         reference_type = publication|application
         format = docdb|epodoc
         */
        //node = node || {'document-id': this};
        node = node || this;
        //log('get_document_id - node:', node, 'reference-type:', reference_type, 'format:', format);
        var document_ids;
        if (reference_type) {
            var reference = reference_type + '-reference';
            document_ids = to_list(node[reference]['document-id']);
        } else {
            document_ids = to_list(node['document-id']);
        }
        //log('document_ids:', document_ids);

        /*
        var document_id = _(document_ids).find(function(item) {
            return item['@document-id-type'] == format;
        });
        */
        var document_id = document_ids[0];
        //log('document_id:', document_id);

        var data = this.flatten_document_id(document_id);
        if (format == 'epodoc') {
            data.fullnumber = data.docnumber;

        } else {
            data.fullnumber = (data.country || '') + (data.docnumber || '') + (data.kind || '');
        }
        data.isodate = isodate_compact_to_verbose(data.date);

        return data;

    },

    flatten_document_id: function(dict) {
        // TODO: not recursive yet
        var newdict = {};
        _(dict).each(function(value, key) {
            if (key == '@document-id-type') {
                key = 'format';
            } else if (key == 'doc-number') {
                key = 'docnumber';
            }
            if (typeof(value) == 'object') {
                var realvalue = value['$t'];
                if (realvalue) {
                    value = realvalue;
                }
            }
            newdict[key] = value;
        });
        return newdict;
    },

    has_full_cycle: function() {
        return !_.isEmpty(this.get('full-cycle'));
    },

    get_full_cycle_numbers: function() {
        return [];
    },


    get_publication_reference: function(format, reference_type) {
        return this.get_document_id(this.get('bibliographic-data'), 'publication', format);
    },
    get_application_reference: function(format, reference_type) {
        return this.get_document_id(this.get('bibliographic-data'), 'application', format);
    },

    get_application_number: function(format) {
        var document_id = this.get_application_reference(format);
        return document_id.fullnumber;
    },

    get_publication_date: function() {
        var publication_reference = this.get_publication_reference('epo');
        return publication_reference.isodate;
    },
    get_application_date: function() {
        var application_reference = this.get_application_reference('epo');
        return application_reference.isodate;
    },

    get_application_references: function(links) {
        var appnumber_epodoc = this.get_application_number('epo');
        var appnumber_original = this.get_application_number('original');
        var entry =
            '<td class="span2">' + (this.get_application_date() || '--') + '</td>' +
                '<td class="span3">' + (appnumber_epodoc || '--') + '</td>' +
                '<td>';
        if (!_.isEmpty(appnumber_original)) {
            entry += 'original: ' + appnumber_original;
        }
        entry += '</td>';
        return entry;
    },

    get_priority_claims: function(links) {
        var _this = this;
        var entries = [];
        var container = this.get('bibliographic-data')['priority-claims'];
        if (container) {
            var nodelist = to_list(container['priority-claim']);
            _(nodelist).each(function(node) {
                var priority_epodoc = _this.get_document_id(node, null, 'epo');
                var priority_original = _this.get_document_id(node, null, 'original');
                if (!_.isEmpty(priority_epodoc)) {
                    var entry =
                        '<td class="span2">' + (priority_epodoc.isodate || '--') + '</td>' +
                            '<td class="span3">' + (priority_epodoc.fullnumber && priority_epodoc.fullnumber || '--') + '</td>' +
                            '<td>';
                    if (!_.isEmpty(priority_original.fullnumber)) {
                        entry += 'original: ' + priority_original.fullnumber;
                    }
                    entry += '</td>';
                    entries.push(entry);
                }
            });
        }
        return entries;
    },


    get_classification_schemes: function() {
        return ['IPC', 'IPC-R', 'CPC', 'UC', 'FI', 'FTERM'];
    },

    get_classifications: function(links) {
        var classifications = {};
        classifications['IPC'] = this.get_classifications_ipc(links);
        classifications['IPC-R'] = this.get_classifications_ipcr(links);
        classifications['CPC'] = this.get_classifications_cpc(links);
        //log('classifications:', classifications);
        return classifications;
    },

    get_classifications_ipc: function(links) {
        return this.get_classifications_generic(this.get('bibliographic-data')['technical-data'], 'classifications-ipc', 'classification-ipc', 'ipc', links);
    },

    get_classifications_ipcr: function(links) {
        return this.get_classifications_generic(this.get('bibliographic-data')['technical-data'], 'classifications-ipcr', 'classification-ipcr', 'ipc', links);
    },

    get_classifications_cpc: function(links) {
        return this.get_classifications_generic(this.get('bibliographic-data')['technical-data'], 'classifications-cpc', 'classification-cpc', 'cpc', links);
    },

    get_classifications_generic: function(technical_data_node, parent_name, child_name, classification_kind, links) {
        var entries = [];
        var container = technical_data_node[parent_name];
        if (container && container[child_name]) {
            var nodelist = to_list(container[child_name]);
            entries = _.map(nodelist, function(node) {
                return node['$t'];
            });
        }

        entries = _(entries).map(function(entry) {
            return entry.substring(0, 15).replace(/ /g, '');
        });

        if (links) {
            entries = this.enrich_links(entries, classification_kind, quotate);
        }
        return entries;
    },

    get_abstract_list: function() {
        var abstract_list = [];
        var languages_seen = [];
        if (this['abstract']) {
            var abstract_node = to_list(this.get('abstract'));
            var abstract_list = abstract_node.map(function(node) {
                var text_nodelist = to_list(node['p']);
                var text = text_nodelist.map(function(node) { return node['$t']; }).join(' ');
                var lang = node['@lang'] ? node['@lang'].toUpperCase() : '';
                var lang_prefix = lang ? '[' + lang + '] ' : '';
                lang && languages_seen.push(lang);
                return lang_prefix + text;
            });
        }
        return abstract_list;
    },

    get_applicants: function(links) {

        try {
            var applicants_root_node = this.get('bibliographic-data')['parties']['applicants'];
        } catch(e) {
            return [];
        }

        // TODO: Not ready yet
        applicants_root_node = applicants_root_node || [];
        var applicants_node = applicants_root_node['applicant'];
        var applicants_list = this.parties_to_list(applicants_node, 'applicant-name');
        if (links) {
            applicants_list = this.enrich_links(applicants_list, 'applicant');
        }
        return applicants_list;

    },

    get_inventors: function(links) {

        try {
            var inventors_root_node = this.get('bibliographic-data')['parties']['inventors'];
        } catch(e) {
            return [];
        }

        // TODO: Not ready yet
        inventors_root_node = inventors_root_node || [];
        var inventors_node_list = to_list(inventors_root_node['inventor']);
        var inventors_list = this.parties_to_list(inventors_node_list);
        //log('inventors_list:', inventors_list);

        if (links) {
            inventors_list = this.enrich_links(inventors_list, 'inventor');
        }
        return inventors_list;

    },

    parties_to_list: function(container) {

        // TODO: check for e.g. "CN104154791B"
        /*
         {
             "@format": "original",
             "@load-source": "docdb",
             "@mxw-id": "PPAR1163690856",
             "@sequence": "1",
             "addressbook": {
                 "last-name": {
                     "$t": "张强"
                 }
             }
         },
         {
             "@format": "original",
             "@load-source": "mxw-smt",
             "@mxw-id": "PPAR1168525008",
             "@sequence": "1",
             "addressbook": {
                 "last-name": {
                     "$t": "ZHANG QIANG"
                 }
             }
         },
        */

        // deserialize list of parties (applicants/inventors) from exchange payload
        var sequence_max = "0";
        var groups = {};
        _.each(container, function(item) {
            var data_format = item['@format'];
            var sequence = item['@sequence'];
            var value = _.string.trim(item['addressbook']['last-name']['$t'], ', ');
            groups[data_format] = groups[data_format] || {};
            groups[data_format][sequence] = value;

            // Optionally get country
            try {
                var country = item['addressbook']['address']['country']['$t'];
                groups[data_format]['country'] = country;
            } catch(e) {
            }

            // Sequence id processing
            if (sequence > sequence_max) {
                sequence_max = sequence;
            }
        });
        //console.log('party-groups:', groups);

        // TODO: somehow display in gui which one is the "epodoc" and which one is the "original" value
        var entries = [];
        _.each(_.range(1, parseInt(sequence_max) + 1), function(sequence) {
            sequence = sequence.toString();

            var epodoc_value = groups['epo'] && groups['epo'][sequence];
            var original_value = groups['original'] && groups['original'][sequence];
            var intermediate_value = groups['intermediate'] && groups['intermediate'][sequence];

            //entries.push(epodoc_value + ' / ' + original_value);
            //entries.push(original_value);

            var canonical_value = epodoc_value || intermediate_value || original_value;

            var entry = {
                display: canonical_value,
                canonical: canonical_value,
                epodoc: epodoc_value,
                original: original_value,
                intermediate: intermediate_value,
            }

            entries.push(entry);
        });

        return entries;

    },

    get_title_list: function() {
        var title_list = [];
        var title_node = this.get('bibliographic-data')['technical-data']['invention-title'];
        if (title_node) {
            title_list = _.map(to_list(title_node), function(title) {
                var lang_prefix = title['@lang'] && '[' + title['@lang'].toUpperCase() + '] ' || '';
                return lang_prefix + title['$t'];
            });
        }
        return title_list;
    },

    has_fulltext: function() {
        return this.get('claims') || this.get('description');
    },

    has_citations: function() {
        return this.get('bibliographic-data') && Boolean(this.get('bibliographic-data')['technical-data']['citations']);
    },

    get_npl_citation_list: function() {
        return [];
    },

});


IFIClaimsFulltext = Marionette.Controller.extend({

    initialize: function(document_number) {
        log('IFIClaimsFulltext.initialize');
        this.document_number = document_number;

        this.description_fragments = [
            {key: 'technical-field', original_label: 'The technical field of', label: 'Technical field'},
            {key: 'background-art', original_label: 'Background technology', label: 'Background technology'},
            {key: 'summary-of-invention.tech-problem', label: 'Summary of invention » Technological problem' },
            {key: 'summary-of-invention.tech-solution', label: 'Summary of invention » Technological solution' },
            {key: 'description-of-embodiments', label: 'Description of embodiments' },
            {key: 'disclosure', original_label: 'The content of invention', label: 'Content of invention' },
            {key: 'description-of-drawings', original_label: 'Specification attached drawing', label: 'Description of drawings' },
            {key: 'mode-for-invention', label: 'Specific implementing manner' },
        ];

    },

    get_claims: function() {

        var _this = this;
        var deferred = $.Deferred();

        var url = _.template('/api/ifi/download/<%= document_number %>.json')({ document_number: this.document_number});
        $.ajax({url: url, async: true})
            .success(function(response) {
                if (response) {
                    log('response:', response);

                    var document = response['patent-document'];

                    if (!document.claims) {
                        deferred.reject({html: 'No data available'});
                        return deferred.promise();
                    }

                    // Serialize claims to HTML
                    var claims_parts = [];

                    _.each(to_list(document.claims), function(claim_container) {
                        // TODO: Offer more languages
                        var lang = claim_container['@lang'];
                        if (_.contains(['EN', 'DE'], lang)) {
                            claims_parts = _this.parse_claim_list(to_list(claim_container.claim));
                            return;
                        }
                    });

                    var data = {
                        html: claims_parts.join('<br/><br/>'),
                        lang: document.claims['@lang'],
                    };
                    deferred.resolve(data);
                }
            }).error(function(error) {
                console.warn('Error while fetching claims from IFI Claims for', _this.document_number, error);
                deferred.reject({html: 'Error fetching data'});
            });

        return deferred.promise();

    },

    parse_claim_list: function(claim_list) {

        // Universally parse different "claims" structures
        // e.g. FR2853955A1, JPH11195384A, CN104154791B, WO2017016928A1

        var _this = this;
        var claims_parts = [];
        _.each(claim_list, function(claim) {
            var text = _this.parse_claim_text(claim);
            claims_parts.push(text);
        });
        return claims_parts;
    },

    parse_claim_text: function(container) {
        var number;
        var text;
        if (_.isArray(container['claim-text'])) {
            // e.g. RU2015121704A
            return this.parse_claim_list(container['claim-text']).join('<br/>');
        } else if (_.isObject(container['claim-text'])) {
            // e.g. CN104154791B
            number = _.string.ltrim(container['@num'], '0');
            text = _.string.ltrim(container['claim-text']['$t']);
        } else {
            // e.g. WO2017016928A1
            text = container['$t'];
        }

        var result = text;

        // Fix redundant number prefix
        if (number) {
            if (_.string.startsWith(text, number)) {
                if (_.string.startsWith(text, number + ' ')) {
                    text = text.replace(number + ' ', '');
                } else if (_.string.startsWith(text, number + '. ')) {
                    text = text.replace(number + '. ', '');
                } else if (_.string.startsWith(text, number + '.\t')) {
                    text = text.replace(number + '.\t', '');
                }
            }
            result = number + '. ' + text;
        }

        // JPH11195384A
        if (_.string.contains(text, '< Claim 1 >')) {
            result = text.replace(/(< Claim \d+ >)/g, '<br/><br/>$1<br/>');
        }

        return result;
    },

    get_description: function() {

        var _this = this;
        var deferred = $.Deferred();

        var url = _.template('/api/ifi/download/<%= document_number %>.json')({ document_number: this.document_number});
        $.ajax({url: url, async: true})
            .success(function(response) {
                if (response) {
                    //log('response:', response);

                    var document = response['patent-document'];

                    if (!document.description) {
                        deferred.reject({html: 'No data available'});
                        return deferred.promise();
                    }

                    // Serialize description to HTML
                    var description_parts = [];

                    _.each(to_list(document.description), function(description_container) {
                        // TODO: Offer more languages than just "EN"
                        var lang = description_container['@lang'];
                        if (lang == 'EN') {
                            description_parts = _this.parse_description_container(description_container);
                            return;
                        }
                    });
                    //log('description_parts:', description_parts);

                    var data = {
                        html: description_parts.join('<br/><br/>'),
                        lang: document.description['@lang'],
                    };
                    deferred.resolve(data);
                }

            }).error(function(error) {
                console.warn('Error while fetching description from IFI Claims for', _this.document_number, error);
                deferred.reject({html: 'Error fetching data'});
            });

        return deferred.promise();

    },

    parse_description_container: function(description_container) {

        // Universally parse different "description" structures
        // e.g. KR20150133732A, CN104154791A, CN105674358A, IN2010KN01168A, IN2015CH00356A

        var _this = this;

        var description_parts = [];

        // "p" node is a list of entries
        if (description_container.p) {
            description_parts = this.parse_description_list(description_container.p);

        // Description container contains section nodes
        } else {
            // Follow order of fragments
            _.each(this.description_fragments, function(fragment_spec) {
                var fragment_name = fragment_spec['key'];
                try {
                    var value = dotted_reference(description_container, fragment_name);
                    //log(fragment_name, value);
                    if (!value) {
                        return;
                    }
                    description_parts = description_parts.concat(_this.parse_description_list(value.p, fragment_spec));
                } catch(ex) {
                    // pass
                }
            });
        }
        return description_parts;
    },

    parse_description_list: function(description_list, fragment_spec) {
        var _this = this;
        var description_parts = [];

        // Parse text fragments from description list
        var index = 0;
        _.each(to_list(description_list), function(part) {
            var text = _this.parse_description_text(part, fragment_spec, index);
            description_parts.push(text);
            index++;
        });

        // Resolve sections encoded into text captions, e.g. CN105674358A
        description_parts = _.map(description_parts, function(text) {
            if (_.string.startsWith(text, '【 ')) {
                text = _.string.capitalize(text.replace('【 ', '').replace(' 】', ''));
                _.each(_this.description_fragments, function(fragment_spec) {
                    if (fragment_spec.original_label == text) {
                        text = _this.parse_description_text({'$t': text}, fragment_spec, 0);
                    }
                });
            }
            return text;
        });

        return description_parts;
    },

    parse_description_text: function(part, fragment_spec, index) {

        var heading = '';
        var text = part['$t'];

        // When first index carries caption, perform rewording and emphasis
        if (fragment_spec && index == 0) {

            // When text carries caption, perform
            if (fragment_spec.original_label == text) {

                // a) rewording
                text = text.replace(fragment_spec.original_label, fragment_spec.label);
            }

            if (fragment_spec.label == text) {
                // b) emphasize
                heading = '<b>' + text + '</b>';
                text = '';
            } else {
                heading = '<b>' + fragment_spec.label + '</b>' + '<br/><br/>';
            }

        }

        if (part['@num']) {
            text = '[' + part['@num'] + '] ' + text;
        }

        // JPH11195384A
        if (_.string.contains(text, '< 0001 >')) {
            text = text.replace(/(< \d+ >)/g, '<br/><br/>$1<br/>');
        }

        return heading + text;
    },

});
