(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","d3","nf.Common","nf.Dialog","nf.ErrorHandler"],function(e,c,f,d,g){return(nf.ng.ProvenanceLineage=b(e,c,f,d,g))})}else{if(typeof exports==="object"&&typeof module==="object"){module.exports=(nf.ng.ProvenanceLineage=b(require("jquery"),require("d3"),require("nf.Common"),require("nf.Dialog"),require("nf.ErrorHandler")))}else{nf.ng.ProvenanceLineage=b(a.$,a.d3,a.nf.Common,a.nf.Dialog,a.nf.ErrorHandler)}}}(this,function(d,b,e,c,f){var a=function(){var i={sliderTickCount:75,urls:{lineage:"../nifi-api/provenance/lineage"}};var l=function(){d("#lineage-query-dialog").modal({scrollableContentStyle:"scrollable",headerText:"Computing FlowFile lineage..."})};var g=function(v){var w=document.getElementById("image-download-link");var s=typeof w.download!="undefined";var y="lineage.svg";if(s){var x=self.URL||self.webkitURL||self;var t=new Blob([v],{type:"image/svg+xml;charset=utf-8"});if(window.navigator.msSaveOrOpenBlob){window.navigator.msSaveOrOpenBlob(t,y)}else{var u=x.createObjectURL(t);w.href=u;w.download=y;w.click()}}else{window.open("data:image/svg+xml;charset=utf-8,"+encodeURI(v))}};var h=function(s){var t=d("#provenance-lineage-context-menu");d.each(s,function(u,w){if(typeof w.click==="function"){var v=d('<div class="context-menu-item"></div>').on("click",w.click).on("mouseenter",function(){d(this).addClass("hover")}).on("mouseleave",function(){d(this).removeClass("hover")}).appendTo(t);d('<div class="context-menu-item-img"></div>').addClass(w["class"]).appendTo(v);d('<div class="context-menu-item-text"></div>').text(w.text).appendTo(v);d('<div class="clear"></div>').appendTo(v)}})};var o=function(s){var t={lineage:{request:s}};return d.ajax({type:"POST",url:i.urls.lineage,data:JSON.stringify(t),dataType:"json",contentType:"application/json"}).fail(f.handleAjaxError)};var p=function(s){var t=s.uri;if(e.isDefinedAndNotNull(s.request.clusterNodeId)){t+="?"+d.param({clusterNodeId:s.request.clusterNodeId})}return d.ajax({type:"GET",url:t,dataType:"json"}).fail(f.handleAjaxError)};var j=function(s){var t=s.uri;if(e.isDefinedAndNotNull(s.request.clusterNodeId)){t+="?"+d.param({clusterNodeId:s.request.clusterNodeId})}return d.ajax({type:"DELETE",url:t,dataType:"json"}).fail(f.handleAjaxError)};var k=100;var n=120;var q=function(G,J,x,B){var w=d("#provenance-lineage");var P=w.width();var L=w.height();var C;var u;var y;var N=new Map();var H=new Map();var T=function(U,W,V){d.each(U,function(X,aa){var Z=N.get(aa);var Y=[];d.each(Z.outgoing,function(ab,ac){Y.push(ac.target.id);W.add(ac.target.id)});if(e.isUndefined(V)){T(Y,W)}else{if(V>1){T(Y,W,V-1)}}})};var z=function(ae,am,ai,ah){var ab=new Set(ae);var al=new Set();var Z=new Set();T(ae,al,1);T(ae,Z);Z.forEach(function(an){ab["delete"](an)});var W=Array.from(al.values()).sort(b.descending);var U=Array.from(ab.values());var ag=0;d.each(U,function(an,ap){var ao=N.get(ap);if(ao.incoming.length>3){ah=n}else{if(ao.incoming.length>=2){ag++}}});if(ag>2){ah=n}if(ai.length===1){U=U.sort(function(ar,aq){var ao=N.get(ar);var an=N.get(aq);if(ao.outgoing.length>0&&an.outgoing.length>0){var ap=W.indexOf(ao.outgoing[0].target.id);var at=W.indexOf(an.outgoing[0].target.id);if(ap!==at){return ap-at}}if(ao.incoming.length>0&&an.incoming.length>0){var ap=ao.incoming[0].source.index;var at=an.incoming[0].source.index;if(ap!==at){return ap-at}}if(ao.type!==an.type){return ao.type>an.type?1:-1}if(ao.eventType!==an.eventType){return ao.eventType>an.eventType?1:-1}return ao.millis-an.millis})}else{if(ai.length>1){U=U.sort(function(ar,aq){var ao=N.get(ar);var an=N.get(aq);if(ao.incoming.length>0&&an.incoming.length>0){var ap=ao.incoming[0].source.index;var at=an.incoming[0].source.index;if(ap!==at){return ap-at}}if(ao.outgoing.length>0&&an.outgoing.length>0){var ap=W.indexOf(ao.outgoing[0].target.id);var at=W.indexOf(an.outgoing[0].target.id);if(ap!==at){return ap-at}}if(ao.type!==an.type){return ao.type>an.type?1:-1}if(ao.eventType!==an.eventType){return ao.eventType>an.eventType?1:-1}return ao.millis-an.millis})}}var ac=P/2;if(ai.length>0){ac=b.mean(ai,function(ao){var an=N.get(ao);return an.x})}var aa=(U.length-1)*k;d.each(U,function(ao,ar){var aq=N.get(ar);aq.y=ah+am-25;if(U.length<=ai.length){if(aq.incoming.length===1){var ap=aq.incoming[0].source;if(ap.outgoing.length===1){aq.x=ap.x;return}}else{if(aq.incoming.length>1){var an=d.grep(aq.incoming,function(at){return(aq.y-at.source.y)<=n});aq.x=b.mean(an,function(at){return at.source.x});return}}}aq.x=(ao*k)+ac-(aa/2)});var ad=U.slice().sort(function(aq,ap){var ao=N.get(aq);var an=N.get(ap);return ao.x-an.x});for(var af=0;af<ad.length-1;af++){var Y=N.get(ad[af]);var ak=N.get(ad[af+1]);var aj=ak.x-Y.x;if(aj<k){ak.x+=(k-aj)}}if(W.length>0){var V=n/3;U=U.sort(function(aq,ap){var ao=N.get(aq);var an=N.get(ap);return ao.x-an.x});var X=0;d.each(U,function(an,ap){var ao=N.get(ap);ao.index=an;if(ao.outgoing.length>3){V=n}else{if(ao.outgoing.length>=2){X++}}});if(X>2){V=n}z(W,ah+am,U,V)}};var R=function(V,U,W){d.each(V,function(X,Y){if(N.has(Y.id)){return}d.extend(Y,{x:0,y:0,visible:true});N.set(Y.id,Y)});d.each(U,function(X,Y){var Z={id:Y.sourceId+"-"+Y.targetId,source:N.get(Y.sourceId),target:N.get(Y.targetId),flowFileUuid:Y.flowFileUuid,millis:Y.millis,visible:true};H.set(Z.id,Z)});v(W)};var v=function(V){var W=new Set(Array.from(N.keys()));N.forEach(function(X,Y){X.outgoing=[];X.incoming=[];if(e.isUndefined(C)||C>X.millis){C=X.millis;u=X.timestamp}if(e.isUndefined(y)||y<X.millis){y=X.millis}});H.forEach(function(X,Y){X.source.outgoing.push(X);X.target.incoming.push(X);W["delete"](X.target.id)});z(Array.from(W.values()),1,[],50);var U=(y-C)/i.sliderTickCount;Q.slider("option","min",C).slider("option","max",y).slider("option","step",U>0?U:1).slider("value",y);d("#event-time").text(F(y,V));A(V)};var F=function(X,Y){var W=new Date();var U=W.getTimezoneOffset()*60*1000;var V=new Date(X+U+Y.serverTimeOffset);return e.formatDateTime(V)};d("#provenance-lineage-context-menu").on("click",function(){d(this).hide().empty()});var S=b.zoom().scaleExtent([0.2,8]).on("zoom",function(U){b.select("g.lineage").attr("transform",function(){return"translate("+U.transform.x+", "+U.transform.y+") scale("+U.transform.k+")"})});var K=b.select("#provenance-lineage-container").append("svg:svg").attr("width","100%").attr("height","100%").call(S).on("dblclick.zoom",null).on("mousedown",function(U,V){b.selectAll("circle.context").classed("context",false);d("#provenance-lineage-context-menu").hide().empty();U.preventDefault()}).on("contextmenu",function(W){var V=d("#provenance-lineage-context-menu");if(!V.is(":empty")){var U=b.pointer(W,this);V.css({left:U[0]+"px",top:U[1]+"px"}).show()}W.preventDefault()});K.append("rect").attr("width","100%").attr("height","100%").attr("fill","#f9fafb");K.append("defs").selectAll("marker").data(["FLOWFILE","FLOWFILE-SELECTED","EVENT","EVENT-SELECTED"]).enter().append("marker").attr("id",function(U){return U}).attr("viewBox","0 -3 6 6").attr("refX",function(U){if(U.indexOf("FLOWFILE")>=0){return 16}else{return 11}}).attr("refY",0).attr("markerWidth",6).attr("markerHeight",6).attr("orient","auto").attr("fill",function(U){if(U.indexOf("SELECTED")>=0){return"#ba554a"}else{return"#000000"}}).append("path").attr("d","M0,-3 L6,0 L0,3");var w=K.append("g").attr("transform","translate(0, 0) scale(1)").attr("pointer-events","all").attr("class","lineage");var O=w.selectAll("g.node");var t=w.selectAll("path.link");var E=y;var s=function(Y,Z){if(E>Z.value){var X=O.filter(function(aa){return aa.millis>Z.value&&aa.millis<=E});var W=t.filter(function(aa){return aa.millis>Z.value&&aa.millis<=E});X.transition().delay(200).duration(400).style("opacity",0);W.transition().duration(400).style("opacity",0)}else{var V=O.filter(function(aa){return aa.millis<=Z.value&&aa.millis>E});var U=t.filter(function(aa){return aa.millis<=Z.value&&aa.millis>E});U.transition().delay(200).duration(400).style("opacity",1);V.transition().duration(400).style("opacity",1)}d("#event-time").text(F(Z.value,B));E=Z.value};var Q=d("#provenance-lineage-slider").slider({change:s,slide:s});var I=function(V){V.classed("flowfile",true).on("mousedown",function(W,X){W.stopPropagation()});V.append("circle").attr("r",16).attr("fill","#fff").attr("stroke","#000").attr("stroke-width",1).on("mouseover",function(W,X){t.filter(function(Y){return X.id===Y.flowFileUuid}).classed("selected",true).attr("marker-end",function(Y){return"url(#"+Y.target.type+"-SELECTED)"})}).on("mouseout",function(W,X){t.filter(function(Y){return X.id===Y.flowFileUuid}).classed("selected",false).attr("marker-end",function(Y){return"url(#"+Y.target.type+")"})});var U=V.append("g").attr("class","flowfile-icon").attr("transform",function(W){return"translate(-9,-9)"}).append("text").attr("font-family","flowfont").attr("font-size","18px").attr("fill","#ad9897").attr("transform",function(W){return"translate(0,15)"}).on("mouseover",function(W,X){t.filter(function(Y){return X.id===Y.flowFileUuid}).classed("selected",true).attr("marker-end",function(Y){return"url(#"+Y.target.type+"-SELECTED)"})}).on("mouseout",function(W,X){t.filter(function(Y){return X.id===Y.flowFileUuid}).classed("selected",false).attr("marker-end",function(Y){return"url(#"+Y.target.type+")"})}).text(function(W){return"\ue808"})};var M=function(Z,Y){d("#provenance-lineage-context-menu").hide().empty();var X=[{"class":"lineage-view-event",text:"View details",click:function(){Y.showEventDetails(Z.id,x)}}];if(top!==window){X.push({"class":"lineage-go-to",text:"Go To",click:function(){Y.goTo(Z)}})}if(Z.eventType==="SPAWN"||Z.eventType==="CLONE"||Z.eventType==="FORK"||Z.eventType==="JOIN"||Z.eventType==="REPLAY"){var W=function(ab){var ae=d("#lineage-percent-complete");var af=false;var aa=null;var ah=null;Y.updateProgress(ae,0);d("#lineage-query-dialog").modal("setButtonModel",[{buttonText:"Cancel",color:{base:"#E3E8EB",hover:"#C7D2D7",text:"#004849"},handler:{click:function(){af=true;if(ah!==null){clearTimeout(ah);ac()}}}}]).modal("show");var ac=function(){if(e.isDefinedAndNotNull(aa)){j(aa)}d("#lineage-query-dialog").modal("hide")};var ad=function(){p(aa).done(function(ai){aa=ai.lineage;ag()}).fail(ac)};var ag=function(){if(af===true){ac();return}if(!e.isEmpty(aa.results.errors)){var aj=aa.results.errors;c.showOkDialog({headerText:"Process Lineage",dialogContent:e.formatUnorderedList(aj)});ac();return}Y.updateProgress(ae,aa.percentCompleted);if(aa.finished===true){var ai=aa.results;if(ai.nodes.length>0){U(ai)}else{c.showOkDialog({headerText:"Lineage Results",dialogContent:"The lineage search has completed successfully but there no results were found. The events may have aged off."})}ac()}else{ah=setTimeout(function(){ah=null;ad()},2000)}};o(ab).done(function(ai){aa=ai.lineage;ag(1)}).fail(ac)};var U=function(aa){R(aa.nodes,aa.links,Y)};var V=function(aa,ab){ab.getEventDetails(aa,x).done(function(ae){var ad=ae.provenanceEvent;var ag=ad.flowFileUuid;var ah=new Set(ad.childUuids);var ac=function(ak,al){if(ak){return al.id!==aa}else{return al.flowFileUuid!==ag&&d.inArray(Array.from(ag),al.parentUuids)===-1}};var aj=function(ak,al){if(ak){return true}else{return al.flowFileUuid!==ag}};var af=d.inArray(ag,ad.childUuids)>=0;var ai=function(ak){var al=false;d.each(Array.from(N.values()),function(am,an){if(ak.has(an.flowFileUuid)&&ac(af,an)){N["delete"](an.id);d.each(an.outgoing,function(ap,ao){if(!ak.has(ao.flowFileUuid)){ak.add(ao.flowFileUuid);al=true}})}});d.each(Array.from(H.values()),function(am,ao){if(ak.has(ao.flowFileUuid)&&aj(af,ao)){H["delete"](ao.id);var an=ao.target;if(!ak.has(an.flowFileUuid)){ak.add(an.flowFileUuid);al=true}}});if(al){ai(ak)}};ai(ah);v(ab)})};X.push({"class":"lineage-view-parents",text:"Find parents",click:function(){W({lineageRequestType:"PARENTS",eventId:Z.id,clusterNodeId:x})}},{"class":"lineage-view-children",text:"Expand",click:function(){W({lineageRequestType:"CHILDREN",eventId:Z.id,clusterNodeId:x})}},{"class":"lineage-collapse-children",text:"Collapse",click:function(){V(Z.id,Y)}})}h(X)};var D=function(U,V){U.on("contextmenu",function(W,X){b.select("#event-node-"+X.id).classed("context",true);M(X,V)}).on("mousedown",function(W,X){W.stopPropagation()}).on("dblclick",function(W,X){V.showEventDetails(X.id,x)});U.classed("event",true).append("rect").attr("x",0).attr("y",-8).attr("height",16).attr("width",1).attr("opacity",0).attr("id",function(W){return"event-filler-"+W.id});U.append("circle").classed("selected",function(W){return W.id===J}).attr("r",8).attr("fill","#aabbc3").attr("stroke","#000").attr("stroke-width",1).attr("id",function(W){return"event-node-"+W.id});U.append("text").attr("id",function(W){return"event-text-"+W.id}).attr("class","event-type").classed("expand-parents",function(W){return W.eventType==="SPAWN"}).classed("expand-children",function(W){return W.eventType==="SPAWN"}).each(function(Y){var X=b.select(this);if(Y.eventType==="CONTENT_MODIFIED"||Y.eventType==="ATTRIBUTES_MODIFIED"){var W=[];if(Y.eventType==="CONTENT_MODIFIED"){W.push("CONTENT")}else{W.push("ATTRIBUTES")}W.push("MODIFIED");d.each(W,function(aa,Z){X.append("tspan").attr("x","0").attr("dy","1.2em").text(function(){return Z})});X.attr("transform","translate(10,-14)")}else{X.text(Y.eventType).attr("x",10).attr("y",4)}})};var A=function(W){O=O.data(Array.from(N.values()),function(X){return X.id});O.exit().transition().delay(200).duration(400).attr("transform",function(X){if(X.incoming.length===0){return"translate("+(P/2)+",50)"}else{return"translate("+X.incoming[0].source.x+","+X.incoming[0].source.y+")"}}).style("opacity",0).remove();var V=O.enter().append("g").attr("id",function(X){return"lineage-group-"+X.id}).classed("node",true).attr("transform",function(X){if(X.incoming.length===0){return"translate("+(P/2)+",50)"}else{return"translate("+X.incoming[0].source.x+","+X.incoming[0].source.y+")"}}).style("opacity",0);V.filter(function(X){return X.type==="FLOWFILE"}).call(I);V.filter(function(X){return X.type==="EVENT"}).call(D,W);O=O.merge(V);O.transition().duration(400).attr("transform",function(X){return"translate("+X.x+", "+X.y+")"}).style("opacity",1);t=t.data(Array.from(H.values()),function(X){return X.id});t.exit().attr("marker-end","").transition().duration(400).attr("d",function(X){return"M"+X.source.x+","+X.source.y+"L"+X.source.x+","+X.source.y}).style("opacity",0).remove();var U=t.enter().insert("path",".node").attr("class","link").attr("stroke-width",1.5).attr("stroke","#000").attr("fill","none").attr("d",function(X){return"M"+X.source.x+","+X.source.y+"L"+X.source.x+","+X.source.y}).style("opacity",0);t=t.merge(U).attr("marker-end","");t.transition().delay(200).duration(400).attr("marker-end",function(X){return"url(#"+X.target.type+")"}).attr("d",function(X){return"M"+X.source.x+","+X.source.y+"L"+X.target.x+","+X.target.y}).style("opacity",1)};d("#provenance-lineage").show();d("#provenance-event-search").hide();R(G.nodes,G.links,B)};function r(){}r.prototype={constructor:r,init:function(){d("#provenance-lineage-closer").on("click",function(){d("#provenance-lineage svg").remove();d("#provenance-lineage-slider").slider("destroy");d("#provenance-event-search").show();d("#provenance-lineage").hide();d("#provenance-table").data("gridInstance").resizeCanvas()});d("#provenance-lineage-downloader").on("click",function(){var v=d("#provenance-lineage-container").html();var u=d("g.lineage")[0];var x=u.getBBox();var t=x.height+60;var w=x.width+60;var s=x.x-15;var y=x.y-15;v=v.replace(/height=".*?"/,'height="'+t+'"');v=v.replace(/width=".*?"/,'width="'+w+'"');v=v.replace(/transform=".*?"/,"");v=v.replace(/<path([^>]*?)d="M[\s]?([^\s]+?)[\s,]([^\s]+?)[\s]?L[\s]?([^\s]+?)[\s,]([^\s]+?)[\s]?"(.*?)>/g,function(E,I,J,H,G,F,z){if(I.indexOf("link")===-1&&z.indexOf("link")===-1){return E}var D=parseFloat(J)-s;var C=parseFloat(H)-y;var B=parseFloat(G)-s;var A=parseFloat(F)-y;return"<path"+I+'d="M'+D+","+C+"L"+B+","+A+'"'+z+">"});v=v.replace(/<g([^>]*?)transform="translate\([\s]?([^\s]+?)[\s,]([^\s]+?)[\s]?\)"(.*?)>/g,function(C,D,B,A,E){if(D.indexOf("node")===-1&&E.indexOf("node")===-1){return C}var z=parseFloat(B)-s;var F=parseFloat(A)-y;return"<g"+D+'transform="translate('+z+","+F+')"'+E+">"});v=v.replace(/<svg ([^>]*)/,function(A){var B=A;var C=' xmlns="http://www.w3.org/2000/svg"';var D=' xmlns:xlink="http://www.w3.org/1999/xlink"';var z=' version="1.1"';if(B.indexOf(C)===-1){B+=C}if(B.indexOf(D)===-1){B+=D}if(B.indexOf(z)===-1){B+=z}return B});v='<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n'+v;g(v)});l()},showLineage:function(u,s,w,y){var C=d("#lineage-percent-complete");var x=false;var B=null;var v=null;var A={lineageRequestType:"FLOWFILE",uuid:u,clusterNodeId:w,eventId:s};y.updateProgress(C,0);d("#lineage-query-dialog").modal("setButtonModel",[{buttonText:"Cancel",color:{base:"#E3E8EB",hover:"#C7D2D7",text:"#004849"},handler:{click:function(){x=true;if(v!==null){clearTimeout(v);t()}}}}]).modal("show");var t=function(){if(e.isDefinedAndNotNull(B)){j(B)}d("#lineage-query-dialog").modal("hide")};var D=function(E){p(B).done(function(F){B=F.lineage;z(E)}).fail(t)};var z=function(E){if(x===true){t();return}if(!e.isEmpty(B.results.errors)){var F=B.results.errors;c.showOkDialog({headerText:"Process Lineage",dialogContent:e.formatUnorderedList(F)});t();return}E.updateProgress(C,B.percentCompleted);if(B.finished===true){q(B.results,s,w,E);t()}else{v=setTimeout(function(){v=null;D(E)},2000)}};o(A).done(function(E){B=E.lineage;z(y)}).fail(t)}};var m=new r();return m};return a}));