import {
    PROJECT_FORM, 
    GET_PROJECT_LIST, 
    ADD_PROJECT, 
    VALIDATE_FORM, 
    PROJECT_SELECTED, 
    DELETE_PROJECT
} from '../../types/index'


// el reducer lo que hace es cambiar el state
export default (state, action) =>{
    switch(action.type){
        case PROJECT_FORM:
            // siempre se toma una copia del state
            return {
                ...state,
                projectForm: true
            }
        case GET_PROJECT_LIST:
            // siempre se toma una copia del state
            return{
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            // siempre se toma una copia del state
            return{
                ...state,
                // agrego el nuevo proyecto que es un objeto con action.payload al array (de objetos) de proyectos existente
                projects: [...state.projects, 
                            action.payload],
                projectForm: false,
                errorForm:false      
            }
        case VALIDATE_FORM:
            // siempre se toma una copia del state
            return{
                ...state,
                errorForm:true     
            }
        case PROJECT_SELECTED:
            // siempre se toma una copia del state
            return{
                ...state,
                projectSelected: state.projects.filter(project => project.id === action.payload)    
            }
        case DELETE_PROJECT:
            // siempre se toma una copia del state
            return{
                ...state,
                // con el método filter, obtengo un nuevo arreglo cuando la condicion señalada es verdadera, en este caso el arrglo con el objto del proyecto seleccionado
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }
        // siempre se define el default retornando el state
        default:
            return state
    }
}