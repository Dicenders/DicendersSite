/*function time()
{
today=new Date();
h=today.getHours();
m=today.getMinutes();
s=today.getSeconds();
document.getElementById('clock').innerHTML=h+":"+m+":"+s;
setTimeout('time()',500);
}*/

function timer(){
            /*today = new Date;
            h = today.getHours();
            m = today.getMinutes();
            s = today.getSeconds();

            if (s<10){
                s = '0' + s;
            };
            if (m<10){
                m = '0' + s;
            }
            if (h<10){
                h = '0' + h;
            } 

            document.getElementById('clock').innerHTML=h+":"+m+":"+s;
            setTimeout("timer()", 500);*/

var myTime = new Date("august 30, 9999 21:00:00").getTime();
today = new Date().getTime();
distance = myTime - today;

var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);

if (seconds<10){
    seconds = '0' + seconds;
};
if (minutes<10){
    minutes = '0' + minutes;
}
if (hours<10){
    hours = '0' + hours;
} 

document.getElementById('clock').innerHTML=hours+":"+minutes+":"+seconds;
if(hours == 0 && minutes == 0 && seconds == 0){
    i = i+1;
    console.log("alô");
}
setTimeout("timer()", 500);
}