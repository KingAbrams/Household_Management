import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  };

  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ firstname, lastname, email, password, confirmPassword });
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form>
        <div>
          <label>Nom</label>
          <input type="text" value={lastname} onChange={handleLastnameChange} />
        </div>

        <div>
          <label>Prénom</label>
          <input
            type="text"
            value={firstname}
            onChange={handleFirstnameChange}
          />
        </div>

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

        <div>
          <label>Confirmation du mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <div>
          <button onClick={handleSubmit}>S'inscrire</button>
        </div>
      </form>

      <div>
        <p>
          Vous avez déjà un compte ?<Link to="/login">Connectez-vous</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
