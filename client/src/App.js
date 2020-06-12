import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Signin from './components/Signin'
import Projects from './components/Projects'
import ProjectState from './context/projects/ProjectState'
import TaskState from './context/tasks/TaskState'

function App() {
  return (
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

