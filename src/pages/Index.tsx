import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Collection from "@/components/Collection";
import Technology from "@/components/Technology";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import History from "@/components/History";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import LoginModal from "@/components/LoginModal";
import ChatSupport from "@/components/ChatSupport";

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
      <Footer />
      <Cart />
      <LoginModal />
      <ChatSupport />
    </div>
  );
};

export default Index;
