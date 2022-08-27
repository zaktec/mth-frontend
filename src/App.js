import Header from "./components/layouts/Header";
import "./styles/App.css";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/layouts/Nav";
import Endpoint from "./components/Endpoint";
import SingleStudent from "./components/students/SingleStudent";
import SingleCourse from "./components/courses/SingleCourse";
import CourseList from "./components/courses/CourseList";
import SingleTopic from "./components/topics/SingleTopic";
import SortStudents from "./components/students/SortStudents";
import SortTopics from "./components/topics/SortTopics";
import SortCourses from "./components/courses/SortCourses";

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
          <Route path="/courselist" element={<SortCourses />}> </Route>
          <Route path="/courses/:course_id" element={<SingleCourse />}></Route>
          <Route path="/topiclist" element={<SortTopics />}> </Route>
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
