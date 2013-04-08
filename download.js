define(['jquery'], function($){

    var isInstall = false;
    var addele, viewport, d, c, isFirst;

    addele = $('<div class="appad"><p>app download</p><a href="javascript:;" class="close">close</a></div>');
    viewport = $('.viewport');
    isFirst = sessionStorage.getItem('_xmappad') || false;

    return {
        init: function( ready ){
            if( !ready ){
                if(!isFirst || isFirst == '0'){
                    viewport.prepend(addele);

                    d = $('.appad');
                    c = d.find('.close');
                    e = d.find('p');

                    c.on('click', function(e){
                        d.animate({
                            'height': 0
                        },function(){
                            $(this).remove();
                        });
                        sessionStorage.setItem('_xmappad', '1');
                    });

                    sessionStorage.setItem('_xmappad', '0');
                }
            }
        }
    }
});
