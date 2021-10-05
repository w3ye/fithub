import "./Dashboard.scss";
import Button from "react-bootstrap/Button";

export default function Dashboard(props) {
  const { setMain } = props;
  return (
    <div className="dash-wrapper">
      <div class="leftPage">
        <h1>Welcome to</h1>
        <p id="webappTitle">FitHub</p>
      </div>
      <div className="rightPage">
        <div>
          <h2>Already Have an Account?</h2>
          <Button variant="light" onClick={() => setMain("login")}>
            Login
          </Button>
        </div>
        <div>
          <h2>New to FitHub?</h2>
          <Button variant="light" onClick={() => setMain("register")}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
