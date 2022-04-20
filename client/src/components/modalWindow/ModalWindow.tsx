import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import {FC} from "react";
import './modalWindow.scss'
import Button from "../common/button/Button";
import {useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import {Fade} from "@mui/material";


interface ModalWindowProps{
    showModal: boolean;
    setShowModal: (isOpen: boolean) => any;
}

const ModalWindow: FC<ModalWindowProps> = ({showModal, setShowModal}) => {
    const navigate = useNavigate()
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{timeout: 500,}}
            >
                <Fade style={{outline: 'none'}} in={showModal}>
                    <div className={'modalWindow'}>
                        <div className={'modalWindowTitle'}>
                            <h3>Log in to continue</h3>
                            <span onClick={() => setShowModal(false)}><CloseIcon/></span>
                        </div>
                        <div className={'modalButton'}>
                            <Button
                                text={'Log in'}
                                handleClick={() => navigate('/login')}
                            />
                            <Button
                                outlined={true}
                                text={'Create account'}
                                handleClick={() => navigate('/register')}
                            />
                        </div>
                    </div>
                </Fade>
        </Modal>
    );
}
export default ModalWindow