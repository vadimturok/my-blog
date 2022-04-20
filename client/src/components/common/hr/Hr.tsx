import React, {FC} from 'react';
import './hr.scss'

interface HrProps{
    dataContent: string;
}

const Hr: FC<HrProps> = ({dataContent}) => {
    return (
        <hr className="hr-text" data-content={dataContent}/>
    );
};

export default Hr;