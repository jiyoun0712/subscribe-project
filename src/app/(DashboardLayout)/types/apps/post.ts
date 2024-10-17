export type ProfileType = {
    
    avatar: string;
    group_name: string;
  };
  
  export type Likes = {
    like: boolean;
    value: number;
  };
  
  export type PostImageType = {
    img: string;
    featured?: boolean;
    title?: string;
  };
  
  export type CommentDataType = {
    name?: string;
    comment?: string;
    likes?: Likes;
    video?: string;
    replies?: Reply[];
  };
  
  export type Reply = {
    id?: string | number; 
    profile?: ProfileType;
    data: CommentDataType;
  };
  
  export type Comment = {
    id: string | number;
    profile: ProfileType;
    data?: CommentDataType;
  };
  

  
  export type PostDataType = {
    id?: string | number;
    
    summary: string;
    createdAt?: Date;
    view?: number;
    share?: number;
    content: string;
    images: PostImageType[];
    video?: string;
    likes: Likes;
    comments?: Comment[];
  };
  
  export type PostType = {
    p_no?: number;
    
    g_no: number;
    type: string;    
    contents: string;
    user_n: string;
    //r_date?: Date;
    r_date?: string;
    
    views?: number;
    share?: number;
    tags: string;
    cover: string;
    color: string;

    likes: Likes;
    profile: ProfileType;
    images: PostImageType[];
    comment: Comment[];
  };
  