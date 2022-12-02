import React, {FC} from 'react';
import './tagItem.scss'
import {ITag} from "../../types/tag-type";
import {hex2rgb} from "../../helpers";

interface TagItemProps{
    tagItem: {
        tag: ITag,
        selected?: boolean,
        index: number
    },
    onSelectTag?: (index: number) => void
}

const TagItem: FC<TagItemProps> = ({tagItem, onSelectTag}) => {
    return (
        <span
            onClick={() => onSelectTag ? onSelectTag(tagItem.index): null}
            className={'tagItem'}
            style={{
                cursor: onSelectTag ? 'pointer' : 'default',
                background: `rgba(${hex2rgb('#'.concat(tagItem.tag.color))}, 0.3)`,
                border: tagItem?.selected ? `1px solid` : `1px solid #${tagItem.tag.color}`
            }}
        >
            #{tagItem.tag.name}
        </span>
    );
};

export default TagItem;