import React from 'react';
import Button from "../common/button/Button";
import './fallback.scss'

const FallbackComponent = (props: any) => {
    const {error, resetErrorBoundary} = props
    return (
        <div className={'fallback'}>
            <div className={'fallbackMessage'}>
                <p>Something went wrong</p>
                <p>{error.message}</p>
            </div>
            <div className={'fallbackButton'}>
                <Button handleClick={resetErrorBoundary} text={'To Home'}/>
            </div>

        </div>
    );
};

export default FallbackComponent;