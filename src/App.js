import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './Pages/Login';
import HomePage from './Pages/HomePage';
import CreateBlog from './Pages/CreateBlog';
import UpdateBlog from './Pages/UpdateBlog';
import ViewBlog from './Pages/ViewBlog';
import SignupPage from './Pages/SignupPage';
import Authenticate from './Pages/Authenticate';

function App() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: 'lightblue', padding: '20px', width: '50%', margin: 'auto' }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} exact />
            <Route path='signup/' element={<SignupPage />} exact />
            <Route path='auth/verify/:token/' element={<Authenticate />} exact />
            <Route path='home/' element={<HomePage />} exact/>
            <Route path='create-blog/' element={<CreateBlog />} exact />
            <Route path='update-blog/:id/' element={<UpdateBlog />} exact />
            <Route path='view-blog/:id/' element={<ViewBlog />} exact />
            <Route path="*" element={<Navigate to="/home/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
