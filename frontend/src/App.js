import './App.css';
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

import HomeScreen from './screens/HomeScreen';

// import background from '/public/cool-background.svg';

function App() {
  return (
    <div style={{ 
      backgroundImage: `url(/cool-background.png)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"

      }}>
      {/* <div style={{ backgroundImage: `url(/cool-background.svg)` }}>

      </div> */}
      <Header/>
      <main className="py-3 aligh-items-center" >
        <HomeScreen/>
      </main>
      <Footer/>

    </div>
  );
}

export default App;
