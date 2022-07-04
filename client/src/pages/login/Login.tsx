import React, {FC, useEffect} from 'react';
import './login.scss'
import Button from "../../components/common/button/Button";
import FormGroup from "../../components/common/formGroup/FormGroup";
import Hr from "../../components/common/hr/Hr";
import {CircularProgress} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector, useTitle} from "../../hooks";
import {useForm} from "react-hook-form";
import {authArgs, authorizeUser} from "../../store/reducers/auth/actionCreators";
import {setError} from "../../store/reducers/auth/authSlice";


const Login: FC = () => {
    const {isLoading, error, isAuth} = useAppSelector(state => state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useAppDispatch()
    useTitle('Log in')


    useEffect(() => {
        dispatch(setError(''))
    }, [dispatch])

    const onSubmit = (data: any) => {
        const args: authArgs = {
            type: 'login',
            email: data.Email,
            password: data.Password
        }
        dispatch(authorizeUser(args))
    }

    if(isAuth){
        return <Navigate to={'/'}/>
    }

    return (
        <div className={'login'}>
            <h2 className={'loginTitle'}>Welcome to MyBlog</h2>
            <Hr dataContent={'Login'}/>
            {error && <div className={'registerError'}>
                {error}
            </div>}
            <div className={'loginForm'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup
                        fieldName={'Email'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter email...'}
                        isRequired={true}
                    />
                    <FormGroup
                        fieldName={'Password'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter password...'}
                        isRequired={true}
                        type={'password'}
                    />
                    <Button
                        type={'submit'}
                        progress={isLoading ?
                            <CircularProgress style={{color: 'white'}} size={20}/> : null}
                        text={'Continue'}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;