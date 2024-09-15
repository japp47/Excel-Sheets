function colorPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        },1000);
    })
}

async function isGraphCyclicTracePath(graphComponent, cycleResponse)  {
    let [srcr, srcc] = cycleResponse;
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

    let response = await isCyclicUtilTracePath(graphComponent, srcr, srcc, visited, recStack);    
    if(response===true) return Promise.resolve(true);
    return Promise.resolve(false);

}

async function isCyclicUtilTracePath(graphComponent, srcr, srcc,visited,recStack) {
    visited[srcr][srcc] = true;
    recStack[srcr][srcc] = true;

    let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);
    cell.style.backgroundColor = "#6a0dad";
    await colorPromise();
    for(let children = 0; children<graphComponent[srcr][srcc].length;children++) {
        let childr = graphComponent[srcr][srcc][children][0];
        let childc = graphComponent[srcr][srcc][children][1];
        if(visited[childr][childc] === false) {
            if(await isCyclicUtilTracePath(graphComponent, childr, childc, visited, recStack)===true){
                cell.style.backgroundColor = "transparent";
                await colorPromise(); 

                return Promise.resolve(true);
            }
        }
        else if(visited[childr][childc]===true && recStack[childr][childc] === true)  {
            let cyclicCell = document.querySelector(`.cell[rid="${childr}"][cid="${childc}"]`);
            cyclicCell.style.backgroundColor = "#d900ff";
            await colorPromise();
            cyclicCell.style.backgroundColor = "transparent";

            await colorPromise();
            cell.style.backgroundColor = "transparent";

            return Promise.resolve(true);
        }
    }
    recStack[srcr][srcc] = false;
    return Promise.resolve(false);
} 