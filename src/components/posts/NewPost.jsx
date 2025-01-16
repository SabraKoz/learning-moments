import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/topicService"
import "./AllPosts.css"
import { createNewPost } from "../../services/postService"
import { useNavigate } from "react-router-dom"

export const NewPost = ({ currentUser }) => {
    const [topics, setTopics] = useState([])
    const [selectTopic, setSelectTopic] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        getAllTopics().then(topicsArray => {setTopics(topicsArray)})
    }, [])

    const resetForms = () => {
        setTitle("")
        setBody("")
        setSelectTopic("")
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const newPost = {
            title: title,
            body: body,
            date: new Date(),
            topicId: parseInt(selectTopic),
            userId: currentUser.id
        }

        if (title && body && selectTopic) {
            createNewPost(newPost).then(() => {
                resetForms()
                navigate(`/myPosts`)
            })
        } else {
            window.alert("Please complete form")
        }  
    }

    return (
        <form className="new-post-form">
            <h1 className="post-header">Create New Post</h1>
            <fieldset>
                <div className="post-info-title">
                    <label>Title: </label>
                    <input 
                        type="text" 
                        name="title" 
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required 
                        className="new-title"/>
                </div>
            </fieldset>
            <fieldset>
                <div className="post-info-title">
                    <label>Topic: </label>
                    <select 
                        className="topic-dropdown" 
                        value={selectTopic}
                        onChange={(event) => setSelectTopic(event.target.value)}>
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
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                        required 
                        className="new-body" />
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit Post</button>
        </form>
    )
}