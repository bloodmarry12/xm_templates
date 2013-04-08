require(['jquery', 'domReady', './download'], function($, domReady, dl){
    
    domReady(function(){
        var ready = false;
        dl.init(ready);
    });

});
