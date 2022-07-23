import Header from "./components/Header";
import "./styles/App.css";
import Footer from "./components/Footer";
import CourseList from "./components/CourseList";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import SingleCourse from "./components/SingleCourse";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Nav />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/courses" element={<CourseList />}></Route>
          <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}

export default App;
