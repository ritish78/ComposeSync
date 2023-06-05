import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

import { useEffect } from 'react';
import { loadUser } from './actions/auth';

import { Provider } from 'react-redux';
import store from './redux/store';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Dashboard from './components/layout/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {

  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route 
              path='/dashboard'
              element={<PrivateRoute component={Dashboard} />}
          />    
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
