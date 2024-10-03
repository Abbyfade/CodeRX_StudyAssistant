import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Landing } from './components/Landing';
import { Sidenav } from './components/Sidenav';
import { Recent } from './components/Recent';
import { Generate } from './components/Generate';
import  ProtectedRoute  from './components/Protectedroute';
import { Questions } from './components/Questions';
import { QuestionDetail } from './components/Questiondetails';

function App() {
  return (
    <div className="App ">
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        

          <Route path='user' element={<ProtectedRoute><Sidenav /></ProtectedRoute>} >
            <Route path='home' element={<ProtectedRoute><Recent /></ProtectedRoute>} index/>
            <Route path='generate' element={<ProtectedRoute><Generate /></ProtectedRoute>} />
            <Route path='questions' element={<Questions />} />
            <Route path='questiondetails/:fileId' element={<QuestionDetail />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;