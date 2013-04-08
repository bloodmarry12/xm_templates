require(['jquery'], function(jQuery){
    (function($){
        $(function(){
            var loadingPanl = $('.loading_view');
            var closeBtn = loadingPanl.find('.close');
            var mask = $('.mask');

            closeBtn.on('click', function(e){
                mask.hide();
                loadingPanl.hide();
            });
        });
    })(jQuery);
});
