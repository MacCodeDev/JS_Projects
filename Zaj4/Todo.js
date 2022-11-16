let todoInput, errorInfo, addBtn, ulList, newTask, msg, msgInfo, editTask, msgInput, msgAccept, msgCancel

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}
document.addEventListener('DOMContentLoaded', main)
const prepareDOMElements = () => {
    todoInput = document.querySelector('.todo-add')
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
    if(todoInput.value !== '') {
        newTask = document.createElement('li')
        newTask.textContent = todoInput.value
        createToolsArea()
        ulList.append(newTask)
        todoInput.value = ''
        errorInfo.textContent = ''
    }
    else {
        errorInfo.textContent = 'Write task content'
    }
}
const createToolsArea = () =>{
    const tools = document.createElement('div')
    tools.classList.add('tool')
    newTask.append(tools)
    const accept = document.createElement('button')
    accept.classList.add('complete')
    accept.innerHTML ='<span class="material-symbols-outlined">done</span>'
    const edit = document.createElement('button')
    edit.classList.add('edit')
    edit.innerText = 'EDIT'
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">close</span>'

    tools.append(accept,edit,deleteBtn)
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
        editTask.firstChild.textContent = msgInput.value
        closeMsg()
    }
    else{
        msgInfo.textContent = 'Please type value'
    }
}

const deleteTask = (event) =>{
    event.target.closest('li').remove()
    const allTask = ulList.querySelectorAll('li')
    if(allTask.length === 0){
        errorInfo.textContent = 'Task list is empty!'
    }
}

const enterClick = (event) =>{
    if(event.key === 'Enter'){
        addNewTask()
    }
}