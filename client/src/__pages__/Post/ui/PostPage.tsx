import cls from './PostPage.module.scss'
import {useRouter} from 'next/router';
import axiosInstance from '../../../shared/api/axiosInstance';
import {useEffect, useState} from 'react';
import EditorJsParser from 'editorjs-html';
import edjsParser from 'editorjs-parser'

const parseEditorJs = async (data) => {
    const parser = new EditorJsParser();
    const html = await parser.parse(data);
    return html;
};

interface PostPageProps {
    className?: string;
}

const PostPage = ({className}: PostPageProps) => {
    const parser = new edjsParser();
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState(null);
    const [content, setContent] = useState('');

    // Assuming you have a function to fetch the post based on the ID
    const fetchPost = async () => {
        try {
            const response = await axiosInstance.get(`/posts/${id}`);
            setPost(response.data)
            console.info(1, response.data.content)
            const data = JSON.parse(await response.data.content)
            console.info(2, data)
            const html = await parseEditorJs(data);
            console.info(2, html)
            setContent(html)
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
                    <div dangerouslySetInnerHTML={{ __html: content }} />

                </div>
            </>}
        </div>
    );
};

export default PostPage;