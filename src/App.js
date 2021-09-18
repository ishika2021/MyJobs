import logo from './logo.svg';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Forgot from './Components/Forgot';
import AllJobs from './Components/AllJobs';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Reset from './Components/Reset';
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
    <Router>
      <AuthProvider>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path ="/login" component={Login}/>
        <Route path ="/signup" component={Signup}/>

        <Route path='/forgotpassword' component={Forgot} />
        <Route path='/resetpassword' component={Reset} />
        <PrivateRoute exact path='/alljobs' component={AllJobs} />
      </Switch>
      </AuthProvider>
    </Router>
    // <Home/>
  );
}

export default App;
