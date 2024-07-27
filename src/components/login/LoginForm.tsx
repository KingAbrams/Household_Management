import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './loginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <div className="login-form-container">
      <p className="login-form-title">Connexion</p>
      <form className="form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="exemple@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleSubmit}>Se connecter</button>
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
