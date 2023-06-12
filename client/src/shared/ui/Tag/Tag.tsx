import cls from './Tag.module.scss'
import type { WithChildren } from "@extensions/components";

interface TagProps {
    onClick?: (children) => void
}

const Tag = ({onClick, children}: WithChildren<TagProps>) => {

    const handleClick = () => {
        if (onClick) {
            onClick(children);
        }
    };

    return (
        <span className={cls.Tag} onClick={handleClick}>
            {children}
        </span>
    );
};

export default Tag;