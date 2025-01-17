import { useEffect, useState } from "react"
import "./Profile.css"
import { getUserById } from "../../services/userService"
import { useNavigate, useParams } from "react-router-dom"

export const Profile = ({ currentUser }) => {
    const [user, setUser] = useState([])

    const { userId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId).then(data => {
            const userObj = data[0]
            setUser(userObj)
        })
    }, [userId])

    return (
        <section className="profile-details">
            <header className="profile-header">{user?.name}</header>
            <div>
                <div className="profile-info"><span className="profile-title">Cohort: </span>{user.cohort}</div>
                <div className="profile-info"><span className="profile-title">Number of Posts: </span>{user.posts?.length}</div>
            </div>
            <div>
                {currentUser.id === user?.id ? (
                    <button className="btn" onClick={() => {navigate(`/profile/${currentUser.id}/edit`)}}>Edit Profile</button>
                ) : ("")}
            </div>
        </section>
    )
}