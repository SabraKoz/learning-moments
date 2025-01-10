import { useEffect, useState } from "react"
import { getAllPosts } from "../services/postService"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getAllPosts().then(postArray => { setAllPosts(postArray) })
    }, [])

    return <div>
        <h1>All Posts</h1>
        <div>
            <header>{allPosts.title}</header>
        </div>
    </div>
}