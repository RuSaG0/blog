import cls from './CreatePost.module.scss'
import EditorComponent from '@ui/Editor/Editor';
import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
const CustomEditor = dynamic(()=>import('@ui/Editor/Editor'),{ssr:false})

interface CreatePostProps {
    className?: string;
}

const CreatePost = ({className}: CreatePostProps) => {
    const [content,setContent] = useState('')

    useEffect(()=> {
        console.info(content)
    }, [content])

    return (
        <div>
            <div>
                Create post here
                <CustomEditor setContent={setContent} content={content} />
            </div>
        </div>
    );
};

export default CreatePost;