import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider"
import { postLoginStudentApi } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AuthCSS from "../../css/auth.module.css";

const Login = (props) => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    const newObject = {
      student_username: user,
      student_password: pwd,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    try {
      postLoginStudentApi(newObject).then((response) => {
        navigate("/courselist");
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response?.data?.accessToken;
        setAuth({ user, pwd, accessToken });
        setUser("");
        setPwd("");
        setSuccess(true);
      });
    } catch (error) {
      if (!Error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <button onClick={() => props.onFormSwitch("register")}>
            {" "}
            Dont have an account? Register here
          </button>
        </section>
      )}
    </>
  );
};

export default Login;
