
import './App.css';
import { AppContainer } from './components/AppContainer/AppContainer';
import { InsuranceProvider } from './components/Insurance/InsuranceContext';

function App() {
  return (
    <InsuranceProvider>
      <AppContainer />
    </InsuranceProvider>
  );
}

export default App;
