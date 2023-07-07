import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import { useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const result = username
          ? await axios.get(`posts/profile/${username}`)
          : await axios.get(`posts/timeline/${user._id}`);
        setPosts(
          result.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feedContainer">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {isLoading ? (
          <div
            style={{
              marginTop: "100px",
              textAlign: "center",
            }}
          >
            <ClipLoader color="purple" speedMultiplier={1} size={30} />
          </div>
        ) : (
          posts.map((p) => <Post key={p._id} post={p} />)
        )}
      </div>
    </div>
  );
};

export default Feed;
