export const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Cold Call Practice</title>
<style>
:root{--st-canvas:#fcfcfc;--st-card:lab(100 0 0);--st-rail:lab(96.4 0 0);--st-dots:lab(90.21 0 0);--st-ink:#2c2c2c;--st-text:lab(42.83 0 0);--st-muted:lab(40.73 0 0);--st-line:color-mix(in oklch,lab(42.83 0 0) 30%,transparent);--st-edge:linear-gradient(lab(90.21 0 0),lab(100 0 0));--st-send:linear-gradient(105deg,oklch(0.5621 0.1516 20) 7.13%,oklch(0.53 0.15 20) 56.12%);--st-send-ink:#fcfcfc;--st-danger:oklch(0.4186 0.168 20);--st-good:oklch(0.45 0.12 250);--st-font:"Suisse Int'l","Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
@media (prefers-color-scheme:dark){:root{--st-canvas:#2c2c2c;--st-card:lab(23 0 0);--st-rail:lab(15.6 0 0);--st-dots:lab(36.58 0 0);--st-ink:lab(97.2 0 0);--st-text:lab(82.38 0 0);--st-muted:lab(83.84 0 0);--st-line:color-mix(in oklch,lab(97.2 0 0) 14%,transparent);--st-edge:linear-gradient(lab(32 0 0),lab(26 0 0));--st-danger:oklch(0.8751 0.0665 20);--st-good:oklch(0.82 0.09 250)}}
*{box-sizing:border-box}html,body{margin:0;min-height:100%}
body{font-family:var(--st-font);font-weight:400;font-size:14px;line-height:20px;color:var(--st-ink);background:var(--st-canvas) radial-gradient(var(--st-dots) 1px,transparent 1px) 0 0/16px 16px}
main{max-width:760px;margin:0 auto;padding:24px 16px 64px}
h1{font-size:28px;line-height:34px;font-weight:400;margin:8px 0 4px}h2{font-size:18px;line-height:24px;font-weight:400;margin:0 0 12px}
p,.muted{color:var(--st-text)}.small{font-size:12px;line-height:16px;color:var(--st-muted)}
.tabs{display:flex;gap:4px;background:var(--st-rail);padding:4px;border-radius:10px;margin:16px 0}
.tabs button{flex:1;border:0;background:none;padding:8px;border-radius:8px;font:inherit;color:var(--st-text);cursor:pointer}
.tabs button[aria-selected=true]{background:var(--st-card);color:var(--st-ink);font-weight:500;box-shadow:0 1px 2px rgb(0 0 0/.08)}
.card{background:linear-gradient(var(--st-card),var(--st-card)) padding-box,var(--st-edge) border-box;border:1px solid transparent;border-radius:10px;padding:16px;box-shadow:0 1px 3px rgb(0 0 0/.06),0 8px 24px rgb(0 0 0/.04);margin-bottom:12px}
label{display:block;font-weight:500;margin:0 0 6px}
textarea,input{width:100%;font:inherit;color:var(--st-ink);background:var(--st-canvas);border:1px solid var(--st-line);border-radius:8px;padding:10px 12px;resize:none}
textarea:focus,input:focus{outline:2px solid oklch(0.53 0.15 20);outline-offset:1px}
.count{text-align:right;margin:4px 0 12px}
.orange{border:0;border-radius:10px;background:var(--st-send);color:var(--st-send-ink);font:inherit;font-weight:500;padding:12px 16px;cursor:pointer;width:100%}
.orange:disabled{opacity:.5;cursor:default}
.ghost{border:1px solid var(--st-line);background:var(--st-card);color:var(--st-ink);border-radius:10px;font:inherit;padding:10px 14px;cursor:pointer}
.display{font-size:28px;line-height:40px;text-align:center;min-height:40px;letter-spacing:2px;margin:4px 0 12px}
.pad{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px}
.pad button{height:60px;border-radius:30px;border:1px solid var(--st-line);background:var(--st-rail);color:var(--st-ink);font:inherit;font-size:22px;cursor:pointer}
.pad button small{display:block;font-size:9px;line-height:10px;color:var(--st-muted);letter-spacing:1px}
.phone{text-align:center}.callgrid{display:grid;grid-template-columns:1fr 200px;gap:16px;align-items:start}.who{text-align:left;background:var(--st-rail);border-radius:10px;padding:12px}.who div:not(.small){font-weight:500;font-size:16px;line-height:22px}.hint{margin-top:12px}.hint .top{display:flex;justify-content:space-between;align-items:center}.shuffle{border:0;background:none;color:var(--st-ink);cursor:pointer;padding:4px;border-radius:6px;display:grid;place-items:center}.shuffle:hover{background:var(--st-card)}#hintText{margin:6px 0 0;color:var(--st-ink)}.who hr{border:0;border-top:1px solid var(--st-line);margin:12px 0}@media (max-width:640px){.callgrid{grid-template-columns:1fr}.who{order:-1}}.status{font-size:18px;line-height:24px;margin:8px 0}
.orb{width:96px;height:96px;margin:16px auto;border-radius:50%;background:var(--st-rail);border:1px solid var(--st-line);display:grid;place-items:center;font-size:36px;transition:transform .1s}
.orb.talk{box-shadow:0 0 0 8px color-mix(in oklch,oklch(0.53 0.15 20) 25%,transparent)}
.orb.listen{box-shadow:0 0 0 8px color-mix(in oklch,var(--st-good) 25%,transparent)}
.log{text-align:left;max-height:260px;overflow:auto;scrollbar-width:none;margin:12px 0}
.log div{padding:6px 0;border-bottom:1px solid var(--st-line)}.log b{font-weight:500}
.row{display:flex;gap:8px}.row>*{flex:1}
.hang{background:var(--st-danger);color:var(--st-canvas);border:0;border-radius:10px;padding:12px;font:inherit;font-weight:500;cursor:pointer}
.score{font-size:48px;line-height:56px}
ul{padding-left:18px;margin:6px 0 12px}li{margin:3px 0;color:var(--st-text)}
.bar{height:6px;border-radius:3px;background:var(--st-rail);overflow:hidden;margin:2px 0 8px}.bar i{display:block;height:100%;background:var(--st-good)}
.hist{display:flex;justify-content:space-between;gap:8px;padding:10px 0;border-bottom:1px solid var(--st-line);cursor:pointer}
[hidden]{display:none!important}
</style>
</head>
<body>
<main>
<h1>Cold Call Practice</h1>
<p>Dial a stranger. You will not know who picks up.</p>
<div class="tabs" role="tablist"><button role="tab" aria-selected="true" data-tab="practice">Practice</button><button role="tab" aria-selected="false" data-tab="hub">Your hub</button></div>

<section id="practice">
 <div class="card" id="setup">
  <label for="customer">Customer type</label>
  <textarea id="customer" rows="2" maxlength="50" placeholder="Roofing contractors in Texas"></textarea>
  <div class="count small" id="cc">0/50</div>
  <label for="pitch">Your 1-line pitch for your startup, in under 60 characters.</label>
  <input id="pitch" maxlength="59" placeholder="We help contractors win more jobs">
  <div class="count small" id="pc">0/59</div>
  <label for="mine">Company name</label>
  <input id="mine" maxlength="50" placeholder="Star">
  <div class="count small" id="mc">0/50</div>
 </div>
 <div class="card" id="dialer">
  <div class="display" id="number" aria-live="polite"></div>
  <div class="pad" id="pad"></div>
  <div class="row"><button class="ghost" id="del">Delete</button><button class="orange" id="dial">Call customer</button></div>
  <p class="small" id="err" role="alert"></p>
 </div>
 <div class="card phone" id="phone" hidden>
  <div class="callgrid"><div>
  <div class="small" id="calling"></div>
  <div class="orb" id="orb">☎</div>
  <div class="status" id="status">Ringing…</div>
  <div class="log" id="log"></div>
  <div id="controls" hidden>
   <div class="row" style="margin-bottom:8px"><button class="ghost" id="done">Done talking</button></div>
   <div class="row" style="margin-bottom:8px"><input id="typed" placeholder="Or type what you say, then Enter"></div>
  </div>
  <button class="hang" id="hang">Hang up</button>
  </div><aside class="who" aria-live="polite"><div class="small">Company</div><div id="company">Unknown</div><hr><div class="small">Owner</div><div id="owner">—</div><hr><div class="hint"><div class="top"><span class="small">How to open</span><button class="shuffle" id="shuffle" aria-label="Next hint" title="Next hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="M4 4l5 5"/></svg></button></div><p id="hintText" class="small"></p></div></aside></div>
 </div>
 <div class="card" id="report" hidden></div>
</section>

<section id="hub" hidden>
 <div class="card" id="coach"></div>
 <div class="card" id="skills"></div>
 <div class="card"><h2>Past calls</h2><div id="history"></div></div>
</section>
</main>
<script>
const $=(id)=>document.getElementById(id);
const state={number:"",call:null,me:{sessions:[]},ctx:null,listening:false,busy:false};
const post=async(path,body,headers={})=>{const isForm=body instanceof FormData;const r=await fetch(path,{method:"POST",credentials:"same-origin",headers:isForm?headers:{"content-type":"application/json",...headers},body:isForm?body:JSON.stringify(body||{})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Error");return d};
const audio=()=>state.ctx||(state.ctx=new (window.AudioContext||window.webkitAudioContext)());
function tone(freqs,ms,vol=.08){const c=audio(),g=c.createGain();g.gain.value=vol;g.connect(c.destination);const os=freqs.map(f=>{const o=c.createOscillator();o.frequency.value=f;o.connect(g);o.start();o.stop(c.currentTime+ms/1000);return o});return new Promise(r=>setTimeout(r,ms))}
const DTMF={1:[697,1209],2:[697,1336],3:[697,1477],4:[770,1209],5:[770,1336],6:[770,1477],7:[852,1209],8:[852,1336],9:[852,1477],"*":[941,1209],0:[941,1336],"#":[941,1477]};
const LETTERS={2:"ABC",3:"DEF",4:"GHI",5:"JKL",6:"MNO",7:"PQRS",8:"TUV",9:"WXYZ",0:"+"};
for(const k of ["1","2","3","4","5","6","7","8","9","*","0","#"]){const b=document.createElement("button");b.innerHTML=k+"<small>"+(LETTERS[k]||"&nbsp;")+"</small>";b.onclick=()=>{if(state.number.length<15){state.number+=k;$("number").textContent=state.number;tone(DTMF[k],120)}};$("pad").append(b)}
$("del").onclick=()=>{state.number=state.number.slice(0,-1);$("number").textContent=state.number};
document.addEventListener("keydown",e=>{if(!$("phone").hidden||e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA")return;if(DTMF[e.key]){state.number+=e.key;$("number").textContent=state.number;tone(DTMF[e.key],120)}if(e.key==="Backspace")$("del").onclick()});

const LS="pcc_config";
function setCounts(){$("cc").textContent=$("customer").value.length+"/50";$("pc").textContent=$("pitch").value.length+"/59";$("mc").textContent=$("mine").value.length+"/50"}
let saveTimer;function persist(){setCounts();const c={customer:$("customer").value,pitch:$("pitch").value,mine:$("mine").value};localStorage.setItem(LS,JSON.stringify(c));clearTimeout(saveTimer);saveTimer=setTimeout(()=>post("/api/config",c).catch(()=>{}),600)}
$("customer").oninput=persist;$("pitch").oninput=persist;$("mine").oninput=persist;
const local=JSON.parse(localStorage.getItem(LS)||"null");if(local){$("customer").value=local.customer;$("pitch").value=local.pitch;$("mine").value=local.mine||"";setCounts()}

document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.setAttribute("aria-selected",x===b));$("practice").hidden=b.dataset.tab!=="practice";$("hub").hidden=b.dataset.tab!=="hub";if(b.dataset.tab==="hub")renderHub()});

function line(who,text){const d=document.createElement("div");d.innerHTML="<b></b> <span></span>";d.querySelector("b").textContent=who+":";d.querySelector("span").textContent=text;$("log").append(d);$("log").scrollTop=1e6}
function setStatus(t,orb=""){$("status").textContent=t;$("orb").className="orb "+orb}

async function ring(ms){const end=Date.now()+ms;while(Date.now()<end&&state.call){await tone([440,480],Math.min(2000,end-Date.now()),.05);await new Promise(r=>setTimeout(r,Math.min(2000,Math.max(0,end-Date.now()))))}}
function play(b64){return new Promise(res=>{if(!b64)return res();const a=new Audio("data:audio/mpeg;base64,"+b64);state.player=a;state.barge={ms:0,chunks:[]};const done=()=>{state.playing=false;state.stopPlay=null;res()};state.playing=true;state.stopPlay=()=>{a.pause();done()};a.onended=done;a.onerror=done;a.play().catch(done)})}
function overTalk(buf){const b=state.barge;b.chunks.push(new Float32Array(buf));if(b.chunks.length>30)b.chunks.shift();let s=0;for(const v of buf)s+=v*v;const rms=Math.sqrt(s/buf.length);const ms=buf.length/rec.rate*1000;b.ms=rms>Math.max(.025,vad.floor*4)?b.ms+ms:Math.max(0,b.ms-ms/3);if(b.ms>300&&state.stopPlay){b.kept=b.chunks.slice();state.stopPlay()}}

$("dial").onclick=async()=>{
 $("err").textContent="";const customer=$("customer").value.trim(),pitch=$("pitch").value.trim(),mine=$("mine").value.trim();
 if(!customer||!pitch){$("err").textContent="Add a customer type and your pitch first.";return}
 if(!state.number){$("err").textContent="Dial a number on the keypad first.";return}
 audio().resume();try{await mic()}catch{$("err").textContent="Allow the microphone to talk, or type your lines during the call."}
 state.call={pending:true};$("dialer").hidden=true;$("setup").hidden=true;$("report").hidden=true;$("phone").hidden=false;$("log").innerHTML="";$("controls").hidden=true;
 $("calling").textContent="Calling "+state.number;$("company").textContent="Looking up…";$("owner").textContent="—";$("hintText").textContent="";setStatus("Ringing…");
 const req=post("/api/call",{customer,pitch,mine,number:state.number});
 let first;try{first=await req}catch(e){$("err").textContent=e.message;return reset()}
 $("company").textContent=first.company;$("owner").textContent=first.owner;state.who={first:first.owner.split(" ")[0],company:first.company,mine:mine||"your company"};state.hint=Math.floor(Math.random()*HINTS.length);showHint();
 await ring(first.ringMs);if(!state.call)return;
 state.call={id:first.id};state.history=[{role:"assistant",content:first.text}];setStatus("Connected","talk");
 await prospect(first);
};

async function prospect(r){line("Them",r.text);setStatus("They're talking…","talk");await play(r.audio);if(!state.call)return;if(r.hangup){setStatus("They hung up.");line("Call","They hung up.");return finish()}listen()}

let rec=null;
async function mic(){if(rec)return rec;const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}});const c=audio(),src=c.createMediaStreamSource(stream),node=c.createScriptProcessor(4096,1,1);src.connect(node);node.connect(c.destination);rec={stream,node,chunks:[],rate:c.sampleRate};node.onaudioprocess=e=>onAudio(e.inputBuffer.getChannelData(0));return rec}
let vad={floor:.01,spoke:0,quiet:0,pending:null,wait:false};
const SPEC=450,END=1000,LONG=2600;
function ask(final,text){const ctl=new AbortController();let body;if(typeof text==="string")body=JSON.stringify({text,final:true,history:state.history});else{body=new FormData();body.append("history",JSON.stringify(state.history));body.append("audio",wav(rec.chunks.slice(),rec.rate));if(final)body.append("final","1")}
 const promise=fetch("/api/say",{method:"POST",credentials:"same-origin",signal:ctl.signal,headers:Object.assign({"x-call":state.call.id},typeof text==="string"?{"content-type":"application/json"}:{}),body}).then(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.error||"Error");if(d.incomplete)vad.wait=true;return d});
 promise.catch(()=>{});return{ctl,promise}}
function onAudio(buf){if(state.playing&&state.barge&&rec){overTalk(buf);return}if(!state.listening||state.busy)return;rec.chunks.push(new Float32Array(buf));let s=0;for(const v of buf)s+=v*v;const rms=Math.sqrt(s/buf.length);const ms=buf.length/rec.rate*1000;const loud=rms>Math.max(.02,vad.floor*3);if(!loud)vad.floor=vad.floor*.95+rms*.05;
 if(loud){vad.spoke+=ms;vad.quiet=0;if(vad.pending){vad.pending.ctl.abort();vad.pending=null;vad.wait=false;vad.closing=false}}else vad.quiet+=ms;
 $("orb").style.transform="scale("+(1+Math.min(rms*4,.25))+")";
 if(vad.spoke>250&&vad.quiet>SPEC&&!vad.pending)vad.pending=ask(false);
 if(vad.pending&&!vad.closing&&vad.quiet>END&&!vad.wait)close(vad.pending);
 if(vad.wait&&!vad.closing&&vad.quiet>LONG){vad.pending=ask(true);vad.wait=false;close(vad.pending)}
 if(vad.spoke<250&&rec.chunks.length*ms>12000&&!vad.closing){vad.pending=ask(true);close(vad.pending)}}
function close(pend){vad.closing=true;pend.promise.then(r=>{if(vad.pending!==pend||!state.listening)return;if(r.incomplete){vad.closing=false;return}deliver(r)},e=>{if(vad.pending===pend&&e.name!=="AbortError"){line("Call",e.message);finish()}})}
async function deliver(r){state.busy=true;state.listening=false;vad.pending=null;$("orb").style.transform="";$("controls").hidden=true;line("You",r.heard||"(silence)");state.history.push({role:"user",content:r.heard||"(silence on the line)"},{role:"assistant",content:r.text});await prospect(r)}
function listen(){state.listening=true;state.busy=false;const kept=state.barge&&state.barge.kept;if(rec)rec.chunks=kept?kept.slice():[];vad={floor:vad.floor,spoke:kept?500:0,quiet:0,pending:null,wait:false,closing:false};state.barge=null;$("controls").hidden=false;setStatus(rec?"Your turn — talk":"Your turn — type","listen");$("typed").focus()}
function wav(chunks,rate){const len=chunks.reduce((a,c)=>a+c.length,0),all=new Float32Array(len);let o=0;for(const c of chunks){all.set(c,o);o+=c.length}const ratio=rate/16000,n=Math.floor(len/ratio),out=new DataView(new ArrayBuffer(44+n*2));const w=(p,s)=>{for(let i=0;i<s.length;i++)out.setUint8(p+i,s.charCodeAt(i))};w(0,"RIFF");out.setUint32(4,36+n*2,true);w(8,"WAVEfmt ");out.setUint32(16,16,true);out.setUint16(20,1,true);out.setUint16(22,1,true);out.setUint32(24,16000,true);out.setUint32(28,32000,true);out.setUint16(32,2,true);out.setUint16(34,16,true);w(36,"data");out.setUint32(40,n*2,true);for(let i=0;i<n;i++){const a=Math.floor(i*ratio),b=Math.max(a+1,Math.floor((i+1)*ratio));let t=0;for(let j=a;j<b&&j<len;j++)t+=all[j];const v=Math.max(-1,Math.min(1,t/(b-a)));out.setInt16(44+i*2,v*32767,true)}return new Blob([out],{type:"audio/wav"})}
async function commit(text){
 if(state.busy||!state.call)return;
 if(typeof text==="string"){state.busy=true;state.listening=false;$("controls").hidden=true;line("You",text);try{const r=await ask(true,text).promise;state.history.push({role:"user",content:text},{role:"assistant",content:r.text});await prospect(r)}catch(e){line("Call",e.message);finish()}return}
 if(vad.pending)vad.pending.ctl.abort();vad.pending=ask(true);close(vad.pending);setStatus("…","");
}
const send=commit;
const HINTS=[
 w=>"Say their name first: “Hi "+w.first+", it's [your name] from "+w.mine+".”",
 w=>"Ask permission: “Did I catch you at a bad time?” Most people give you 30 seconds.",
 w=>"Lead with why them: “I'm calling contractors like "+w.company+" because…”",
 w=>"Name the problem, not the product: “Most owners I talk to lose evenings to invoices.”",
 w=>"Be honest it's a cold call: “This is a cold call — want to hang up, or give me 30 seconds?”",
 w=>"Ask one easy question early: “How are you finding new jobs right now, "+w.first+"?”",
 w=>"Slow down. Short sentences. Pause after your first line and let them talk."];
function showHint(){if(state.who)$("hintText").textContent=HINTS[state.hint%HINTS.length](state.who)}
$("shuffle").onclick=()=>{state.hint=(state.hint||0)+1;showHint()};
$("done").onclick=()=>send();
$("typed").onkeydown=e=>{if(e.key==="Enter"&&e.target.value.trim()){const t=e.target.value.trim();e.target.value="";send(t)}};
$("hang").onclick=()=>{if(state.player)state.player.pause();if(state.call&&state.call.id)finish();else reset()};

async function finish(){const id=state.call&&state.call.id;state.call=null;state.listening=false;$("controls").hidden=true;$("hang").hidden=true;setStatus("Call ended. Grading…");
 try{const r=await post("/api/end",{history:state.history||[]},{"x-call":id});showReport(r.session);state.me.sessions.unshift(r.session);state.me.coach=r.coach}catch(e){$("report").hidden=false;$("report").textContent=e.message}
 $("phone").hidden=true;$("hang").hidden=false;$("dialer").hidden=false;$("setup").hidden=false}
function reset(){state.call=null;state.listening=false;$("phone").hidden=true;$("dialer").hidden=false;$("setup").hidden=false}

const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const list=a=>"<ul>"+(a||[]).map(x=>"<li>"+esc(x)+"</li>").join("")+"</ul>";
function showReport(s){$("report").hidden=false;$("report").innerHTML='<h2>Call review</h2><div class="score">'+esc(s.score)+'<span class="small">/100</span></div><p>'+esc(s.summary)+'</p><p class="small">'+(s.owner?esc(s.owner)+' · '+esc(s.company)+'<br>':'')+'Who picked up: <b>'+esc(s.persona)+'</b> · '+esc(String(s.outcome).replace("_"," "))+' · '+esc(s.seconds)+'s</p><b>Went well</b>'+list(s.strengths)+'<b>Fix next time</b>'+list(s.improve)+(s.better_line?'<b>Try saying</b><p>“'+esc(s.better_line)+'”</p>':"")+'<details><summary class="small">Transcript</summary>'+(s.transcript||[]).map(m=>'<p class="small"><b>'+(m.role==="user"?"You":"Them")+':</b> '+esc(m.content)+'</p>').join("")+'</details>'}

const SK={opener:"Opener",clarity:"Clarity",discovery:"Discovery",objections:"Objections",close:"Close"};
function renderHub(){const ss=state.me.sessions||[],c=state.me.coach;
 $("coach").innerHTML=ss.length<2?'<h2>Your coach</h2><p>Make '+(2-ss.length)+' more call'+(ss.length===1?"":"s")+' and your coach will spot what to work on.</p>':'<h2>Focus on this</h2><p style="color:var(--st-ink)">'+esc(c&&c.focus)+'</p><p class="small">'+esc(c&&c.pattern)+'</p><b>Drills</b>'+list(c&&c.drills);
 const avg=k=>{const v=ss.map(s=>s.skills&&s.skills[k]).filter(x=>typeof x==="number");return v.length?v.reduce((a,b)=>a+b,0)/v.length:0};
 const mean=ss.length?Math.round(ss.reduce((a,s)=>a+(+s.score||0),0)/ss.length):0;
 $("skills").innerHTML='<h2>Skills</h2><p class="small">'+ss.length+' calls · average score '+mean+'</p>'+Object.entries(SK).map(([k,l])=>{const v=avg(k);return '<div class="small">'+l+' · '+v.toFixed(1)+'/10</div><div class="bar"><i style="width:'+v*10+'%"></i></div>'}).join("");
 $("history").innerHTML=ss.length?"":'<p class="small">No calls yet.</p>';
 ss.forEach(s=>{const d=document.createElement("div");d.className="hist";d.innerHTML='<span>'+(s.company?esc(s.company)+' · ':'')+esc(s.persona)+'<br><span class="small">'+new Date(s.at).toLocaleString()+'</span></span><span class="score" style="font-size:20px;line-height:28px">'+esc(s.score)+'</span>';d.onclick=()=>{document.querySelector('[data-tab=practice]').click();showReport(s);$("report").scrollIntoView()};$("history").append(d)})}

post("/api/me").then(me=>{state.me=me;if(!local&&me.config.customer){$("customer").value=me.config.customer;$("pitch").value=me.config.pitch;$("mine").value=me.config.mine||"";setCounts()}}).catch(()=>{});
</script>
</body>
</html>`;
