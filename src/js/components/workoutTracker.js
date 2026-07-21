export function initWorkout() {
 let saved
 try {
  saved = JSON.parse(localStorage.getItem('workouts'))
 } catch {
  saved = null // зіпсовано → починаємо чисто
 }
 const workouts = saved || []
 const exercisesList = document.querySelector('.workout__exercises-list')
 const workoutForm = document.querySelector('.workout__form')
 const summary = document.querySelector('.workout__summary')

 function createExercise(item, index) {
  const listItem = document.createElement('li')
  const listTitleWrap = document.createElement('div')
  const listTitle = document.createElement('h2')
  const deleteBtn = document.createElement('button')
  const listReps = document.createElement('p')
  const listLoad = document.createElement('p')
  const listNote = document.createElement('p')
  const listSpanReps = document.createElement('span')
  const listSpanLoad = document.createElement('span')
  const listSpanNote = document.createElement('span')

  listItem.className = 'workout__exercises-item'
  listItem.dataset.index = index
  listTitleWrap.className = 'workout__exercises-wrap-title'
  listTitle.className = 'workout__exercises-title'
  listReps.className = 'workout__exercises-row'
  listLoad.className = 'workout__exercises-row'
  listNote.className = 'workout__exercises-row workout__exercises-row--note'

  deleteBtn.className = 'workout__exercises-delete'
  deleteBtn.dataset.action = 'delete'

  listSpanReps.textContent = item.reps
  listSpanLoad.textContent = item.load
  listSpanNote.textContent = item.note

  listTitle.textContent = item.name
  listReps.textContent = `Повтори: `
  listLoad.textContent = `Навантаження: `
  listNote.textContent = `Коментар: `

  if (item.done) {
   listItem.classList.add('workout__exercises-item--done')
  }
  listTitleWrap.append(listTitle, deleteBtn)
  listReps.append(listSpanReps)
  listLoad.append(listSpanLoad)
  listNote.append(listSpanNote)

  listItem.append(listTitleWrap, listReps, listLoad, listNote)
  return listItem
 }

 function renderWorkouts(items) {
  exercisesList.innerHTML = ''

  const listItems = items.map((item, index) => createExercise(item, index))

  exercisesList.append(...listItems)

  const totalExercises = items.length
  const doneExercises = items.filter(item => item.done)

  if (items.length === 0) {
   const emptyItem = document.createElement('li')
   const emptyParagraph = document.createElement('p')

   emptyItem.className = 'workout__exercises-empty'
   emptyParagraph.className = 'workout__exercises-empty-text'

   emptyParagraph.textContent = `Додайте своє перше заняття`

   emptyItem.append(emptyParagraph)
   exercisesList.append(emptyItem)
  }
  summary.textContent = `Виконано: ${doneExercises.length} / ${totalExercises}`
 }

 function saveWorkouts() {
  localStorage.setItem('workouts', JSON.stringify(workouts))
 }

 workoutForm.addEventListener('submit', event => {
  event.preventDefault()

  const exerciseNameValue = workoutForm
   .querySelector('[name="exercise-name"]')
   .value.trim()

  const exerciseRepsValue = Number(
   workoutForm.querySelector('[name="exercise-reps"]').value.trim()
  )
  const exerciseLoadValue = workoutForm
   .querySelector('[name="exercise-load"]')
   .value.trim()

  const exerciseNoteValue = workoutForm
   .querySelector('[name="exercise-note"]')
   .value.trim()

  const isInvalid =
   !exerciseNameValue || !exerciseRepsValue || !exerciseLoadValue
  if (isInvalid) return

  workouts.push({
   name: exerciseNameValue,
   reps: exerciseRepsValue,
   load: exerciseLoadValue,
   note: exerciseNoteValue,
   done: false,
  })

  saveWorkouts()
  renderWorkouts(workouts)

  workoutForm.reset()
 })

 exercisesList.addEventListener('click', event => {
  const listItemTarget = event.target.closest('.workout__exercises-item')

  if (!listItemTarget) return

  const index = Number(listItemTarget.dataset.index)

  if (event.target.dataset.action === 'delete') {
   workouts.splice(index, 1)
  } else {
   workouts[index].done = !workouts[index].done
  }

  saveWorkouts()
  renderWorkouts(workouts)
 })

 renderWorkouts(workouts)
}
