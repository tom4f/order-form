import { Top }         from './components/Top/Top';
import { Bottom }      from './components/Bottom/Bottom';
import { Form }        from './components/Form';
import { Status }      from './components/Status';
import './css/main.css';

function App() {
  return (
    <div className="top_container">
        <Top />
          <Form />
          <Status />
        <Bottom />
    </div>
  );
}

export default App;
