import { TbClipboardText } from 'react-icons/tb';
import { ITask } from '../App';
import { Task } from './Task';
import styles from './Tasks.module.css';


interface Props {
    tasks: ITask[];
    onDelete: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export function Tasks({ tasks, onDelete, onComplete }: Props) {

    const tasksCount = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;

    return (
        
                <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p className={styles.blueText}>Tarefas criadas</p>
                    <span>{tasksCount}</span>

                </div>

                <div>
                    <p className={styles.purpleText}>Concluídas</p>
                    <span>{completedTasks} de {tasksCount}</span>
                </div>
            </header>

            <div className={styles.list}>
                {tasks.map(task => {
                    return (
                        <Task
                        key={task.id} 
                        task={task} 
                        onDelete={onDelete}
                        onComplete={onComplete}
                        />
                    )
                })}

                {tasks.length <= 0 && (
                    <section className={styles.empty}>
                        <TbClipboardText size={50} />
                        <div>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <span>Crie tarefas e organize seus itens a fazer</span>
                        </div>
                    </section>
                )}
            </div>
        </section>
       
    
    )
}