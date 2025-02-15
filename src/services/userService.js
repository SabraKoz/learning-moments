export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const getUserPosts = (userId) => {
  return fetch(`http://localhost:8088/posts?_expand=topic&_expand=user&_embed=userLikedPosts&userId=${userId}`).then(res => res.json())
}

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json())
}

export const getUserById = (id) => {
  return fetch(`http://localhost:8088/users?_embed=posts&id=${id}`).then(res => res.json())
}

export const updateProfile = (user) => {
  return fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
}