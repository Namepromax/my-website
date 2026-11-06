/* main.js - scripts for all pages (ES5, var only) */

/* events data */
var CATS = { tech:'تقنية', culture:'ثقافة', sport:'رياضة', music:'موسيقى', family:'عائلي', career:'مهنية' };
var MONTHS = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
var EVENTS = [
 {id:1,title:'مؤتمر الذكاء الاصطناعي في التعليم',cat:'tech',date:'2026-11-01',loc:'القاعة الكبرى',featured:true,desc:'جلسات وورش عن تطبيقات الذكاء الاصطناعي في التعلم الافتراضي.',full:'يجمع المؤتمر باحثين ومختصين لمناقشة تطبيقات الذكاء الاصطناعي في بيئات التعلم الافتراضي، مع جلسات عملية وورش قصيرة وفرصة للتعرف على مشاريع الطلاب.'},
 {id:2,title:'معرض الوظائف الافتراضي',cat:'career',date:'2026-11-05',loc:'منصة البث',featured:true,desc:'قابل ممثلي أكثر من 30 شركة وقدّم سيرتك مباشرة.',full:'معرض يضم أكثر من 30 شركة. يمكنك رفع سيرتك الذاتية والمشاركة في مقابلات تعريفية سريعة وحضور جلسات نصائح التوظيف.'},
 {id:3,title:'أمسية الشعر والأدب',cat:'culture',date:'2026-11-22',loc:'المكتبة',featured:false,desc:'أمسية مفتوحة لإلقاء النصوص ومناقشتها مع أساتذة اللغة العربية.',full:'أمسية مفتوحة لطلاب الجامعة لإلقاء النصوص الأدبية ومناقشتها مع أساتذة اللغة العربية، يتبعها حوار مفتوح مع الجمهور.'},
 {id:4,title:'بطولة الشطرنج الجامعية',cat:'sport',date:'2026-11-27',loc:'الملعب الافتراضي',featured:true,desc:'تصفيات مباشرة بين كليات الجامعة والتسجيل مفتوح للجميع.',full:'بطولة بنظام التصفيات المباشرة بين كليات الجامعة. التسجيل مفتوح لجميع الطلاب، وتُمنح جوائز للمراكز الثلاثة الأولى.'},
 {id:5,title:'ورشة أساسيات تطوير الويب',cat:'tech',date:'2026-12-03',loc:'مبنى الحاسب',featured:false,desc:'ورشة تطبيقية لبناء أول صفحة ويب خطوة بخطوة.',full:'ورشة تطبيقية تغطي HTML وCSS وJavaScript وBootstrap لبناء أول صفحة ويب خطوة بخطوة مع مدرّب متخصص.'},
 {id:6,title:'حفل الموسيقى الجامعي',cat:'music',date:'2026-12-08',loc:'القاعة الكبرى',featured:true,desc:'عروض موسيقية لطلاب الجامعة وفرق الأندية الفنية.',full:'حفل تقدمه فرق الأندية الفنية بمشاركة عازفين ومغنين من الطلاب، ويتضمن فقرات تفاعلية مع الحضور.'},
 {id:7,title:'يوم العائلة الجامعي',cat:'family',date:'2026-12-15',loc:'الملعب الافتراضي',featured:false,desc:'فعاليات وألعاب ومسابقات مناسبة لجميع أفراد العائلة.',full:'يوم ترفيهي يدعو الطلاب وعائلاتهم لمسابقات وألعاب جماعية وعروض ترفيهية للأطفال.'},
 {id:8,title:'مهرجان الفنون الرقمية',cat:'culture',date:'2026-12-20',loc:'المكتبة',featured:false,desc:'معرض تفاعلي لأعمال الطلاب في التصميم والرسوم الرقمية.',full:'معرض تفاعلي لأعمال الطلاب في التصميم والرسوم الرقمية والتصوير، مع ورش قصيرة يقدمها فنانون زائرون.'}
];

/* helper functions */
function parseDate(s){ var p = s.split('-'); return new Date(parseInt(p[0],10), parseInt(p[1],10)-1, parseInt(p[2],10)); }
function formatDate(s){ var d = parseDate(s); return d.getDate()+' '+MONTHS[d.getMonth()]+' '+d.getFullYear(); }
function pad(n){ return (n<10?'0':'')+n; }
function ymd(d){ return d.getFullYear()+''+pad(d.getMonth()+1)+pad(d.getDate()); }
function findEvent(id){ for (var i=0;i<EVENTS.length;i++){ if (EVENTS[i].id===id){ return EVENTS[i]; } } return null; }
function img(e){ return 'assets/img/cat-'+e.cat+'.svg'; }

/* badge for events that are today or within a week */
function dayBadge(e){
  var t = new Date(); t.setHours(0,0,0,0);
  var diff = Math.round((parseDate(e.date) - t) / 86400000);
  if (diff === 0){ return '<span class="badge bg-danger badge-today">الحدث اليوم</span>'; }
  if (diff > 0 && diff <= 7){ return '<span class="badge bg-warning text-dark badge-today">هذا الأسبوع</span>'; }
  return '';
}
/* builds one event card */
function cardHTML(e){
  return '<div class="col"><div class="card shadow-sm card-wrap">' + dayBadge(e) +
    '<img class="card-img-top" src="'+img(e)+'" alt="'+e.title+'">' +
    '<div class="card-body d-flex flex-column"><span class="badge bg-primary align-self-start mb-2">'+CATS[e.cat]+'</span>' +
    '<h5 class="card-title">'+e.title+'</h5>' +
    '<p class="small text-secondary mb-1">'+formatDate(e.date)+' | '+e.loc+'</p>' +
    '<p class="card-text small">'+e.desc+'</p>' +
    '<a class="btn btn-primary mt-auto" href="event.html?id='+e.id+'">التفاصيل</a></div></div></div>';
}
function renderCards(list, id){
  var h = '';
  for (var i=0;i<list.length;i++){ h += cardHTML(list[i]); }
  document.getElementById(id).innerHTML = h;
}

/* home page */
function initSlider(){
  var feat = [], h = '', i;
  for (i=0;i<EVENTS.length;i++){ if (EVENTS[i].featured){ feat.push(EVENTS[i]); } }
  for (i=0;i<feat.length;i++){
    h += '<div class="slide" style="background-image:url('+img(feat[i])+')"><div class="container">' +
      '<span class="badge bg-warning text-dark align-self-start mb-2">'+CATS[feat[i].cat]+' | '+formatDate(feat[i].date)+'</span>' +
      '<h2>'+feat[i].title+'</h2><p>'+feat[i].desc+'</p>' +
      '<a class="btn btn-warning align-self-start" href="event.html?id='+feat[i].id+'">التفاصيل</a></div></div>';
  }
  document.getElementById('slides').innerHTML = h;
  var slides = $('#slides .slide'), cur = 0;
  function show(n){ cur = (n + slides.length) % slides.length; slides.removeClass('on').eq(cur).fadeIn(0).addClass('on'); }
  show(0);
  $('#next').click(function(){ show(cur-1); });
  $('#prev').click(function(){ show(cur+1); });
  setInterval(function(){ show(cur+1); }, 5000);
}
function initHome(){
  initSlider();
  var h = '', k;
  for (k in CATS){ h += '<a class="btn btn-outline-primary rounded-pill" href="events.html?cat='+k+'"><span class="badge bg-primary">'+CATS[k]+'</span></a> '; }
  document.getElementById('chips').innerHTML = h;
  var s = EVENTS.slice().sort(function(a,b){ return a.date < b.date ? -1 : 1; });
  renderCards(s.slice(0,6), 'latest');
}

/* events page: search + filters, chosen category is saved in localStorage */
function filterEvents(){
  var q = document.getElementById('q').value.toLowerCase();
  var cat = document.getElementById('fcat').value, loc = document.getElementById('floc').value, from = document.getElementById('fdate').value;
  var res = [];
  for (var i=0;i<EVENTS.length;i++){
    var e = EVENTS[i];
    if (q !== '' && e.title.toLowerCase().indexOf(q) === -1){ continue; }
    if (cat !== '' && e.cat !== cat){ continue; }
    if (loc !== '' && e.loc !== loc){ continue; }
    if (from !== '' && e.date < from){ continue; }
    res.push(e);
  }
  renderCards(res, 'list');
  document.getElementById('count').innerHTML = 'عدد النتائج: ' + res.length;
  $('#empty').toggleClass('d-none', res.length !== 0);
}
function initEvents(){
  var i, c, seen = {}, h = '<option value="">كل التصنيفات</option>';
  for (c in CATS){ h += '<option value="'+c+'">'+CATS[c]+'</option>'; }
  document.getElementById('fcat').innerHTML = h;
  h = '<option value="">كل المواقع</option>';
  for (i=0;i<EVENTS.length;i++){ if (!seen[EVENTS[i].loc]){ seen[EVENTS[i].loc] = true; h += '<option>'+EVENTS[i].loc+'</option>'; } }
  document.getElementById('floc').innerHTML = h;
  var m = /[?&]cat=(\w+)/.exec(window.location.search), pref = null;
  try { pref = window.localStorage.getItem('prefCat'); } catch (err) {}  // last chosen category
  var start = m ? m[1] : pref;
  if (start && CATS[start]){ document.getElementById('fcat').value = start; }
  $('#q').on('keyup', filterEvents);
  $('#fcat').on('change', function(){ try { window.localStorage.setItem('prefCat', this.value); } catch (err) {} filterEvents(); });
  $('#floc, #fdate').on('change', filterEvents);
  $('#reset').click(function(){ $('#q, #fcat, #floc, #fdate').val(''); try { window.localStorage.removeItem('prefCat'); } catch (err) {} filterEvents(); });
  filterEvents();
}

/* event details page */
function initEvent(){
  var m = /[?&]id=(\d+)/.exec(window.location.search);
  var e = m ? findEvent(parseInt(m[1],10)) : EVENTS[0];   // no id in the url -> show the first event
  if (!e){ document.getElementById('evBox').innerHTML = '<div class="alert alert-warning">لم يتم العثور على الفعالية. <a href="events.html">العودة للفعاليات</a></div>'; return; }
  document.title = e.title + ' - دليل الفعاليات';
  document.getElementById('evImg').src = img(e);
  document.getElementById('evTitle').innerHTML = e.title;
  document.getElementById('evTag').innerHTML = CATS[e.cat];
  document.getElementById('evDate').innerHTML = formatDate(e.date);
  document.getElementById('evLoc').innerHTML = e.loc;
  document.getElementById('evDesc').innerHTML = e.full;
  document.getElementById('evMapCap').innerHTML = 'موقع الفعالية: ' + e.loc;
  /* google calendar link (all-day event) */
  var d = parseDate(e.date), n = new Date(d.getTime() + 86400000);
  document.getElementById('calBtn').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent(e.title) + '&dates=' + ymd(d) + '/' + ymd(n) + '&location=' + encodeURIComponent(e.loc);
  /* share links */
  var url = window.location.href;
  document.getElementById('waBtn').href = 'https://wa.me/?text=' + encodeURIComponent(e.title + ' ' + url);
  $('#copyBtn').click(function(){ window.prompt('انسخ رابط الفعالية:', url); });
  /* related events */
  var rel = [], i;
  for (i=0;i<EVENTS.length;i++){ if (EVENTS[i].cat === e.cat && EVENTS[i].id !== e.id){ rel.push(EVENTS[i]); } }
  if (rel.length === 0){ rel = [EVENTS[e.id % EVENTS.length], EVENTS[(e.id + 1) % EVENTS.length]]; }
  renderCards(rel, 'related');
  /* booking modal (demo only, nothing is sent) */
  $('#bookForm').on('submit', function(ev){
    ev.preventDefault();
    var nm = $.trim($('#bname').val()), ml = $.trim($('#bemail').val()), box = $('#bookAlert');
    if (!/^[\u0621-\u064Aa-zA-Z ]{3,40}$/.test(nm) || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(ml)){
      box.attr('class', 'alert alert-danger').text('تحقق من الاسم والبريد الإلكتروني ثم أعد المحاولة.');
    } else {
      box.attr('class', 'alert alert-success').text('تم حجز مكانك في الفعالية بنجاح (حجز تجريبي).');
      this.reset();
    }
  });
}

/* contact form validation */
function setErr(id, msg){ document.getElementById(id+'Err').innerHTML = msg; $('#'+id).toggleClass('is-invalid', msg !== ''); }
function validateForm(){
  var name = $.trim($('#name').val()), mail = $.trim($('#email').val()), msg = $.trim($('#msg').val()), ok = true;
  if (!/^[\u0621-\u064Aa-zA-Z ]{3,40}$/.test(name)){ setErr('name','أدخل اسماً من 3 إلى 40 حرفاً بدون أرقام'); ok = false; } else { setErr('name',''); }
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(mail)){ setErr('email','أدخل بريداً صحيحاً مثل name@example.com'); ok = false; } else { setErr('email',''); }
  if (msg.length < 10){ setErr('msg','الرسالة قصيرة، اكتب 10 أحرف على الأقل'); ok = false; } else { setErr('msg',''); }
  return ok;
}
function initContact(){
  $('#msg').on('keyup', function(){ $('#cnt').text(this.value.length + ' / 500'); });
  $('#contactForm').on('submit', function(ev){
    ev.preventDefault();
    var box = $('#alertBox');
    if (validateForm()){ box.attr('class','alert alert-success').text('تم إرسال رسالتك بنجاح. سنرد عليك قريباً.'); this.reset(); $('#cnt').text('0 / 500'); }
    else { box.attr('class','alert alert-danger').text('يوجد أخطاء في النموذج. صحّح الحقول المعلّمة ثم أعد المحاولة.'); }
  });
}

/* dark mode and back-to-top button */
function initCommon(){
  var dark = null;
  try { dark = window.localStorage.getItem('theme'); } catch (err) {}
  if (dark === 'dark'){ document.documentElement.setAttribute('data-bs-theme','dark'); }
  $('#themeBtn').click(function(){
    var now = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', now);
    try { window.localStorage.setItem('theme', now); } catch (err) {}
  });
  $(window).scroll(function(){ $('#toTop').toggle($(window).scrollTop() > 300); });
  $('#toTop').click(function(){ $('html, body').animate({scrollTop:0}, 400); });
}

$(document).ready(function(){
  initCommon();
  var page = document.body.getAttribute('data-page');
  if (page === 'home'){ initHome(); } else if (page === 'events'){ initEvents(); }
  else if (page === 'event'){ initEvent(); } else if (page === 'contact'){ initContact(); }
});
