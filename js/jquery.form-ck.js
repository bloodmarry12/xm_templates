/*!
 * jQuery Form Plugin
 * version: 3.31.0-2013.03.22
 * @requires jQuery v1.5 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses:
 *    http://malsup.github.com/mit-license.txt
 *    http://malsup.github.com/gpl-license-v2.txt
 *//*global ActiveXObject alert */(function(e){"use strict";function r(t){var n=t.data;if(!t.isDefaultPrevented()){t.preventDefault();e(this).ajaxSubmit(n)}}function i(t){var n=t.target,r=e(n);if(!r.is("[type=submit],[type=image]")){var i=r.closest("[type=submit]");if(i.length===0)return;n=i[0]}var s=this;s.clk=n;if(n.type=="image")if(t.offsetX!==undefined){s.clk_x=t.offsetX;s.clk_y=t.offsetY}else if(typeof e.fn.offset=="function"){var o=r.offset();s.clk_x=t.pageX-o.left;s.clk_y=t.pageY-o.top}else{s.clk_x=t.pageX-n.offsetLeft;s.clk_y=t.pageY-n.offsetTop}setTimeout(function(){s.clk=s.clk_x=s.clk_y=null},100)}function s(){if(!e.fn.ajaxSubmit.debug)return;var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}var t={};t.fileapi=e("<input type='file'/>").get(0).files!==undefined;t.formdata=window.FormData!==undefined;var n=!!e.fn.prop;e.fn.attr2=function(e,t){if(!n)return this.attr.apply(this,arguments);var r=this.prop.apply(this,arguments);return r&&r.jquery||typeof r=="string"?r:this.attr.apply(this,arguments)};e.fn.ajaxSubmit=function(r){function N(t){var n=e.param(t).split("&"),r=n.length,i=[],s,o;for(s=0;s<r;s++){n[s]=n[s].replace(/\+/g," ");o=n[s].split("=");i.push([decodeURIComponent(o[0]),decodeURIComponent(o[1])])}return i}function C(t){var n=new FormData;for(var s=0;s<t.length;s++)n.append(t[s].name,t[s].value);if(r.extraData){var o=N(r.extraData);for(s=0;s<o.length;s++)o[s]&&n.append(o[s][0],o[s][1])}r.data=null;var u=e.extend(!0,{},e.ajaxSettings,r,{contentType:!1,processData:!1,cache:!1,type:i||"POST"});r.uploadProgress&&(u.xhr=function(){var e=jQuery.ajaxSettings.xhr();e.upload&&e.upload.addEventListener("progress",function(e){var t=0,n=e.loaded||e.position,i=e.total;e.lengthComputable&&(t=Math.ceil(n/i*100));r.uploadProgress(e,n,i,t)},!1);return e});u.data=null;var a=u.beforeSend;u.beforeSend=function(e,t){t.data=n;a&&a.call(this,e,t)};return e.ajax(u)}function k(t){function T(e){var t=e.contentWindow?e.contentWindow.document:e.contentDocument?e.contentDocument:e.document;return t}function k(){function r(){try{var e=T(v).readyState;s("state = "+e);e&&e.toLowerCase()=="uninitialized"&&setTimeout(r,50)}catch(t){s("Server abort: ",t," (",t.name,")");_(x);w&&clearTimeout(w);w=undefined}}var t=a.attr2("target"),n=a.attr2("action");o.setAttribute("target",p);i||o.setAttribute("method","POST");n!=l.url&&o.setAttribute("action",l.url);!l.skipEncodingOverride&&(!i||/post/i.test(i))&&a.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});l.timeout&&(w=setTimeout(function(){b=!0;_(S)},l.timeout));var u=[];try{if(l.extraData)for(var f in l.extraData)l.extraData.hasOwnProperty(f)&&(e.isPlainObject(l.extraData[f])&&l.extraData[f].hasOwnProperty("name")&&l.extraData[f].hasOwnProperty("value")?u.push(e('<input type="hidden" name="'+l.extraData[f].name+'">').val(l.extraData[f].value).appendTo(o)[0]):u.push(e('<input type="hidden" name="'+f+'">').val(l.extraData[f]).appendTo(o)[0]));if(!l.iframeTarget){d.appendTo("body");v.attachEvent?v.attachEvent("onload",_):v.addEventListener("load",_,!1)}setTimeout(r,15);try{o.submit()}catch(c){var h=document.createElement("form").submit;h.apply(o)}}finally{o.setAttribute("action",n);t?o.setAttribute("target",t):a.removeAttr("target");e(u).remove()}}function _(t){if(m.aborted||M)return;try{A=T(v)}catch(n){s("cannot access response document: ",n);t=x}if(t===S&&m){m.abort("timeout");E.reject(m,"timeout");return}if(t==x&&m){m.abort("server abort");E.reject(m,"error","server abort");return}if(!A||A.location.href==l.iframeSrc)if(!b)return;v.detachEvent?v.detachEvent("onload",_):v.removeEventListener("load",_,!1);var r="success",i;try{if(b)throw"timeout";var o=l.dataType=="xml"||A.XMLDocument||e.isXMLDoc(A);s("isXml="+o);if(!o&&window.opera&&(A.body===null||!A.body.innerHTML)&&--O){s("requeing onLoad callback, DOM not available");setTimeout(_,250);return}var u=A.body?A.body:A.documentElement;m.responseText=u?u.innerHTML:null;m.responseXML=A.XMLDocument?A.XMLDocument:A;o&&(l.dataType="xml");m.getResponseHeader=function(e){var t={"content-type":l.dataType};return t[e]};if(u){m.status=Number(u.getAttribute("status"))||m.status;m.statusText=u.getAttribute("statusText")||m.statusText}var a=(l.dataType||"").toLowerCase(),f=/(json|script|text)/.test(a);if(f||l.textarea){var c=A.getElementsByTagName("textarea")[0];if(c){m.responseText=c.value;m.status=Number(c.getAttribute("status"))||m.status;m.statusText=c.getAttribute("statusText")||m.statusText}else if(f){var p=A.getElementsByTagName("pre")[0],g=A.getElementsByTagName("body")[0];p?m.responseText=p.textContent?p.textContent:p.innerText:g&&(m.responseText=g.textContent?g.textContent:g.innerText)}}else a=="xml"&&!m.responseXML&&m.responseText&&(m.responseXML=D(m.responseText));try{L=H(m,a,l)}catch(y){r="parsererror";m.error=i=y||r}}catch(y){s("error caught: ",y);r="error";m.error=i=y||r}if(m.aborted){s("upload aborted");r=null}m.status&&(r=m.status>=200&&m.status<300||m.status===304?"success":"error");if(r==="success"){l.success&&l.success.call(l.context,L,"success",m);E.resolve(m.responseText,"success",m);h&&e.event.trigger("ajaxSuccess",[m,l])}else if(r){i===undefined&&(i=m.statusText);l.error&&l.error.call(l.context,m,r,i);E.reject(m,"error",i);h&&e.event.trigger("ajaxError",[m,l,i])}h&&e.event.trigger("ajaxComplete",[m,l]);h&&!--e.active&&e.event.trigger("ajaxStop");l.complete&&l.complete.call(l.context,m,r);M=!0;l.timeout&&clearTimeout(w);setTimeout(function(){l.iframeTarget||d.remove();m.responseXML=null},100)}var o=a[0],u,f,l,h,p,d,v,m,g,y,b,w,E=e.Deferred();if(t)for(f=0;f<c.length;f++){u=e(c[f]);n?u.prop("disabled",!1):u.removeAttr("disabled")}l=e.extend(!0,{},e.ajaxSettings,r);l.context=l.context||l;p="jqFormIO"+(new Date).getTime();if(l.iframeTarget){d=e(l.iframeTarget);y=d.attr2("name");y?p=y:d.attr2("name",p)}else{d=e('<iframe name="'+p+'" src="'+l.iframeSrc+'" />');d.css({position:"absolute",top:"-1000px",left:"-1000px"})}v=d[0];m={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var n=t==="timeout"?"timeout":"aborted";s("aborting upload... "+n);this.aborted=1;try{v.contentWindow.document.execCommand&&v.contentWindow.document.execCommand("Stop")}catch(r){}d.attr("src",l.iframeSrc);m.error=n;l.error&&l.error.call(l.context,m,n,t);h&&e.event.trigger("ajaxError",[m,l,n]);l.complete&&l.complete.call(l.context,m,n)}};h=l.global;h&&0===e.active++&&e.event.trigger("ajaxStart");h&&e.event.trigger("ajaxSend",[m,l]);if(l.beforeSend&&l.beforeSend.call(l.context,m,l)===!1){l.global&&e.active--;E.reject();return E}if(m.aborted){E.reject();return E}g=o.clk;if(g){y=g.name;if(y&&!g.disabled){l.extraData=l.extraData||{};l.extraData[y]=g.value;if(g.type=="image"){l.extraData[y+".x"]=o.clk_x;l.extraData[y+".y"]=o.clk_y}}}var S=1,x=2,N=e("meta[name=csrf-token]").attr("content"),C=e("meta[name=csrf-param]").attr("content");if(C&&N){l.extraData=l.extraData||{};l.extraData[C]=N}l.forceSync?k():setTimeout(k,10);var L,A,O=50,M,D=e.parseXML||function(e,t){if(window.ActiveXObject){t=new ActiveXObject("Microsoft.XMLDOM");t.async="false";t.loadXML(e)}else t=(new DOMParser).parseFromString(e,"text/xml");return t&&t.documentElement&&t.documentElement.nodeName!="parsererror"?t:null},P=e.parseJSON||function(e){return window.eval("("+e+")")},H=function(t,n,r){var i=t.getResponseHeader("content-type")||"",s=n==="xml"||!n&&i.indexOf("xml")>=0,o=s?t.responseXML:t.responseText;s&&o.documentElement.nodeName==="parsererror"&&e.error&&e.error("parsererror");r&&r.dataFilter&&(o=r.dataFilter(o,n));typeof o=="string"&&(n==="json"||!n&&i.indexOf("json")>=0?o=P(o):(n==="script"||!n&&i.indexOf("javascript")>=0)&&e.globalEval(o));return o};return E}if(!this.length){s("ajaxSubmit: skipping submit process - no element selected");return this}var i,o,u,a=this;typeof r=="function"&&(r={success:r});i=this.attr2("method");o=this.attr2("action");u=typeof o=="string"?e.trim(o):"";u=u||window.location.href||"";u&&(u=(u.match(/^([^#]+)/)||[])[1]);r=e.extend(!0,{url:u,success:e.ajaxSettings.success,type:i||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},r);var f={};this.trigger("form-pre-serialize",[this,r,f]);if(f.veto){s("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(r.beforeSerialize&&r.beforeSerialize(this,r)===!1){s("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var l=r.traditional;l===undefined&&(l=e.ajaxSettings.traditional);var c=[],h,p=this.formToArray(r.semantic,c);if(r.data){r.extraData=r.data;h=e.param(r.data,l)}if(r.beforeSubmit&&r.beforeSubmit(p,this,r)===!1){s("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[p,this,r,f]);if(f.veto){s("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var d=e.param(p,l);h&&(d=d?d+"&"+h:h);if(r.type.toUpperCase()=="GET"){r.url+=(r.url.indexOf("?")>=0?"&":"?")+d;r.data=null}else r.data=d;var v=[];r.resetForm&&v.push(function(){a.resetForm()});r.clearForm&&v.push(function(){a.clearForm(r.includeHidden)});if(!r.dataType&&r.target){var m=r.success||function(){};v.push(function(t){var n=r.replaceTarget?"replaceWith":"html";e(r.target)[n](t).each(m,arguments)})}else r.success&&v.push(r.success);r.success=function(e,t,n){var i=r.context||this;for(var s=0,o=v.length;s<o;s++)v[s].apply(i,[e,t,n||a,a])};var g=e('input[type=file]:enabled[value!=""]',this),y=g.length>0,b="multipart/form-data",w=a.attr("enctype")==b||a.attr("encoding")==b,E=t.fileapi&&t.formdata;s("fileAPI :"+E);var S=(y||w)&&!E,x;r.iframe!==!1&&(r.iframe||S)?r.closeKeepAlive?e.get(r.closeKeepAlive,function(){x=k(p)}):x=k(p):(y||w)&&E?x=C(p):x=e.ajax(r);a.removeData("jqxhr").data("jqxhr",x);for(var T=0;T<c.length;T++)c[T]=null;this.trigger("form-submit-notify",[this,r]);return this};e.fn.ajaxForm=function(t){t=t||{};t.delegation=t.delegation&&e.isFunction(e.fn.on);if(!t.delegation&&this.length===0){var n={s:this.selector,c:this.context};if(!e.isReady&&n.s){s("DOM not ready, queuing ajaxForm");e(function(){e(n.s,n.c).ajaxForm(t)});return this}s("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)"));return this}if(t.delegation){e(document).off("submit.form-plugin",this.selector,r).off("click.form-plugin",this.selector,i).on("submit.form-plugin",this.selector,t,r).on("click.form-plugin",this.selector,t,i);return this}return this.ajaxFormUnbind().bind("submit.form-plugin",t,r).bind("click.form-plugin",t,i)};e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")};e.fn.formToArray=function(n,r){var i=[];if(this.length===0)return i;var s=this[0],o=n?s.getElementsByTagName("*"):s.elements;if(!o)return i;var u,a,f,l,c,h,p;for(u=0,h=o.length;u<h;u++){c=o[u];f=c.name;if(!f||c.disabled)continue;if(n&&s.clk&&c.type=="image"){if(s.clk==c){i.push({name:f,value:e(c).val(),type:c.type});i.push({name:f+".x",value:s.clk_x},{name:f+".y",value:s.clk_y})}continue}l=e.fieldValue(c,!0);if(l&&l.constructor==Array){r&&r.push(c);for(a=0,p=l.length;a<p;a++)i.push({name:f,value:l[a]})}else if(t.fileapi&&c.type=="file"){r&&r.push(c);var d=c.files;if(d.length)for(a=0;a<d.length;a++)i.push({name:f,value:d[a],type:c.type});else i.push({name:f,value:"",type:c.type})}else if(l!==null&&typeof l!="undefined"){r&&r.push(c);i.push({name:f,value:l,type:c.type,required:c.required})}}if(!n&&s.clk){var v=e(s.clk),m=v[0];f=m.name;if(f&&!m.disabled&&m.type=="image"){i.push({name:f,value:v.val()});i.push({name:f+".x",value:s.clk_x},{name:f+".y",value:s.clk_y})}}return i};e.fn.formSerialize=function(t){return e.param(this.formToArray(t))};e.fn.fieldSerialize=function(t){var n=[];this.each(function(){var r=this.name;if(!r)return;var i=e.fieldValue(this,t);if(i&&i.constructor==Array)for(var s=0,o=i.length;s<o;s++)n.push({name:r,value:i[s]});else i!==null&&typeof i!="undefined"&&n.push({name:this.name,value:i})});return e.param(n)};e.fn.fieldValue=function(t){for(var n=[],r=0,i=this.length;r<i;r++){var s=this[r],o=e.fieldValue(s,t);if(o===null||typeof o=="undefined"||o.constructor==Array&&!o.length)continue;o.constructor==Array?e.merge(n,o):n.push(o)}return n};e.fieldValue=function(t,n){var r=t.name,i=t.type,s=t.tagName.toLowerCase();n===undefined&&(n=!0);if(n&&(!r||t.disabled||i=="reset"||i=="button"||(i=="checkbox"||i=="radio")&&!t.checked||(i=="submit"||i=="image")&&t.form&&t.form.clk!=t||s=="select"&&t.selectedIndex==-1))return null;if(s=="select"){var o=t.selectedIndex;if(o<0)return null;var u=[],a=t.options,f=i=="select-one",l=f?o+1:a.length;for(var c=f?o:0;c<l;c++){var h=a[c];if(h.selected){var p=h.value;p||(p=h.attributes&&h.attributes.value&&!h.attributes.value.specified?h.text:h.value);if(f)return p;u.push(p)}}return u}return e(t).val()};e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})};e.fn.clearFields=e.fn.clearInputs=function(t){var n=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var r=this.type,i=this.tagName.toLowerCase();n.test(r)||i=="textarea"?this.value="":r=="checkbox"||r=="radio"?this.checked=!1:i=="select"?this.selectedIndex=-1:r=="file"?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(r)||typeof t=="string"&&e(this).is(t))&&(this.value="")})};e.fn.resetForm=function(){return this.each(function(){(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)&&this.reset()})};e.fn.enable=function(e){e===undefined&&(e=!0);return this.each(function(){this.disabled=!e})};e.fn.selected=function(t){t===undefined&&(t=!0);return this.each(function(){var n=this.type;if(n=="checkbox"||n=="radio")this.checked=t;else if(this.tagName.toLowerCase()=="option"){var r=e(this).parent("select");t&&r[0]&&r[0].type=="select-one"&&r.find("option").selected(!1);this.selected=t}})};e.fn.ajaxSubmit.debug=!1})(jQuery);