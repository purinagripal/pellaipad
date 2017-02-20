var AcercaView = Backbone.View.extend({
    
    template: Handlebars.compile($("#acerca-tpl").html()),
    
    render:function () {
        console.log("render acerca");
        $(this.el).html(this.template());
        return this; 
    },
    
    events: {
        "click .boton_inicio": "volver_inicio",
        "click .boton_atras": "volver_atras",
        
        "click .link_eventos": "volver_inicio",
        "click .link_locales": "ver_locales",
        "click .link_favoritos": "ver_favoritos",
        "click .link_prefer":    "ver_prefer",
        
        "click .link_privacy":   "link_privacy",
        "click .link_condic":   "link_condic",
        "click .link_ayuda":   "link_ayuda",
    },
    
    link_condic: function (event) {
        var ref = cordova.InAppBrowser.open('http://pelladeocio.com/condiciones', '_blank');
    },
    
    link_privacy: function (event) {
        var ref = cordova.InAppBrowser.open('http://pelladeocio.com/privacidad', '_blank');
    },
    
    link_ayuda: function (event) {
        var ref = cordova.InAppBrowser.open('http://pelladeocio.com/appayuda', '_blank');
    },
    
    ///////////////////////////////////////
    //
    //    ENLACES DEL MENU SUPERIOR
    //
    
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
    
    volver_atras: function (event) {
        // saca elemento del historial y vuelve al anterior
        window.historial.pop();
        // console.log("window.historial: "+window.historial);
        Backbone.history.navigate( window.historial[window.historial.length-1], {trigger: true} );
        
    },
    
    volver_inicio: function (event) {
        // resetea el historial
        window.historial = [""];
        // console.log("window.historial: "+window.historial);
        Backbone.history.navigate( "", {trigger: true} );
    }
});