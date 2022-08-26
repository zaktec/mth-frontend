import Header from "./components/Header";
import "./styles/App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Endpoint from "./components/Endpoint";
import StudentList from "./components/students/StudentList";
import SingleStudent from "./components/students/SingleStudent";
import SingleCourse from "./components/courses/SingleCourse";
import CourseList from "./components/courses/CourseList";
import TopicList from "./components/topics/TopicList";
import SingleTopic from "./components/topics/SingleTopic";
import SortStudents from "./components/students/SortStudents";

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
          <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
          <Route path="/topics" element={<TopicList />}></Route>
          <Route path="/topics/:topic_id" element={<SingleTopic  />}></Route>
          <Route path="/studentlist" element={<SortStudents />}> </Route>
          <Route path="/students/:student_id" element={<SingleStudent />}> </Route>
          
        </Routes>
        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}

export default App;
