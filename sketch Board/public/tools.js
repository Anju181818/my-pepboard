let toolsCont = document.querySelector('.tools-cont');
let optionsCont = document.querySelector('.options-cont');
let optionsFlag = false;
let earserCont = document.querySelector('.earser-tool-cont');
let pencilCont = document.querySelector('.pencil-tool-cont');
let pencil = document.querySelector('.pencil');
let earser = document.querySelector('.earser')
let pencilFlag = false;
let earserFlag = false;
let sticky = document.querySelector('.sticky');
let upload = document.querySelector(".upload");


//true->tools show ,false->hide tools
optionsCont.addEventListener('click', (e) => {
    optionsFlag = !optionsFlag;

    if (optionsFlag) {
        openTools();
    }
    else {
        closeTools();
    }


})
function openTools() {
    let iconElement = optionsCont.children[0];
    iconElement.classList.remove('fa-times');
    iconElement.classList.add('fa-bars');
    toolsCont.style.display = "flex";

}
function closeTools() {
    let iconElement = optionsCont.children[0];
    iconElement.classList.add('fa-times');
    iconElement.classList.remove('fa-bars');
    toolsCont.style.display = "none";


    pencilCont.style.display = "none";
    earserCont.style.display = "none";

}
pencil.addEventListener('click', (e) => {
    pencilFlag = !pencilFlag;
    //true->show pencil tool,false->hide pencil
    if (pencilFlag) {
        pencilCont.style.display = "block";
    }
    else {
        pencilCont.style.display = "none";
    }
})

earser.addEventListener('click', (e) => {
    //true->show earser tool,false->hide earser
    earserFlag = !earserFlag
    if (earserFlag) {
        pencilCont.style.display = "flex";
    } else {
        pencilCont.style.display = "none"
    }
})

upload.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();


    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
         <div class="note-cont">
           <img src=${url}/> 
        </div>`;
        createSticky(stickyTemplateHTML)
    })
})

sticky.addEventListener('click', (e) => {
    let stickyTemplateHTML=`
    <div class="header-cont">
    <div class="minimize"></div>
    <div class="remove"></div>
</div>
<div class="note-cont">
    <textarea  spellcheck="false"></textarea> 
</div>
`;
createSticky(stickyTemplateHTML)
 
})

function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-note");
    stickyCont.innerHTML =stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = document.querySelector(".minimize");
    let remove = document.querySelector(".remove");
    noteActions(minimize, remove, stickyCont);
    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event)
    }
    stickyCont.ondragstart = function () {
        return false;
    };

}

function noteActions(minimize, remove, stickyCont) {
    remove.addEventListener('click', (e) => {
        stickyCont.remove();
    });

    minimize.addEventListener('click', (e) => {
        let noteCont = document.querySelector('.note-cont');
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        console.log("helloe", display);
        if (display === 'none') {
            noteCont.style.display = "block";
        }
        else {
            noteCont.style.display = "none";
        }
    })
}

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the element, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };



}


