interface IAlertLoginprops {
  message: string;
}

const AlertLogin = ({ message }: IAlertLoginprops) => {
  return (
    <div className="login-alert alert-warning ">
      <span className="alert-icon">⚠️</span>
      <span className="alert-message">
        <strong>Attention!</strong> {message}
      </span>
    </div>
  );
};

export default AlertLogin;
