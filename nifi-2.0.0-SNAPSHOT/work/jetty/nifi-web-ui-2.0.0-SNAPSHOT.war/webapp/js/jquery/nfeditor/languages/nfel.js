(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","CodeMirror"],function(d,c){return(nf.nfel=b(d,c))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.nfel=b(require("jquery"),require("CodeMirror")))}else{nf.nfel=b(a.$,a.CodeMirror)}}}(this,function(e,w){var o=function(H){var J=e("<div></div>");e('<div class="el-name el-section"></div>').text(H.name).appendTo(J);e('<div class="el-section"></div>').text(H.description).appendTo(J);if(typeof H.args!=="undefined"){var G=e('<div class="el-section"></div>').appendTo(J);e('<div class="el-header">Arguments</div>').appendTo(G);if(e.isEmptyObject(H.args)){e('<span class="unset">None</span>').appendTo(G)}else{e('<div class="clear"></div>').appendTo(G);var F=e('<ul class="el-arguments"></ul>').appendTo(G);e.each(H.args,function(K,L){var N=e('<span class="el-argument-name"></span>').text(K);var M=e("<span></span>").text(L);e("<li></li>").append(N).append(" - ").append(M).appendTo(F)})}}if(typeof H.subject!=="undefined"){var I=e('<div class="el-section"></div>').appendTo(J);e('<div class="el-header">Subject</div>').appendTo(I);e("<p></p>").text(H.subject).appendTo(I);e('<div class="clear"></div>').appendTo(I)}if(typeof H.returnType!=="undefined"){var E=e('<div class="el-section"></div>').appendTo(J);e('<div class="el-header">Returns</div>').appendTo(E);e("<p></p>").text(H.returnType).appendTo(E);e('<div class="clear"></div>').appendTo(E)}return J};var D=/^[a-zA-Z0-9-_. ]+/;var g=[];var x=new RegExp("^$");var l={};var c=false;var y=[];var q=[];var n=new RegExp("^$");var f=new RegExp("^$");var b={};e.ajax({type:"GET",url:"../nifi-docs/html/expression-language-guide.html",dataType:"html"}).done(function(E){e(E).find("div.function").each(function(){var M=e(this);var J=M.find("h3").text();var L=M.find("span.description").text();var I=M.find("span.returnType").text();var K;var H=K=M.find("span.subject");var G=M.find("span.subjectless");if(G.length){y.push(J);K="None"}if(H.length){q.push(J);K=M.find("span.subject").text()}var F={};M.find("span.argName").each(function(){var O=e(this);var N=O.next("span.argDesc");F[O.text()]=N.text()});b[J]={name:J,description:L,args:F,subject:K,returnType:I}})}).always(function(){n=new RegExp("^(("+y.join(")|(")+"))$");f=new RegExp("^(("+q.join(")|(")+"))$")});var B="subject";var h="function";var i="subject-or-function";var t="expression";var v="arguments";var a="argument";var k="parameter";var A="invalid";var C=function(E,G,I,F){var H=0;I.eatWhile(function(J){if(J===E){H++;return true}return false});if(H%2===0){return null}if(H>1){I.backUp(1);return null}if(I.peek()==="{"){I.next();F.push({context:G});I.eatSpace();return"bracket"}return null};var j=function(J,H){var I=J.next();var E=false;var G=false;var F=J.eatWhile(function(K){if(E===true){return false}if(K===I){E=G===false}G=false;if(K==="\\"){G=true}return true});if(F){return"string"}H.context=A;J.skipToEnd();return null};var d=null;var z=null;var u=[];var r=function(E,F){m();d=e(F).qtip("api");z=setTimeout(function(){d.show()},500)};var m=function(){if(z!==null){clearInterval(z);z=null}if(d!==null){d.hide()}};var p=function(){if(z!==null){clearInterval(z);z=null}d=null;e.each(u,function(E,F){F.destroy(true)});u=[]};var s=function(G,F,I){var H=e("<div></div>").text(I.text);var E=e(G).qtip({content:o(I.details),style:{classes:"nifi-tooltip nf-tooltip",tip:false,width:350},show:{event:false,effect:false},hide:{event:false,effect:false},position:{at:"bottom right",my:"bottom left",adjust:{x:20}}}).append(H);u.push(E.qtip("api"))};return{enableParameters:function(){g=[];x=new RegExp("^$");l={};c=true},setParameters:function(E){E.forEach(function(F){g.push(F.name);l[F.name]=F});x=new RegExp("^(("+g.join(")|(")+"))$")},disableParameters:function(){g=[];x=new RegExp("^$");l={};c=false},color:function(){var E=function(G){var F=G;return{copy:function(){var I=[];for(var H=0;H<F.length;H++){I.push({context:F[H].context})}return I},get:function(){if(F.length===0){return{context:null}}else{return F[F.length-1]}},push:function(H){return F.push(H)},pop:function(){return F.pop()}}};return{startState:function(){return E([])},copyState:function(F){return E(F.copy())},token:function(R,S){if(R.eatSpace()){return null}if(R.eol()){return null}var M=R.peek();if(M==="#"){R.next();var P=R.peek();if(P!=="{"){R.skipToEnd();return"comment"}else{R.backUp(1)}}var H=S.get();if(H.context===A){R.skipToEnd();return null}if(H.context===t){var L=/^[^'"#${}()[\],:;\/*\\\s\t\r\n0-9][^'"#${}()[\],:;\/*\\\s\t\r\n]*/;var G=R.match(L,false);if(G!==null&&G.length===1){R.match(L);if(n.test(G)&&R.peek()==="("){H.context=v;return"builtin"}else{H.context=i;return"variable-2"}}else{if(M==="'"||M==='"'){var J=j(R,H);if(J!==null){H.context=B}return J}else{if(M==="$"){var K=C("$",t,R,S);if(K!==null){H.context=B}return K}else{if(M==="#"&&c){var I=C("#",k,R,S);if(I!==null){H.context=B}return I}else{if(M==="}"){R.next();if(typeof S.pop()==="undefined"){return null}else{return"bracket"}}else{R.skipToEnd();H.context=A;return null}}}}}}if(H.context===B||H.context===i){if(M===":"){R.next();H.context=h;R.eatSpace();return null}else{if(M==="}"){R.next();if(typeof S.pop()==="undefined"){return null}else{return"bracket"}}else{R.skipToEnd();H.context=A;return null}}}if(H.context===h){var N=R.match(/^[a-zA-Z]+/,false);if(N!==null&&N.length===1){R.match(/^[a-zA-Z]+/);if(f.test(N)&&R.peek()==="("){H.context=v;return"builtin"}else{return null}}else{R.skipToEnd();H.context=A;return null}}if(H.context===v){if(M==="("){R.next();H.context=a;return null}else{if(M===")"){R.next();H.context=B;return null}else{if(M===","){R.next();H.context=a;return null}else{R.skipToEnd();H.context=A;return null}}}}if(H.context===a){if(M==="'"||M==='"'){var O=j(R,H);if(O!==null){H.context=v}return O}else{if(R.match(/^[-\+]?((([0-9]+\.[0-9]*)([eE][+-]?([0-9])+)?)|((\.[0-9]+)([eE][+-]?([0-9])+)?)|(([0-9]+)([eE][+-]?([0-9])+)))/)){H.context=v;return"number"}else{if(R.match(/^[-\+]?[0-9]+/)){H.context=v;return"number"}else{if(R.match(/^((true)|(false))/)){H.context=v;return"number"}else{if(M===")"){R.next();H.context=B;return null}else{if(M==="$"){var F=C("$",t,R,S);if(F!==null){H.context=v}return F}else{if(M==="#"&&c){var I=C("#",k,R,S);if(I!==null){H.context=v}return I}else{R.skipToEnd();H.context=A;return null}}}}}}}}if(H.context===k){var Q=R.match(D,false);if(Q!==null&&Q.length===1){R.match(D);if(x.test(Q)){return"builtin"}else{return"string"}}if(M==="}"){R.next();if(typeof S.pop()==="undefined"){return null}else{return"bracket"}}else{R.skipToEnd();H.context=A;return null}}if(M==="$"){return C("$",t,R,S)}if(M==="#"&&c){return C("#",k,R,S)}if(M==="}"){R.next();if(typeof S.pop()==="undefined"){return null}else{return"bracket"}}R.next();return null}}},suggest:function(L){var R=L.getCursor();var H=L.getTokenAt(R);var I=false;var E=H.state.get();var G=function(U){return U===h||U===v};var T=function(U){return U===t||U===i};var O=function(U){return U===k};var F=E.context;if(!T(F)&&!G(F)&&!O(F)){return null}var P=H.string.toLowerCase();var K=e.trim(P);if(K==="${"||K===":"||K==="#{"){I=true;H.start+=P.length}var S=q;var Q=true;if(T(F)){S=y}else{if(O(F)){S=g;Q=false}}var M=function(U){var V=[];e.each(U,function(X,W){if(e.inArray(W,V)===-1){if(I||W.toLowerCase().indexOf(P)===0){V.push({text:W,details:Q?b[W]:l[W],render:s})}}});return V};var J=M(S);J=J.sort(function(W,U){var X=W.text.toLowerCase();var V=U.text.toLowerCase();return X===V?0:X>V?1:-1});var N={list:J,from:{line:R.line,ch:H.start},to:{line:R.line,ch:H.end}};w.on(N,"select",r);w.on(N,"close",p);return N},getLanguageId:function(){return"nfel"},supportsEl:function(){return true},supportsParameterReference:function(){return c}}}));