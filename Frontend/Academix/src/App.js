import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Landing } from './components/Landing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
