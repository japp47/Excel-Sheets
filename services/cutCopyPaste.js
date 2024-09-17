let ctrlKey;
document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
})
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
});
//let rangeStorage = [];

for(let i = 0;i<rows;i++) {
    for(let j = 0;j<cols;j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
        //rangeStorage=[];
    }
}
let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");
let rangeStorage = [];
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        // Select cells range work
        if (!ctrlKey) return;
        if (rangeStorage.length >= 2) {
            handleSelectedUI();
            rangeStorage = [];
        }

        // UI
        cell.style.border = "3px solid #218c74";

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid, cid]);
        //console.log(rangeStorage);
    })
}

function handleSelectedUI() {
    for(let i= 0;i<rangeStorage.length;i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";   
    }
}
// Copy functionality (logging added for debugging)
let copyData = [];
copyBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) {
        alert("Please select at least two cells for copying.");
        return;
    }
    copyData = [];
    //console.log("Copying data from selected range: ", rangeStorage);
    
    for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {
        let copyRow = [];
        for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
            let cellProp = sheetDB[i][j];
            copyRow.push({ ...cellProp }); // Clone the data to avoid reference issues
        }
        copyData.push(copyRow);
    }
    //console.log("CopyData structure:", copyData);
    handleSelectedUI();
});

// Cut functionality (same change as copy, logs added)
cutBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return;

    copyData = [];
    //console.log("Cutting data from selected range: ", rangeStorage);

    for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {
        let copyRow = [];
        for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
            let cellProp = sheetDB[i][j];
            copyRow.push({ ...cellProp }); // Copy data before clearing
        }
        copyData.push(copyRow);
    }
    //console.log("CopyData after cutting:", copyData);

    for (let i = rangeStorage[0][0]; i <= rangeStorage[1][0]; i++) {
        for (let j = rangeStorage[0][1]; j <= rangeStorage[1][1]; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            let cellProp = sheetDB[i][j];

            // Clear all the cell properties after copying
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontFamily = "monospace";
            cellProp.fontSize = "16";
            cellProp.BGcolor = "#000000";
            cellProp.alignment = "left";
            
            cell.click(); // Update the UI
        }
    }
    handleSelectedUI(); // Deselect after cut operation
});

// Paste functionality (with range checking)
pasteBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2 || copyData.length === 0) return;
    
    let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);
    
    let address = addressBar.value;
    let [stRow, stCol] = decodeRidCid(address);
    
    console.log("Pasting at:", stRow, stCol);
    console.log("Row difference:", rowDiff, "Column difference:", colDiff);
    
    for (let i = stRow, r = 0; i <= stRow + rowDiff; i++, r++) {
        for (let j = stCol, c = 0; j <= stCol + colDiff; j++, c++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if (!cell || !copyData[r] || !copyData[r][c]) {
                //console.error(`Missing data at [${r}, ${c}] in copyData`);
                continue;
            }

            let data = copyData[r][c];
            let cellProp = sheetDB[i][j];

            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.underline;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontSize = data.fontSize;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment = data.alignment;
            
            cell.click(); // Update the UI
        }
    }
});
