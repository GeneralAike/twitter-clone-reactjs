import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Loader from "../pages/auth/components/Loader";

library.add(fas);
library.add(fab);
library.add(far);

const NotificationStream = ({ streamData }) => {
  if (!streamData || streamData.length === 0) {
    return <Loader/>; 
  }

  const reversedStreamData = [...streamData].reverse();
  return reversedStreamData.map((notification) => {
    return (
      <>
        <div className="notificationcard flex items-center py-3 px-6 gap-4 cursor-pointer">
          <div>
            {notification.message === "Followed you" && (
              <div className="text-2xl text-blue-500">
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
            )}
            {notification.message === "Commented on your post" && (
              <div className="text-2xl text-blue-500">
                <FontAwesomeIcon icon="fa-solid fa-comments" />
              </div>
            )}
            {notification.message ===
              "There was a Login to Your Account Recently" && (
              <div className="text-3xl">
                <FontAwesomeIcon icon="fab fa-twitter" />
              </div>
            )}
            {notification.message === "Liked your post" && (
              <div className="text-2xl text-pink-600">
                <FontAwesomeIcon icon="fa-solid fa-heart" />
              </div>
            )}
            {notification.message === "Retweeted your post" && (
              <div className="text-2xl" style={{ color: "rgb(1, 161, 108)" }}>
                <FontAwesomeIcon icon="fa-solid fa-retweet" />
              </div>
            )}
          </div>
          <div>
            {notification.profilePicture && (
              <img
                src={notification.profilePicture}
                alt="user profile image"
                className="rounded-full h-8 min-w-8 w-8 mb-2 max-w-14 mr-5 cursor-pointer"
              />
            )}
            <p>
              {notification.displayName} <span>{notification.message}</span>
            </p>
          </div>
        </div>
      </>
    );
  });
};

export default NotificationStream;
