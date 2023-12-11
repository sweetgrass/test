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
let prevtop = 0;
function caculatepos() {
    let doc = document.documentElement;
    let sctop = doc.scrollTop;
    if (sctop >= ts && sctop <= te) {
        ptable.style.position = 'fixed'
        ptable.style.top = wh / 2 + 'px';
        let sltp = sctop + wh / 2 - 1020;
        let mode = (sctop-prevtop)>0;
        prevtop = sctop;
        // console.log(sltp);
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
            //相邻元素判断
            else if(i == idx-2){
                op = mode?0.1:0.2;
            }
            else if(i == idx){
                op = mode?0.2:0.1
            }
            else {
                op = 0.1 - 0.09 * Math.abs(i + 1 - idx) / 6;
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
document.getElementById('moveit').addEventListener('click',sct);
function sct(e){
    let target = e.target
    if(target.className == 'productname'){
        let id = target.parentNode.dataset.id;
        document.documentElement.scrollTop = (800+220+id*500+250-wh/2)
    }
}

const mvc = document.getElementById('mvc');
const hisc = document.getElementById('hisc')
let isdrag = false;
const pd = e => {
    if(e.target.id == 'gear') isdrag = true;
}
const pu = e => {
    isdrag = false;
};
let dragid = null
let timeline = [
    {time:'2002',t:0.089},
    {time:'2004',t:0.25},
    {time:'2005',t:0.4},
    {time:'2012',t:0.45},
    {time:'2016',t:0.6}
]
const pm = e => {
    if(isdrag){
        let sx = e.screenX;
        let p = sx/window.innerWidth;
        if(p>0.07&&p<0.93){
            mvc.style.left = p*100+'%';
            for(let i = 0;i < timeline.length;i++){
                let n = timeline[i]
                let bt = 0.6;
                // let st = 'none';
                if(Math.abs(p-n.t) < 0.025){
                    bt = 1;
                    // st = 'block'
                }
                document.getElementById(n.time).style.filter = `brightness(${bt})`;
                // document.getElementById(n.time+'t').style.display = st;
            }
            
        }
    }
}
hisc.addEventListener('pointerdown',pd)
hisc.addEventListener('pointermove',pm,{passive:true})
hisc.addEventListener('pointerup',pu)
window.addEventListener('pointerup',pu)
