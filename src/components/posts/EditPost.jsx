import { useEffect, useState } from "react"
import "./AllPosts.css"
import { getPostById, updatePost } from "../../services/postService"
import { getAllTopics } from "../../services/topicService"
import { useNavigate, useParams } from "react-router-dom"

export const EditPost = () => {
    const [post, setPost] = useState([])
    const [topics, setTopics] = useState([])

    const { postId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId).then(data => {
            const postObj = data[0]
            setPost(postObj)
})
}, [postId])

      useEffect(() => {
            getAllTopics().then(topicsArray => {setTopics(topicsArray)})
        }, [])
    

    const handleInputChange = (event) => {
        const postCopy = {...post}
        postCopy[event.target.name] = event.target.value
        setPost(postCopy)
    }

    const handleSave = (event) => {
        event.preventDefault()
        const editedPost = {
            id: post.id,
            title: post.title,
            body: post.body,
            date: new Date(),
            topicId: parseInt(post.topicId),
            userId: post.userId
        }

        updatePost(editedPost).then(() => {
            navigate(`/myPosts`)
        })
    }

    return (
        <form className="new-post-form">
            <h1 className="post-header">Edit Post</h1>
            <fieldset>
                <div className="post-info-title">
                    <label>Title: </label>
                    <input 
                        type="text" 
                        name="title" 
                        value={post.title ? post.title : ''}
                        onChange={handleInputChange}
                        required 
                        className="new-title"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="post-info-title">
                    <label>Topic: </label>
                    <select 
                        className="topic-dropdown" 
                        name="topicId"
                        value={post.topicId}
                        onChange={handleInputChange}>
                        <option value="" className="default-dropdown">Select Topic</option>
                        {topics.map(topic => {
                            return (<option value={topic.id} key={topic.id}>{topic.name}</option>)
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="post-info-title">
                    <label>Post: </label>
                    <input 
                        type="text" 
                        name="body" 
                        value={post.body ? post.body : ''}
                        onChange={handleInputChange}
                        required 
                        className="new-body" />
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary" onClick={handleSave}>Save Post</button>
        </form>
    )
}