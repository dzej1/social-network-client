import React, {FC} from 'react'
import "./post-item.css"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deletePost, getPost} from "./api";
import {useParams, useNavigate, Link} from 'react-router-dom';


const PostDetail: FC = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { data, error, isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: async () => await getPost(id),
        enabled: id != null
    })

    const mutation = useMutation({
        mutationFn: async (id: string) => {
            return await deletePost(id)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['post']})
            navigate("/")
        },
    })

    if (isLoading) {
        return <h1>Loading...</h1>
    }


    if (error != null || data == null) {
        return (
            <>
                <h4>Error</h4>
                <Link to="/">Back home</Link>
            </>
        )
    }


    const onDelete = (id: string): void => {
        mutation.mutate(id)
    }

    return (
        <div className={"post-item-wrapper"}>
            <button onClick={() => navigate("/")}>back home</button>
            <h3>{data?.title}</h3>
            <img src={data?.picture} alt={data?.title} className={"post-picture"}/>
            <p>{data?.content}</p>
        <button onClick={() => onDelete(data.id)} disabled={mutation.isLoading}>delete</button>
        </div>
    )
}


export default PostDetail
