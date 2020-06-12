import React, {useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProjectContext from './ProjectContext'
import ProjectReducer from './ProjectReducer'
import {PROJECT_FORM, GET_PROJECT_LIST, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT} from '../../types/index'


const ProjectState = (props) => {

    
    const projects = [
        {id:1, projectName: 'Tienda Virtual'},
        {id:2, projectName: 'Intranet'},
        {id:3, projectName: 'Diseño de sitio web'},
        {id:4, projectName:'MERN'}
    ]

    const initialState = {
        projects: [],
        projectForm: false,
        errorForm: false,
        project: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProjectReducer, initialState)

    // Funciones para el CRUD de proyectos

    const handleProjectForm = () =>{
        dispatch({
            type:PROJECT_FORM
        })
    }

    // Obtener proyectos
    const handleProjectList = () =>{
        dispatch({
            type:GET_PROJECT_LIST,
            payload: projects
        })
    }

    // Agregar nuevo proyecto
    const addNewProject = project =>{
        project.id = uuidv4()

        // Insertar nuevo proyecto en el state
        dispatch({
            type:ADD_PROJECT,
            payload: project
        })
    }

    // Validar formulario por errores
    const showError = () =>{
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // Selecciona el proyecto que el usuario di click
    const actualProject = projectId =>{
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    // Eliminar proyecto
    const deleteProject = projectId =>{
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
    }


    return(
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                projectForm: state.projectForm,
                errorForm: state.errorForm,
                project: state.project,
                handleProjectForm,
                handleProjectList,
                addNewProject,
                showError,
                actualProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState