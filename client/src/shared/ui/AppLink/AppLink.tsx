import {classNames} from '@shared/lib/classNames/classNames';
import cls from './AppLink.module.scss'
import Link, {LinkProps} from 'next/link';
import {WithChildren} from '@extensions/components';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme
}

const AppLink = (props: WithChildren<AppLinkProps>) => {
    const {
        href,
        className = '',
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;


    return (
        <Link
            href={href}
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};

export default AppLink;