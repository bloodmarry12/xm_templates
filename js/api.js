(function($){
    $(function(){
        var editor = new ImgEditor();

        var xhr = new XMLHttpRequest();
        xhr.open('post', 'postData.php', true);
        xhr.timeout = 60000;
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200){
                var data = JSON.parse(xhr.responseText);
                if(data.result == 'ok'){
                    util.sucMsg('上传成功');
                    setTimeout(function(){
                        location.href = 'http://p.www.xiaomi.com/m/activities/open/46/130328/weibo.html?'+Math.round(Math.random()*10000);
                    }, 1000);
                }else{
                    util.hideLoad();
                    util.sucMsg('上传失败，刷新后重新上传');
                    setTimeout(function(){location.reload();}, 2000);
                }
            }
        };
        xhr.onloadstart = function(){ util.showLoad(); };
        xhr.ontimeout = function(){
            alert('服务器请求超时了，换一张小点的图!');
            setTimeout(function(){location.reload();}, 1000);
        };

        var Tk = {
            clientId: 180100031013,
            isLogin: false, // 是否登录
            isRight: false, // 是否资格
            isReadyImg: false, // 图片编辑是否成功
            uid: '', // userId
            isAbility: false, // 是否支持编辑
            origin: '',
            queryUrl: 'http://app.shopapi.xiaomi.com/v1/mfn/query?client_id=180100031013&user_id=',
            fileInput: $('#upload'),
            fileName: $('#name'),
            fileTel: $('#tel'),
            fileMiliao: $('#miliao'),
            fileBtn: $('#fileBtn'),
            upBtn: $('#upBtn'),
            edImg: $('#finishImg'),
            v: ['jpg', 'png', 'jpeg'],

            init: function(){
                util.run();

                this.Login();
                if(!this.isLogin){
                    alert('未登录小米商城');
                    setTimeout(function(){ util.goHome(); }, 1000);
                }

                this.isMay( function(err, uid){
                    if(err && Tk.uid == uid){
                        if(util.isAbility()){
                            Tk.isAbility = true;
                        }else{
                            Tk.isAbility = false;
                        }
                        Tk.isEdit(function(e, data){
                            if(e){
                                Tk.reEdit(data.data);
                            }
                        });
                    }
                });

            },

            Login: function(){
                // 判断是否登录
                util.isLogin(function(err, uid){
                    if(err){
                        Tk.uid = uid;
                        Tk.queryUrl = Tk.queryUrl + uid;
                        Tk.isLogin = true;
                    }else{
                        Tk.isLogin = false;
                    }
                });
            },

            isMay: function(callback){
                // 判断是否有资格
                var err = false;
                $.ajax({
                    type: 'get',
                    url: 'getPower.php?userId='+ Tk.uid,
                    success: function(data){
                        var data = JSON.parse(data);
                        if(data.result == 'ok'){
                            err = true;
                            callback(err, data.userId);
                        }else{
                            err = false;
                            alert('没有购票资格');
                            util.goHome();
                        }
                    },
                    error: function(){
                        alert('服务器压力上大，刷新重试');
                        setTimeout(function(){location.reload();}, 1000);
                    }
                });
            },

            isEdit: function(callback){
                var e = false;
                // 判断是否已编辑过
                $.ajax({
                    type: 'get',
                    url: Tk.queryUrl,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function(data){
                        if(data.result === 'ok'){
                            e = true;
                            callback(e, data);
                            location.href = 'http://p.www.xiaomi.com/m/activities/open/46/130328/weibo.html?'+Math.round(Math.random()*10000);
                        }else{
                            e = false;
                            callback(e);
                        }
                    },
                    error: function(){
                        alert('服务器压力上大，刷新重试');
                        setTimeout(function(){location.reload();}, 1000);
                    }
                });
            },

            reEdit: function(data){
                var name, tel, miliao, img;
                name = data.name;
                tel = data.tel;
                miliao = data.miliaoid;
                img = data.image;

                this.fileName.val(name);
                this.fileTel.val(tel);
                this.fileMiliao.val(miliao);
                this.edImg[0].src = img+'?'+Math.round(Math.random()*10000);
            },

            okType: function (file) {
                var name = file.name,
                    s = false;
                for (var i = 0, k = this.v.length; i < k; i++) {
                    if (name.indexOf(this.v[i]) > 0) {
                        s = true;
                    }
                }
                return s;
            },

            okSize: function (file) {
                var size = file.size/1024;
                if(size > 3072){
                    alert('图片过大，建议换一张图片上传');
                    return false;
                }
                return true;
            },

            okImg: function(file, callback){
                var src;
                if(window.webkitURL){
                    src = window.webkitURL.createObjectURL(file);
                }else if(window.URL){
                    src = window.URL.createObjectURL(file);
                }
                callback(src);
            },

            vrForm: function () {
                if (this.fileName.val() == '') {
                    alert('请填写姓名');
                    return false;
                }
                if (!util.IsTelephone(this.fileTel.val())) {
                    alert('请填写正确的手机号');
                    return false;
                }
                if (this.isAbility){
                    if (this.fileInput.val() == '' || !this.isReadyImg) {
                        alert('请上传并编辑头像');
                        return false;
                    }
                }else{
                    if (this.fileInput.val() == '') {
                        alert('请上传头像');
                        return false;
                    }
                }
                return true;
            },

            inData: function (callback) {
                var src, formData;

                src = editor.getImgData();
                formData = new FormData();

                formData.append('name', this.fileName.val());
                formData.append('tel', this.fileTel.val());
                formData.append('miliao', this.fileMiliao.val());
                formData.append('img', src);
                formData.append('originimage', this.origin);

                callback(formData);
            }

        };

        if(window.FileReader){
            var reader = new FileReader();
            reader.onload = function(e){
                var target = e.target.result;
                Tk.origin = target;
            }
        }

        Tk.fileInput.on('change', function(){
            Tk.isReadyImg = false;

            if(!Tk.okType(this.files[0])){
                alert('支持图片格式: jpg/jpeg/png');
                return;
            }
            if(!Tk.okSize(this.files[0])){return}


            if(Tk.isAbility){
                Tk.okImg(this.files[0], function(src){
                    editor.show(src);
                });
                reader.readAsDataURL(this.files[0]);
            }else{
                Tk.edImg[0].src = 'http://p.www.xiaomi.com/m/images/130327/defalt02.png';
            }

        });

        Tk.upBtn.on('click', function(){
            if(!Tk.vrForm()){return}

            if(Tk.isAbility){
                Tk.inData(function(data){
                    xhr.send(data);
                });
            }else{
                var options = {
                    type: 'post',
                    iframe: true,
                    beforeSubmit: function(){
                        util.showLoad();
                        return true;
                    },
                    success: function(){
                        util.sucMsg('验证数据');
                    },
                    complete: function(xhr){
                        var data = xhr.responseText;
                        if(data.indexOf('error') == -1){
                            util.sucMsg('上传成功');
                            setTimeout(function(){
                                location.href = 'http://p.www.xiaomi.com/m/activities/open/46/130328/weibo.html?'+Math.round(Math.random()*10000);
                            }, 1000);
                        }else{
                            util.sucMsg('换张小图');
                            setTimeout(function(){location.reload();}, 2000);
                        }
                    }
                };
                $('#postFrom').on('submit', function(e){
                    e.preventDefault();
                    $(this).ajaxSubmit(options);
                });
                $('#postFrom').submit();
            }
        });

        Tk.edImg.on('click', function(){
            Tk.fileInput.trigger('click');
        });

        Tk.init();

        //头像编辑类
        function ImgEditor () {
            //局部变量
            var offsetX = 0;
            var offsetY = 0;
            var startX = numberize($('.selectArea').css('left'));
            var startY = numberize($('.selectArea').css('top'));
            var editX = 0;
            var editY = 0;

            var initialX = 0;
            var initialY = 0;
            var x = 0;
            var y = 0;

            var initialScale = 1;
            var currentScale = 1;

            var drag = $('#drag')[0];
            var canvas = $('#imgEditor #canvas')[0];
            canvas.width = $('.selectArea').width();
            canvas.height = $('.selectArea').height();

            var ctx = canvas.getContext('2d');
            var img = new Image();
            var n = 0;

            //工具方法：去掉单位得到数值
            function numberize (pxStr) {
                pxStr = pxStr.substr(0, pxStr.length-2);
                pxNum =  parseInt(pxStr);
                return pxNum;
            }

            //重置参数
            this.reset = function () {
                offsetX = img.width/n/2-startX;
                offsetY = img.height/n/2-startY;
                initialX = 0;
                initialY = 0;
                x = 0;
                y = 0;
                initialScale = 1;
                currentScale = 1;
                drag.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0px) '+'scale(' + currentScale + ')';
            }

            //显示方法
            this.show = function (src) {
                this.reset();

                img.src = src;
                img.onload = function () {
                    n = img.width / $('.imgWrap').width();
                    offsetX = img.width/n/2-startX;
                    offsetY = img.height/n/2-startY;
                    ctx.drawImage(img,0,0);
                }

                drag.src = src;
                drag.onload = function () {
                    $('#imgEditor').show();
                }
            }

            this.getImgData = function () {
                return canvas.toDataURL();
            }

            //绑定确定编辑按钮
            $('.ok').click(function () {
                editX = (img.width/n*currentScale/2-offsetX)/currentScale*n;
                editY = (img.height/n*currentScale/2-offsetY)/currentScale*n;
                if (editX < 0 || editY < 0 || editX+canvas.width*n/currentScale>img.width || editY+canvas.height*n/currentScale>img.height) {
                    alert('头像没有充满选择区域');
                    return;
                }
                ctx.drawImage(img,editX,editY,canvas.width*n/currentScale,canvas.height*n/currentScale,0,0,canvas.width,canvas.height);
                $('#imgEditor').hide();
                $('#finishImg')[0].src = canvas.toDataURL();
                // 头像剪切设置成功
                Tk.isReadyImg = true;
            });

            $('.close').click(function () {
                $('#imgEditor').hide();
            });

            touch.on('.eventReceiver', 'touchstart', function(ev){
                ev.originEvent.preventDefault();
                ev.originEvent.stopPropagation();
            });

            touch.on('.eventReceiver', 'drag', {interval: 10}, function(ev){
                x = initialX + ev.distanceX;
                y = initialY + ev.distanceY;
                if(ev.fingerStatus === 'end'){
                    initialX += ev.distanceX;
                    initialY += ev.distanceY;
                    offsetX += ev.distanceX;
                    offsetY += ev.distanceY;
                }
                drag.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0px) '+'scale(' + currentScale + ')';
            });

            touch.on('.eventReceiver', 'pinch', {interval: 10},function(ev){
                currentScale = ev.scale - 1;
                currentScale = initialScale + currentScale;
                if(ev.fingerStatus === 'end'){
                    initialScale += (ev.scale - 1);
                    initialScale = initialScale > 2.5 ? 2.5 : initialScale;
                    initialScale = initialScale < 0.5 ? 0.5 : initialScale;
                }
                currentScale = currentScale > 2.5 ? 2.5 : currentScale;
                currentScale = currentScale < 0.5 ? 0.5 : currentScale;
                drag.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px, 0px) '+'scale(' + currentScale + ')';
            });
        }
    });
})(jQuery);
