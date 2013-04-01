var photobooth = {
  stream: function() {
    window.URL = window.URL || window.webkitURL;
    navigator.getMedia = (navigator.getUserMedia || 
                          navigator.webkitGetUserMedia || 
                          navigator.mozGetUserMedia || 
                          navigator.msGetUserMedia);

    navigator.getMedia(
      // constraints
      {video: true, audio: false},
      
      // successCallback
      function(localMediaStream) {
        var video = $('video');
        video.width('585px');
        $('.blank').remove();
        video.attr('src', window.URL.createObjectURL(localMediaStream));

        photobooth.main(localMediaStream);
      },
      
      // errorCallback
      function(err) {
        if(err.PERMISSION_DENIED == 1) {
          console.log('The user denied permission to use a media device required for the operation. ');
        }
        else if(err.NOT_SUPPORTED_ERROR == 1) {
          console.log('A constraint specified is not supported by the browser.');
        }
        else if(error.MANDATORY_UNSATISFIED_ERROR == 1) {
          console.log('No media tracks of the type specified in the constraints are found.');
        }
      }
    );
  },
  
  canvas2y: 10,
  
  snapshot: function() {
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 284, 204);
    $('<li><img src="' + canvas.toDataURL('image/png') + '"></li>')
     .appendTo($('#strip'));
    
    var canvas2 = document.querySelector('#canvas2');
    var ctx2 = canvas2.getContext('2d');
    ctx2.drawImage(video, 20, photobooth.canvas2y, 284, 204);
    photobooth.canvas2y += 214 ;
  },
  
  main: function(streamObject) {
    var canvas2 = document.querySelector('#canvas2');
    var ctx2 = canvas2.getContext('2d');
    
    ctx2.fillStyle = '#fff';
    ctx2.fillRect(0,0, 404,866);
    
    /*
    // Movie strip background (canvas2 width=404, height=866);
    ctx2.fillStyle = '#2a2a2a';
    ctx2.fillRect(0,0, 404,866);
    ctx2.fillStyle='#fff';
    var squarei = 10;
    while(squarei<860) {
      ctx2.fillRect(10,squarei, 20,20);
      ctx2.fillRect(374,squarei, 20,20);
      squarei += 40;
    }*/
        
    var i = 0;
    var counter = 4;
    var countdown = window.setInterval(
                      function() {
                        if(counter < 1) {
                          photobooth.snapshot();
                          i++;
                          if(i == 4) {
                            window.clearInterval(countdown);
                            
                            // stop video
                            streamObject.stop();
                            $('video').removeAttr('src');
                            
                            // reset stuff
                            $('.countdown').empty();
                            photobooth.canvas2y = 10;
                            $('#start').prop('disabled', false).attr('class', 'not');
                            
                            // put up download instructions
                            $('.download-btn').html('<button id="download"><i class="icon-download"></i>Download</button>');
                            $('<div class="instructions"><h2>Download your photostrip</h2><ol><li>Click the <span class="btn"><i class="icon-download"></i>Download</span> button below to download your photostrip</li> <li>When the Save file box opens, change the file name from "download" to something better like "photostrip.png". <ul><li><span class="strong">Note:</span> The image is a PNG file, so make sure your file name ends with ".png"</li></ul></li></ol></div>').insertAfter('.countdown');
                          }
                          else {
                            counter = 4;
                          }
                        }
                        else {
                          counter--;
                          if(counter == 0) {
                            $('.countdown').html('<i class="icon-camera"></i>');
                          }
                          else {
                            $('.countdown').html(counter);
                          }
                        }
                      },
                      1200
                    );
  },
  
  save: function() {
    var canvas2 = document.querySelector('#canvas2');
    Canvas2Image.saveAsPNG(canvas2);
  }
}

$('#start').click(function() {
  $('#strip').empty();
  $('button').prop('disabled', true).attr('class', 'disabled');
  photobooth.stream();
});

$(document).on({
  click: function(e) {
    photobooth.save();
  }
}, '#download');  
