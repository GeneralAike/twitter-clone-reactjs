import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { blurChangeState } from "../../store";
import { useDispatch } from "react-redux";
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";
import { colRef } from "../../config/firebase";
import { getDocs } from "firebase/firestore";
import Loader from "./components/Loader";
import { auth } from "../../config/firebase";

library.add(fas);
library.add(fab);
library.add(far);


const Login = () => {
  const [usersEmail, setUsersEmail] = useState([]);
  const [emailError, setEmailError] = useState({ display: "none" });
  
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let usersMail = [];
        snapshot.docs.forEach((doc) => {
          usersMail.push({ ...doc.data(), id: doc.id });
        });
        setUsersEmail(usersMail);
        console.log("first");
        setauthPage(true);
        console.log("logged in", auth.currentUser);
      })
      .catch((err) => {
        console.log(err.message);
        setauthPage(true);
      });
  }, []);

  useEffect(() => {
    console.log(usersEmail);
    console.log("logged in", auth.currentUser);
  }, [usersEmail]);

  const [userAuth, setUserAuth] = useState({
    email: "",
    password: "",
  });
  const [renderEmail, setrenderEmail] = useState(true);
  const [renderPassword, setrenderPassword] = useState(false);
  const [renderLoader, setrenderLoader] = useState(false);
  const [authPage, setauthPage] = useState(false);
  return (
    <>
      <form
        action=""
        className="auth-form bg-black md:mx-auto md:w-authxlw md:h-authxlh p-2 md:rounded-2xl relative h-screen w-full"
      >
        {authPage && (
          <>
            {" "}
            <div className="top-of-auth flex">
              {renderEmail && (
                <Link
                  onClick={() => {
                    dispatch(blurChangeState({ display: "none" }));
                  }}
                  to="/Home/Explore"
                  className="ex flex justify-center items-center cursor-pointer rounded-full"
                >
                  <FontAwesomeIcon icon="fas fa-xmark " />
                </Link>
              )}

              {renderPassword && (
                <Link
                  onClick={() => {
                    setrenderEmail(true);
                    setrenderPassword(false);
                  }}
                  className="ex flex justify-center items-center cursor-pointer rounded-full"
                >
                  <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </Link>
              )}

              <div className="bird absolute right-1/2 text-3xl">
                <FontAwesomeIcon icon="fab fa-twitter" />
              </div>
            </div>
            {renderEmail && (
              <LoginEmail
                setrenderEmail={setrenderEmail}
                setrenderPassword={setrenderPassword}
                userAuth={userAuth}
                setUserAuth={setUserAuth}
                usersEmail={usersEmail}
                setrenderLoader={setrenderLoader}
                renderLoader={renderLoader}
                emailError={emailError}
                setEmailError={setEmailError}
                
              />
            )}
            {renderPassword && (
              <LoginPassword userAuth={userAuth} setUserAuth={setUserAuth} />
            )}
            {renderLoader && <Loader />}
          </>
        )}
        <div>{!authPage && <Loader />}</div>
      </form>
    </>
  );
};

export default Login;
