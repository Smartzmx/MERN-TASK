import React, {useContext, useState, useEffect} from 'react';
import ProjectContext from '../context/projects/ProjectContext'
import TaskContext from '../context/tasks/TaskContext'

const FormTask = () => {

     //Obtener el state para validar si un proyecto esta activo
     const projectsContext = useContext(ProjectContext)
     const { project } = projectsContext

    // Obtener la funcion del context de tarea
    const tasksContext = useContext(TaskContext);
    const {selectedTask, taskError, addTasks, validateTask, getTasks, updateTask, cleanTask} = tasksContext;

    // UseEffect para actualizar en caso de haber una tarea por editar en el formulario de tareas
    useEffect(() =>{
        if(selectedTask !== null){
            setTask(selectedTask)
        } else{
            setTask({
                taskName:''
            })
        }
    },[selectedTask])

     // State del formulario
     const [task, setTask] = useState({
         taskName:''
     })


     // Extraer el nombre del proyecto
     const { taskName } = task

      // Si no hay ningun proyecto seleccionado
    if(!project) return null

    // Array destructuring para extraer el proyecto actual
    const [actualProject] = project

    // leer los valores del formulario de tareas
     const handleChange = e =>{
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
     }

    const handleSubmit = e =>{
        e.preventDefault();

        //validar input
        if(taskName.trim() === ''){
            validateTask();
            return;
        }

        // Evaluar si el usuario desea agregar una nueva tarea o editar una existente
        if(selectedTask === null){
             
            // agregar nueva tarea al sate de tareas
            task.projectId = actualProject.id
            task.taskState = false
            addTasks(task)
        } else {
            // Actualizar tarea seleccionada
            updateTask(task)

            // Limpiar tarea editada del state
            cleanTask()
        }

        // Obtener y filtrar las tareas del proyecto actual

        getTasks(actualProject.id)

        // reiniciar el form de tareas
        setTask({
            taskName: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type='text'
                        className='input-text'
                        placeholder='Nombre Tarea...'
                        name='taskName'
                        value={taskName}
                        onChange= {handleChange}

                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={selectedTask ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {taskError ? 
                <p className="mensaje error">El nombre de la tarea es obligatorio</p>
            :null}
        </div>

     );
}
 
export default FormTask;