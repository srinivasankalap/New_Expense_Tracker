import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
import ProfilePage from './pages/ProfilePage';
import Forgot from './components/Auth/Forgot';
import Tracker from './pages/Tracker';

function App() {
  const authCtx=useContext(AuthContext);
  return (
    <Layout>
      <Routes>
      {authCtx.isLoggedIn && <Route path="/home" element={<HomePage />} />}
      {authCtx.isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
      {authCtx.isLoggedIn && <Route path="/tracker" element={<Tracker />} />}
      <Route path="/forgot" element={<Forgot />} />
        {!authCtx.isLoggedIn && (<Route path="/" element={<AuthPage />} />)}
      <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </Layout>
  );
}

export default App;
