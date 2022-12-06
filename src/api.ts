import axios from "axios";
import {NewPost, Post} from "./types"

export const fetchPosts = async (): Promise<Post[]> => await axios.get('http://localhost:3000/posts/').then(response => response.data)

export const createPost = async (payload: NewPost): Promise<Post> => await axios.post('http://localhost:3000/posts/', payload).then(response => response.data)

export const deletePost = async (id: string): Promise<Post> => await axios.delete(`http://localhost:3000/posts/${id}`).then(response => response.data)