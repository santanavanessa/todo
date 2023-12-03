import './styles/global.css';
import './main.tsx';
import { Header } from './components/Header.tsx';
import { Tasks } from './components/Tasks.tsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NewTaskForm } from './components/NewTaskForm.tsx';

const LOCAL_STORAGE_KEY = "todo:savedTasks";

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function setAndSaveTasks(newTasks: ITask[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));

  }

  function addTask(taskTitle: string) {
      setAndSaveTasks([
          ...tasks,
          {
            id: uuidv4(),
            title: taskTitle,
            isCompleted: false,
          }
      ]);
  }

  function deleteTaskById(taskId: string) { 
    const newTasks = tasks.filter(task => task.id !== taskId);
    setAndSaveTasks(newTasks);
  }

  function toggleTaskCompletedById(taskId: string) {
      const newTasks = tasks.map(task => {
          if(task.id === taskId) {
              return {
                ...task,
                isCompleted: !task.isCompleted,
              };
          }
          return task;
      });
      setAndSaveTasks(newTasks);
  }
 
  return (
    <>
        <Header/>
        <NewTaskForm  onAddTask={addTask}/>
        <Tasks 
        tasks={tasks} 
        onDelete={deleteTaskById}
        onComplete={ toggleTaskCompletedById}
        />
      
 
    </>
   
  )
}

export default App
