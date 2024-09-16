let sheetFolderCont = document.querySelector(".sheets-folder-cont")
let addSheetbtn = document.querySelector(".sheet-add-icon");
addSheetbtn.addEventListener("click", (e)=> {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");
    
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;
    sheetFolderCont.appendChild(sheet);
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActivity(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
});

function handleSheetRemoval(sheet) {
    sheet.addEventListener("mousedown", (e) => {
        if (e.button !== 2) return; //2->right click
        let allSheetFolders = document.querySelectorAll(".sheet-folder");
        if(allSheetFolders.length===1) {
            alert("Cannot delete the last sheet");
            return;
        }
        let response = confirm("The sheet will be deleted permanently..");
        if (response===false) return;
        let sheetIdx = Number(sheet.getAttribute("id"));
        collectionStorage.splice(sheetIdx, 1);
        collectedGraphComponent.splice(sheetIdx, 1);
        handleSheetRemovalUI(sheet) //UI remove
        //by defauly DB to active sheet 1
        sheetDB = collectionStorage[0];
        graphComponent = collectedGraphComponent[0] ;
        handleSheetProperties();
    });
}
function handleSheetRemovalUI(sheet) {
    sheet.remove();
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolders.length;i++) {
        allSheetFolders[i].setAttribute("id", i);
        let sheetContent = allSheetFolders[i].querySelector(".sheet-content");
        sheetContent.textContent = `Sheet ${i+1}`
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    allSheetFolders[0].style.backgroundColor = "#ced6e0";
}
function handleSheetDB(sheetIdx) {
    sheetDB = collectionStorage[sheetIdx];
    graphComponent = collectedGraphComponent[sheetIdx];
}

function handleSheetProperties() {
    for(let i= 0; i<rows;i++) {
        for(let j = 0;j<cols;j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }
    let firstcell = document.querySelector(".cell")
    firstcell.click();
}
function handleSheetUI(sheet) {
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    for(let i = 0;i<allSheetFolders.length;i++) {
        allSheetFolders[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "#ced6e0";
}
function handleSheetActivity(sheet) {
    sheet.addEventListener("click", (e) => {
        let sheetIdx = Number(sheet.getAttribute("id"));
        handleSheetDB(sheetIdx);
        handleSheetProperties();
        handleSheetUI(sheet);
    });
}

function createSheetDB() {
    let sheetDB = [];
    for(let i = 0; i<rows; i++) {
        let sheetRow = [];
        for(let j = 0; j<cols;j++) {
            let cellProp = {
                bold: false,
                italic: false,
                underline: false,
                alignment: "left",
                fontFamily: 'monospace',
                fontSize: "16",
                fontColor: "#000000",
                BGcolor: "#000000",
                value: "",
                formula:"",
                children: []

            }
            sheetRow.push(cellProp);
        }
        sheetDB.push(sheetRow);
    }
    collectionStorage.push(sheetDB);
}

function createGraphComponentMatrix() {
    let graphComponent = [];

    for(let i = 0;i<rows;i++) {
        let row = [];
        for(let j = 0;j<cols;j++) {
            row.push([]);
        }
        graphComponent.push(row);
    }
    collectedGraphComponent.push(graphComponent);
}
