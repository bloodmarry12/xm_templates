require(['jquery', './gps'], function($, gps){

    gps.geolocation(function(err, position){
        if(err == 'ok'){
            var latitude = position.coords.latitude; // 纬度
            var longitude = position.coords.longitude; // 经度
            var timestamp = position.timestamp; // 时间
            var accuracy = position.coords.accuracy; // 精度
            var altitude = position.coords.altitude; // 海拔
            var heading = position.coords.heading; // 移动方向
            var speed = position.coords.speed; // 移动速度
            $('#latitude').text(latitude);
            $('#longitude').text(longitude);
            $('#timestamp').text(timestamp);
            $('#accuracy').text(accuracy);
            $('#heading').text(heading);
            $('#altitude').text(altitude);
            $('#speed').text(speed);
        }else{
            alert('木有启动gps');
        }
    });

});
