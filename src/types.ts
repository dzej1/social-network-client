export interface Post extends NewPost {
    id: string
}

export interface NewPost {
    title: string
    content: string
    picture: string
}