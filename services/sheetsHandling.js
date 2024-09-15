let sheetFolderCont = document.querySelector(".sheets-folder-cont")
let addSheetbtn = document.querySelector(".sheet-add-icon");
addSheetbtn.addEventListener("click", (e)=> {
    let sheet = document.createElement("div");
    sheet.setAttribute("class", "sheet-folder");
    
    let allSheetFolders = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id", allSheetFolders.length);

    sheet.innerHTML = `<div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>`;
    sheetFolderCont.appendChild(sheet);

})