require(['jquery', 'domReady'], function($, domReady){

    domReady(function(){
        (function(){

            var tk = {
                fileInput: $('#upload'),
                fileBtn: $('#fileBtn'),
                File: null,
                v: ['image', 'jpg', 'png', 'jpeg'],

                okType: function(file){
                    var type = file.type;
                    if(type !== ''){
                        if(type.indexOf('image') !== -1){
                            return true;
                        }
                    }else{
                        var name = file.name;
                        var s = false;
                        for(var i=0,k=this.v.length; i<k; i++){
                            if( name.indexOf(this.v[i]) > 0 ){
                                s = true;
                            }
                        }
                        return s;
                    }
                },

                okSize: function(file){
                    return true;
                },

                okImage: function(file, callback){
                    var data = {};
                    data.err = false;

                    if(this.okType(file)){
                        if( this.okSize(file) ){
                            data.msg = '图片ok';
                            if(window.URL){
                                src = window.URL.createObjectURL(file);
                            }else if(window.webkitURL){
                                src = window.webkitURL.createObjectURL(file);
                            }
                            callback(data, src);
                        }else{
                            alert('图片尺寸no');
                            data.err = true;
                            data.msg = '图片尺寸出错';
                            callback(data);
                        }
                    }else{
                        data.err = true;
                        data.msg = '图片格式不正确';
                        callback(data);
                    }
                }
            };

            tk.fileInput.on('change', function(){

                tk.okImage(this.files[0], function(data, src){
                    if(!data.err){
                        alert(src);
                    }else{
                        alert(data.msg);
                    }
                });

            });
            tk.fileBtn.on('click', function(){
                tk.fileInput.trigger('click');
            });
        })();
        // (function(){
        //     var xhr = new XMLHttpRequest();
        //     var f = $('#fileInput');

        //     // alert(xhr.open);
        //     // alert(window.FormData);
        //     d = new FormData();
        //     // alert(d);
        //     // alert(xhr.send);
        //     // alert(window.URL);
        //     // alert(window.webkitURL);

        //     f.on('change', function(e){
        //         var file = this.files[0];
        //         var img = document.createElement('img');
        //         if(file){
        //             var fileSize = 0;
        //             if(file.size > 1024 * 1024){
        //                 fileSize = (Math.round(file.size*100/(1024*1024))/100).toString()+'MB';
        //             }else{
        //                 fileSize = (Math.round(file.size*100/1024)/100).toString()+'KB';
        //             }
        //         }
        //         // console.log(file.name);
        //         // console.log(fileSize);
        //         // console.log(file.type);

        //         if(file.type.indexOf('image') === -1){
        //             return;
        //         }

        //         if(window.URL){
        //             img.src = window.URL.createObjectURL(file);
        //         }else if(window.webkitURL){
        //             img.src = window.webkitURL.createObjectURL(file);
        //             console.log(img);
        //             debugger;
        //         }else{
        //             var reader = new FileReader();
        //             reader.onload = function(e){
        //                 var img = document.createElement('img');
        //                 $(img).attr({
        //                     'src': e.target.result,
        //                     'width': 100,
        //                     'height': 100
        //                 });
        //                 $('#fileshow').append(img);
        //             };
        //             reader.readAsDataURL(file);
        //         }

        //     });
        //     // 激活上传控件
        //     $('#fileBtn').on('click', function(e){
        //         debugger;
        //         f.trigger(e,'click');
        //     });
        // })();
    });

});
