let canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let mouseDown=false;

let pencilColor=document.querySelectorAll(".pencil-color");
let pencilWidthElem=document.querySelector(".pencil-width");
let eraserWidthElem=document.querySelector(".eraser-width");
let download=document.querySelector('.download');
let undo=document.querySelector('.redo');
let redo=document.querySelector('.undo');

let penColor="red";
let eraserColor="white";
let penWidth=pencilWidthElem.value;
let eraserWidth=eraserWidthElem.value;

let undoRedoTracker=[];//Data
let track=0; //Represent which action from tracker array

//API
 let tool=canvas.getContext('2d');
 tool.strokeStyle=penColor;
 tool.lineWidth=penWidth;
 
//  tool.beginPath();  //new graphic (path) (line)
//  tool.moveTo(10,10);//start point
//  tool.lineTo(100,150);//end point
//  tool.stroke();//fill color(fill graphic)

// tool.beginPath();
// tool.moveTo(30,100);
//  tool.lineTo(200,600);
//  tool.stroke();

//mousedown->start new path,mousemove->path fill (graphics)
canvas.addEventListener("mousedown",(e)=>{
    mouseDown=true;
    // beginPath({
    //     x:e.clientX,
    //     y:e.clientY
    // })
    let data={
        x:e.clientX,
        y:e.clientY
    }
    //send data to server
    Socket.emit("beginPath",data)
    
})
canvas.addEventListener("mousemove",(e)=>{
    if(mouseDown){
        let data={
            x:e.clientX,
            y:e.clientY,
            color:earserFlag?eraserColor:penColor,
           width:earserFlag?eraserWidth:penWidth

        }
        Socket.emit("drawStroke",data)
    } 

    // if(mouseDown) drawStroke({
    //     x:e.clientX,
    //     y:e.clientY,
    //     color:earserFlag?eraserColor:penColor,
    //    width:earserFlag?eraserWidth:penWidth
    // })
        
    
})
canvas.addEventListener("mouseup", (e)=>{
    mouseDown=false;
    let url=canvas.toDataURL();
    undoRedoTracker.push(url);
    track=undoRedoTracker.length-1;
    
})
undo.addEventListener("click",(e)=>{
    if(track>0)track--;
    let data={
        trackValue:track,
        undoRedoTracker
    }
    // track action
    //undoredoCanvas(trackObj);
     socket.emit("redoUndo",data)

    // if(track>0)track--;
    // let trackObj={
    //     trackValue:track,
    //     undoRedoTracker
    // }
    // // track action
    // undoredoCanvas(trackObj);

})
redo.addEventListener("click",(e)=>{
    if(track<undoRedoTracker.length-1) track++;
    //track action
    let data={
        trackValue:track,
        undoRedoTracker
    }
    //undoredoCanvas(trackObj);
    socket.emit("redoUndo",dat)
  //Adding server information .so, commented and modifying according to the requirement
    // if(track<undoRedoTracker.length-1) track++;
    // //track action
    // let trackObj={
    //     trackValue:track,
    //     undoRedoTracker
    // }
    // undoredoCanvas(trackObj);
})
function undoredoCanvas(trackObj){
    track=trackObj.trackValue;
    undoRedoTracker=trackObj.undoRedoTracker; 

    let url=undoRedoTracker[track];
    let img=new Image();// new image reference element
    img.src=url;
    img.onload=(e)=>{
        tool.drawImage(img,0,0,canvas.width , canvas.height);
    }

}

function beginPath(strokeObj){
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y)

}
function drawStroke(strokeObj){
    tool.strokeStyle=strokeObj.color;
    tool.lineWidth=strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
        tool.stroke();


}
pencilColor.forEach((colorEle)=>{
    colorEle.addEventListener('click',(e)=>{
        let color=colorEle.classList[0];
        penColor =color;
        tool.strokeStyle=penColor;
    })
})
pencilWidthElem.addEventListener("change",(e)=>{
    penWidth=pencilWidthElem.value;
    tool.lineWidth=penWidth;
})
eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth=eraserWidthElem.value;
    tool.lineWidth=eraserWidth;
})

earser.addEventListener("click",(e)=>{
    if(earserFlag){
        tool.strokeStyle=eraserColor;
        tool.lineWidth=eraserWidth;

    }else{
        tool.strokeStyle=penColor;
        tool.lineWidth=penWidth;

    }
})

download.addEventListener("click",(e)=>{

    let url=canvas.toDataURL();

    let a=document.createElement("a");
    a.href=url;
    a.download="board.jpg";
    a.click();
})

socket.on("beginPath",(data)=>{
    //data=>data from server
    beginPath(data);
})

socket.on("drawStroke",(data)=>{
    drawStroke(data);

})
socket.on("redoUndo",(data)=>{
    undoredoCanvas(data);
})

