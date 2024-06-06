const head = document.querySelector(".head")
const body = document.querySelector(".body")
const cell = document.querySelector(".cellInfo");
const fx = document.querySelector("#fx");
const form = document.querySelector("form");
const form2 = document.querySelector(".form2")
const button = document.querySelector(".form2 button");
let currentSheet = "sheet1",textSheet = "text1";
let colums = 27;
let rows = 51;
let defaultStyles = {
    fontFamily:"Times New Roman",
    fontSize:16,
    bold:false,
    underline:false,
    italic:false,
    textAlign:"left",
    textColor:"#000000",
    bgColor:"#ffffff"
}
let stylesCell = {};
let text = {}
for (let i=0;i<colums;i++){
    let div = document.createElement("div");
    i===0?div.className="cell1":
    ((div.className="cell") && (div.innerText=String.fromCharCode(64+i)));
    head.appendChild(div);
}
let selectedCell;
function cellInfo(e){
    if(selectedCell){
        document.getElementById(selectedCell).classList.remove("activeCell");
    }
    selectedCell=e.target.id;
    cell.innerText=selectedCell;
    document.getElementById(selectedCell).classList.add("activeCell");
    if(!stylesCell[selectedCell]){
        stylesCell[selectedCell]=defaultStyles;
    }
    applyCurrentStylestoselectedCell();
}
function applyCurrentStylestoselectedCell(){
    for (let key in stylesCell[selectedCell]){
        form[key].type==="checkbox"?
        form[key].checked=stylesCell[selectedCell][key]:
        form[key].value=stylesCell[selectedCell][key];
    }
}
function textCells(e){
    text[e.target.id]=e.target.innerText;
}
fx.addEventListener("keyup",actions);
function actions(e){
    if(e.keyCode===13 && selectedCell){
        let result = eval(e.target.value);
        document.getElementById(selectedCell).innerText=result;
    }
}
form.addEventListener("change",()=>{
    let currentStyles = {
        fontFamily:form.fontFamily.value,
        fontSize:Number(form.fontSize.value),
        bold:form.bold.checked,
        underline:form.underline.checked,
        italic:form.italic.checked,
        textAlign:form.textAlign.value,
        textColor:form.textColor.value,
        bgColor:form.bgColor.value,
    }
    let element = document.getElementById(selectedCell);
    addStylestoCell(currentStyles,element)
    stylesCell[selectedCell]=currentStyles;
});
function addStylestoCell(currentStyles,element){
    element.style.fontFamily=currentStyles["fontFamily"];
    element.style.fontSize=`${currentStyles["fontSize"]}px`;
    element.style.fontWeight=currentStyles["bold"]===true?"bold":"normal";
    element.style.textDecoration=currentStyles["underline"]===true?"underline":"none";
    element.style.fontStyle=currentStyles["italic"]===true?"italic":"normal";
    element.style.textAlign=currentStyles["textAlign"];
    element.style.color=currentStyles["textColor"]
    element.style.background=currentStyles["bgColor"]
}
for (let i=1;i<rows;i++){
    let div = document.createElement("div");
    for (let j=0;j<colums;j++){
        let div1 = document.createElement("div");
        if(j===0){
            div1.innerText=i;
            div1.className="snoCell"
        }
        else{
            div1.id=String.fromCharCode(64+j)+i;
            div1.addEventListener("click",cellInfo)
            div1.className="cell2";
            div1.addEventListener("input",textCells);
            div1.contentEditable=true;
        }
        div.appendChild(div1);
    }
    body.appendChild(div)
}
button.addEventListener("click",addSheet)
let sheet =  1;
function addSheet(){
    ++sheet
    let div = document.createElement("div");
    div.innerHTML=`<input type="radio" name="sheet" id="sheet${sheet}" value="text${sheet}">
    <label for="sheet${sheet}">Sheet${sheet}</label>
    `;
    form2.append(div);
}
form2.addEventListener("change",(e)=>{
    let presentSheet =  currentSheet;
    let presentText = textSheet;
    localStorage.setItem(presentSheet,JSON.stringify(stylesCell));
    localStorage.setItem(presentText,JSON.stringify(text));
    let element1 = localStorage.getItem(presentSheet);
    let element2 = localStorage.getItem(e.target.id);
    let element3 = localStorage.getItem(textSheet);
    let element4 = localStorage.getItem(e.target.value);
    for (let i in JSON.parse(element1)){
        func(i)
    }
    for (let i in JSON.parse(element3)){
        document.getElementById(i).innerText="";
    }
    if(element4){
        text=JSON.parse(element4);
        for (let i in text){
            document.getElementById(i).innerText=text[i];
        }
    }
    else{
        text={};
    }
    if(element2){
        stylesCell=JSON.parse(element2);
        let element = JSON.parse(element2);
        for (let key in element){
            let ele = document.getElementById(key);
            addStylestoCell(element[key],ele);
        }
    }
    else{
        stylesCell={};
    }
    currentSheet=e.target.id;
    textSheet=e.target.value; 
})
function func(cell){
    let element = document.getElementById(cell);
    element.removeAttribute("style");
    element.classList.remove("activeCell");
}