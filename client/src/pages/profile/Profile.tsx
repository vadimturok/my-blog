import React, {FC, useState} from 'react';
import './profile.scss'
import FileUpload from "../../components/fileUpload/FileUpload";
import UserPostList from "../../components/userPostList/UserPostList";
import {useAppSelector} from "../../hooks";
import EditProfileForm from "../../components/editProfileForm/EditProfileForm";

const Profile: FC = () => {
    const {user} = useAppSelector(state => state.auth)
    const [file, setFile] = useState<any>(null)

    return (
        <div className={'profileWrapper'}>
            <div className={'profile'}>
                <h1>Welcome, {user.firstName}</h1>
                <div className={'profileInfo'}>
                    <div className={'profileLeft'}>
                        <div className={'profileImage'}>
                            <img
                                src={file ? URL.createObjectURL(file) : user.profilePicture}
                                alt="profileAvatar"/>
                        </div>
                        <div className={'profileImageUpload'}>
                            <FileUpload
                                displayImage={false}
                                handleFile={(file: File | undefined) => setFile(file)}/>
                        </div>
                    </div>
                    <div className={'profileRight'}>
                        <h3>Information</h3>
                        <div className={'profileCredentials'}>
                            <EditProfileForm setFile={setFile} file={file}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'userPosts'}>
                <h3>Your posts</h3>
                {Object.keys(user).length > 0 && <UserPostList user={user}/>}
            </div>
        </div>
    );
};

export default Profile;