import React from "react";
import AuthLoginButton from "../components/Auth-LoginButton";
import AdministrativeLinks from "../components/AdministrativeLinks";
import Trendstream from "../components/TrendStream";
import Happening from "../components/Happening";
import { changeState } from "../store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import googleIcon from "../assets/google_icon.svg";
import { useLocation, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./auth/Login";

library.add(fas);
library.add(fab);
library.add(far);

const Explore = () => {

  const ifBlur = useSelector((state) => state.user.value.display);
  console.log(useLocation());

  const googleSignButton = (
    <div className="flex items-center justify-center">
      <img src={googleIcon} alt="" className="h-8 flex w-8" />
      Sign in with Google
    </div>
  );

  const appleSignButton = (
    <>
      <FontAwesomeIcon icon="fa-brands fa-apple" className="apple-in-login" />
      <span className="pl-1 text-black">Sign in with Apple</span>
    </>
  );
  let currentDate = new Date();
  const join_create_account = "Create account";
  console.log(useLocation());
  const dispatch = useDispatch();
  return (
    <>
      <section className="homepage-center h-screen relative overflow-hidden">
        <div className="homepage-header sticky py-3 w-full flex h-16 px-5 items-center justify-between">
          <div className="homepage-header-searchbar w-full">
            <input
              type="text"
              className="homepage-header-searchbox h-10 rounded-full outline-none pl-16"
              placeholder="Search Tweeter"
            />
            <label className="homepage-header-label absolute left-12 top-5 outline-none">
              <FontAwesomeIcon icon="fas fa-magnifying-glass" />
            </label>
          </div>
          <Link
            onClick={() => dispatch(changeState({ display: "block" }))}
            to="/Home/Explore/Login"
            className="homepage-header-settings-icon text-base p-2 flex justify-center items-center rounded-full cursor-pointer"
          >
            <SettingsTwoToneIcon fontSize="small" />
          </Link>
        </div>
        <div className="homepage-center-info h-full overflow-y-scroll ">
          <p className="homepage-center-info-trends text-xl font-extrabold pb-3 px-3">
            Trends for you
          </p>
          <Trendstream />
          <div className="homepage-center-showmoreinfo pl-3 h-14 flex items-center cursor-pointer">
            Show more
          </div>
          <div className="homepage-center-whats-happening pt-3">
            <p className="homepage-center-whats-happening-head px-3 font-extrabold">
              What's happening
            </p>
            <Happening />
            <div className="mb-40 pl-3 h-14 flex items-center cursor-pointer homepage-center-whats-happening-showmore">
              Show more
            </div>
          </div>
        </div>
      </section>
      <section className="homepage-right h-screen">
        <div className="homepage-right-box mt-3 lg:mt-3 lg:m-auto px-5 py-3 ml-5 rounded-2xl flex flex-col items-center justify-center">
          <p className="homepage-right-new-twitter font-black text-xl pb-2">
            New to Tweeter?
          </p>
          <p className="homepage-right-sign-now">
            Sign up now to get your own personalized timeline!
          </p>
          <AuthLoginButton
            logo={googleSignButton}
            classes={
              "rounded-full google-butt-login text-black mt-5 mb-3 next-signup-button next-signup-button-home-variant"
            }
          />
          <AuthLoginButton
            logo={appleSignButton}
            classes={
              "rounded-full font-semibold flex items-center justify-center apple-butt-login apple-butt-login-home-variant"
            }
          />
          <AuthLoginButton
            logo={join_create_account}
            classes={
              "rounded-full google-butt-login mt-3 font-semibold mb-5 create-acc-home"
            }
          />
          <p className="homepage-right-By-sign">
            By signing up, you agree to the{" "}
            <Link className="signup-link">Terms of Service</Link> and{" "}
            <Link className="signup-link">Privacy Policy</Link>, including{" "}
            <Link className="signup-link">Cookie Use.</Link>
          </p>
        </div>
        <AdministrativeLinks currentDate={currentDate} />
      </section>
      <div
          className="absolute inset-0 flex justify-center items-center text-white homepage-auth-overlay"
          style={{ display: ifBlur }}
        >
          <Outlet/>
        </div>
    </>
  );
};

export default Explore;
