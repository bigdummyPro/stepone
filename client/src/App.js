import './stylesheets/app.scss';
import { BrowserRouter} from 'react-router-dom';
import SidebarLeft from './components/sidebar-left/sidebar-left';
import MenuPost from './components/menu-post/menu-post';
import AllRoute from './All-Route';
import SidebarRight from './components/sidebar-right/sidebar-right';
import EmotionModal from './components/emotion-modal/emotion-modal';
import { useSelector } from 'react-redux';
import CreatePostModal from './components/create-post-modal/create-post-modal';

function App() {
  const modalState = useSelector(state => state.modalReducer.createPostModalStatus);
  return (
    <div className="App">
      <BrowserRouter>
        <div className="wrapper">
          <SidebarLeft />
          <MenuPost />
          <AllRoute />
          <SidebarRight />
          {modalState ? <CreatePostModal /> : null}
          <EmotionModal />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
