import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFoundPage from './pages/notfound/NotFound';
import Person from './pages/person/Person';
import PrivateRoutes from './core/utils/Auth/PrivateRoutes';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Person />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
