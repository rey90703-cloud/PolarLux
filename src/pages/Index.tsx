import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Collection from "@/components/Collection";
import Technology from "@/components/Technology";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Collection />
      <Technology />
      <Gallery />
      <Footer />
      <Cart />
      <LoginModal />
    </div>
  );
};

export default Index;
