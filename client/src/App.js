import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import Signin from './components/auth/Signin'
import Projects from './components/projects/Projects'
import ProjectState from './context/projects/ProjectState'
import TaskState from './context/tasks/TaskState'

function App() {
  return (
    // vamos a importar el context de proyectos
    <ProjectState>
      <TaskState>
        <Router>
          <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/projects" component={Projects} />
          </Switch>
        </Router>
      </TaskState>
    </ProjectState>
  );
}


export default App;

