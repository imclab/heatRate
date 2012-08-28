# heatRate
Inspired by this post at [Goodfil.ms](http://goodfil.ms/blog/posts/2012/08/22/why-ratings-systems-dont-work/), heatRate is a simple jQuery plugin that can be used instead of typical 5-star ratings. The goal of heatRate is to let the user see exactly how ratings are made up, rather than just showing averages; all the while keeping the visualization concise, in-line, and flexible. It works best with varied data points.

<img style="margin-left:2px" src="http://f.cl.ly/items/100e1S402w1W3U3B091R/Image%202012.08.28%2010:50:41%20AM.png" />

<img src="http://f.cl.ly/items/0O2m3s2k0h2d2K2e0d0Q/Image%202012.08.24%205:34:34%20PM.png" />

heatRate just takes a simple 1-dimensional array of your data, and will create a heatmap-like display out of it in HTML and CSS gradients.

## Usage
Just link to the script in your HTML, and pick the div you want to turn into a heatmap. The only required option is the array that you would like to pass to heatRate.

    $('#heatrate').heatRate({
      data: ratingArray
    })

### Options

Defaults are shown below:

    {
      hue         :  180,
      saturation  :  100,
      lightness   :  50,
      alpha       :  1,
      build       :  'hue',
      range       :  100,
      start       :  0,
      lines       :  true,
      labels      :  false
    }

* `hue` - the color that you'd like to use when building the gradient with lightness or saturation.
* `saturation` - the saturation that will be used when building with hue or lightness.
* `lightness` - brightness/darkness that will be used when building with hue or saturation.
* `alpha` - a float between 0 and 1 to add tranparency to the gradient.
* `build` - can either be `hue`, `saturation`, or `lightness`. This is the dimension that the dataset will be evaluated against.
* `range` - a number that will change the contrast between values.
* `start` - the number (color, saturation, lightness) at which you would like the visualization to start. Can be used for any build.
* `lines` - a boolean that adds `<div>` within the containing element. These can be styled to show where the data points are.
* `labels` - a boolean that if true, will add number labels to the order of data points.

## Creator
[Ted O'Meara](http://www.intridea.com/about/team/ted-o-meara)

## License
MIT License. See LICENSE for details.

## Copyright
Copyright (c) 2012 Intridea, Inc.