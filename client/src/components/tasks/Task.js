import React, {useContext} from 'react';
import ProjectContext from '../../context/projects/ProjectContext'
import TaskContext from '../../context/tasks/TaskContext'

const Task = ({task}) => {

    //Obtener el proyecto
    const projectsContext = useContext(ProjectContext);

    //Destructuring
    const { projectSelected } = projectsContext

    // Obtener la funcion del context de tarea
    const tasksContext = useContext(TaskContext);

     //Destructuring
    const {deleteTask, getTasks, changeStateTask, editTask} = tasksContext;

    // Funcion eliminar tarea y actualizar tareas
    const handleDeleteTask = id =>{
        deleteTask(id)
        getTasks(projectSelected[0].id)
    }

    // Funcion que modifica el estado o estatus de cada tarea
    const handleChangeStateTask = task =>{
        if(task.taskState){
            task.taskState= false
        } else {
            task.taskState= true
        }
        changeStateTask(task)
    }
    
    // Función editar tarea
    const handleEditTask = task =>{
        editTask(task)
    }


    return ( 
        <li className='tarea sombra'>
            <p>{task.taskName}</p>
            <div className="estado">
                {task.taskState
                ?(
                    <button
                        type='button'
                        className='completo'
                        onClick={() =>{handleChangeStateTask(task)}}
                    >Completo</button>
                )
                :(
                    <button
                        type='button'
                        className='incompleto'
                        onClick={() =>{handleChangeStateTask(task)}}
                    >Incompleto</button>
                )
                }
            </div>

            <div className="acciones">
                <button
                    type='button'
                    className='btn btn-primario'
                    onClick={() =>{handleEditTask(task)}}
                >Editar</button>
                <button
                    type='button'
                    className='btn btn-secundario'
                    onClick={() =>{handleDeleteTask(task.id)}}
                >Eliminar</button>

            </div>
        </li>
     );
}
 
export default Task;