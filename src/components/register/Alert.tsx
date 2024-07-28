import { Link } from 'react-router-dom';
import { IAlert } from '../../core/types';
import './alert.css';

const Alert = ({ type, message }: IAlert) => {
  return (
    <>
      {type === 'warning' ? (
        <div className="alert alert-warning">
          <span className="alert-icon">⚠️</span>
          <span className="alert-message">
            <strong>Attention!</strong> {message}
          </span>
        </div>
      ) : (
        <div className="alert alert-success">
          <span className="alert-icon">✅</span>
          <span className="alert-message">
            <strong>Succès!</strong> {message} Allez vous{' '}
            <Link to="/login">connecter</Link>
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
