import "./App.css";
import { useState } from "react";
import Axios from "axios";


function App() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [info, setinfo] = useState([]);

  const Register = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/user/register", {
      name: username,
      email: email,
      password: password,
    }).then(() => {
      console.log("yesssss");
    });
    
  };

  const Login = e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/user/login", {
      email: email,
      password: password,

    }).then((response) => {
      setinfo(response.data);
    });
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
        <input
            type="text"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder="username"
          />
          <input
            type="text"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="email"
          />
          <input
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="password"
          />
          <button
            onClick={Register}
          >
            Register
          </button>
        </form>
      </div>
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="email"
          />
          <input
            type="password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="password"
          />
          <button
            onClick={Login}
          >
            Login
          </button>
          <div>{info.message}</div>
        </form>
      </div>
    </div>
  );
}

export default App;
