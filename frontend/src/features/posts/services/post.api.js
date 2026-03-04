import axios from "axios"

const api = axios.create({
    withCredentials: true
})


export async function getAllPosts() {
    try{
        const res = await api.get("/api/posts/getall-posts")

        return res.data
    }
    catch(err){
        throw err
    }
}

export async function getUserPosts() {
    try{
        const res = await api.get("/api/posts")

        return res.data
    }
    catch(err){
        throw err
    }
}

export async function createPost(imageFile, caption) {

    const formData = new FormData()

    formData.append("image", imageFile)
    formData.append("caption", caption)

    const res = await api.post("/api/posts", formData)

    return res.data
}

export async function likePost(postId) {
    const res = await api.post("/api/posts/likes/" + postId)

    return res.data
}

export async function unlikePost(postId) {
    const res = await api.post("/api/posts/unlikes/" + postId)

    return res.data
}