import { IProps } from './heading.interface';
import { FC } from 'react';

const Heading:FC<IProps> = ({ text }) => {
    return <h3>{ text }</h3>;
};

export default Heading;