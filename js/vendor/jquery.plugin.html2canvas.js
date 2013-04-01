/**
  @license html2canvas v0.33 <http://html2canvas.hertzen.com>
  Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
  http://www.twitter.com/niklasvh

  Released under MIT License
 */
/*
 * jQuery helper plugin for examples and tests
 */
 
(function( $ ) {
  $.fn.html2canvas = function(options) {
    if (options && options.profile && window.console && window.console.profile) {
      console.profile();
    }
    var date = new Date(),
    html2obj,
    $message = null,
    timeoutTimer = false,
    timer = date.getTime();
    options = options || {};

    options.onrendered = function( canvas ) {
      var $canvas = $(canvas),
      finishTime = new Date();
      if (options && options.profile && window.console && window.console.profileEnd) {
        console.profileEnd();
      }
      $canvas.css({
        position: 'absolute', 
        left: 0, 
        top: 0
      }).appendTo(document.body);
      
      
      $canvas.hide();
      $canvas.attr("id","MyCanvas");
      //$canvas.siblings().toggle();
      //$(window).click(function(){
      //  $canvas.toggle().siblings().toggle();
      //});
         
      // test if canvas is read-able
      try {
        $canvas[0].toDataURL();
      } 
      catch(e) {
        if ($canvas[0].nodeName.toLowerCase() === "canvas") {
          // TODO, maybe add a bit less offensive way to present this, but still something that can easily be noticed
          alert("Canvas is tainted, unable to read data");
        }
      }
    };
     
    html2obj = html2canvas(this, options);
  };
})( jQuery );
