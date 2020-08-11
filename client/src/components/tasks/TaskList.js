import React, { Fragment, useContext } from 'react';
import Task from './Task'
import ProjectContext from '../../../src/context/projects/ProjectContext';
import TaskContext from '../../../src/context/tasks/TaskContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const TaskList = () => {

    //Obtener el state del formulario de proyectos
    const projectsContext = useContext(ProjectContext)

    //Destructuring 
    const { projectSelected, deleteProject } = projectsContext

     // Obtener las tareas del proyecto
    const tasksContext = useContext(TaskContext);

    //Destructuring
    const { projectTasks } = tasksContext;

    // Si no hay ningun proyecto seleccionado
    if(!projectSelected) return <h2>Selecciona un proyecto</h2>

    // Array destructuring para extraer la posición y todos sus datos del proyecto seleccionado
    const [selectedProject] = projectSelected

    // Eliminar proyecto
    const handleDeleteProject = () =>{
        deleteProject(selectedProject.id)
    }
    return ( 
        <Fragment>
            <h2>Proyecto: {selectedProject.projectName} </h2>

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