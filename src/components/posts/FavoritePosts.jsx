import { useEffect, useState } from "react"
import "./AllPosts.css"
import { getUserLikedPosts, unlikePost } from "../../services/userLikedPostsService"
import { Link } from "react-router-dom"

export const FavoritePosts = ({ currentUser }) => {
    const [likedPosts, setLikedPosts] = useState([])

    const getAndSetUserLikedPosts = () => {
            getUserLikedPosts(currentUser.id).then(posts => {
                setLikedPosts(posts)
            })
        }
    
        useEffect(() => {
            getAndSetUserLikedPosts()
        }, [currentUser])

    const handleUnlike = (postId) => {
        unlikePost(postId).then(() => {
            getAndSetUserLikedPosts(likedPosts)
        })
    }

    return (
        <div className="posts-container">
            <h1>Favorite Posts</h1>
            <div className="posts">
                
                {likedPosts.map(
                    userLikedPost => (
                        <section key={userLikedPost.id} className="post">
                            <Link to={`/posts/${userLikedPost.postId}`} className="post-title-link" >
                            <header className="post-title">{userLikedPost.post.title}</header>
                            </Link>
                            <footer>
                                <button onClick={() => handleUnlike(userLikedPost.id)} className="btn">Unlike</button>
                            </footer>
                        </section>))}
                
            </div>
        </div>
    )
}