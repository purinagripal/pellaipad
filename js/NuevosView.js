var NuevosView = Backbone.View.extend({

    initialize:function () {
        this.$el.html(this.template());
        this.render();
    },

    render:function () {
        return this;
    },

    events: {
        "click .boton_inicio": "volver_inicio",
        "click #boton_todos": "volver_inicio",
        "click .link_eventos": "volver_inicio",
        "click .link_locales": "ver_locales",
        "click .link_favoritos": "ver_favoritos",
        "click .link_prefer": "ver_prefer",
        "click .link_acerca": "ver_acerca",
        "click .menu_salir": "salir",
        "click .row.cuadro": "ver_evento",
    },
    
    cargarEventos: function () {
        
        console.log('cargarEventos nuevosView');
        
        // resetea el div
        $('.guiaeventos', this.el).html('');
        
        // añade de nuevo los eventos
        _.each(this.model.models, 
               function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);
        
        $('.cargando_eventos', this.el).hide();
        $('.eventos_cargados', this.el).show();
    },
    
    
    ver_evento: function (event) {
        var id_evento = $(event.currentTarget).attr('data-id'); 
        // console.log("ver evento "+id_evento);
        
        // guarda la posicion del SCROLL en HOME para después volver al mismo lugar
        window.scrollNuevos = $('div.eventos_cargados').scrollTop();
        
        // añade entrada al historial
        window.historial.push('eventos/'+id_evento);
        // console.log("window.historial: "+window.historial);
        
        //// console.log(event);
        Backbone.history.navigate('nuevoevento/'+id_evento, {trigger: true});
    },
    
    ///////////////////////////////////////
    //
    //    ENLACES DEL MENU SUPERIOR
    //
    
    volver_inicio: function (event) {
        // resetea el historial
        window.historial = [""];
        // console.log("window.historial: "+window.historial);
        Backbone.history.navigate('', {trigger: true});
    },
    
    ver_locales: function (event) {        
        // reset historial
        window.historial = ['', 'locales'];
        // console.log("window.historial: "+window.historial);
        
        //// console.log(event);
        Backbone.history.navigate('locales', {trigger: true});
    },
    
    ver_favoritos: function (event) {        
        // reset historial
        window.historial = ['', 'favoritos'];
        // console.log("window.historial: "+window.historial);
        
        //// console.log(event);
        Backbone.history.navigate('favoritos', {trigger: true});
    },
    
    ver_prefer: function (event) {        
        // reset historial
        window.historial = ['', 'preferencias'];
        // console.log("window.historial: "+window.historial);
        
        //// console.log(event);
        Backbone.history.navigate('preferencias', {trigger: true});
    },
    
    ver_acerca: function (event) {        
        // reset historial
        window.historial = ['', 'acerca'];
        // console.log("window.historial: "+window.historial);
        
        //// console.log(event);
        Backbone.history.navigate('acerca', {trigger: true});
    },

    salir: function (event) {
        // console.log("SALIR");
        navigator.app.exitApp();
    }
});