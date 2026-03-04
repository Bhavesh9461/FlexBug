import axios from "axios";

const api = axios.create({
    withCredentials: true
})

export async function followUser(id) {
    try{
        const res = await api.post("/api/users/follow/" + id)

        return res.data
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function unfollowUser(id) {
    try{
        const res = await api.post("/api/users/unfollow/" + id)

        return res.data
    }
    catch(err){
        console.log(err);
        throw err
    }
}

export async function fetchFollowing() {
    try{
        const res = await api.get("/api/users/following")
        console.log(res.data);
        
        return res.data
    }
    catch(err){
        console.log(err);
        throw err
    }
}