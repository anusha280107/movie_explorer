function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      <div className="error-icon">😕</div>

      <h2>Oops!</h2>

      <p>{message}</p>

      <span>Try searching for another movie.</span>
    </div>
  );
}

export default ErrorMessage;