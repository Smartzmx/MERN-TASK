import {PROJECT_FORM, GET_PROJECT_LIST, ADD_PROJECT, VALIDATE_FORM, ACTUAL_PROJECT, DELETE_PROJECT} from '../../types/index'

export default (state, action) =>{
    switch(action.type){
        case PROJECT_FORM:
            return {
                ...state,
                projectForm: true
            }
        case GET_PROJECT_LIST:
            return{
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return{
                ...state,
                projects: [...state.projects, 
                            action.payload],
                projectForm: false,
                errorForm:false      
            }
        case VALIDATE_FORM:
            return{
                ...state,
                errorForm:true     
            }
        case ACTUAL_PROJECT:
            return{
                ...state,
                project: state.projects.filter(project => project.id === action.payload)    
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }
        default:
            return state
    }
}