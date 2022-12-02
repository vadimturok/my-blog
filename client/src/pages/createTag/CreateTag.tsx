import React, {useState} from 'react';
import './createTag.scss'
import FormGroup from "../../components/common/formGroup/FormGroup";
import Button from "../../components/common/button/Button";
import {useForm} from "react-hook-form";
import TagService from "../../services/tag-service";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";

const CreateTag = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try{
            await TagService.createTag(data.Name, data.Description, data.Color)
            navigate('/tags')
        }catch(e: any){
            setError(e.response.data.message)
        }finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={'createTagWrapper'}>
            <h2>Create new tag</h2>
            <form className={'createTagForm'} onSubmit={handleSubmit(onSubmit)}>
                {error && <div>{error}</div>}
                <FormGroup
                    fieldName={'Name'}
                    register={register}
                    errors={errors}
                    placeholder={'Enter name...'}
                    isRequired={true}
                />
                <FormGroup
                    fieldName={'Description'}
                    register={register}
                    errors={errors}
                    placeholder={'Enter description...'}
                    isRequired={true}
                />
                <FormGroup
                    fieldName={'Color'}
                    register={register}
                    errors={errors}
                    placeholder={'Enter color in HEX format...'}
                    isRequired={true}
                />
                <Button
                    progress={isLoading ?
                        <CircularProgress style={{color: 'white'}} size={20}/> : null}
                    type={'submit'}
                    text={'Submit'}
                />
            </form>
        </div>
    );
};

export default CreateTag;