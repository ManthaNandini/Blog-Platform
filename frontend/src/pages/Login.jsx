import axios from "axios";

import { useState }

from "react";

import {
  useNavigate,
  Link
}

from "react-router-dom";

export default function Login(){

  const navigate =
    useNavigate();

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [loading,setLoading] =
    useState(false);

  const login = async()=>{

    try{

      setLoading(true);

      const res = await axios.post(

        "http://localhost:5000/api/auth/login",

        {
          email,
          password
        }

      );

      localStorage.setItem(

        "token",

        res.data.token

      );
      localStorage.setItem(

  "user",

  JSON.stringify(
    res.data.user
  )

);

      navigate("/dashboard");

    }catch(error){

      alert("Invalid Credentials");

    }finally{

      setLoading(false);

    }
  };

  return(

    <div className="auth-page">

      <div className="auth-box">

        <h1>
          Welcome Back 👋
        </h1>

        <p className="auth-text">
          Login to continue writing blogs
        </p>

        <input

          type="email"

          placeholder="Enter Email"

          onChange={(e)=>

            setEmail(e.target.value)

          }

        />

        <input

          type="password"

          placeholder="Enter Password"

          onChange={(e)=>

            setPassword(e.target.value)

          }

        />

        <button onClick={login}>

          {
            loading
            ?
            "Loading..."
            :
            "Login"
          }

        </button>

        <p className="bottom-text">

          Don't have account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </div>

    </div>
  );
}