let dropzone = document.getElementById("dropzone");
let nodes = document.getElementsByClassName("node");
let selectedNode = '';
let selectedNodePos = 0;

for (let i = 0; i < nodes.length; i++) {
    nodes[i].addEventListener('mousedown', (e) => {

        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.backgroundColor = 'cornsilk';

        }
        document.getElementById(e.target.id).style.backgroundColor = 'tomato';
        document.getElementById(e.target.id).style.transition = '0s';
    });
    nodes[i].addEventListener("dragstart", (e) => {
        e.dataTransfer.setData('text', e.target.id);
        console.log("dragstart");
        selectedNode = document.getElementById(e.target.id);
        setTimeout(() => {
            dropzone.removeChild(selectedNode);
        }, 0);
    });
}
dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    whereAmI(e.clientY);
});

dropzone.addEventListener("drop", (ev) =>{
    ev.preventDefault();
    console.log("dropped onto " + selectedNodePos);
    dropzone.insertBefore(selectedNode, dropzone.children[selectedNodePos]);

    resetNodes();

    setTimeout(() => {
        selectedNode.style.backgroundColor = 'cornsilk';
        selectedNode.style.transition = '2s';
    }, 200);
});

function establishNodePositions() {
    for (let i = 0; i < nodes.length; i++) {
        let element = document.getElementById(nodes[i]['id']);
        let position = element.getBoundingClientRect();
        let yTop = position.top;
        let yBottom = position.bottom;
        nodes[i]['yPos'] = yTop + ((yBottom-yTop)/2);
    }
}
function resetNodes() {
    for (let i = 0; i < nodes.length; i++) {
        document.getElementById(nodes[i]['id']).style.marginTop = '0.5em';

    }
}
function whereAmI(currentYPos) {
    establishNodePositions();

    let nodeAbove = undefined;
    let nodeBelow;
    for (let i = 0; i < nodes.length; i++) {

        if (nodes[i]['yPos']<currentYPos) {
            nodeAbove = document.getElementById(nodes[i]['id']);
            selectedNodePos = i + 1;
        } else {
            if (!nodeBelow) {
                nodeBelow = document.getElementById(nodes[i]['id']);
            }
        }

    }
    if (typeof nodeAbove == 'undefined') {
        selectedNodePos = 0;
    }

    resetNodes();

    if (typeof nodeBelow == 'object') {
        nodeBelow.style.marginTop = '3em';
        nodeBelow.style.transition = '1.8s';
    }

    console.log(selectedNodePos);
}

