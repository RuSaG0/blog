import { useEffect, useState } from 'react';
import PostPreview from '@entities/PostPreview/PostPreview';
import {IPost} from '@models/posts/post';
import Tag from '@ui/Tag/Tag';
import axiosInstance from '../../../shared/api/axiosInstance';
import { useRouter } from 'next/router';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const response = await axiosInstance.get('posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await axiosInstance.get('posts/tags');
            setTags(response.data);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };


    useEffect(() => {
        const refreshData = async () => {
            await Promise.all([fetchPosts(), fetchTags()]);
        };

        refreshData();
    }, []);

    const handleTagClick = (tag) => {
        router.push(`/tag/${encodeURIComponent(tag)}`);
    };

    return (
        <div>
            <h1>Contents</h1>
            <p>All tags in alphabetic order</p>
            {tags.map((_tag: string) => (
                <Tag key={_tag} onClick={handleTagClick}>
                    {_tag}
                </Tag>
            ))}
            <h1 style={{marginBottom: '60px'}}>Recent Posts</h1>
            {posts.map((_post: IPost) => (
                <PostPreview key={_post.id} post={_post}/>
            ))}
        </div>
    );
};

export default PostsPage;