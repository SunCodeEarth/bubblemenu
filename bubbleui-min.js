class BubbleUI{constructor(t,s={}){this.options={focalEnlargeFactor:2,margins:[20,20,20,20],maxChildrenNum:8,subBubbleSizeRatios:[.9,.95],textSizes:[30,45,18,6,12,4],textOpacities:[.8,.4,.1],bubbleOpacities:[.4,.4,.1],bubbleColors:d3.scale.category10(),responsiveSetting:t=>t>=1e3?4:t>=600?2:1};for(let t in s)this.options[t]=s[t];this.div=d3.select(t),this.initR=0,this.sR=0,this.nTop=0,this.maxSubN=this.options.maxChildrenNum,this.colN=0,this.rowN=0,this.el=this.options.focalEnlargeFactor,this.svg=null}get colnum(){return this.colN}init(){return this.svg=this.div.append("svg").on("mouseleave",(()=>{1==this.colN?this.activate(0):this.reset()})),this}addData(t){let s=this.svg.selectAll(".topBubble").data(t.children).enter().append("g").attr("id",((t,s)=>"topBubbleAndText_"+s));this.nTop=t.children.length;let i=this.options.bubbleColors;s.append("circle").attr("class","topBubble").attr("id",((t,s)=>"topBubble"+s)).style("fill",((t,s)=>i(s))).on("mouseover",((t,s)=>this.activate(s))),s.append("text").attr("class","topBubbleText").text((t=>t.name)).style("fill",((t,s)=>i(s))).on("mouseover",((t,s)=>this.activate(s)));for(var e=0;e<this.nTop;e++){let s=this.svg.selectAll(".childBubble"+e).data(t.children[e].children).enter().append("g");s.append("circle").attr("class","childBubble childBubble"+e).attr("id",((t,s)=>"childBubble_"+e+"sub_"+s)).on("click",((t,s)=>window.open(t.address))).on("mouseover",((t,s)=>{var i="";i=null==t.note||""==t.note?t.address:t.note,d3.select("#bubbleItemNote").text(i)})).append("svg:title").text((t=>t.address)),s.append("text").attr("class","childBubbleText childBubbleText"+e).style("fill",((t,s)=>i(e))).text((t=>t.name)).on("click",((t,s)=>window.open(t.address)))}return this}staticBubbleCenters(t){return(s,i,e=20,o=20,l=20,a=20)=>{let h=(i-e-o)/4/t,n=new Array(s),r=new Array(s);for(let i=0,o=0,a=0;i<s;++i)o=Math.floor(i/t),a=i%t,n[i]=e+(2+4*a)*h,r[i]=l+(2+4*o)*h;return{x:n,y:r}}}focalBubbleCenters(t){return(s,i,e,o=20,l=20,a=20,h=20,n=2)=>{let r=(e-o-l)/4/(t-1+n),b=new Array(i),u=new Array(i),c=new Array(i),p=Math.floor(s/t),d=s%t,x=0,m=0;for(let e=0;e<i;++e)x=Math.floor(e/t),m=e%t,b[e]=d==m?o+4*r*m+2*n*r:m<d?o+r*(4*m+2):o+r*(4*m-2+4*n),u[e]=p==x?a+4*r*x+2*n*r:x<p?a+r*(4*x+2):a+r*(4*x-2+4*n),c[e]=s==e?n*r:r;return{x:b,y:u,r:c,sr:r}}}subBubblePos(t,s,i,e,o,l=.88,a="all",h=-1){if(t+=h,"all"==a){let a=Math.min(e*l*.5,2*l*Math.PI*1.5*e/2/o);return[s+Math.cos(2*Math.PI*t/o)*(e+e/2),i+Math.sin(2*Math.PI*t/o)*(e+e/2),a]}if("x"==a){Math.min(e*l*.5,2*l*Math.PI*1.5*e/2/o);return s+Math.cos(2*Math.PI*t/o)*(e+e/2)}if("y"==a){Math.min(e*l*.5,2*l*Math.PI*1.5*e/2/o);return i+Math.sin(2*Math.PI*t/o)*(e+e/2)}return"r"==a?Math.min(e*l*.5,2*l*Math.PI*1.5*e/2/o):null}resize(){let t=this.div.node().offsetWidth,s=this.options.margins[0],i=this.options.margins[1],e=this.options.margins[2],o=this.options.margins[3];this.colN=this.options.responsiveSetting(t),this.rowN=Math.ceil(this.nTop/this.colN),this.initR=(t-i-o)/4/this.colN,this.sR=(t-i-o)/4/(this.colN-1+this.el);let l=s+e+4*this.sR*(this.el+this.rowN-1);return this.div.style("height",l+"px"),this.svg.attr("width",t),this.svg.attr("height",l),1==this.colN?this.activate(0):this.reset(),this}reset(){let t=document.getElementById("mainBubble").offsetWidth,s=this.colN,i=this.initR,e=this.options.margins[0],o=this.options.margins[1],l=this.options.margins[2],a=this.options.margins[3],h=this.staticBubbleCenters(s)(this.nTop,t,o,a,e,l),n=h.x,r=h.y,b=this.svg.transition().duration(650);b.selectAll(".topBubble").attr("r",i).attr("cx",((t,s)=>n[s])).attr("cy",((t,s)=>r[s])).style("opacity",this.options.bubbleOpacities[0]),b.selectAll(".topBubbleText").attr("x",((t,s)=>n[s])).attr("y",((t,s)=>r[s])).attr("font-size",this.options.textSizes[0]).style("opacity",this.options.textOpacities[0]);for(var u=0;u<this.nTop;u++)b.selectAll(".childBubbleText"+u).attr("font-size",this.options.textSizes[3]).style("opacity",this.options.textOpacities[1]).attr("x",((t,s)=>this.subBubblePos(s,n[u],r[u],i,this.maxSubN,0,"x"))).attr("y",((t,s)=>this.subBubblePos(s,n[u],r[u],i,this.maxSubN,0,"y"))),b.selectAll(".childBubble"+u).attr("r",((t,s)=>this.subBubblePos(s,n[u],r[u],i,this.maxSubN,this.options.subBubbleSizeRatios[0],"r"))).attr("cx",((t,s)=>this.subBubblePos(s,n[u],r[u],i,this.maxSubN,0,"x"))).attr("cy",((t,s)=>this.subBubblePos(s,n[u],r[u],i,this.maxSubN,0,"y"))).style("opacity",this.options.bubbleOpacities[1]);return this}activate(t){let s=document.getElementById("mainBubble").offsetWidth,i=this.colN,e=this.options.margins[0],o=this.options.margins[1],l=this.options.margins[2],a=this.options.margins[3],h=this.svg.transition().duration(d3.event&&d3.event.altKey?750:350),n=this.focalBubbleCenters(i)(t,this.nTop,s,o,a,e,l,this.el),r=n.x,b=n.y,u=n.r;n.sr;h.selectAll(".topBubble").attr("cx",((t,s)=>r[s])).attr("cy",((t,s)=>b[s])).attr("r",((t,s)=>u[s])),h.selectAll(".topBubbleText").attr("x",((t,s)=>r[s])).attr("y",((t,s)=>b[s])).attr("font-size",((s,i)=>t==i?this.options.textSizes[1]:this.options.textSizes[2]));for(let s=0;s<this.nTop;s++)h.selectAll(".childBubbleText"+s).attr("x",((t,i)=>this.subBubblePos(i,r[s],b[s],u[s],this.maxSubN,0,"x"))).attr("y",((t,i)=>this.subBubblePos(i,r[s],b[s],u[s],this.maxSubN,0,"y"))).attr("font-size",(()=>s==t?this.options.textSizes[4]:this.options.textSizes[5])).style("opacity",(()=>s==t?this.options.textOpacities[0]:this.options.textOpacities[2])),h.selectAll(".childBubble"+s).attr("cx",((t,i)=>this.subBubblePos(i,r[s],b[s],u[s],this.maxSubN,0,"x"))).attr("cy",((t,i)=>this.subBubblePos(i,r[s],b[s],u[s],this.maxSubN,0,"y"))).attr("r",((t,i)=>this.subBubblePos(i,r[s],b[s],u[s],this.maxSubN,this.options.subBubbleSizeRatios[1],"r"))).style("opacity",(()=>s==t?this.options.bubbleOpacities[0]:this.options.bubbleOpacities[2]));return this}}