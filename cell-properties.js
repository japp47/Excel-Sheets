let sheetDB = [];
for(let i =0; i<rows;i++) {
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

        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let alignment = document.querySelectorAll(".alignment");
let fontFamily = document.querySelector(".font-family-prop");
let fontSize = document.querySelector(".font-size-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");

let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

// let addressBar = document.querySelector(".address-bar");

//2-way binding
let activeColor = "#d1d8e0";
let inactiveColor = "#ecf0f1"

bold.addEventListener("click",(e)=> {
    let address=addressBar.value;
    let [cell, cellProp] = activecell(address);
    cellProp.bold = !cellProp.bold;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
});
italic.addEventListener("click",(e)=> {
    let address=addressBar.value;
    let [cell, cellProp] = activecell(address);
    cellProp.italic = !cellProp.italic;
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
});
underline.addEventListener("click",(e)=> {
    let address=addressBar.value;
    let [cell, cellProp] = activecell(address);
    cellProp.underline = !cellProp.underline;
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor;
});

fontSize.addEventListener("change",(e)=> {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);
    cellProp.fontSize = fontSize.value //data change
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize //UI change
});

fontFamily.addEventListener("change",(e)=> {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);
    cellProp.fontFamily = fontFamily.value //data change
    cell.style.fontFamily = cellProp.fontFamily;
    font.value = cellProp.fontFamily //UI change
});

fontColor.addEventListener("change",(e)=> {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);
    cellProp.fontColor = fontColor.value //data change
    cell.style.color = cellProp.fontColor;
    fontColor.value = cellProp.fontColor //UI change
});

BGcolor.addEventListener("change",(e)=> {
    let address = addressBar.value;
    let [cell, cellProp] = activecell(address);
    cellProp.BGcolor = BGcolor.value //data change
    cell.style.backgroundColor = cellProp.BGcolor;
    BGcolor.value = cellProp.BGcolor //UI change
});

alignment.forEach((alighnElem) => {
    alighnElem.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);
        let alignVal = e.target.classList[0];
        cellProp.alignment = alignVal;
        cell.style.textAlign = cellProp.alignment;
        switch(alignVal) {
            case "left":
                leftAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor=activeColor;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                break;
        }
    })
});

let allCells = document.querySelectorAll(".cell");
allCells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        let address = addressBar.value;
        let [rid, cid] = decodeRidCid(address);
        let cellProp = sheetDB[rid][cid];
        cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
        cell.style.textDecoration = cellProp.underline ? "underline" : "none";
        cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
        cell.style.fontSize = cellProp.fontSize + "px";
        cell.style.fontFamily = cellProp.fontFamily;
        cell.style.color = cellProp.fontColor;
        cell.style.backgroundColor = cellProp.BGcolor==="#000000"?"transparent":cellProp.BGcolor;
        cell.style.textAlign = cellProp.alignment;

        //Apply properties tp UI container
        bold.style.backgroundColor = cellProp.bold ? activeColor : inactiveColor;
        italic.style.backgroundColor = cellProp.italic ? activeColor : inactiveColor;
        underline.style.backgroundColor = cellProp.underline ? activeColor : inactiveColor;
        fontSize.value = cellProp.fontSize //UI change
        fontFamily.value = cellProp.fontFamily //UI change
        fontColor.value = cellProp.fontColor //UI change
        BGcolor.value = cellProp.BGcolor //UI change
        switch(cellProp.alignment) {
            case "left":
                leftAlign.style.backgroundColor = activeColor;
                rightAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor = inactiveColor;
                break;
            case "center":
                leftAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = inactiveColor;
                centerAlign.style.backgroundColor=activeColor;
                break;
            case "right":
                leftAlign.style.backgroundColor = inactiveColor;
                rightAlign.style.backgroundColor = activeColor;
                centerAlign.style.backgroundColor = inactiveColor;
                break;
        }
    })
});

function activecell(address) {
    let [rid,cid] = decodeRidCid(address);
    //Active cell & storage object
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function decodeRidCid(address) {
    let rid = Number(address.slice(1)-1) //-1 for 0 based Indexing
    let cid = Number(address.charCodeAt(0))-65; //'A'->65
    return [rid, cid];
}
