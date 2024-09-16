let ctrlKey;
document.addEventListener("keydown", (e) => {
    ctrlKey = e.ctrlKey;
});
document.addEventListener("keyup", (e) => {
    ctrlKey = e.ctrlKey;
});
let rangeStorage = [];

for(let i = 0;i<rows;i++) {
    for(let j = 0;j<cols;j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
        rangeStorage=[];
    }
}
let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");
function handleSelectedCells(cell) {
    cell.addEventListener("click", (e) => {
        //selected cell range work
        if(!ctrlKey) return;
        if(rangeStorage.length >= 2) {
            handleSelectedUI();
        }
        cell.style.border = "2px solid #562b4f";

        let rid = Number(cell.getAttribute("rid"));
        let cid = Number(cell.getAttribute("cid"));
        rangeStorage.push([rid, cid]);
    })
}

function handleSelectedUI() {
    for(let i= 0;i<rangeStorage.length;i++) {
        let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border = "1px solid lightgrey";
        
    }
}
let copyData = []
copyBtn.addEventListener("click", (e) => {
    for(let i = rangeStorage[0][0];i<rangeStorage[1][0];i++) {
        let copyRow = [];
        for(let j = rangeStorage[0][1];j<rangeStorage[1][1];j++) {

            let cellProp = sheetDB[i][j];
            copyRow.push(cellProp);
        }
        copyData.push(copyRow)
    }
    handleSelectedUI();
})