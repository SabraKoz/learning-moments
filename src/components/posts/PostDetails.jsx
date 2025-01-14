import { useEffect, useState } from "react"
import "./AllPosts.css"
import { useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"

export const PostDetails = () => {
    const [post, setPost] = useState([])

    const { postId } = useParams()

    useEffect(() => {
        getPostById(postId).then(data => {
            const postObj = data[0]
            setPost(postObj)
        })
    }, [postId])

    return <section className="post-details">
        <header className="post-header">{post?.title}</header>
        <div><span className="post-topic">Topic: </span>{post?.topic?.name}</div>
        <div>{post?.body}</div>
        <div><span className="post-info">Author: </span>{post?.user?.name}</div>
        <div><span className="post-info">Post Date: </span>{post?.date}</div>
        <div><span className="post-info">Likes: </span>{post?.userLikedPosts?.length}</div>
    </section>
}