import { IProps } from './heading.interface';
import { FC } from 'react';

const Heading:FC<IProps> = ({ text }) => {
    return <h4>{ text }</h4>;
};

export default Heading;