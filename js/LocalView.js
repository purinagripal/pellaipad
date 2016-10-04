var LocalView = Backbone.View.extend({

    initialize:function () {
        
    },

    render:function () {
        console.log('render de local');
                
        this.primerEvento = this.collection.at(0);
        
        this.$el.html(this.template(this.primerEvento.toJSON()));
        
        $('.localDetails', this.el).html(new LocalDetailsView({model: this.primerEvento}).render().el);
                
        _.each(this.collection.models, 
               function (evento) {$('.guiaeventos', this.el).append(new EventoListItemView({model: evento}).render().el);}, 
               this);
        return this;
    },

    
    events: {
        "click .boton_inicio": "volver_inicio",
        "click .link_eventos": "volver_inicio",
        "click .link_locales": "ver_locales",
        "click .link_favoritos": "ver_favoritos",
        "click .link_prefer": "ver_prefer",
        
        "click a.link_web": "ver_web",
        "click #local-map-canvas": "ver_bigmap",
        "click .link_bigmap": "ver_bigmap",
        
        "click .boton_atras": "volver_atras",
        "click .menu_salir": "salir",
        
        "click .guiaeventos.eventoslocal .cuadro": "l_ver_evento"
    },
    
    ver_web: function (event) {
        var ref = cordova.InAppBrowser.open('http://'+this.primerEvento.attributes.Eventor.web_link, '_blank');
    },
    
    l_ver_evento: function (event) {
        console.log("ver evento dsd local, antes de data-id");
        var id_evento = $(event.currentTarget).attr('data-id'); 
        console.log("ver evento dsd local "+id_evento);
        //console.log(event);
        
        // añade entrada al historial
        window.historial.push('eventos/'+id_evento);
        console.log("window.historial: "+window.historial);

        Backbone.history.navigate('eventos/'+id_evento, {trigger: true});
    },
    
    ver_bigmap: function (event) {
        var id_local = this.primerEvento.attributes.id_user;
        // añade entrada al historial
        window.historial.push('mapaLocal/'+id_local);
        console.log("window.historial: "+window.historial);

        Backbone.history.navigate('mapaLocal/'+id_local, {trigger: true});
    },
    
    ///////////////////////////////////////
    //
    //    ENLACES DEL MENU SUPERIOR
    //
    
     ver_locales: function (event) {        
        // resetea el historial
        window.historial = ['', 'locales'];
        console.log("window.historial: "+window.historial);
        
        //console.log(event);
        Backbone.history.navigate('locales', {trigger: true});
    },
    
    ver_favoritos: function (event) {        
        // reset historial
        window.historial = ['', 'favoritos'];
        console.log("window.historial: "+window.historial);
        
        //console.log(event);
        Backbone.history.navigate('favoritos', {trigger: true});
    },
    
    ver_prefer: function (event) {        
        // reset historial
        window.historial = ['', 'preferencias'];
        console.log("window.historial: "+window.historial);
        
        //console.log(event);
        Backbone.history.navigate('preferencias', {trigger: true});
    },
    
    volver_inicio: function (event) {
        // resetea el historial
        window.historial = [""];
        console.log("window.historial: "+window.historial);
        Backbone.history.navigate( "", {trigger: true} );
    },
    
    volver_atras: function (event) {
        console.log("volver");
        
        // saca elemento del historial y vuelve al anterior
        window.historial.pop();
        console.log("window.historial: "+window.historial);
        Backbone.history.navigate( window.historial[window.historial.length-1], {trigger: true} );
        
        //Backbone.history.history.back();
        // es lo mismo que:
        //window.history.back();
    },
    
    salir: function (event) {
        console.log("SALIR");
        navigator.app.exitApp();
    }

});