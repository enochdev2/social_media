export interface Friend {
    profileUrl: string,
    firstName: string,
    lastName: string,
    _id: string | number,
    profession: string
}
export interface Comment {
    _id: any,
    from: string,
    replies: any,
    userId:{
    _id:string | number,
    profileUrl: string,
    firstName: string,
    lastName: string,
    }
    createdAt: Date,
    comment: string,
    likes: any
   
}