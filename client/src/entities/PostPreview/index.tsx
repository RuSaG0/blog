import { FC } from 'react';
import {IProps} from './post-preview.interface';

const PostPreview:FC<IProps> = ({ post }) => {
    return <>
        <div>
            {post.id}
        </div>
    </>
};

export default PostPreview;