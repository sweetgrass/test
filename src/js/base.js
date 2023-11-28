let lang = sessionStorage.getItem('lang')
console.log(lang);
if (lang == null) lang = /(cn|CN)/gi.test(navigator.language) ? 'cn' : 'en'
let cid = lang == 'cn' ? 'cnc' : 'enc'
document.getElementById(cid).style.display = 'flex'
document.getElementById('toindex').addEventListener('click',toIndex)
function toIndex(){
    location.href = '/cn/'
}
document.getElementById('showmenu').onclick = e => {
    let mc = document.getElementById('menuc');
    let show = mc.style.display == 'block'
    if (show) {
        mc.style.right = '-180px';
    }
    else {
        mc.style.right = '0'
    }
    let showtime = show ? 350 : 0;
    setTimeout(() => {
        mc.style.display = show ? 'none' : 'block';
    }, showtime);
}
window.addEventListener('scroll', addBG, { passive: true })
let timer = false;
function addBG(e) {
    if (timer) return;
    timer = true;
    setTimeout(() => {
        let hd = document.getElementById('header');
        if (document.documentElement.scrollTop != 0) {
            hd.style.background = 'rgba(0,0,0,0.3)'
        }
        else {
            hd.style.background = 'none'
        }
        timer = false;
    },300)
}