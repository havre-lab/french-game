var qs=document.querySelectorAll("select");
var locks=document.querySelectorAll("button");
var bools=[false,false]

var submit=document.getElementById("submit");
var result=document.getElementById("result");


var lastTime=performance.now();
var changes=0;
var changeTime=0;
var currentChange=0;
var deltaDiff=5/1000*60;


function refreshTick(){
    var currentTime=performance.now();
    var delta=(currentTime-lastTime)/1000*60;
    lastTime=performance.now();
    changeTime+=delta;
    changes=Math.floor(changeTime/deltaDiff);
    changeTime%=deltaDiff;
    for(var i=0;i<changes;i++){
        currentChange++;
        for(var j=0;j<qs.length;j++){
            if(!bools[j] && currentChange%(160/2**j)==0){
                qs[j].selectedIndex=(qs[j].selectedIndex+1)%qs[j].options.length;
            }
            
        }
        
    }


    requestAnimationFrame(refreshTick);
}

requestAnimationFrame(refreshTick);

for(let i=0; i<locks.length; i++){
    locks[i].onclick=function(){
        bools[i]=!bools[i];
        if(bools[i]){
            qs[i].setAttribute("disabled",true);
        }else{
            qs[i].removeAttribute("disabled");
        }
    }
}

document.getElementById("submit").onclick=function(){
    var score=0;
    
    for(let i=0;i<qs.length;i++){
        if(qs[i].value==1){
            score++;
        }
    }
    var feedback;
    switch(score){
        case 0: feedback="You are a failure. I advise you to stop learning french. You are a disgrace to us both. I regret making this"; break;      
        case 1: feedback="At this point, just guess random options to get a higher score."; break;
        case 2: feedback="Someone who doesn't speak French can probably get a higher score by chosing randomly."; break;
        case 3: feedback="You should really study more. "; break;
        case 4: feedback="You should study some more."; break;
        case 5: feedback="It's okay, but you should study more."; break;
        case 6: feedback="Good, but not the best. Keep up the great work!"; break;        
        case 7: feedback="Great! You have studied well."; break;
        case 8: feedback="Incredible! You know your French adjectives well."; break;
        case 9: feedback="Unbelievable! You are a French adjective genius!"; break;
        case 10: feedback="Outstanding work! I'm impressed."; break;
    }
    result.innerHTML="Your score is "+score+"/"+qs.length+". <br>"+feedback;
}