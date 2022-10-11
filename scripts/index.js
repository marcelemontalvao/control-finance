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
    return soma;
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
        button.classList.add("1");
    } else {
        button.innerText = valuesCategory[1];
        button.classList.add("2");
    } 

    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash", "icon");
    icon.setAttribute("id", object.id);
    
    icon.addEventListener("click", (event) => {
        if(icon.id == event.target.id) {
           insertedValuesFiltered.splice(insertedValuesFiltered.indexOf(object), 1);
           filterElements();
        } 
    })

    divBtns.append(button, icon);
    li.append(priceTransation, divBtns);
    return li;
}

function renderUl(list, title) {
    let ul = document.querySelector(".transations"); 
    ul.innerHTML = "";
    if(list.length > 0) {
        list.map(object => {
            ul.append(createLi(object));
        });
        selectCategory();
        renderSum(list);
        
    } else {
        let section = renderDefaultSection(title);
        ul.append(section);
        renderSum(list);
    }
}

function renderDefaultSection(title) {
    let section = document.createElement("section");
    section.classList.add("section-default", "centralized");

    let titleSection = document.createElement("span");
    titleSection.classList.add("title-section-default");
    titleSection.innerText = title;

    let subtitleSection = document.createElement("span");
    subtitleSection.classList.add("subtitle-section-default");
    subtitleSection.innerText = "Registrar novo valor";

    subtitleSection.addEventListener("click", ()=> {
        const modal = document.querySelector(".container-modal")
        modal.style.display = "flex";
    })

    section.append(titleSection, subtitleSection);
    
    section.addEventListener("click", ()=> {
        const modal = document.querySelector(".container-modal")
        modal.style.display = "flex";
    })
    return section;
}

function selectCategory() {
    let btns = document.querySelectorAll(".category");
    let ul = document.querySelector(".transations"); 
    let btnAll = document.getElementById("all");
    
    btns.forEach(element => { 
       
        element.addEventListener("click", () =>{
            ul.innerHTML = "";
            let objects = insertedValuesFiltered.filter(item => element.id == item.categoryID);
            
            let menuSelected = document.querySelectorAll(".category")
                menuSelected.forEach(el => {
                btnAll.classList.remove("outline-active")
                el.classList.remove("outline-active")
            })

            if(element.textContent == "Todos") {
                element.classList.add("outline-active")
                renderUl(insertedValuesFiltered, "Nenhum valor encontrado");
            } else if(element.textContent == "Entradas") { 
                element.classList.add("outline-active")
                renderUl(objects, "Sem nenhum valor na categoria de Entrada");  
            } else {
                element.classList.add("outline-active")
                renderUl(objects, "Sem nenhum valor na categoria de Saída");  
            }
        })
    })
}

function filterElements() {
    let btns = document.querySelectorAll(".category");
    let ul = document.querySelector(".transations"); 
    const outline = document.querySelector(".outline-active")
    btns.forEach(element => { 
        if(element.contains(outline)) {
            ul.innerHTML = "";

            let objects = insertedValuesFiltered.filter(item => element.id == item.categoryID);
            
            if(element.textContent == "Todos") {
                renderUl(insertedValuesFiltered, "Nenhum valor encontrado");
            } else if(element.textContent == "Entradas") { 
                renderUl(objects, "Sem nenhum valor na categoria de Entrada");  
            } else {
                renderUl(objects, "Sem nenhum valor na categoria de Saída");  
            }
        }
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
        btnExit.classList.remove("outline-active")
        btnEntry.classList.add("outline-active")
        optionSelected = 1;
    })

    btnExit.addEventListener("click", () => {
        btnEntry.classList.remove("outline-active")
        btnExit.classList.add("outline-active")
        optionSelected = 2;
    })

    btnRegister.addEventListener("click", () => { 
        let newValue = {
            id: crypto.randomUUID(),
            value: parseFloat(input.value),
            categoryID: optionSelected
        } 
        if(input.value != "") {
            insertedValuesFiltered.push(newValue);
            modal.style.display = "none";
            filterElements();
        }  
    })

    btnCancel.addEventListener("click", () => {
        modal.style.display = "none";
    })
}

registerNewValue();
renderUl(insertedValuesFiltered, "Nenhum valor encontrado");
selectCategory();