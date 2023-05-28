import { useEffect, useState } from 'react';
import PostPreview from '@entities/PostPreview/PostPreview';
import axiosInstance from '../shared/api/axiosInstance';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get('posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((_post) => (
                <PostPreview post={_post}/>
            ))}
        </div>
    );
};

export default PostsPage;