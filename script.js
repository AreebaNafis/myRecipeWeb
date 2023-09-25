const contactMe =document.querySelector(".contactMe");
const infoBox = document.querySelector(".infoBox");
const infoBtn = document.querySelector(".infoBtn")
const playBtn = document.querySelector(".playBtn")
const timeBox = document.querySelector(".timeBox");
const timer = document.querySelector(".timer")

let seconds = 0;
let minutes =0;
let hours = 0;
let timerId;

function myFunction(){
   var element =document.body;
   element.dataset.bsTheme = element.dataset.bsTheme == "light" ? "dark" : "light";
}

function myFunc2(x){
   x.classList.toggle('hidden');
}
// infoBtn.addEventListener('mouseover',()=>{
//     infoBox.classList.toggle('hidden');
// })
const reset = document.createElement("span");
reset.innerHTML = '<button name = "reset"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>';


function handleClick (event){
    console.log(event.target.parentElement.name);
    if(event.target.parentElement.name === "play"){
        playBtn.innerHTML ='<button name="stop"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop" viewBox="0 0 16 16"><path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"/></svg></button>';
        timeBox.appendChild(reset);
        timerId=setInterval(()=>{
            seconds++;
            if (seconds>59){
                minutes++;
                seconds =0;
            }
            if (minutes>59){
                hours++;
                minutes=0; 
            }
            timer.innerHTML = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
        },1000);
    }
    if(event.target.parentElement.name === "stop"){
        clearInterval(timerId);
    }
    if(event.target.parentElement.name === "reset"){
        clearInterval(timerId);
        seconds = hours =minutes =0;
        timer.innerHTML = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
        timeBox.removeChild(reset);
        playBtn.innerHTML =' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg>'
    }
    


}
timeBox.addEventListener('click', handleClick);