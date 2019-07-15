var li_height=30;

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
        var height=li_count*li_height;
        var this_id=uls[i].getAttribute('id');
        uls[i].parentElement.childId=this_id;
        uls[i].parentElement.onmouseover=function(){
            down_animo(this.childId,height,1);
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


window.onload=function(){
    PredownMenue();
    
}