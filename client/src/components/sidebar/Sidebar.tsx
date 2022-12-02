import React, { FC, useState } from "react";
import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import InfoIcon from "@mui/icons-material/Info";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalWindow from "../modalWindow/ModalWindow";
import {fetchPosts} from "../../store/reducers/posts/actionCreators";
import {useAppSelector} from "../../hooks";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Sidebar: FC<{homePage: boolean}> = ({homePage}) => {
  const { isAuth } = useAppSelector(state => state.auth)
  const {postsType} = useAppSelector(state => state.posts)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClick = (path: string) => {
    if (isAuth) {
      return navigate(`/${path}`);
    } else {
      setShowModal(true);
    }
  };
  const handleSelectPosts = (type: 'latest' | 'hot' | 'best') => {
      dispatch(fetchPosts({type: type}))
  }

  return (
    <div className={"sidebar"}>
      <ModalWindow setShowModal={setShowModal} showModal={showModal} />
      {homePage && <div className={"menu"}>
        <h4>Order by</h4>
        <ul>
          <li className={postsType === 'latest' ? 'sidebarItem' : ''} onClick={() => handleSelectPosts('latest')}>
            <AccessTimeIcon className={"sidebarIcon"} />
            <span>Latest</span>
          </li>
          <li className={postsType === 'hot' ? 'sidebarItem' : ''} onClick={() => handleSelectPosts('hot')}>
            <LocalFireDepartmentIcon className={"sidebarIcon"} />
            <span>Hot</span>
          </li>
          <li className={postsType === 'best' ? 'sidebarItem' : ''} onClick={() => handleSelectPosts('best')}>
            <StarIcon className={"sidebarIcon"} />
            <span>Best</span>
          </li>
        </ul>
      </div>}
      <div className={"menu bottom"}>
        <h4>Navigation</h4>
        <ul>
          <Link to={"/"} className={"link"}>
            <li>
              <HomeIcon className={"sidebarIcon"} />
              <span>Home</span>
            </li>
          </Link>
          <li onClick={() => handleClick("profile")}>
            <PersonIcon className={"sidebarIcon"} />
            <span>Profile</span>
          </li>
          <Link to={'/tags'} className={"link"}>
            <li>
              <LocalOfferIcon className={"sidebarIcon"} />
              <span>Tags</span>
            </li>
          </Link>
          <li onClick={() => handleClick("create")}>
            <CreateIcon className={"sidebarIcon"} />
            <span>Make Post</span>
          </li>
          <Link to={"about"} className={"link"}>
            <li>
              <InfoIcon className={"sidebarIcon"} />
              <span>About</span>
            </li>
          </Link>
          <Link to={"contact"} className={"link"}>
            <li>
              <MailIcon className={"sidebarIcon"} />
              <span>Contact</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
