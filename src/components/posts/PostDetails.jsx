import { useEffect, useState } from "react"
import "./AllPosts.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../services/postService"
import { createLike, unlikePost } from "../../services/userLikedPostsService"

export const PostDetails = ({ currentUser }) => {
    const [post, setPost] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [userLikeId, setUserLikeId] = useState(null)

    const { postId } = useParams()

    const navigate = useNavigate()

    const getAndSetPost = () => {
        getPostById(postId).then(data => {
            const postObj = data[0]
            setPost(postObj)

            const userLike = postObj.userLikedPosts?.find(like => like.userId === currentUser.id)

            setHasLiked(!!userLike)
            if (userLike) {
                setUserLikeId(userLike.id)
            }
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
            navigate("/favorites")
        })
    }

    const handleUnlike = () => {
        unlikePost(userLikeId).then(() => {
            getAndSetPost()
        })
    }


    return <section className="post-details">
        <header className="post-header">{post.title}</header>
        <div><span className="post-info-title">Topic: </span>{post.topic?.name}</div>
        <div className="post-body">{post.body}</div>
        <div className="post-info">
        <div><span className="post-info-title">Author: </span><Link to={`/profile/${post.user?.id}`}>{post.user?.name}</Link></div>
        <div><span className="post-info-title">Post Date: </span>{post.date}</div>
        <div><span className="post-info-title">Likes: </span>{post.userLikedPosts?.length}</div>
        </div>
        <div>
            {currentUser.id === post.userId ? (
                <button className="btn" onClick={ () => {navigate(`/posts/${postId}/edit`)}}>Edit Post</button>
            ) : (hasLiked ? (<button className="btn" onClick={handleUnlike}>Unlike</button>) : (<button className="btn" onClick={handleLike}>Like</button>))}
        </div>
    </section>
}