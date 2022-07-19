import React, {FC} from 'react';
import {ITag} from "../../types/tag-type";
import {useNavigate} from "react-router-dom";
import './tagChip.scss'



const TagChip: FC<{tag: ITag}> = ({tag}) => {
    const navigate = useNavigate()

    const handleClick = (e: React.MouseEvent<HTMLElement>, tagId: number) => {
        e.stopPropagation()
        navigate(`/t/${tagId}`)
    }

    return (
        <div
            key={tag.id}
            style={{border: `1px solid #${tag.color}`}}
            className={'postItemTag'}
            onClick={(e) => handleClick(e, tag.id)}
        >
            <span style={{color: `#${tag.color}`}}>#</span>
            {tag.name}
        </div>
    )
};

export default TagChip;