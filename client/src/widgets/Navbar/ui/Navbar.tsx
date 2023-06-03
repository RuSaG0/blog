import {classNames} from '@shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import AppLink, {AppLinkTheme} from '@ui/AppLink/AppLink';

interface NavbarProps {
    className?: string;
}

const Navbar = ({className}: NavbarProps) => {
    return (
        <>
        <div className={classNames(cls.Navbar, {}, [])}>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} href={'/'}>Home</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} href={'/best'}>Best</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} href={'/pets'}>Pets</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} href={'/about'}>About</AppLink>
            </div>
        </div>
        </>
    );
};

export default Navbar;