export const getLikedPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=topic&_embed=userLikedPosts`).then((res) => res.json())
}