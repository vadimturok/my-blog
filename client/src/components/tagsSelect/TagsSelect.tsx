import React, {FC, memo, useEffect, useState} from 'react';
import {Dialog} from "@mui/material";
import './tagsSelect.scss'
import TagsList from "./tagsList/TagsList";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchTags} from "../../store/reducers/tags/actionCreators";
import {ITag} from "../../types/tag-type";
import TagItem from "../tagItem/TagItem";

const TagsSelect: FC<{setTags: (tags: ITag[]) => any, tagsEdit?: ITag[]}> = memo(({setTags, tagsEdit}) => {
    const {tags} = useAppSelector(state => state.tags)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const [selectedTags, setSelectedTags] = useState<ITag[]>(tagsEdit ? tagsEdit : [])

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])

    const applyTags = (appliedTags: ITag[]) => {
        setSelectedTags(appliedTags)
        setTags(appliedTags)
        setOpen(false)
    }

    return (
        <div className={'tagsList'}>
            <button onClick={() => setOpen(true)}>+ Add tags</button>
            <Dialog className={'dialogTags'} onClose={() => setOpen(false)} open={open}>
                <TagsList selectedTags={selectedTags} applyTags={applyTags} tags={tags}/>
            </Dialog>
            {selectedTags.length > 0 && selectedTags.map((tag, i) => <TagItem key={tag.id} tagItem={{tag: tag, index: i}}/>)}
        </div>
    );
});

export default TagsSelect;