import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { Follow, Unfollow } from "../../context/AuthAction";
import SyncLoader from "react-spinners/SyncLoader";

const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={PF + "/gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Ronnel Dave Espino Ticlao</b> and <b>5 other friends</b> have a
            birthday today.
          </span>
        </div>
        <img src={PF + "/ad.png"} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const { user: cUser, dispatch } = useContext(AuthContext);
    const [followings, setFollowings] = useState([]);
    const [followed, setFollowed] = useState(
      cUser.followings.includes(user?._id)
    );

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const getFollowings = async () => {
        setIsLoading(true);
        try {
          const followingList = await axios.get(
            `/users/followings/${user._id}`
          );
          setFollowings(followingList.data);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      };

      getFollowings();
    }, []);

    const handleFollow = async () => {
      try {
        if (!followed) {
          await axios.put(`/users/${user._id}/follow`, { userId: cUser._id });
          dispatch(Follow(user._id));
        } else {
          await axios.put(`/users/${user._id}/unfollow`, { userId: cUser._id });
          dispatch(Unfollow(user._id));
        }
        setFollowed(!followed);
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <>
        {user.username !== cUser.username && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? (
              <>
                Unfollow <Remove />{" "}
              </>
            ) : (
              <>
                Follow <Add />
              </>
            )}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Following</h4>
        <div className="rightbarFollowings">
          {isLoading ? (
            <SyncLoader color="purple" size={10} />
          ) : (
            followings.map((following) => (
              <Link
                key={following._id}
                to={`/profile/${following.username}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      following.profilePicture
                        ? PF + following.profilePicture
                        : PF + "noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {following.username}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </>
    );
  };
  return (
    <div className="rightbarContainer">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
