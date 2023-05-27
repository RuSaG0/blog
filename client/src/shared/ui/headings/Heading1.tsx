import { IProps } from './heading.interface';
import { FC } from 'react';

const Heading:FC<IProps> = ({ text }) => {
    return <h1>{ text }</h1>;
};

export default Heading;