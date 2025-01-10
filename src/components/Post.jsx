
export const Post = ({ post }) => {

    return (
        <section className="post">
            <header className="post-title">{post.title}</header>
            <footer>
                <div className="post-topic">
                    Topic: {post.topic.name}
                </div>
                <div className="post-likes">
                    Likes: {post.userLikedPosts.length}
                </div>
            </footer>
        </section>
    )
}