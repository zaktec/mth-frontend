import Header from "./components/Header";
import "./styles/App.css";
import Footer from "./components/Footer";
import CourseList from "./components/CourseList";
import TopicList from "./components/TopicList";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import SingleCourse from "./components/SingleCourse";

import Endpoint from "./components/Endpoint";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<Home />}></Route>
          <Route path="/endpoint" element={<Endpoint />}></Route>
          <Route path="/courses" element={<CourseList />}></Route>
          <Route path="/topics" element={<TopicList />}></Route>
          <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}

export default App;
