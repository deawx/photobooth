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
  
  snapshot: function() {
    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 284, 204);
    $('<li><img src="' + canvas.toDataURL('image/webp') + '"></li>')
     .appendTo($('#strip'));
  },
  
  main: function(streamObject) {
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
                            
                            $('.countdown').empty();
                            $('button').prop('disabled', false).removeClass('disabled');
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
  }
}

$('#start').click(function() {
  $('#strip').empty();
  $('button').prop('disabled', true).attr('class', 'disabled');
  photobooth.stream();
  
  $('video').click(function() {
    photobooth.snapshot();
  });
  
});
