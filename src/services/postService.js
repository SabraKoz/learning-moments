export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=topic`).then((res) => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts?_expand=topic&_expand=user&_embed=userLikedPosts&id=${id}`).then(res => res.json())
}