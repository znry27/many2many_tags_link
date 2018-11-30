odoo.define('many2many_tags_link.widget', function (require) {
"use strict";

	var core = require('web.core');
	var AbstractField = require('web.AbstractField');
	var registry = require('web.field_registry');
	var relational_fields = require('web.relational_fields');

	var _t = core._t;
	var qweb = core.qweb;

	var FieldMany2ManyTagsLink = relational_fields.FieldMany2ManyTags.extend({
		tag_template: "FieldMany2ManyTagsLink",
		events: _.extend({}, AbstractField.prototype.events, {
	        'click .o_delete': '_onDeleteTag',
	        'click .o_external_link': '_openRelated',
	    }),
		_openRelated: function (event) {	        
	        event.preventDefault();
	        event.stopPropagation();
	        var self = this;
	        
	        var modelid = parseInt(event.currentTarget.getAttribute('modelid'));   

	        if (this.mode === 'readonly' && !this.noOpen && modelid) {	            
	            this._rpc({
	                    model: this.field.relation,
	                    method: 'get_formview_action',
	                    args: [[modelid]],
	                    context: this.record.getContext(this.recordParams),
	                })
	                .then(function (action) {
	                    self.trigger_up('do_action', {action: action});
	                });
	        }
	    },    

	});


	registry
    .add('many2many_tags_link', FieldMany2ManyTagsLink);

    return {
    	FieldMany2ManyTagsLink: FieldMany2ManyTagsLink,
	}

});