import React, { useEffect, useState } from "react";
import Loader from "../auth/components/Loader";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextComponent from "../../components/TextComponent";
import { FaRegCommentDots, FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { realTimeDatabase } from "../../config/firebase";

const TopSearch = ({ searchTweets }) => {
  const [isLoading, setisLoading] = useState(true);
  const [notweetfound, setnotweetfound] = useState(false);
  


  
  
  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      const tweetholder = [];
      searchTweets.length > 0 && searchTweets[0] !== null
        ? searchTweets.forEach((tweets) =>
            tweetholder.indexOf(tweets.tweetId) === -1
              ? tweetholder.push(tweets.tweetId)
              : searchTweets.splice(searchTweets.indexOf(tweets), 1)
          )
        : searchTweets;
      if (searchTweets[0] === null && searchTweets.length === 1) {
        setnotweetfound(true);
        setisLoading(false);
        console.log("not clear");
      } else {
        setnotweetfound(false);
        setisLoading(false);
        console.log("clear boy");
      }
      console.log(searchTweets);
    }, 0);
  }, [searchTweets]);

  return (
    <>
      {!isLoading &&
        !notweetfound &&
        searchTweets[0] !== null &&
        searchTweets.reverse().map((tweetsItems) => {
          return (
            <React.Fragment key={tweetsItems.tweetId}>
              {
                <Link
                  to={
                    "/Home/" + tweetsItems.username + "/" + tweetsItems.tweetId
                  }
                  className="main-tweet-card pt-3 w-full relative cursor-pointer flex"
                >
                  {tweetsItems.RetweetedBy ? (
                    <div className="absolute flex gap-2 left-6 justify-center items-center top-0 text-sm retweetedText">
                      <div>
                        <FaRetweet />{" "}
                      </div>
                      <div>{tweetsItems.RetweetedBy} Retweeted</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div
                    className={
                      tweetsItems.RetweetedBy
                        ? "mt-3 ml-4 main-tweet-card-first-half"
                        : "ml-2 main-tweet-card-first-half"
                    }
                  >
                    <img
                      src={tweetsItems.profilePic}
                      alt="user profile image"
                      className="rounded-full h-10 w-10 mr-5 cursor-pointer main-card-profile-pic"
                    />
                  </div>

                  <div className="w-full main-tweet-card-second-half">
                    <div className="flex justify-between w-full pr-2 mt-1">
                      <div className="flex items-center">
                        <p className="main-tweet-card-display-name flex items-center gap-1 font-semibold mr-2 whitespace-nowrap flex-nowrap ">
                          <span>{tweetsItems.displayName}</span>
                          {tweetsItems.badgedUser && (
                            <span className="bluetext">
                              <BsFillPatchCheckFill />
                            </span>
                          )}
                        </p>
                        <p className="text-sm main-tweet-card-username whitespace-nowrap">
                          {tweetsItems.username} . {tweetsItems.tweetDate}
                        </p>
                      </div>
                      <div className="">
                        <div className="homepage-center-current-trend-more font-bold rounded-full cursor-pointer">
                          <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                        </div>
                      </div>
                    </div>
                    <div className="main-tweet-card-content overflow-x-hidden">
                      <TextComponent text={tweetsItems.tweetText} />
                      {tweetsItems.tweetImageLink.length > 0 && (
                        <img
                          src={tweetsItems.tweetImageLink}
                          alt=""
                          className="main-tweet-image"
                        />
                      )}
                      <div className="main-tweet-card-user-actions flex w-full pt-2 gap-6 overflow-x-scroll">
                        <button
                          className="flex gap-3 items-center main-tweet-comment-icon"
                          aria-label="Comments"
                        >
                          <div className="p p-1.5 rounded-full main-comment-icon-surround">
                            <FaRegCommentDots />
                          </div>
                          <span>
                            {Object.keys(tweetsItems.comments).length - 1}
                          </span>
                        </button>
                        <button
                          className="flex gap-3 items-center main-tweet-retweet-icon"
                          aria-label="Retweets"
                        >
                          <div className="p p-1.5 rounded-full main-retweet-icon-surround">
                            <FaRetweet />
                          </div>
                          <span>{tweetsItems.retweets.length - 1}</span>
                        </button>
                        <button
                          className="flex gap-3 items-center main-tweet-like-icon"
                          aria-label="Likes"
                        >
                          <div className="p p-1.5 rounded-full main-like-icon-surround">
                            <AiOutlineHeart />
                          </div>
                          <span>{tweetsItems.likes.length - 1}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              }
            </React.Fragment>
          );
        })}
      {searchTweets[0] === null && <div>No tweet found</div>}
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
    </>
  );
};

export default TopSearch;
