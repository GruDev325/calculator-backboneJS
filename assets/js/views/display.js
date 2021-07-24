var app = app || {};

// Display view responsible for rendering of display
app.DisplayView = Backbone.View.extend({

    template: _.template($('#display-template').html()),

    initialize: function () {
        this.bindEvents();
        this.render();
    },

    bindEvents: function () {
        this.listenTo(this.model, 'change:result', this.render, this);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    setValue: function (value) {

    }

});
