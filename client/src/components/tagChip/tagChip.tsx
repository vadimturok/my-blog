import React, {FC, useState} from 'react';
import {ITag} from "../../types/tag-type";
import {useNavigate} from "react-router-dom";
import './tagChip.scss'
import {hex2rgb} from "../../helpers";



const TagChip: FC<{tag: ITag}> = ({tag}) => {
    const navigate = useNavigate()
    const [isHovering, setIsHovering] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLElement>, tagId: number) => {
        e.stopPropagation()
        navigate(`/t/${tagId}`)
    }
    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            key={tag.id}
            style={{
                border: `1px solid #${tag.color}`,
                backgroundColor: isHovering ? `rgba(${hex2rgb('#'.concat(tag.color))}, 0.2` : 'unset',
                color: isHovering ? `#${tag.color}` : 'unset'
            }}
            className={'postItemTag'}
            onClick={(e) => handleClick(e, tag.id)}
        >
            <span style={{color: `#${tag.color}`}}>#</span>
            {tag.name}
        </div>
    )
};

export default TagChip;