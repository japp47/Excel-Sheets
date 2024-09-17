let downloadBtn = document.querySelector(".download");
let uploadBtn = document.querySelector(".open");

downloadBtn.addEventListener("click", (e) => {
    let workbook = XLSX.utils.book_new();

    // Convert sheetDB and graphComponentMatrix into arrays for Excel format
    let sheetData = XLSX.utils.aoa_to_sheet(sheetDB);
    let graphData = XLSX.utils.aoa_to_sheet(graphComponent);

    // Append sheets to workbook
    XLSX.utils.book_append_sheet(workbook, sheetData, "SheetDB");
    XLSX.utils.book_append_sheet(workbook, graphData, "GraphComponent");

    // Write the workbook and trigger download
    XLSX.writeFile(workbook, "SheetData.xlsx");
});
// uploadBtn.addEventListener("click", (e) => {
//     // Opens file explorer
//     let input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.click();

//     input.addEventListener("change", (e) => {
//         let fr = new FileReader();
//         let files = input.files;
//         let fileObj = files[0];

//         fr.readAsText(fileObj);
//         fr.addEventListener("load", (e) => {
//             let readSheetData = JSON.parse(fr.result);

//             addSheetBtn.click();

//             sheetDB = readSheetData[0];
//             graphComponent = readSheetData[1];

//             collectionStorage[collectionStorage.length-1] = sheetDB;
//             collectedGraphComponent[collectedGraphComponent.length-1] = graphComponent;

//             handleSheetProperties();
//         })
//     })
// })
uploadBtn.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".xlsx,.xls"); // Accept only Excel files
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let reader = new FileReader();
        
        reader.onload = (e) => {
            let data = new Uint8Array(reader.result);
            let workbook = XLSX.read(data, { type: "array" });

            // Get SheetDB and GraphComponent from the workbook
            let sheetDBData = XLSX.utils.sheet_to_json(workbook.Sheets["SheetDB"], { header: 1 });
            let graphData = XLSX.utils.sheet_to_json(workbook.Sheets["GraphComponent"], { header: 1 });

            // Process the data and assign it to sheetDB and graphComponentMatrix
            addSheetbtn.click();
            sheetDB = sheetDBData;
            graphComponent = graphData;

            collectionStorage[collectionStorage.length - 1] = sheetDB;
            collectedGraphComponent[collectedGraphComponent.length - 1] = graphComponent;

            handleSheetProperties(); // Update the UI or other properties
        };

        reader.readAsArrayBuffer(file);
    });
});
