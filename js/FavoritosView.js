var FavoritosView = Backbone.View.extend({

    initialize:function () {
        // console.log('initialize de favoritosView');
        this.render();
    },

    render:function () {
        // console.log('render de favoritosView');
        // console.log(JSON.stringify(this.model));
                
        //this.$el.html(this.template(this.model.toJSON()));
        this.$el.html(this.template());
        
        var listaFav;
        if(this.model.fetchComplete===1) {
//            console.log(this.model);
            listaFav = this.model.obtenerFavoritos();
            // console.log(listaFav);
            _.each(listaFav.models, 
                function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
                this);
                
            $('.cargando_eventos', this.el).hide();
            $('.eventos_cargados', this.el).show();
            
        } else {
            // espera q la lista se cargue completamente
            var contexto = this;
            this.model.on("fcomplete", function() {
//                console.log(contexto.model);
//                console.log('fetch complete recogido');
                listaFav = contexto.model.obtenerFavoritos();
                
                _.each(listaFav.models, 
                    function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
                    this);

                $('.cargando_eventos', this.el).hide();
                $('.eventos_cargados', this.el).show();
            });
            
        }
        
        return this;
    },

    events: {
        "click .boton_inicio": "volver_inicio",
        "click .link_eventos": "volver_inicio",
        "click .link_locales": "ver_locales",
        "click .link_prefer": "ver_prefer",
        "click .link_acerca": "ver_acerca",
        "click .menu_salir": "salir",
        
        "click .row.cuadro": "ver_evento"
    },
    
    
    ver_evento: function (event) {
        var id_evento = $(event.currentTarget).attr('data-id'); 
        // console.log("ver evento "+id_evento);
        
        // guarda la posicion del SCROLL en HOME para después volver al mismo lugar
        window.scrollFavor = $('div.guiaeventos').scrollTop();
        
        // añade entrada al historial
        window.historial.push('eventos/'+id_evento);
        // console.log("window.historial: "+window.historial);
        
        //console.log(event);
        Backbone.history.navigate('eventos/'+id_evento, {trigger: true});
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
        
        //console.log(event);
        Backbone.history.navigate('locales', {trigger: true});
    },
    
    ver_prefer: function (event) {        
        // reset historial
        window.historial = ['', 'preferencias'];
        // console.log("window.historial: "+window.historial);
        
        //console.log(event);
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