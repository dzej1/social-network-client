import React, { FC } from 'react'
import {Post} from "./types"
import "./post-item.css"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deletePost} from "./api";
import {useNavigate} from "react-router-dom";

interface PostItemProps {
    post: Post
}

const PostItem: FC<PostItemProps> = ({post}) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            return await deletePost(id)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    const onDelete = (id: string): void => {
        mutation.mutate(id)
    }

    return (
        <div className={"post-item-wrapper"}>
            <h3>{post.title}</h3>
            <img src={post.picture} alt={post.title} className={"post-picture"}/>
            <p className="post-content">{post.content}</p>
            <button onClick={()=>navigate(`/detail/${post.id}`)}>show post</button>
            <button onClick={()=>onDelete(post.id)} disabled={mutation.isLoading}>delete</button>
        </div>
    )
}

export default PostItem
