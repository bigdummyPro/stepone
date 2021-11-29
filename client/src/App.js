import './stylesheets/app.scss';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginRegister from './pages/login-register/login-register';
import ProtectedRoute from './Protected-Route';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from './redux/actions/authAction';
function App() {
  const authState = useSelector(state => state.authReducer);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadUser());
  },[dispatch])
    
  return (
    <div className="App">
      { authState.isWaiting && 
          <BrowserRouter>
            <Routes>
                  <Route path="/login-register" element={<LoginRegister />}/> 
                  <Route path="/*" element={<ProtectedRoute/>} />
            </Routes>
          </BrowserRouter>
      }
    </div>
  );
}

export default App;
