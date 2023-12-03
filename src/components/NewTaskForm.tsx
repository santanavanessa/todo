import styles from './NewTaskForm.module.css';
import { LuPlusCircle } from "react-icons/lu";
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
    onAddTask: (taskTitle: string) => void;
}

export function NewTaskForm( { onAddTask }: Props) {
    const [title, setTitle] = useState("");

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onAddTask(title);
        setTitle("");
    }


    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {

        setTitle(event.target.value);
        
    }

    const isTitleEmpty = title.length === 0;
    return (
    
        <form 
            className={styles.newTaskForm} 
            name='newTaskForm'
            onSubmit={handleSubmit}>
                <input
                 placeholder='Adicione uma nova tarefa'
                 onChange={onChangeTitle}
                 value={title}
                 required
                 />
                 <button disabled={isTitleEmpty}>
                    Criar
                    <LuPlusCircle size={16}/>
                </button>
            </form>
    )
}