import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import axios from "axios";

import {
  useEffect,
  useState
}

from "react";

export default function Home(){

  const [posts,setPosts] =
    useState([]);

  // LOAD POSTS

  const loadPosts = async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/posts"

      );

      setPosts(res.data);

    }catch(error){

      console.log(error);

    }
  };

  useEffect(()=>{

    loadPosts();

  },[]);

  return(

    <div className="home">

      {/* NAVBAR */}

      <nav>

        <h1 className="logo">
          BlogSpace
        </h1>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </nav>

      {/* HERO */}

      <section className="hero">

        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:1
          }}

        >

          <h1>
            Share Stories With The World
          </h1>

          <p>
            Create blogs like Medium & Dev.to
          </p>

          <Link to="/register">

            <button>
              Start Writing
            </button>

          </Link>

        </motion.div>

      </section>

      {/* LATEST BLOGS */}

      <section className="latest-section">

        <h1 className="section-title">
          Latest Blogs
        </h1>

        <div className="blogs-grid">

          {
            posts.length > 0
            ?

            posts.map((post)=>(

              <Link

                to={`/blog/${post._id}`}

                className="blog-link"

                key={post._id}

              >

                <div className="home-blog-card">

                  {/* IMAGE */}

                  <img

                    src={
                      post.image
                      ||
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                    }

                    alt=""

                  />

                  <div className="home-blog-content">

                    {/* CATEGORY */}

                    <span className="category">

                      {
                        post.category
                        ||
                        "Technology"
                      }

                    </span>

                    {/* TITLE */}

                    <h2>
                      {post.title}
                    </h2>

                    {/* CONTENT */}

                    <p>

                      {
                        post.content?.slice(
                          0,
                          120
                        )
                      }...

                    </p>

                    {/* AUTHOR */}

                    <div className="author-row">

                      <span>

                        ✍️ {

                          typeof post.author === "object"

                          ?

                          post.author?.username

                          :

                          post.author || "Sabiya"

                        }

                      </span>

                    </div>

                  </div>

                </div>

              </Link>

            ))

            :

            <h2
              style={{
                color:"white"
              }}
            >
              No blogs available
            </h2>

          }

        </div>

      </section>

    </div>
  );
}