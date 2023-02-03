let todoInput, errorInfo, addBtn, ulList, newTask, msg, msgInfo, editTask, msgInput, msgAccept, msgCancel,contentToDo,contentInput,dateA,colorN, tmpDateS
let checkN,i,msgInputContent
if(localStorage.length > 0) {
    checkN = 0
}
const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const StartApp = () =>{
    const myArr = JSON.parse(localStorage.getItem('table'))
    if(myArr !== null) {
        for (let i = 0; i < myArr.length; i++) {
            const endArr = myArr[i]
            tmpDateS = endArr[3]
            addNewTask(endArr[1], endArr[2], endArr[0])
        }
    }
    checkN = 1
    console.log(localStorage)
    //ulList.insertBefore(ulList.childNodes[1],ulList.firstChild)
}

document.addEventListener('DOMContentLoaded', main)
const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-add')
    contentInput = document.querySelector('.content-input')
    colorN = document.querySelector('.form-list')
    errorInfo = document.querySelector('.error')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.list ul')
    msg = document.querySelector('.editTask')
    msgInfo = document.querySelector('.editTask-msg')
    msgInput = document.querySelector('.editTask-input')
    msgInputContent = document.querySelector('.editTaskContent-input')
    msgAccept = document.querySelector('.accept')
    msgCancel = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', Start)
    ulList.addEventListener('click', checkClick)
    msgCancel.addEventListener('click', closeMsg)
    msgAccept.addEventListener('click', acceptTaskChange)
    todoInput.addEventListener('keyup', enterClick)
    contentInput.addEventListener('keyup', enterClick)
}

const addNewTask = (a,b,c) => {
    if(a !== ''  &&  b !== '') {
        newTask = document.createElement('li')
        newTask.style.backgroundColor = c
        newTask.textContent = a
        contentToDo = document.createElement('p')
        contentToDo.classList.add('pContent')
        contentToDo.textContent = b
        newTask.append(contentToDo)
        contentToDo = document.createElement('p')
        contentToDo.classList.add('pDate')
        dateA = new Date()
        if(tmpDateS === undefined || tmpDateS === '') {
            tmpDateS = `${dateA.getDate()}.${dateA.getMonth() + 1}.${dateA.getFullYear()}`
        }
        contentToDo.textContent = 'Note Create: ' + tmpDateS
        newTask.append(contentToDo)
        createToolsArea()
        ulList.append(newTask)
        if(checkN === 1){
            endUnload()
        }
        todoInput.value = ''
        contentInput.value = ''
        tmpDateS = ''
        errorInfo.textContent = ''
    }
    else {
        errorInfo.textContent = 'Write note content'
    }
}
const createToolsArea = () =>{
    const tools = document.createElement('div')
    tools.classList.add('tool')
    newTask.append(tools)
    const accept = document.createElement('button')
    accept.innerText = 'Pin Up'
    accept.classList.add('complete')
    const edit = document.createElement('button')
    edit.classList.add('edit')
    edit.innerText = 'EDIT'
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Delete Note'
    deleteBtn.classList.add('delete')
    //deleteBtn.innerHTML = '<span class="material-symbols-outlined">close</span>'
    tools.append(accept,edit,deleteBtn)
}

const checkClick = e => {
    if(e.target.matches('.complete')){
        changeNode(e)
    }
    else if(e.target.matches('.edit')){
        editMsg(e)
    }
    else if(e.target.matches('.delete')){
        deleteTask(e)
    }
}

const editMsg = event => {
    editTask = event.target.closest('li')
    msgInput.value = editTask.firstChild.textContent
    msgInputContent.value = editTask.childNodes[1].textContent
    console.log(editTask.firstChild)
    msg.style.display = 'flex'
}
const closeMsg = () => {
    msg.style.display = 'none'
    msgInfo.textContent = ''
}

const acceptTaskChange = () =>{
    if(msgInput.value !== '' && msgInputContent.value !== '' )
    {
        editTask.firstChild.textContent = msgInput.value
        editTask.childNodes[1].textContent = msgInputContent.value
        endUnload()
        closeMsg()
    }
    else{
        msgInfo.textContent = 'Please type value'
    }
}

const deleteTask = (event) =>{
    const li = event.target.closest('li')
    const index = Array.from(ulList.childNodes).indexOf(li);
    console.log(index)
    localStorage.removeItem(index)
    event.target.closest('li').remove()
    const allTask = ulList.querySelectorAll('li')
    endUnload()
    if(allTask.length === 0){
        errorInfo.textContent = 'Note list is empty!'
    }
}

const changeNode = (event) =>{
    const li = event.target.closest('li')
    const index = Array.from(ulList.childNodes).indexOf(li);
    console.log(index)
    ulList.insertBefore(ulList.childNodes[index],ulList.firstChild)
    endUnload()

}

const Start = () =>{
    addNewTask(todoInput.value,contentInput.value,colorN.value)
}

const enterClick = (event) =>{
    if(event.key === 'Enter'){
        addNewTask(todoInput.value,contentInput.value,colorN.value,)
    }
}

const endUnload = () =>{
    localStorage.clear()
    let endArr = []
    for (i = 0;i < ulList.childNodes.length;i++){
        let dd = ulList.childNodes[i].childNodes[2].textContent.split(' ')
        const myArr = [ulList.childNodes[i].style.backgroundColor, ulList.childNodes[i].childNodes[0].textContent,ulList.childNodes[i].childNodes[1].textContent,dd[2]];
        endArr.push(myArr)
    }
    console.log(endArr)
    localStorage.setItem('table', JSON.stringify(endArr))
}

window.addEventListener("load", function() {
    msg.style.display = 'none'
    StartApp()
});
