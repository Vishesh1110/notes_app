export default function Navbar({ user }) {
  const logout = async () => {
    await fetch('http://localhost:5000/auth/logout', {
      credentials: 'include'
    });
    window.location.href = '/login';
  };

  return (
    <div>
      <p>Logged in as: {user.name} ({user.email})</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}