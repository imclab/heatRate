(function( $ ) {
  $.fn.heatRate = function(options) {
  
    // default settings for the plugin
    var settings = $.extend({
      'hue'         :  180,
      'saturation'  :  100,
      'lightness'   :  50,
      'alpha'       :  1,
      'orientation' :  'horizontal',
      'build'       :  'saturation',
      'range'       :  100,
      'start'       :  0
    }, options);

    // getter/setter for the gradient stops
    var stops = '';

    // gets the total rating, so that we can scale individual ratings on the gradient
    var totalRating = settings.data.reduce(function(previousValue, currentValue){
      return previousValue + currentValue;
    });

    var methods = {
      //creates color arrays depending on build settings
      createColorArray: function(type){
        switch (type) {
          case "hue":
            return methods.buildHue();
          case "saturation":
            return methods.buildSaturation();
          case "lightness":
            return methods.buildLight();
          default:
            throw new Error("You did not specify a current build type for the gradient.");
        }
      },

      // builds the hue based on relative values in the data set
      buildHue: function () {
        return $.map(settings.data, function(val, i){
          h = Math.ceil((val / totalRating) * settings.range) + settings.start;
          return methods.setColor(h, settings.saturation, settings.lightness, settings.alpha);
        });
      },

      // builds the saturation based on relative values in the data set
      buildSaturation: function () {
        return $.map(settings.data, function(val, i){
          s = Math.ceil((val / totalRating) * settings.range) + settings.start;
          return methods.setColor(settings.hue, s, settings.lightness, settings.alpha);
        });
      },

      // builds the lightness based on relative values in the data set
      buildLight: function () {
        return $.map(settings.data, function(val, i){
          l = Math.ceil((val / totalRating) * settings.range) + settings.start;
          return methods.setColor(settings.hue, settings.saturation, l, settings.alpha);
        });
      },

      // method to create the HSLa string
      setColor: function(h, s, l, a){
        return 'hsla('+h+', '+s+'%, '+l+'%, '+a+')';
      },

      // method to create the individual stop string
      setStop: function(stopPercentage, stopColor){
        return 'color-stop('+stopPercentage+'%, '+ stopColor +')';
      },

      // builds out the gradient for the rater
      stopIterator: function(_this){
        count = 0;
        colorArray = methods.createColorArray(settings.build);
        ratingSteps = 100 / settings.data.length;

        for ( var i = ratingSteps; i <= 100; i += ratingSteps) {
          stops = stops.concat( methods.setStop(Math.floor(i), colorArray[count]) );
          if(i != 100){
            stops = stops.concat( ', ' );
            _this.append(document.createElement('div'));
          }
          count++;
        }
      },

      init: function(_this){
        methods.stopIterator(_this);
        //_this.css('filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#FFFFFF\', endColorstr=\'#333333\', gradientType=1)');
        _this.css('background','-webkit-gradient(linear, left top, right top, '+ stops +')');
        //_this.css('background-image','-moz-linear-gradient(top left, #FFFFFF 0%, #333333 100%)');
        //_this.css('background-image','-o-linear-gradient(top left, #FFFFFF 0%, #333333 100%)');
      }
    };

    return this.each(function() {
      methods.init( $(this) );
    });

  };
})( jQuery );