import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginForm.css';
import { IAlert } from '../../core/types';
import AlertLogin from './AlertLogin';
import useLogin from '../../core/hooks/useLogin';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('evenndiyan@gmail.com');
  const [password, setPassword] = useState('test1');
  const [alert, setAlert] = useState<IAlert | null>(null);

  const { login, resetError, data, isError, status, isLoading } = useLogin();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetError();
    const params = { email, password };

    if (!email || !password) {
      const message = 'Veuillez remplir tous les champs.';
      setAlert({ type: 'warning', message });
      return;
    }

    await login(params);
  };

  useEffect(() => {
    if (isError) {
      const errorMsg = "Erreur durant l'authentification";
      setAlert({ type: 'warning', message: errorMsg });
    } else {
      setAlert(null);
      setEmail('');
      setPassword('');
    }
  }, [isError]);

  useEffect(() => {
    if (status) {
      if (status === 200) {
        navigate('/');
      }

      if (status === 401) {
        const errorMsg = 'Email ou mot de passe incorrect';
        setAlert({ type: 'warning', message: errorMsg });
      }

      if (status === 500) {
        const errorMsg = 'Erreur interne du serveur';
        setAlert({ type: 'warning', message: errorMsg });
      }
    }
  }, [status, navigate]);

  return (
    <div className="login-form-container">
      <div className="login-form-title">Connexion</div>

      <div className="login-alert-placeholder">
        {alert && <AlertLogin message={alert.message} />}
      </div>

      <form className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="login-button"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Chargement...' : 'Se connecter'}
        </button>
      </form>

      <div className="form-footer">
        <p>
          Pas encore de compte? <Link to="/register">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
