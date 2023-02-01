let todoInput, errorInfo, addBtn, ulList, newTask, msg, msgInfo, editTask, msgInput, msgAccept, msgCancel,contentToDo,contentInput,dateA,colorN, tmpDateS
let checkN
if(localStorage.length > 0) {
    checkN = 0
}
const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const StartApp = () =>{
    for (let i = 0; i < localStorage.length; i++){
        const storedBlogs = JSON.parse(localStorage.getItem(localStorage.key(i)))
        todoInput.value = storedBlogs[1]
        contentInput.value = storedBlogs[2]
        colorN.value = storedBlogs[0]
        tmpDateS = storedBlogs[3]
        addNewTask()
    }
    checkN = 1
    console.log(ulList.childNodes)
    ulList.re(ulList.childNodes[2],ulList.childNodes[1])
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
    msgAccept = document.querySelector('.accept')
    msgCancel = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)
    msgCancel.addEventListener('click', closeMsg)
    msgAccept.addEventListener('click', acceptTaskChange)
    todoInput.addEventListener('keyup', enterClick)
}

const addNewTask = () => {
    if(todoInput.value !== ''  &&  contentInput.value !== '') {
        newTask = document.createElement('li')
        newTask.style.backgroundColor = colorN.value
        newTask.textContent = todoInput.value
        contentToDo = document.createElement('p')
        contentToDo.textContent = contentInput.value
        newTask.append(contentToDo)
        contentToDo = document.createElement('p')
        dateA = new Date()
        if(tmpDateS === undefined || tmpDateS === '') {
            tmpDateS = `${dateA.getDate()}.${dateA.getMonth() + 1}.${dateA.getFullYear()}`
        }
        contentToDo.textContent = 'Note Create: ' + tmpDateS
        newTask.append(contentToDo)
        createToolsArea()
        ulList.append(newTask)
        if(checkN === 1){
            const myArr = [colorN.value, todoInput.value,contentInput.value,tmpDateS];
            localStorage.setItem(contentInput.value, JSON.stringify(myArr))
            console.log(localStorage)
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
    const edit = document.createElement('button')
    edit.classList.add('edit')
    edit.innerText = 'EDIT'
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">close</span>'
    tools.append(edit,deleteBtn)
}

const checkClick = e => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed')
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
    console.log(editTask.firstChild)
    msg.style.display = 'flex'
}
const closeMsg = () => {
    msg.style.display = 'none'
    msgInfo.textContent = ''
}

const acceptTaskChange = () =>{
    if(msgInput.value !== '')
    {
        const myArr = JSON.parse(localStorage.getItem(editTask.firstElementChild.textContent))
        localStorage.removeItem(editTask.firstElementChild.textContent)
        myArr[1] = msgInput.value
        localStorage.setItem(contentInput.value, JSON.stringify(myArr))
        editTask.firstChild.textContent = msgInput.value
        closeMsg()
    }
    else{
        msgInfo.textContent = 'Please type value'
    }
}

const deleteTask = (event) =>{
    localStorage.removeItem(event.target.closest('li').firstElementChild.textContent)
    event.target.closest('li').remove()
    const allTask = ulList.querySelectorAll('li')
    if(allTask.length === 0){
        errorInfo.textContent = 'Note list is empty!'
    }
}

const enterClick = (event) =>{
    if(event.key === 'Enter'){
        addNewTask()
    }
}

window.addEventListener("load", function() {
    msg.style.display = 'none'
    StartApp()
});