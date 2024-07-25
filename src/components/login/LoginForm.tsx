import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Connexion</h2>
      <form>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleSubmit}>Se connecter</button>
      </form>

      <div>
        <p>
          Pas encore de compte ?<Link to="/register">Inscrivez-vous</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
