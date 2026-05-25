import axios from "axios";

import {
  useEffect,
  useState
}

from "react";

import { useParams }

from "react-router-dom";

export default function BlogDetails(){

  const { id } = useParams();

  const [post,setPost] =
    useState(null);

  const [comment,setComment] =
    useState("");

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  // ================= LOAD POST =================

  const loadPost = async()=>{

    try{

      const res = await axios.get(

        `http://localhost:5000/api/posts/${id}`

      );

      console.log(res.data);

      setPost(res.data);

    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    loadPost();

  },[]);




  // ================= ADD COMMENT =================

  const addComment = async()=>{

    if(!token){

      alert("Please Login First");

      return;

    }

    if(!comment){

      alert("Please write comment");

      return;

    }

    try{

      await axios.post(

        `http://localhost:5000/api/posts/comment/${id}`,

        {
          text:comment
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      alert("Comment Added ✅");

      setComment("");

      loadPost();

    }catch(error){

      console.log(error);

      alert("Comment Failed");

    }

  };




  // ================= DELETE COMMENT =================

  const deleteComment = async(commentId)=>{

    try{

      await axios.delete(

        `http://localhost:5000/api/posts/comment/${id}/${commentId}`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      alert("Comment Deleted");

      loadPost();

    }catch(error){

      console.log(error);

      alert("Delete Failed");

    }

  };




  if(!post){

    return(

      <div
        style={{
          color:"white",
          textAlign:"center",
          marginTop:"100px"
        }}
      >

        Loading...

      </div>

    );

  }




  return(

    <div
      style={{
        background:"#0f172a",
        minHeight:"100vh",
        padding:"40px",
        color:"white",
        fontFamily:"Arial"
      }}
    >

      {/* BLOG IMAGE */}

      <img

        src={
          post.image
          ||
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
        }

        alt="blog"

        style={{
          width:"100%",
          maxHeight:"450px",
          objectFit:"cover",
          borderRadius:"20px",
          marginBottom:"30px"
        }}

      />



      {/* BLOG CONTENT */}

      <div
        style={{
          background:"#1e293b",
          padding:"30px",
          borderRadius:"20px"
        }}
      >

        {/* CATEGORY */}

        <span
          style={{
            background:"#06b6d4",
            padding:"8px 14px",
            borderRadius:"10px",
            fontSize:"14px"
          }}
        >

          {post.category || "Technology"}

        </span>



        {/* TITLE */}

        <h1
          style={{
            marginTop:"20px",
            color:"#38bdf8"
          }}
        >

          {post.title}

        </h1>



        {/* AUTHOR */}

        <p
          style={{
            marginTop:"10px",
            color:"#94a3b8"
          }}
        >

          ✍️ {

            post.author?.username
            ||
            post.author
            ||
            "Sabiya"

          }

        </p>



        {/* CONTENT */}

        <p
          style={{
            marginTop:"25px",
            lineHeight:"1.9",
            fontSize:"18px"
          }}
        >

          {post.content}

        </p>





        {/* COMMENTS SECTION */}

        <div
          style={{
            marginTop:"50px"
          }}
        >

          <h2
            style={{
              marginBottom:"20px"
            }}
          >

            Comments

          </h2>



          {/* COMMENT INPUT */}

          <textarea

            rows="4"

            placeholder="Write comment..."

            value={comment}

            onChange={(e)=>
              setComment(e.target.value)
            }

            style={{
              width:"100%",
              padding:"15px",
              borderRadius:"12px",
              border:"none",
              outline:"none",
              marginBottom:"15px"
            }}

          />



          {/* COMMENT BUTTON */}

          <button

            onClick={addComment}

            style={{
              padding:"12px 20px",
              background:"#06b6d4",
              border:"none",
              borderRadius:"10px",
              color:"white",
              cursor:"pointer",
              marginBottom:"20px"
            }}

          >

            Add Comment

          </button>




          {/* NO COMMENTS */}

          {
            post.comments?.length === 0
            &&
            <p>No comments yet</p>
          }




          {/* COMMENTS LIST */}

          {
            post.comments?.map((c)=>(

              <div

                key={c._id}

                style={{
                  background:"#334155",
                  padding:"15px",
                  borderRadius:"12px",
                  marginTop:"15px"
                }}

              >

                <p
                  style={{
                    color:"#38bdf8",
                    marginBottom:"10px"
                  }}
                >

                  ✍️ {

                    c.username
                    ||
                    "User"

                  }

                </p>

                <p>

                  {c.text}

                </p>



                {/* DELETE BUTTON */}
                {
  user
  &&
  (
    c.user === user.id
    ||
    c.user?._id === user.id
  )
  &&

                
                  <button

                    onClick={()=>
                      deleteComment(c._id)
                    }

                    style={{
                      marginTop:"10px",
                      background:"#ef4444",
                      border:"none",
                      padding:"8px 14px",
                      borderRadius:"8px",
                      color:"white",
                      cursor:"pointer"
                    }}

                  >

                    Delete

                  </button>
                }

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );
}
