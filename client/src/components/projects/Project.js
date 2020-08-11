import React, {useContext} from 'react';
import ProjectContext from '../../context/projects/ProjectContext'
import TaskContext from '../../context/tasks/TaskContext'

const Project = ({projectItem}) => {

    //Obtener el state de proyectos
    const projectsContext = useContext(ProjectContext);

    //Destructuring de projectsContext
    const { handleProjectSelected } = projectsContext

    // Obtener la funcion del context de tarea
    const tasksContext = useContext(TaskContext);
    const {getTasks} = tasksContext;

    // Funcion para agregar el proyecto actual 

    const selectedProjectFn = id =>{
        handleProjectSelected(id);
        getTasks(id);
    }

    return (   
        <li>
            <button
                type="button"
                className="btn btn-blank"
                // siempre que la función tenga algun parametro es necesario llamarla como una callback
                onClick={()=> selectedProjectFn(projectItem.id) }
            >
                {projectItem.projectName}
            </button>
        </li>
     );
}
 
export default Project;