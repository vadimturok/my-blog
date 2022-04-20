import React, {FC} from 'react';
import './button.scss'

interface ButtonProps{
    text: string;
    handleClick?: (e: React.MouseEvent) => any;
    progress?: any;
    outlined?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean
}

const Button: FC<ButtonProps> = ({text, handleClick, progress, outlined, type, disabled}) => {
    return (
        <button disabled={disabled} type={type} onClick={handleClick} className={outlined ? 'formButton outlined' : 'formButton'}>{text} {progress && progress}</button>
    );
};

export default Button;