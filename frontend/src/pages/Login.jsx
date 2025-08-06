export default function Login() {
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div>
      <h1>Login to Notes Manager</h1>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
}