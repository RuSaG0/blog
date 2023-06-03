import { FC } from 'react';
import {IProps} from './interface';
import './PostPreview.module.css';
import { DateTime } from 'luxon';
import Link from 'next/link';

const PostPreview:FC<IProps> = ({ post }) => {

    const date = DateTime.fromISO(post.created_at).setLocale('en');
    const formattedDate = date.toFormat('d LLLL yyyy');

    return <>
        <Link href={`/post/${post.id}`}>
        <div className='wrapper'>
            <div className="left">
                <div className="top">
                    <span className='date'>
                    {formattedDate}
                    </span>
                    <div className="tags">

                    </div>
                </div>
                <h2 className='heading'>{post.header}</h2>
                <span className='description'>{post.content}</span>
            </div>
            <div className="right"></div>
        </div>
        </Link>
    </>
};

export default PostPreview;