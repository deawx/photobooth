var photobooth = {
  videoStream: null,
  
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
        video.width('580px');
        $('.blank').remove();
        video.attr('src', window.URL.createObjectURL(localMediaStream));
        photobooth.videoStream = true;
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
  }
}

$('#start').click(function() {
  $('button').prop('disabled', true).attr('class', 'disabled');
  photobooth.stream();
});
