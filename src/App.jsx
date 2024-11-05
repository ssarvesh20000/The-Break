import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <nav>
        <div className="Links">
          <Link to="/">Home</Link>
          <Link to="/multimedia">Multimedia</Link>
          <Link to="/sandiego">San Diego</Link>
          <Link to="/unitedstates">United States</Link>
          <Link to="/worldopinions">World Opinions</Link>
        </div>
      </nav>

      {/* The outlet for rendering the selected route */}
      {/* No need to include the Home component here directly */}
    </>
  );
}

export default App;

