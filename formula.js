

for(let i=0; i< rows;i++) {
    for(let j = 0;j< cols;j++) {
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur", (e)=> {
            let address = addressBar.value;
            let [cell, cellProp] = activecell(address);
            let data = cell.innerText;
            if(data === cellProp.value) return;

            cellProp.value = data;
            //if data modified---remove aP-C relationship , formula empty, update
            removeChildFromParent(cellProp.formula)
            cellProp.formula = "";
            updateChildrenCells(address);
        })
    }
}

let formulaBar = document.querySelector('.formula-bar');
formulaBar.addEventListener("keydown",async (e)=> {
    let input = formulaBar.value;
    if(e.key == "Enter" && input) {
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);
        if(input!==cellProp.formula) removeChildFromParent(cellProp.formula);

        addChildToGraphComponent(input, address);

        let cycleResponse = isGraphCyclic(graphComponent);
        if(cycleResponse) {
            //showModal();
            //alert("Your formula is cyclic");
            let response = await showCyclicModal();
            while(response === true) {
                await isGraphCyclicTracePath(graphComponent, cycleResponse);
                response = await showCyclicModal();
            }
            removeChildFromGraphComponent(input, address);
            return;
        }

        let evaluatedVal = evaluateFormula(input);

        setCellIandCellprop(evaluatedVal, input, address);
        addChildToParent(input);
        updateChildrenCells(address);
    }
});

function addChildToGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRidCid(childAddress);

    // Use regular expression to find all cell references
    let encodedFormula = formula.match(/([A-Z][0-9]+)/g) || [];
    encodedFormula.forEach((cellRef) => {
        let [prid, pcid] = decodeRidCid(cellRef);
        graphComponent[prid][pcid].push([crid, ccid]);
    });
}


function removeChildFromGraphComponent(formula, childAddress) {
    let [crid, ccid] = decodeRidCid(childAddress);

    // Use regular expression to find all cell references
    let encodedFormula = formula.match(/([A-Z][0-9]+)/g) || [];
    encodedFormula.forEach((cellRef) => {
        let [prid, pcid] = decodeRidCid(cellRef);
        graphComponent[prid][pcid].pop();
    });
}


function updateChildrenCells(parentAddress) {
    let [parentCell, parentCellProp] = activecell(parentAddress);
    let children = parentCellProp.children;
    for(let i = 0;i<children.length;i++) {
        let child = children[i];
        let [childCell, childCellProp] = activecell(child);
        let childFormula = childCellProp.formula;
        let evaluatedValue = evaluateFormula(childFormula);
        setCellIandCellprop(evaluatedValue, childFormula,child);
        updateChildrenCells(child);
    }
}
function addChildToParent(formula) {
    let childAddress = addressBar.value;

    // Use regular expression to find all cell references
    let encodedFormula = formula.match(/([A-Z][0-9]+)/g) || [];
    encodedFormula.forEach((cellRef) => {
        let [parentCell, parentCellProp] = activecell(cellRef);
        parentCellProp.children.push(childAddress);
    });
}

function removeChildFromParent(formula) {
    let childAddress = addressBar.value;

    // Use regular expression to find all cell references
    let encodedFormula = formula.match(/([A-Z][0-9]+)/g) || [];
    encodedFormula.forEach((cellRef) => {
        let [parentCell, parentCellProp] = activecell(cellRef);
        let idx = parentCellProp.children.indexOf(childAddress);
        parentCellProp.children.splice(idx, 1);
    });
}


// function evaluateFormula(formula) {
//     let encodedFormula = formula.split(" ");
//     for(let i = 0;i<encodedFormula.length;i++) {
//         let asciiVal = encodedFormula[i].charCodeAt(0);
//         if(asciiVal>=65 && asciiVal<=90) {
//             let [cell, cellProp] = activecell(encodedFormula[i]);
//             encodedFormula[i] = cellProp.value;
//         }
//     }
//     let decodedformula = encodedFormula.join(" ");
//     return eval(decodedformula);
// }
function evaluateFormula(formula) {
    // Regular expression to match cell references (e.g., A1, B2, etc.)
    let cellReferencePattern = /([A-Z][0-9]+)/g;

    // Replace all cell references with their corresponding values
    let evaluatedFormula = formula.replace(cellReferencePattern, (match) => {
        let [cell, cellProp] = activecell(match);
        return cellProp.value; // Replace the cell reference with its value
    });

    // Evaluate the formula
    return eval(evaluatedFormula);
}
function setCellIandCellprop(evaluatedVal, formula, address) {
    let [cell, cellProp] = activecell(address);
    cell.innerText = evaluatedVal;//UI
    //DB update
    cellProp.value = evaluatedVal;
    cellProp.formula = formula;
}