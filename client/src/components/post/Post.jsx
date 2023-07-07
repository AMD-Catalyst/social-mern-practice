import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);
  const { user: cUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(cUser._id));
  }, [cUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get(`users?userId=${post.userId}`);
      setUser(result.data);
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put(`posts/${post._id}/like`, { userId: cUser._id });
    } catch (error) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const moreHandler = () => {
    console.log("test");
  };

  return (
    <div className="postContainer">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <Link to={`profile/${user.username}`} className="postUsername">
              <span>{user.username}</span>
            </Link>

            <span className="postDate">
              <TimeAgo date={post?.createdAt} />
            </span>
          </div>
          <div className="postTopRight">
            <MoreVert onClick={moreHandler} />

            <div className="postTopRightMore">
              <button>Delete</button>
            </div>
          </div>
        </div>
        <div className="postCenter">
          <div className="postText">{post?.desc}</div>
          <img src={post.img && PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img
              src={PF + "like.png"}
              alt=""
              onClick={likeHandler}
              className="likeIcon"
            /> */}
            <img
              src={PF + "/heart.png"}
              alt=""
              onClick={likeHandler}
              className="likeIcon"
            />
            <span className="postLikeCounter">{like} people like/s</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
