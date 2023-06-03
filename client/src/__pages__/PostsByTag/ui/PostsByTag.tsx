import { useEffect, useState } from 'react';
import PostPreview from '@entities/PostPreview/PostPreview';
import {IPost} from '@models/posts/post';
import axiosInstance from '../../../shared/api/axiosInstance';
import { useRouter } from 'next/router';

const PostsByTag = () => {
    const router = useRouter();
    const { id } = router.query;

    const [posts, setPosts] = useState([]);

    const fetchPostsByTag = async () => {
        try {
            const response = await axiosInstance.get('/posts', { params: { tags: id } });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };


    useEffect(() => {

            if (id) {
                fetchPostsByTag();
            }

    }, [id]);

    return (
        <div>
            <h1>posts about {id}</h1>
            {posts.map((_post: IPost) => (
                <PostPreview key={_post.id} post={_post}/>
            ))}
        </div>
    );
};

export default PostsByTag;