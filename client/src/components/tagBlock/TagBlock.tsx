import React, {FC} from 'react';
import './tagBlock.scss'
import {ITag} from "../../types/tag-type";
import Button from "../common/button/Button";
import {useNavigate} from "react-router-dom";

const TagBlock: FC<{tag: ITag}> = ({tag}) => {
    const navigate = useNavigate()
    return (
        <div className={'tagBlock'}>
            <div style={{backgroundColor: `#${tag.color}`}} className={'tagBlockTop'}>#{tag.name}</div>
            <div className={'tagBlockInfo'}>
                <div className={'tagBlockDescription'}>{tag.description}</div>
                <div className={'tagBlockBottom'}>
                    <Button handleClick={() => navigate(`/t/${tag.id}`)} text={'Posts...'}/>
                </div>
            </div>
        </div>
    );
};

export default TagBlock;