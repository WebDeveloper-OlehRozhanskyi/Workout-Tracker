import { tasks } from '../data/array-of-tasks'

export function initTodo() {
 const toDoList = document.querySelector('.todo-task__list')
 const form = document.querySelector('.todo-task__form')
 const counter = document.querySelector('.todo-task__counter')

 function createListItem(item, index) {
  const listItem = document.createElement('li')
  const listText = document.createElement('span')
  const deleteBtn = document.createElement('button')

  listItem.className = 'todo-task__item'
  listItem.dataset.index = index

  listText.className = 'todo-task__text'
  listText.textContent = item.name

  if (item.priority === 'low') {
   listItem.classList.add('todo-task__item--low')
  } else {
   listItem.classList.add('todo-task__item--high')
  }

  deleteBtn.className = 'todo-task__delete'
  deleteBtn.dataset.action = 'delete'

  if (item.done) {
   listText.classList.add('todo-task__text--done')
  }
  listItem.append(listText)
  listItem.append(deleteBtn)

  return listItem
 }

 function renderToDoList(items) {
  toDoList.innerHTML = ''

  if (items.length === 0) {
   const empty = document.createElement('li')
   empty.className = 'todo-task__empty'
   empty.textContent = 'Немає завдань'
   toDoList.append(empty)

   counter.textContent = 'Активних: 0'
   return
  }

  const listItems = items.map((item, index) => createListItem(item, index))

  toDoList.append(...listItems)

  const taskCount = items.filter(item => !item.done)

  counter.textContent = `Активних: ${taskCount.length}`
 }

 renderToDoList(tasks)

 form.addEventListener('submit', event => {
  event.preventDefault()

  const input = form.querySelector('.todo-task__input')
  const inputValue = input.value.trim()
  const inputRadio = form.querySelector('input[name="priority"]:checked')

  if (!inputValue) return

  const formattedValue = inputValue[0].toUpperCase() + inputValue.slice(1)

  tasks.push({
   name: formattedValue,
   done: false,
   priority: inputRadio.value,
  })

  renderToDoList(tasks)

  input.value = ''
 })

 toDoList.addEventListener('click', event => {
  const listItem = event.target.closest('.todo-task__item')
  if (!listItem) return

  const index = Number(listItem.dataset.index)
  if (event.target.dataset.action === 'delete') {
   tasks.splice(index, 1)
  } else {
   tasks[index].done = !tasks[index].done
  }

  renderToDoList(tasks)
 })
}
