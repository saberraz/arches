define(['jquery', 
    'backbone', 
    'knockout',
    'knockout-mapping', 
    'underscore',
    'models/config'
], function ($, Backbone, ko, koMapping, _, ConfigModel) {
    return Backbone.View.extend({

        initialize: function() {
            var self = this;
            this.form = this.$el;

            // parse then restringify JSON data to ensure whitespace is identical
            this._rawdata = ko.toJSON(JSON.parse(this.form.find('#tiledata').val()));
            this.tiles = koMapping.fromJS(JSON.parse(this._rawdata));

        },

        saveTile: function(cardid, data, e){
            console.log(ko.toJS(data));
            var model = new ConfigModel(ko.toJS(data));
            model.save(function(request, status, model){
                if(request.status === 200){
                    if(!(cardid in this)){
                        this[cardid] = koMapping.fromJS([]);
                    }
                    this[cardid].push(koMapping.fromJS(request.responseJSON));
                }
            }, this);
        },

        updateTile: function(cardid, data, e){
            console.log(ko.toJS(data));
            var model = new ConfigModel(ko.toJS(data));
            model.save();
        },

        deleteTile: function(tiles, data, e){
            console.log(ko.toJSON(data));
            tiles.remove(data);
        },

        cancelEdit: function(data, e){
            console.log(ko.toJSON(data));
        },

        expandTile: function(data, e){
            console.log(ko.toJSON(data));
            if(!self.collapsing){
                $(e.currentTarget).find('.effect').show('slow');
            }else{
                self.collapsing = false;
            }
        },

        collapseTile: function(data, e){
            console.log(ko.toJSON(data));
            $(e.currentTarget.parentElement).hide('slow');
            self.collapsing = true;
        }
    });
});