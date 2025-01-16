import { useEffect, useState } from "react"
import "./AllPosts.css"
import { Post } from "./Post"
import { getUserPosts } from "../../services/userService"
import { deletePost } from "../../services/postService"

export const MyPosts = ({ currentUser }) => {
    const [userPosts, setUserPosts] = useState([])

    const getAndSetUserPosts = () => {
        getUserPosts(currentUser.id).then(posts => {
            setUserPosts(posts)
        })
    }

    useEffect(() => {
        getAndSetUserPosts()
    }, [currentUser])

    const handleDeletePost = (postId) => {
        deletePost(postId).then(() => {
            getAndSetUserPosts(userPosts)
        })
    }

    return <div className="posts-container">
        <h1>My Posts</h1>
        <div className="posts">
            {userPosts.map(post => (<Post key={post.id} post={post} showDelete={true} onDelete={handleDeletePost} />))}
            
        </div>
    </div>
}