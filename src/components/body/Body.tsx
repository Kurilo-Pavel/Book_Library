import "./body.scss";
import Content from "./content/Content";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Navigation from "./navigation/Navigation";

const Body = () => {
  return (
    <div className="body">
      <Header />
      <Navigation />
      <Content />
      <Footer />
    </div>
  );
};

export default Body;