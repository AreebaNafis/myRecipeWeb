// Contact Me Modal
const contactMe = document.querySelector(".contactMe");
function myFunc2(){
    contactMe.classList.toggle('hidden');
 }

//Dark Mode
function myFunction(){
    var element =document.body;
    element.dataset.bsTheme = element.dataset.bsTheme == "light" ? "dark" : "light";
 }
 

//Timer Logic 
const playBtn = document.querySelector(".playBtn")
const timeBox = document.querySelector(".timeBox");
const timer = document.querySelector(".timer")

let seconds = localStorage.getItem("sec")||0;
let minutes = localStorage.getItem("min")||0;
let hours =  localStorage.getItem("h")|| 0;
let timerId;

timer.innerHTML =`${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`

// infoBtn.addEventListener('mouseover',()=>{
//     infoBox.classList.toggle('hidden');
// })
const reset = document.createElement("span");
reset.innerHTML = '<button id="reset" name = "reset"><svg id="reset" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path id="reset" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path id="reset" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>';


function handleClick (event){
    console.log(event.target.id);
    if(event.target.id === "play"){
        timeBox.appendChild(reset);
        playBtn.innerHTML ='<button name="stop" id="stop" ><svg id="stop" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop" viewBox="0 0 16 16"><path id="stop" d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"/></svg></button>';
        
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
    if(event.target.id === "stop"){
        clearInterval(timerId);
        localStorage.setItem("sec",seconds);
        localStorage.setItem("min",minutes);
        localStorage.setItem("h",hours);
    }
    if(event.target.id === "reset"){
        clearInterval(timerId);
        seconds = hours =minutes =0;
        timer.innerHTML = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
        timeBox.removeChild(reset);
        playBtn.innerHTML =' <svg  id="play" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16"><path  id="play" d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg>'
        localStorage.setItem("sec",seconds);
        localStorage.setItem("min",minutes);
        localStorage.setItem("h",hours);
    }

}
timeBox.addEventListener('click', handleClick);

// Notes App Logic
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const titleI = document.querySelector(".titleI");
const inputI = document.querySelector(".noteI");
const addBtn = document.querySelector(".add-btn");
let showPinned =document.querySelector(".pinned");
let showOthers = document.querySelector(".others");
let notesDisplay = document.querySelector(".notesDisplay");


// let localData = JSON.parse(localStorage.getItem("todos"));
let notesList = JSON.parse(localStorage.getItem("todos")) || [];

const addBtnHandler= ()=>{
    if(titleI.value.trim().length>0 || inputI.value.trim().length>0){
        notesList.push({id: uuid(), note: inputI.value,title:titleI.value, isPinned: false});
    }
    titleI.value="";
    inputI.value ="";
    localStorage.setItem("todos",JSON.stringify(notesList));
    showOthers.innerHTML =renderNotes(notesList);
}

addBtn.addEventListener('click', addBtnHandler);

const renderNotes=(List)=>{
    let newNote = List.map(({
        id,
        note,
        title,
        isPinned
    }) => 
    {
    return(
    `<li class="note"> 
        <div class="flexBtwn">
            <span class="notetitle">${(title.slice(0,1).toUpperCase() + title.slice(1,title.length))}
            </span>
            <div class="btnDiv" data-id="${id}">
                <span class='pin-btn ${isPinned ? "material-icons" : "material-icons-outlined" }' data-type =pin data-pinned=${isPinned} data-id="${id}"> push_pin </span>
                <span class="material-icons-outlined del-btn" data-id="${id}" data-type="delete">delete</span>
            </div>
        </div>
        <hr class="seperator">
        <div class="flex" data-id="${id}">${note}</div>
   </li>`)
   });
   newNote = newNote.join("");
    return newNote;
}


notesDisplay.addEventListener('click',(event)=>{
    // console.log();
    const clickedNoteId=event.target.dataset.id;
    const clickedNoteType= event.target.dataset.type;
    switch (clickedNoteType){
        case "delete":
            notesList = notesList.filter(({id})=> id.toString()!==clickedNoteId);
            showOthers.innerHTML = renderNotes(notesList.filter(({isPinned})=>!isPinned));
            showPinned.innerHTML = renderNotes(notesList.filter(({isPinned})=>isPinned));
            localStorage.setItem("todos",JSON.stringify(notesList));
            break;
        case "pin":
            notesList =notesList.map((note)=> note.id.toString()===clickedNoteId? {...note,isPinned:!note.isPinned}:note);
            showOthers.innerHTML = renderNotes(notesList.filter(({isPinned})=>!isPinned));
            showPinned.innerHTML = renderNotes(notesList.filter(({isPinned})=>isPinned));
            localStorage.setItem("todos",JSON.stringify(notesList));
            break;
        default: 
        console.log("");
    }
});

showOthers.innerHTML =renderNotes(notesList);

// input field handler
document.querySelectorAll('input').forEach( el => {
    // console.log(el);
    el.addEventListener('keydown', e => {
        // console.log(e.key);
        if(e.key === "Enter") {
            let nextEl = el.nextElementSibling;
            // console.log(nextEl)
            if(nextEl.nodeName === 'INPUT') {
                nextEl.focus();
            }else{
                addBtnHandler();
            }
        }
    })
})


// recipe card

import {data} from "./data.js";

const rCard = document.querySelector(".recipeCard");
const rTi = document.querySelector(".rTi");
const rImg = document.querySelector(".rImg");

const prevRecBtn = document.querySelector(".prevRecBtn");
const nextRecBtn = document.querySelector(".nextRecBtn");
const currPage = document.querySelector(".currPage");

const currRecipeId= localStorage.getItem("recipeId");

const currRecipeObject = data.find((item)=>item.id===currRecipeId);


const renderRecipe = (currRecipeObject)=>{
    const imgSrc = `./assets/${currRecipeObject.thumbnail}`;
    return(
        `<div class="recipeHead col-12 d-flex align-items-center justify-content-center"><h3 class="rTi">${currRecipeObject.name}</h3></div>

    <div class="imgctn col-xs-12 col-md-5 col-xxl-5">
        <img class="img-fluid rImg" src="${imgSrc}" alt="Kawab Picture">
    </div>
    <div class="ingredients col-xs-12 col-md-6  offset-1 col-xxl-4 ">
        <h4>Ingredients</h4>
        <ul class=" ingredientsList"></ul>
    </div>
    <div class=" instructions instructionsList col-12 ">
        <h4>Instructions</h4>
        <ul class=" instructionsList"></ul>
    </div>
    <div class="recipeFooter col-12">
        <nav>
            <ul class="pagination justify-content-center" data-bs-keyboard="true">

                <li id="preRecBtn" class="pageitem"><button data-bs-keyboard="true" id="preRecBtn" class="disabled1"><span id="preRecBtn" class = "material-icons-outlined">arrow_back_ios</span>
                </button></li>

                <li id="x" class="pageitem my-auto cPC"><span id="x" class="currPage">${currRecipeObject.name}</span></li>

                <li class="pageitem" id ="nextRecBtn"><button data-bs-keyboard="true" id ="nextRecBtn" class="disabled2" >
                    <span id ="nextRecBtn" class="material-icons-outlined"> arrow_forward_ios</span>
                </button></li>
            </ul>
        </nav>
    </div>`
    );
}


const renderInstructionList = ((List)=>{
    List.map((item,index)=>{
        const spanItem = document.createElement("span");
        spanItem.innerHTML=`STEP-${index+1}:`;
        const listItem = document.createElement("li");
        listItem.appendChild(spanItem);
        listItem.appendChild(document.createTextNode(" " + item));
        document.querySelector(".instructionsList").appendChild(listItem);
    });
})
const renderIngredientsList = ((List)=>{
    List.map((item)=>{
        const listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(item));
        document.querySelector(".ingredientsList").appendChild(listItem);
    });
})


rCard.innerHTML =renderRecipe(currRecipeObject);
renderInstructionList(currRecipeObject.instructions);
renderIngredientsList(currRecipeObject.ingredients);

if(currRecipeId==="1"||currRecipeId==="4"||currRecipeId==="7"){
   document.querySelector(".disabled1").setAttribute("disabled",'');
}
if(currRecipeId==="3"||currRecipeId==="6"||currRecipeId==="9"){
    document.querySelector(".disabled2").setAttribute("disabled",'');
 }

document.querySelector(".pagination").addEventListener('click',(e)=>{
 console.log(e.target.id);
 if(e.target.id==="nextRecBtn"){
    localStorage.setItem("recipeId",`${Number(currRecipeId)+1}`);
    window.location.reload("true");
 }
 if(e.target.id==="preRecBtn"){
    localStorage.setItem("recipeId",`${Number(currRecipeId)-1}`);
    window.location.reload("true");
 }
});

window.addEventListener('keydown',(ev)=>{
    if(ev.key==="ArrowRight"){
        if(currRecipeId<9){
        localStorage.setItem("recipeId",`${Number(currRecipeId)+1}`);
        window.location.reload("true");
    }
    }
    if(ev.key==="ArrowLeft"){
        if(currRecipeId>1){
        localStorage.setItem("recipeId",`${Number(currRecipeId)-1}`);
        window.location.reload("true");
        }
    }
});

$(window).on('resize', function (ev) { ev.preventBubble(); });



