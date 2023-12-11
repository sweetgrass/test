gsap.registerPlugin(ScrollTrigger);

//滑动定位菜单
let movediv = document.getElementById('moveit')
let scrollLabel = document.getElementById('scrollLabel')
let lineprog = document.getElementById('lineprog')
let total = 7;
let scrollRange = (total - 1) * 100 / total;//触发和结束位置均为单个元素高度的一半，故需要减一，并且头部加上offtop值。
let offtop = 100 / (total * 2)
ScrollTrigger.create({
    trigger: '.rightc',
    start: () => "+=" + document.querySelector('.product').offsetHeight / 2 + " center",
    end: "bottom-=" + document.querySelector('.product').offsetHeight / 2 + " center",
    pin: "#ptable",
    // markers: true,
    onUpdate: self => {
        let p = self.progress.toFixed(3);
        lineprog.style.height = 100*p+'%';
        gsap.to("#moveit", {
            css: { translateY: (-1 * scrollRange * p - offtop) + '%' },
            duration: .01
        })
        let mode = self.direction > 0;
        let step = 1 / total;
        let idx = Math.floor((0.5 * step + (1 - step) * p) / step)//初始偏移量半个step,整体滑动距离为total-1/total个step
        for (let i = 0; i < movediv.children.length; i++) {
            let op = 0.5;
            if (i == idx) {
                op = 1
            }
            //相邻元素判断
            else if (i == idx - 1) {
                op = mode ? 0.1 : 0.2;
            }
            else if (i == idx + 1) {
                op = mode ? 0.2 : 0.1
            }
            else {
                op = 0.1 - 0.09 * Math.abs(i + 1 - idx) / 6;
            }
            movediv.children[i].style.opacity = op;
        }
    }
})
//左侧标识
ScrollTrigger.create({
    trigger: '.rightc',
    start: () => "+=" + document.querySelector('.product').offsetHeight / 2 + " center",
    end: "bottom-=" + document.querySelector('.product').offsetHeight / 2 + " center",
    pin: "#scrollLabel"
})
//点击跳转
document.getElementById('moveit').addEventListener('click', sct);
function sct(e) {
    let target = e.target
    if (target.className == 'productname') {
        let id = target.parentNode.dataset.id;
        // document.documentElement.scrollTop = (800+220+id*500+250-window.innerHeight/2)
        let sh = document.querySelector('.product').offsetHeight;
        gsap.to(document.documentElement, {
            duration: .3,
            scrollTop: (800 + 220 + id * sh + sh / 2 - window.innerHeight / 2),
        })
    }
}
//发展历史交互
const mvc = document.getElementById('mvc');
const hisc = document.getElementById('hisc')
let isdrag = false;
const pd = e => {
    if (e.target.id == 'gear') isdrag = true;
}
const pu = e => {
    isdrag = false;
};
let dragid = null
let timeline = [
    { time: '2002', t: 0.089 },
    { time: '2004', t: 0.25 },
    { time: '2005', t: 0.4 },
    { time: '2012', t: 0.45 },
    { time: '2016', t: 0.6 }
]
const pm = e => {
    if (isdrag) {
        let sx = e.screenX;
        let p = sx / window.innerWidth;
        if (p > 0.07 && p < 0.93) {
            mvc.style.left = p * 100 + '%';
            for (let i = 0; i < timeline.length; i++) {
                let n = timeline[i]
                let bt = 0.6;
                // let st = 'none';
                if (Math.abs(p - n.t) < 0.025) {
                    bt = 1;
                    // st = 'block'
                }
                document.getElementById(n.time).style.filter = `brightness(${bt})`;
                // document.getElementById(n.time+'t').style.display = st;
            }

        }
    }
}
hisc.addEventListener('pointerdown', pd)
hisc.addEventListener('pointermove', pm, { passive: true })
hisc.addEventListener('pointerup', pu)
window.addEventListener('pointerup', pu)