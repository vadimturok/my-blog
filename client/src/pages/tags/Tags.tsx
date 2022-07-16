import React, {useEffect} from 'react';
import './tags.scss'
import {useAppDispatch, useAppSelector} from "../../hooks";
import TagBlock from "../../components/tagBlock/TagBlock";
import {fetchTags} from "../../store/reducers/tags/actionCreators";

const Tags = () => {
    const dispatch = useAppDispatch()
    const {tags} = useAppSelector(state => state.tags)
    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])
    return (
        <div className={'tagsWrapper'}>
            <h1>Tags</h1>
            <div className={'tagsPageList'}>
                {tags.length > 0 && tags.map(tag => <TagBlock key={tag.id} tag={tag}/>)}
            </div>
        </div>
    );
};

export default Tags;