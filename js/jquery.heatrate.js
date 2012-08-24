(function( $ ) {
  $.fn.heatRate = function(options) {
  
    // default settings for the plugin
    var settings = $.extend({
      'hue'         :  180,
      'saturation'  :  100,
      'lightness'   :  50,
      'alpha'       :  1,
      'orientation' :  'horizontal',
      'build'       :  'hue',
      'range'       :  100,
      'start'       :  0,
      'lines'       :  true,
      'labels'      :  false
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
        return stopColor+' '+stopPercentage+'%';
      },

      // builds out the gradient for the rater
      stopIterator: function(_this){
        var count = 0;
        colorArray = methods.createColorArray(settings.build);
        ratingSteps = 100 / (settings.data.length - 1);

        for ( var i = 0; i <= 100; i += ratingSteps) {
          stops = stops.concat( methods.setStop(Math.floor(i), colorArray[count]) );
          settings.labels === true ? methods.buildLabels(_this, count+1, i) : null;
          i != 100 ? stops = stops.concat( ', ' ) : null;
          if(i < 100 - ratingSteps){
            settings.lines === true ? methods.measureLines(_this, count) : null;
          }
          count++;
        }
      },

      // create lines to show the ratings
      measureLines: function(_this, count){
        div = document.createElement('div');
        _this.append(div);
        $(div).css('width', ratingSteps+'%');
      },

      buildLabels: function(_this, label, position){
        rateLabel = document.createElement('span');
        _this.append(rateLabel);
        $(rateLabel).text(label);
        _this.css({
          'position' : 'relative'
        });
        $(rateLabel).css({
          'position': 'absolute',
          'top': '100%',
          'left': position+'%'
        });
      },

      init: function(_this){
        methods.stopIterator(_this);
        _this.css('background','-webkit-linear-gradient(left, '+ stops +')');
        _this.css('background','-moz-linear-gradient(left, '+ stops +')');
        _this.css('background','-o-linear-gradient(left, '+ stops +')');
        _this.css('background','-ms-linear-gradient(left, '+ stops +')');
        _this.css('background','linear-gradient(to right, '+ stops +')');
      }
    };

    return this.each(function() {
      methods.init( $(this) );
    });

  };
})( jQuery );