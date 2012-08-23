(function( $ ) {
  $.fn.heatRate = function(options) {
  
    // default settings for the plugin
    var settings = $.extend({
      'maxRating'      :  5,
      'color'       :  '#FFFFFF',
      'orientation' :  'horizontal'
    }, options);

    return this.each(function() {
      var $this = $(this);
      var stops = '';

      // iterate through the ratings and create stops for the gradient
      for ( var i = 0; i <= 100; i += (100 / settings.maxRating) ) {
        stops = stops.concat( 'color-stop('+i+'%, '+ settings.color +')' );
        if(i != 100){
          stops = stops.concat( ', ' );
        }
      }

      //$this.css('filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#FFFFFF\', endColorstr=\'#333333\', gradientType=1)');
      $this.css('background','-webkit-gradient(linear, left top, right top, '+ stops +')');
      //$this.css('background-image','-moz-linear-gradient(top left, #FFFFFF 0%, #333333 100%)');
      //$this.css('background-image','-o-linear-gradient(top left, #FFFFFF 0%, #333333 100%)');

    });

  };
})( jQuery );