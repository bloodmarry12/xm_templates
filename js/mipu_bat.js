var util = {
    getCookie: function(sName) {
        var sRE = "(?:; )?" + sName + "=([^;]*);?";
        var oRE = new RegExp(sRE);
        if (oRE.test(document.cookie)) {
            return decodeURIComponent(RegExp["$1"]);
        } else {
            return null;
        }
    },
    deleteCookie: function(sName, sPath, sDomain) {
        var sCookie = sName + "=; expires=" + (new Date(0)).toGMTString();
        if (sPath) {
            sCookie += "; path=" + sPath;
        }
        if (sDomain) {
            sCookie += "; domain=" + sDomain;
        }
        document.cookie = sCookie;
    },
    isLogin: function(callback){
        var userId = this.getCookie('userId'),
            e = false;
        if(!!userId){
            e = true;
            callback(e, userId);
        }else{
            e = false;
            callback(e);
        }
    },
    isNative: function(){
        try{
            if(!!WE){
                return true;
            }
        }catch(e){}
        return false;
    },
    WebEventTrigger: function(name, data){
        try{
            if(WE&&WE.trigger){
                if(typeof(data)!='string'){
                    data = JSON.stringify(data);
                }
                return WE.trigger(name, data);
            }
        }catch(e){}
        return false;
    },
    goHome: function(){
        if(!this.WebEventTrigger('gohome', null)){
            location.href = 'http://m.xiaomi.com/index.html#ac=home&op=index1';
        }
    },
    isAbility: function(){
        if(!!window.webkitURL || !!window.URL && !!window.FormData && !!window.FileReader){
            return true;
        }else{
            return false;
        }
    },

    showLoad: function(){
        $('#maskLoad').find('span').html('上传中...');
        $('#maskLoad').attr('style', 'display:block;');
    },

    hideLoad: function(){
        $('#maskLoad').attr('style', 'display:none;');
    },

    sucMsg: function(str){
        $('#maskLoad').find('span').html(str);
    },
    TestRegExp: function (re, text){
        re = new RegExp(re);
        return re.test(text);
    },
    IsTelephone: function (x){
        if (typeof x == "undefined")
        {
            return false;
        }
        var re = /^(\+86)?1[3,5,8](\d{9})$/;
        return this.TestRegExp(re, x);
    }
};
