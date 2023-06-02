import { FC } from 'react';
import {IProps} from './interface';

const PostPreview:FC<IProps> = ({ post }) => {
    return <>
        <div>
            <p>{post.id}</p>
            <p>{post.header}</p>
            {Array.isArray(post.tags) && <p>{post.tags.join(', ')}</p>}
        </div>
    </>
};

export default PostPreview;