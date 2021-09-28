import "./Dashboard.css";

export default function Dashboard(props) {
  const { setMain } = props;
  return (
    <div className="dash-wrapper">
      <h1>Welcome to FitHub</h1>
      <div className="column">
        <button onClick={() => setMain("login")}>Login</button>
        <button onClick={() => setMain("register")}>Register</button>
      </div>
    </div>
  );
}
