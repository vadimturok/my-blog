import React, {FC, memo, useEffect, useState} from "react";
import "./latest.scss";
import {useAppDispatch, useAppSelector, useAuth} from "../../hooks";
import { formatTime } from "../../helpers";
import {Link, useNavigate} from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "../common/button/Button";
import ModalWindow from "../modalWindow/ModalWindow";
import {IPost} from "../../types/post-type";
import {fetchTags} from "../../store/reducers/tags/actionCreators";
import TagChip from "../tagChip/tagChip";

const LatestList: FC<{todayPosts: IPost[]}> = memo(({todayPosts}) => {
    const {role} = useAuth()
  const {isAuth} = useAppSelector((state) => state.auth)
    const {tags} = useAppSelector(state => state.tags)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const handleCreate = (path: string) => {
        if(!isAuth){
            setShowModal(true)
        }else{
            navigate(path)
        }
    }

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])
  return (
      <div className={'latestWrapper'}>
          <ModalWindow
              showModal={showModal}
              setShowModal={setShowModal}
          />
          <div className={'createItemButtons'}>
              <div className={'createNewPostBtn'}>
                  <Button
                      text={'Create post'}
                      type={'button'}
                      handleClick={() => handleCreate('/create')}
                  />
              </div>
              {role === 'admin' && <div className={'createNewPostBtn'}>
                  <Button
                      text={'Create tag'}
                      type={'button'}
                      handleClick={() => handleCreate('/create-tag')}
                  />
              </div>}
          </div>
          <div className={"latestList"}>
              <div className={"latestTitle"}>
                  <h3>Latest</h3>
              </div>
              <div className={"latestItems"}>
                  <ul>
                      {todayPosts.length > 0 &&
                          todayPosts.map((post) => (
                              <li key={post.id}>
                                  <span>{formatTime(post.dateAndTimePublish)}</span>
                                  <Link to={`/posts/${post.id}`} className={"latestLink"}>
                                      <h5>{post.title}</h5>
                                  </Link>
                                  <div className="latestPostReactions">
                                      <div className="latestPostReactionItem">
                                          <FavoriteBorderIcon className="latestPostReactionIconLike" />
                                          <span>{post.userLikes.length}</span>
                                      </div>
                                  </div>
                              </li>
                          ))}
                  </ul>
              </div>
          </div>
          <div className={'tagsRecommendations'}>
              <h3>Popular tags today</h3>
              <div className={'postTags'}>
                  {tags?.length > 0 && tags.map(tag => <TagChip key={tag.id} tag={tag}/>)}
              </div>
          </div>
          <div className={'updatesInfo'}>
              <h3>What's new?</h3>
              <p>Tags now available to choose while creating/editing posts.</p>
              <p>Administrators are able to create new tags.</p>
              <p>View posts by selected tag.</p>
              <p>View all tags.</p>
          </div>
      </div>
  );
});

export default LatestList
