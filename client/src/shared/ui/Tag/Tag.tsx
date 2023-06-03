import cls from './Tag.module.scss'

const Tag = ({children, onClick}) => {
    const handleClick = () => {
        onClick(children);
    };

    return (
        <span className={cls.Tag} onClick={handleClick}>
            {children}
        </span>
    );
};

export default Tag;