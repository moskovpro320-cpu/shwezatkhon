# ရွှေဇာတ်ခုံ v12 – VIP Creator System ပါဝင်သော ဗားရှင်း

## A. Supabase SQL (အရေးကြီးဆုံး)
1. Supabase > **SQL Editor** > New query
2. **supabase-v11.sql** ကို အကုန် copy > paste > **Run** ("Success" ပေါ်ရင် ပြီး)
   - `permission denied for table dramas` ပြင်ပြီး (GRANT + RLS Policy ပြန်ဆောက်)
   - လက်ရှိ APK အဟောင်း မပျက်စေရန် `shwezat-media` bucket ကို public အတိုင်း ထားမည်။ App ရဲ့ catalogue မှာ Pending content မပြသော်လည်း media URL ကို သိသူက တိုက်ရိုက်ဖွင့်နိုင်နိုင်သည်။ အပြည့်အဝ private media လိုပါက APK အဟောင်းကိုပါ rebuild လုပ်ပြီး နောက်ထပ် migration လိုအပ်မည်။ Admin နှင့် VIP Creator (ကိုယ့် UID folder ထဲ) upload လုပ်ခွင့်ရှိ
3. **Authentication > Sign In / Providers > Email** > **Confirm email** = OFF

## A2. VIP Creator System (v12) — မဖြစ်မနေ Run ရန်
1. Supabase > SQL Editor > New query
2. `supabase-v12-creator.sql` ကို အကုန် paste > Run လုပ်ပါ။ v11 SQL ကို မဖျက်ဘဲ migration အသစ်အဖြစ် Run လုပ်ရန်။
3. Admin Dashboard > Creator စနစ် ဆက်တင် မှာ View 1,000 အတွက် ပေးမည့်နှုန်းထားနဲ့ အနည်းဆုံးငွေထုတ်ပမာဏကို သတ်မှတ်ပါ။ Rate ကို 0 ထားလျှင် Creator ဝင်ငွေ မတွက်ပါ။
4. VIP User တွေက Creator Dashboard မှာ ဇာတ်လမ်း/ဗီဒီယိုတင်နိုင်ပြီး Admin Approve လုပ်ပြီးမှ Public မှာ ပေါ်မယ်။
5. Creator earnings/View ကို Login ဝင်ထားတဲ့ user က Episode တစ်ခုကို တစ်နေ့တစ်ကြိမ်သာ၊ playback 30 စက္ကန့်ကျော်မှ မှတ်တမ်းတင်မယ်။ Guest ကြည့်ရှုမှုကို ဝင်ငွေ View အဖြစ် မတွက်ပါ။ ဒီကန့်သတ်ချက်က abuse ကို လျှော့ချပေမဲ့ bot/fraud ကို အပြည့်အဝ မတားနိုင်ပါ။ VIP သက်တမ်းကုန်သွားလျှင် Upload မလုပ်နိုင်တော့ပေမဲ့ Creator Dashboard နဲ့ ရရှိပြီးသားငွေ ထုတ်ယူခွင့် ဆက်ရှိမယ်။
6. ငွေပေးချေမှုကို Admin က payout provider မှတစ်ဆင့် ကိုယ်တိုင်ပေးပြီး Paid အဖြစ် မှတ်သားရမယ်။ App က အလိုအလျောက် ငွေလွှဲမပေးပါ။

## B. Forgot Password (Gmail ဂဏန်း Code) – v11
App က `signInWithOtp({shouldCreateUser:false})` နဲ့ Code ပို့၊ `verifyOtp({type:'email'})` နဲ့ စစ်၊ `updateUser({password})` နဲ့ Password ပြောင်း။ Custom SMTP မလို။
Supabase ဘက်မှာ **Authentication > Email Templates > Magic Link** ထဲ `{{ .Token }}` ပါရမယ် (မပါရင် Link ပဲရောက်မယ်):
```
<h2>သင့် Code</h2>
<p><b>{{ .Token }}</b></p>
```
- Default email က တစ်နာရီ ပို့နိုင်တဲ့ အရေအတွက် နည်းတယ်၊ ၆၀ စက္ကန့်ခြား ပြန်ပို့ရမယ်
- အကောင့်မရှိတဲ့ Email ဆိုရင် "အကောင့်မရှိပါ" လို့ပြမယ်

## C. Netlify
zip ဖြေထားတဲ့ ဖိုင်အားလုံးကို Site > **Deploys** ထဲ ဆွဲထည့်ပါ (index.html က ထိပ်ဆုံးမှာ ရှိရမယ်)။
Supabase > Authentication > **URL Configuration**: Site URL = Netlify link၊ Redirect URLs ထဲ `https://သင့်site.netlify.app/**` ထည့်ပါ။

## D. Google Login
Google Cloud OAuth client (Redirect URI: `https://ohvhmwcdyliviktixlxt.supabase.co/auth/v1/callback`) > Supabase > Providers > Google ထဲ Client ID/Secret ထည့်ပါ။

## E. Admin
- `moskovpro320@gmail.com` နဲ့ ဝင်ရင် အလိုအလျောက် Admin (SQL + App နှစ်ဘက်လုံး)
- ⚠ ဒီ email နဲ့ အကောင့်ကို **ကိုယ်တိုင် အရင်ဆုံး ဖွင့်ထားပါ** (Confirm email OFF ဆိုတော့ တခြားသူ အရင်ဖွင့်သွားရင် Admin ရသွားနိုင်လို့)
- ဇာတ်လမ်းထည့်: ကျွန်ုပ် tab > Admin Dashboard > Cover ပုံ (ပုံဖိုင်သာ) + အပိုင်း ၁ ဗီဒီယို (ဗီဒီယိုဖိုင်သာ၊ မထည့်လည်းရ) > **ဇာတ်လမ်းထည့်မယ်**
  → ထည့်ပြီးတာနဲ့ ဇာတ်လမ်းပွင့်လာမယ်၊ အပိုင်းနံပါတ်ရွေး > **🎬 ဗီဒီယိုရွေးတင်ရန်**
- ဗီဒီယိုတစ်ဖိုင် 50MB (Supabase free plan)

## F. ဆက်တင် (ကျွန်ုပ် tab)
Guest/Login စာမျက်နှာ: ဘာသာစကား ခလုတ်ပဲ။ အကောင့်ဝင်ပြီးမှ: ဘာသာစကား + ဖုန်းထဲ App သွင်းရန်/လမ်းညွှန် + Cache ရှင်းရန်။

## G. Cache ကပ်မနေအောင်
`sw.js` က cache လုံးဝမသိမ်းဘဲ အဟောင်းတွေ ဖျက်တယ်၊ `_headers` က no-store၊ ဖိုင်တွေမှာ `?v=10`။ ဗားရှင်းအဟောင်း ကပ်နေရင် ကျွန်ုပ် > ဆက်တင် > Cache ရှင်းမယ်။

## H. Deploy v12
- `supabase-v12-creator.sql` ကို v11 SQL ပြီးမှ Run လုပ်ပါ။ မူရင်း `supabase-v11.sql` ကို အစားမထိုးပါ။
- Netlify မှာ ZIP ဖြည်ပြီး Web project ဖိုင်များကို Deploy လုပ်ပါ။
- `shwezatkhon.apk` က မူရင်း APK အဟောင်းအတိုင်း ပါဝင်နေပါတယ်။ Web source ပြင်ဆင်မှုက APK ကို အလိုအလျောက် မပြင်ပါ။ Android APK အသစ်လိုပါက သီးခြား rebuild လုပ်ရပါမယ်။
- Admin အကောင့် email ကို လက်ရှိ project က `moskovpro320@gmail.com` အဖြစ် သတ်မှတ်ထားပါတယ်။ မင်းရဲ့ Admin email မဟုတ်ရင် SQL နှင့် `app.js` ထဲက Admin email ကို ကိုယ့် email နဲ့ ပြောင်းပြီးမှ Deploy လုပ်ပါ။
- View အတွက် Creator ရငွေကို Admin သတ်မှတ်တဲ့ fixed rate (၁,၀၀၀ valid views အတွက် MMK) ဖြင့်တွက်ထားပါတယ်။ ကြော်ငြာဝင်ငွေနဲ့ အလိုအလျောက် ချိတ်ဆက်ထားခြင်းမဟုတ်ပါ။ အမှန်တကယ်ဝင်ငွေ/ငွေကြေးရရှိမှုကို စစ်ဆေးပြီးမှ rate သတ်မှတ်ပါ။

## I. v13 ပြင်ဆင်ချက်များ
1. Supabase > SQL Editor > `supabase-v13-patch.sql` ကို အကုန် paste > Run (v11 → v12 ပြီးမှ)။
2. Admin/Creator ဗီဒီယို + Cover ကို ဖိုင်ရွေးတင်စနစ်အစား **Link (URL)** သီးသန့် ပြောင်းထား (https:// နဲ့စရမယ်၊ ဗီဒီယိုက .mp4 လို တိုက်ရိုက်ဖိုင်လင့်ခ်)။ ဇာတ်လမ်းဟောင်း (Storage path) တွေ ဆက်ကြည့်လို့ရ။
3. ← နောက်သို့ (Back) ခလုတ် + Android Back (history.pushState/popstate) – Home ရောက်မှ App ထွက်။
4. ကျွန်ုပ် tab မှာ Non-VIP အတွက် "👑 VIP အဖွဲ့ဝင်ဖြစ်ရန်" – Coin နဲ့ဝယ် (Admin Dashboard > VIP ဈေး သတ်မှတ်မှ ပွင့်မယ်၊ 0 = ပိတ်) သို့မဟုတ် Admin ထံ လျှောက်လွှာတင် (Admin Dashboard မှာ Approve)။
5. View Anti-Spam: User တစ်ယောက် × Episode တစ်ခု = ၂၄ နာရီ (rolling) အတွင်း ၁ View၊ ၃၀ စက္ကန့် တကယ်ကြည့်မှ ရေတွက်။

## J. v14 – Catbox Auto-Upload + Profile ပုံ
1. `supabase-v14-patch.sql` ကို SQL Editor မှာ Run (v13 ပြီးမှ)။
2. ဗီဒီယို/Cover/Profile ပုံကို 📁 ခလုတ်နဲ့ ရွေးတင်ရင် Catbox ဆီ တင်ပြီး လင့်ခ်ကို URL အကွက်ထဲ အလိုအလျောက်ဖြည့် (မူရင်း URL အကွက်လည်း ဆက်ရှိ)။ 200MB ကျော်ရင် GitHub Releases Link သုံးပါ။
3. Browser က catbox ကို တိုက်ရိုက်ဖတ်ခွင့်မရှိရင် (CORS) `netlify/functions/upload-catbox.js` ကို သုံးမယ် – Netlify Function ကန့်သတ်ချက်ကြောင့် ၄MB အောက် (ပုံများ) သာ။ `netlify.toml` + `netlify/functions` ဖိုလ်ဒါကို ZIP ထဲမပါဘဲ **ဖိုလ်ဒါအနေနဲ့ Drag & Drop** တင်ပါ။


## K. v15 – Pixeldrain Upload + TikTok 9:16 Player
1. Profile 📷 / Cover / ဗီဒီယို (.mp4, 200MB အထိ) ကို Browser က `https://pixeldrain.com/api/file` ဆီ တိုက်ရိုက်တင် (% progress ပါ)။ ပြန်ရတဲ့ `id` ကနေ `https://pixeldrain.com/api/file/{id}` ကို URL အကွက်နဲ့ avatar_url ထဲ အလိုအလျောက်ဖြည့်။
2. `supabase-v15-patch.sql` ကို Supabase SQL Editor မှာ Run ပါ (https:// link ဘယ်ဟာမဆို avatar လက်ခံ)။
3. Pixeldrain က anonymous upload ကို ပိတ်ထားရင် `config.js` ထဲ `PIXELDRAIN_KEY` ထည့်ပါ (သတိ: Key က Browser မှာ ပေါ်နေမယ်)။
4. Video Player = 9:16 ဒေါင်လိုက် (max-height 78vh, object-fit: cover)။ Back ခလုတ် = သီးသန့်တစ်ကြောင်း (position: static)။


## L. v16 – Cloudinary Unsigned Upload
Profile 📷 / Cover / ဗီဒီယို ကို Browser က `https://api.cloudinary.com/v1_1/hdppeivq/auto/upload` ဆီ `file` + `upload_preset` နဲ့ တိုက်ရိုက်တင်၊ `secure_url` ကို URL အကွက်/avatar_url ထဲ အလိုအလျောက်ဖြည့်။ Cloudinary မှာ `shwezat_unsigned` preset ကို **Unsigned** mode ဖြစ်ရမယ်။ supabase-v15-patch.sql ကို Run ထားရမယ် (https:// link ဘယ်ဟာမဆို လက်ခံ)။


## M. v17 – Cloudinary: api_key မပို့ (file + upload_preset သာ)၊ Cloud Name/Preset ကို config.js ကနေယူ (မရှိရင် hdppeivq / shwezat_unsigned)၊ Catbox function ဖျက်၊ sw.js CACHE_VERSION = shwezatkhon-v18။

## N. v20 – TikTok ပုံစံ ❤️ Like / 💬 Comment
- ❤️ Like (+အရေအတွက်) နဲ့ 💬 Comment (+အရေအတွက်) ကို ဗီဒီယိုဘောင်ရဲ့ ညာဘက်အောက်ခြေအတွင်းမှာ ဒေါင်လိုက် (အပေါ်/အောက်) တင်ထား။
- 💬 ကို နှိပ်မှသာ အောက်ခြေကနေ Comment Bottom Sheet တက်လာပြီး ဖတ်/ရေးပို့/ဖျက် လုပ်နိုင်။ ✕ သို့မဟုတ် အရိပ်ကို နှိပ်ရင် ပိတ်။
- SQL မပြောင်း (supabase-v19-patch.sql အတိုင်း)။ sw.js CACHE_VERSION = shwezatkhon-v20။

## O. v21 – Share + Bookmark ခလုတ်
- ဗီဒီယိုဘောင် ညာဘက်အောက်ခြေ ဒေါင်လိုက်စီစဉ်- ❤️ Like → 💬 Comment → ↗️ Share → 🔖 Bookmark။
- ↗️ Share: `?d=<ဇာတ်လမ်းID>` Link ကို `navigator.share` (ရရင်) မဟုတ်ရင် Clipboard ထဲ Copy + Toast။ Link ဖွင့်ရင် ဒီဇာတ်လမ်း အလိုအလျောက်ပွင့်။
- 🔖 Bookmark: အရင် "စာရင်းထဲထည့်ရန် / ဖယ်ရန်" ခလုတ်ကြီးအစား ဒီအိုင်ကွန်နဲ့ ချိတ် (သိမ်းထားရင် ရွှေရောင်)။ ဗီဒီယို ပြန်စမသွား။
- SQL မပြောင်း။ sw.js CACHE_VERSION = shwezatkhon-v21။

## P. v22 – Full-Screen 9:16 (TikTok / ReelShort) ဗီဒီယိုကြည့်မျက်နှာပြင်
- အပိုင်းတစ်ခု နှိပ်လိုက်တာနဲ့ Header / Search မပေါ်တော့ဘဲ မျက်နှာပြင်အပြည့် (`position:fixed; inset:0; 100dvh; z-index:9999; #000`)။
- ဘယ်အပေါ်: `←` Back + `EP.n`၊ ညာအပေါ်: `1.0x` နှိပ်ရင် 1.25x / 1.5x / 2.0x ပြောင်း။
- ညာဘေး ဒေါင်လိုက်: ❤️ Like / 💬 Comment / ↗️ Share / 🔖 Bookmark။ အောက်ဘယ်: `@တင်ဆက်သူ`၊ ခေါင်းစဉ်၊ `Episodes` ခလုတ် (အပိုင်းစာရင်း)။
- အောက်ဆုံး Progress Bar (ပွတ်ဆွဲ/နှိပ်ပြီး ရှေ့နောက်ရွှေ့နိုင်)။ အပေါ်ပွတ်ဆွဲ = နောက်အပိုင်း၊ အောက်ပွတ်ဆွဲ = ရှေ့အပိုင်း (Lock ကျနေရင် Coin မဖြတ်ဘဲ Episodes စာရင်းပြ)။
- တစ်ချက်နှိပ် = Play/Pause၊ နှစ်ချက်ဆင့်နှိပ် = ❤️ Animation + Like အလိုအလျောက်။
- SQL မပြောင်း။ sw.js CACHE_VERSION = shwezatkhon-v22။

## Q. v23 – Comment Input + ပို့မည် တစ်တန်းတည်း၊ Netlify Badge ဖျောက်
- Comment Drawer အောက်ခြေ: "မှတ်ချက်ရေးပါ..." အကွက် (`flex:1`) + "ပို့မည်" ခလုတ်ကို `display:flex; align-items:center; gap:8px` နဲ့ တစ်တန်းတည်း။
- "Powered by Netlify" floating badge ကို CSS (`display:none !important`) နဲ့ MutationObserver JS နှစ်ခုလုံးနဲ့ ဖျောက်။
- SQL မပြောင်း။ sw.js CACHE_VERSION = shwezatkhon-v23။

## R. v24 – Netlify Badge (Shadow DOM / fixed) ဖျောက်
- `index.html` ထဲ `setInterval` (၀.၅ စက္ကန့်) နဲ့ `querySelectorAll("*")` စစ်ပြီး shadowRoot ထဲ "Netlify" ပါတဲ့ element၊ ညာအောက်ခြေ `position:fixed` Netlify badge များကို `.remove()`။ `apk-dl-btn` နဲ့ အပြည့်မျက်နှာပြင် Player ကို မထိ။
- SQL မပြောင်း။ sw.js CACHE_VERSION = shwezatkhon-v24။
