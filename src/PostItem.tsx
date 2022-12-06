import React, { FC } from 'react'
import {Post} from "./types"
import "./post-item.css"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deletePost} from "./api";

interface PostItemProps {
    post: Post
}

const PostItem: FC<PostItemProps> = ({post}) => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            return await deletePost(id)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })

    const onDelete = (id: string): void => {
        deleteMutation.mutate(id)
    }

    return (
        <div className={"post-item-wrapper"}>
            <h3>{post.title}</h3>
            <img src={post.picture} alt={post.title} className={"post-picture"}/>
            <p>{post.content}</p>
            <button onClick={()=>onDelete(post.id)}>delete</button>
        </div>
    )
}

export default PostItem
