import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import DocumentPage from './components/layout/document/DocumentPage';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer autoClose={3000} theme='colored'/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Routes>
          <Route 
              path='/dashboard'
              element={<PrivateRoute component={Dashboard} />}
          />
          <Route
              path='/document/:documentId'
              element={<PrivateRoute component={DocumentPage} />}
          />    
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
