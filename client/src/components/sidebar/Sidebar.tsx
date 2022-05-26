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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalWindow from "../modalWindow/ModalWindow";
import { setSort } from "../../store/reducers/post/action-creators";
import { PostSortActions } from "../../store/reducers/post/types";

const Sidebar: FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { sortType } = useSelector((state: RootState) => state.posts);
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

  return (
    <div className={"sidebar"}>
      <ModalWindow setShowModal={setShowModal} showModal={showModal} />
      <div className={"menu"}>
        <h4>Order by</h4>
        <ul>
          <li
            className={
              sortType === PostSortActions.SORT_BY_TIME ? "sidebarItem" : ""
            }
            onClick={() => dispatch(setSort(PostSortActions.SORT_BY_TIME))}
          >
            <AccessTimeIcon className={"sidebarIcon"} />
            <span>Latest</span>
          </li>
          <li
            className={
              sortType === PostSortActions.SORT_BY_COMMENTS ? "sidebarItem" : ""
            }
            onClick={() => dispatch(setSort(PostSortActions.SORT_BY_COMMENTS))}
          >
            <LocalFireDepartmentIcon className={"sidebarIcon"} />
            <span>Hot</span>
          </li>
          <li
            className={
              sortType === PostSortActions.SORT_BY_LIKES ? "sidebarItem" : ""
            }
            onClick={() => dispatch(setSort(PostSortActions.SORT_BY_LIKES))}
          >
            <StarIcon className={"sidebarIcon"} />
            <span>Best</span>
          </li>
        </ul>
      </div>
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
          <Link to={"videos"} className={"link"}>
            <li>
              <VideoLibraryIcon className={"sidebarIcon"} />
              <span>Videos</span>
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
