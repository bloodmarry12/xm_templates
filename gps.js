define(function(){
    var err = null;
    var position = null;
    return {
        geolocation: function(callback){
            navigator.geolocation.getCurrentPosition(function(position){
                err = 'ok';
                callback(err, position);
            }, function(positionError){
                err = 'error';
                callback(err, position);
            });
        }
    }
});
