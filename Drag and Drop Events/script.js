const button = document.querySelector("button");
const input = document.querySelector("#todo");
const boxs = document.querySelectorAll(".container>div");
button.addEventListener("click",displayInput);
function displayInput(){
    if(input.style.display==="none"){
        input.style.display="flex";
        return;
    }
    input.style.display="none";
}
input.addEventListener("keyup",(e)=>{
    if(e.keyCode===13){
        displayInput();
        let div = document.createElement("div");
        div.draggable=true;
        div.innerText=e.target.value;
        div.addEventListener("drag",drag);
        boxs[0].appendChild(div);
        e.target.value="";
    }
})
for (let i=0;i<boxs.length;i++){
    boxs[i].addEventListener("dragover",dragOver);
    boxs[i].addEventListener("drop",dragEnd);
}
let draggedElement;
function drag(e){
    draggedElement=e.target;
}
function dragOver(e){
    if(e.currentTarget.className===draggedElement.parentNode.className){
        return;
    }
    e.preventDefault();

}
function dragEnd(e){
    e.currentTarget.appendChild(draggedElement);
}