require(["jquery","domReady"],function(e,t){t(function(){(function(){var t={fileInput:e("#upload"),fileBtn:e("#fileBtn"),File:null,v:["image","jpg","png","jpeg"],okType:function(e){var t=e.type;if(t===""){var n=e.name,r=!1;for(var i=0,s=this.v.length;i<s;i++)n.indexOf(this.v[i])>0&&(r=!0);return r}if(t.indexOf("image")!==-1)return!0},okSize:function(e){return!0},okImage:function(e,t){var n={};n.err=!1;if(this.okType(e))if(this.okSize(e)){n.msg="图片ok";window.URL?src=window.URL.createObjectURL(e):window.webkitURL&&(src=window.webkitURL.createObjectURL(e));t(n,src)}else{alert("图片尺寸no");n.err=!0;n.msg="图片尺寸出错";t(n)}else{n.err=!0;n.msg="图片格式不正确";t(n)}}};t.fileInput.on("change",function(){t.okImage(this.files[0],function(e,t){e.err?alert(e.msg):alert(t)})});t.fileBtn.on("click",function(){t.fileInput.trigger("click")})})()})});