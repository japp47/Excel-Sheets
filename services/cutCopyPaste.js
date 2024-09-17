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
        //selected cell range work
        if(!ctrlKey) return;
        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        let cellIndex = rangeStorage.findIndex(item => item[0] === rid && item[1] === cid);
        // if(rangeStorage.length >= 2) {
        //     handleSelectedUI();
        //     rangeStorage = [];
        // }
        if (cellIndex > -1) {
            cell.style.border = "1px solid lightgrey";
            rangeStorage.splice(cellIndex, 1); // Remove the cell from the selection
        } else {
            // Select the cell if not already selected
            cell.style.border = "2px solid #562b4f";
            rangeStorage.push([rid, cid]); // Add the cell to the selection
        }
    })
}

function handleSelectedUI() {
    for(let i= 0;i<rangeStorage.length;i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";   
    }
}
let copyData = [];
copyBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) {
        alert("Please select at least two cells for copying.");
        return;
    }
    //copyData = [];
    for(let i = rangeStorage[0][0];i<=rangeStorage[1][0];i++) {
        let copyRow = [];
        for(let j = rangeStorage[0][1];j<=rangeStorage[1][1];j++) {

            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    handleSelectedUI();
});

pasteBtn.addEventListener("click", (e) => {
    if(rangeStorage.length<2) return;
    let rowDiff = Math.abs(rangeStorage[0][0]-rangeStorage[1][0]);
    let colDiff = Math.abs(rangeStorage[0][1]-rangeStorage[1][1]);
    let address = addressBar.value;
    let [stRow, stCol] = decodeRidCid(address);
    for(let i = stRow,r= 0;i<= stRow+rowDiff;i++,r++) {
        for(let j = stCol,c=0;j<=stCol+colDiff;j++,c++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell) continue;
            let data  =  copyData[r][c];
            let cellProp = sheetDB[i][j];
            cellProp.value = data.value;
            cellProp.bold = data.bold;
            cellProp.italic = data.italic;
            cellProp.underline = data.bold;
            cellProp.fontFamily = data.fontFamily;
            cellProp.fontSize = data.fontSize;
            cellProp.BGcolor = data.BGcolor;
            cellProp.alignment= data.alignment;
            
            cell.click();
        }
    }
})