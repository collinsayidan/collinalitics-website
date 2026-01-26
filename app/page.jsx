import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import HowWeWork from '../components/HowWeWork.jsx';
import UseCase from '../components/UseCase.jsx';
import WhyUs from '../components/WhyUs.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import ClientLogos from "../components/sections/ClientLogos";
import StatsRow from "../components/sections/StatsRow";
import BeforeAfter from "../components/sections/BeforeAfter";

export default function Page() {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <HowWeWork />
        <UseCase />
        {/*<ClientLogos /> */}
        <BeforeAfter />
        <WhyUs />
        <StatsRow />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
