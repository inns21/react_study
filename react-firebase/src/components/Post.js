import React, { useState } from "react";
import { db } from '../firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const Post = ({postObj, isOwner}) =>{
    const [edit, setEdit] = useState(false);
    const [newpost, setNewpost] = useState(postObj.content);

    const deletePost = async() => {
        const yes = window.confirm('진짜 삭제할까요?');
        if(yes){
            await deleteDoc(doc(db, "posts", postObj.id));

        }
        
    }

    const toggleEditMode = () => {
        setEdit(prev => ! prev);
    }

    const onChange = (e) => {
        const {target:{value}} = e;
        setNewpost(value);
    }

    const onSubmit = async(e) =>{
        e.preventDefault();
        const postRef = doc(db, "posts", postObj.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(postRef, {
            content: newpost
        });
        setEdit(false);
    }

    return(
    <>
        <li>
            {
                edit ? (<>
                    <form onSubmit={onSubmit}>
                        <input value={newpost} required onChange={onChange}></input>
                        <button>입력</button>
                    </form>
                    <button onClick={toggleEditMode}>취소</button>
                </>):(<>
                    <h4>{postObj.content}</h4>
                    {isOwner && (
                        <>
                        <button onClick={deletePost}>삭제</button>
                        <button onClick={toggleEditMode}>수정</button>
                        </>
                    )}
                </>)
            }
        </li>            
    </>
)};

export default Post;