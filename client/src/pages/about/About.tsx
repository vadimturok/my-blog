import React, {FC} from 'react';
import './about.scss'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useTitle} from "../../hooks";

const About: FC = () => {
    useTitle('About')
    return (
        <div className={'aboutWrapper'}>
            <div className={'about'}>
                <h1>About</h1>
                <div className={'aboutInfo'}>
                    <p>Hello, I'm Vadim 👋. I'm junior front-end developer 👨‍💻 from Ukraine.</p>
                    <p>This is my full-stack blog application built in React⚛️ and NestJS🦄.</p>
                    <div className={'aboutFeatures'}>
                        <div className={'aboutFeaturesLeft'}>
                            <h4>App features:</h4>
                            <ul className={'dashed'}>
                                <li>Authentication/Authorization system</li>
                                <li>Creating posts</li>
                                <li>Editing user info</li>
                                <li>View list of posts</li>
                                <li>View single post</li>
                                <li>View latest posts</li>
                                <li>Ordering posts</li>
                                <li>Creating comments</li>
                                <li>Validation of fields</li>
                                <li>Likes system</li>
                                <li>Mobile responsive</li>
                            </ul>
                        </div>
                    </div>
                    <h4 className={'aboutStack'}>Stack of technologies used for building this app:</h4>
                    <p>React, NestJS, Redux, PostgreSQL, SCSS, TypeScript, Axios, Postman, JWT</p>
                    <h3>Contact with me</h3>
                    <div className={'aboutSocials'}>
                        <div className={'aboutSocialsItem'}>
                            <MailOutlineIcon className={'socialIcon'}/>
                            <span className={'socialItemSpan'}>turokvadim2510@gmail.com</span>
                        </div>
                        <div className={'aboutSocialsItem'}>
                            <GitHubIcon className={'socialIcon'}/>
                            <span><a target="_blank" rel="noreferrer" className={'socialItemLink'} href={'https://github.com/vadimturok'}>@vadimturok</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;