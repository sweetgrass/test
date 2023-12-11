let news = [
    {
        title:'三一路机来访',
        time:'2023-11-08',
        pic:'/src/news/a.png',
        breif:'11月6日三一重机段乾坤（路机研究院院长）王建立（电控液压所所长）陈日（电动化所所长）等一行人到访金坛微特电机有限公司。',
        link:'/news/1.html'
    },
    {
        title:'三一路机来访',
        time:'2023-11-08',
        pic:'/src/news/a.png',
        breif:'11月6日三一重机段乾坤（路机研究院院长）王建立（电控液压所所长）陈日（电动化所所长）等一行人到访金坛微特电机有限公司。',
        link:'/news/1.html'
    },
    {
        title:'三一路机来访',
        time:'2023-11-08',
        pic:'/src/news/a.png',
        breif:'11月6日三一重机段乾坤（路机研究院院长）王建立（电控液压所所长）陈日（电动化所所长）等一行人到访金坛微特电机有限公司。',
        link:'/news/1.html'
    },
]
let frag = '';
for(let i = 0;i < news.length;i++){
    let n = news [i]
    frag += `
        <div class="newnode" data-link="${n.link}">
            <div class="newpic"><img src="${n.pic}"/></div>
            <div class="newtitlec">
                <div class="newtitle">${n.title}</div>
                <div class="newtip">查看详情</div>
            </div>
            <div class="newbc">
                <div class="newb">${n.breif}</div>
                <div class="ndate">${n.time}</div>
            </div>
        </div>
    `
}
document.getElementById('newc').innerHTML = frag;
document.getElementById('newc').addEventListener('click',e=>{
    let t = e.target;
    let n = t;
    while(t.dataset.link==undefined&&t.id!='newc'){
        n = t.parentNode;
        t = n;
    }
    if(n.dataset.link) window.open(n.dataset.link)
    // console.log(n.dataset);
})