import React, {useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProjectContext from './ProjectContext'
import ProjectReducer from './ProjectReducer'
import {
    PROJECT_FORM, 
    GET_PROJECT_LIST, 
    ADD_PROJECT, 
    VALIDATE_FORM, 
    PROJECT_SELECTED, 
    DELETE_PROJECT
} from '../../types'


// En este archivo se escriben la funciones que manda llamara al reducer

// En este archivo se concentra todos los states que van a fluir entre difierentes componentes
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
        projectSelected: null
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProjectReducer, initialState)

    // Funciones para el CRUD de proyectos

    //Funcion para mostrar el formaulario de agregar un nuevo proyecto
    const handleProjectForm = () =>{
        dispatch({
            type:PROJECT_FORM
        })
    }

    // Obtener proyectos
    const handleProjectList = () =>{
        // siempre lo que tome la función como parametro es lo que va a hacer el payload
        dispatch({
            type:GET_PROJECT_LIST,
            payload: projects
        })
    }

    // Agregar nuevo proyecto
    const addNewProject = project =>{
        //generamos un id unico a traves de la librería uuid
        project.id = uuidv4()

         // siempre lo que tome la función como parametro es lo que va a hacer el payload
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
    const handleProjectSelected = projectId =>{
        dispatch({
            type: PROJECT_SELECTED,
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
        // Provider, es donde se almacenan todos los datos y funciones, en este caso relacionados a project
        <ProjectContext.Provider
        // value va a contener todo el state inicial
            value={{
                projectForm: state.projectForm,
                projects: state.projects,
                errorForm: state.errorForm,
                projectSelected: state.projectSelected,
                handleProjectForm,
                handleProjectList,
                addNewProject,
                showError,
                handleProjectSelected,
                deleteProject
            }}
        >
            {/* props.children es para hacer que todos los componentes hijos tengan acceso a los datos generados en este provider */}
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState