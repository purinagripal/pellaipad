var EventoListItemView = Backbone.View.extend({

    render:function () {
        /*console.log('evento-model');
        console.log(JSON.stringify(this.model));*/
        $(this.el).html(this.template(this.model.toJSON()));
        
        // pone el icono de la categoria correspondiente
        var ico_categ;
        switch(this.model.attributes.id_categoria) {
            case '1':
                ico_categ = '<i class="fa fa-music"></i>';
                break;
            case '2':
                ico_categ = '<i class="fa fa-star"></i>';
                break;
            case '3':
                ico_categ = '<i class="fa fa-paper-plane"></i>';
                break;
            case '4':
                ico_categ = '<i class="fa fa-comment"></i>';
                break;
            case '5':
                ico_categ = '<i class="fa fa-bicycle"></i>';
                break;
            case '6':
                ico_categ = '<i class="fa fa-child"></i>';
                break;
            default:
                ico_categ = '<i class="fa fa-music"></i>';
        }
        $('.ico-categ', this.el).html(ico_categ);
        
        console.log('id_evento de model en evento list: '+this.model.attributes.id_evento);
        
        // añade la clase q correponde a la categoria del evento
        //this.claseCategoria(this.model.attributes.id_categoria);   
        
        // si es notificacion la marca como tal
        this.mostrarNotificacion(this.model.attributes.id_evento);
        
        return this; // enable chained calls
    },
    
    mostrarNotificacion: function (id_evento) {
        var eventos_notificados = window.localStorage.getItem('ev_notif');
        eventos_notificados = JSON.parse(eventos_notificados);
        
        esNotif = 0;
        for (index = 0; index < eventos_notificados.length; index++) { 
            if( id_evento == eventos_notificados[index]['id_evento'] ) {
                esNotif = 1;
            }
        }
        // si es un evento notificado muestra la campana
        if( esNotif == 1 ) {
            $('.notif.fa-exclamation-circle', this.el).show();
        }
    }
    
//    claseCategoria: function (id_categoria) {
//        $('.row.cuadro', this.el).addClass('categ_'+id_categoria);
//    }
    
    /*events: {
        "click .cuadro": "ver_evento"
    },
    
    ver_evento: function (event) {
        var id_evento = $(event.currentTarget).attr('data-id'); 
        console.log("ver evento "+id_evento);
        //console.log(event);
        Backbone.history.navigate('eventos/'+id_evento, {trigger: true});
    }*/

    
});