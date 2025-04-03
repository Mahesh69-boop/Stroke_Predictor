import { Link } from "react-router-dom";
import "./HomePage.css";
function Home() {
  return (
    <div id="Hom">
      <h1>Welcome to Stroke Risk Assessment</h1>
      <Link to="/symptoms">
        <button>Start Assessment</button>
      </Link>
    </div>
  );
}

export default Home;
