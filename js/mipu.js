var util = {
    setCookie: function(sName, sValue, oExpires, sPath, sDomain, bSecure) {
        var sCookie = sName + "=" + encodeURIComponent(sValue);
        if (oExpires) {
            sCookie += "; expires=" + oExpires.toGMTString();
        }
        if (sPath) {
            sCookie += "; path=" + sPath;
        }
        if (sDomain) {
            sCookie += "; domain=" + sDomain;
        }
        if (bSecure) {
            sCookie += "; secure";
        }
        document.cookie = sCookie;
    },
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
    doLogin: function(){
        if(!this.WebEventTrigger('login', null)){
            location.href = 'http://m.xiaomi.com/index.html#ac=account&op=index';
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
    },

    getToken: function(){
        var token = document.location.hash;
        return token != '' && token[0] == '#' ? token.substr(1) : token;
    },

    parseToken: function(string, split){
        string = string || '';
        var obj = {},
            arr = string.split(split);
        if(!! arr && arr.length > 0){
            for(var i = 0, l = arr.length, brr, key; i < l; i++){
                brr = arr[i].split('=');
                if(!brr || !brr.length){
                    continue;
                }
                key = brr.shift();
                if(!key){
                    continue;
                }
                obj[key] = brr.join('=');
            }
        }
        return obj;
    },

    getAction: function(string){
        var first = string.substring(0, 1).toUpperCase();
        var last = string.toLowerCase().substring(1, string.length);
        return first + last;
    },

    run: function(hash){
        var token = this.getToken();
        if(hash){
            token = hash.replace('#', '');
        }
        if(token != ''){
            var obj = this.parseToken(token, '&');
            var ac = this.getAction(obj.ac), op = this.getAction(obj.op);

            try{
                var actionFn = eval(ac+'.'+op);
                if(typeof(actionFn) == 'function'){
                    actionFn(obj);
                }
            }catch(e){}
        }
    }
};
Set = {
    Cookie: function(param){
        var Token = param.serviceToken;
        var userId = param.userId;
        util.setCookie('serviceToken',Token,'','/','.xiaomi.com');
        util.setCookie('ticketToken',Token,'','/','.xiaomi.com');
        util.setCookie('userId',userId,'','/','.xiaomi.com');
    }
};
