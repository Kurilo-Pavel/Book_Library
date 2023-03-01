import "./navigation.scss";
// import {useEffect, useState} from "react";
import Directory from "./Directory";

const Navigation = () => {
  // const [contentFile, setContentFile] = useState([{name: "", isFile: ""}]);

  return (
    <div className="navigation">
      <p>Navigation</p>
      <Directory path="library" />
    </div>
  );
};

export default Navigation;