import React, {useContext, useEffect} from 'react'
import Project from './Project'
import ProjectContext from '../context/projects/ProjectContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ProjectList = () => {

    //Destructuring projects del state inicial
    const projectsContext = useContext(ProjectContext)
    const {projects, handleProjectList} = projectsContext

    // Obtener la lista de proyectos cuando carga el componente, una sola vez
    useEffect(() =>{
        handleProjectList()
        // eslint-disable-next-line
    },[])

    // Revisamos si projects tiene contenido
    if(projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>

    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projects.map(projectItem =>(
                <CSSTransition
                    key={projectItem.id}
                    timeout={200}
                    classNames='proyecto'
                >   
                    <Project 
                        projectItem={projectItem}
                    />
                </CSSTransition>
                 ))} 
            </TransitionGroup>
        </ul>
     );
}
 
export default ProjectList;