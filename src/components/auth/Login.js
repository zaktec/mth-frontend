import React, { useState } from "react";
import LoginFormCSS from "../../css/loginform.module.css";

const Login = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="LoginPage">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
        <input
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="**********"
          id="password"
          name="password"
        />
         </label>
        <button type="submit"> Log In</button>
      </form> 
    </div>
  );
};
export default Login;
