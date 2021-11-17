import './stylesheets/app.scss';
import LoginRegiter from "./pages/login-register/login-register";
import Home from './pages/home/home';
import Message from './pages/message/message';

function App() {
  return (
    <div className="App">
      {/* <LoginRegiter /> */}
      {/* <Home /> */}
      <Message />
    </div>
  );
}

export default App;
