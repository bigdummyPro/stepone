import './stylesheets/app.scss';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginRegister from './pages/login-register/login-register';
import ProtectedRoute from './Protected-Route';
import { useEffect } from 'react';
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from './redux/actions/authAction';
import { GLOBALTYPES } from './redux/constants/globalTypes';

function App() {
  const authState = useSelector(state => state.authReducer);

  const dispatch = useDispatch();

  //Initial setting
  useEffect(()=>{
    //Initial Auth State
    dispatch(loadUser());

    //Initial Socket
    const socket = io('http://localhost:5000'); //http://localhost:5000: prefix bắt buộc cho socketio với server có port 5000
    dispatch({type: GLOBALTYPES.SET_SOCKET, payload: socket});

    return () => socket.close();
  },[dispatch])

  return (
    <div className="App">
      { authState.isWaiting && //isWaiting ngăn không cho load vào browserRouter khi authState chưa thực thi xong và trả ra kết quả. Sau khi dispatch thì app.js sẽ cập nhật và chạy lại với authState đã thực thi và đã có giá trị
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
