import React from "react";

const Post = ({postObj}) =>(
    <>
        <li>
           <h4>{postObj}</h4>
        </li>
        <button>삭제</button>
        <button>수정</button>
    </>
);

export default Post;