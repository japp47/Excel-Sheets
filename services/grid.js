let rows = 100;
let cols = 26;

let addressColContent = document.querySelector(".address-col-cont");
let addressRowContent = document.querySelector(".address-row-cont");
let cellContent = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

for(let i=0;i<rows;i++) {
    let addressCol = document.createElement("div");
    addressCol.setAttribute("class", "address-col");    
    addressCol.innerText = i+1;
    addressColContent.appendChild(addressCol);
}
for(let i=0;i<cols;i++) {
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class", "address-row");    
    addressRow.innerText = String.fromCharCode(65+i);
    addressRowContent.appendChild(addressRow);
}

for(let i=0;i<rows;i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for(let j= 0;j<26;j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("spellcheck", "false");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);

        rowCont.appendChild(cell);
        addListenerAddressBar(cell, i, j);
    }
    cellContent.appendChild(rowCont);
}

function addListenerAddressBar(cell, i, j) {
    cell.addEventListener("click",(e)=> {
        addressBar.value = String.fromCharCode(65+j) + (i+1);
    });
}

//by defult
// addressBar.value = "A1";
let firstcell = document.querySelector(".cell")
firstcell.click();
