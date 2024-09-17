let downloadBtn = document.querySelector(".download");
let uploadBtn = document.querySelector(".open");

downloadBtn.addEventListener("click", (e) => {
    // Prepare your data in a format SheetJS can work with, e.g., arrays or objects
    // Assuming sheetDB is a 2D array or can be converted into one
    let ws_data = sheetDB.map(row => row.map(cell => cell.value)); // Extracting values from the cells
    let ws = XLSX.utils.aoa_to_sheet(ws_data); // Convert 2D array to worksheet

    // Create a new workbook
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Export to an Excel file
    XLSX.writeFile(wb, "SheetData.xlsx"); // This will trigger the download with .xlsx extension
});
