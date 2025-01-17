import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/nav/NavBar"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPost } from "../components/posts/NewPost"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../components/posts/EditPost"
import { FavoritePosts } from "../components/posts/FavoritePosts"
import { Profile } from "../components/users/Profile"
import { EditProfile } from "../components/users/EditProfile"


export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const localLearningUSer = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUSer)

        setCurrentUser(learningUserObject)
    }, [])

    return <Routes>
        <Route path="/" element={<><NavBar currentUser={currentUser} /><Outlet /></>} >
            <Route index element={<AllPosts currentUser={currentUser} />} />
            <Route path="posts" >
                <Route index element={<AllPosts currentUser={currentUser} />} />
                <Route path=":postId" element={<PostDetails currentUser={currentUser} />} />
                <Route path=":postId/edit" element={<EditPost />} />
            </Route>
            <Route path="newPost" element={<NewPost currentUser={currentUser} />} />
            <Route path="myPosts" element={<MyPosts currentUser={currentUser} />} />
            <Route path="favorites" element={<FavoritePosts currentUser={currentUser} />} />
            <Route path="profile" >
                <Route index element={<Profile currentUser={currentUser} />} />
                <Route path=":userId" element={<Profile currentUser={currentUser} />} />
                <Route path=":userId/edit" element={<EditProfile currentUser={currentUser} />} />
            </Route>
        </Route>
    </Routes>
}