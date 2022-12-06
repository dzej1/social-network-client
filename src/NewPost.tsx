import React, { FC, useState } from 'react'
import "./new-post.css"
import NewPostForm from "./NewPostForm";


const NewPost: FC = () => {
    const [showForm, setShowForm] = useState<boolean>(false)

    const openForm = ():void => setShowForm(true)
    const closeForm = ():void => setShowForm(false)

    if (showForm) {
        return <NewPostForm closeForm={closeForm}/>
    }

    return <button className="create-new-post-button" onClick={openForm}>Add new post</button>
}

export default NewPost
