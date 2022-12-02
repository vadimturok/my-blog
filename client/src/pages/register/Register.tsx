import React, {FC, useEffect} from 'react';
import './register.scss'
import FormGroup from "../../components/common/formGroup/FormGroup";
import Button from "../../components/common/button/Button";
import Hr from "../../components/common/hr/Hr";
import {Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector, useTitle} from "../../hooks";
import {useForm} from "react-hook-form";
import {authArgs, authorizeUser} from "../../store/reducers/auth/actionCreators";
import {setError} from "../../store/reducers/auth/authSlice";
import {fetchPosts} from "../../store/reducers/posts/actionCreators";

const Register: FC  = () => {
    const {isLoading, error, isAuth} = useAppSelector(state => state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useAppDispatch()
    useTitle('Register')

    useEffect(() => {
        dispatch(setError(''))
    }, [dispatch])

    const onSubmit = (data: any) => {
        const args: authArgs = {
            type: 'register',
            firstName: data['First Name'],
            lastName: data['Last Name'],
            email: data['Email'],
            password: data['Password']
        }
        dispatch(authorizeUser(args))
    }

    return (
        <div className={'login'}>
            {isAuth && <Navigate to={'/'} replace={true}/>}
            <h2 className={'loginTitle'}>Welcome to MyBlog</h2>
            <Hr dataContent={'Register'}/>
            {error && <div className={'registerError'}>
                {error}
            </div>}
            <div className={'loginForm'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup
                        fieldName={'First Name'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter first name...'}
                        isRequired={true}
                    />
                    <FormGroup
                        fieldName={'Last Name'}
                        register={register}
                        errors={errors}
                        placeholder={'Enter last name...'}
                        isRequired={true}
                    />
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
                    <Button type={'submit'} progress={isLoading ? <CircularProgress style={{color: 'white'}} size={20}/> : null}  text={'Continue'}/>
                </form>
            </div>
        </div>
    );
};

export default Register;