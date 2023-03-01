import "./content.scss";
import Books from "./components/Books";
import Search from "./components/Search";

const Content = () => {
  return (
    <div className="content">
      Content
      <Search/>
      <div>Result</div>
      <Books/>
    </div>
  );
};

export default Content;