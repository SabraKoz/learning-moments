export const getLikedPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=topic&_embed=userLikedPosts`).then((res) => res.json())
}

export const createLike = (like) => {
    return fetch(`http://localhost:8088/userLikedPosts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(like)
    })
}