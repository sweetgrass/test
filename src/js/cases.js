document.getElementById('switch').addEventListener('click',e=>{
    let t = e.target;
    let n = t;
    while(t.dataset.type==undefined&&t.className!='switch'){
        n = t.parentNode;
        t = n;
    }
    if(n.dataset.type){
        let type = n.dataset.type;
        console.log(type);
        for(let i = 1;i <= 4;i++){
            let dis = 'none';
            if(i == type*1) dis = 'flex'
            document.getElementById('type'+i).style.display = dis;
        }
    }
    
})