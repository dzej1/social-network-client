import React, {FC, useReducer} from 'react'
import "./new-post.css"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPost} from "./api";
import {NewPost} from "./types";

interface Action {
    type: string,
    newValue: string
}

interface NewPostFormProps {
    closeForm: () => void
}

function reducer(formValues: NewPost, action: Action ): NewPost {
    switch (action.type) {
        case 'title': {
            return {
                ...formValues,
                title: action.newValue
            };
        }
        case 'content': {
            return {
                ...formValues,
                content: action.newValue
            };
        }
        case 'picture': {
            return {
                ...formValues,
                picture: action.newValue
            };
        }
    }
    throw Error('Unknown action: ' + action.type);
}

const initialFormValues = {
    title: "",
    content: "",
    picture: ""
}

const NewPostForm: FC<NewPostFormProps> = (props) => {
    const queryClient = useQueryClient()
    const [formValues, dispatchValueChange] = useReducer(reducer, initialFormValues)
    const createMutation = useMutation({
        mutationFn: async (newPost: NewPost) => {
            return await createPost(newPost)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    })
    const changeInput = (e:React.ChangeEvent<HTMLInputElement>): void => {
        return dispatchValueChange({newValue:e.target.value, type: e.target.name})
    }

    const onSubmit = (e:React.FormEvent): void => {
        e.preventDefault()
        createMutation.mutate(formValues)
        props.closeForm()
    }

    return <form onSubmit={onSubmit}>
        <label>
            Title:<br />
            <input type="text" name="title" onChange={changeInput} required/>
        </label><br />
        <label>
            Content:<br />
            <input type="text" name="content" onChange={changeInput} required/>
        </label><br />
        <label>
            Picture URL:<br />
            <input type="text" name="picture" onChange={changeInput} required/>
        </label><br />
        <input type="submit" value="Create new post" />
    </form>
}

export default NewPostForm
