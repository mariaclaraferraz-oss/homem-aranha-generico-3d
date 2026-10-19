const V3=THREE.Vector3,S=40,N=5,$=id=>document.getElementById(id);
const isTouch=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;
if(isTouch)document.body.classList.add('touch');
const scene=new THREE.Scene();const sk=document.createElement('canvas');sk.width=2;sk.height=256;const sg=sk.getContext('2d'),sgr=sg.createLinearGradient(0,0,0,256);
[[0,'#080d2a'],[.5,'#27367a'],[.82,'#b4587c'],[1,'#ffb67a']].forEach(a=>sgr.addColorStop(a[0],a[1]));sg.fillStyle=sgr;sg.fillRect(0,0,2,256);
scene.background=new THREE.CanvasTexture(sk);scene.fog=new THREE.Fog(0x4a4a88,60,330);
const cam=new THREE.PerspectiveCamera(70,1,.1,600);
const R=new THREE.WebGLRenderer({antialias:!isTouch});R.setPixelRatio(Math.min(devicePixelRatio,2));R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.15;R.shadowMap.enabled=!isTouch;R.shadowMap.type=THREE.PCFSoftShadowMap;document.body.appendChild(R.domElement);
scene.add(new THREE.HemisphereLight(0x9fb4ff,0x40304a,.8));
const sun=new THREE.DirectionalLight(0xffc9a0,1.2);sun.position.set(-60,100,40);sun.castShadow=!isTouch;scene.add(sun,sun.target);
sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-70,right:70,top:70,bottom:-70,near:10,far:320});sun.shadow.bias=-.0006;
function resize(){R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();

// ---------- cidade ----------
function winTex(p){const pat=[];for(let i=0;i<16;i++)pat.push(Math.random()<p);
 const mk=lit=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.fillStyle=lit?'#000':'#2a3150';g.fillRect(0,0,128,128);
  if(!lit){g.fillStyle='#38405f';g.fillRect(0,0,128,3);g.fillRect(0,0,3,128)}
  for(let y=0;y<4;y++)for(let x=0;x<4;x++){const on=pat[y*4+x];g.fillStyle=lit?(on?'#ffcf80':'#000'):(on?'#d9b46a':'#0d1328');g.fillRect(x*32+5,y*32+7,22,18);
   if(!lit&&!on){g.fillStyle='#22306a';g.fillRect(x*32+5,y*32+7,22,5)}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t};
 return[mk(0),mk(1)]}
const bases=[winTex(.3),winTex(.5),winTex(.7)];
const roofM=new THREE.MeshStandardMaterial({color:0x232840,roughness:.9}),crM=new THREE.MeshStandardMaterial({color:0x3a4060,roughness:.7});
const B=[];
// asfalto, calcadas e faixas
const gc=document.createElement('canvas');gc.width=gc.height=512;const gg=gc.getContext('2d');
gg.fillStyle='#3a3f4d';gg.fillRect(0,0,512,512);gg.fillStyle='#1c1f29';gg.fillRect(179,0,154,512);gg.fillRect(0,179,512,154);
gg.fillStyle='#575e72';[179,333].forEach(q=>{gg.fillRect(q-3,0,3,512);gg.fillRect(0,q-3,512,3)});gg.fillStyle='#3a3f4d';gg.fillRect(179,179,154,154);
gg.fillStyle='#e6b93c';for(let k=0;k<512;k+=32){if(k<170||k>340){gg.fillRect(254,k,4,18);gg.fillRect(k,254,18,4)}}
gg.fillStyle='#ffffff55';for(let i=0;i<10;i++){gg.fillRect(190+i*14,150,8,24);gg.fillRect(190+i*14,338,8,24);gg.fillRect(150,190+i*14,24,8);gg.fillRect(338,190+i*14,24,8)}
for(let i=0;i<2500;i++){gg.fillStyle='rgba(255,255,255,'+Math.random()*.05+')';gg.fillRect(Math.random()*512,Math.random()*512,2,2)}
const gt=new THREE.CanvasTexture(gc);gt.wrapS=gt.wrapT=THREE.RepeatWrapping;gt.repeat.set(22,22);gt.anisotropy=8;
const ground=new THREE.Mesh(new THREE.PlaneGeometry(880,880),new THREE.MeshStandardMaterial({map:gt,roughness:.85}));
ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const rep=(t,a,b)=>{const q=t.clone();q.needsUpdate=true;q.repeat.set(a,b);return q};
for(let i=-N;i<=N;i++)for(let j=-N;j<=N;j++){
 if(i==0&&j==0)continue;
 const w=22+Math.random()*8,d=22+Math.random()*8,h=24+Math.random()*Math.random()*120;
 const x=i*S+(Math.random()-.5)*3,z=j*S+(Math.random()-.5)*3,bt=bases[(Math.random()*3)|0],tint=new THREE.Color().setHSL(.58+Math.random()*.12,.25,.65+Math.random()*.3);
 const fm=a=>new THREE.MeshStandardMaterial({color:tint,map:rep(bt[0],a,h/7),emissiveMap:rep(bt[1],a,h/7),emissive:0xffffff,emissiveIntensity:.9,roughness:.5,metalness:.2});
 const mx=fm(d/7),mz=fm(w/7);
 const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),[mx,mx,roofM,roofM,mz,mz]);
 m.position.set(x,h/2,z);m.castShadow=m.receiveShadow=!isTouch;scene.add(m);
 const cr=new THREE.Mesh(new THREE.BoxGeometry(w+.7,1,d+.7),crM);cr.position.set(x,h-.5,z);scene.add(cr);
 const ac=new THREE.Mesh(new THREE.BoxGeometry(3,1.6,2.4),roofM);ac.position.set(x+(Math.random()-.5)*w*.5,h+.8,z+(Math.random()-.5)*d*.5);scene.add(ac);
 if(h>70){const an=new THREE.Mesh(new THREE.CylinderGeometry(.08,.2,16,8),crM);an.position.set(x,h+8,z);scene.add(an);
  const lt=new THREE.Mesh(new THREE.SphereGeometry(.5,10,8),new THREE.MeshBasicMaterial({color:0xff2a2a}));lt.position.set(x,h+16,z);scene.add(lt)}
 else{const tk=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,3,16),crM);tk.position.set(x-w*.25,h+1.5,z+d*.2);scene.add(tk);
  const cp=new THREE.Mesh(new THREE.ConeGeometry(1.8,1.2,16),roofM);cp.position.set(x-w*.25,h+3.6,z+d*.2);scene.add(cp)}
 B.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,h});
}
function inB(q,m=0){for(const b of B)if(q.y<b.h&&q.y>-1&&q.x>b.x0-m&&q.x<b.x1+m&&q.z>b.z0-m&&q.z<b.z1+m)return true;return false}
let wh=null,pw=null,climbing=false,cn=null,cLock=0,clT=0,zoom=9,zoomT=9,wz=1;
function collide(p,v,r){let gr=false;wh=null;
 if(p.y<=0){p.y=0;if(v.y<0)v.y=0;gr=true}
 for(const b of B){
  if(p.x<b.x0-r||p.x>b.x1+r||p.z<b.z0-r||p.z>b.z1+r||p.y>=b.h)continue;
  if(p.y>b.h-.8&&v.y<=0){p.y=b.h;v.y=0;gr=true;continue}
  const a=p.x-(b.x0-r),c=b.x1+r-p.x,d=p.z-(b.z0-r),e=b.z1+r-p.z,m=Math.min(a,c,d,e);
  if(m==a){p.x=b.x0-r;if(v.x>0)v.x*=-.15;wh=new V3(-1,0,0)}else if(m==c){p.x=b.x1+r;if(v.x<0)v.x*=-.15;wh=new V3(1,0,0)}
  else if(m==d){p.z=b.z0-r;if(v.z>0)v.z*=-.15;wh=new V3(0,0,-1)}else{p.z=b.z1+r;if(v.z<0)v.z*=-.15;wh=new V3(0,0,1)}
 }
 return gr}
function updClimb(mv,dt){cLock-=dt;
 if(!pw||swinging||dodgeT>0||state!=='play'){if(climbing&&cn&&!pw&&state==='play'&&!swinging){V.y=Math.max(V.y,6);V.x-=cn.x*5;V.z-=cn.z*5}climbing=false;cn=null;return}
 const into=-mv.dot(pw);
 if(climbing){if(into<-.3){climbing=false;cn=null;return}}else if(into>.35&&cLock<=0&&V.y<14)climbing=true;
 if(climbing)cn=pw}

// ---------- modelos ----------
const stdm=(c,r=.6,m=0)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
function webTex(c1,c2){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.fillStyle=c1;g.fillRect(0,0,256,256);g.strokeStyle=c2;g.lineWidth=2;
 for(let i=0;i<16;i++){g.beginPath();g.moveTo(128,128);g.lineTo(128+Math.cos(i*.3927)*260,128+Math.sin(i*.3927)*260);g.stroke()}
 for(let r=18;r<200;r+=22){g.beginPath();for(let i=0;i<=16;i++){const a=i*.3927,rr=r*(i%2?.9:1);g.lineTo(128+Math.cos(a)*rr,128+Math.sin(a)*rr)}g.stroke()}
 return new THREE.CanvasTexture(c)}
const red=new THREE.MeshStandardMaterial({map:webTex('#d4161c','#6a0b10'),roughness:.4,metalness:.12}),blu=new THREE.MeshStandardMaterial({map:webTex('#1f3fa8','#0b1b52'),roughness:.4,metalness:.12});
const wht=new THREE.MeshStandardMaterial({color:0xffffff,emissive:0x444444,roughness:.2}),blk=stdm(0x101010,.5);
function ell(rx,ry,rz,m,x,y,z,par){const o=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),m);o.scale.set(rx,ry,rz);o.position.set(x,y,z);par.add(o);return o}
function limb(x,y,m,len,par,r=.12){const g=new THREE.Group();g.position.set(x,y,0);
 const c=new THREE.Mesh(new THREE.CylinderGeometry(r*1.15,r*.8,len,16),m);c.position.y=-len/2;g.add(c);
 ell(r*1.2,r*1.2,r*1.2,m,0,0,0,g);ell(r*.95,r*.95,r*.95,m,0,-len,0,g);par.add(g);return g}
const hero=new THREE.Group();scene.add(hero);
ell(.36,.48,.23,red,0,1.32,0,hero);ell(.29,.3,.2,blu,0,.86,0,hero);ell(.31,.06,.21,blk,0,1.02,0,hero);
ell(.07,.12,.02,blk,0,1.38,.225,hero);for(let i=0;i<3;i++){for(const s of[-1,1]){const l=ell(.1,.012,.012,blk,s*.09,1.34+i*.04,.226,hero);l.rotation.z=s*(.5-i*.5)}}
ell(.12,.12,.12,red,0,1.7,0,hero);ell(.26,.29,.27,red,0,1.9,0,hero);
for(const s of[-1,1]){const r=ell(.105,.068,.02,blk,s*.115,1.93,.255,hero);r.rotation.z=-s*.35;const l=ell(.085,.05,.02,wht,s*.115,1.93,.267,hero);l.rotation.z=-s*.35}
const aL=limb(-.5,1.55,red,.8,hero,.1),aR=limb(.5,1.55,red,.8,hero,.1),lL=limb(-.17,.82,blu,.8,hero,.13),lR=limb(.17,.82,blu,.8,hero,.13);
hero.traverse(o=>{if(o.isMesh)o.castShadow=true});
const rope=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,1,6),new THREE.MeshBasicMaterial({color:0xffffff}));rope.visible=false;rope.frustumCulled=false;scene.add(rope);

let E=[];
function mkEnemy(x,z){
 const g=new THREE.Group(),m=new THREE.MeshStandardMaterial({color:0x4a505e,roughness:.8,emissive:0x000000}),dk=stdm(0x23262e,.8);
 ell(.45,.55,.28,m,0,1.2,0,g);ell(.38,.3,.25,dk,0,.8,0,g);ell(.25,.28,.25,stdm(0xc8a07a,.7),0,1.9,0,g);ell(.28,.14,.27,stdm(0x15151a,.9),0,2.06,0,g);
 const lg=limb(-.22,.72,dk,.7,g,.14),rg=limb(.22,.72,dk,.7,g,.14),ar=limb(-.62,1.55,m,.8,g,.12),al=limb(.62,1.55,m,.8,g,.12);
 g.traverse(o=>{if(o.isMesh)o.castShadow=true});
 scene.add(g);g.position.set(x,0,z);
 return{g,m,p:new V3(x,0,z),v:new V3(),hp:3,cd:1+Math.random(),wind:0,stun:0,flash:0,dead:false,lg,rg,ar,al,ph:Math.random()*6}}
function spawn(){for(let k=0;k<25;k++){
 const a=Math.random()*6.283,d=25+Math.random()*35;let x=P.x+Math.cos(a)*d,z=P.z+Math.sin(a)*d;
 if(Math.random()<.5)x=Math.round((x-20)/S)*S+20;else z=Math.round((z-20)/S)*S+20;
 if(Math.abs(x)>S*N||Math.abs(z)>S*N||inB(new V3(x,.5,z),1.5))continue;
 E.push(mkEnemy(x,z));return}}

// ---------- estado ----------
let yaw=0,pitch=.35,state='menu',score=0,hp=100,combo=0,comboT=0,shake=0,spT=0;
const P=new V3(0,0,8),V=new V3(),K={},joy={x:0,y:0};
let grounded=true,swinging=false,anchor=new V3(),L=0,jumps=0,airT=0,hold=false,dodgeT=0,dodgeDir=new V3(),atkCd=0,atkT=0,inv=0,face=0,runT=0;

function reset(){P.set(0,0,8);V.set(0,0,0);hp=100;score=0;combo=0;swinging=false;climbing=false;rope.visible=false;E.forEach(e=>scene.remove(e.g));E=[];for(let i=0;i<4;i++)spawn()}
function start(){if(state==='over')reset();state='play';$('ov').style.display='none';if(!isTouch)R.domElement.requestPointerLock&&R.domElement.requestPointerLock()}
$('ov').addEventListener('click',start);
document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement&&state==='play'&&!isTouch){state='menu';$('ov').style.display='flex';$('go').textContent='CONTINUAR'}});

// ---------- ações ----------
function startSwing(){
 if(swinging)return;
 const cf=new V3(-Math.sin(yaw),0,-Math.cos(yaw)),h=new V3(V.x,0,V.z);
 if(h.length()<3)h.copy(cf);else h.normalize().lerp(cf,.45).normalize();
 const dir=h.multiplyScalar(Math.cos(.95)).add(new V3(0,Math.sin(.95),0)),o=new V3(P.x,P.y+1.5,P.z);
 let hit=null;for(let s=8;s<=85;s+=2){const q=o.clone().addScaledVector(dir,s);if(inB(q)){hit=q;break}}
 anchor.copy(hit||o.clone().addScaledVector(dir,50));
 L=Math.max(10,anchor.distanceTo(o));swinging=true;rope.visible=true}
function endSwing(boost){if(!swinging)return;swinging=false;rope.visible=false;if(boost){V.multiplyScalar(1.07);if(V.y>0)V.y+=3}jumps=1}
function jump(){
 if(climbing&&cn){climbing=false;cLock=.3;V.set(cn.x*9,11,cn.z*9);grounded=false;jumps=1;airT=0;return}
 if(swinging){endSwing(true);V.y+=7;return}
 if(grounded){V.y=13;grounded=false;jumps=1;airT=0}
 else if(jumps<2){V.y=12;jumps=2}}
function hurt(n){if(inv>0||dodgeT>0||state!=='play')return;hp-=n;inv=.6;shake=.5;$('flash').style.opacity=1;setTimeout(()=>$('flash').style.opacity=0,120);
 if(hp<=0){hp=0;state='over';$('ov').style.display='flex';$('ov').querySelector('h1').textContent='DERROTADO';$('go').textContent='TENTAR DE NOVO ('+score+' pts)';if(document.exitPointerLock)document.exitPointerLock()}}
function dodge(){if(state!=='play'||dodgeT>0)return;dodgeT=.28;inv=.3;const m=moveVec();if(m.length()<.1)m.set(Math.sin(face),0,Math.cos(face));dodgeDir.copy(m).normalize();endSwing(false)}
function dmg(e,n,dir,f){if(e.dead)return;e.hp-=n;e.v.set(dir.x*f,f*.4,dir.z*f);e.stun=.45;e.flash=.15;e.wind=0;shake=.25;
 if(e.hp<=0){e.dead=true;scene.remove(e.g);score+=100;hp=Math.min(100,hp+6)}}
function attack(){
 if(state!=='play'||atkCd>0)return;atkCd=.32;atkT=.22;combo=comboT>0?combo+1:1;comboT=1.3;
 const air=!grounded,fast=swinging&&V.length()>16,rng=(air?5.5:3.8)+(fast?2:0);
 let best=null,bd=9e9;for(const e of E){const d=e.p.distanceTo(P);if(!e.dead&&d<rng&&d<bd){bd=d;best=e}}
 if(best&&!swinging)face=Math.atan2(best.p.x-P.x,best.p.z-P.z);
 const fw=new V3(Math.sin(face),0,Math.cos(face)),big=combo%3==0;
 for(const e of E){const dv=e.p.clone().sub(P),d=dv.length();if(e.dead||d>rng)continue;dv.y=0;dv.normalize();
  if(!swinging&&!air&&dv.dot(fw)<-.2)continue;dmg(e,fast?3:big?2:1,dv,fast?24:big?14:7)}}

// ---------- entrada: teclado e mouse ----------
function moveVec(){
 const f=new V3(-Math.sin(yaw),0,-Math.cos(yaw)),r=new V3(Math.cos(yaw),0,-Math.sin(yaw));
 let ix=(K.KeyD||K.ArrowRight?1:0)-(K.KeyA||K.ArrowLeft?1:0)+joy.x,iz=(K.KeyW||K.ArrowUp?1:0)-(K.KeyS||K.ArrowDown?1:0)-joy.y;const l=Math.hypot(ix,iz);if(l>1){ix/=l;iz/=l}
 return f.multiplyScalar(iz).addScaledVector(r,ix)}
addEventListener('keydown',e=>{
 if(e.repeat){if(e.code=='Space')e.preventDefault();return}
 K[e.code]=true;if(e.code.startsWith('Arrow'))e.preventDefault();
 if(e.code=='Space'){e.preventDefault();hold=true;if((grounded||climbing)&&state==='play')jump()}
 if(e.code=='KeyJ'||e.code=='Enter')attack();
 if(e.code=='ShiftLeft'||e.code=='ShiftRight'||e.code=='KeyK')dodge();
 if(e.code=='KeyR'){state='play';reset();$('ov').style.display='none'}});
addEventListener('keyup',e=>{K[e.code]=false;if(e.code=='Space'){hold=false;endSwing(true)}});
addEventListener('mousemove',e=>{if(document.pointerLockElement){yaw-=e.movementX*.0025;pitch=Math.max(-.25,Math.min(1.2,pitch+e.movementY*.0025))}});
addEventListener('mousedown',e=>{if(e.button==0&&document.pointerLockElement)attack();if(e.button==2&&document.pointerLockElement){hold=true}});
addEventListener('mouseup',e=>{if(e.button==2){hold=false;endSwing(true)}});
addEventListener('wheel',e=>{wz=Math.max(.6,Math.min(1.8,wz+e.deltaY*.001))});
addEventListener('contextmenu',e=>e.preventDefault());

// ---------- entrada: toque ----------
const opt={passive:false};
function btn(id,down,up){const el=$(id);
 el.addEventListener('touchstart',e=>{e.preventDefault();el.classList.add('on');down&&down()},opt);
 const end=e=>{e.preventDefault();el.classList.remove('on');up&&up()};
 el.addEventListener('touchend',end,opt);el.addEventListener('touchcancel',end,opt)}
btn('bJump',jump);btn('bWeb',()=>{hold=true;if(grounded)jump()},()=>{hold=false;endSwing(true)});btn('bAtk',attack);btn('bDge',dodge);
let jId=null,jc={x:0,y:0};const joyEl=$('joy'),knob=$('knob');
joyEl.addEventListener('touchstart',e=>{e.preventDefault();const t=e.changedTouches[0];jId=t.identifier;const r=joyEl.getBoundingClientRect();jc={x:r.left+65,y:r.top+65};jmove(t)},opt);
function jmove(t){let dx=(t.clientX-jc.x)/55,dy=(t.clientY-jc.y)/55;const l=Math.hypot(dx,dy);if(l>1){dx/=l;dy/=l}joy.x=Math.abs(dx)<.1?0:dx;joy.y=Math.abs(dy)<.1?0:dy;knob.style.transform=`translate(${dx*40}px,${dy*40}px)`}
joyEl.addEventListener('touchmove',e=>{e.preventDefault();for(const t of e.changedTouches)if(t.identifier==jId)jmove(t)},opt);
const jend=e=>{for(const t of e.changedTouches)if(t.identifier==jId){jId=null;joy.x=joy.y=0;knob.style.transform=''}};
joyEl.addEventListener('touchend',jend);joyEl.addEventListener('touchcancel',jend);
let lId=null,lx=0,ly=0;const cv=R.domElement;
cv.addEventListener('touchstart',e=>{if(lId!==null)return;const t=e.changedTouches[0];lId=t.identifier;lx=t.clientX;ly=t.clientY},opt);
cv.addEventListener('touchmove',e=>{e.preventDefault();for(const t of e.changedTouches)if(t.identifier==lId){yaw-=(t.clientX-lx)*.006;pitch=Math.max(-.25,Math.min(1.2,pitch+(t.clientY-ly)*.005));lx=t.clientX;ly=t.clientY}},opt);
const lend=e=>{for(const t of e.changedTouches)if(t.identifier==lId)lId=null};cv.addEventListener('touchend',lend);cv.addEventListener('touchcancel',lend);

// ---------- loop ----------
const clock=new THREE.Clock();
function ang(a,b,k){let d=b-a;while(d>Math.PI)d-=6.283;while(d<-Math.PI)d+=6.283;return a+d*k}
function update(dt){
 if(K.KeyQ)yaw+=2*dt;if(K.KeyE)yaw-=2*dt;
 atkCd-=dt;atkT-=dt;comboT-=dt;inv-=dt;shake=Math.max(0,shake-dt*1.5);if(comboT<=0)combo=0;
 const mv=moveVec();updClimb(mv,dt);
 if(dodgeT>0){dodgeT-=dt;V.x=dodgeDir.x*24;V.z=dodgeDir.z*24;V.y=Math.max(V.y,0)}
 else if(climbing){const n=cn,tx=new V3(-n.z,0,n.x),sd=mv.dot(tx),up=-mv.dot(n)>.3?7:0;V.set(-n.x*2.5+tx.x*sd*6,up,-n.z*2.5+tx.z*sd*6)}
 else if(swinging){
  V.y-=26*dt;V.addScaledVector(mv,17*dt);V.multiplyScalar(1-.03*dt);
  if(mv.lengthSq()>.04)L=Math.max(9,L-2.5*dt);
 }else{
  const k=grounded?13:2.4;V.x+=(mv.x*(grounded?12:10)-V.x)*(1-Math.exp(-k*dt));V.z+=(mv.z*(grounded?12:10)-V.z)*(1-Math.exp(-k*dt));V.y-=32*dt;
 }
 P.addScaledVector(V,dt);
 if(swinging){const d=P.clone().sub(anchor),len=d.length();if(len>L){d.divideScalar(len);P.copy(anchor).addScaledVector(d,L);const vr=V.dot(d);if(vr>0)V.addScaledVector(d,-vr)}}
 grounded=collide(P,V,.5);pw=wh;
 P.x=Math.max(-230,Math.min(230,P.x));P.z=Math.max(-230,Math.min(230,P.z));
 if(grounded){if(swinging&&V.y<=0)endSwing(false);jumps=0;airT=0}else airT+=dt;
 if(hold&&!swinging&&!grounded&&airT>.15&&dodgeT<=0&&!climbing)startSwing();
 // orientação e animação
 const sp=Math.hypot(V.x,V.z);if(atkT<=0&&sp>1.5)face=ang(face,Math.atan2(V.x,V.z),Math.min(1,12*dt));
 hero.position.copy(P);hero.rotation.y=face;sun.position.set(P.x-60,P.y+100,P.z+40);sun.target.position.copy(P);sun.target.updateMatrixWorld();
 hero.rotation.x=swinging?-.35:0;
 runT+=sp*dt*.9;const run=grounded?Math.min(1,sp/8):0;
 lL.rotation.x=grounded?Math.sin(runT)*.9*run:(swinging?.5:.6);lR.rotation.x=grounded?-Math.sin(runT)*.9*run:(swinging?-.1:-.5);
 aL.rotation.x=swinging?-2.9:-Math.sin(runT)*.8*run;aR.rotation.x=swinging?-2.9:Math.sin(runT)*.8*run;
 if(atkT>0){aR.rotation.x=-1.55;aL.rotation.x=atkT>.11?-1.2:-.3;hero.rotation.z=0}
 if(dodgeT>0)hero.rotation.x=.9;
 if(climbing&&cn){face=Math.atan2(-cn.x,-cn.z);hero.rotation.y=face;hero.rotation.x=.12;clT+=dt*Math.abs(V.y)*1.4+dt*Math.abs(V.x*cn.z-V.z*cn.x)*.8;const q=Math.sin(clT);
  aL.rotation.x=-2.5+q*.5;aR.rotation.x=-2.5-q*.5;lL.rotation.x=-.7-q*.5;lR.rotation.x=-.7+q*.5}
 if(swinging){const a=new V3(P.x,P.y+1.6,P.z),d=anchor.clone().sub(a),l=d.length();rope.position.copy(a).addScaledVector(d,.5);rope.scale.set(1,l,1);rope.quaternion.setFromUnitVectors(new V3(0,1,0),d.divideScalar(l))}
 // inimigos
 spT-=dt;if(spT<=0){spT=2.5;if(E.length<Math.min(10,5+Math.floor(score/500)))spawn()}
 for(const e of E){
  if(e.dead)continue;
  const dx=P.x-e.p.x,dz=P.z-e.p.z,d=Math.hypot(dx,dz);
  e.v.y-=32*dt;e.cd-=dt;
  if(e.stun>0){e.stun-=dt;e.v.x*=Math.exp(-3*dt);e.v.z*=Math.exp(-3*dt)}
  else{
   const chase=d<55&&P.y<e.p.y+8&&e.wind<=0&&state==='play';
   const tx=chase&&d>1.8?dx/d*5.5:0,tz=chase&&d>1.8?dz/d*5.5:0;
   e.v.x+=(tx-e.v.x)*(1-Math.exp(-8*dt));e.v.z+=(tz-e.v.z)*(1-Math.exp(-8*dt));
   if(d>.1)e.g.rotation.y=ang(e.g.rotation.y,Math.atan2(dx,dz),Math.min(1,10*dt));
   if(d<2.3&&e.cd<=0&&e.wind<=0&&Math.abs(P.y-e.p.y)<2.5){e.wind=.5}
   if(e.wind>0){e.wind-=dt;e.ar.rotation.x=-2;if(e.wind<=0){e.cd=1.3;e.ar.rotation.x=-1.5;if(Math.hypot(P.x-e.p.x,P.z-e.p.z)<3&&Math.abs(P.y-e.p.y)<2.8)hurt(10)}}
   else e.ar.rotation.x*=.8;
  }
  e.p.addScaledVector(e.v,dt);collide(e.p,e.v,.5);
  e.ph+=Math.hypot(e.v.x,e.v.z)*dt;e.lg.rotation.x=Math.sin(e.ph)*.7;e.rg.rotation.x=-Math.sin(e.ph)*.7;
  e.g.position.copy(e.p);
  if(e.flash>0){e.flash-=dt;e.m.emissive.setHex(0xaa2222)}else e.m.emissive.setHex(0);
  if(d>100){e.dead=true;scene.remove(e.g)}
 }
 E=E.filter(e=>!e.dead);
 // câmera
 const spd=V.length(),tgt=new V3(P.x,P.y+1.6,P.z);
 if(swinging&&Math.hypot(V.x,V.z)>8)yaw=ang(yaw,Math.atan2(-V.x,-V.z),Math.min(1,.9*dt));
 zoomT=climbing?7:swinging?10+Math.min(spd,45)*.3:grounded?8.5+Math.min(spd,14)*.2:9.5+Math.min(spd,40)*.18;zoom+=(zoomT-zoom)*Math.min(1,2.2*dt);const dist=zoom*wz;
 const off=new V3(Math.sin(yaw)*Math.cos(pitch),Math.sin(pitch),Math.cos(yaw)*Math.cos(pitch));
 let t=1;while(t>.2&&inB(tgt.clone().addScaledVector(off,dist*t),.5))t-=.12;
 const want=tgt.clone().addScaledVector(off,dist*t);want.y=Math.max(.6,want.y);
 cam.position.lerp(want,1-Math.exp(-14*dt));
 if(shake>0)cam.position.add(new V3((Math.random()-.5)*shake,(Math.random()-.5)*shake,(Math.random()-.5)*shake));
 cam.lookAt(tgt);
 const fov=70+Math.min(spd,45)*.4;if(Math.abs(cam.fov-fov)>.1){cam.fov+=(fov-cam.fov)*Math.min(1,4*dt);cam.updateProjectionMatrix()}
 // HUD
 $('hpf').style.width=hp+'%';$('sc').textContent=score;$('cb').textContent=combo>1?'COMBO x'+combo:'';
}
reset();cam.position.set(0,6,18);
(function loop(){requestAnimationFrame(loop);const dt=Math.min(.04,clock.getDelta());
 if(state==='play')update(dt);else{cam.lookAt(P.x,P.y+1.6,P.z)}
 R.render(scene,cam)})();
