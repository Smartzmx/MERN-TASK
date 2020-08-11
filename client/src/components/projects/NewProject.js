import React, { Fragment, useState, useContext } from 'react';
import ProjectContext from '../../context/projects/ProjectContext'

const NewProject = () => {

    //Obtener el state del formulario de proyectos
    const projectsContext = useContext(ProjectContext)

    //Destructuring de projectContext
    const {projectForm, errorForm, handleProjectForm, addNewProject, showError} = projectsContext

    // State for Project component
    const [project, setProject] = useState({
        projectName:''
    })

    //Destructuring state objet
    const {projectName} = project

    // Function to handle on change event
    const handleChange =(e) =>{
        setProject({
            ...project,
            [e.target.name]:e.target.value
        })
    }

    // Function to handle on submit event
    const handleSubmit = (e) =>{
        e.preventDefault()

        // Validar nombre del proyecto
        if (projectName === ''){
            showError()
            return
        }

        // agregar al state
        addNewProject(project)

        // Reniciar el form
        setProject({
            projectName:''
        })
    }

    return (  
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={handleProjectForm}
            >Nuevo Proyecto</button>

            {/* Condicional para mostrar u ocultar el formulario de proyectos, en base a si el usuario quiere agregar un nuevo proyecto */}
            { projectForm ? 
                (
                    <form
                        className='formulario-nuevo-proyecto'
                        onSubmit={handleSubmit}
                    >
                        <input
                            type='text'
                            className='input-text'
                            placeholder='Nombre del Proyecto'
                            name='projectName'
                            value={projectName}
                            onChange={handleChange}
                        />

                        <input
                            type='submit'
                            className='btn btn-primario btn-block'
                            value='Agregar Proyecto'
                        />

                    </form>
                ) : null
            }

            {errorForm ? 
                <p className="mensaje error">El nombre del proyecto es obligatorio</p>
            : null
            }
        </Fragment>
    );
}
 
export default NewProject;