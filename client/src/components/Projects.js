import React from 'react';
import Sidebar from './Sidebar'
import NavBar from './NavBar';
import FormTask from './FormTask'
import TaskList from './TaskList'

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