import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const result = await axios.get(`/users?username=${username}`);
        setUser(result.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />

        <div className="profileRight">
          {isLoading ? (
            <div
              style={{
                marginTop: "100px",
                textAlign: "center",
              }}
            >
              <PulseLoader color="purple" size={15} />
            </div>
          ) : (
            <>
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    src={
                      user.coverImg ? PF + user.coverImg : PF + "noCover.png"
                    }
                    alt=""
                    className="profileCoverImg"
                  />
                  <img
                    src={
                      user.profilePicture
                        ? PF + user.profilePicture
                        : PF + "noAvatar.png"
                    }
                    alt=""
                    className="profileUserImg"
                  />
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed username={username} />
                <Rightbar user={user} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
