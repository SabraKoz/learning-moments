import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/topicService"
import { PostFilter } from "./PostFilter"
import { Post } from "./Post"
import { getLikedPosts } from "../../services/userLikedPostsService"
import "./AllPosts.css"
import { Link } from "react-router-dom"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([])
    const [selectTopic, setSelectTopic] = useState("")

    useEffect(() => {
        getLikedPosts().then(postArray => { setAllPosts(postArray) })
        getAllTopics().then(topicArray => { setAllTopics(topicArray) })
    }, [])

    useEffect(() => {
        let foundPosts = allPosts

        if (searchTerm) {
            foundPosts = foundPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        if (selectTopic) {
            foundPosts = foundPosts.filter(post => post.topicId === parseInt(selectTopic))
        }
    
        setFilteredPosts(foundPosts)
        
    }, [searchTerm, selectTopic, allPosts])


    return (
        <div className="posts-container">
        <h1>All Posts</h1>
        <PostFilter allTopics={allTopics} setSearchTerm={setSearchTerm} setSelectTopic={setSelectTopic} />
            <article className="posts">
                {filteredPosts.map((post) => {
                    return <Post post={post} key={post.id} />
                })}
            </article>

            
        </div>
    )
}