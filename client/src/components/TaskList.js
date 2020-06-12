import React, { Fragment, useContext } from 'react';
import Task from './Task'
import ProjectContext from '../context/projects/ProjectContext'
import TaskContext from '../context/tasks/TaskContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const TaskList = () => {

    //Obtener el state del formulario de proyectos
    const projectsContext = useContext(ProjectContext)
    const { project, deleteProject } = projectsContext

     // Obtener las tareas del proyecto
    const tasksContext = useContext(TaskContext);
    const { projectTasks } = tasksContext;

    // Si no hay ningun proyecto seleccionado
    if(!project) return <h2>Selecciona un proyecto</h2>

    // Array destructuring para extraer el proyecto actual
    const [actualProject] = project

    // Eliminar proyecto
    const handleDeleteProject = () =>{
        deleteProject(actualProject.id)
    }
    return ( 
        <Fragment>
            <h2>Proyecto: {actualProject.projectName} </h2>

            <ul className='listado-tareas'>
                {projectTasks.length === 0
                    ? <li className='tarea'><p>No hay tareas</p></li>
                    : 
                    <TransitionGroup>
                      {  projectTasks.map(task =>
                        <CSSTransition
                            key={task.id}
                            timeout={200}
                            classNames='tarea'
                        >
                            <Task
                                task={task}
                            />
                        </CSSTransition>
                        )}
                    </TransitionGroup>
                }
            </ul>

            <button 
                type='button' 
                className='btn btn-eliminar'
                onClick={handleDeleteProject}
            >Eliminar Proyecto &times;</button>

        </Fragment>
     );
}
 
export default TaskList;