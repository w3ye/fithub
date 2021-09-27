export default function Dashboard(props) {
  const { setMain } = props;
  return (
    <>
      <h2>Welcome to FitHub</h2>
      <div className="column">
        <button onClick={() => setMain("login")}>Login</button>
        <br />
        <button onClick={() => setMain("register")}>Register</button>
      </div>
    </>
  );
}
