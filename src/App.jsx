import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Team from './components/Team/Team';
import Services from './components/Services/Services';
import Gallery from './components/Gallery/Gallery';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Team />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;

