import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFoundPage from './pages/notfound/NotFound';
import Person from './pages/person/Person';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Person />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
