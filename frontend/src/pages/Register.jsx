import axios from "axios";

import { useState }

from "react";

import {
  useNavigate,
  Link
}

from "react-router-dom";

export default function Register(){

  const navigate =
    useNavigate();

  const [username,setUsername] =
    useState("");

  const [email,setEmail] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [loading,setLoading] =
    useState(false);

const register = async () => {
  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        username,
        email,
        password
      }
    );

    console.log("SUCCESS:", res.data);

    alert(res.data.message || "Registered Successfully");

    navigate("/login");

  } catch (error) {

    console.log("ERROR RESPONSE:", error.response?.data);
    console.log("FULL ERROR:", error.message);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  } finally {
    setLoading(false);
  }
};

  return(

    <div className="auth-page">

      <div className="auth-box">

        <h1>
          Create Account 🚀
        </h1>

        <p className="auth-text">
          Join BlogSpace today
        </p>

        <input

          type="text"

          placeholder="Username"

          onChange={(e)=>

            setUsername(e.target.value)

          }

        />

        <input

          type="email"

          placeholder="Email"

          onChange={(e)=>

            setEmail(e.target.value)

          }

        />

        <input

          type="password"

          placeholder="Password"

          onChange={(e)=>

            setPassword(e.target.value)

          }

        />

        <button onClick={register}>

          {
            loading
            ?
            "Loading..."
            :
            "Register"
          }

        </button>

        <p className="bottom-text">

          Already have account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}