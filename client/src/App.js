import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Signin';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/signin' element={<Login />}></Route>
        <Route exact path='/signup' element={<Signup />}></Route>
        <Route exact path='/profile' element={<Profile />}></Route>
        <Route exact path='/upload' element={<CreatePost />}></Route>
      </Routes>
    </Router>
  );
}
export default App;