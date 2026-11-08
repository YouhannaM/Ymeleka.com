(()=>{
const NS="http://www.w3.org/2000/svg";
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const P=(g,d,c)=>el("path",c?{d,class:c}:{d},g);
const C=(g,cx,cy,r,c)=>el("circle",c?{cx,cy,r,class:c}:{cx,cy,r},g);
// seeded random
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
const scribbleCircle=(g,cx,cy,r,c)=>{let d="";const n=14,turns=1.15;for(let i=0;i<=n*turns;i++){const a=i/n*Math.PI*2+rnd()*.2,rr=r*(.88+rnd()*.2);d+=(i?"L":"M")+(cx+Math.cos(a)*rr).toFixed(1)+" "+(cy+Math.sin(a)*rr*.92).toFixed(1)}P(g,d,c)};
const apple=(g,x,y,s,c)=>{const t=`translate(${x} ${y}) scale(${s})`;const gg=el("g",{transform:t},g);
  P(gg,"M0 -26 C-10 -35 -34 -33 -37 -8 C-41 18 -20 40 0 33 C20 40 41 18 37 -8 C34 -33 10 -35 0 -26 Z",c);
  P(gg,"M0 -26 Q2 -38 7 -45");P(gg,"M3 -36 Q15 -48 27 -42 Q15 -33 3 -36 Z");return gg};
const hatch=(g,x1,y1,x2,y2,n,dx,dy,c="lt")=>{for(let i=0;i<n;i++){const t=i/(n-1);const x=x1+(x2-x1)*t,y=y1+(y2-y1)*t;P(g,`M${x.toFixed(1)} ${y.toFixed(1)} l${dx} ${dy}`,c)}};

const f=n=>(+n).toFixed(1);
const L=(g,x1,y1,x2,y2,c)=>P(g,`M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`,c);
const R=(g,x,y,w,h,c)=>P(g,`M${f(x)} ${f(y)}h${f(w)}v${f(h)}h${f(-w)}z`,c);
function hatchR(g,x,y,w,h,sp,dir=1,c="lt"){for(let k=-h+sp/2;k<w;k+=sp){let ax=x+k,ay=y+h,bx=x+k+h,by=y;if(ax<x){ay-=(x-ax);ax=x}if(bx>x+w){by+=(bx-(x+w));bx=x+w}if(ay-by<.5)continue;if(dir<0){ax=2*x+w-ax;bx=2*x+w-bx}L(g,ax,ay,bx,by,c)}}
function crescent(g,cx,cy,rx,ry,a0,a1,n,len,c="lt"){for(let i=0;i<n;i++){const a=a0+(a1-a0)*i/(n-1);const x=cx+Math.cos(a)*rx,y=cy+Math.sin(a)*ry;const l=len*(1-Math.abs((i/(n-1))-.5)*1.2);L(g,x,y,x-Math.cos(a+.5)*l,y-Math.sin(a+.5)*l,c)}}
function hatchV(g,x,y,w,h,sp,c="lt"){for(let k=sp/2;k<w;k+=sp)L(g,x+k,y,x+k,y+h,c)}
function hatchH(g,x,y,w,h,sp,c="lt"){for(let k=sp/2;k<h;k+=sp)L(g,x,y+k,x+w,y+k,c)}
function hatchTri(g,A,B,Cc,n,c="lt"){for(let i=1;i<=n;i++){const t=i/(n+1);L(g,A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[0]+(Cc[0]-A[0])*t,A[1]+(Cc[1]-A[1])*t,c)}}
function person(g,x,y,s=1,c){C(g,f(x),f(y-11*s),f(1.5*s),c);P(g,`M${f(x)} ${f(y-9.4*s)}v${f(5.4*s)}l${f(-1.6*s)} ${f(4*s)}M${f(x)} ${f(y-4*s)}l${f(1.6*s)} ${f(4*s)}M${f(x-2.4*s)} ${f(y-5*s)}l${f(2.4*s)} ${f(-3.4*s)}l${f(2.4*s)} ${f(3.4*s)}`,c)}
function bird(g,x,y,s=1){P(g,`M${f(x-3*s)} ${f(y)}q${f(1.5*s)} ${f(-2*s)} ${f(3*s)} 0q${f(1.5*s)} ${f(-2*s)} ${f(3*s)} 0`,"lt")}
function lumpy(g,cx,cy,rx,ry,n,c){let d="";const pts=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2+rnd()*.3;pts.push([cx+Math.cos(a)*rx*(.9+rnd()*.15),cy+Math.sin(a)*ry*(.9+rnd()*.15)])}
  pts.forEach((p,i)=>{const q=pts[(i+1)%n];const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2;d+=(i?"":`M${f(p[0])} ${f(p[1])}`)+`Q${f(mx+(mx-cx)*.32)} ${f(my+(my-cy)*.32)} ${f(q[0])} ${f(q[1])}`});P(g,d,c)}
function canopy(g,cx,cy,r,apples=0){lumpy(g,cx,cy,r,r*.85,9);const n=Math.max(2,Math.round(r*.9));
  for(let i=0;i<n;i++){const a=rnd()*6.28,d=rnd()*r*.75;const x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.85;P(g,`M${f(x)} ${f(y)}q${f(r*.08)} ${f(-r*.1)} ${f(r*.16)} 0`,"lt")}
  if(r>6)for(let i=0;i<4;i++){const y=cy+r*.22+i*r*.12;L(g,cx+r*(.1+i*.05),y,cx+r*(.55-i*.06),y-r*.18,"lt")}
  for(let i=0;i<apples;i++){const a=rnd()*6.28,d=rnd()*r*.7;C(g,f(cx+Math.cos(a)*d),f(cy+Math.sin(a)*d*.8),f(Math.max(.8,r*.11)),"fillr")}}
function frond(g,x,y,ang,len){const ex=x+Math.cos(ang)*len,ey=y+Math.sin(ang)*len+len*.25;const cx=x+Math.cos(ang)*len*.5,cy=y+Math.sin(ang)*len*.5-len*.25;
  P(g,`M${f(x)} ${f(y)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`);for(let t=.2;t<.95;t+=.11){const px=(1-t)*(1-t)*x+2*(1-t)*t*cx+t*t*ex,py=(1-t)*(1-t)*y+2*(1-t)*t*cy+t*t*ey;
  L(g,px,py,px+Math.cos(ang+.9)*len*.16*(1-t*.5),py+len*.2*(1-t*.4),"lt");L(g,px,py,px+Math.cos(ang-.9)*len*.12,py+len*.17*(1-t*.4),"lt")}}
function palm(g,x,y,h,lean=4){const tx=x+lean*.4,ty=y-h;P(g,`M${f(x-2.5)} ${y}Q${f(x+lean)} ${f(y-h*.5)} ${f(tx-1.5)} ${f(ty)}`);P(g,`M${f(x+2.5)} ${y}Q${f(x+lean+4)} ${f(y-h*.5)} ${f(tx+1.5)} ${f(ty)}`);
  for(let t=.06;t<.98;t+=.07){const yy=y-h*t,xx=x+lean*t*(1.6-t)*.9;L(g,xx-2,yy,xx+2.4,yy-1.2,"lt")}
  [-2.95,-2.5,-2.0,-1.45,-.95,-.45,.05].forEach(a=>frond(g,tx,ty,a,h*.42));C(g,tx-1.4,ty+2,1.3,"fillr");C(g,tx+1.4,ty+2.6,1.3,"fillr");C(g,tx,ty+3.6,1.3,"fillr")}
function win(g,x,y,w,h,arch=0,dark=1){if(arch){P(g,`M${f(x)} ${f(y+h)}V${f(y+w/2)}Q${f(x)} ${f(y)} ${f(x+w/2)} ${f(y)}Q${f(x+w)} ${f(y)} ${f(x+w)} ${f(y+w/2)}V${f(y+h)}Z`)}else R(g,x,y,w,h);
  if(dark)hatchR(g,x+.5,y+(arch?w/2:.5),w-1,h-(arch?w/2:1)-.5,1.7,1);L(g,x-1,y+h+.8,x+w+1,y+h+.8,"lt")}
function wheel(g,x,y,r,tread){C(g,x,y,r,"hv");C(g,x,y,r*.55);C(g,x,y,r*.16);for(let k=0;k<6;k++){const a=k*1.047;L(g,x+Math.cos(a)*r*.2,y+Math.sin(a)*r*.2,x+Math.cos(a)*r*.52,y+Math.sin(a)*r*.52,"lt")}
  if(tread){const n=Math.round(r*1.6);for(let k=0;k<n;k++){const a=k/n*6.283;L(g,x+Math.cos(a)*r,y+Math.sin(a)*r,x+Math.cos(a)*(r-2),y+Math.sin(a)*(r-2),"lt")}}}
function sea(g,y0,rows,w){for(let r=0;r<rows;r++){const y=y0+r*6,a=(2.2-r*.25).toFixed(1);let d=`M${-4+r*5} ${y}`;for(let k=0;k<Math.ceil(w/28)+1;k++)d+=` q7 -${a} 14 0 q7 ${a} 14 0`;P(g,d,"lt")}}

const SK={
ship(g){lumpy(g,58,26,22,7,8,"lt");hatchH(g,42,28,32,4,1.5);bird(g,150,22);bird(g,161,16,.8);bird(g,170,26,.7);
  P(g,"M196 102 V26 M212 102 V26 M190 26 H236 M196 26 L212 42 M212 26 L196 42 M196 42 L212 58 M212 42 L196 58 M196 58 L212 74 M212 58 L196 74 M196 74 L212 90 M212 74 L196 90 M232 26 V44 M226 44 h12 v6 h-12z","lt");
  sea(g,124,5,240);
  P(g,"M14 98 H200 L212 86 H222 L214 112 Q210 122 196 122 H34 Q20 122 16 110 Z","hv");
  hatchR(g,26,113,184,8,2.2,1,"r");L(g,20,112,210,112);for(let x=30;x<200;x+=12)L(g,x,100,x,110,"lt");for(let x=40;x<190;x+=24)C(g,x,105,1,"lt");
  C(g,206,100,2);P(g,"M206 102 v6 m-3 -2 q3 4 6 0","lt");L(g,212,86,220,82,"lt");
  let x=46;[3,4,4,5,5,4,5,5,4,3,3].forEach((h,i)=>{for(let j=0;j<h;j++){const y=98-(j+1)*8.5;R(g,x,y,12,8.5,(i*3+j)%7===2?"r":"");hatchV(g,x+.4,y+1,11.2,6.5,2)}x+=12.6});
  R(g,18,58,24,40,"hv");for(let j=0;j<4;j++){R(g,20,61+j*9,20,4);hatchR(g,20,61+j*9,20,4,1.3)}L(g,14,58,46,58);L(g,30,58,30,38);L(g,24,44,36,44);C(g,30,38,1.6);P(g,"M26 50 h8","lt");
  P(g,"M214 114 q10 4 20 0 q-8 7 -18 6 M16 116 q-8 2 -14 8","lt")},
plane(g){lumpy(g,46,32,24,8,8,"lt");hatchH(g,28,34,36,5,1.5);lumpy(g,196,130,26,8,8,"lt");hatchH(g,176,132,40,5,1.5);
  P(g,"M0 150 Q60 144 120 148 T240 146","lt");for(let x=4;x<240;x+=9)L(g,x,152,x+5,158,"lt");
  [[112,95],[128,111]].forEach(([x,y])=>{L(g,x,y,6,y+16,"lt");L(g,x,y+4,10,y+21,"lt")});
  P(g,"M26 78 Q30 68 50 66 L188 61 Q212 60 224 69 Q216 78 192 78 L52 82 Q32 84 26 78 Z","hv");
  P(g,"M205 63 l7 2 l-2.4 3.2 h-5 z M213 65.4 l5 2.4 l-3 1.4 z");for(let i=0;i<21;i++)R(g,58+i*6.4,69.2-i*.22,2.4,2.8,"lt");
  L(g,50,74.6,206,70.2,"r");L(g,50,76.4,206,72,"r");P(g,"M70 66.6 v12 M172 62.4 v12","lt");hatchH(g,60,78,130,3,1.2);
  P(g,"M116 66 L140 46 L150 46 L136 66","lt");P(g,"M104 76 L146 120 L162 120 L136 76","hv");L(g,118,92,150,92,"lt");L(g,130,104,155,104,"lt");P(g,"M146 120 l-6 -8 M156 120 l-4 -10","lt");hatchTri(g,[136,76],[162,120],[146,120],5);
  [[112,90],[128,106]].forEach(([x,y])=>{P(g,`M${x} ${y} h16 q4 0 4 3.5 q0 3.5 -4 3.5 h-16 q-3 0 -3 -3.5 q0 -3.5 3 -3.5z`);el("ellipse",{cx:x+19,cy:y+3.5,rx:1.4,ry:3.2},g);hatchV(g,x,y+.5,12,6,1.8);L(g,x+9,y,x+7,y-6,"lt")});
  P(g,"M176 62 L192 30 L203 30 L198 62","hv");hatchR(g,184,34,14,9,1.5,1,"r");P(g,"M184 68 L206 58 L214 60 L198 70")},
net(g){C(g,150,78,52,"hv");for(let i=-2;i<=2;i++)el("ellipse",{cx:150,cy:78+i*20,rx:f(Math.sqrt(52*52-(i*20)**2)),ry:4,class:"lt"},g);
  [12,26,40].forEach(rx=>el("ellipse",{cx:150,cy:78,rx,ry:52,class:"lt"},g));
  P(g,"M116 50 q8 -12 22 -8 q6 6 2 12 q-8 2 -6 10 q-4 8 -12 6 q-8 -10 -6 -20z");P(g,"M160 42 q10 -4 18 2 q2 8 -6 10 q-4 10 4 18 q-2 10 -10 12 q-8 -8 -6 -20 q-6 -10 0 -22z");
  hatchR(g,118,46,18,24,2,1);hatchR(g,158,44,16,40,2,-1);P(g,"M132 92 q6 4 8 12 q-6 6 -10 0z","lt");
  const pts=[[126,58],[168,50],[178,96],[132,106],[150,78]];
  [[0,4],[1,4],[2,4],[3,4],[0,1],[2,3],[1,2]].forEach(([a,b])=>{const[x1,y1]=pts[a],[x2,y2]=pts[b];P(g,`M${x1} ${y1}Q${(x1+x2)/2} ${Math.min(y1,y2)-18} ${x2} ${y2}`,"r");for(let t=.25;t<1;t+=.25){const mx=(1-t)*(1-t)*x1+2*(1-t)*t*(x1+x2)/2+t*t*x2,my=(1-t)*(1-t)*y1+2*(1-t)*t*(Math.min(y1,y2)-18)+t*t*y2;C(g,f(mx),f(my),.9,"fillr")}});
  pts.forEach(([x,y],i)=>{C(g,x,y,i===4?4:2.6,"fillr");C(g,x,y,i===4?7.5:5,"lt")});
  R(g,206,14,10,8);R(g,190,15,14,6);hatchV(g,190,15,14,6,2);R(g,218,15,14,6);hatchV(g,218,15,14,6,2);L(g,211,22,211,28);C(g,211,29,2);P(g,"M207 33 q-14 8 -30 20","lt r");P(g,"M200 36 q4 4 8 0 M197 40 q7 7 14 0","lt");
  R(g,8,70,44,76,"hv");C(g,20,84,7.5);C(g,40,84,7.5);C(g,20,84,2);C(g,40,84,2);[0,1,2].forEach(k=>{L(g,20,84,20+7*Math.cos(k*2.1),84+7*Math.sin(k*2.1),"lt");L(g,40,84,40+7*Math.cos(k*2.1+1),84+7*Math.sin(k*2.1+1),"lt")});
  R(g,12,98,36,14);for(let r=0;r<3;r++)for(let c=0;c<8;c++)C(g,15+c*4.3,101+r*4,.7,(r+c)%5?"lt":"fillr");R(g,12,116,36,26);hatchH(g,12,116,36,26,2.6);L(g,8,74,52,74,"lt");
  P(g,"M52 118 C80 128 96 112 132 106","lt r");P(g,"M2 146 H58","")},
food(g){P(g,"M0 16 Q50 20 90 32 Q112 38 128 34","hv");P(g,"M62 24 q-4 -12 4 -18 M92 32 q8 -12 20 -12","");
  [[28,18,-.5],[70,28,.6],[104,36,-.25],[46,22,1],[118,26,-.9]].forEach(([x,y,a])=>{const g2=el("g",{transform:`translate(${x} ${y}) rotate(${f(a*57)})`},g);P(g2,"M0 0 Q8 -6 18 0 Q8 6 0 0Z");L(g2,0,0,18,0,"lt");for(let k=4;k<16;k+=3){L(g2,k,0,k+2,-2.4,"lt");L(g2,k,0,k+2,2.4,"lt")}});
  apple(g,116,80,1,"r");crescent(g,116,84,34,30,-1.1,1.3,16,12,"r lt");P(g,"M98 66 q-4 6 -2 14","lt");for(let i=0;i<18;i++)C(g,f(96+rnd()*40),f(62+rnd()*36),.5,"lt");
  P(g,"M236 150 V128 H214 V150","hv");hatchV(g,214,130,22,20,3);C(g,225,128,6);C(g,225,128,2);L(g,222,124,194,88,"hv");L(g,229,126,201,91,"hv");C(g,198,89,5);C(g,198,89,1.6);
  L(g,196,85,160,83,"hv");L(g,198,94,160,91,"hv");C(g,157,87,4);P(g,"M153 83 l-9 -6 l-4 4 M153 91 l-9 6 l-4 -4","hv");P(g,"M200 112 q8 14 26 18","lt");
  R(g,164,66,18,11);C(g,163,71.5,4.4);C(g,163,71.5,2.2);C(g,163,71.5,.8,"fillr");P(g,"M159 71 L130 60 M159 73 L132 98","lt r");
  L(g,14,140,200,140);L(g,14,148,200,148);for(let x=20;x<200;x+=9)C(g,x,144,3,"lt");[[44,131],[74,132],[104,131]].forEach(([x,y])=>apple(g,x,y,.22,"r"));
  R(g,8,100,24,24);R(g,13,105,14,14);for(let k=0;k<5;k++){L(g,11+k*4.6,100,11+k*4.6,96,"lt");L(g,11+k*4.6,124,11+k*4.6,128,"lt");L(g,8,103+k*4.6,4,103+k*4.6,"lt");L(g,32,103+k*4.6,36,103+k*4.6,"lt")}hatchR(g,13,105,14,14,1.5);
  P(g,"M36 108 H70 Q90 108 104 96","lt");P(g,"M36 116 H64","lt")},
cairo(g){C(g,282,28,11,"r");for(let i=0;i<16;i++){const a=i/16*6.28,r2=i%2?17:21;L(g,282+Math.cos(a)*14,28+Math.sin(a)*14,282+Math.cos(a)*r2,28+Math.sin(a)*r2,"r")}
  bird(g,118,26);bird(g,128,20,.8);bird(g,138,30,.7);P(g,"M0 74 Q150 88 300 70","lt");P(g,"M0 80 Q150 96 300 78","lt");
  P(g,"M88 152 L110 128 L132 152 M118 152 L132 136 L146 152","lt");hatchTri(g,[110,128],[132,152],[110,152],6);
  R(g,12,56,70,130,"hv");P(g,"M82 56 L92 62 V186");hatchV(g,82,62,10,124,2.1);L(g,10,56,84,56);L(g,12,61,82,61,"lt");
  for(let fl=0;fl<5;fl++){const y=67+fl*23;L(g,12,y+19,82,y+19,"lt");[18,40,62].forEach((x,i)=>{if(fl===1&&i===1)return;win(g,x,y,11,14);L(g,x-2,y,x-2,y+14,"lt");L(g,x+13,y,x+13,y+14,"lt")})}
  R(g,34,87,26,22);hatchR(g,34,87,26,22,3,1);hatchR(g,34,87,26,22,3,-1);L(g,32,109,62,109);L(g,32,111.5,62,111.5,"lt");
  [[19,119],[64,142],[60,166]].forEach(([x,y])=>{R(g,x,y,8,5);hatchH(g,x,y,8,5,1.3)});
  el("ellipse",{cx:26,cy:50,rx:6,ry:2.6},g);L(g,26,52.6,26,56);L(g,26,50,30,46,"lt");R(g,58,44,14,10);hatchV(g,58,44,14,10,2.3);L(g,60,54,60,56);L(g,70,54,70,56);
  P(g,"M92 96 Q100 104 112 100","lt");[95,100,105].forEach((x,i)=>R(g,x,99.5+i*.6,3.2,i===1?6:5,i===1?"r":"lt"));
  win(g,38,166,13,20,1,0);hatchR(g,39.5,174,10,12,1.8);L(g,44.5,172,44.5,186,"lt");
  palm(g,104,186,72,5);
  R(g,150,138,90,48,"hv");let cr="M150 138";for(let x=150;x<240;x+=6)cr+=" l1.5 -4 h3 l1.5 4";P(g,cr);for(let i=0;i<6;i++)win(g,155+i*14.4,150,9,24,1);L(g,150,178,240,178,"lt");
  R(g,166,128,58,10);for(let x=170;x<222;x+=5)L(g,x,130,x,136,"lt");P(g,"M166 128 Q164 98 195 92 Q226 98 224 128","hv");
  [-22,-12,0,12,22].forEach(dx=>P(g,`M${195+dx} 128 Q${f(195+dx*.7)} 104 195 92`,"lt"));for(let k=0;k<6;k++){const y=100+k*4.4;L(g,206+k,y,214+k*1.3,y+3,"lt")}
  L(g,195,92,195,82);C(g,195,80,1.6);P(g,"M193 76 a3 3 0 1 0 4 0","r");
  [[140,40],[250,48]].forEach(([x,top])=>{R(g,x-5,96,10,90,"hv");hatchV(g,x+.6,96,4.4,90,1.5);
    [[96,9],[70,7.4]].forEach(([y,w])=>{L(g,x-w,y,x+w,y);L(g,x-w,y+2,x+w,y+2);let z=`M${f(x-w)} ${y+2}`;for(let k=0;k<w*2-1;k+=2)z+=" l1 3 l1 -3";P(g,z,"lt")});
    R(g,x-3.6,70,7.2,26);hatchV(g,x+.4,70,3,26,1.4);P(g,`M${x-4} 70 L${x} ${top} L${x+4} 70`);hatchTri(g,[x,top],[x+4,70],[x,70],4);L(g,x,top,x,top-6);P(g,`M${x-2} ${top-9} a2.4 2.4 0 1 0 3 .4`,"r");
    [110,130,150].forEach(y=>win(g,x-1.6,y,3.2,7,1))});
  R(g,258,86,40,100,"hv");for(let fl=0;fl<3;fl++)[262,276,288].forEach(x=>win(g,x,94+fl*20,7,11,1));hatchV(g,292,86,6,100,2);
  P(g,"M256 156 H298 L294 166 H260 Z");for(let x=258;x<296;x+=4)L(g,x,156,x+.8,166,(x/4)%2?"r":"lt");R(g,264,144,28,8);hatchH(g,264,144,28,8,2);[264,274,284].forEach(x=>C(g,x+2,180,2.4,"fillr"));
  R(g,196,168,34,8);hatchH(g,196,168,34,8,2);for(let i=0;i<9;i++)C(g,f(199+i*3.6),f(165.6-rnd()*2),1.6,"fillr");
  C(g,203,182,5);C(g,203,182,1);for(let k=0;k<6;k++)L(g,203,182,203+5*Math.cos(k),182+5*Math.sin(k),"lt");L(g,230,176,236,186);
  P(g,"M194 156 Q213 146 232 156");L(g,213,151,213,168);hatchR(g,197,150,33,6,2);
  person(g,240,186,1.3);person(g,126,186,1.2);person(g,134,186,1.1);person(g,284,186,1.25);
  P(g,"M8 186 v-7 q1 -5 9 -6 l7 -7 h17 l8 7 q9 1 10 6 v7","hv");P(g,"M26 167 h7 v6 h-11z M36 167 h5 l6 6 h-11z","lt");[20,50].forEach(x=>{C(g,x,186,4.6);C(g,x,186,1.6)});
  L(g,0,186,300,186,"hv");L(g,0,190,300,190,"lt");for(let i=0;i<34;i++){const x=rnd()*300,y=192+rnd()*6;L(g,x,y,x+4,y,"lt")}},
stadium(g){P(g,"M0 64 Q40 44 84 52 Q130 32 180 44 Q236 36 300 58");for(let i=0;i<70;i++){const x=rnd()*300,y=60-16*Math.sin(x/300*3.14)+rnd()*8;P(g,`M${f(x)} ${f(y)}l1 -2.6 l1 2.6`,"lt")}hatchR(g,0,56,300,14,3,1);
  lumpy(g,232,20,20,6,7,"lt");hatchH(g,218,21,28,4,1.5);bird(g,60,24);bird(g,70,18,.8);
  const cx=150,cy=130;for(let k=0;k<=7;k++){const t=k/7;el("ellipse",{cx,cy:f(cy-14*t),rx:f(80+60*t),ry:f(26+38*t),class:k===0||k===7?"hv":"lt"},g)}
  for(let a=0;a<28;a++){const th=a/28*6.283;L(g,cx+Math.cos(th)*80,cy+Math.sin(th)*26,cx+Math.cos(th)*140,cy-14+Math.sin(th)*64,"lt")}
  for(let i=0;i<720;i++){const th=rnd()*6.283,t=.05+rnd()*.92;C(g,f(cx+Math.cos(th)*(80+60*t)),f(cy-14*t+Math.sin(th)*(26+38*t)),.55,i%47===0?"fillr":"lt")}
  P(g,"M96 140 L204 140 L192 122 L108 122 Z");hatchTri(g,[96,140],[108,122],[108,140],5);hatchTri(g,[204,140],[192,122],[192,140],5);for(let k=1;k<10;k++){const t=k/10;L(g,96+t*108,140,108+t*84,122,"lt")}
  P(g,"M101 131 v-6 M99 125 h4 M199 131 v-6 M197 125 h4");C(g,150,131,3,"lt");
  R(g,104,50,92,12,"hv");hatchV(g,104,53,92,6,2.6);L(g,100,62,200,62);P(g,"M100 62 L104 50 M200 62 L196 50");L(g,150,50,150,40);P(g,"M150 40 h8 l-2 3 l2 3 h-8","r");
  [[22,112],[278,112]].forEach(([x,y])=>{P(g,`M${x-4} ${y} L${x-1} 34 M${x+4} ${y} L${x+1} 34`);for(let yy=40;yy<y-6;yy+=7){const w1=1+3*(yy-34)/(y-34),w2=1+3*(yy+7-34)/(y-34);L(g,x-w1,yy,x+w2,yy+7,"lt")}R(g,x-11,22,22,12);hatchV(g,x-11,22,22,12,2.75);hatchH(g,x-11,22,22,12,3)});
  [[30,196],[72,198],[228,197],[270,196]].forEach(([x,y],i)=>{P(g,`M${x-12} ${y-6} L${x} ${y-16} L${x+12} ${y-6} Z`,i%2?"r":"");hatchTri(g,[x,y-16],[x+12,y-6],[x,y-6],4);L(g,x-11,y-6,x-11,y);L(g,x+11,y-6,x+11,y);person(g,x+17,y,1)})},
factory(g){C(g,256,32,12,"r");hatchR(g,247,23,18,18,2.2,1,"r");
  P(g,"M0 92 Q40 66 92 80 Q140 58 200 76 Q250 60 300 80");hatchR(g,0,74,300,18,5,-1);for(let i=0;i<12;i++){const x=10+i*25+rnd()*8,y=82-12*Math.sin(x/90)-rnd()*4;lumpy(g,x,y-4,4,3,6,"lt");L(g,x,y,x,y+3,"lt")}
  P(g,"M74 106 L82 58 L90 106 M77 90 H87 M79 76 H85 M72 66 H92 M82 58 V54 M76 98 L88 90 M78 84 L86 78","lt");P(g,"M0 62 Q38 70 72 66 M92 66 Q190 72 300 64","lt");
  const y0=104,y1=178;R(g,60,y0,226,y1-y0,"hv");let d=`M60 ${y0}`;for(let x=60;x<285;x+=22.6){d+=` L${f(x+22.6)} ${y0-16} V${y0}`;hatchV(g,x+18.6,y0-14,4,14,1.1);L(g,x+2,y0-2,x+20,y0-14,"lt")}P(g,d);
  hatchH(g,60,y0+1,226,10,3.3);R(g,64,114,218,10);for(let x=64;x<282;x+=5.4)L(g,x,114,x,124,"lt");
  R(g,10,94,50,84,"hv");for(let x=14;x<58;x+=5)L(g,x,98,x,174,"lt");for(let y=100;y<174;y+=6)L(g,12,y,58,y,"lt");hatchR(g,12,96,46,78,5,1);L(g,8,94,62,94);
  R(g,94,132,96,46,"hv");L(g,94,170,190,170);for(let x=98;x<190;x+=6)C(g,x,173.5,2,"lt");hatchR(g,94,132,96,6,1.8);
  P(g,"M118 168 v-9 q2 -6 9 -7 l8 -6 h18 l8 6 q9 1 11 7 v9");[129,162].forEach(x=>{C(g,x,168,4);C(g,x,168,1.4)});P(g,"M138 147 h7 v5 h-10z M148 147 h6 l5 5 h-11z","lt");
  const arm=(bx,s)=>{R(g,bx-5,162,10,8);hatchV(g,bx-5,162,10,8,2);C(g,bx,159,3);L(g,bx,159,bx+s*10,140,"hv");C(g,bx+s*10,140,2.4);L(g,bx+s*10,140,bx+s*22,148,"hv");P(g,`M${bx+s*22} 148 l${s*3} 3 m${-s*3} -3 l${s} 4`)};arm(104,1);arm(182,-1);
  [[126,148],[160,148]].forEach(([x,y])=>{for(let k=0;k<8;k++){const a=-2.8+k*.4;L(g,x,y,x+Math.cos(a)*6.5,y+Math.sin(a)*6.5,"r")}});
  [214,234,254].forEach(x=>{R(g,x,146,16,32);hatchH(g,x,146,16,18,3.6)});
  R(g,192,164,58,22,"hv");hatchV(g,192,164,58,22,6.5);P(g,"M250 186 V170 h12 l8 8 v8 z","hv");P(g,"M253 172 h8 l5 5 h-13z","lt");[202,218,262].forEach(x=>{C(g,x,188,4.4);C(g,x,188,1.6)});
  for(let i=0;i<7;i++){const x=10+i*25;P(g,`M${x} 197 v-4 q1 -3 5 -4 l4 -4 h8 l5 4 q5 1 5 4 v4`,"lt");C(g,x+5,197,2,"lt");C(g,x+19,197,2,"lt")}
  palm(g,292,190,86,-4);L(g,0,190,300,190,"hv")},
orchard(g){lumpy(g,60,24,24,7,8,"lt");hatchH(g,42,26,36,5,1.5);lumpy(g,206,18,18,5,7,"lt");bird(g,140,30);bird(g,150,24,.8);
  P(g,"M0 86 Q50 64 110 76 Q170 58 230 70 Q270 62 300 74");hatchR(g,0,66,300,22,3.4,1);
  R(g,232,50,5,20);P(g,"M231 50 L234.5 40 L238 50");C(g,234.5,56,1.4,"lt");R(g,222,62,9,8,"lt");R(g,240,60,12,10,"lt");hatchV(g,240,60,12,10,2.4);
  const vx=150,vy=92;L(g,0,92,300,92,"lt");[118,134,166,182].forEach(x=>L(g,x,200,vx+(x-150)*.05,vy+2,"lt"));
  [-1,1].forEach(side=>{for(let w=0;w<3;w++)L(g,vx+side*10,vy-4.6-w*1.4,vx+side*132,vy+58+w*12,"lt")});
  for(let k=9;k>=0;k--){const u=Math.pow(1-k/10,1.6),y=vy+104*u,s=.1+.9*u;[-1,1].forEach(side=>{const x=vx+side*(10+122*u);L(g,x+side*3*s,y,x+side*3*s,y-46*s,"lt");P(g,`M${f(x-1.2*s)} ${f(y)}q${f(side*s)} ${f(-10*s)} 0 ${f(-20*s)}M${f(x+1.2*s)} ${f(y)}q${f(side*s)} ${f(-10*s)} 0 ${f(-20*s)}`);canopy(g,x,y-30*s,16*s,s>.25?Math.round(6*s)+1:0)})}
  for(let i=0;i<46;i++){const x=rnd()*300,y=150+rnd()*48;if(Math.abs(x-150)<56&&y>150)continue;P(g,`M${f(x)} ${f(y)}l-1 -3 m1 3 l0 -4 m0 4 l1.4 -3`,"lt")}
  wheel(g,126,178,13,1);wheel(g,102,182,8,1);P(g,"M94 172 L100 160 H118 V146 H138 V166 L141 172","hv");R(g,120,148,16,14,"lt");hatchR(g,121,149,14,12,1.8);L(g,108,160,108,147);L(g,106,147,110,147);hatchH(g,96,162,20,8,2.2);
  L(g,141,168,154,168);R(g,154,152,44,20,"hv");hatchH(g,154,155,44,17,3);R(g,160,136,28,16);hatchR(g,160,136,28,16,1.8);L(g,154,152,160,136,"lt");L(g,198,152,188,136,"lt");
  [166,174,182].forEach(x=>C(g,x,133.5,2.2,"fillr"));wheel(g,162,177,6,1);wheel(g,190,177,6,1);P(g,"M188 140 l6 -6 h5")},
poet(g){const T=[[[100,40],[150,70],[118,96]],[[100,40],[118,96],[60,88]],[[60,88],[118,96],[96,170]],[[118,96],[150,70],[164,140]],[[96,170],[164,140],[130,196]],[[60,88],[40,140],[96,170]],[[40,140],[96,170],[74,200]],[[150,70],[178,108],[164,140]],[[118,96],[164,140],[96,170]]];
  el("circle",{cx:108,cy:120,r:86,class:"lt ghost"},g);L(g,10,120,196,120,"lt ghost");L(g,108,20,108,226,"lt ghost");
  T.forEach((t,i)=>{const c=[(t[0][0]+t[1][0]+t[2][0])/3,(t[0][1]+t[1][1]+t[2][1])/3];[[t[0],t[1]],[t[1],t[2]],[t[2],t[0]]].forEach(([a,b],j)=>{P(g,`M${a[0]} ${a[1]}L${b[0]} ${b[1]}L${f(c[0])} ${f(c[1])}Z`,(i*3+j)%11===4?"r":"");const n=[0,3,5,8,2,6][(i*3+j)%6];if(n)hatchTri(g,[c[0],c[1]],a,b,n,(i+j)%4===0?"r lt":"lt")})});
  P(g,"M100 40 Q104 22 112 14");P(g,"M106 26 Q124 8 142 18 Q124 32 106 26 Z");L(g,106,26,142,18,"lt");hatchTri(g,[106,26],[142,18],[124,10],4);
  P(g,"M24 214 H186");hatchR(g,40,206,120,8,2.4,1);el("ellipse",{cx:104,cy:206,rx:56,ry:6,class:"lt"},g)},
arrow(g){const cx=100,cy=104,R0=72;C(g,cx,cy,R0,"lt");C(g,cx,cy,R0-8,"lt");for(let i=0;i<60;i++){const a=i/60*6.283,l=i%5?3:6;L(g,cx+Math.cos(a)*(R0-8),cy+Math.sin(a)*(R0-8),cx+Math.cos(a)*(R0-8+l),cy+Math.sin(a)*(R0-8+l),"lt")}
  for(let i=0;i<8;i++){const a=-Math.PI/2+i*Math.PI*2/8,x=cx+Math.cos(a)*R0,y=cy+Math.sin(a)*R0;
    if(i===0){el("ellipse",{cx:x,cy:y,rx:2.4,ry:4,class:"fillr"},g)}
    else if(i===1){P(g,`M${f(x)} ${f(y+6)}v-10M${f(x)} ${f(y-1)}q-7 -5 -9 2M${f(x)} ${f(y-3)}q7 -5 9 2`);L(g,x-6,y+6,x+6,y+6,"lt")}
    else if(i===2){L(g,x,y+8,x,y-6);canopy(g,x,y-9,6)}
    else if(i===3){L(g,x,y+10,x,y-6);canopy(g,x,y-12,10)}
    else if(i===4){L(g,x,y+12,x,y-4);canopy(g,x,y-12,12);for(let k=0;k<6;k++)C(g,f(x+(rnd()-.5)*18),f(y-12+(rnd()-.5)*14),1.2,"lt")}
    else if(i===5){L(g,x,y+12,x,y-4);canopy(g,x,y-12,12,6)}
    else if(i===6){apple(g,x,y,.32,"r")}
    else{C(g,x,y,9,"r");for(let k=0;k<5;k++){const b=k/5*6.283;el("ellipse",{cx:f(x+Math.cos(b)*4),cy:f(y+Math.sin(b)*4),rx:1,ry:2,transform:`rotate(${f(b*57+90)} ${f(x+Math.cos(b)*4)} ${f(y+Math.sin(b)*4)})`,class:"fillr"},g)}}}
  for(let i=0;i<8;i++){const a=-Math.PI/2+(i+.5)*Math.PI*2/8;P(g,`M${f(cx+Math.cos(a-.08)*(R0+12))} ${f(cy+Math.sin(a-.08)*(R0+12))}A${R0+12} ${R0+12} 0 0 1 ${f(cx+Math.cos(a+.08)*(R0+12))} ${f(cy+Math.sin(a+.08)*(R0+12))}`,"lt")}
  apple(g,cx,cy+4,.55,"");crescent(g,cx,cy+6.2,19,16.5,-1,1.3,10,6);C(g,cx,cy,1.4,"fillr")},
sign(g){apple(g,70,70,1.15,"r hv");crescent(g,70,74.6,40,35,-1.1,1.35,20,14,"r lt");P(g,"M50 52 q-6 8 -3 18","lt");for(let i=0;i<22;i++)C(g,f(44+rnd()*50),f(44+rnd()*50),.5,"lt");
  P(g,"M74 28 l5 -3 m-5 3 q10 -8 24 -2","lt");el("ellipse",{cx:72,cy:110,rx:40,ry:5,class:"lt"},g);hatchR(g,40,106,64,6,2.2,1);
  P(g,"M130 96 H232","lt");P(g,"M130 74 C150 44 170 44 180 64 S 206 90 224 54","lt");P(g,"M218 50 l7 3 l-2 7","lt")}
};

const drawn=new WeakSet();
function build(svg,key){if(drawn.has(svg))return;drawn.add(svg);seed=key.length*97+11;const g=el("g",{filter:"url(#rough)"},svg);SK[key](g);
  const all=g.querySelectorAll("path,line,circle,ellipse,rect,polyline");all.forEach((p,i)=>{p.setAttribute("pathLength","1");p.style.setProperty("--dl",Math.min(1.1,i*0.018).toFixed(3)+"s");p.style.setProperty("--d",(1.1+Math.min(.9,i*0.008)).toFixed(2)+"s")});
  // pencil double line
  const ghost=g.cloneNode(true);ghost.setAttribute("transform","translate(.8 .5)");ghost.setAttribute("opacity",".28");ghost.removeAttribute("filter");svg.insertBefore(ghost,g)}
document.querySelectorAll("svg[data-sk]").forEach(s=>build(s,s.dataset.sk));

// ---------- reveal observer ----------
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.18,rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll(".reveal,.draw").forEach(n=>io.observe(n));
requestAnimationFrame(()=>setTimeout(()=>document.body.classList.add("loaded"),60));

// ---------- counters ----------
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const b=e.target,n=+b.dataset.n,t0=performance.now();cio.unobserve(b);
  if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;const step=t=>{const p=Math.min(1,(t-t0)/1400);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.6});
document.querySelectorAll(".pf b[data-n]").forEach(b=>cio.observe(b));

// ---------- pitch form ----------
const pf=document.getElementById("pform");
pf.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(pf);const name=(d.get("name")||"").trim(),co=(d.get("company")||"").trim(),line=(d.get("line")||"").trim(),why=(d.get("why")||"").trim(),deck=(d.get("deck")||"").trim();
  const note=document.getElementById("fnote");if(!name||!co||!line||!why){note.textContent="Add your name, what you're building and why first.";note.classList.add("err");return}
  note.classList.remove("err");const body=`Hi Youhanna,\n\nWhat I'm building:\n${line}\n\nWhy I'm doing it:\n${why}\n\n${deck?"Link: "+deck+"\n\n":""}${name}\n${co}`;
  const url=`mailto:ymm28@cornell.edu?subject=${encodeURIComponent("Pitch: "+co)}&body=${encodeURIComponent(body)}`;
  location.href=url;note.textContent="If your email app didn't open, try again from a device with an email app set up."});

// ---------- abundance horizontal scroll ----------
const ab=document.getElementById("abundance"),track=document.getElementById("track"),abar=document.getElementById("abar");
const mq=matchMedia("(max-width:760px),(prefers-reduced-motion:reduce)");
function sizeAb(){if(mq.matches){ab.style.height="";return}const extra=Math.max(0,track.scrollWidth-innerWidth);ab.style.height=(innerHeight+extra)+"px"}

// ---------- nav / scroll ----------
const nav=document.getElementById("nav"),links=[...nav.querySelectorAll("ul a")];
const secs=links.map(a=>document.querySelector(a.getAttribute("href")));
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;nav.style.setProperty("--p",(y/h).toFixed(3));nav.classList.toggle("solid",y>40);
  const dark=[document.getElementById("stack"),document.getElementById("art")].some(s=>{const r=s.getBoundingClientRect();return r.top<60&&r.bottom>60});nav.classList.toggle("dark",dark);{const a=document.getElementById("art").getBoundingClientRect();nav.classList.toggle("night",a.top<60&&a.bottom>60)}
  let cur=-1;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.4)cur=i});links.forEach((a,i)=>a.classList.toggle("on",i===cur));
  if(!mq.matches){const r=ab.getBoundingClientRect();const max=ab.offsetHeight-innerHeight;const p=Math.min(1,Math.max(0,-r.top/max));const extra=track.scrollWidth-innerWidth;track.style.transform=`translate3d(${-p*extra}px,0,0)`;abar.style.transform=`scaleX(${p})`;
    track.querySelectorAll(".draw").forEach(s=>{const b=s.getBoundingClientRect();if(b.left<innerWidth*.92)s.classList.add("in")})}
  storyScroll();isoScroll()}

// ---------- isometric stack ----------
const ISO=document.getElementById("iso");const plates=[];const NAMES=["INFRA","EDGE","SOFTWARE","HARNESS"];
el("path",{class:"spine",d:"M260 40 V660"},ISO);
const BASE=560;for(let i=3;i>=0;i--){const g=el("g",{class:"plate"},ISO);const y=BASE;g.dataset.i=i;
  el("path",{class:"edge",d:`M90 ${y} L260 ${y+85} L430 ${y} L430 ${y+12} L260 ${y+97} L90 ${y+12} Z`},g);
  el("path",{class:"face",d:`M90 ${y} L260 ${y-85} L430 ${y} L260 ${y+85} Z`},g);
  const ic=el("g",{class:"ic",transform:`translate(260 ${y}) scale(1 .5) rotate(45)`},g);
  if(i===0){el("rect",{x:-40,y:-40,width:80,height:80},ic);for(let k=-30;k<=30;k+=12){el("path",{d:`M${k} -40 v-12 M${k} 40 v12 M-40 ${k} h-12 M40 ${k} h12`},ic)}el("rect",{x:-20,y:-20,width:40,height:40},ic);for(let k=-14;k<=14;k+=7)el("path",{d:`M-20 ${k} h40`},ic)}
  if(i===1){[[-30,-30],[30,30],[-30,30],[30,-30]].forEach(([x,yy])=>{el("circle",{cx:x,cy:yy,r:12},ic);el("circle",{cx:x,cy:yy,r:5},ic)});el("rect",{x:-12,y:-12,width:24,height:24},ic)}
  if(i===2){const n=[[-44,-30],[-10,-46],[30,-20],[44,24],[0,10],[-36,30],[10,46]];[[0,4],[1,4],[2,4],[3,4],[5,4],[6,4],[0,1],[2,3],[5,6]].forEach(([a,b])=>el("path",{d:`M${n[a][0]} ${n[a][1]} L${n[b][0]} ${n[b][1]}`},ic));n.forEach(([x,yy])=>el("circle",{cx:x,cy:yy,r:5},ic))}
  if(i===3){el("path",{d:"M-56 0 C-40 -50 40 -50 56 0 C40 50 -40 50 -56 0 Z"},ic);el("path",{d:"M-56 0 l10 -10 M-56 0 l12 4 M56 0 l-10 10 M56 0 l-12 -4"},ic);el("path",{d:"M-26 -20 Q0 -4 26 -20 M-26 20 Q0 4 26 20",opacity:.7},ic)}
  el("path",{class:"hit",d:`M90 ${y} L260 ${y-85} L430 ${y} L430 ${y+12} L260 ${y+97} L90 ${y+12} Z`},g);plates[i]=g}
// order DOM so top plate drawn last
plates.forEach(p=>ISO.appendChild(p));
const chip=document.getElementById("chip"),lxw=document.getElementById("lxw"),lxs=[...document.querySelectorAll(".lx")],hint=document.getElementById("chipHint");
const mob=matchMedia("(max-width:760px)");let act=-1,spreadS=0;
const lxOf=i=>lxs.find(l=>+l.dataset.i===i);
function layoutChip(){const sc=ISO.getBoundingClientRect().width/520;let gap=0;
  if(act>=0&&!mob.matches){gap=(lxOf(act).querySelector(".lx-b>p").scrollHeight+38)/sc}
  plates.forEach((g,i)=>{let off=-(i*92*spreadS+(1-spreadS)*i*14);if(act>=0&&i>=act)off-=gap;if(act>=0&&i>act&&!mob.matches)off-=80;if(i===act)off-=10;g._off=off;g.style.transform=`translateY(${off}px)`});
  if(mob.matches){lxs.forEach(l=>l.style.top="");return}
  const dy=ISO.getBoundingClientRect().top-lxw.getBoundingClientRect().top;
  lxs.forEach(l=>{const i=+l.dataset.i,hh=l.querySelector(".lx-h").offsetHeight;l.style.top=(dy+(BASE+plates[i]._off)*sc-hh/2)+"px"})}
function setAct(i){act=(act===i)?-1:i;chip.classList.toggle("has-act",act>=0);
  plates.forEach((p,k)=>p.classList.toggle("act",k===act));
  lxs.forEach(l=>{const on=+l.dataset.i===act;l.classList.toggle("open",on);l.querySelector(".lx-h").setAttribute("aria-expanded",on)});
  if(hint)hint.classList.toggle("gone",act>=0);layoutChip()}
plates.forEach((p,i)=>{p.addEventListener("click",()=>setAct(i));p.addEventListener("pointerenter",()=>{p.classList.add("hov");lxOf(i).classList.add("hov")});p.addEventListener("pointerleave",()=>{p.classList.remove("hov");lxOf(i).classList.remove("hov")})});
lxs.forEach(l=>{const i=+l.dataset.i;const h=l.querySelector(".lx-h");h.addEventListener("click",()=>setAct(i));
  h.addEventListener("pointerenter",()=>plates[i].classList.add("hov"));h.addEventListener("pointerleave",()=>plates[i].classList.remove("hov"))});
function isoScroll(){const r=ISO.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.95-r.top)/(innerHeight*.55)));const ns=mq.matches?1:p;if(Math.abs(ns-spreadS)>.002||spreadS===0){spreadS=ns;layoutChip()}}
addEventListener("resize",()=>layoutChip());
// ---------- story map ----------
const MAP=document.getElementById("map");(function(){const lg=el("g",{},MAP);
  for(let i=1;i<6;i++)el("path",{class:"grid",d:`M0 ${i*53} Q250 ${i*53-18} 500 ${i*53}`},lg);for(let i=1;i<9;i++)el("path",{class:"grid",d:`M${i*55} 0 Q${i*55+(i-4.5)*6} 160 ${i*55} 320`},lg);
  const land=el("g",{filter:"url(#rough)"},MAP);
  el("path",{class:"land",d:"M20 60 C60 40 110 50 150 70 C170 110 140 150 120 170 C100 200 80 230 70 270 M60 90 C40 120 50 150 70 160"},land);
  el("path",{class:"land",d:"M300 70 C340 60 380 70 400 60 C430 70 450 90 460 110 C450 150 420 170 410 200 C400 240 380 270 360 290 M330 130 C350 140 380 140 400 130 C390 170 360 180 340 170"},land);
  const pts={ca:[46,150],hv:[146,122],ith:[176,98],cai:[400,148]};
  const tr=el("path",{class:"trail",id:"trail",pathLength:1,d:`M${pts.cai} C 330 40 200 40 ${pts.hv} S 70 120 ${pts.ca} S 180 40 ${pts.ith}`},MAP);
  const L=[["CAIRO",pts.cai,10,22],["HAPPY VALLEY",pts.hv,8,22],["CALIFORNIA",pts.ca,-24,24],["ITHACA",pts.ith,12,-8]];
  L.forEach(([n,[x,y],dx,dy],i)=>{el("circle",{class:"dot",cx:x,cy:y,r:6,id:"dot"+i},MAP);const t=el("text",{x:x+dx,y:y+dy},MAP);t.textContent=n})})();
const YRS=[["Cairo, Egypt","Age 14"],["Penn State","B.S. 2022"],["Tesla","2023–2025"],["Cornell · Ficio","Now"]];
const stops=[...document.querySelectorAll(".stop")],routeA=[...document.querySelectorAll("#route a")];let curStop=-1;
function storyScroll(){const trail=document.getElementById("trail");const st=document.getElementById("story");const r=st.getBoundingClientRect();
  const p=Math.min(1,Math.max(0,(innerHeight*.55-r.top-300)/(r.height-innerHeight)));trail.style.strokeDashoffset=(1-p).toFixed(3);
  let c=0;stops.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.55)c=i});
  if(c!==curStop){curStop=c;for(let i=0;i<4;i++)document.getElementById("dot"+i).classList.toggle("on",i<=c);routeA.forEach((a,i)=>a.classList.toggle("on",i===c));
    document.getElementById("yrs-l").textContent=YRS[c][0];document.getElementById("yrs-v").textContent=YRS[c][1]}}

// ---------- art ----------
const ST=document.getElementById("stars");(function(){for(let i=0;i<90;i++){const c=el("circle",{cx:(rnd()*100)+"%",cy:(rnd()*100)+"%",r:(rnd()*1.2+.2).toFixed(2),fill:"#fff"},ST);c.style.opacity=(rnd()*.7+.1).toFixed(2)}})();
const ART=[
 {img:"starry.jpg",t:"The Starry Night",a:"Vincent van Gogh · 1889",rot:1.2,w:"The Museum of Modern Art, New York. Public domain.",
  p:"A sky in motion over a sleeping village. It has nothing to do with robotics, which is exactly why I keep coming back to it."},
 {img:"napoleon.jpg",t:"Napoleon Crossing the Alps",a:"Jacques-Louis David · 1801",rot:-.8,w:"Château de Malmaison. Public domain.",
  p:"I'm drawn to the staging more than the hero: a calm rider on a rearing horse, painted to manufacture a reputation. A reminder to show the machine working, not the founder posing."},
 {k:"poet",t:"The Poet",a:"Pablo Picasso · 1911",rot:-1.4,u:"https://www.guggenheim-venice.it/en/art/works/the-poet/",w:"Peggy Guggenheim Collection, Venice. Still under copyright, so this is my study.",
  p:"A figure broken into planes until you have to work to find it. Our machines do the reverse: several camera angles assembled into one apple. Both remind me the first angle is never the whole truth."},
 {k:"arrow",t:"Arrow of Time",a:"Vladimir Kush",rot:1.8,u:"https://kushfineart.com/artworks/9391-arrow-of-time",w:"Kush Fine Art. Still under copyright, so this is my study.",
  p:"Small actions, compounding. A candy stand at fourteen became a supply chain career, which became a robot in an orchard. Seed, tree, apple, seed."}];
const shelf=document.getElementById("shelf");
ART.forEach((o,i)=>{const b=document.createElement("button");b.className="card reveal";b.style.setProperty("--rot",o.rot+"deg");b.style.setProperty("--dl",(i*.1)+"s");
  if(o.img){b.insertAdjacentHTML("beforeend",`<img src="${o.img}" alt="${o.t}, ${o.a}" loading="lazy">`)}else{const sv=el("svg",{viewBox:"0 0 200 210",class:"sk draw","data-sk":o.k},b);build(sv,o.k);io.observe(sv)}
  b.insertAdjacentHTML("beforeend",`<div class="t">${o.t}</div><div class="a">${o.a}</div><div class="open">${o.img?"my note →":"my study · see original →"}</div>`);
  b.onclick=()=>openLb(o);shelf.appendChild(b);io.observe(b)});
const lb=document.getElementById("lb");
function openLb(o){const h=document.getElementById("lbsk");h.innerHTML="";let sv=null;
  if(o.img){h.innerHTML=`<img src="${o.img}" alt="${o.t}">`}else{sv=el("svg",{viewBox:"0 0 200 210",class:"sk draw"},h);build(sv,o.k)}
  document.getElementById("lba").textContent=o.a;document.getElementById("lbt").textContent=o.t;document.getElementById("lbp").textContent=o.p;
  const w=document.getElementById("lbw");w.textContent=o.w;if(o.u){w.insertAdjacentHTML("beforeend",` <a href="${o.u}" target="_blank" rel="noopener">View the original ↗</a>`)}
  lb.classList.add("open");if(sv)requestAnimationFrame(()=>requestAnimationFrame(()=>sv.classList.add("in")));document.getElementById("lbx").focus()}
const closeLb=()=>lb.classList.remove("open");document.getElementById("lbx").onclick=closeLb;lb.onclick=e=>{if(e.target===lb)closeLb()};addEventListener("keydown",e=>{if(e.key==="Escape")closeLb()});

addEventListener("scroll",onScroll,{passive:true});addEventListener("resize",()=>{sizeAb();onScroll()});
sizeAb();onScroll();document.fonts&&document.fonts.ready.then(()=>{sizeAb();onScroll()});
})();
