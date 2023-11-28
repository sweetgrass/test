window.addEventListener('scroll', addBG, { passive: true })
let timer1 = false;
function addBG(e) {
    if (timer1) return;
    timer1 = true;
    setTimeout(() => {
        caculatepos();
        timer1 = false;
    }, 30)
}
let ptable = document.getElementById('ptable')
let movediv = document.getElementById('moveit')
let scrollLabel = document.getElementById('scrollLabel')
let wh = window.innerHeight
let margintop = 250;
let num = 7;

let ts = 800 + 220 + margintop - wh / 2;//之前的元素加上第一个元素一半的值，再减去屏幕一半
let te = 800 + 220 + 500 * num - wh / 2 - 250;//在最后一个元素一半抵达中线值时取消固定
let range = te - ts;

function caculatepos() {
    let doc = document.documentElement;
    let sctop = doc.scrollTop;
    if (sctop >= ts && sctop <= te) {
        ptable.style.position = 'fixed'
        ptable.style.top = wh / 2 + 'px';
        let sltp = sctop + wh / 2 - 1020;
        console.log(sltp);
        scrollLabel.style.top = sltp + 'px'

        //计算右侧偏移量
        let p = (sctop - ts) / range;
        movediv.style.transform = `translateY(${(-85.714 * p - 7.14) + '%'})`//由于起始位置均跳过一半，所以整体值只为之前的(n-1)/n,且开头需要加上1/n的一半即1/2n;
        let idx = Math.floor((sctop) / 500);
        for (let i = 0; i < movediv.children.length; i++) {
            let op = 0.5;
            if (i == idx - 1) {
                op = 1
            }
            else {
                op = 0.3 - 0.3 * Math.abs(i + 1 - idx) / 6;
            }
            movediv.children[i].style.opacity = op;
        }
    }
    else if (sctop > te) {
        ptable.style.position = 'absolute'
        ptable.style.top = (500 * num - 250) + 'px';
        
    }
    else {
        ptable.style.position = 'absolute';
        ptable.style.top = margintop + 'px'
        scrollLabel.style.top = '250px'
    }
}
document.getElementById('moveit').addEventListener('click',scrollTo);
function scrollTo(e){
    console.log(e);
}