import { useEffect, useState } from "react"
import "./Profile.css"
import { getUserById } from "../../services/userService"
import { useParams } from "react-router-dom"

export const Profile = ({ currentUser }) => {
    const [user, setUser] = useState([])

    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId).then(data => {
            const userObj = data[0]
            setUser(userObj)
        })
    }, [userId])

    return (
        <section>
            <header>{user?.name}</header>
            <div>
                <div>Cohort: {user?.cohort}</div>
                <div>Number of Posts: {user?.posts?.length}</div>
            </div>
            <div>
                {currentUser.id === user?.id ? (
                    <button>Edit Profile</button>
                ) : ("")}
            </div>
        </section>
    )
}