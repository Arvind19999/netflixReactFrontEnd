import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.scss"
// import "./Components/Home/Home.scss"
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
function App() {
  return (
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Home />}/>
          </Routes>
      </Router>
  );
}

export default App;
