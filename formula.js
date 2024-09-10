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
formulaBar.addEventListener("keydown",(e)=> {
    let input = formulaBar.value;
    if(e.key == "Enter" && input) {
        let address = addressBar.value;
        let [cell, cellProp] = activecell(address);
        if(input!==cellProp.formula) removeChildFromParent(cellProp.formula);

        let evaluatedVal = evaluateFormula(input);
        setCellIandCellprop(evaluatedVal, input, address);
        addChildToParent(input);
        updateChildrenCells(address);
    }
});

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
function removeChildFromParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0;i<encodedFormula.length; i++) {
        let asciiVal = encodedFormula[i].charCodeAt(0);
        if(asciiVal>=65 && asciiVal<=90)  {
            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx, 1)
        }
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");
    for(let i = 0;i<encodedFormula.length; i++) {
        let asciiVal = encodedFormula[i].charCodeAt(0);
        if(asciiVal>=65 && asciiVal<=90)  {
            let [parentCell, parentCellProp] = activecell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(" ");
    for(let i = 0;i<encodedFormula.length;i++) {
        let asciiVal = encodedFormula[i].charCodeAt(0);
        if(asciiVal>=65 && asciiVal<=90) {
            let [cell, cellProp] = activecell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedformula = encodedFormula.join(" ");
    return eval(decodedformula);
}
function setCellIandCellprop(evaluatedVal, formula, address) {
    let [cell, cellProp] = activecell(address);
    cell.innerText = evaluatedVal;//UI
    //DB update
    cellProp.value = evaluatedVal;
    cellProp.formula = formula;
}