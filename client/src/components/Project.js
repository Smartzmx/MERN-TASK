import React, {useContext} from 'react';
import ProjectContext from '../context/projects/ProjectContext'
import TaskContext from '../context/tasks/TaskContext'

const Project = ({projectItem}) => {

    //Obtener el state de proyectos
    const projectsContext = useContext(ProjectContext);
    const { actualProject } = projectsContext

    // Obtener la funcion del context de tarea
    const tasksContext = useContext(TaskContext);
    const {getTasks} = tasksContext;

    // Funcion para agregar el proyecto actual 

    const selectProject = id =>{
        actualProject(id);
        getTasks(id);
    }

    return (   
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=> selectProject(projectItem.id) }
            >
                {projectItem.projectName}
            </button>
        </li>
     );
}
 
export default Project;