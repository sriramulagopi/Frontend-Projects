const tbody = document.querySelector("tbody");
const form = document.querySelector("form");
const btn1 = document.querySelector(".btn1");
const div2 = document.querySelector(".div2");
const close1 = document.querySelector(".close");
let EmployeeID = 1001;
let Sample = {
    Sno:EmployeeID,
    Name:"Asif",
    Role:"Developer",
    Salary:"30LPA",
    Email:"asif123@gmail.com",
    PhoneNo:8121719080,
    Company:"Google",
}
function addEmployee(employee){
    let tr = document.createElement("tr");
    for (let key in employee){
        let td = document.createElement("td");
        td.innerText=employee[key];
        tr.appendChild(td);
    }
    let td = document.createElement("td");
    let button1 = document.createElement("button");
    let button2 = document.createElement("button");
    button1.addEventListener("click",Edit);
    button2.addEventListener("click",(e)=>{
        e.target.parentNode.parentNode.remove();
    })
    button1.innerText="Edit";
    button2.innerText="Delete";
    td.append(button1,button2);
    tr.appendChild(td);
    tbody.appendChild(tr);
}
addEmployee(Sample);
close1.addEventListener("click",displayForm);
btn1.addEventListener("click",()=>{
    displayForm();
    form.addEventListener("submit",employeDetails);
    form.removeEventListener("submit",editedDetails);
    form.reset();
});
function displayForm(){
    if(getComputedStyle(div2).display==="none"){
        div2.style.display="flex";
        return;
    }
    div2.style.display="none";
}
function employeDetails(e){
    e.preventDefault();
    let employee = {
        Sno:++EmployeeID,
        Name:form.name.value,
        Role:form.role.value,
        Salary:form.salary.value,
        Email:form.email.value,
        PhoneNo:form.phoneno.value,
        Company:form.company.value,
    }
    addEmployee(employee);
    form.reset();
    displayForm();
}
let children;
function Edit(e){
    form.removeEventListener("submit",employeDetails);
    children=e.target.parentNode.parentNode.children;
    displayForm();
    form.name.value=children[1].innerText;
    form.role.value=children[2].innerText;
    form.salary.value=children[3].innerText;
    form.email.value=children[4].innerText;
    form.phoneno.value=children[5].innerText;
    form.company.value=children[6].innerText;
    form.addEventListener("submit",editedDetails);
}
function editedDetails(e){
    e.preventDefault();
    children[1].innerText=form.name.value;
    children[2].innerText=form.role.value;
    children[3].innerText=form.salary.value;
    children[4].innerText=form.email.value;
    children[5].innerText=form.phoneno.value;
    children[6].innerText=form.company.value;
    displayForm()
    form.reset();
}