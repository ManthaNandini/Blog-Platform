import axios from "axios";

import {
  useEffect,
  useState
}

from "react";

import {
  useNavigate,
  Link
}

from "react-router-dom";

export default function Dashboard(){

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [posts,setPosts] =
    useState([]);

  const [allPosts,setAllPosts] =
    useState([]);

  const [title,setTitle] =
    useState("");

  const [content,setContent] =
    useState("");

  const [image,setImage] =
    useState("");

  const [category,setCategory] =
    useState("");



  // ================= LOAD MY POSTS =================

  const loadMyPosts = async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/posts/my/posts",

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      setPosts(res.data);

    }catch(error){

      console.log(error);

    }

  };



  // ================= LOAD ALL POSTS =================

  const loadAllPosts = async()=>{

    try{

      const res = await axios.get(

        "http://localhost:5000/api/posts"

      );

      setAllPosts(res.data);

    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    if(!token){

      navigate("/login");

    }

    loadMyPosts();

    loadAllPosts();

  },[]);




  // ================= CREATE POST =================

  const createPost = async()=>{

    if(
      !title ||
      !content ||
      !category
    ){

      alert("Please fill all fields");

      return;

    }

    try{

      await axios.post(

        "http://localhost:5000/api/posts",

        {
          title,
          content,
          image,
          category
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      alert("Blog Published ✅");

      setTitle("");
      setContent("");
      setImage("");
      setCategory("");

      loadMyPosts();

      loadAllPosts();

    }catch(error){

      console.log(error);

      alert("Publish Failed");

    }

  };




  // ================= DELETE POST =================

  const deletePost = async(id)=>{

    try{

      await axios.delete(

        `http://localhost:5000/api/posts/${id}`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      alert("Blog Deleted ✅");

      loadMyPosts();

      loadAllPosts();

    }catch(error){

      console.log(error);

      alert("Delete Failed");

    }

  };




  // ================= LOGOUT =================

  const logout = ()=>{

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };



  return(

    <div
      style={{
        background:"#0f172a",
        minHeight:"100vh",
        color:"white",
        padding:"30px",
        fontFamily:"Arial"
      }}
    >

      {/* TOP BAR */}

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:"30px"
        }}
      >

        <div>

          <h1 style={{color:"#38bdf8"}}>

            Welcome {user?.username}

          </h1>

          <p>

            Manage your blogs and share your ideas.

          </p>

        </div>

        <button
          onClick={logout}
          style={{
            padding:"12px 20px",
            background:"#ef4444",
            border:"none",
            borderRadius:"10px",
            color:"white",
            cursor:"pointer"
          }}
        >

          Logout

        </button>

      </div>




      {/* CREATE BLOG */}

      <div
        style={{
          background:"#1e293b",
          padding:"25px",
          borderRadius:"20px",
          marginBottom:"40px"
        }}
      >

        <h2>Create Blog</h2>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e)=>
            setTitle(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e)=>
            setImage(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e)=>
            setCategory(e.target.value)
          }
          style={inputStyle}
        />

        <textarea
          rows="6"
          placeholder="Write your blog..."
          value={content}
          onChange={(e)=>
            setContent(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={createPost}
          style={{
            width:"100%",
            padding:"15px",
            background:"#06b6d4",
            border:"none",
            borderRadius:"12px",
            color:"white",
            fontSize:"18px",
            cursor:"pointer",
            marginTop:"15px"
          }}
        >

          Publish Blog

        </button>

      </div>




      {/* LATEST BLOGS */}

      <h1 style={{marginBottom:"20px"}}>

        Latest Blogs

      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(300px,1fr))",
          gap:"20px",
          marginBottom:"50px"
        }}
      >

        {
          allPosts.length > 0

          ?

          allPosts.map((post)=>(

            <Link
              to={`/blog/${post._id}`}
              key={post._id}
              style={{
                textDecoration:"none",
                color:"white"
              }}
            >

              <div style={cardStyle}>

                <img
                  src={
                    post.image
                    ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                  }
                  alt=""
                  style={{
                    width:"100%",
                    height:"200px",
                    objectFit:"cover",
                    borderRadius:"10px",
                    marginBottom:"15px"
                  }}
                />

                <span
                  style={{
                    background:"#06b6d4",
                    padding:"5px 10px",
                    borderRadius:"8px",
                    fontSize:"14px"
                  }}
                >

                  {post.category || "Technology"}

                </span>

                <h2
                  style={{
                    marginTop:"15px",
                    color:"#38bdf8"
                  }}
                >

                  {post.title}

                </h2>

                <p
                  style={{
                    marginTop:"10px"
                  }}
                >

                  {post.content.slice(0,120)}...

                </p>

                <div
                  style={{
                    marginTop:"15px",
                    color:"#94a3b8"
                  }}
                >

                  ✍️ {

                    post.author?.username
                    ||
                    "Unknown"

                  }

                </div>

              </div>

            </Link>

          ))

          :

          <p>No blogs available</p>
        }

      </div>





      {/* MY BLOGS */}

      <h1 style={{marginBottom:"20px"}}>

        My Previous Blogs

      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(300px,1fr))",
          gap:"20px"
        }}
      >

        {
          posts && posts.length > 0

          ?

          posts.map((post)=>(

            <div
              key={post._id}
              style={cardStyle}
            >

              <img
                src={
                  post.image
                  ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                }
                alt=""
                style={{
                  width:"100%",
                  height:"200px",
                  objectFit:"cover",
                  borderRadius:"10px",
                  marginBottom:"15px"
                }}
              />

              <span
                style={{
                  background:"#06b6d4",
                  padding:"5px 10px",
                  borderRadius:"8px",
                  fontSize:"14px"
                }}
              >

                {post.category || "Technology"}

              </span>

              <h2
                style={{
                  marginTop:"15px",
                  color:"#38bdf8"
                }}
              >

                {post.title}

              </h2>

              <p
                style={{
                  marginTop:"10px"
                }}
              >

                {post.content.slice(0,120)}...

              </p>

              <div
                style={{
                  marginTop:"15px",
                  color:"#94a3b8"
                }}
              >

                ✍️ {user?.username}

              </div>

              {/* DELETE BUTTON */}

              <button

                onClick={()=>
                  deletePost(post._id)
                }

                style={{
                  width:"100%",
                  marginTop:"20px",
                  padding:"12px",
                  background:"#ef4444",
                  border:"none",
                  borderRadius:"10px",
                  color:"white",
                  fontWeight:"bold",
                  cursor:"pointer",
                  display:"block"
                }}

              >

                Delete Blog

              </button>

            </div>

          ))

          :

          <p>No blogs created yet</p>
        }

      </div>

    </div>
  );
}



// ================= STYLES =================

const inputStyle = {

  width:"100%",

  padding:"15px",

  marginTop:"15px",

  border:"none",

  borderRadius:"12px",

  outline:"none"

};

const cardStyle = {

  background:"#1e293b",

  padding:"20px",

  borderRadius:"20px"

};