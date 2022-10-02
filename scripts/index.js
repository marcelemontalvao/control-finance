function renderSum(list) {  
    let sum = document.querySelector(".sum");
    sum.innerText = totalSum(list).toLocaleString('pt-BR', {style: 'currency', currency : 'BRL'});
}

function totalSum(list) {
    let soma = list.reduce((acc, obj) => {
        if (obj.categoryID === 1) {
            return acc + obj.value
        } else {
            return acc - obj.value
        }
    }, 0)
    return soma
}

function createLi(object) {
    let li = document.createElement("li");
    li.classList.add("transation", "space-between");

    let priceTransation = document.createElement("span");
    priceTransation.classList.add("price-transation", "text1-medium");
    priceTransation.innerText = object.value.toLocaleString('pt-BR', {style: 'currency', currency : 'BRL'});

    let divBtns = document.createElement("div");
    divBtns.classList.add("btns-transation", "space-between")

    let button = document.createElement("button");
    button.classList.add("type-transation");
    if (object.categoryID == 1) {
        button.innerText = valuesCategory[0];
    } else {
        button.innerText = valuesCategory[1];
    }

    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash", "icon");
    icon.setAttribute("id", object.id);
    
    icon.addEventListener("click", (event) => {
        if(icon.id == event.target.id) {
            insertedValuesFiltered.splice(insertedValuesFiltered.indexOf(insertedValuesFiltered[event.target.id - 1]), 1);
            renderUl(insertedValuesFiltered);
        } 
    })

    divBtns.append(button, icon);
    li.append(priceTransation, divBtns);
    return li;
}

function renderUl(list) {
    let ul = document.querySelector(".transations");
    ul.innerHTML = "";
    list.map(object => {
        console.log(object);
        ul.append(createLi(object));
    });
    renderSum(list);
}

function selectCategory() {
    let btns = document.querySelectorAll(".category");
   
    btns.forEach(element => {
        element.addEventListener("click", () =>{
            let objects = insertedValuesFiltered.filter(item => element.id == item.categoryID);
            if(element.textContent == "Todos") {
                renderUl(insertedValuesFiltered);
            } else if(element.textContent == "1") {    
                renderUl(objects);
            } else {
                renderUl(objects)
            }
        })
    })
}

function registerNewValue() {
    const btnRegister = document.getElementById("btn-register");
    const modal = document.querySelector(".container-modal");
    const btnCancel = document.querySelector(".cancelar");
    const input = document.getElementById("input");
    const btnEntry = document.getElementById("entrada"); 
    const btnExit = document.getElementById("saida");
    
    let optionSelected = 0;

    btnEntry.addEventListener("click", () => {
        optionSelected = 1;
    })

    btnExit.addEventListener("click", () => {
        optionSelected = 2;
    })

    btnRegister.addEventListener("click", () => { 
        let newValue = {
            id: crypto.randomUUID(),
            value: parseFloat(input.value),
            categoryID: optionSelected
        }
        console.log(newValue); 
        insertedValuesFiltered.push(newValue);
        console.log(newValue);
        modal.style.display = "none";
        renderUl(insertedValuesFiltered);
    })

    btnCancel.addEventListener("click", () => {
        modal.style.display = "none";
    })
   
}

registerNewValue();
renderUl(insertedValuesFiltered);
selectCategory();