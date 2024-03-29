import dynamic from 'next/dynamic';
import {useEffect, useState} from 'react';
import axiosInstance from '../../../shared/api/axiosInstance';
const CustomEditor = dynamic(()=>import('@ui/Editor/Editor'),{ssr:false})
import { Select } from 'antd';
import {BaseOptionType} from 'rc-select/es/Select';

interface CreatePostProps {
    className?: string;
}

const CreatePost = ({className}: CreatePostProps) => {
    const [header, setHeader] = useState('');
    const [tags, setTags] = useState<BaseOptionType[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleHeaderChange = (event) => {
        setHeader(event.target.value);
    };

    const [content,setContent] = useState('')

    const handleChange = (value: string[]) => {
        setSelectedTags(value);
        console.log(`selected ${value}`);
    };

    const savePost = async () => {
        try {
            const response = await axiosInstance.post('posts', {
                content,
                header,
                tags: selectedTags
            });
            console.info(response)
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getTagsAsync = async () => {
        try {
            const response = await axiosInstance.get('posts/tags');
            setTags(response.data.map(tag => ({ value: tag, label: tag })));
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getTagsAsync();
        };
        fetchData();
    }, [])

    return (
        <div>
            <div>
                <input type="text" value={header} onChange={handleHeaderChange} placeholder='header' />
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Tags Mode"
                    onChange={handleChange}
                    options={tags}
                />
                <CustomEditor setContent={setContent} content={content} />
            </div>
            <button onClick={savePost}>Сохранить</button>
        </div>
    );
};

export default CreatePost;