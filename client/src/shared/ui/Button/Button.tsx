import {classNames} from '@shared/lib/classNames/classNames';
import cls from './Button.module.scss'
import {ButtonHTMLAttributes} from 'react';
import {WithChildren} from '@extensions/components';

export enum ThemeButton {
    CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
}

const Button = (props: WithChildren<ButtonProps>) => {
    const {
        className = '',
        children,
        ...otherProps
    } = props;

    return (
        <button
            className={classNames(cls.Button, {}, [className])}
            {...otherProps}
        >
            {children}
        </button>
    );
};

export default Button;