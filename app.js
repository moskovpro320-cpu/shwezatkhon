(function(){
"use strict";
var C=window.CFG||{},SB=null,R=[20,40,25,25,50,20,80];
var ADMIN_EMAIL="moskovpro320@gmail.com";
var I18N=window.I18N||{my:{},en:{}};
/* v13: စာသားအသစ်များ (i18n.js ကို မထိဘဲ ဒီနေရာကနေ ပေါင်းထည့်) */
(function(){var A={
my:{pick_genre:"အမျိုးအစား ရွေးပါ",ph_desc:"ဇာတ်လမ်းအကျဉ်း (Synopsis) – ဇာတ်လမ်းအကြောင်း အကျဉ်းချုပ် ရေးပါ (မရေးလည်းရ)",
 ph_free:"အခမဲ့ကြည့်ရမယ့် အပိုင်းရေ (မဖြည့်ရင် 10)",all_free_chk:"🎁 အားလုံးအခမဲ့ (Lock မချပါ)",
 fixed_price_note:"🔒 အခမဲ့အပိုင်းရေကို ကျော်တဲ့ အပိုင်းတိုင်းကို 30 Coin စီ အလိုအလျောက် Lock ချပါမယ်။ အခမဲ့အပိုင်းရေက စုစုပေါင်းထက် ကြီးရင် (သို့) “အားလုံးအခမဲ့” ရွေးထားရင် Lock မချပါ။",
 hot_chk:"🔥 ပင်မစာမျက်နှာမှာ “Hot” တံဆိပ် ပြမယ်",cov_preview:"Cover အစမ်းမြင်ကွင်း",cov_bad:"ပုံကို မပြနိုင်ပါ – လင့်ခ်ကို ပြန်စစ်ပါ",
 uploader_lbl:"👤 တင်သူ: {0}",uploader_admin:"Admin",hot_on:"🔥 Hot တံဆိပ် ပိတ်မယ် (လက်ရှိ ON)",hot_off:"🔥 Hot တံဆိပ် ဖွင့်မယ် (လက်ရှိ OFF)",hot_set:"Hot တံဆိပ် ပြောင်းပြီးပါပြီ",
 ext_need_sql:"⚠️ ဇာတ်လမ်း ထည့်ပြီးပါပြီ၊ ဒါပေမဲ့ အကျဉ်း/Hot ကို မသိမ်းနိုင်သေးပါ – supabase-v29.sql ကို Run ရန်လိုပါတယ်",
 lbl_cover:"🔗 Cover ပုံလင့်ခ် (Image URL)",lbl_vid1:"🔗 ဗီဒီယိုလင့်ခ် – အပိုင်း ၁ (Video URL)",
 add_note:"ထည့်ပြီးတာနဲ့ ဇာတ်လမ်းကို တန်းဖွင့်ပေးပါမယ် – အပိုင်းနံပါတ်ရွေးပြီး ဗီဒီယိုလင့်ခ် ထည့်နိုင်ပါတယ်။ လင့်ခ်တွေက https:// နဲ့ စရမယ်၊ ဗီဒီယိုက ဖိုင်တိုက်ရိုက်လင့်ခ် (ဥပမာ .mp4) ဖြစ်ရမယ် (YouTube စာမျက်နှာလင့်ခ် မရပါ)။",
 ph_cover_url:"https://... (Cover ပုံလင့်ခ်)",ph_video_url:"https://... (ဗီဒီယိုလင့်ခ် .mp4)",
 adm_vurl_lbl:"🔗 အပိုင်း {0} ဗီဒီယိုလင့်ခ် (Video URL)",adm_vurl_btn:"ဗီဒီယိုလင့်ခ် သိမ်းမယ်",adm_curl_lbl:"🔗 Cover ပုံလင့်ခ် (Image URL)",adm_curl_btn:"Cover လင့်ခ် သိမ်းမယ်",
 bad_url:"လင့်ခ်က https:// နဲ့ စပြီး မှန်ကန်ရမယ်",back_btn:"← နောက်သို့ (Back)",
 vip_btn:"👑 VIP အဖွဲ့ဝင်ဖြစ်ရန် (Creator ဖြစ်ရန်)",vip_title:"👑 VIP အဖွဲ့ဝင် / Creator ဖြစ်ရန်",vip_loading:"ခဏစောင့်ပါ...",
 vip_desc:"VIP ဖြစ်ရင် ဇာတ်လမ်းအားလုံး အကန့်မရှိကြည့်ခွင့်ရပြီး Creator Dashboard ကနေ ကိုယ့်ဗီဒီယိုလင့်ခ်တင်ကာ View အလိုက် ဝင်ငွေရနိုင်ပါတယ်။",
 vip_coin_h:"🪙 Coin နဲ့ ဝယ်ယူရန်",vip_coin_txt:"VIP ဈေး {0} coin · သင့်မှာ {1} coin ရှိပါတယ်",vip_coin_off:"Coin နဲ့ ဝယ်ယူခွင့် လောလောဆယ် မဖွင့်သေးပါ – အောက်က လျှောက်လွှာနည်းလမ်းကို သုံးပါ။",
 vip_buy:"Coin {0} နဲ့ VIP ဝယ်မယ်",vip_buy_q:"Coin နဲ့ VIP ဝယ်ယူမှာ သေချာပါသလား?",vip_no_coin:"Coin မလောက်ပါ",vip_ok:"VIP ဖြစ်သွားပါပြီ 🎉 Creator Dashboard ကို ဖွင့်ပေးထားပါတယ်",vip_now:"သင် VIP ဖြစ်ပြီးသား ဖြစ်ပါတယ် 🎉",
 vip_apply_h:"📝 TikTok Creator လျှောက်လွှာ",vip_apply_txt:"Creator / VIP လျှောက်ထားရန် Follower အနည်းဆုံး 10K ရှိသော TikTok Account Link ထည့်သွင်းပေးပါ။ Admin မှ စစ်ဆေးပြီး အတည်ပြုပေးပါမည်။",
 vip_tt_lbl:"🎵 TikTok Profile Link (မဖြစ်မနေ ဖြည့်ရန်)",vip_tt_ph:"https://www.tiktok.com/@username",vip_tt_req:"TikTok Profile Link ကို ထည့်ပေးပါ",vip_tt_bad:"TikTok လင့်ခ် မမှန်ပါ – https://www.tiktok.com/@username ပုံစံ ဖြစ်ရမယ်",vip_tt_view:"🔗 TikTok ဖွင့်ကြည့်မယ်",vip_approve:"✅ အတည်ပြုမည် (Approve)",vip_reject:"❌ ပယ်ဖျက်မည် (Reject)",
 vip_msg_ph:"အပိုမှတ်ချက် (မရေးလည်းရ)",vip_apply_btn:"VIP လျှောက်လွှာ တင်မယ်",vip_applied:"လျှောက်လွှာ တင်ပြီးပါပြီ",vip_pending:"⏳ လျှောက်လွှာ စစ်ဆေးဆဲပါ – Admin အတည်ပြုပြီးရင် ဒီစာမျက်နှာကို ပြန်ဖွင့်ကြည့်ပါ။",vip_rejected:"❌ ယခင်လျှောက်လွှာ ပယ်ချခံရပါတယ်"},
en:{pick_genre:"Choose a genre",ph_desc:"Synopsis – a short summary of the story (optional)",
 ph_free:"Free episodes (blank = 10)",all_free_chk:"🎁 Everything free (no locked episodes)",
 fixed_price_note:"🔒 Every episode after the free ones is locked at a fixed 30 coins. If the free-episode number is higher than the total, or “Everything free” is ticked, nothing is locked.",
 hot_chk:"🔥 Show a “Hot” badge on the home page",cov_preview:"Cover preview",cov_bad:"Can’t show this image – check the link",
 uploader_lbl:"👤 Uploader: {0}",uploader_admin:"Admin",hot_on:"🔥 Turn Hot badge off (now ON)",hot_off:"🔥 Turn Hot badge on (now OFF)",hot_set:"Hot badge updated",
 ext_need_sql:"⚠️ Drama added, but the synopsis/Hot flag could not be saved yet – run supabase-v29.sql",
 lbl_cover:"🔗 Cover image link (Image URL)",lbl_vid1:"🔗 Video link – episode 1 (Video URL)",
 add_note:"After adding, the drama opens right away – pick an episode number and paste its video link. Links must start with https:// and the video must be a direct file link (e.g. .mp4), not a YouTube page.",
 ph_cover_url:"https://... (cover image link)",ph_video_url:"https://... (video link .mp4)",
 adm_vurl_lbl:"🔗 Episode {0} video link (Video URL)",adm_vurl_btn:"Save video link",adm_curl_lbl:"🔗 Cover image link (Image URL)",adm_curl_btn:"Save cover link",
 bad_url:"The link must be a valid https:// URL",back_btn:"← Back",
 vip_btn:"👑 Become a VIP member (become a Creator)",vip_title:"👑 Become VIP / Creator",vip_loading:"Please wait...",
 vip_desc:"VIP members watch every drama without limits and can post their own video links in the Creator Dashboard to earn per view.",
 vip_coin_h:"🪙 Buy with coins",vip_coin_txt:"VIP price {0} coins · you have {1} coins",vip_coin_off:"Buying with coins is not open yet – use the application below.",
 vip_buy:"Buy VIP for {0} coins",vip_buy_q:"Buy VIP with your coins?",vip_no_coin:"Not enough coins",vip_ok:"You are VIP now 🎉 Creator Dashboard is open",vip_now:"You are already VIP 🎉",
 vip_apply_h:"📝 TikTok Creator application",vip_apply_txt:"To apply as a Creator / VIP, enter the link to a TikTok account with at least 10K followers. An Admin will review and approve it.",
 vip_tt_lbl:"🎵 TikTok profile link (required)",vip_tt_ph:"https://www.tiktok.com/@username",vip_tt_req:"Please enter your TikTok profile link",vip_tt_bad:"Invalid TikTok link – it should look like https://www.tiktok.com/@username",vip_tt_view:"🔗 Open TikTok",vip_approve:"✅ Approve",vip_reject:"❌ Reject",
 vip_msg_ph:"Extra note (optional)",vip_apply_btn:"Submit VIP application",vip_applied:"Application submitted",vip_pending:"⏳ Your application is being reviewed – reopen this page once an Admin approves it.",vip_rejected:"❌ Your previous application was rejected"}};
["my","en"].forEach(function(l){I18N[l]=I18N[l]||{};for(var k in A[l])I18N[l][k]=A[l][k]})})();
var NAV={hd:0,nb:0,nr:0};
var BOOT={qs:new URLSearchParams(location.search),hs:new URLSearchParams((location.hash||"").replace(/^#/,"")),hash:location.hash||"",search:location.search||""};
var BUCKET=C.BUCKET||"shwezat-media",MAXMB=C.MAXMB||50;
function mkClient(k){return window.supabase.createClient(C.SUPABASE_URL,k,{auth:{flowType:"implicit",detectSessionInUrl:true,persistSession:true,autoRefreshToken:true,storage:window.localStorage}})}
var SAMPLE=[["အစားထိုးမေမေ","ပျော်ရွှင်စရာ","#7a3b2e","#d9a066"],["မသန်စွမ်းသူဌေးကြီးနဲ့ လက်ထပ်ခြင်း","အချစ်ဇာတ်လမ်း","#3a2a5a","#c06a8a"],["သူ့ရဲ့ သီးသန့်လူနာ","ချစ်ခြင်းမေတ္တာ","#1f3a4a","#c97b5a"],["အစားထိုးသတို့သမီး","ပြန်လည်ရှင်သန်ခြင်း","#5a2a2a","#e0b15a"],["မာဖီးယားထဲ လျှို့ဝှက်စုံထောက်","ထိတ်လန့်ဖွယ်","#14262a","#5aa89a"],["အမွေစားသမီး နိုးထလာခြင်း","စိတ်ကူးယဉ်","#1d3b4f","#e3b765"]].map(function(x,i){return{id:"s"+(i+1),t:x[0],g:x[1],eps:20,a:x[2],b:x[3],v:(9-i)*100000,vids:{},price:30,free:10,cover:null,cp:null}});
function ls(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
function lget(k){try{return localStorage.getItem(k)}catch(e){return null}}
var S={tab:"home",rank:"hot",q:"",me:null,dr:SAMPLE,live:false,sel:null,ep:0,mode:"login",fp:null,recov:false,dash:false,creatorDash:false,creatorData:null,creatorFiles:{},cc:{},lang:lget("zlang")==="en"?"en":"my",spd:parseFloat(lget("zsp"))||1,inst:null,key:"",list:ls("zl",[]),un:{}};
function t(k){var d=I18N[S.lang]||I18N.my,s=d[k];if(s==null)s=I18N.my[k];if(s==null)s=k;for(var i=1;i<arguments.length;i++)s=s.split("{"+(i-1)+"}").join(arguments[i]);return s}
function $(s){return document.querySelector(s)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function save(){try{localStorage.setItem("zl",JSON.stringify(S.list))}catch(e){}}
function toast(m){var e=$("#toast");e.textContent=m;e.className="toast show";clearTimeout(toast.h);toast.h=setTimeout(function(){e.className="toast"},2400)}
function fail(m){m=String(m||"Unknown error");toast(m);var e=$("#toast");clearTimeout(toast.h);toast.h=setTimeout(function(){e.className="toast"},7000);var b=$("#err");if(b){b.style.display="block";b.textContent=m}}
function clrErr(){var b=$("#err");if(b)b.style.display="none"}
function today(){return new Date().toISOString().slice(0,10)}
function find(id){for(var i=0;i<S.dr.length;i++)if(String(S.dr[i].id)===String(id))return S.dr[i]}
function isAdm(){return !!(SB&&S.me&&S.me.is_admin)}
function col(c,d){return /^#[0-9a-f]{3,8}$/i.test(c||"")?c:d}
function bg(d){
 if(d.cover)return"background-color:"+col(d.a,"#3a2a5a")+";background-image:linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(10,6,4,.85)),url('"+encodeURI(d.cover).replace(/['()]/g,escape)+"');background-size:cover;background-position:center";
 return"background:linear-gradient(160deg,"+col(d.a,"#3a2a5a")+","+col(d.b,"#c06a8a")+" 150%)"}
function isVip(){return!!(S.me&&S.me.is_vip)}
function locked(d,n){return!(isAdm()||isVip()||d.price<=0||n<=d.free||S.un[d.id+"_"+n])}
function pubUrl(p){return p?(/^https?:/i.test(p)?p:SB.storage.from(BUCKET).getPublicUrl(p).data.publicUrl):null}
/* ---------- v17: Cloudinary Unsigned Upload (api_key လုံးဝမပို့ – file + upload_preset ၂ ခုတည်း) ---------- */
var CBMAX=200*1048576,CLD_DEF_NAME="hdppeivq",CLD_DEF_PRESET="shwezat_unsigned";
function cdOk(u){return /^https:\/\/[^\s"'<>]+$/i.test(String(u||"").trim())}
function cldName(){var n=String((window.CFG&&window.CFG.CLOUDINARY_CLOUD_NAME)||CLD_DEF_NAME).trim();return n||CLD_DEF_NAME}
function cldPreset(){var p=String((window.CFG&&window.CFG.CLOUDINARY_UPLOAD_PRESET)||CLD_DEF_PRESET).trim();return p||CLD_DEF_PRESET}
/* ဖိုင်ကို Cloudinary ပေါ်တင် (XMLHttpRequest + % progress) -> {url} / {error}   url = response.secure_url */
function catUp(f,name,cb){return new Promise(function(res){
 if(f.size>CBMAX){res({error:"big"});return}
 var cn=cldName(),fd=new FormData();
 fd.append("file",f,name);fd.append("upload_preset",cldPreset());
 var x=new XMLHttpRequest();x.open("POST","https://api.cloudinary.com/v1_1/"+encodeURIComponent(cn)+"/auto/upload");
 x.upload.onprogress=function(e){if(e.lengthComputable&&cb)cb(Math.round(e.loaded*100/e.total))};
 x.onload=function(){
  var j={};try{j=JSON.parse(x.responseText)}catch(e){}
  if(x.status>=200&&x.status<300&&j&&j.secure_url&&cdOk(j.secure_url)){res({url:j.secure_url});return}
  var m=(j&&j.error&&j.error.message)||("HTTP "+x.status);
  if(/unknown api key|invalid cloud_name|cloud_name/i.test(m))m+=" (Cloud Name \""+cn+"\" \u1019\u103e\u1014\u103a\u1019\u103e\u1014\u103a\u1019\u101e\u1010\u103a? Cloudinary Dashboard \u1019\u103e\u102c \u1005\u1005\u103a\u1015\u102b)";
  else if(/preset/i.test(m))m+=" (Preset \""+cldPreset()+"\" \u1000\u102d\u102f Unsigned \u1021\u1016\u103c\u1005\u103a \u1011\u102c\u1038\u1015\u102b)";
  res({error:m})};
 x.onerror=function(){res({error:"net"})};
 x.ontimeout=function(){res({error:"net"})};
 x.send(fd)})}
function upErr(e){
 if(e==="big")return"ဖိုင် 200MB ထက် ကြီးနေပါသည် — Link ထည့်ပါ";
 return"တင်မရပါ: "+(e==="net"?"အင်တာနက်/ချိတ်ဆက်မှု ပြတ်သွားပါတယ် (သို့)":e)}
function pickBtn(tid,kind,flush,label){return'<div style="padding:'+(flush?"0":"0 16px")+' 8px"><label class="chip up">'+(label?esc(label):"📁 ဖုန်းထဲမှ ဖိုင်ရွေးတင်ရန် (Cloudinary Auto Link)")+'<input class="fi" type="file" accept="'+(kind==="img"?"image/*":"video/*")+'" data-c="pick" data-t="'+tid+'" data-k="'+kind+'"></label><div id="st_'+tid+'"></div></div>'}
function pickSt(tid,msg,pct,bad){var e=$("#st_"+tid);if(!e)return;e.innerHTML='<div class="note" style="padding:6px 0 0;'+(bad?"color:var(--coral)":"")+'">'+esc(msg)+"</div>"+(pct!=null?'<div class="pbar"><i style="width:'+pct+'%"></i></div>':"")}
async function pickUp(f,tid,kind){
 var inp=$("#"+tid);
 if(kind==="img"&&f.type&&f.type.indexOf("image")!==0){pickSt(tid,t("only_img"),null,1);return}
 if(kind==="vid"&&f.type&&f.type.indexOf("video")!==0){pickSt(tid,t("only_video"),null,1);return}
 if(f.size>CBMAX){pickSt(tid,upErr("big"),null,1);return}
 pickSt(tid,"⏳ တင်နေပါသည်... (0%)",0);
 if(kind==="img"){try{if(window.__pvB)URL.revokeObjectURL(window.__pvB);window.__pvB=URL.createObjectURL(f);covPrev(tid,window.__pvB)}catch(e){}}
 try{
  var body=f,name="f"+Date.now()+"."+vidExt(f);
  if(kind==="img"){body=await shrink(f);name="f"+Date.now()+".jpg"}
  var r=await catUp(body,name,function(pc){pickSt(tid,"⏳ တင်နေပါသည်... ("+pc+"%)",pc)});
  if(r.error){pickSt(tid,upErr(r.error),null,1);return}
  var i2=$("#"+tid);if(i2)i2.value=r.url;
  pickSt(tid,"✅ တင်ပြီးပါပြီ – လင့်ခ် အလိုအလျောက် ဖြည့်ပေးပြီး (သိမ်းဖို့ ခလုတ်ကို နှိပ်ပါ)")
 }catch(e){pickSt(tid,upErr(e&&e.message||String(e)),null,1)}}
function sq(f,n){return new Promise(function(res){
 try{var im=new Image(),u=URL.createObjectURL(f);
  im.onload=function(){var m=Math.min(im.width,im.height),c=document.createElement("canvas");c.width=c.height=n;
   c.getContext("2d").drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,n,n);URL.revokeObjectURL(u);c.toBlob(function(b){res(b||f)},"image/jpeg",.85)};
  im.onerror=function(){URL.revokeObjectURL(u);res(f)};im.src=u}catch(e){res(f)}})}
async function setAvatar(f){
 if(!SB||!S.me)return;
 if(f.type&&f.type.indexOf("image")!==0){toast(t("only_img"));return}
 try{
  toast("⏳ ပုံပြင်ဆင်နေပါသည်...");
  var blob=await sq(f,300);
  var r=await catUp(blob,"avatar"+Date.now()+".jpg",function(pc){toast("⏳ တင်နေပါသည်... ("+pc+"%)")});
  if(r.error){toast(upErr(r.error));return}
  var q=await SB.rpc("set_my_avatar",{p_url:r.url});
  if(q.error){toast(/function|schema/i.test(q.error.message)?"supabase-v14-patch.sql ကို Run ရန်လိုပါတယ်":q.error.message);return}
  S.me.avatar_url=r.url;S.cc[S.me.id]={name:S.me.name,avatar_url:r.url};render();toast("✅ Profile ပုံ ပြောင်းပြီးပါပြီ")
 }catch(e){toast(upErr(e&&e.message||String(e)))}}
function avBg(u){return/^https:\/\//i.test(u||"")?"background:url('"+esc(encodeURI(u).replace(/'/g,"%27"))+"') center/cover":""}
function avDot(u,sz){return'<span class="avs" style="width:'+sz+'px;height:'+sz+'px;'+avBg(u)+'">'+(u?"":"☺")+"</span>"}
function byName(id){var c=S.cc[id];return c?avDot(c.avatar_url,20)+" "+esc(c.name||id):esc(id||"")}
function byHtml(d){var c=d&&d.o&&S.cc[d.o];return c?'<div style="display:flex;align-items:center;gap:8px;margin:8px 0">'+avDot(c.avatar_url,26)+'<span class="sub" style="color:var(--mute)">တင်ဆက်သူ: '+esc(c.name||"Creator")+"</span></div>":""}
async function loadCC(ids){
 if(!SB)return;
 var need=(ids||[]).filter(function(x,i,a){return x&&a.indexOf(x)===i&&!S.cc[x]});
 if(!need.length)return;
 try{var r=await SB.rpc("get_public_profiles",{p_ids:need});
  (r.data||[]).forEach(function(x){S.cc[x.id]={name:x.name,avatar_url:x.avatar_url}})}catch(e){}}
function okUrl(u){return /^https:\/\/[^\s"'<>]+$/i.test(u||"")&&String(u).length<=2000}
function backbar(){return'<button class="backtop" data-a="navback">'+t("back_btn")+"</button>"}
function fmt(v){return v>=1e6?(v/1e6).toFixed(1)+"M":v>=1e3?(v/1e3).toFixed(1)+"K":String(v)}
function poster(d,tag){return'<div class="poster" style="'+bg(d)+'">'+(tag?'<span class="tag">Hot</span>':"")+"</div>"}
function card(d,tag){return'<div class="card" data-a="open" data-v="'+esc(d.id)+'">'+poster(d,tag)+'<p class="ct">'+esc(d.t)+"</p></div>"}
function row(d,n){return'<div class="row" data-a="open" data-v="'+esc(d.id)+'">'+(n?'<span class="rank">'+n+"</span>":"")+poster(d)+'<div class="info"><strong>'+esc(d.t)+'</strong><div class="sub">'+esc(d.g)+" · "+t("eps_n",d.eps)+'</div></div><span class="heat">🔥 '+fmt(d.v)+"</span></div>"}
function note(x){return'<p class="note">'+x+"</p>"}
var GSVG='<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/><path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>';
function h3(x,big){return'<h3 class="serif"'+(big?' style="font-size:24px"':"")+">"+x+"</h3>"}

/* ===== v30: Hero Banner = လွန်ခဲ့သော ၇ ရက် ကြည့်ရှုမှု အများဆုံး Top 6 Swipe Carousel ===== */
var HC={t:null,key:"",go:null};
function heroPick(){
 var need=Math.min(6,S.dr.length),out=[],seen={},wk=(S.live&&S.wk)||[];
 wk.forEach(function(x){var d=find(x.id);if(d&&!seen[d.id]&&x.v>0){seen[d.id]=1;out.push({d:d,v:x.v})}});
 if(need&&out.length>=need)return{mode:"wk",l:out.slice(0,need)};
 /* တစ်ပတ်အတွင်း View data မစုံသေးရင် စုစုပေါင်း View အများဆုံးနဲ့ အစားထိုး */
 var l=S.dr.slice().sort(function(x,y){return y.v-x.v}).slice(0,need);
 return{mode:"tot",l:l.map(function(d){return{d:d,v:d.v}})}}
function heroHtml(){
 var p=heroPick(),h='<div class="hcar"><div class="htrack" id="htrack">';
 p.l.forEach(function(x,i){var d=x.d;
  var cu=d.cover?"url('"+encodeURI(d.cover).replace(/['()]/g,escape)+"')":"";
  var base="background-color:"+col(d.a,"#3a2a5a")+";";
  var pst=cu?base+"background-image:"+cu+";background-size:cover;background-position:top center":"background:linear-gradient(160deg,"+col(d.a,"#3a2a5a")+","+col(d.b,"#c06a8a")+" 150%)";
  var bd=cu?base+"background-image:"+cu:"background:linear-gradient(160deg,"+col(d.a,"#3a2a5a")+","+col(d.b,"#c06a8a")+" 150%)";
  h+='<div class="hslide" data-a="open" data-v="'+esc(d.id)+'"><div class="hbd" style="'+bd+'"></div><div class="hshade"></div><span class="hrk">#'+(i+1)+' TOP</span><div class="hpost" style="'+pst+'"></div><div class="meta"><span class="heat">🔥 '+t("viewed",fmt(x.v))+(p.mode==="wk"?" · "+t("hero_wk"):"")+'</span><h2>'+esc(d.t)+'</h2><div class="sub">'+esc(d.g)+" · "+t("eps_n",d.eps)+"</div></div></div>"});
 h+='</div><div class="hdots" id="hdots">'+p.l.map(function(x,i){return'<button class="hdot'+(i===0?" on":"")+'" data-a="hgo" data-v="'+i+'" aria-label="'+(i+1)+'"></button>'}).join("")+"</div></div>";
 return{html:h,key:p.mode+":"+p.l.map(function(x){return x.d.id}).join(",")}}
function heroInit(){
 clearInterval(HC.t);HC.t=null;HC.go=null;
 var tr=document.getElementById("htrack");if(!tr)return;
 var n=tr.children.length,pauseUntil=0,raf=0;
 function hold(ms){pauseUntil=Date.now()+ms}
 function idx(){var best=0,bd=1e9;for(var i=0;i<n;i++){var dd=Math.abs(tr.children[i].offsetLeft-tr.scrollLeft);if(dd<bd){bd=dd;best=i}}return best}
 function dots(i){var ds=document.querySelectorAll("#hdots .hdot");for(var k=0;k<ds.length;k++)ds[k].className="hdot"+(k===i?" on":"")}
 function goTo(i){try{tr.scrollTo({left:tr.children[i].offsetLeft,behavior:"smooth"})}catch(e){tr.scrollLeft=tr.children[i].offsetLeft}}
 tr.addEventListener("scroll",function(){if(raf)return;raf=requestAnimationFrame(function(){raf=0;dots(idx())})},{passive:true});
 /* လက်နဲ့ထိ / ပွတ်ဆွဲနေရင် Auto-slide ရပ် – လက်လွှတ်ပြီး ၆ စက္ကန့်မှ ပြန်စ */
 ["touchstart","pointerdown","mousedown","wheel"].forEach(function(ev){tr.addEventListener(ev,function(){hold(8000)},{passive:true})});
 ["touchend","touchcancel"].forEach(function(ev){tr.addEventListener(ev,function(){hold(6000)},{passive:true})});
 HC.go=function(i){if(i<0||i>=n)return;hold(8000);goTo(i)};
 var calm=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(n>1&&!calm)HC.t=setInterval(function(){
  if(document.getElementById("htrack")!==tr){clearInterval(HC.t);HC.t=null;return}
  if(document.hidden||Date.now()<pauseUntil||S.tab!=="home"||sheetOpen()||ucmIsOpen())return;
  var i=idx()+1;if(i>=n)i=0;goTo(i)},4500)}
async function loadWeekly(force){
 if(!SB||!S.live)return;
 var now=Date.now();if(!force&&S.wkAt&&now-S.wkAt<120000)return;S.wkAt=now;
 try{
  var r=await SB.rpc("get_weekly_top_dramas",{p_limit:12});
  if(r.error||!Array.isArray(r.data)){S.wk=null;return}
  S.wk=r.data.map(function(x){return{id:x.drama_id,v:+x.views||0}});
  if(S.tab==="home"&&!S.q&&!sheetOpen()&&heroHtml().key!==HC.key)grid()
 }catch(e){S.wk=null}}
/* ===== v30: Lock အပိုင်း နှိပ်ရင် Coin မဖြတ်ခင် Confirm Modal ===== */
var UCM=null;
function ucmIsOpen(){var e=document.getElementById("ucm");return!!(e&&e.classList.contains("open"))}
function ucmHide(){var e=document.getElementById("ucm");if(e)e.className="ucm";UCM=null}
function ucmClose(){ucmHide();navSync()}
function ucmShow(d,n,go){
 var e=document.getElementById("ucm");
 if(!e){e=document.createElement("div");e.id="ucm";e.className="ucm";e.setAttribute("role","dialog");e.setAttribute("aria-modal","true");e.setAttribute("data-a","ucmshade");document.body.appendChild(e)}
 var pr=+d.price||FIXED_PRICE;
 UCM={id:d.id,n:n,go:go,busy:false};
 e.innerHTML='<div class="ucmb"><h3 class="ucmt">'+esc(t("ucm_q",n,pr))+'</h3><p class="ucmbal">'+esc(t("ucm_bal",+S.me.coins||0))+'</p><div class="ucmbtn"><button class="ucmc" data-a="ucmno">'+esc(t("ucm_no"))+'</button><button class="ucmy" data-a="ucmok">'+esc(t("ucm_yes",pr))+"</button></div></div>";
 e.className="ucm open";navSync()}
async function ucmYes(){
 if(!UCM||UCM.busy)return;
 var u=UCM;u.busy=true;
 var d=find(u.id);ucmHide();navSync();
 if(!d||find(S.sel)!==d||!sheetOpen())return;
 S.fsReq=!!u.go;await playEp(u.n,true)}
/* ---------- pages ---------- */
function home(){return installBar()+'<input class="search" id="q" placeholder="'+esc(t("search_ph"))+'" value="'+esc(S.q)+'"><div id="hb"></div>'}
function grid(){
 var q=S.q.toLowerCase(),l=S.dr.filter(function(d){return d.t.toLowerCase().indexOf(q)>-1}),h="";
 if(!q&&l.length){var hh=heroHtml();h+=hh.html;HC.key=hh.key}
 h+=h3(q?t("search_res"):t("you_may_like"));
 h+=l.length?'<div class="grid">'+l.map(function(d,i){return card(d,S.live&&!S.noExt?!!d.hot:i<6)}).join("")+"</div>":'<div class="empty">'+t("no_match",esc(S.q))+"</div>";
 if(S.err&&!q)h+=note(t("db_err",esc(S.err)));
 if(!S.live&&!q)h+=note(SB?t("no_live_sb"):t("no_live"));
 $("#hb").innerHTML=h;heroInit()}
function ranks(){
 var names={hot:t("rk_hot"),"new":t("rk_new"),trend:t("rk_trend")},l=S.dr.slice();
 if(S.rank==="hot")l.sort(function(a,b){return b.v-a.v});
 else if(S.rank==="new")l.reverse();
 else l=l.slice(-10).sort(function(a,b){return b.v-a.v});
 return h3(t("rank_title"),1)+'<div class="chips">'+Object.keys(names).map(function(k){return'<button class="chip '+(S.rank===k?"on":"")+'" data-a="rank" data-v="'+k+'">'+names[k]+"</button>"}).join("")+"</div>"+l.map(function(d,i){return row(d,i+1)}).join("")}
function mylist(){
 var l=S.dr.filter(function(d){return S.list.indexOf(String(d.id))>-1});
 return h3(t("list_title"),1)+(l.length?l.map(function(d){return row(d)}).join(""):'<div class="empty">'+t("list_empty")+"</div>")}
function rewards(){
 var m=S.me,st=0,can=!!m;
 if(m){var y=new Date(Date.now()-864e5).toISOString().slice(0,10);
  if(m.last_checkin===today()){st=m.streak;can=false}else st=(m.last_checkin===y&&m.streak<7)?m.streak:0}
 var h=h3(t("daily_title"),1)+'<div class="days">';
 R.forEach(function(c,i){h+='<div class="day '+(i<st?"done":i===st?"now":"")+(i===6?" big":"")+'"><strong>+'+c+"</strong><span>"+(i<st?t("claimed"):t("day_n",i+1))+"</span></div>"});
 h+="</div>";
 if(!m)h+='<button class="btn" data-a="checkin">'+t("checkin_login")+'</button>';
 else h+='<button class="btn" '+(can?"":"disabled ")+'data-a="checkin">'+(can?t("checkin_do",R[st]):t("come_back"))+"</button>";
 return h+note(t("reward_note"))}

/* ----- login / register / forgot password ----- */
function loginForm(){
 var reg=S.mode==="reg";
 return h3(t(reg?"reg_title":"login_title"),1)+(reg?'<input class="in" id="an" placeholder="'+esc(t("name_ph"))+'" autocomplete="name">':"")
 +'<input class="in" id="ae" type="email" placeholder="Email" autocomplete="email"><input class="in" id="ap" type="password" placeholder="'+esc(t("pw_ph"))+'" autocomplete="'+(reg?"new-password":"current-password")+'">'
 +'<button class="btn" data-a="doauth">'+t(reg?"reg_btn":"login_btn")+"</button>"
 +(reg?"":'<button class="link" style="padding-top:0" data-a="forgot">'+t("forgot_link")+"</button>")
 +'<div class="or">'+t("or")+'</div><button class="gbtn" data-a="google">'+GSVG+t("google")+'</button><button class="link" data-a="mode">'+t(reg?"to_login":"to_reg")+"</button>"}
function forgotForm(){
 var f=S.fp||{step:1,email:""},h=backbar()+h3(t("fp_title"),1);
 if(f.step===1)h+=note(t("fp_note1"))+'<input class="in" id="fe" type="email" placeholder="Gmail" autocomplete="email" value="'+esc(f.email||"")+'"><button class="btn" data-a="fpsend">'+t("fp_send")+"</button>";
 else h+=note(t("fp_sent",esc(f.email)))+'<input class="in" id="fc" inputmode="numeric" autocomplete="one-time-code" maxlength="8" placeholder="'+esc(t("fp_code_ph"))+'"><input class="in" id="fn" type="password" autocomplete="new-password" placeholder="'+esc(t("fp_newpw"))+'"><input class="in" id="fn2" type="password" autocomplete="new-password" placeholder="'+esc(t("fp_conf"))+'"><button class="btn" data-a="fpdone">'+t("fp_change")+'</button><button class="link" data-a="fpresend">'+t("fp_resend")+'</button><button class="link" data-a="fpedit">'+t("fp_edit")+"</button>";
 return h+'<button class="link" data-a="fpback">'+t("fp_back")+"</button>"}
function newPwForm(){
 return backbar()+h3(t("newpw_title"),1)+'<input class="in" id="fn" type="password" autocomplete="new-password" placeholder="'+esc(t("fp_newpw"))+'"><input class="in" id="fn2" type="password" autocomplete="new-password" placeholder="'+esc(t("fp_conf"))+'"><button class="btn" data-a="setnewpw">'+t("newpw_btn")+'</button><button class="link" data-a="cancelpw">'+t("cancel")+"</button>"}

/* ----- settings (ကျွန်ုပ် tab) ----- */
function langBox(){
 var card='<div class="acard" style="margin:0 16px 12px">';
 return '<h3 class="serif" style="margin-top:14px">⚙ '+t("set_title")+"</h3>"+card+"<b>"+t("set_lang")+'</b><div class="chips" style="padding:8px 0 0"><button class="chip '+(S.lang==="my"?"on":"")+'" data-a="lang" data-v="my">မြန်မာ</button><button class="chip '+(S.lang==="en"?"on":"")+'" data-a="lang" data-v="en">English</button></div></div>'}
function settings(){
 var card='<div class="acard" style="margin:0 16px 12px">';
 var h=langBox();
 h+=card+"<b>"+t("set_install")+'</b><div style="margin-top:8px">';
 if(isStandalone())h+='<p class="note" style="padding:0">'+t("set_installed")+"</p>";
 else h+=(S.inst?'<button class="chip on" data-a="install">'+t("set_install_btn")+"</button> ":"")+'<button class="chip" data-a="guide">'+t("set_guide")+"</button>";
 h+="</div></div>";
 h+=card+"<b>"+t("set_cache")+'</b><p class="note" style="padding:4px 0 8px">'+t("set_cache_note")+'</p><button class="chip" data-a="clearcache">'+t("set_clear")+"</button></div>";
 return h}
function profile(){
 if(!SB)return h3(t("conn_fail"),1)+note(t("conn_note"))+'<button class="btn" data-a="reload">'+t("retry")+"</button>"+langBox();
 if(S.recov)return newPwForm();
 if(!S.me)return(S.mode==="forgot"?forgotForm():loginForm())+langBox();
 var m=S.me;if(S.dash&&m.is_admin)return dash();if(S.creatorDash&&(m.is_vip||m.is_creator))return creatorDashboard();
 var h='<div class="prof"><div class="av" style="'+avBg(m.avatar_url)+'">'+(m.avatar_url?"":"☺")+'<label class="avcam" title="Profile ပုံပြောင်းရန်">📷<input class="fi" type="file" accept="image/*" data-c="avatar"></label></div><div><strong>'+esc(m.name||m.email)+"</strong>"+(m.is_admin?t("admin_tag"):"")+(m.is_vip?t("vip_tag"):"")+'<div class="sub" style="color:var(--mute)">'+esc(m.email||"")+" · "+t("coin_n",m.coins)+"</div></div></div>";
 if(m.is_admin)h+='<button class="btn" data-a="dash">'+t("admin_open")+"</button>";
 if(m.is_vip||m.is_creator)h+='<button class="btn" data-a="creatorDash">👑 Creator Dashboard</button>';
 if(!m.is_vip&&!m.is_admin)h+='<button class="btn" data-a="vipbox">'+t("vip_btn")+"</button>";
 return h+settings()+'<button class="btn" style="background:var(--panel);color:var(--text);border:1px solid var(--line)" data-a="logout">'+t("logout")+"</button>"}

/* ----- admin ----- */
async function loadAdmin(){
 var c=function(x){return SB.from(x).select(x==="episodes"?"n":"id",{count:"exact",head:true})};
 var r=await Promise.all([
  c("profiles"),c("dramas"),c("episodes"),
  SB.from("profiles").select("id,name,email,coins,is_admin,is_vip").order("coins",{ascending:false}).limit(1000),
  SB.from("dramas").select("id,title,genre,owner_id,submitted_at").eq("moderation_status","pending").order("submitted_at",{ascending:true}).limit(100),
  SB.from("creator_withdrawals").select("id,creator_id,amount,currency_code,payout_method,payout_account,status,created_at").in("status",["pending","approved"]).order("created_at",{ascending:true}).limit(100),
  SB.from("creator_settings").select("*").eq("id",1).maybeSingle(),
  SB.from("episodes").select("drama_id,n,uploaded_by,dramas(title)").eq("moderation_status","pending").order("submitted_at",{ascending:true}).limit(100),
  SB.from("vip_applications").select("id,user_id,message,status,created_at").eq("status","pending").order("created_at",{ascending:true}).limit(100)
 ]);
 try{await loadCC([].concat((r[4].data||[]).map(function(x){return x.owner_id}),(r[7].data||[]).map(function(x){return x.uploaded_by})))}catch(e){}
 var v=0;S.dr.forEach(function(d){if(S.live)v+=d.v});
 S.ax={users:r[0].count||0,dramas:r[1].count||0,eps:r[2].count||0,views:v,
  list:r[3].data||[],pending:(r[4].data||[]),withdrawals:(r[5].data||[]),
  creatorSettings:r[6].data||{rate_per_1000:0,min_withdrawal:10000,currency_code:"MMK"},pendingEpisodes:r[7].data||[],vipApps:(r[8]&&r[8].data)||[]};
}

function userRows(l,q){
 q=(q||"").toLowerCase();
 var f=l.filter(function(u){return!q||((u.name||"")+" "+(u.email||"")).toLowerCase().indexOf(q)>-1});
 if(!f.length)return note(t("no_user"));
 return f.map(function(u){var id=esc(u.id);return'<div class="row" style="flex-wrap:wrap"><div class="info"><strong>'+esc(u.name||u.email)+(u.is_admin?t("admin_tag"):"")+(u.is_vip?" 👑":"")+'</strong><div class="sub">'+esc(u.email||"")+" · "+t("coin_n",u.coins)+"</div></div>"+
  '<div style="display:flex;gap:6px;flex-wrap:wrap;width:100%;margin-top:8px"><button class="chip" data-a="grant" data-v="'+id+'|100">+100</button><button class="chip" data-a="grant" data-v="'+id+'|500">+500</button><button class="chip" data-a="grant" data-v="'+id+'|-100">−100</button><button class="chip'+(u.is_vip?" on":"")+'" data-a="vip" data-v="'+id+"|"+(u.is_vip?0:1)+'">'+(u.is_vip?t("vip_off"):t("vip_on"))+"</button></div></div>"}).join("")}
function refUl(){var q=$("#us"),u=$("#ul");if(u&&S.ax)u.innerHTML=userRows(S.ax.list,q?q.value:"")}
function setSt(id,msg,pct){var e=$("#"+id);if(!e)return;e.innerHTML='<div class="note" style="padding:6px 0 0">'+esc(msg)+(pct!=null?" "+pct+"%":"")+"</div>"+(pct!=null?'<div class="pbar"><i style="width:'+pct+'%"></i></div>':"")}
function dash(){
 var a=S.ax||{users:0,dramas:0,eps:0,views:0,list:[]};
 var h=backbar()+h3(t("adm_title"),1)+'<div class="days">'+[[t("st_users"),a.users],[t("st_dramas"),a.dramas],[t("st_eps"),a.eps],[t("st_views"),fmt(a.views)]].map(function(x){return'<div class="day"><strong>'+x[1]+"</strong><span>"+x[0]+"</span></div>"}).join("")+"</div>";
 h+=h3(t("add_title"))+'<input class="in" id="nt" placeholder="'+esc(t("ph_title"))+'">'+genreSel("ng")+'<textarea class="in" id="nd" rows="3" maxlength="1000" placeholder="'+esc(t("ph_desc"))+'"></textarea><input class="in" id="ne" type="number" placeholder="'+esc(t("ph_eps"))+'"><input class="in" id="nf" type="number" min="0" placeholder="'+esc(t("ph_free"))+'"><label class="chk"><input type="checkbox" id="nall"> '+t("all_free_chk")+'</label><p class="note" style="padding:0 16px 10px">'+t("fixed_price_note")+'</p>'
 +'<label class="note" style="display:block" for="nc">'+t("lbl_cover")+'</label><input class="in" id="nc" type="url" inputmode="url" autocomplete="off" placeholder="'+esc(t("ph_cover_url"))+'">'+pickBtn("nc","img")+covPrevBox("nc")
 +'<label class="note" style="display:block" for="nv">'+t("lbl_vid1")+'</label><input class="in" id="nv" type="url" inputmode="url" autocomplete="off" placeholder="'+esc(t("ph_video_url"))+'">'+pickBtn("nv","vid")
 +'<label class="chk"><input type="checkbox" id="nhot"> '+t("hot_chk")+'</label><button class="btn" data-a="adddrama">'+t("add_btn")+'</button><div id="ust2" style="padding:0 16px"></div>'+note(t("add_note"));
 h+=h3(t("dramas_h"))+(S.live?S.dr.map(function(d){return'<div class="row admdr"><div class="info" data-a="open" data-v="'+esc(d.id)+'"><strong>'+esc(d.t)+'</strong><div class="sub">'+t("eps_n",d.eps)+" · "+t("vids_n",Object.keys(d.vids).length)+" · "+(d.price<=0?t("free_lbl"):t("coin_lbl",d.price))+'</div><div class="sub upl">'+esc(t("uploader_lbl",upName(d,a)))+'</div></div><div class="btns"><button class="chip" data-a="moreep" data-v="'+d.id+'">'+t("more_ep")+'</button><button class="chip" data-a="editeps" data-v="'+d.id+'">'+t("eps_edit_chip")+'</button><button class="chip" style="color:var(--coral)" data-a="deldramaid" data-v="'+d.id+'">'+t("del")+"</button></div></div>"}).join(""):note(t("none_dr")));
 h+=h3("👑 Creator စနစ် ဆက်တင်");
 h+='<div class="acard" style="margin:6px 16px 12px"><p class="note" style="padding:0 0 8px">အရည်အသွေးပြည့် View ၁,၀၀၀ အတွက် ပေးမည့်ငွေ (MMK)။ 0 ထားလျှင် ဝင်ငွေမတွက်ပါ။</p><input class="in" id="creatorRate" type="number" min="0" step="0.0001" value="'+Number((a.creatorSettings||{}).rate_per_1000||0)+'" placeholder="View ၁,၀၀၀ အတွက် ငွေ"><input class="in" id="creatorMin" type="number" min="0" step="1" value="'+Number((a.creatorSettings||{}).min_withdrawal||10000)+'" placeholder="အနည်းဆုံး ငွေထုတ်ယူပမာဏ"><button class="btn" data-a="saveCreatorSettings">Creator နှုန်းထား သိမ်းမယ်</button></div>';
 h+='<div class="acard" style="margin:6px 16px 12px"><p class="note" style="padding:0 0 8px">VIP ကို Coin နဲ့ ဝယ်ယူရမယ့်ဈေး။ 0 ထားလျှင် Coin နဲ့ မရောင်းပါ (လျှောက်လွှာနည်းလမ်းသာ ရှိမယ်)။</p><input class="in" id="vipPrice" type="number" min="0" step="1" value="'+Number((a.creatorSettings||{}).vip_coin_price||0)+'" placeholder="VIP coin ဈေး"><button class="btn" data-a="saveVipPrice">VIP ဈေး သိမ်းမယ်</button></div>';
 h+=h3("👑 VIP လျှောက်လွှာများ ("+(a.vipApps||[]).length+")");
 h+=(a.vipApps||[]).length?a.vipApps.map(function(x){var u=(a.list||[]).filter(function(q){return q.id===x.user_id})[0]||{};var pm=ttParse(x.message),lk=pm.url?'<a class="ttlink" href="'+esc(pm.url)+'" target="_blank" rel="noopener noreferrer">'+t("vip_tt_view")+'</a><div class="ttu">'+esc(pm.url)+'</div>':(pm.raw?'<div class="ttu">'+esc(pm.raw)+'</div>':"");return'<div class="acard" style="margin:6px 16px 12px"><b>'+esc(u.name||u.email||x.user_id)+'</b><p class="note" style="padding:2px 0">'+esc(u.email||"")+(pm.note?" · "+esc(pm.note):"")+'</p>'+lk+'<div class="vbtns"><button class="chip on" data-a="reviewVip" data-v="'+x.id+'|1">'+t("vip_approve")+'</button><button class="chip" data-a="reviewVip" data-v="'+x.id+'|0">'+t("vip_reject")+'</button></div></div>'}).join(""):note("VIP လျှောက်လွှာ မရှိသေးပါ။");
 h+=h3("စစ်ဆေးရန် Creator ဇာတ်လမ်းများ ("+(a.pending||[]).length+")");
 h+=(a.pending||[]).length?a.pending.map(function(x){return'<div class="acard" style="margin:6px 16px 12px"><b>'+esc(x.title)+'</b><p class="note" style="padding:2px 0">Creator: '+byName(x.owner_id)+' · '+esc(x.genre||"")+'</p><div style="display:flex;gap:8px"><button class="chip on" data-a="reviewDrama" data-v="'+x.id+'|1">Approve</button><button class="chip" data-a="reviewDrama" data-v="'+x.id+'|0">Reject</button></div></div>'}).join(""):note("စစ်ဆေးရန် မရှိသေးပါ။");
 h+=h3("စစ်ဆေးရန် Episode များ ("+(a.pendingEpisodes||[]).length+")");
 h+=(a.pendingEpisodes||[]).length?a.pendingEpisodes.map(function(x){var dt=x.dramas&&x.dramas.title||("Drama #"+x.drama_id);return'<div class="acard" style="margin:6px 16px 12px"><b>'+esc(dt)+' · Episode '+x.n+'</b><p class="note" style="padding:2px 0">Creator: '+byName(x.uploaded_by)+'</p><div style="display:flex;gap:8px"><button class="chip on" data-a="reviewEpisode" data-v="'+x.drama_id+'|'+x.n+'|approved">Approve</button><button class="chip" data-a="reviewEpisode" data-v="'+x.drama_id+'|'+x.n+'|rejected">Reject</button></div></div>'}).join(""):note("စစ်ဆေးရန် Episode မရှိပါ။");
 h+=h3("Creator ငွေထုတ်တောင်းဆိုမှု ("+(a.withdrawals||[]).length+")");
 h+=(a.withdrawals||[]).length?a.withdrawals.map(function(x){var u=(a.list||[]).filter(function(q){return q.id===x.creator_id})[0]||{};return'<div class="acard" style="margin:6px 16px 12px"><b>'+Number(x.amount).toFixed(2)+' '+esc(x.currency_code)+'</b><p class="note" style="padding:2px 0">'+esc(u.name||u.email||x.creator_id)+' · '+esc(x.payout_method)+' · '+esc(x.payout_account)+' · '+esc(x.status)+'</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="chip on" data-a="reviewWithdrawal" data-v="'+x.id+'|approved">Approve</button><button class="chip" data-a="reviewWithdrawal" data-v="'+x.id+'|paid">Mark Paid</button><button class="chip" data-a="reviewWithdrawal" data-v="'+x.id+'|rejected">Reject</button></div></div>'}).join(""):note("ငွေထုတ်တောင်းဆိုမှု မရှိသေးပါ။");
 h+=h3(t("users_h",a.users))+'<input class="in" id="us" placeholder="'+esc(t("us_ph"))+'"><div id="ul">'+userRows(a.list,"")+"</div>";
 return h+'<button class="btn" style="margin-top:14px;background:var(--panel);color:var(--text);border:1px solid var(--line)" data-a="undash">'+t("back")+"</button>"}
async function loadCreator(){
 if(!SB||!S.me||!(S.me.is_vip||S.me.is_creator))return;
 /* v25: စုစုပေါင်းရငွေ/View ကို Server မှာ တွက် (creator_summary) – အရင်က နောက်ဆုံး ၅၀၀၀ row ပဲ ပေါင်းလို့ View များရင် ပမာဏလျော့ပြ */
 var sm=null;try{var sr=await SB.rpc("creator_summary");if(!sr.error&&sr.data)sm=sr.data}catch(e){}
 var none=Promise.resolve({data:[]});
 var r=await Promise.all([
  SB.from("dramas").select("id,title,genre,eps,moderation_status,moderation_note,submitted_at").eq("owner_id",S.me.id).order("created_at",{ascending:false}),
  sm?none:SB.from("creator_earnings").select("amount,currency_code,created_at").eq("creator_id",S.me.id).order("created_at",{ascending:false}).limit(5000),
  SB.from("creator_withdrawals").select("id,amount,currency_code,status,payout_method,created_at,admin_note").eq("creator_id",S.me.id).order("created_at",{ascending:false}).limit(200),
  SB.from("creator_settings").select("rate_per_1000,min_withdrawal,currency_code").eq("id",1).maybeSingle(),
  sm?none:SB.from("creator_view_events").select("id,drama_id,episode_n,viewed_on").limit(10000)
 ]);
 var er=r.filter(function(x){return x.error})[0];
 if(er){toast("Creator အချက်အလက် ဖတ်မရပါ: "+er.error.message);return}
 S.creatorData={dramas:r[0].data||[],earnings:r[1].data||[],withdrawals:r[2].data||[],settings:r[3].data||{rate_per_1000:0,min_withdrawal:10000,currency_code:"MMK"},views:r[4].data||[],sum:sm};
}
function creatorDashboard(){
 var d=S.creatorData||{dramas:[],earnings:[],withdrawals:[],views:[],settings:{rate_per_1000:0,min_withdrawal:10000,currency_code:"MMK"}};
 var total=d.earnings.reduce(function(a,x){return a+(+x.amount||0)},0);
 var reserved=d.withdrawals.filter(function(x){return ["pending","approved","paid"].indexOf(x.status)>-1}).reduce(function(a,x){return a+(+x.amount||0)},0);
 var balance=Math.max(0,total-reserved),cur=d.settings.currency_code||"MMK",vc=d.views.length;
 if(d.sum){total=+d.sum.earned||0;balance=Math.max(0,+d.sum.balance||0);vc=+d.sum.views||0}
 var h=backbar()+h3("👑 Creator Dashboard",1);
 h+='<div class="days"><div class="day"><strong>'+fmt(d.dramas.length)+'</strong><span>ဇာတ်လမ်း</span></div><div class="day"><strong>'+fmt(vc)+'</strong><span>အရည်အသွေးပြည့် View</span></div><div class="day"><strong>'+total.toFixed(2)+'</strong><span>စုစုပေါင်းရငွေ ('+esc(cur)+')</span></div><div class="day"><strong>'+balance.toFixed(2)+'</strong><span>ထုတ်ယူနိုင်ငွေ</span></div></div>';
 if(S.me&&S.me.is_vip){h+='<div class="acard" style="margin:6px 16px 12px"><b>Creator ဗီဒီယိုတင်ရန်</b><p class="note" style="padding:4px 0">VIP ဖြစ်နေစဉ်သာ တင်နိုင်ပါတယ်။ လင့်ခ်တွေက https:// နဲ့ စရမယ်၊ ဗီဒီယိုက ဖိုင်တိုက်ရိုက်လင့်ခ် (.mp4) ဖြစ်ရမယ်။ Admin အတည်ပြုပြီးမှ Public မှာ ပေါ်ပါမယ်။</p><input class="in" id="crtitle" placeholder="ဇာတ်လမ်းအမည်">'+genreSel("crgenre")+'<textarea class="in" id="crdesc" rows="3" maxlength="1000" placeholder="'+esc(t("ph_desc"))+'"></textarea><label class="note" for="crcover">🔗 Cover ပုံလင့်ခ် (Image URL)</label><input class="in" id="crcover" type="url" inputmode="url" autocomplete="off" placeholder="https://...">'+pickBtn("crcover","img")+covPrevBox("crcover")+'<label class="note" for="crvideo">🔗 ပထမအပိုင်း ဗီဒီယိုလင့်ခ် (Video URL)</label><input class="in" id="crvideo" type="url" inputmode="url" autocomplete="off" placeholder="https://... (.mp4)">'+pickBtn("crvideo","vid")+'<button class="btn" data-a="creatorSubmit">Admin ထံ ဇာတ်လမ်းတင်သွင်းမယ်</button></div>';
 h+='<div class="acard" style="margin:6px 16px 12px"><b>ရှိပြီးသား ဇာတ်လမ်းအတွက် Episode ထပ်တင်ရန်</b><select class="in" id="crepisodeDrama"><option value="">ဇာတ်လမ်းရွေးပါ</option>'+d.dramas.filter(function(x){return x.moderation_status!=="rejected"}).map(function(x){return'<option value="'+x.id+'">'+esc(x.title)+' ('+esc(x.moderation_status)+')</option>'}).join("")+'</select><input class="in" id="crEpNo" type="number" min="1" max="200" placeholder="Episode နံပါတ်"><input class="in" id="crEpVideo" type="url" inputmode="url" autocomplete="off" placeholder="🔗 ဗီဒီယိုလင့်ခ် (Video URL) https://... (.mp4)">'+pickBtn("crEpVideo","vid")+'<button class="btn" data-a="creatorEpisodeSubmit">Episode တင်သွင်းမယ်</button></div>'}else{h+=note("VIP သက်တမ်းကုန်ဆုံးနေပါသည်။ ရှိပြီးသား Creator ဝင်ငွေကိုတော့ ထုတ်ယူနိုင်ပါတယ်။")}
 h+=h3("မင်းတင်ထားတဲ့ ဇာတ်လမ်းများ");
 h+=d.dramas.length?d.dramas.map(function(x){return'<div class="row" style="cursor:default"><div class="info"><strong>'+esc(x.title)+'</strong><div class="sub">'+esc(x.genre||"")+' · '+esc(x.moderation_status)+(x.moderation_note?" · "+esc(x.moderation_note):"")+'</div></div><span class="heat">'+(x.moderation_status==="approved"?"အတည်ပြုပြီး":x.moderation_status==="pending"?"စစ်ဆေးဆဲ":"ပယ်ချ")+'</span></div>'}).join(""):note("တင်ထားတဲ့ ဇာတ်လမ်း မရှိသေးပါ။");
 h+=h3("ငွေထုတ်ယူရန်");
 h+='<div class="acard" style="margin:6px 16px 12px"><p class="note" style="padding:0 0 8px">အနည်းဆုံး '+Number(d.settings.min_withdrawal||0).toLocaleString()+' '+esc(cur)+' · View ၁,၀၀၀ အတွက် '+Number(d.settings.rate_per_1000||0).toFixed(4)+' '+esc(cur)+'</p><input class="in" id="crAmount" type="number" min="0" step="0.01" placeholder="ထုတ်ယူလိုသော ပမာဏ"><input class="in" id="crMethod" placeholder="ငွေလက်ခံနည်း (ဥပမာ KPay / WavePay)"><input class="in" id="crAccount" placeholder="ဖုန်းနံပါတ် / အကောင့်အမည်"><button class="btn" data-a="creatorWithdraw">ငွေထုတ်ရန် တောင်းဆိုမယ်</button></div>';
 h+=h3("ငွေထုတ်မှတ်တမ်း");
 h+=d.withdrawals.length?d.withdrawals.map(function(x){return'<div class="row" style="cursor:default"><div class="info"><strong>'+Number(x.amount).toFixed(2)+' '+esc(x.currency_code)+'</strong><div class="sub">'+esc(x.payout_method)+' · '+esc(x.status)+' · '+new Date(x.created_at).toLocaleDateString()+'</div></div></div>'}).join(""):note("ငွေထုတ်မှတ်တမ်း မရှိသေးပါ။");
 h+='<button class="btn" style="background:var(--panel);color:var(--text);border:1px solid var(--line)" data-a="creatorBack">ပြန်သွားမယ်</button>';
 return h;
}
function render(){
 updTop();
 var T=[["home","⌂","n_home"],["rank","★","n_rank"],["list","♡","n_list"],["rewards","🪙","n_rewards"],["me","☺","n_me"]];
 $("#nav").innerHTML=T.map(function(x){return'<button data-a="tab" data-v="'+x[0]+'" class="'+(S.tab===x[0]?"on":"")+'"><i>'+x[1]+"</i>"+t(x[2])+"</button>"}).join("");
 if(S.tab==="home"){$("#app").innerHTML=home();grid()}
 else $("#app").innerHTML={rank:ranks,list:mylist,rewards:rewards,me:profile}[S.tab]();
 navSync()}
function updTop(){$("#ct").textContent=S.me?(S.me.is_vip?"👑 ":"🪙 ")+S.me.coins:t("login")}

/* ---------- drama sheet & player ---------- */
function sheet(){
 var d=find(S.sel);if(!d)return;
 var adm=isAdm()&&S.live,e="";
 for(var n=1;n<=d.eps;n++){var lock=locked(d,n);e+='<div class="ep'+(lock?" lock":"")+(n===S.ep?" cur":"")+(d.vids[n]?" has":"")+'" data-a="ep" data-v="'+n+'">'+(lock?"🔒":"")+n+"</div>"}
 $("#sb").innerHTML=backbar()+"<h2>"+esc(d.t)+'</h2><div class="sub" style="color:var(--mute)">'+esc(d.g)+" · "+t("eps_n",d.eps)+" · "+priceTxt(d)+'</div><div id="by">'+byHtml(d)+'</div>'+(d.desc?'<p class="syn">'+esc(d.desc)+'</p>':"")+'<div class="pwrap"><div id="pl" class="player" style="'+bg(d)+'"></div>'+socHtml(d)+fsHtml(d)+"</div>"+spdBar()+'<div class="eps">'+e+"</div>"+
 admBox(d,adm)+
 '<button class="btn" style="margin:12px 0 0;width:100%;background:var(--panel);color:var(--text);border:1px solid var(--line)" data-a="close">'+t("close")+"</button>";
 $("#sheet").className="sheet open"+(S.fs&&S.ep?" fs":"");navSync();socInit(d);admFill(d)}

/* ===== v22: Full-screen player helpers ===== */
function spdTxt(s){return(Number.isInteger(s)?s.toFixed(1):String(s))+"x"}
function fsName(d){var c=d&&d.o&&S.cc[d.o];return"@"+String((c&&c.name)||"mglisan").replace(/^@/,"")}
function fsHtml(d){
 if(!S.ep)return"";
 return'<div class="fsgest"></div><div class="fsplay" id="fsplay"><span>▶</span></div>'+
 '<div class="fstop"><button class="fsb" data-a="fsback" aria-label="'+esc(t("close"))+'">←</button><span class="fsep">EP.'+S.ep+'</span><span style="flex:1"></span><button class="fsb fsspd" id="fsspd" data-a="fsspd">'+spdTxt(S.spd)+"</button></div>"+
 '<div class="fsbot"><div class="fsnm">'+esc(fsName(d))+'</div><div class="fstt">'+esc(d.t)+'</div><button class="fseps" data-a="fseps">☰ '+t("fs_eps")+" · "+S.ep+"/"+d.eps+"</button></div>"+
 '<div class="fsbar" id="fsbar"><div class="fstrk"><b id="fsfill"></b></div></div>'}

/* ===== v19: ❤️ Like + 💬 Comment (dramas.id = video_id, bigint) ===== */
function socOn(){return!!(SB&&S.live&&!S.noSoc)}
function socHtml(d){
 var s=S.soc&&String(S.soc.id)===String(d.id)?S.soc:{};
 return'<div class="socbar" id="sbar">'+socBar(d,s)+"</div>"}
function socBar(d,s){
 var sv=S.list.indexOf(String(d.id))>-1,h="";
 if(socOn())h+='<button class="sbtn'+(s.liked?" on":"")+'" data-a="like" aria-pressed="'+(s.liked?"true":"false")+'"><i>'+(s.liked?"❤️":"🤍")+"</i><span>"+fmt(d.lk||0)+"</span></button>"+
  '<button class="sbtn" data-a="cmts" aria-label="'+esc(t("cm_ph"))+'"><i>💬</i><span>'+fmt(d.cm||0)+"</span></button>";
 h+='<button class="sbtn" data-a="share" aria-label="'+esc(t("share_lbl"))+'"><i>↗️</i><span>'+t("share_lbl")+"</span></button>"+
  '<button class="sbtn bm'+(sv?" on":"")+'" data-a="save" aria-pressed="'+(sv?"true":"false")+'" aria-label="'+esc(sv?t("list_rm"):t("list_add"))+'"><i>🔖</i><span>'+t("bm_lbl")+"</span></button>";
 return h}
function agoTxt(iso){
 var s=Math.max(0,(Date.now()-new Date(iso).getTime())/1000);
 if(s<60)return t("cm_now");if(s<3600)return t("cm_min",Math.floor(s/60));
 if(s<86400)return t("cm_hr",Math.floor(s/3600));return t("cm_day",Math.floor(s/86400))}
function cmItem(c){
 var mine=S.me&&c.user_id===S.me.id,can=mine||isAdm();
 return'<div class="cm"><span class="avs" style="width:30px;height:30px;'+avBg(c.user_avatar)+'">'+(c.user_avatar?"":"☺")+'</span><div class="cmb"><div class="cmh"><b>'+esc(c.user_name||"User")+'</b><span>'+esc(agoTxt(c.created_at))+(can?' <button class="cmx" data-a="cmdel" data-v="'+esc(c.id)+'">'+t("cm_del")+"</button>":"")+'</span></div><div class="cmt">'+esc(c.content)+"</div></div></div>"}
function cmList(s){
 if(s.list==null)return'<p class="note" style="padding:8px 0">'+t("cm_loading")+"</p>";
 if(!s.list.length)return'<p class="note" style="padding:8px 0">'+t("cm_none")+"</p>";
 return s.list.map(cmItem).join("")}
function socBox(d,s){
 var form=S.me?'<div class="cmf"><textarea class="in" id="cmin" rows="1" maxlength="500" placeholder="'+esc(t("cm_ph"))+'" style="margin:0;flex:1;min-width:0;width:auto;resize:none"></textarea><button class="chip on" data-a="cmsend">'+t("cm_send")+"</button></div>"
  :'<p class="note" style="padding:8px 0">'+t("cm_login")+"</p>";
 return'<div class="chd"><b id="ctit">💬 '+fmt(d.cm||0)+'</b><button class="cclose" data-a="cclose" aria-label="'+esc(t("close"))+'">✕</button></div><div id="clist">'+cmList(s)+'</div><div class="cfoot">'+form+"</div>"}
function csClose(){var c=$("#csheet");if(c)c.className="csheet";if(S.soc)S.soc.open=false}
function socInit(d){
 if(!SB||!S.live||S.noSoc)return;
 if(!S.soc||String(S.soc.id)!==String(d.id)){
  csClose();S.soc={id:d.id,liked:false,open:false,list:null,busy:false};
  if(S.me){var id=d.id;SB.from("video_likes").select("video_id").eq("video_id",id).eq("user_id",S.me.id).maybeSingle().then(function(r){
   if(r.error||!S.soc||S.soc.id!==id)return;S.soc.liked=!!r.data;socRefBar()},function(){})}}}
function socRefBar(){var d=find(S.sel),b=$("#sbar");if(d&&b)b.innerHTML=socBar(d,S.soc||{});var ti=$("#ctit");if(d&&ti)ti.textContent="💬 "+fmt(d.cm||0)}
function socRefList(){var l=$("#clist");if(l&&S.soc)l.innerHTML=cmList(S.soc)}
async function socLoad(d){
 var id=d.id,r=await SB.from("video_comments").select("id,user_id,user_name,user_avatar,content,created_at").eq("video_id",id).order("created_at",{ascending:false}).limit(100);
 if(!S.soc||S.soc.id!==id)return;
 if(r.error){S.soc.list=[];socRefList();toast(/relation|schema|does not exist/i.test(r.error.message)?t("cm_need_sql"):r.error.message);return}
 S.soc.list=r.data||[];socRefList()}
function priceTxt(d){return isVip()?t("price_vip"):d.price<=0?t("price_free"):t("price_txt",d.free,d.price)}
function admBox(d,adm){
 if(!adm)return"";
 /* v26: Admin ထိန်းချုပ်ခန်းထဲမှာတင် အပိုင်းနံပါတ် Dropdown ရွေး – Player မဖွင့်ဘဲ ဗီဒီယိုလင့်ခ်/ဖိုင် တင်နိုင် */
 var ob="";for(var n=1;n<=d.eps;n++)ob+='<option value="'+n+'"'+(n===S.ep?" selected":"")+'>'+esc(t("adm_ep_opt",n))+(d.vids[n]?" ✓":"")+"</option>";
 var h='<div class="acard" id="admbox"><b>'+t("adm_ctrl")+'</b><p class="note" style="padding:6px 0">'+(S.ep?t("adm_ep_sel",S.ep):t("adm_ep_none"))+"</p>"+
 '<label class="note" style="display:block;padding:4px 0 0" for="admep">'+t("adm_ep_pick")+'</label><select class="in" id="admep" data-c="admep" style="margin:6px 0;width:100%"><option value=""'+(S.ep?"":" selected")+' disabled>'+esc(t("adm_ep_none"))+"</option>"+ob+"</select>";
 if(S.ep){
  h+='<label class="note" style="display:block;padding:4px 0 0" for="epurl">'+t("adm_vurl_lbl",S.ep)+'</label><input class="in" id="epurl" type="url" inputmode="url" autocomplete="off" placeholder="'+esc(t("ph_video_url"))+'" value="'+esc(/^https?:/i.test(d.vids[S.ep]||"")?d.vids[S.ep]:"")+'" style="margin:6px 0;width:100%">'+pickBtn("epurl","vid",1,t("adm_pick_vid"))+'<button class="chip on" data-a="setepurl">'+t("adm_vurl_btn")+'</button> '}
 h+='<label class="note" style="display:block;padding:10px 0 0" for="cvurl">'+t("adm_curl_lbl")+'</label><input class="in" id="cvurl" type="url" inputmode="url" autocomplete="off" placeholder="'+esc(t("ph_cover_url"))+'" value="'+esc(/^https?:/i.test(d.cp||"")?d.cp:"")+'" style="margin:6px 0;width:100%">'+pickBtn("cvurl","img",1)+'<button class="chip" data-a="setcvurl">'+t("adm_curl_btn")+'</button> '+
 (S.ep&&d.vids[S.ep]?'<button class="chip" style="color:var(--coral)" data-a="delep">'+t("adm_delep",S.ep)+"</button>":"")+
 '<div id="upst"></div>'+
 '<label class="note" style="display:block;padding:12px 0 0" for="neps">'+t("eps_edit_h")+'</label><div style="display:flex;gap:8px;margin-top:6px;align-items:center"><input class="in" id="neps" type="number" min="1" max="200" value="'+d.eps+'" placeholder="'+esc(t("ph_eps"))+'" style="margin:0;width:50%"><button class="chip on" data-a="seteps">'+t("eps_edit_btn")+'</button></div><p class="note" style="padding:4px 0 0">'+t("eps_edit_hint")+'</p>'+
 '<div style="display:flex;gap:8px;margin-top:12px"><input class="in" id="pp" type="number" min="0" value="'+d.price+'" placeholder="'+esc(t("pp_ph"))+'" style="margin:0;width:50%"><input class="in" id="pf" type="number" min="0" value="'+d.free+'" placeholder="'+esc(t("pf_ph"))+'" style="margin:0;width:50%"></div>'+
 '<p class="note" style="padding:4px 0 8px">'+t("price_hint")+'</p>'+
 (S.noExt?"":'<div style="margin:0 0 10px"><button class="chip'+(d.hot?" on":"")+'" data-a="sethot">'+t(d.hot?"hot_on":"hot_off")+'</button></div>')+
 '<button class="chip on" data-a="setprice">'+t("save_price")+'</button> <button class="chip" style="color:var(--coral)" data-a="deldrama">'+t("del_drama")+"</button></div>";
 return h}
/* v26: Admin ထိန်းချုပ်ခန်းကိုပဲ ပြန်ဆွဲ (Player/Sheet မထိ) + အပိုင်းစာရင်းမှာ ရွေးထားတာ/ဗီဒီယိုရှိတာ အမှတ်အသား update */
function refAdm(d){
 var b=$("#admbox");if(!b||!d)return;
 b.outerHTML=admBox(d,isAdm()&&S.live);
 var g=document.querySelector("#sb .eps");
 if(g)Array.prototype.forEach.call(g.children,function(c){var n=+c.getAttribute("data-v");c.classList.toggle("cur",n===S.ep);c.classList.toggle("has",!!d.vids[n])});
 admFill(d)}
/* v26: ဇာတ်လမ်း၏ စုစုပေါင်းအပိုင်းအရေအတွက် ပြင်/လျှော့ – ပိုနေတဲ့ episodes row (+ Storage ဖိုင်) ကို အလိုအလျောက်ဖျက် */
async function setEps(d,v,btn){
 var n=parseInt(v,10);
 if(!d||!Number.isFinite(n)||n<1||n>200){toast(t("eps_bad"));return}
 var old=d.eps;
 if(n===old){toast(t("eps_same"));return}
 var cut=n<old?Object.keys(d.vids).filter(function(k){return+k>n}):[];
 if(n<old&&!confirm(t("eps_cut_q",old,n,n+1,cut.length)))return;
 if(btn)btn.disabled=true;
 try{
  var paths=[];
  if(n<old){
   paths=(await Promise.all(cut.map(function(k){return oldPath(d,k)}))).filter(Boolean);
   var dr=await SB.from("episodes").delete().eq("drama_id",d.id).gt("n",n);
   if(dr.error){toast(t("del_fail",dr.error.message));return}}
  var r=await SB.from("dramas").update({eps:n}).eq("id",d.id);
  if(r.error){toast(t("failed",r.error.message));try{await loadDr()}catch(e){}return}
  if(paths.length)await rmFiles(paths);
  cut.forEach(function(k){delete d.vids[k];delete VC[vkey(d,k)]});
  if(S.ep>n)S.ep=0;
  var wasOpen=sheetOpen(),sid=String(d.id);
  await loadDr();if(S.dash){try{await loadAdmin()}catch(e){}}
  render();if(wasOpen&&find(sid)){S.sel=sid;sheet()}
  toast(n<old?t("eps_saved_cut",n,old-n):t("eps_saved",n))
 }catch(e){toast(t("failed",e&&e.message||e))}
 finally{if(btn)btn.disabled=false}}
/* v25: video_path ကို ဇာတ်လမ်းစာရင်းနဲ့အတူ မဆွဲတော့ (Coin ပေးရမယ့် အပိုင်း URL ပေါ်မနေအောင် + payload ပေါ့စေအောင်)
   d.vids[n] = 1 (ဗီဒီယိုရှိကြောင်း marker) – URL အစစ်ကို ဖွင့်မယ့်အချိန် get_episode_video() RPC ကနေ ယူ။
   supabase-v25 SQL မ Run ရသေးရင် episodes ဇယားကို တိုက်ရိုက်ဖတ်တဲ့ နည်းအဟောင်းနဲ့ အလိုအလျောက် အလုပ်လုပ် */
var VC={};
function vkey(d,n){return d.id+"_"+n}
function cfgVid(d,n){return (C.videos||{})[vkey(d,n)]||null}
async function epUrl(d,n){
 var k=vkey(d,n);
 if(VC[k])return VC[k];
 var p=d.vids[n],path=null;
 if(typeof p==="string"&&p.length>1)path=p;
 else if(SB&&S.live&&p){
  var r=await SB.rpc("get_episode_video",{p_drama:+d.id,p_n:+n});
  if(r.error){
   var m=String(r.error.message||"");
   if(r.error.code==="PGRST202"||/could not find the function|schema cache/i.test(m)){
    var q=await SB.from("episodes").select("video_path").eq("drama_id",d.id).eq("n",n).maybeSingle();
    if(q.error)return{url:null,path:null,error:q.error.message};
    path=q.data&&q.data.video_path||null
   }else return{url:null,path:null,error:m,locked:/locked/i.test(m)}
  }else path=r.data||null
 }
 var u=path?(/^https?:/i.test(path)?path:(SB?pubUrl(path):null)):cfgVid(d,n);
 var o={url:u||null,path:path};
 if(u)VC[k]=o;
 return o}
var SPD=[0.75,1,1.25,1.5,2];
function spdBar(){return'<div id="pc" class="chips" style="padding:10px 0 0;display:none">'+SPD.map(function(s){return'<button class="chip '+(S.spd===s?"on":"")+'" data-a="speed" data-v="'+s+'">'+s+'x</button>'}).join("")+'<button class="chip" data-a="full">'+t("immersive")+'</button></div>'}
function applySpd(){var v=document.querySelector("#pl video");if(v)v.playbackRate=S.spd;var fb=$("#fsspd");if(fb)fb.textContent=spdTxt(S.spd);var pc=$("#pc");if(pc){var b=pc.querySelectorAll("[data-a=speed]");for(var i=0;i<b.length;i++)b[i].className="chip"+(+b[i].getAttribute("data-v")===S.spd?" on":"")}}
function isStandalone(){return window.matchMedia&&matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}
function isIOS(){return/iphone|ipad|ipod/i.test(navigator.userAgent)}
function installBar(){
 if(!S.me||isStandalone())return"";
 if(S.inst)return'<button class="btn" style="margin-top:0" data-a="install">'+t("set_install_btn")+"</button>";
 if(isIOS())return note(t("ios_note"));
 return""}
/* ===== v27: Watch history (နောက်ဆုံးကြည့်ခဲ့တဲ့ အပိုင်း + စက္ကန့်) ===== */
function wKey(id,u){return"zw:"+(u||(S.me?S.me.id:"x"))+":"+id}
function wGet(id){var ks=[wKey(id)];if(S.me)ks.push(wKey(id,"x"));
 for(var i=0;i<ks.length;i++){try{var o=JSON.parse(localStorage.getItem(ks[i]));if(o&&o.n>0)return o}catch(e){}}return null}
function wSet(id,n,tm){try{localStorage.setItem(wKey(id),JSON.stringify({n:n,t:Math.max(0,Math.floor(tm||0)),u:Date.now()}))}catch(e){}}
function autoStart(){
 var d=find(S.sel);if(!d||!(d.eps>0))return;
 var w=wGet(d.id),n=1,tm=0;
 if(w&&w.n>=1&&w.n<=d.eps){n=w.n;tm=w.t||0}
 /* Coin နှုတ်ရမယ့် (Lock) အပိုင်းကို အလိုအလျောက် မဖွင့် – အပိုင်း ၁ ကိုပဲ ပြန်ကြည့် */
 if(locked(d,n)){if(n!==1&&!locked(d,1)){n=1;tm=0}else return}
 S.rsm={id:d.id,n:n,t:tm};
 playEp(n)}
function showVideo(d,n,u){
 var pl=$("#pl");
 var pc=$("#pc");if(pc)pc.style.display=u?"flex":"none";
 if(!u){pl.className="player";pl.innerHTML='<div><div style="font-size:40px">⏸</div><b>'+t("ep_title",n)+'</b><div class="sub" style="margin-top:6px">'+t("no_video")+'</div></div>';return}
 pl.className="player v"+(S.fs?(S.fsDir<0?" fsdn":" fsup"):"");S.fsDir=0;pl.innerHTML="";
 var v=document.createElement("video");v.controls=!S.fs;v.playsInline=true;v.setAttribute("playsinline","");v.preload=S.fs?"auto":"metadata";v.src=u;
 v.onerror=function(){toast(t("vid_fail"))};
 v.addEventListener("loadedmetadata",function(){v.playbackRate=S.spd;if(S.fs&&v.videoWidth&&v.videoHeight)v.style.objectFit=v.videoWidth/v.videoHeight<.8?"cover":"contain"});
 v.addEventListener("timeupdate",function(){if(!v.isConnected)return;var f=document.getElementById("fsfill");if(f&&v.duration)f.style.width=(v.currentTime/v.duration*100)+"%"});
 v.addEventListener("play",function(){var p=document.getElementById("fsplay");if(p&&v.isConnected)p.className="fsplay"});
 v.addEventListener("pause",function(){var p=document.getElementById("fsplay");if(p&&v.isConnected&&!v.ended&&S.fs)p.className="fsplay show"});
 v.onended=function(){var nx=n+1;if(nx<=d.eps&&d.vids[nx]&&!locked(d,nx)){toast(t("next_auto",nx));playEp(nx)}};
 var rt=0;if(S.rsm&&S.rsm.id===d.id&&S.rsm.n===n){rt=S.rsm.t||0;S.rsm=null}
 var wok=!(rt>1),wlast=0;
 v.addEventListener("loadedmetadata",function(){
  if(rt>1&&isFinite(v.duration)&&rt<v.duration-3){try{v.currentTime=rt}catch(e){}}
  wok=true});
 v.addEventListener("timeupdate",function(){if(!wok||!v.currentTime)return;var now=Date.now();if(now-wlast>3000){wlast=now;wSet(d.id,n,v.currentTime)}});
 v.addEventListener("pause",function(){if(wok&&v.currentTime&&!v.ended)wSet(d.id,n,v.currentTime)});
 v.addEventListener("ended",function(){wSet(d.id,n,0)});
 pl.appendChild(v);v.playbackRate=S.spd;var p=v.play();
 /* autoplay ကို browser က တားရင် Play အိုင်ကွန်ပြ – မဟုတ်ရင် မျက်နှာပြင်မဲနေပြီး ဘာလုပ်ရမှန်းမသိ */
 if(p&&p.catch)p.catch(function(){var fp=document.getElementById("fsplay");if(fp&&S.fs&&v.isConnected&&v.paused)fp.className="fsplay show"});
 if(SB&&S.live&&S.me&&!viewSeen(d.id,n)){var viewSent=false,played=0,last=null;
  v.addEventListener("seeking",function(){last=null});
  v.addEventListener("timeupdate",function(){
   if(viewSent)return;
   var c=v.currentTime;
   /* တကယ်ကြည့်တဲ့ playback စက္ကန့်ကိုပဲ ပေါင်းမယ် (ရှေ့ကို ဆွဲကျော်ရုံနဲ့ မရေတွက်) */
   if(last!==null&&!v.paused&&c>last&&c-last<1.5)played+=c-last;
   last=c;
   if(played>=30){viewSent=true;SB.rpc("record_episode_view",{p_drama:d.id,p_n:n}).then(function(r){if(r.error){console.warn("view count:",r.error.message);return}viewMark(d.id,n);SB.rpc("log_drama_view",{p_drama:d.id,p_n:n}).then(function(){},function(){})},function(){})}})}}
/* ===== v28: TikTok Creator လျှောက်လွှာ – လင့်ခ်ကို message ထဲ "TikTok: <url> | Note: <note>" ပုံစံနဲ့ သိမ်း (SQL/RLS မပြောင်း) ===== */
function ttNorm(u){u=String(u||"").trim();if(/^(www\.|m\.|vm\.|vt\.)?tiktok\.com\//i.test(u))u="https://"+u;
 return /^https:\/\/([a-z0-9-]+\.)*tiktok\.com\/[^\s"'<>]+$/i.test(u)&&u.length<=250?u:""}
function ttParse(m){var x=/^TikTok:\s*(\S+)(?:\s*\|\s*Note:\s*([\s\S]*))?$/.exec(String(m||"").trim());
 if(!x)return{url:"",note:String(m||"")};return{url:ttNorm(x[1]),raw:x[1],note:(x[2]||"").trim()}}
/* ===== v29: ပုံသေ Coin ဈေး၊ Genre Dropdown၊ Synopsis၊ Cover Preview၊ Hot flag ===== */
var FIXED_PRICE=30;
var GENRES=[["အချစ်","Romance"],["ဟာသ","Comedy"],["အက်ရှင်","Action"],["ဒရာမာ","Drama"],["သဘာဝလွန်","Supernatural"],["AI ဇာတ်လမ်း","AI Story"],["ထိတ်လန့်ဖွယ်","Horror"]];
function genreSel(id){return'<select class="in" id="'+id+'"><option value="" selected>'+esc(t("pick_genre"))+'</option>'+GENRES.map(function(g){return'<option value="'+esc(g[0])+'">'+esc(S.lang==="en"?g[1]:g[0])+'</option>'}).join("")+'</select>'}
function covPrevBox(id){return'<div class="covpv" id="pv_'+id+'"></div>'}
function covPrev(id,u){var b=document.getElementById("pv_"+id);if(!b)return;u=String(u||"").trim();
 if(!u||!(/^blob:/i.test(u)||okUrl(u))){b.innerHTML="";return}
 b.innerHTML='<img alt="" src="'+esc(u)+'"><div class="note">'+esc(t("cov_preview"))+'</div>';
 var im=b.querySelector("img");if(im)im.onerror=function(){b.innerHTML='<div class="note">'+esc(t("cov_bad"))+'</div>'}}
async function insDrama(row){
 var r=await SB.from("dramas").insert(row).select("id").single();
 if(r.error&&("description" in row||"is_hot" in row)&&/description|is_hot|column|schema cache/i.test(r.error.message||"")){
  var r2={};for(var k in row)if(k!=="description"&&k!=="is_hot")r2[k]=row[k];
  var q=await SB.from("dramas").insert(r2).select("id").single();
  if(!q.error){S.noExt=true;q.dropped=true}
  return q}
 return r}
function upName(d,a){
 var nm=function(p){if(!p)return"";var n=String(p.name||"").trim(),e=String(p.email||"").trim();return n&&e&&n!==e?n+" · "+e:(n||e)};
 var L=(a&&a.list)||[];
 if(d.o){var u=L.filter(function(q){return q.id===d.o})[0];return nm(u)||nm(S.cc[d.o])||String(d.o).slice(0,8)}
 var ad=L.filter(function(q){return q.is_admin})[0],x=nm(ad)||(typeof ADMIN_EMAIL==="string"?ADMIN_EMAIL:"");
 return t("uploader_admin")+(x?" ("+x+")":"")}
function viewKey(id,n){return"zv:"+(S.me?S.me.id:"x")+":"+id+":"+n}
function viewSeen(id,n){try{var x=parseInt(localStorage.getItem(viewKey(id,n)),10);return!!x&&Date.now()-x<864e5}catch(e){return false}}
function viewMark(id,n){try{localStorage.setItem(viewKey(id,n),String(Date.now()))}catch(e){}}
showVideo.c={};
async function playEp(n,ok){var go=S.fsReq;S.fsReq=false;
 var d=find(S.sel);if(!d)return;
 var hasEp=!!d.vids[n];
 if(locked(d,n)){
  if(!SB||!S.live){toast(t("need_backend"));return}
  if(!S.me){toast(t("need_login"));closeSheet();S.tab="me";render();return}
  /* v25: ဗီဒီယိုမတင်ရသေးတဲ့ အပိုင်းအတွက် Coin မနှုတ် */
  if(!hasEp){S.ep=n;if(go)S.fs=true;sheet();showVideo(d,n,null);return}
  /* v30: Coin မဖြတ်ခင် အတည်ပြုချက် အရင်မေး – "ဖွင့်ကြည့်မည်" နှိပ်မှ ဆက်လုပ် */
  if(!ok){if((+S.me.coins||0)<(+d.price||FIXED_PRICE)){toast(t("no_coin",d.price));return}ucmShow(d,n,go);return}
  var before=+S.me.coins||0;
  var r=await SB.rpc("unlock_episode",{p_drama:d.id,p_n:n});
  if(r.error){toast(/enough/i.test(r.error.message)?t("no_coin",d.price):t("unlock_fail"));return}
  S.un[d.id+"_"+n]=1;
  if(typeof r.data==="number"){S.me.coins=r.data;updTop();if(r.data<before)toast(t("unlocked",before-r.data))}}
 S.ep=n;if(go)S.fs=true;sheet();
 var u=cfgVid(d,n);
 if(hasEp){
  var pl=$("#pl");if(pl&&!VC[vkey(d,n)]){pl.className="player";pl.innerHTML='<div class="sub">⏳ '+t("vip_loading")+"</div>"}
  var info=await epUrl(d,n);
  /* ဗီဒီယို URL ယူနေတုန်း Episode ပြောင်း / Sheet ပိတ်သွားရင် မဖွင့်တော့ */
  if(S.ep!==n||find(S.sel)!==d||!sheetOpen())return;
  if(info.error){toast(info.locked?t("fs_lock",n):t("failed",info.error));showVideo(d,n,null);return}
  u=info.url||u}
 showVideo(d,n,u)}
function closeSheet(){S.fs=false;S.fsReq=false;S.rsm=null;csClose();$("#sheet").className="sheet";var v=document.querySelector("#pl video");if(v)v.pause();navSync()}

/* ---------- storage helpers ---------- */
function upl(path,f,cb){
 return new Promise(async function(res){
  try{
   var s=await SB.auth.getSession(),tk=s.data&&s.data.session&&s.data.session.access_token;
   if(!tk){res({error:{message:t("relogin")}});return}
   var fd=new FormData();fd.append("cacheControl","3600");fd.append("",f);
   var x=new XMLHttpRequest();
   x.open("POST",C.SUPABASE_URL+"/storage/v1/object/"+BUCKET+"/"+path.split("/").map(encodeURIComponent).join("/"));
   x.setRequestHeader("Authorization","Bearer "+tk);x.setRequestHeader("apikey",S.key||C.SUPABASE_KEY);x.setRequestHeader("x-upsert","false");
   x.upload.onprogress=function(e){if(e.lengthComputable&&cb)cb(Math.round(e.loaded*100/e.total))};
   x.onload=function(){if(x.status>=200&&x.status<300)res({});else{var m="";try{var j=JSON.parse(x.responseText);m=j.message||j.error||""}catch(e){}res({error:{message:(m||("HTTP "+x.status))+(/bucket|not found/i.test(m)?t("err_bucket"):"")+(/row-level|policy|unauthorized|permission/i.test(m)?t("err_policy"):"")}})}};
   x.onerror=function(){res({error:{message:t("net_lost")}})};
   x.send(fd)
  }catch(e){res({error:{message:e.message||String(e)}})}
 })}
function shrink(f){
 return new Promise(function(res){
  try{
   var im=new Image(),u=URL.createObjectURL(f);
   im.onload=function(){var m=1200,w=im.width,h=im.height,k=Math.min(1,m/Math.max(w,h)),c=document.createElement("canvas");c.width=Math.round(w*k);c.height=Math.round(h*k);c.getContext("2d").drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);c.toBlob(function(b){res(b||f)},"image/jpeg",.86)};
   im.onerror=function(){URL.revokeObjectURL(u);res(f)};
   im.src=u
  }catch(e){res(f)}})}
/* v25: Storage path (အဟောင်း) ကို ဖျက်ဖို့ လက်ရှိ path ကို ယူ – marker (1) ဆိုရင် RPC ကနေ ယူ (Admin သာ) */
async function saveEpisode(did,n,path){
 var r=await SB.rpc("admin_set_episode_video",{p_drama:+did,p_n:+n,p_video_path:path});
 if(r.error&&(r.error.code==="PGRST202"||/could not find the function|schema cache/i.test(r.error.message||"")))r=await SB.from("episodes").upsert({drama_id:did,n:n,video_path:path});
 return r}
async function oldPath(d,n){var p=d.vids[n];if(!p)return null;if(typeof p==="string"&&p.length>1)return p;try{var r=await epUrl(d,n);return r&&r.path||null}catch(e){return null}}
function admFill(d){var n=S.ep;if(!n||!isAdm()||!S.live||!d.vids[n]||typeof d.vids[n]==="string")return;
 epUrl(d,n).then(function(r){var i=$("#epurl");if(i&&S.ep===n&&!i.value&&r&&r.path&&/^https?:/i.test(r.path))i.value=r.path},function(){})}
async function rmFiles(paths){
 var l=(paths||[]).filter(function(p){return typeof p==="string"&&p.length>1&&!/^https?:/i.test(p)});
 if(!l.length||!SB)return;
 try{await SB.storage.from(BUCKET).remove(l)}catch(e){}}
function syncList(id,add){
 if(!SB||!S.me||!S.live||!/^\d+$/.test(id))return;
 var q=add?SB.from("my_list").insert({user_id:S.me.id,drama_id:+id}):SB.from("my_list").delete().eq("user_id",S.me.id).eq("drama_id",+id);
 q.then(function(){},function(){})}
function vidExt(f){return((f.name.split(".").pop()||"mp4").toLowerCase().replace(/[^a-z0-9]/g,""))||"mp4"}
/* ---------- backend ---------- */
async function loadDr(){
 if(!SB)return;
 var base="id,title,genre,eps,color_a,color_b,views,cover_path,price,free_eps,owner_id,episodes(n)";
 var V=[[1,1],[1,0],[0,1],[0,0]],r;
 for(var vi=0;vi<V.length;vi++){
  r=await SB.from("dramas").select(base+(V[vi][0]?",description,is_hot":"")+(V[vi][1]?",likes_count,comments_count":"")).order("id");
  if(!r.error){S.noExt=!V[vi][0];S.noSoc=!V[vi][1];break}
  if(!/likes_count|comments_count|description|is_hot|column/i.test(r.error.message||""))break}
 S.err=r.error?r.error.message:"";
 if(r.error||!r.data||!r.data.length){S.dr=SAMPLE;S.live=false;return}
 S.live=true;
 S.dr=r.data.map(function(x){var v={};(x.episodes||[]).forEach(function(e){v[e.n]=1});return{id:x.id,t:x.title,g:x.genre||"",eps:x.eps,a:x.color_a,b:x.color_b,v:x.views||0,vids:v,cp:x.cover_path||null,cover:x.cover_path?pubUrl(x.cover_path):null,price:x.price==null?30:x.price,free:x.free_eps==null?10:x.free_eps,o:x.owner_id||null,desc:x.description||"",hot:!!x.is_hot,lk:+x.likes_count||0,cm:+x.comments_count||0}});
 loadWeekly();
 loadCC(S.dr.map(function(d){return d.o})).then(function(){var b=$("#by"),d=find(S.sel);if(b&&d)b.innerHTML=byHtml(d)})}
async function setUser(ses){
 VC={}; /* user ပြောင်း/logout လုပ်ရင် မှတ်ထားတဲ့ ဗီဒီယို URL cache ရှင်း */
 if(!ses){S.me=null;S.un={};render();return}
 var em=String(ses.user.email||""),isAd=em.toLowerCase()===ADMIN_EMAIL;
 var meta=ses.user.user_metadata||{},nm=meta.name||meta.full_name||em;
 /* profile ယူမရလည်း signOut မလုပ်ဘူး – fallback profile နဲ့ တန်းဝင်ခွင့်ပေးမယ် */
 S.me={id:ses.user.id,coins:0,streak:0,name:nm,email:em,is_admin:isAd};
 render();
 try{
  var q=function(){return SB.from("profiles").select("*").eq("id",ses.user.id).maybeSingle()};
  var r=await q();
  if(!r.data){try{await SB.rpc("ensure_profile")}catch(e){}r=await q()}
  if(r.data&&isAd&&!r.data.is_admin){try{await SB.rpc("ensure_profile")}catch(e){}r=await q()}
  if(r.data)S.me=r.data;
 }catch(e){}
 S.me.email=em;if(isAd)S.me.is_admin=true;
 try{var u=await SB.from("unlocked_episodes").select("drama_id,n");S.un={};
 ((u&&u.data)||[]).forEach(function(x){S.un[x.drama_id+"_"+x.n]=1})}catch(e){}
 try{
  var ml=await SB.from("my_list").select("drama_id"),sv=((ml&&ml.data)||[]).map(function(x){return String(x.drama_id)});
  var lo=S.list.filter(function(id){return/^\d+$/.test(id)&&sv.indexOf(id)<0});
  if(lo.length&&S.live)await SB.from("my_list").insert(lo.map(function(id){return{user_id:ses.user.id,drama_id:+id}}));
  var all=S.list.concat(sv).filter(function(x,i,ar){return ar.indexOf(x)===i});S.list=all;save()
 }catch(e){}
 if(S.dash&&S.me.is_admin){try{await loadAdmin()}catch(e){}}
 render()}
async function copyTxt(txt){
 try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(txt);return true}}catch(e){}
 try{
  var ta=document.createElement("textarea");ta.value=txt;ta.setAttribute("readonly","");
  ta.style.cssText="position:fixed;top:0;left:0;opacity:0";document.body.appendChild(ta);
  ta.select();ta.setSelectionRange(0,txt.length);
  var ok=document.execCommand("copy");document.body.removeChild(ta);return!!ok
 }catch(e){return false}}
function deepOpen(){
 var v=BOOT.qs.get("d");if(!v||deepOpen.done)return;deepOpen.done=1;
 var d=find(v);if(d)ACT.open(String(d.id))}
function cleanUrl(){try{history.replaceState(history.state,"",location.pathname)}catch(e){}}
async function initAuth(){
 if(!SB)return;
 var qs=BOOT.qs,hs=BOOT.hs;
 var oerr=qs.get("error_description")||hs.get("error_description")||qs.get("error")||hs.get("error");
 var back=false;try{back=sessionStorage.getItem("zoauth")==="1"}catch(e){}
 var ses=null;
 try{var s=await SB.auth.getSession();ses=s.data&&s.data.session}catch(e){}
 /* library က URL ထဲက #access_token / ?code ကို မဖမ်းမိရင် ကိုယ်တိုင် ချက်ချင်းဖမ်းမယ် */
 if(!ses){
  var code=qs.get("code"),at=hs.get("access_token"),rt=hs.get("refresh_token");
  try{
   if(at&&rt){var y=await SB.auth.setSession({access_token:at,refresh_token:rt});if(y.error)throw y.error;ses=y.data&&y.data.session}
   else if(code){var x=await SB.auth.exchangeCodeForSession(code);if(x.error)throw x.error;ses=x.data&&x.data.session}
  }catch(e){oerr=oerr||e.message}
 }
 if(BOOT.search.indexOf("code=")>-1||BOOT.search.indexOf("error")>-1||BOOT.hash.indexOf("access_token")>-1||BOOT.hash.indexOf("error")>-1)cleanUrl();
 try{sessionStorage.removeItem("zoauth")}catch(e){}
 /* Gmail ထဲက Reset Link ကို နှိပ်ပြီးပြန်လာရင် Password အသစ်ပေးတဲ့ form ပြမယ် */
 if(ses&&hs.get("type")==="recovery"){S.recov=true;S.tab="me"}
 if(ses){S.tab=(back||S.recov)?"me":S.tab;await setUser(ses);if(back&&!S.recov){S.tab="me";render();toast(t("google_ok"))}}
 else{
  await setUser(null);
  if(oerr||back){S.tab="me";render();fail(t("google_fail",oerr||t("no_ses")))}
 }
 SB.auth.onAuthStateChange(function(ev,s2){
  if(ev==="SIGNED_OUT"){setTimeout(function(){setUser(null)},0);return}
  if(S.fp)return; /* Forgot Password လုပ်နေစဉ် UI ကို မနှောင့်ယှက် */
  if(ev==="PASSWORD_RECOVERY"&&s2){S.recov=true;S.tab="me";setTimeout(function(){setUser(s2)},0);return}
  if(ev==="INITIAL_SESSION"||!s2)return;
  if((ev==="TOKEN_REFRESHED"||ev==="SIGNED_IN"||ev==="USER_UPDATED")&&S.me&&S.me.id===s2.user.id)return;
  setTimeout(function(){setUser(s2)},0)})}

/* ----- forgot password helpers ----- */
function mailRedirect(){return location.origin+location.pathname.replace(/index\.html$/,"")}
async function sendCode(em,btn){
 if(btn)btn.disabled=true;
 try{
  var r=await SB.auth.signInWithOtp({email:em,options:{shouldCreateUser:false}});
  if(r.error){fail(/signups? not allowed|not found|no user/i.test(r.error.message)?t("fp_noacct"):r.error.message);return false}
  clrErr();S.fp={step:2,email:em,next:Date.now()+60000};render();toast(t("fp_send_ok"));return true
 }catch(e){fail(e&&e.message||e);return false}
 finally{if(btn)btn.disabled=false}}
function pwCheck(){
 var pw=($("#fn")||{}).value||"",cf=($("#fn2")||{}).value||"";
 if(pw.length<6){toast(t("pw_short"));return null}
 if(pw!==cf){toast(t("pw_mismatch"));return null}
 return pw}
async function afterPwChange(){
 S.fp=null;S.recov=false;S.mode="login";S.tab="me";clrErr();
 var s=await SB.auth.getSession();
 await setUser(s.data&&s.data.session);toast(t("fp_done"))}

var ACT={
 tab:function(v){S.tab=v;render();window.scrollTo(0,0)},
 rank:function(v){S.rank=v;render()},
 open:function(v){S.sel=v;S.ep=0;S.fs=false;S.rsm=null;sheet();autoStart()},
 ep:function(v){csClose();S.fsReq=true;playEp(+v)},
 close:closeSheet,
 like:async function(){
  var d=find(S.sel);if(!d||!S.soc)return;
  if(!S.me){toast(t("need_login"));return}
  if(S.soc.busy)return;S.soc.busy=true;
  var r=await SB.rpc("toggle_video_like",{p_video_id:+d.id});S.soc.busy=false;
  if(r.error){toast(/function|schema/i.test(r.error.message)?t("cm_need_sql"):r.error.message);return}
  var x=r.data||{};S.soc.liked=!!x.liked;d.lk=+x.likes_count||0;socRefBar()},
 cmts:function(){
  var d=find(S.sel);if(!d||!S.soc)return;
  S.soc.open=true;
  $("#cpanel").innerHTML=socBox(d,S.soc);$("#csheet").className="csheet open";
  if(S.soc.list==null)socLoad(d)},
 cclose:function(){csClose()},
 cshade:function(v,e2,e){if(e.target===e2)csClose()},
 cmsend:async function(v,el){
  var d=find(S.sel),i=$("#cmin");if(!d||!S.soc||!i)return;
  if(!S.me){toast(t("need_login"));return}
  var txt=(i.value||"").trim();if(!txt){toast(t("cm_empty"));return}
  if(txt.length>500)txt=txt.slice(0,500);
  if(el)el.disabled=true;
  var r=await SB.from("video_comments").insert({video_id:+d.id,user_id:S.me.id,content:txt}).select("id,user_id,user_name,user_avatar,content,created_at").single();
  if(el)el.disabled=false;
  if(r.error){var em=String(r.error.message||"");toast(/too (fast|many)/i.test(em)?"မှတ်ချက် မြန်လွန်းနေပါတယ် – ခဏစောင့်ပြီး ထပ်ရေးပါ":/relation|schema|does not exist/i.test(em)?t("cm_need_sql"):em);return}
  if(!S.soc||S.soc.id!==d.id)return;
  i.value="";S.soc.list=[r.data].concat(S.soc.list||[]);d.cm=(d.cm||0)+1;socRefList();socRefBar();var cl=$("#clist");if(cl)cl.scrollTop=0},
 cmdel:async function(v){
  var d=find(S.sel);if(!d||!S.soc||!confirm(t("cm_del_ask")))return;
  var r=await SB.from("video_comments").delete().eq("id",+v).select("id");
  if(r.error){toast(r.error.message);return}
  if(!r.data||!r.data.length){toast(t("cm_del_fail"));return}
  if(!S.soc||S.soc.id!==d.id)return;
  S.soc.list=(S.soc.list||[]).filter(function(c){return String(c.id)!==String(v)});d.cm=Math.max(0,(d.cm||0)-1);socRefList();socRefBar()},

 shade:function(v,e2,e){if(e.target===e2)closeSheet()},
 lang:function(v){if(v!=="my"&&v!=="en")return;S.lang=v;try{localStorage.setItem("zlang",v)}catch(e){}document.documentElement.lang=v;render()},
 install:async function(){var p=S.inst;if(!p){ACT.guide();return}try{p.prompt();await p.userChoice}catch(e){}S.inst=null;render()},
 guide:function(){
  var ios=isIOS(),a=t("guide_android"),i=t("guide_ios"),pc=t("guide_pc");
  $("#sb").innerHTML=backbar()+"<h2>"+t("guide_title")+'</h2><div class="note" style="padding:12px 0 4px">'+(ios?i+"</div><div class=\"note\" style=\"padding:8px 0 4px\">"+a:a+"</div><div class=\"note\" style=\"padding:8px 0 4px\">"+i)+'</div><div class="note" style="padding:8px 0 12px">'+pc+'</div><button class="btn" style="margin:0;width:100%" data-a="close">'+t("close")+"</button>";
  $("#sheet").className="sheet open";navSync()},
 clearcache:async function(){
  try{if(window.caches){var k=await caches.keys();await Promise.all(k.map(function(x){return caches.delete(x)}))}}catch(e){}
  try{if(navigator.serviceWorker){var rs=await navigator.serviceWorker.getRegistrations();await Promise.all(rs.map(function(r){return r.unregister()}))}}catch(e){}
  try{sessionStorage.removeItem("sw_cleaned")}catch(e){}
  toast(t("set_cleared"));
  setTimeout(function(){location.replace(location.pathname+"?r="+Date.now())},800)},
 fsback:function(){var v=fsVid();if(v)v.pause();S.fs=false;S.fsReq=false;csClose();sheet()},
 fsspd:function(){var L=[1,1.25,1.5,2],i=L.indexOf(S.spd);S.spd=L[(i+1)%L.length];try{localStorage.setItem("zsp",String(S.spd))}catch(e){}applySpd()},
 fseps:function(){
  var d=find(S.sel);if(!d)return;
  var e="";for(var n=1;n<=d.eps;n++){var lk=locked(d,n);e+='<div class="ep'+(lk?" lock":"")+(n===S.ep?" cur":"")+(d.vids[n]?" has":"")+'" data-a="ep" data-v="'+n+'">'+(lk?"🔒":"")+n+"</div>"}
  $("#cpanel").innerHTML='<div class="chd"><b>☰ '+t("fs_eps")+'</b><button class="cclose" data-a="cclose" aria-label="'+esc(t("close"))+'">✕</button></div><div id="eplist" style="flex:1;min-height:0;overflow-y:auto"><div class="eps">'+e+"</div></div>";
  $("#csheet").className="csheet open"},
 speed:function(v){S.spd=parseFloat(v)||1;try{localStorage.setItem("zsp",String(S.spd))}catch(e){}applySpd()},
 full:function(){var v=document.querySelector("#pl video");if(!v)return;var f=v.requestFullscreen||v.webkitRequestFullscreen;if(f)try{f.call(v)}catch(e){}else if(v.webkitEnterFullscreen)try{v.webkitEnterFullscreen()}catch(e){}},
 save:function(){var id=String(S.sel),i=S.list.indexOf(id);if(i>-1)S.list.splice(i,1);else S.list.push(id);save();syncList(id,i<=-1);toast(i>-1?t("removed"):t("saved"));socRefBar();if(S.tab==="list")render()},
 share:async function(){
  var d=find(S.sel);if(!d)return;
  var url=mailRedirect()+"?d="+encodeURIComponent(d.id);
  if(navigator.share){
   try{await navigator.share({title:d.t,text:d.t,url:url});return}
   catch(e){if(e&&e.name==="AbortError")return}}
  if(await copyTxt(url))toast(t("link_copied"));
  else window.prompt(t("share_lbl"),url)},
 mode:function(){S.mode=S.mode==="reg"?"login":"reg";S.fp=null;render()},
 forgot:function(){S.mode="forgot";S.fp={step:1,email:(($("#ae")||{}).value||"").trim().toLowerCase(),next:0};clrErr();render()},
 fpback:function(){S.mode="login";S.fp=null;clrErr();render()},
 fpedit:function(){S.fp={step:1,email:S.fp?S.fp.email:"",next:0};render()},
 fpsend:async function(v,btn){
  if(!SB){fail(t("backend_no"));return}
  var em=(($("#fe")||{}).value||"").trim().toLowerCase();
  if(!/^\S+@\S+\.\S+$/.test(em)){toast(t("bad_email"));return}
  await sendCode(em,btn)},
 fpresend:async function(v,btn){
  if(!SB||!S.fp)return;
  var w=Math.ceil((S.fp.next-Date.now())/1000);
  if(w>0){toast(t("fp_wait",w));return}
  await sendCode(S.fp.email,btn)},
 fpdone:async function(v,btn){
  if(!SB||!S.fp)return;
  var code=(($("#fc")||{}).value||"").replace(/\s/g,"");
  if(code.length<6){toast(t("bad_code"));return}
  var pw=pwCheck();if(!pw)return;
  if(btn)btn.disabled=true;
  try{
   var vr=await SB.auth.verifyOtp({email:S.fp.email,token:code,type:"email"});
   if(vr.error){fail(t("fp_invalid")+" ("+vr.error.message+")");return}
   var ur=await SB.auth.updateUser({password:pw});
   if(ur.error){fail(ur.error.message);return}
   await afterPwChange()
  }catch(e){fail(e&&e.message||e)}
  finally{if(btn)btn.disabled=false}},
 setnewpw:async function(v,btn){
  if(!SB)return;var pw=pwCheck();if(!pw)return;
  if(btn)btn.disabled=true;
  try{var ur=await SB.auth.updateUser({password:pw});if(ur.error){fail(ur.error.message);return}await afterPwChange()}
  catch(e){fail(e&&e.message||e)}
  finally{if(btn)btn.disabled=false}},
 cancelpw:function(){S.recov=false;render()},
 doauth:async function(){
  if(!SB){fail(t("backend_no"));return}
  var em=$("#ae").value.trim().toLowerCase(),pw=$("#ap").value,reg=S.mode==="reg";
  if(!em||pw.length<6){toast(t("email_pw_req"));return}
  var btn=document.querySelector('[data-a="doauth"]');if(btn)btn.disabled=true;
  try{
   var ses=null;
   if(reg){
    var r=await SB.auth.signUp({email:em,password:pw,options:{data:{name:($("#an").value||"").trim()}}});
    if(r.error){fail(r.error.message);return}
    ses=r.data&&r.data.session;
    /* session မပြန်လာရင် ချက်ချင်း signIn ဆက်ခေါ်မယ် */
    if(!ses){
     var r2=await SB.auth.signInWithPassword({email:em,password:pw});
     if(r2.error){fail(r2.error.message);return}
     ses=r2.data&&r2.data.session}
   }else{
    var r3=await SB.auth.signInWithPassword({email:em,password:pw});
    if(r3.error){fail(r3.error.message);return}
    ses=r3.data&&r3.data.session}
   if(!ses){fail(t("no_session"));return}
   clrErr();
   S.tab="me";await setUser(ses);toast(reg?t("reg_ok"):t("login_ok"));
  }catch(e){fail(e&&e.message||e)}
  finally{var bt=document.querySelector('[data-a="doauth"]');if(bt)bt.disabled=false}},
 google:async function(){
  if(!SB){toast(t("backend_no"));return}
  try{sessionStorage.setItem("zoauth","1")}catch(e){}
  var r=await SB.auth.signInWithOAuth({provider:"google",options:{redirectTo:mailRedirect(),queryParams:{prompt:"select_account"}}});
  if(r.error){try{sessionStorage.removeItem("zoauth")}catch(e){}fail(r.error.message)}},
 dash:async function(){S.dash=true;S.creatorDash=false;try{await loadAdmin()}catch(e){toast(t("dash_fail"))}render()},
 creatorDash:async function(){if(!S.me||!(S.me.is_vip||S.me.is_creator)){toast("Creator အကောင့် မရှိသေးပါ");return}S.dash=false;S.creatorDash=true;S.creatorFiles={};await loadCreator();render()},
 creatorBack:function(){S.creatorDash=false;render()},
 creatorSubmit:async function(v,btn){
  if(!SB||!S.me||!S.me.is_vip){toast("VIP Creator များသာ Video တင်နိုင်ပါတယ်");return}
  var title=($("#crtitle")||{}).value||"",genre=($("#crgenre")||{}).value||"",cover=(($("#crcover")||{}).value||"").trim(),video=(($("#crvideo")||{}).value||"").trim(),desc=(($("#crdesc")||{}).value||"").trim().slice(0,1000);
  if(!title.trim()||!video){toast("ဇာတ်လမ်းအမည်နဲ့ ပထမအပိုင်း ဗီဒီယိုလင့်ခ် လိုအပ်ပါတယ်");return}
  if(!okUrl(video)){toast(t("bad_url"));return}
  if(cover&&!okUrl(cover)){toast(t("bad_url"));return}
  if(btn)btn.disabled=true;
  var id=null;
  try{
   var crow={title:title.trim(),genre:genre.trim()||"အထွေထွေ",eps:1,color_a:"#3a2a5a",color_b:"#c06a8a",price:FIXED_PRICE,free_eps:1,owner_id:S.me.id,moderation_status:"pending",submitted_at:new Date().toISOString(),cover_path:cover||null};
   if(desc&&!S.noExt)crow.description=desc;
   var dr=await insDrama(crow);
   if(dr.error)throw dr.error;
   id=dr.data.id;
   var ep=await SB.from("episodes").insert({drama_id:id,n:1,video_path:video,uploaded_by:S.me.id,moderation_status:"pending",submitted_at:new Date().toISOString()});
   if(ep.error)throw ep.error;
   id=null; /* အောင်မြင်ပြီ – ဆက်ပြီး ဖျက်စရာမလို */
   toast("Admin ထံ တင်သွင်းပြီးပါပြီ။ အတည်ပြုချက်ကို စောင့်ပါ။");
   await loadCreator();await loadDr();render();
  }catch(e){
   if(id){try{await SB.from("dramas").delete().eq("id",id)}catch(_){}}
   toast("တင်မရပါ: "+(e.message||e))}
  finally{if(btn)btn.disabled=false}
 },
 creatorEpisodeSubmit:async function(v,btn){
  if(!SB||!S.me||!S.me.is_vip){toast("VIP Creator များသာ Video တင်နိုင်ပါတယ်");return}
  var id=($("#crepisodeDrama")||{}).value,n=parseInt(($("#crEpNo")||{}).value,10),u=(($("#crEpVideo")||{}).value||"").trim();
  if(!id||!n||!u){toast("ဇာတ်လမ်း၊ Episode နံပါတ်နဲ့ ဗီဒီယိုလင့်ခ် ဖြည့်ပါ");return}
  if(!okUrl(u)){toast(t("bad_url"));return}
  if(btn)btn.disabled=true;
  try{
   var r=await SB.rpc("creator_submit_episode",{p_drama:+id,p_n:n,p_video_path:u});
   if(r.error)throw r.error;
   toast("Episode ကို Admin ထံ တင်သွင်းပြီးပါပြီ။");await loadCreator();await loadDr();render();
  }catch(e){toast("Episode တင်မရပါ: "+(e.message||e))}
  finally{if(btn)btn.disabled=false}
 },
 creatorWithdraw:async function(v,btn){
  var amount=parseFloat(($("#crAmount")||{}).value),method=(($("#crMethod")||{}).value||"").trim(),account=(($("#crAccount")||{}).value||"").trim();
  if(!amount||!method||!account){toast("ငွေပမာဏနဲ့ ငွေလက်ခံအချက်အလက် ဖြည့်ပါ");return}
  if(btn)btn.disabled=true;
  try{var r=await SB.rpc("request_creator_withdrawal",{p_amount:amount,p_method:method,p_account:account});if(r.error)throw r.error;toast("ငွေထုတ်တောင်းဆိုမှု ပို့ပြီးပါပြီ");await loadCreator();render()}
  catch(e){toast("တောင်းဆိုမရပါ: "+(e.message||e))}
  finally{if(btn)btn.disabled=false}
 },
 reviewDrama:async function(v){var p=String(v).split("|");var note=prompt("Admin မှတ်ချက် (မလိုလျှင် ဗလာထားပါ)","");var r=await SB.rpc("admin_review_drama",{p_drama:+p[0],p_approved:p[1]==="1",p_note:note||null});if(r.error){toast(r.error.message);return}await loadDr();await loadAdmin();render();toast("Moderation အခြေအနေ ပြောင်းပြီးပါပြီ")},
 reviewEpisode:async function(v){var p=String(v).split("|"),note=prompt("Admin မှတ်ချက် (မလိုလျှင် ဗလာထားပါ)","");var r=await SB.from("episodes").update({moderation_status:p[2],moderation_note:note||null,reviewed_at:new Date().toISOString()}).eq("drama_id",+p[0]).eq("n",+p[1]);if(r.error){toast(r.error.message);return}await loadDr();await loadAdmin();render();toast("Episode စစ်ဆေးပြီးပါပြီ")},
 reviewWithdrawal:async function(v){var p=String(v).split("|");var note=prompt("ငွေပေးချေမှု မှတ်ချက် (မလိုလျှင် ဗလာထားပါ)","");var r=await SB.rpc("admin_review_withdrawal",{p_withdrawal:+p[0],p_status:p[1],p_note:note||null});if(r.error){toast(r.error.message);return}await loadAdmin();render();toast("ငွေထုတ်စာရင်း ပြင်ဆင်ပြီးပါပြီ")},
 saveCreatorSettings:async function(){var rate=parseFloat(($("#creatorRate")||{}).value),min=parseFloat(($("#creatorMin")||{}).value);if(!Number.isFinite(rate)||!Number.isFinite(min)||rate<0||min<0){toast("နှုန်းထားကို မှန်ကန်စွာ ဖြည့်ပါ");return}var r=await SB.rpc("admin_set_creator_settings",{p_rate:rate,p_min:min});if(r.error){toast(r.error.message);return}await loadAdmin();render();toast("Creator နှုန်းထား သိမ်းပြီးပါပြီ")},
 navback:function(){if(NAV.hd>0&&!NAV.nb)history.back();else closeTop()},
 setepurl:async function(v,btn){
  var d=find(S.sel);if(!d)return;
  if(!S.ep){toast(t("pick_ep_first"));return}
  var u=(($("#epurl")||{}).value||"").trim();
  if(!okUrl(u)){toast(t("bad_url"));return}
  var n=S.ep,old=await oldPath(d,n);
  if(btn)btn.disabled=true;
  try{
   var r=await saveEpisode(d.id,n,u);
   if(r.error){toast(t("save_fail",r.error.message));return}
   if(old&&old!==u)await rmFiles([old]);
   d.vids[n]=u;delete VC[vkey(d,n)];toast(t("up_done"));if(find(S.sel)===d&&S.ep===n)refAdm(d);if(S.dash)loadAdmin().catch(function(){})
  }catch(e){toast(t("save_fail",e&&e.message||e))}
  finally{if(btn)btn.disabled=false}},
 setcvurl:async function(v,btn){
  var d=find(S.sel);if(!d)return;
  var u=(($("#cvurl")||{}).value||"").trim();
  if(!okUrl(u)){toast(t("bad_url"));return}
  var oldc=d.cp;
  if(btn)btn.disabled=true;
  try{
   var r=await SB.from("dramas").update({cover_path:u}).eq("id",d.id);
   if(r.error){toast(t("save_fail",r.error.message));return}
   if(oldc&&oldc!==u)await rmFiles([oldc]);
   await loadDr();sheet();toast(t("cover_changed"));render()
  }catch(e){toast(t("save_fail",e&&e.message||e))}
  finally{if(btn)btn.disabled=false}},
 vipbox:async function(){
  if(!SB||!S.me)return;
  $("#sb").innerHTML=backbar()+"<h2>"+t("vip_title")+"</h2>"+note(t("vip_loading"));
  $("#sheet").className="sheet open";navSync();
  try{
   var pr=await SB.from("profiles").select("*").eq("id",S.me.id).maybeSingle();
   if(pr.data&&pr.data.is_vip){var em=S.me.email,ad=S.me.is_admin;S.me=pr.data;S.me.email=em;if(ad)S.me.is_admin=true;updTop();closeSheet();toast(t("vip_now"));await ACT.creatorDash();return}
   if(pr.data){S.me.coins=pr.data.coins;updTop()}
   var rs=await Promise.all([SB.from("creator_settings").select("vip_coin_price").eq("id",1).maybeSingle(),SB.from("vip_applications").select("id,status,admin_note,created_at").eq("user_id",S.me.id).order("created_at",{ascending:false}).limit(1)]);
   if(!sheetOpen())return;
   var price=Number((rs[0].data||{}).vip_coin_price||0),ap=(rs[1].data||[])[0]||null,coins=S.me.coins||0;
   var h=backbar()+"<h2>"+t("vip_title")+'</h2><p class="note" style="padding:6px 0">'+t("vip_desc")+"</p>";
   h+='<div class="acard"><b>'+t("vip_coin_h")+'</b><p class="note" style="padding:4px 0 8px">'+(price>0?t("vip_coin_txt",price,coins):t("vip_coin_off"))+"</p>"+(price>0?'<button class="btn" style="margin:0;width:100%" data-a="buyvip"'+(coins<price?" disabled":"")+">"+t("vip_buy",price)+"</button>":"")+"</div>";
   h+='<div class="acard"><b>'+t("vip_apply_h")+"</b>";
   if(ap&&ap.status==="pending")h+='<p class="note" style="padding:6px 0 0">'+t("vip_pending")+"</p>";
   else{
    if(ap&&ap.status==="rejected")h+='<p class="note" style="padding:6px 0 0">'+t("vip_rejected")+(ap.admin_note?": "+esc(ap.admin_note):"")+"</p>";
    h+='<p class="note" style="padding:4px 0 8px">'+t("vip_apply_txt")+'</p><label class="note" for="viptt" style="display:block;padding:0 0 4px">'+t("vip_tt_lbl")+'</label><input class="in" id="viptt" type="url" inputmode="url" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="250" placeholder="'+esc(t("vip_tt_ph"))+'" style="margin:0 0 10px;width:100%"><input class="in" id="vipmsg" maxlength="200" placeholder="'+esc(t("vip_msg_ph"))+'" style="margin:0 0 10px;width:100%"><button class="btn" style="margin:0;width:100%" data-a="applyvip">'+t("vip_apply_btn")+"</button>"}
   h+="</div>";
   h+='<button class="btn" style="margin:12px 0 0;width:100%;background:var(--panel);color:var(--text);border:1px solid var(--line)" data-a="close">'+t("close")+"</button>";
   $("#sb").innerHTML=h
  }catch(e){toast(t("failed",e&&e.message||e))}},
 buyvip:async function(v,btn){
  if(!SB||!S.me||!confirm(t("vip_buy_q")))return;
  if(btn)btn.disabled=true;
  try{
   var r=await SB.rpc("buy_vip");
   if(r.error){toast(/enough/i.test(r.error.message)?t("vip_no_coin"):t("failed",r.error.message));return}
   var d=r.data||{};S.me.is_vip=true;if(d.coins!=null)S.me.coins=d.coins;updTop();
   closeSheet();toast(t("vip_ok"));await ACT.creatorDash()
  }catch(e){toast(t("failed",e&&e.message||e))}
  finally{if(btn)btn.disabled=false}},
 applyvip:async function(v,btn){
  if(!SB||!S.me)return;
  var note=(($("#vipmsg")||{}).value||"").trim(),tt0=(($("#viptt")||{}).value||"").trim();
  if(!tt0){toast(t("vip_tt_req"));var ti=$("#viptt");if(ti)ti.focus();return}
  var tt=ttNorm(tt0);
  if(!tt){toast(t("vip_tt_bad"));var tj=$("#viptt");if(tj)tj.focus();return}
  var msg="TikTok: "+tt+(note?" | Note: "+note.slice(0,200):"");
  if(btn)btn.disabled=true;
  try{
   var r=await SB.rpc("apply_for_vip",{p_message:msg});
   if(r.error){toast(/pending/i.test(r.error.message)?t("vip_pending"):t("failed",r.error.message));return}
   toast(t("vip_applied"));await ACT.vipbox()
  }catch(e){toast(t("failed",e&&e.message||e))}
  finally{if(btn)btn.disabled=false}},
 reviewVip:async function(v){var p=String(v).split("|");var note=prompt("Admin မှတ်ချက် (မလိုလျှင် ဗလာထားပါ)","");var r=await SB.rpc("admin_review_vip_application",{p_id:+p[0],p_approved:p[1]==="1",p_note:note||null});if(r.error){toast(r.error.message);return}await loadAdmin();render();toast(p[1]==="1"?"VIP ပေးပြီးပါပြီ":"လျှောက်လွှာ ပယ်ချပြီးပါပြီ")},
 saveVipPrice:async function(){var n=parseInt(($("#vipPrice")||{}).value,10);if(!Number.isFinite(n)||n<0){toast("VIP ဈေးကို မှန်ကန်စွာ ဖြည့်ပါ");return}var r=await SB.rpc("admin_set_vip_price",{p_price:n});if(r.error){toast(r.error.message);return}await loadAdmin();render();toast("VIP ဈေး သိမ်းပြီးပါပြီ")},
 undash:function(){S.dash=false;render()},
 moreep:async function(v){var d=find(v);if(!d||d.eps>=200)return;var nn=d.eps+1,r=await SB.from("dramas").update({eps:nn}).eq("id",d.id);if(r.error){toast(t("failed",r.error.message));return}await loadDr();await loadAdmin();render();toast(t("ep_added"));
  /* အပိုင်းအသစ်ကို ရွေးပြီး ဖွင့်ပေးမယ် – ဗီဒီယိုလင့်ခ် ချက်ချင်း paste လုပ်နိုင်အောင် */
  S.sel=String(d.id);S.ep=nn;S.fs=false;S.fsReq=false;sheet()},
 editeps:function(v){var d=find(v);if(!d)return;var x=prompt(t("eps_prompt",d.t,d.eps),String(d.eps));if(x===null)return;setEps(d,x)},
 seteps:function(v,btn){var d=find(S.sel);if(!d)return;setEps(d,($("#neps")||{}).value,btn)},
 admep:function(v){var d=find(S.sel);if(!d)return;var n=parseInt(v,10);if(!n||n<1||n>d.eps)return;S.ep=n;S.fs=false;S.fsReq=false;refAdm(d)},
 grant:async function(v){var p=String(v).split("|"),amt=parseInt(p[1],10)||0;var r=await SB.rpc("admin_grant_coins",{p_user:p[0],p_amount:amt});if(r.error){toast(t("failed",r.error.message));return}
  var u=(S.ax.list||[]).filter(function(x){return x.id===p[0]})[0];if(u)u.coins=Math.max(0,u.coins+amt);refUl();toast(t("coin_ok",(amt>0?"+":"")+amt))},
 vip:async function(v){var p=String(v).split("|"),on=p[1]==="1";var r=await SB.rpc("admin_set_vip",{p_user:p[0],p_vip:on});if(r.error){toast(t("failed",r.error.message));return}
  var u=(S.ax.list||[]).filter(function(x){return x.id===p[0]})[0];if(u)u.is_vip=on;refUl();toast(on?t("vip_given"):t("vip_removed"))},
 sethot:async function(){var d=find(S.sel);if(!d)return;
  var r=await SB.from("dramas").update({is_hot:!d.hot}).eq("id",d.id);
  if(r.error){toast(/is_hot|column|schema/i.test(r.error.message||"")?t("ext_need_sql"):t("failed",r.error.message));return}
  await loadDr();sheet();render();toast(t("hot_set"))},
 setprice:async function(){var d=find(S.sel);if(!d)return;var pr=Math.max(0,parseInt($("#pp").value,10)||0),fr=Math.max(0,parseInt($("#pf").value,10)||0);
  var r=await SB.from("dramas").update({price:pr,free_eps:fr}).eq("id",d.id);if(r.error){toast(t("price_fail",r.error.message));return}
  await loadDr();sheet();toast(pr<=0?t("all_free_set"):t("price_set",pr))},
 delep:async function(){var d=find(S.sel),n=S.ep;if(!d||!n||!d.vids[n]||!confirm(t("del_ep_q",n)))return;
  var p=await oldPath(d,n);var r=await SB.from("episodes").delete().eq("drama_id",d.id).eq("n",n);if(r.error){toast(t("del_fail",r.error.message));return}
  await rmFiles([p]);delete d.vids[n];delete VC[vkey(d,n)];sheet();if(S.dash)await loadAdmin();toast(t("vid_deleted"))},
 deldramaid:function(v){S.sel=v;ACT.deldrama()},
 reload:function(){location.reload()},
 logout:async function(){S.dash=false;S.creatorDash=false;await SB.auth.signOut();S.tab="home";render()},
 checkin:async function(){
  if(!SB||!S.me){toast(t("need_login"));S.tab="me";render();return}
  var r=await SB.rpc("checkin");
  if(r.error){toast(/already/i.test(r.error.message||"")?t("checkin_done"):t("failed",r.error.message));return}
  S.me.coins=r.data.coins;S.me.streak=r.data.streak;S.me.last_checkin=today();toast(t("coin_gain",r.data.gain));render()},
 adddrama:async function(v,btn){
  var ti=$("#nt").value.trim();if(!ti){toast(t("need_title"));return}
  var cu=($("#nc").value||"").trim(),vu=($("#nv").value||"").trim();
  if(cu&&!okUrl(cu)){toast(t("bad_url"));return}
  if(vu&&!okUrl(vu)){toast(t("bad_url"));return}
  var P=[["#3a2a5a","#c06a8a"],["#1f3a4a","#c97b5a"],["#5a2a2a","#e0b15a"],["#14262a","#5aa89a"],["#35224f","#9a7ad0"]],p=P[Math.floor(Math.random()*P.length)];
  var fr=$("#nf").value.trim(),eps=Math.max(1,Math.min(200,parseInt($("#ne").value,10)||20)),free=fr===""?10:Math.max(0,parseInt(fr,10)||0),allf=!!($("#nall")||{}).checked;
  /* v29: Lock ချထားသမျှ အပိုင်းအားလုံး ပုံသေ 30 Coin – အားလုံးအခမဲ့ ရွေး / အခမဲ့အပိုင်းရေ > စုစုပေါင်း ဆိုရင် Lock မချ (price=0) */
  var row={title:ti,genre:$("#ng").value.trim()||t("drama_default"),eps:eps,color_a:p[0],color_b:p[1],price:(allf||free>eps)?0:FIXED_PRICE,free_eps:free};
  var desc=(($("#nd")||{}).value||"").trim().slice(0,1000),hot=!!($("#nhot")||{}).checked;
  if(desc&&!S.noExt)row.description=desc;
  if(hot&&!S.noExt)row.is_hot=true;
  if(cu)row.cover_path=cu;
  if(btn)btn.disabled=true;
  try{
   setSt("ust2",t("adding"));
   var r=await insDrama(row);
   if(r.error){setSt("ust2","");fail(t("add_fail",r.error.message));return}
   var dropped=!!r.dropped||((desc||hot)&&S.noExt);
   var id=r.data.id;
   if(vu){
    var e2=await saveEpisode(id,1,vu);
    if(e2.error)toast(t("vid1_fail",e2.error.message))}
   await loadDr();await loadAdmin();
   /* ထည့်ပြီးတာနဲ့ ဇာတ်လမ်းကို ဖွင့်ပြီး အပိုင်းဗီဒီယိုလင့်ခ် ထည့်ဖို့ အဆင်သင့်ပေးမယ် */
   var nd=find(id);S.sel=String(id);S.ep=(nd&&nd.vids[1]&&nd.eps>1)?2:1;
   render();sheet();toast(dropped?t("ext_need_sql"):t("drama_added"))
  }catch(e){fail(e&&e.message||e)}
  finally{if(btn)btn.disabled=false;var st=$("#ust2");if(st&&!$("#sheet").classList.contains("open"))st.innerHTML=""}},
 deldrama:async function(){
  var d=find(S.sel);if(!d||!confirm(t("del_dr_q",d.t)))return;
  var paths=await Promise.all(Object.keys(d.vids).map(function(k){return oldPath(d,k)}));paths=paths.filter(Boolean);if(d.cp)paths.push(d.cp);
  var r=await SB.from("dramas").delete().eq("id",d.id);
  if(r.error){toast(t("del_fail",r.error.message));return}
  await rmFiles(paths);
  closeSheet();await loadDr();if(S.dash)await loadAdmin();render();toast(t("deleted"))}
};
/* ---------- v13: နောက်သို့ (Back) + Android Back = Browser History စနစ် ----------
   Layer (အဆင့်) ကို UI အခြေအနေကနေ တွက်တယ်:  Home(0) < Tab တစ်ခု(1) < Dashboard/Forgot(2) < Popup/Modal(3)
   Layer တိုးရင် history.pushState၊ Back နှိပ်ရင် (popstate) အပေါ်ဆုံး layer ကို ပိတ်၊ Home မှာမှ App ထွက် */
function sheetOpen(){var e=$("#sheet");return!!(e&&e.classList.contains("open"))}
function subLayer(){
 if(S.tab!=="me"||!SB)return null;
 if(S.recov)return"recov";
 if(!S.me)return S.mode==="forgot"?"forgot":null;
 if(S.dash&&S.me.is_admin)return"dash";
 if(S.creatorDash&&(S.me.is_vip||S.me.is_creator))return"creator";
 return null}
function depth(){return(S.tab!=="home"?1:0)+(subLayer()?1:0)+(sheetOpen()?1:0)+(ucmIsOpen()?1:0)}
function closeTop(){
 if(ucmIsOpen()){ucmClose();return}
 if(sheetOpen()){closeSheet();return}
 var l=subLayer();
 if(l==="recov")S.recov=false;
 else if(l==="forgot"){S.mode="login";S.fp=null;clrErr()}
 else if(l==="dash")S.dash=false;
 else if(l==="creator")S.creatorDash=false;
 else if(S.tab!=="home")S.tab="home";
 else return;
 render();window.scrollTo(0,0)}
function navSync(){
 if(NAV.nb){NAV.nr=1;return}
 var D=depth(),H=NAV.hd;
 try{
  if(D>H){for(var i=H+1;i<=D;i++)history.pushState({zl:i},"");NAV.hd=D}
  else if(D<H){NAV.nb=1;NAV.hd=D;history.go(D-H);
   setTimeout(function(){if(NAV.nb){NAV.nb=0;if(NAV.nr){NAV.nr=0;navSync()}}},700)}
 }catch(e){NAV.nb=0}}
window.addEventListener("popstate",function(e){
 if(NAV.nb){NAV.nb=0;if(NAV.nr){NAV.nr=0;navSync()}return}
 var z=(e.state&&e.state.zl)||0;NAV.hd=z;
 var g=6;while(depth()>NAV.hd&&g-->0)closeTop();
 render()});
/* ===== v22: Full-screen gestures – tap = Play/Pause, double tap = ❤️ + Like, swipe up/down = next/prev EP, bar = seek ===== */
var FG={x:0,y:0,t:0,on:false,lt:0,lx:0,ly:0,lh:0,tm:0,seek:false};
function fsVid(){return document.querySelector("#pl video")}
function fsToggle(){var v=fsVid();if(!v)return;if(v.paused){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()}
function fsHeart(x,y){
 var w=$("#sheet .pwrap");if(!w)return;
 var r=w.getBoundingClientRect(),h=document.createElement("span");
 h.className="fsheart";h.textContent="❤️";h.style.left=(x-r.left)+"px";h.style.top=(y-r.top)+"px";h.style.setProperty("--r",(Math.random()*40-20).toFixed(0)+"deg");
 w.appendChild(h);setTimeout(function(){if(h.parentNode)h.parentNode.removeChild(h)},900);
 if(S.me&&S.soc&&!S.soc.liked&&socOn())ACT.like()}
function fsStep(dir){
 var d=find(S.sel);if(!d||!S.fs)return;
 var n=S.ep+dir;
 if(n<1){toast(t("fs_first"));return}
 if(n>d.eps){toast(t("fs_last"));return}
 if(locked(d,n)){toast(t("fs_lock",n));ACT.fseps();return}
 S.fsDir=dir;playEp(n)}
function fsSeek(e){
 var v=fsVid(),b=document.getElementById("fsbar");
 if(!v||!b||!isFinite(v.duration)||!v.duration)return;
 var r=b.getBoundingClientRect();
 v.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*v.duration}
function isCls(e,c){var n=e.target;return!!(n&&n.classList&&n.classList.contains(c))}
document.addEventListener("pointerdown",function(e){
 var bar=e.target.closest&&e.target.closest(".fsbar");
 if(bar&&S.fs){FG.seek=true;try{bar.setPointerCapture(e.pointerId)}catch(_){}fsSeek(e);return}
 if(!S.fs||!isCls(e,"fsgest"))return;
 FG.on=true;FG.x=e.clientX;FG.y=e.clientY;FG.t=Date.now();
 try{e.target.setPointerCapture(e.pointerId)}catch(_){}});
document.addEventListener("pointermove",function(e){if(FG.seek)fsSeek(e)});
document.addEventListener("pointercancel",function(){FG.on=false;FG.seek=false});
document.addEventListener("pointerup",function(e){
 if(FG.seek){FG.seek=false;return}
 if(!FG.on)return;FG.on=false;
 var dx=e.clientX-FG.x,dy=e.clientY-FG.y,now=Date.now();
 if(Math.abs(dy)>56&&Math.abs(dy)>Math.abs(dx)*1.4){clearTimeout(FG.tm);FG.lt=0;fsStep(dy<0?1:-1);return}
 if(Math.abs(dx)>14||Math.abs(dy)>14||now-FG.t>450)return;
 var dbl=FG.lt&&now-FG.lt<300&&Math.hypot(e.clientX-FG.lx,e.clientY-FG.ly)<70;
 if(dbl||now-FG.lh<350){clearTimeout(FG.tm);FG.lt=0;FG.lh=now;fsHeart(e.clientX,e.clientY);return}
 FG.lt=now;FG.lx=e.clientX;FG.ly=e.clientY;
 clearTimeout(FG.tm);FG.tm=setTimeout(function(){FG.lt=0;fsToggle()},280)});
ACT.ucmok=function(){ucmYes()};
ACT.ucmno=function(){ucmClose()};
ACT.ucmshade=function(v,el,e){if(e.target===el)ucmClose()};
ACT.hgo=function(v){if(HC.go)HC.go(+v)};
document.addEventListener("click",function(e){var el=e.target.closest("[data-a]");if(!el||el.disabled)return;var f=ACT[el.getAttribute("data-a")];if(f)f(el.getAttribute("data-v"),el,e)});
document.addEventListener("input",function(e){if(e.target.id==="q"){S.q=e.target.value;grid()}else if(e.target.id==="us")refUl();else if(e.target.id==="nc"||e.target.id==="crcover")covPrev(e.target.id,e.target.value)});
document.addEventListener("change",async function(e){
 var el=e.target,c=el.getAttribute&&el.getAttribute("data-c");if(!c)return;
 var f=el.files&&el.files[0];
 if(c==="admep"){ACT.admep(el.value);return}
 if(c==="pick"){el.value="";if(f)pickUp(f,el.getAttribute("data-t"),el.getAttribute("data-k"));return}
 if(c==="avatar"){el.value="";if(f)setAvatar(f);return}
 if(c==="creatorCover"||c==="creatorVideo"||c==="creatorEpisodeVideo"){if(f){if(c==="creatorCover")S.creatorFiles.cover=f;else if(c==="creatorVideo")S.creatorFiles.video=f;else S.creatorFiles.episode=f;toast("ဖိုင်ရွေးပြီးပါပြီ")}return}
 var d=find(S.sel);el.value="";if(!f||!d)return;
 if(c==="up"){
  if(!S.ep){toast(t("pick_ep_first"));return}
  if(f.type&&f.type.indexOf("video")!==0){toast(t("only_video"));return}
  if(f.size>MAXMB*1048576){toast(t("too_big",MAXMB,Math.round(f.size/1048576)));return}
  var n=S.ep,old=await oldPath(d,n),path="videos/"+d.id+"/"+n+"-"+Date.now()+"."+vidExt(f);
  setSt("upst",t("uploading"),0);
  var u=await upl(path,f,function(p){setSt("upst",t("uploading_s"),p)});
  if(u.error){setSt("upst","");toast(t("up_fail",u.error.message));return}
  var r=await saveEpisode(d.id,n,path);
  if(r.error){toast(t("save_fail",r.error.message));return}
  if(old)await rmFiles([old]);
  d.vids[n]=path;delete VC[vkey(d,n)];toast(t("up_done"));playEp(n)}
 else if(c==="cover"){
  if(f.type&&f.type.indexOf("image")!==0){toast(t("only_img"));return}
  setSt("upst",t("cover_prep"));
  var blob=await shrink(f),cp="covers/"+d.id+"-"+Date.now()+".jpg",oldc=d.cp;
  var u2=await upl(cp,blob,function(p){setSt("upst",t("cover_up"),p)});
  if(u2.error){setSt("upst","");toast(t("up_fail",u2.error.message));return}
  var r2=await SB.from("dramas").update({cover_path:cp}).eq("id",d.id);
  if(r2.error){toast(t("save_fail",r2.error.message));return}
  if(oldc)await rmFiles([oldc]);
  var ep=S.ep;await loadDr();sheet();if(ep){S.ep=ep}toast(t("cover_changed"));render()}
});
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();S.inst=e;if(S.tab==="home"||S.tab==="me")render()});
window.addEventListener("appinstalled",function(){S.inst=null;toast(t("installed_ok"));render()});
function showErr(m){var b=$("#err");if(!b)return;b.style.display="block";b.textContent=m}
window.addEventListener("error",function(e){var m=e&&e.message||"";if(!m||/^Script error\.?$/i.test(m)||/ResizeObserver loop/i.test(m))return;showErr("Error: "+m)});
window.addEventListener("unhandledrejection",function(e){var rs=e&&e.reason,nm=rs&&rs.name,m=String(rs&&rs.message||rs||"");
 if(nm==="AbortError"||nm==="NotAllowedError"||/play\(\) request/i.test(m))return; /* ဗီဒီယို autoplay / episode ပြောင်းလိုက်လို့ ဖြစ်တဲ့ ပုံမှန်အမှား */
 showErr("Error: "+m)});
(async function boot(){
 document.documentElement.lang=S.lang;
 try{history.replaceState({zl:0},"")}catch(e){}
 try{
  if(C.SUPABASE_URL&&C.SUPABASE_KEY&&window.supabase){
   var k=C.SUPABASE_KEY;
   SB=mkClient(k);S.key=k;
  }
 }catch(e){}
 if(BOOT.qs.get("r")&&!BOOT.qs.get("code"))cleanUrl();
 render();
 loadDr().then(function(){render();deepOpen()},function(){});
 initAuth().catch(function(e){showErr(t("auth_err",e&&e.message||e))});
})();
})();
