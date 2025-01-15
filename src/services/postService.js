export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=topic`).then((res) => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts?_expand=topic&_expand=user&_embed=userLikedPosts&id=${id}`).then(res => res.json())
}

export const createNewPost = (postId) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postId)
    }).then((res) => res.json())
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}