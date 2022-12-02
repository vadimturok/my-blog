import React, {FC, useState} from 'react';
import './tagsList.scss'
import {ITag} from "../../../types/tag-type";
import Button from "../../common/button/Button";
import TagItem from "../../tagItem/TagItem";

interface TagsListProps{
    tags: ITag[];
    applyTags: (tags: ITag[]) => void;
    selectedTags: ITag[]
}

const TagsList: FC<TagsListProps> = ({tags, applyTags, selectedTags}) => {
    const [tagItems, setTagItems] = useState(tags.map(tag => ({...tag, selected: selectedTags.some(t => t.id === tag.id)})))

    const selectTag = (index: number) => {
        const tags = [...tagItems]
        tags[index].selected = !tags[index].selected
        setTagItems(tags)
    }

    return (
        <div className={'tagsItems'}>
            <h2>Select tags</h2>
            <div className={'tagsName'}>
                {tagItems.map((tag, index) =>
                    <TagItem
                        key={tag.id}
                        tagItem={{tag: tag, selected: tag.selected, index: index}}
                        onSelectTag={selectTag}
                    />)}
            </div>
            <h3>Selected:</h3>
            <div className={'tagsName'}>
                {tagItems.map((tag, index) => tag.selected && <TagItem
                    key={tag.id}
                    tagItem={{tag: tag, selected: tag.selected, index: index}}
                    onSelectTag={selectTag}
                />)}
            </div>
            <div className={'buttonApply'}>
                <Button
                    handleClick={() => applyTags(tagItems.filter(tag => tag.selected).map(({selected, ...rest}) => rest))}
                    text={'Apply'}
                />
            </div>
        </div>
    );
};

export default TagsList;