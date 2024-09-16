//Storage -> 2d matrix
let collectedGraphComponent = [];
let graphComponent = [];


// for(let i = 0;i<rows;i++) {
//     let row = [];
//     for(let j = 0;j<cols;j++) {
//         //more than 1 chilf relatio that is why array    
//         row.push([]);
//     }
//     graphComponent.push(row);
// } 
function isGraphCyclic(graphComponent)  {
    let visited = [];
    let recStack = [];
    for(let i = 0;i<rows;i++) {
        let visitedRow = [];
        let recStackRow = []
        for(let j=0;j<cols;j++) {
            visitedRow.push(false);
            recStackRow.push(false);
        }
        visited.push(visitedRow);
        recStack.push(recStackRow);
    }
    for(let i = 0;i<rows;i++) {
        for(let j = 0;j<cols;j++) {
            if(visited[i][j]===false) {
                if(isCyclicUtil(graphComponent, i, j, visited, recStack) ==  true){
                    return [i, j];
                }
            }   
        }
    }
    return null;
}
function isCyclicUtil(graphComponent, srcr, srcc,visited,recStack) {
    visited[srcr][srcc] = true;
    recStack[srcr][srcc] = true;
    for(let children = 0; children<graphComponent[srcr][srcc].length;children++) {
        let childr = graphComponent[srcr][srcc][children][0];
        let childc = graphComponent[srcr][srcc][children][1];
        if(visited[childr][childc] === false) {
            if(isCyclicUtil(graphComponent, childr, childc, visited, recStack)===true){
                return true;
            }
        }
        else if(visited[childr][childc]===true && recStack[childr][childc] === true)  {
            return true;
        }
    }
    recStack[srcr][srcc] = false;
    return false; 
} 