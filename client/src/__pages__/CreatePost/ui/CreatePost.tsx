import cls from './CreatePost.module.scss'
import EditorComponent from '@ui/Editor/Editor';
import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
import axiosInstance from '../../../shared/api/axiosInstance';
const CustomEditor = dynamic(()=>import('@ui/Editor/Editor'),{ssr:false})

interface CreatePostProps {
    className?: string;
}

const CreatePost = ({className}: CreatePostProps) => {
    const [content,setContent] = useState('')

    const savePost = async () => {
        try {
            const response = await axiosInstance.post('posts', {
                content,
                header: 'FSM'
            });
            console.info(response)
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(()=> {
        console.info(123)
        console.info(content)
    }, [content])

    return (
        <div>
            <div>
                Create post here
                <CustomEditor setContent={setContent} content={content} />
            </div>
            <button onClick={savePost}>Сохранить</button>
        </div>
    );
};

export default CreatePost;