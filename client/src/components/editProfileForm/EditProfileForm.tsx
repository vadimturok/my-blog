import React, {FC, useEffect, useState} from 'react';
import './editProfileForm.scss'
import Button from "../common/button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks";
import UserService from "../../services/user-service";
import {setUser} from "../../store/reducers/auth/authSlice";

interface EditProfileFormProps{
    file: File | null;
    setFile: any;
}

const EditProfileForm: FC<EditProfileFormProps> = ({file, setFile}) => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
    const [userInfo, setUserInfo] = useState({firstName: '', lastName: '', email: ''})
    const [message, setMessage] = useState('')

    useEffect(() => {
        setFile(null)
        if(Object.keys(user).length > 0){
            setUserInfo({...user})
        }
    }, [user, setFile])

    const onSubmit = (e: any) => {
        e.preventDefault()
        setMessage('')
        if(user.firstName === userInfo.firstName &&
            user.lastName === userInfo.lastName &&
            user.email === userInfo.email && !file
        ){
            setMessage('Please edit fields!')
        }else{
            UserService.updateUser(user.id, userInfo.firstName, userInfo.lastName, userInfo.email ,file)
                .then(response => {
                    dispatch(setUser(response.data))
                    setMessage('Changes saved!')
                })
                .catch(error => setMessage(error.message))
        }
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }
    return (
        <form className={'editProfileForm'}>
            <label className="field field_v2">
                <input
                    name={'firstName'}
                    value={userInfo.firstName}
                    onChange={onChange}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">First name</span>
                </span>
            </label>
            <label className="field field_v2">
                <input
                    name={'lastName'}
                    value={userInfo.lastName}
                    onChange={onChange}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">Last name</span>
                </span>
            </label>
            <label className="field field_v2">
                <input
                    name={'email'}
                    value={userInfo.email}
                    onChange={onChange}
                    className="field__input"
                />
                <span className="field__label-wrap">
                    <span className="field__label">Email</span>
                </span>
            </label>
            <div className={'submitProfileChanges'}>
                <div className={'profileSaveBtn'}>
                    <Button handleClick={onSubmit} type={'submit'}  text={'Save'}/>
                </div>
                {message &&
                    <span className={message === 'Changes saved!' ? 'submitSuccess' : 'submitError'}>
                        {message}
                    </span>
                }
            </div>
        </form>
    );
};

export default EditProfileForm;