import React from 'react';
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar';
import FormTask from '../tasks/FormTask'
import TaskList from '../tasks/TaskList'

const Project = () => {
    return (  
        <div className="contenedor-app">

            <Sidebar

            />
            
            <div className="seccion-principal">

                <NavBar/>

                <main>
                    <FormTask
                        
                    />

                    <div className="contenedor-tareas">
                        <TaskList/>
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Project;