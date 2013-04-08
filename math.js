define(['jquery'],function($){
    console.dir($);
    var i = 1;
    var add = function(a,b){
        return a+b+i;
    };
    return {
        add: add
    };
});
