import { workouts } from '../data/workout.js'

export function initWorkout() {
 const exercisesList = document.querySelector('.workout__exercises-list')

 function createExercise(item) {
  const listItem = document.createElement('li')
  const listTitle = document.createElement('h2')
  const listReps = document.createElement('p')
  const listLoad = document.createElement('p')
  const listNote = document.createElement('p')

  listItem.className = 'workout__exercises-item'
  listTitle.className = 'workout__exercises-title'
  listReps.className = 'workout__exercises-reps'
  listLoad.className = 'workout__exercises-load'
  listNote.className = 'workout__exercises-note'

  listTitle.textContent = item.name
  listReps.textContent = `Повтори: ${item.reps}`
  listLoad.textContent = `Навантаження: ${item.load}`
  listNote.textContent = `Коментар: ${item.note}`

  listItem.append(listTitle, listReps, listLoad, listNote)

  return listItem
 }
 function renderWorkouts(items) {
  exercisesList.innerHTML = ''

  const listItems = items.map(item => createExercise(item))

  exercisesList.append(...listItems)
 }

 renderWorkouts(workouts)
}
