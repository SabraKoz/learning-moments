import { useEffect, useState } from "react"
import "./AllPosts.css"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"
import { createLike, getLikedPosts } from "../../services/userLikedPostsService"

export const PostDetails = ({ currentUser }) => {
    const [post, setPost] = useState([])

    const { postId } = useParams()

    const getAndSetPost = () => {
        getPostById(postId).then(data => {
            const postObj = data[0]
            setPost(postObj)
        })
    }

    useEffect(() => {
      getAndSetPost()
    }, [])

    const handleLike = () => {
        const newUserLikedPost = {
            userId: currentUser.id,
            postId: post.id
        }

        createLike(newUserLikedPost).then(() => {
            getAndSetPost()
        })
    }


    return <section className="post-details">
        <header className="post-header">{post.title}</header>
        <div><span className="post-info-title">Topic: </span>{post.topic?.name}</div>
        <div className="post-body">{post.body}</div>
        <div className="post-info">
        <div><span className="post-info-title">Author: </span>{post.user?.name}</div>
        <div><span className="post-info-title">Post Date: </span>{post.date}</div>
        <div><span className="post-info-title">Likes: </span>{post.userLikedPosts?.length}</div>
        </div>
        <div>
            {currentUser.id === post.userId ? (
                <button className="btn">Edit Post</button>
            ) : (<button className="btn" onClick={handleLike}>Like</button>)}
        </div>
    </section>
}