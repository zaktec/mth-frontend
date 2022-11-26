import { useState } from "react"
import LoginFormCSS from "../../css/loginform.module.css";

const Register = (props) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState ('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };


return(
    <div className={LoginFormCSS["auth-form-container"]}>
    <h2>Register Page</h2>
    <form className={LoginFormCSS["register-form"]} onSubmit={handleSubmit}>
    <label htmlFor="name" > Full name </label>
      <input
        type="name"
        placeholder="full name"
        id="name"
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <label htmlFor="email" > email </label>
      <input
        type="email"
        placeholder="youremail@gmail.com"
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
        <label htmlFor="password" > password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="**********"
        id="password"
        name="password"
      />
      <button type="submit"> Register Here</button>
    </form>
    <button onClick = {() => props.onFormSwitch('login')}>Already have an account? Login here</button> 
  </div>
)}
export default Register