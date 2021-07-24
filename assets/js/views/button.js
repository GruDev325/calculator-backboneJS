var app = app || {};

// Button view responsible for rendering of buttons
app.ButtonView = Backbone.View.extend({

    template: _.template($('#button-template').html()),

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});
