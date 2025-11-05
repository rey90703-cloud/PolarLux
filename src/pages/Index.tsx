import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Collection from "@/components/Collection";
import Technology from "@/components/Technology";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import History from "@/components/History";
import Policies from "@/components/Policies";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";
import CustomerSupport from "@/components/CustomerSupport";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Collection />
      <Technology />
      <Gallery />
      <FAQ />
      <History />
      <Policies />
      <Footer />
      <Cart />
      <LoginModal />
      <CustomerSupport />
    </div>
  );
};

export default Index;
