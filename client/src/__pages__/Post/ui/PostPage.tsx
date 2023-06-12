import {useRouter} from 'next/router';
import axiosInstance from '../../../shared/api/axiosInstance';
import {useEffect, useRef, useState} from 'react';
import Output from 'editorjs-react-renderer';
import {IPost} from '@shared/types/post';

interface PostPageProps {
    className?: string;
}

const PostPage = ({className}: PostPageProps) => {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState<Nullable<IPost>>(null);
    const [content, setContent] = useState(null);

    const fetchPost = async () => {
        try {
            const response = await axiosInstance.get(`/posts/${id}`);
            setPost(response.data)
            const content = JSON.parse(response.data.content)
            setContent(content);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Call the fetchPost function when the component mounts
    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    return (
        <div>
            {post && <>
                <div>
                    <p>{post.header}</p>
                  <Output
                    data={content}
                  />
                </div>
            </>}
        </div>
    );
};

export default PostPage;