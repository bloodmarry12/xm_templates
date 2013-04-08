(function($){
    $(function(){
        var lottery = {
            userId: '',
            init: function(){
                if(!this.isLogin()){
                    this.showLogin();
                    return;
                }
                if(this.isEmpty()){
                    alert('米粉朋友您没有可参与抽奖的订单！');
                    $('#loginOk').hide();
                    $('#join').show();
                    return;
                }
            },
            showLogin: function(){
                alert('请登录小米账号');
                $('#loginOk').hide();
                $('#login').show();
                $('#loginBtn').click(function(){
                    util.doLogin();
                    return false;
                });
            },
            isLogin: function(){
                var userId = util.getCookie('userId');
                if(!!userId){
                    this.userId = userId;
                    return true;
                }else{
                    return false;
                }
            },
            isEmpty: function(){
                var items = $('.select').find('option').length;
                if(items == 1){
                    return true;
                }else{
                    return false;
                }
            },
//            getItems: function(){
//                console.log('获取有资格订单');
//                var options = {
//                    url: 'v1/mfn/query',
//                    type: 'GET'
//                };
//                this.getAjax(options, function(e, data){
//                    if(e){
//                        console.log('获取有资格订单接口访问成功'+data.description);
//                    }else{
//                        console.log('获取有资格订单接口访问失败'+data.description);
//                    }
//                });
//            },
            postItem: function(id){
                var options = {
                    url: '/mifanday/default/Roulette',
                    param: {order_id: id},
                    type: 'POST'
                };
                this.getAjax(options, function(e, data){
                    if(e){
//                        console.log('发送抽奖订单信息');
                        var status, info, data;
                        data = JSON.parse(data);
                        status = data.status;
                        info = data.info;
                        if(status > 0){
                            lottery.showPrize(status, info);
                        }else{
                            lottery.showTips(status, info);
                        }
                    }else{
                        setTimeout(function(){ location.reload(); },2000);
                    }
                });
            },
            getAjax: function(options, callback){
                var opt = options;
                opt.client_id = '1801000000';
                opt.user_id = '2706923';
                opt.root = opt.url;
                opt.root = opt.root + '?client_id=' + opt.client_id + '&user_id=' + opt.user_id ;
//                console.log('请求的URL：'+opt.root);

                var err = false;
                $.ajax({
                    url: opt.root,
                    data: opt.param,
                    type: opt.type,
                    success: function(res){
                        var err = true;
                        callback(err, res);
                    },
                    error: function(){
                        var err = false;
                        callback(err);
                        alert('米粉朋友服务器开小差，您再刷新试试！');
                    }
                });
            },
//            render: function(){
//                var items = [-1,-2,-3,-4,-5,0,1,2,3,4,5];
//                var select = document.createElement('select');
//                for(var i=0, k=items.length; i<k; i+=1){
//                    var option = document.createElement('option');
//                    $(option).attr('value', items[i]).text(items[i]).appendTo(select);
//                }
//                $('#items').find('.option').attr('data-value', items[0]).text(items[0]);
//                $('#items').find('.select').append(select);
//                $(select).on('change', function(){
//                    $('#items').find('.option').attr('data-value', $(this).val()).text($(this).val());
//                });
//            },
            showTips: function(s, tips){
                var status = s,
                    info = tips,
                    ge = $('#lottery_get'),
                    no = $('#lottery_no'),
                    ye = $('#lottery_ye');
                no.show().find('#tips').html(info);
                ge.hide();
                ye.hide();
            },
            showPrize: function(s, tips){
                var status = s,
                    info = tips,
                    ge = $('#lottery_get'),
                    no = $('#lottery_no'),
                    ye = $('#lottery_ye'),
                    src = 'http://p.www.xiaomi.com/zt/130403/card_'+status+'.png?'+Math.round(Math.random()*10000);

                ye.show().find('#prize').attr('src', src);
                ye.find('#name').html(info);
                ge.hide();
                no.hide();
            }
        };

        $('#order_id').change(function(){
            $('#items').find('.option').attr('data-value', $(this).val()).text($(this).val());
        });

        $('#sj').click(function(e){
            var order_id = $('select').val();
            lottery.postItem(order_id);
            return false;
        });

        lottery.init();
    });
})(jQuery);
