/*############### CREATING SESSION ####################*/
/*
    @Author: Oyekunle Opeyemi
    @Email: iamomoluabi@gmail.com
    @Date: November 12th, 2022
    @Version: 1.0.0
*/

const addSession = document.getElementById("addSession");
const sessionContainer = document.getElementById("sessionContainer");
const addDay = document.getElementById("addDay");
const dayContainer = document.getElementById("dayContainer");
const remove = document.getElementsByClassName("remove");
const removeDay = document.getElementsByClassName("remove-day");
const count = document.getElementById("count");
const resetDays = document.getElementById("resetDays");
 
addSession.addEventListener("click", function (e) {
    speakerTopicCreation(sessionContainer, 1);
});

function createElement(element, container) {
    const newElement = document.createElement(element);
    const newContent = container.appendChild(newElement);
    return newContent;
}

function addInputAttributes(element, name, count) {
    element.setAttribute("type", "text");
    element.setAttribute("placeholder", name);
    element.setAttribute("class", name);
    element.setAttribute("name", `${name}${count}[]`);
    return element;
}

function speakerTopicCreation(sessionContainer, count) {
    //create new elements
    const newPara = createElement("p", sessionContainer); //append the new paragraph to the container
    const newSpeaker = createElement("input", newPara); //append to 
    const newSpan = createElement("span", newPara);
    const newTopic = createElement("input", newPara);
    const newBtn = createElement("button", newPara);
    
    // add attributes to the new input fields
    addInputAttributes(newSpeaker, "speaker", count);
    addInputAttributes(newTopic, "topic", count);
    
    newSpan.innerText = " ";//to create space between the input fields
    btnDesign(newBtn); //adding value and attritbutes to the remove button
}

function btnDesign(newBtn, newText="X", className="remove") {
    newBtn.innerText = newText;
    newBtn.classList.add(className);
    newBtn.setAttribute("onclick", "this.parentNode.remove()");
}

/* ############################### NEW DAY ###############################*/
addDay.addEventListener("click", function (e) {
    let sessionCount = parseInt(count.value) + 1;
    //creating new elements
    const newDiv = createElement("div", dayContainer);
    const newH4 = createElement("h4", newDiv);
    const newBtn = createElement("button", newDiv);
    const newBtnRemoveDay = createElement("button", newDiv);
    const newHr = createElement("hr", newDiv);

    btnDesign(newBtnRemoveDay, "Delete", "btn"); //adding value and attritbutes to the delete button
    newBtnRemoveDay.classList.add("btn-remove-day", "text-uppercase");

    const uniqueID = `sessionDay${sessionCount}`;

    //adding attributes
    newBtn.setAttribute("type", "button");
    newBtn.setAttribute("id", uniqueID);
    newBtn.setAttribute("data-container", "newContainer"+sessionCount);
    newBtn.setAttribute("data-count", sessionCount);
    newBtn.setAttribute("onclick", "createNewSession(this)");
    newBtn.classList.add("btn", "btn-custom", "text-uppercase");
    newBtn.innerText = "Add a session";

    newDiv.setAttribute("id", "newContainer"+sessionCount);

    count.value = sessionCount;
    newH4.classList.add("text-white");
    newH4.innerText = `DAY ${sessionCount}`;
});

function createNewSession(e) {
    const sessionContainer = document.getElementById(e.getAttribute("data-container"));
    const count = e.getAttribute("data-count")
    speakerTopicCreation(sessionContainer, count);
}

/* ############################## MODAL ########################## */
const addDayModal = document.getElementById("addDayModal");

const close = document.getElementById("close");

addDayModal.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
    const dayModal = document.getElementById("dayModal");
    if (dayModal.classList.contains("day-modal-none")) {
        dayModal.classList.remove("day-modal-none");
        dayModal.classList.add("day-modal-active");
    }else{
        dayModal.classList.remove("day-modal-active");
        dayModal.classList.add("day-modal-none");
    }
}

/* ############################## RESET DAYS ########################## */
resetDays.addEventListener("click", function () {
    const allCounts = document.querySelectorAll("#dayContainer h4");
    count.value = allCounts.length+1;
    for (let i = 0; i < allCounts.length; i++) {
        allCounts[i].innerText = `DAY ${i+2}`;
    } 
 });