import './stylesheets/app.scss';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginRegister from './pages/login-register/login-register';
import ProtectedRoute from './Protected-Route';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {useDispatch, useSelector} from 'react-redux';
import {loadUser} from './redux/actions/authAction';
import { GLOBALTYPES } from './redux/constants/globalTypes';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const authState = useSelector(state => state.authReducer);

  const dispatch = useDispatch();

  //Prevent for mobile, tablet device
  useEffect(()=>{
    if(window.screen.width < 1200) setIsMobile(true);
    else setIsMobile(false);
  },[])

  useEffect(()=>{
    window.addEventListener('resize', ()=>{
      if(window.screen.width < 1200) setIsMobile(true)
      else setIsMobile(false);
    })
  },[])

  //Initial setting
  useEffect(()=>{
    //Initial Auth State
    dispatch(loadUser());

    //Initial Socket
    const socket = io(
      process.env.NODE_ENV !== 'production'
      ? 'http://localhost:5000'
      : 'https://steponeministries.herokuapp.com'
    ); //http://localhost:5000: prefix bắt buộc cho socketio với server có port 5000
    dispatch({type: GLOBALTYPES.SET_SOCKET, payload: socket});

    return () => socket.close();
  },[dispatch])

  return (
    <>
      {
        !isMobile ?
        <div className="App">
          { authState.isWaiting && //isWaiting ngăn không cho load vào browserRouter khi authState chưa thực thi xong và trả ra kết quả. Sau khi dispatch thì app.js sẽ cập nhật và chạy lại với authState đã thực thi và đã có giá trị
              <BrowserRouter>
                <Routes>
                      <Route path="/login-register" element={<LoginRegister />}/> 
                      <Route path="/*" element={<ProtectedRoute/>} />
                </Routes>
              </BrowserRouter>
          }
        </div> :
        <div className="App">
          <div className="not-supported">
            <div className="not-supported__modal">
                <p>
                  Your device is not supported for website, please use PC to connect to our website
                </p>
                <span>
                  Sorry for the inconvenience
                </span>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default App;
