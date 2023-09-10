import { useRef, useState, useEffect } from "react";
import { postAdminLoginApi, postLoginStudentApi } from "../../api/axios";
import { Link, Location, useLocation, useNavigate } from "react-router-dom";
import AuthCSS from "../../css/auth.module.css";
import useAuth from "../../hooks/useAuth";

const Login = (props) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate;
  const location = useLocation;
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      username: user,
      password: pwd,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log(newObject);
    try {
      postAdminLoginApi(newObject).then((response) => {
        console.log(JSON.stringify(response?.data));
        //console.log(JSON.stringify(response));
        const accessToken = response.token;
        setAuth({ user, pwd, accessToken });
        console.log(user, pwd, accessToken);
        setUser("");
        setPwd("");
        setSuccess(true);
        navigate(from, { replace: true });
        //navigate("/admindashboard");
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
    // <>
    //   {success ? (
    //     <section>
    //       <h1>You are logged in!</h1>
    //       <br />
    //       <p>
    //         <a href="#">Go to Home</a>
    //       </p>
    //     </section>
    //   ) : (
    <section className={AuthCSS["register-page"]}>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form className={AuthCSS["register-form"]} onSubmit={handleSubmit}>
        <label htmlFor="username"> Admin Username:</label>
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

    /* </> */
  );
};

export default Login;
