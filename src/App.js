import './components/MiApp.css';
import MiApp from './components/MiApp';
import logo from './logogiphy.png';

function App() {
  return (
    <div className="app">
      <img className='logo' src={logo}  alt="logo" />
      <MiApp></MiApp>
    </div>
  );
}

export default App;
