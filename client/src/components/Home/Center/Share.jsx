import "./share.scss";
import { MdPermMedia, MdLabel, MdInsertEmoticon } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { TokenUserContext } from "../../App/App";
import { useContext, useState } from "react";

export default function Share() {
  const { userState } = useContext(TokenUserContext);
  const [user] = userState;

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="shareTop">
          <img src={user.user.avatar_url} alt="" className="shareProfileImg" />
          <input type="text" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <MdPermMedia className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <MdLabel className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>{" "}
            <div className="shareOption">
              <MdInsertEmoticon className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
            </div>
            <div className="shareOption">
              <AiFillHeart htmlcolor="red" className="shareIcon" />
              <span className="shareOptionText">Like</span>
            </div>
          </div>
          <button className="shareButton">button</button>
        </div>
      </div>
    </div>
  );
}
