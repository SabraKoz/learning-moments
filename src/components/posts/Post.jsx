import { Link } from "react-router-dom"

export const Post = ({ post, showDelete, onDelete }) => {

    return (
        <section className="post">
            <Link to={`/posts/${post.id}`} key={post.id} className="post-title-link" ><header className="post-title">{post.title}</header></Link>
            <footer>
                <div className="topic">
                    <span className="topic-title">Topic: </span>{post.topic.name}
                </div>
                <div className="likes">
                    <span className="likes-title">Likes: </span>{post.userLikedPosts.length}
                </div>
                {showDelete && (
                    <button onClick={() => onDelete(post.id)} className="btn btn-delete">Delete Post</button>
                )}
            </footer>
        </section>
    )
}