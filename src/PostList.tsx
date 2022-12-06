import React, { FC } from 'react'
import {useQuery} from "@tanstack/react-query";
import {fetchPosts} from "./api"
import {Post} from "./types"
import PostItem from "./PostItem";
import NewPost from "./NewPost";

const PostList: FC = () => {
    const { data, error, isLoading } = useQuery<Post[], Error>({ queryKey: ['posts'], queryFn: fetchPosts })

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error != null) {
        throw error
    }


    return (
        <>
            <NewPost />
            {data?.map(post => <PostItem key={post.id} post={post}/>)}
        </>
    )
}

export default PostList
