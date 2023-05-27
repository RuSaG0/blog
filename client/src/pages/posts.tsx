import { useEffect, useState } from 'react';
import axios from 'axios';
import PostPreview from '@/entities/PostPreview';
const PostsPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts');
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