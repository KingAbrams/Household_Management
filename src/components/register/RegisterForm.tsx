import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import './registerForm.css';
import useRegister from '../../core/hooks/useRegister';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, data, isLoading, isError } = useRegister();

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

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const params = { firstname, lastname, email, password };

    await register(params);
  };

  return (
    <div className="register-form-container">
      <p className="register-form-title">Inscription</p>
      <form className="register-form">
        <div className="register-form-group-fullname">
          <div className="register-form-group it1">
            <label>Nom</label>
            <input
              type="text"
              value={lastname}
              onChange={handleLastnameChange}
            />
          </div>
          <div className="register-form-group it2">
            <label>Prénom</label>
            <input
              type="text"
              value={firstname}
              onChange={handleFirstnameChange}
            />
          </div>
        </div>

        <div className="register-form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>

        <div className="register-form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="register-form-group">
          <label>Confirmation</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>

        <div>
          <button
            className="register-button"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Chargement...' : "S'inscrire"}
          </button>
        </div>
      </form>

      <div className="register-form-footer">
        <p>
          Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
