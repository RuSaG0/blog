import { IProps } from './heading.interface';
import { FC } from 'react';

const Heading:FC<IProps> = ({ text }) => {
    return <h2>{ text }</h2>;
};

export default Heading;