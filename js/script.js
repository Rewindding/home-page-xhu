var li_height=30;
var banner_divs=document.getElementsByClassName('b_img');
var discription=document.getElementById('b_discription');

function down_animo(ElemId,height,interval){
    var targetElement=document.getElementById(ElemId);
    if(parseInt(targetElement.style.height)==height) 
    { return true;}
    if(targetElement.movement) clearTimeout(targetElement.movement);
    targetElement.style.display="block";
    //targetElement.style.height="0px";
    var theight=parseInt(targetElement.style.height);
    if(theight>=height) theight-=2;
    else theight+=2;
    targetElement.style.height=theight+"px";
    var repeat="down_animo('"+ElemId+"',"+height+','+interval+")";
    targetElement.movement=setTimeout(repeat,interval);
}

function PredownMenue(){
    var uls=document.getElementsByClassName("down-menue");
    var i=0
    for( i;i<uls.length;++i){
        uls[i].style.height="0px";
        uls[i].style.display="none";
        var li_count=uls[i].getElementsByTagName('li').length;
        uls[i].parentElement.height=li_count*li_height;
        var this_id=uls[i].getAttribute('id');
        uls[i].parentElement.childId=this_id;
        uls[i].parentElement.onmouseover=function(){
            down_animo(this.childId,this.height,1);
            //down_animo(this_id,height,1);
            //this_id永远等于最后一次循环取得的id
            //在循环中绑定事件时，this_id没有立刻绑定，循环结束后，所有元素都会被绑定上最后一个id
        }
        uls[i].parentElement.onmouseout=function(){
            down_animo(this.childId,0,1);   
        }
    }
    this_id="down1";
}


function clickMove(obj,direction){
    var now=banner_divs[obj.now];
    var left=banner_divs[obj.left];
    var right=banner_divs[obj.right];

    if(direction=='right'){
        if(!obj.movement){//初始化位置
        right.style.left="100%";
        now.style.left="0";
        now.setAttribute('id','last_banner');
        right.setAttribute('id','front_banner');
        obj.movement=true;
        discription.innerHTML=right.firstElementChild.getAttribute('alt');
        }
        var right_P=parseFloat(right.style.left);
        var now_P=parseFloat(now.style.left);
        if(right_P==0&&now_P==-100) {//移动结束
            obj.movement=false;
            now.removeAttribute('id');
            obj.left=obj.now;
            obj.now=obj.right;
            obj.right=(obj.right+1)%banner_divs.length;
            return true;
        }
        else {
            right_P-=1; now_P-=1;
            right.style.left=right_P+"%";
            now.style.left=now_P+"%";
        }
        setTimeout(function(){
            clickMove(obj,direction);
        },1);
    }
    else if(direction=='left'){
        if(!obj.movement){//初始化位置
            left.style.left="-100%";
            now.style.left="0";
            now.setAttribute('id','last_banner');
            left.setAttribute('id','front_banner');
            obj.movement=true;
            discription.innerHTML=left.firstElementChild.getAttribute('alt');
        }
        var left_P=parseFloat(left.style.left);
        var now_P=parseFloat(now.style.left);
        if(left_P==0&&now_P==100) {//移动结束
            obj.movement=false;
            now.removeAttribute('id');
            obj.right=obj.now;
            obj.now=obj.left;
            obj.left=(obj.left-1)>=0? (obj.left-1)%banner_divs.length:banner_divs.length-1;
            //负数求余得到负数？？
            return true;
        }
        else {
            left_P+=1; now_P+=1;
            left.style.left=left_P+"%";
            now.style.left=now_P+"%";
        }
        setTimeout(function(){
            clickMove(obj,direction);
        },1);
    }
}
function banner(){
    for(var i=0;i<banner_divs.length;++i)
        banner_divs[i].style.left="0";
    var banner_obj=new Object();
    banner_obj.now=0;banner_obj.left=banner_divs.length-1;banner_obj.right=1;banner_obj.movement=false; 
    var infi=setInterval(function(){
        clickMove(banner_obj,'right');
    },3000);
    var buttons=document.getElementsByClassName('banner-button');
    buttons[0].onclick=function(){
        //考虑图片还未移动到位按钮点击的情况
        if(banner_obj.movement) return false;
        clearInterval(infi);
        clickMove(banner_obj,'right');
        infi=setInterval(function(){
            clickMove(banner_obj,'right');
        },3000);
    }
    buttons[1].onclick=function(){
        if(banner_obj.movement) return false;
        clearInterval(infi);
        clickMove(banner_obj,'left');
        infi=setInterval(function(){
            clickMove(banner_obj,'right');
        },3000);
    }
}


    PredownMenue();
    banner();
