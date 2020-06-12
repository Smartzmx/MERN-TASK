import React, { useReducer } from 'react'

import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import uuid from 'uuid';
import {PROJECT_TASKS, 
        ADD_TASK, 
        VALIDATE_TASK, 
        DELETE_TASK, 
        STATE_TASK,
        ACTUAL_TASK,
        UPDATE_TASK,
        CLEAN_TASK} from '../../types/index';

const TaskState = props =>{

    const initialState = {
        tasks:[
            {id:1 ,taskName:'Elegir Plataforma', taskState:true, projectId:1},
            {id:2 ,taskName:'Definir Hosting', taskState:false, projectId:2},
            {id:3 ,taskName:'Diseño Web', taskState:false, projectId:3},
            {id:4 ,taskName:'Edición de imagenes', taskState:true, projectId:4},
            {id:5 ,taskName:'Elegir colores', taskState:true, projectId:1},
            {id:6 ,taskName:'Definir plataforma', taskState:false, projectId:2},
            {id:7 ,taskName:'Diseño prototipos', taskState:false, projectId:3},
        ],
        projectTasks: null,
        taskError: false,
        selectedTask: null
    }

    // Crear el dispatch y state
   const [state, dispatch] = useReducer(TaskReducer, initialState);

   // Crear funciones

   //Obtener las tareas de cada proyecto
    const getTasks = projectId =>{
        dispatch({
            type: PROJECT_TASKS,
            payload: projectId
        })
    }
   
    //Agregar tareas al proyecto seleccionado
    const addTasks = task =>{
        task.id = uuid.v4()
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }


    // Valida y muestra un error en caso necesario
    const validateTask = () =>{
        dispatch({
            type: VALIDATE_TASK
        })
    }

    // Eliminar tarea por id
    const deleteTask = id =>{
        dispatch({
            type:DELETE_TASK,
            payload: id
        })
    }

    // Cambia el estado de cada tarea
    const changeStateTask = task =>{
        dispatch({
            type: STATE_TASK,
            payload: task
        })
    }

    // Extraer tarea para editarla
    const editTask = task =>{
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        }) 
    }

    //Funcion para permitir editar una tarea seleccionada
    const updateTask = task =>{
        dispatch({
            type: UPDATE_TASK,
            payload:task
        })
    }

    //limpiar tarea editada
    const cleanTask = () =>{
        dispatch({
            type: CLEAN_TASK
        })
    }

   return (
      <TaskContext.Provider
        value={{
            tasks: state.tasks,
            projectTasks: state.projectTasks,
            taskError: state.taskError,
            selectedTask: state.selectedTask,
            getTasks,
            addTasks,
            validateTask,
            deleteTask,
            changeStateTask,
            editTask,
            updateTask,
            cleanTask
        }}
      >
          {props.children}
      </TaskContext.Provider> 
   )
    
}

export default TaskState;