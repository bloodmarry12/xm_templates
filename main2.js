require(['jquery'], function(jQuery){
    var myAdapt = (function($){

        var overlay = $('#adapt_panel'),
            adaptBtn = $('#adapt_button'),
            mask = $('.product_product'),
            items = $('#pick_panel').find('a');

        // 绑定事件
        var init = function(call){

            adaptBtn.on('click', function(e){
                toggle();
            });

            items.on('click', function(e){
                var adapt = $(this).attr('data-adapt'),
                    txt = $(this).attr('data-txt');
                toggle();
                call(adapt, txt);
            });

        };

        // 切换显示隐藏
        var toggle = function(){
            adaptBtn.toggleClass('on');
            mask.toggleClass('adapt_panel_on');
            overlay.toggleClass('visible');
        };

        // 当前选项
        var change = function(e, t){
            adaptBtn.removeClass();
            adaptBtn.addClass(e).text(t);
        };

        return {
            init: init,
            toggle: toggle,
            change: change
        };

    })(jQuery);

    myAdapt.init(function(e, t){
        myAdapt.change(e, t);
    });
});
