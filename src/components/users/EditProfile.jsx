import { useEffect, useState } from "react"
import "./Profile.css"
import { useNavigate, useParams } from "react-router-dom"
import { getUserById, updateProfile } from "../../services/userService"

export const EditProfile = ({ currentUser }) => {
    const [userEdit, setUserEdit] = useState([])

    const { userId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getUserById(userId).then(data => {
            const userObj = data[0]
            setUserEdit(userObj)
        })
    }, [userId])

    const handleInputChange = (event) => {
        const userCopy = {...userEdit}
        userCopy[event.target.name] = event.target.value
        setUserEdit(userCopy)
    }

    const handleSaveChanges = (event) => {
        event.preventDefault()
        const editedProfile = {
            id: userEdit.id,
            name: userEdit.name,
            email: userEdit.email,
            cohort: parseInt(userEdit.cohort)
        }

        updateProfile(editedProfile).then(() => {
            navigate(`/profile/${userId}`)
        })
    }

    return (
        <section className="profile-details">
            <h1 className="profile-header">Edit Profile</h1>
            <fieldset>
                <div className="new-profile">
                    <label className="profile-title">Name: </label>
                    <input
                        type="text"
                        name="name"
                        value={userEdit.name ? userEdit.name : ''}
                        onChange={handleInputChange}
                        required
                        className="new-info"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="new-profile">
                    <label className="profile-title">Cohort: </label>
                    <input
                        type="text"
                        name="cohort"
                        value={userEdit.cohort ? userEdit.cohort : ''}
                        onChange={handleInputChange}
                        required
                        className="new-info"
                        />
                </div>
            </fieldset>
            <button type="submit" className="btn" onClick={handleSaveChanges}>Save Changes</button>
        </section>
    )
}