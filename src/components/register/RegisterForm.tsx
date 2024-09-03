import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './registerForm.css';
import useRegister from '../../core/hooks/useRegister';
import Alert from './Alert';
import { IAlert } from '../../core/types';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorInput, setErrorInput] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { register, resetError, data, isLoading, isError } = useRegister();
  const [alert, setAlert] = useState<IAlert | null>(null);

  const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
    setErrorInput((prev) => ({ ...prev, lastname: false }));
    setAlert(null);
  };

  const handleFirstnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
    setErrorInput((prev) => ({ ...prev, firstname: false }));
    setAlert(null);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorInput((prev) => ({ ...prev, email: false }));
    setAlert(null);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setErrorInput((prev) => ({ ...prev, password: false }));
    if (password === inputPassword && alert?.type === 'warning') {
      setAlert(null);
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputConfirmPassword = e.target.value;
    setConfirmPassword(inputConfirmPassword);
    setErrorInput((prev) => ({ ...prev, confirmPassword: false }));
    if (confirmPassword === inputConfirmPassword && alert?.type === 'warning') {
      setAlert(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetError();
    const params = { firstname, lastname, email, password };

    const newErrors = {
      firstname: firstname === '',
      lastname: lastname === '',
      email: email === '',
      password: password === '',
      confirmPassword: confirmPassword === '',
    };

    setErrorInput(newErrors);

    if (
      newErrors.firstname ||
      newErrors.lastname ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      const message = 'Veuillez remplir tous les champs.';
      setAlert({ type: 'warning', message });
      return;
    }

    if (password !== confirmPassword) {
      const message = 'Les deux mot de passe ne correspondent pas.';
      setAlert({ type: 'warning', message });
      return;
    }

    await register(params);
  };

  useEffect(() => {
    if (isError) {
      const errorMsg = 'Un problème est survenu.';
      setAlert({ type: 'warning', message: errorMsg });
    } else if (data) {
      const successMsg = 'Votre compte est bien créé.';

      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setAlert({ type: 'success', message: successMsg });
    }
  }, [isError, data]);

  return (
    <div className="register-form-container">
      <div className="register-form-title">Inscription</div>

      <div className="register-alert-placeholder">
        {alert && <Alert type={alert.type} message={alert.message} />}
      </div>

      <form className="register-form">
        <div className="register-form-group-fullname">
          <div className="register-form-group it1">
            <input
              type="text"
              placeholder="Nom"
              className={errorInput.lastname ? 'input-error' : ''}
              value={lastname}
              onChange={handleLastnameChange}
            />
            <label>Nom</label>
          </div>
          <div className="register-form-group it2">
            <input
              type="text"
              placeholder="Prénom"
              className={errorInput.firstname ? 'input-error' : ''}
              value={firstname}
              onChange={handleFirstnameChange}
            />
            <label>Prénom</label>
          </div>
        </div>

        <div className="register-form-group">
          <input
            type="email"
            placeholder="Email"
            className={errorInput.email ? 'input-error' : ''}
            value={email}
            onChange={handleEmailChange}
          />
          <label>Email</label>
        </div>

        <div className="register-form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            className={errorInput.password ? 'input-error' : ''}
            value={password}
            onChange={handlePasswordChange}
          />
          <label>Mot de passe</label>
        </div>

        <div className="register-form-group">
          <input
            type="password"
            placeholder="Confirmer mot de passe"
            className={errorInput.confirmPassword ? 'input-error' : ''}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <label>Confirmer mot de passe</label>
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
