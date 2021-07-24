var app = app || {};

// App view responsible for rendering app
app.AppView = Backbone.View.extend({

    el: $('#calculator'),

    template: _.template($('#app-template').html()),

    initialize: function() {
        this.render();
    },

    render: function() {
        this.$el.html(this.template());
        this.bindEvents();
        this.renderDisplay();
        this.renderButtons();
        return this;
    },

    bindEvents: function() {
        this.listenTo(this.model, 'change', this.onCalculatorChange, this);
    },

    onCalculatorChange: function() {
        this.displayView.setValue(this.model.get('result'));
    },

    renderDisplay: function() {
        this.displayView = new app.DisplayView({
            model: this.model
        });
        this.$('.display').append(this.displayView.el);
    },

    renderButtons: function() {
        var i = 10;
        this.buttons = {};
        while (i--) {
            if (i == 0) {
                this.renderButton({
                    value: i,
                    viewClass: 'btn-' + i,
                    buttonClass: 'span2'
                });
            } else {
                this.renderButton({
                    value: i,
                    viewClass: 'btn-' + i,
                    buttonClass: 'span1'
                });
            }
        }
        this.renderButton({
            value: 'M+',
            viewClass: 'btn-memoryPlus',
            buttonClass: 'span1 btn-warning'
        });
        this.renderButton({
            value: 'M-',
            viewClass: 'btn-memoryMinus',
            buttonClass: 'span1 btn-warning'
        });
        this.renderButton({
            value: 'MRC',
            viewClass: 'btn-memoryRecallClear',
            buttonClass: 'span1 btn-warning'
        });
        this.renderButton({
            value: '+/-',
            viewClass: 'btn-sign',
            buttonClass: 'span1 btn-warning'
        });

        this.renderButton({
            value: '/',
            viewClass: 'btn-divide',
            buttonClass: 'span1 btn-info'
        });
        this.renderButton({
            value: '+',
            viewClass: 'btn-plus',
            buttonClass: 'span1 plus btn-info'
        });
        this.renderButton({
            value: '-',
            viewClass: 'btn-minus',
            buttonClass: 'span1 btn-info'
        });
        this.renderButton({
            value: '%',
            viewClass: 'btn-percentage',
            buttonClass: 'span1 btn-info'
        });
        this.renderButton({
            value: '√',
            viewClass: 'btn-root',
            buttonClass: 'span1 btn-info'
        });
        this.renderButton({
            value: '.',
            viewClass: 'btn-dot',
            buttonClass: 'span1'
        });
        this.renderButton({
            value: '*',
            viewClass: 'btn-multiply',
            buttonClass: 'span1 btn-info'
        });
        this.renderButton({
            value: '=',
            viewClass: 'btn-return',
            buttonClass: 'span1 offset1 btn-info'
        });
        this.renderButton({
            value: 'C',
            viewClass: 'btn-clear',
            buttonClass: 'span1 btn-danger'
        });
    },

    renderButton: function(options) {

        options.viewClass = options.viewClass || options.value;

        this.buttons[options.value] = new app.ButtonView({
            model: new app.Button({
                value: options.value,
                className: options.buttonClass
            })
        });
        this.$('.' + options.viewClass).append(this.buttons[options.value].el);
    },

    events: {
        'click .btn': 'onButtonClick'
    },

    onButtonClick: function(e) {
        var value = $(e.currentTarget).data('value');
        this.model.command(value);
    }

});