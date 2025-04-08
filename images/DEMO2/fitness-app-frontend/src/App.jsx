import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from "./components/auth/RegisterPage/RegisterPage";
import LoginPage from './components/auth/LoginPage/LoginPage';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import Gender from './components/onboarding/Gender/Gender';
import Goal from './components/onboarding/Goal/Goal';
import Height from './components/onboarding/Height/Height';
import Weight from './components/onboarding/Weight/Weight';
import Age from './components/onboarding/Age/Age';
import ActivityLevel from './components/onboarding/ActivityLevel/ActivityLevel';
import HomePage from './components/HomePage/HomePage';
import { UserMetricsProvider } from './context/UserMetricsContext';

function App() {
  return (
    <Router>
      <UserMetricsProvider>
        <Routes>
          <Route path='/' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/gender' element={<Gender />} />
          <Route path='/goal' element={<Goal />} />
          <Route path='/height' element={<Height />} />
          <Route path='/weight' element={<Weight />} />
          <Route path='/age' element={<Age />} />
          <Route path='/activityLevel' element={<ActivityLevel />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </UserMetricsProvider>
    </Router>
  );
}

export default App;
