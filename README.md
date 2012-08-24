# heatRate
Inspired by this post at [Goodfil.ms](http://goodfil.ms/blog/posts/2012/08/22/why-ratings-systems-dont-work/), heatRate is a simple jQuery plugin that can be used instead of typical 5-star ratings. The goal of heatRate is to let the user see exactly how ratings are made up, rather than just showing averages; all the while keeping the visualization concise, in-line, and flexible. It works best with varied data points.

heatRate just takes a simple 1-dimensional array of your data (any size), and will create a heatmap-like display out of it in HTML and CSS gradients.

## Usage
Just link to the script in your HTML, and pick the div you want to turn into a heatmap. The only required option is the array that you would like to pass to heatRate.
    $('#heatrate').heatRate({
      data: ratingArray
    })

### Options
More documentation to come soon...
    {
      hue         :  180,
      saturation  :  100,
      lightness   :  50,
      alpha       :  1,
      orientation :  'horizontal',
      build       :  'hue',
      range       :  100,
      start       :  0,
      lines       :  true,
      labels      :  false
    }

## Creator
[Ted O'Meara](http://www.intridea.com/about/team/ted-o-meara)

## License
MIT License. See LICENSE for details.

## Copyright
Copyright (c) 2012 Intridea, Inc.