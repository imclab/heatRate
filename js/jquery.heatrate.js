(function( $ ) {
  $.fn.heatRate = function(options) {
  
    // default settings for the plugin
    var settings = $.extend({
      'hue'         :  180,
      'saturation'  :  100,
      'lightness'   :  50,
      'alpha'       :  1,
      'orientation' :  'horizontal'
    }, options);

    var stops = '';
    var totalRating = settings.data.reduce(function(previousValue, currentValue){
      return previousValue + currentValue;
    });

    var methods = {
      createColorArray: function(){
        return $.map(settings.data, function(val, i){
          saturation = ( totalRating - (totalRating - val) ) * 10;
          return methods.setColor(settings.hue, saturation, settings.lightness, settings.alpha);
        });
      },

      setColor: function(h, s, l, a){
        return 'hsla('+h+', '+s+'%, '+l+'%, '+a+')';
      },

      setStop: function(stopPercentage, stopColor){
        return 'color-stop('+stopPercentage+'%, '+ stopColor +')';
      },

      init: function(t){
        count = 0;
        colorArray = methods.createColorArray();
        ratingSteps = 100 / settings.data.length;

        for ( var i = ratingSteps; i <= 100; i += ratingSteps) {
          stops = stops.concat( methods.setStop(i, colorArray[count]) );
          if(i != 100){
            stops = stops.concat( ', ' );
            t.append(document.createElement('div'));
          }
          count++;
        }
      }
    };

    return this.each(function() {
      var $this = $(this);

      // iterate through the ratings and create stops for the gradient
      methods.init($this);
      //$this.css('filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#FFFFFF\', endColorstr=\'#333333\', gradientType=1)');
      $this.css('background','-webkit-gradient(linear, left top, right top, '+ stops +')');
      //$this.css('background-image','-moz-linear-gradient(top left, #FFFFFF 0%, #333333 100%)');
      //$this.css('background-image','-o-linear-gradient(top left, #FFFFFF 0%, #333333 100%)');

    });

  };
})( jQuery );