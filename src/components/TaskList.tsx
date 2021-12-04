import { useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function generateId(numberOfTasks: number):number {
    // 1 execução max = 100 min = 0
    // 2 execução max = 200 min = 100
    // 3 execução max = 300 min 200

    // Para não haver colisão de ids
    const max = numberOfTasks === 0 ? 100 : (numberOfTasks + 1) * 100; 
    const min = numberOfTasks * 100;
    return Math.floor(Math.random() * (max - min) + min)
  }

  function handleCreateNewTask() {
    if(newTaskTitle){
      const task = {
        title:newTaskTitle,
        id:generateId(tasks.length),
        isComplete:false
      }
      setTasks((oldState) => [...oldState, task])
      setNewTaskTitle('')
    }

  }

  function handleToggleTaskCompletion(id: number) {
    const tasksToggle = tasks.map(task => {
      return task.id === id ? {...task, isComplete:!task.isComplete} : task 
    })
    setTasks(tasksToggle)
  }

  function handleRemoveTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id )
    setTasks(newTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}