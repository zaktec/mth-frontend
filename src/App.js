import Header from "./components/Header";
import "./styles/App.css";
import Footer from "./components/Footer";
import CourseList from "./components/CourseList";
import TopicList from "./components/TopicList";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import SingleCourse from "./components/SingleCourse";
import SingleTopic from "./components/SingleTopic";
import Endpoint from "./components/Endpoint";
import StudentList from "./components/StudentList";
import SingleStudent from "./components/SingleStudent";

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
          <Route path="/students" element={<StudentList />}> </Route>
          <Route path="/students/:student_id" element={<SingleStudent />}> </Route>
          <Route path="/topics/:topic_id" element={<SingleTopic />}></Route>
          <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}

export default App;
