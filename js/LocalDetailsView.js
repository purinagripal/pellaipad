var LocalDetailsView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        console.log("render de local details view");
        
        // Eventor.resume: pasar de \r\n a <br>
        var descripcionBr = (this.model.attributes.Eventor.resume + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br>' +'$2');
        this.model.attributes.Eventor.resumeBr = descripcionBr;
        
        // Eventor.horario: pasar de \r\n a <br>
        if(this.model.attributes.Eventor.horario) {
            var horarioBr = (this.model.attributes.Eventor.horario + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ '<br>' +'$2');
            this.model.attributes.Eventor.horarioBr = horarioBr;
        }
        
        this.$el.html(this.template(this.model.toJSON()));
        console.log('this.model.toJSON');
        console.log(this.model.toJSON());
        
        //console.log("con this.el");
        //console.log($('#map-canvas', this.el)[0]);
        
        var datosModelo = this.model.attributes;
        console.log(datosModelo);
        
        var div_canvas = $('#local-map-canvas', this.el)[0];
        
        var myLatlng = new google.maps.LatLng(datosModelo.Eventor.lat, datosModelo.Eventor.long); 
        window.mapOptions = { 
            zoom: 17, 
            center: myLatlng,
            streetViewControl: false,
            styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]}],
            draggable: false
        }; 
        window.map = new google.maps.Map(div_canvas, window.mapOptions);
        window.marker = new google.maps.Marker({ 
            position: myLatlng, 
            map: window.map, 
            title: 'titulo'
        });
        
        
        
        //console.log(window.map);

        //console.log(this.model);
        
        return this;
    },
    
    events: {
    }
    
});