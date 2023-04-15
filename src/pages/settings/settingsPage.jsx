import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  exploreChangeState,
  settingsChangeState,
  personalizationblurChangeState,
  checkboxsettingsChangeState
} from "../../store";
import { createContext } from "react";

library.add(fas);
library.add(fab);
library.add(far);

export const SettingsContext = createContext(null);

const SettingsPage = () => {
  const navigate = useNavigate();
  const [navStyleOnPop, setnavStyleOnPop] = useState(0);
  const dispatch = useDispatch();

  const [rbStyle, setrbStyle] = useState({});
  const [rbStyle1, setrbStyle1] = useState({});
  const [rbStyle2, setrbStyle2] = useState({});

  const ifBlur = useSelector((state) => state.peras.value);
  
  window.onpopstate = () => {
    const currentUrl = window.location.pathname;
    if (currentUrl === "/Home/Explore/" || currentUrl === "/Home/Explore") {
      dispatch(settingsChangeState({ fontWeight: 100 }));
      dispatch(exploreChangeState({ fontWeight: "Bold" }));
    }
    setnavStyleOnPop(navStyleOnPop + 1);
    console.log(window.location.pathname);
  };

  useEffect(() => {
    if (
      window.location.pathname === "/Home/Settings" ||
      window.location.pathname === "/Home/Settings/" ||
      window.location.pathname === "/Home/Settings/personalization" ||
      window.location.pathname === "/Home/Settings/personalization/"
    ) {
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
      dispatch(exploreChangeState({ fontWeight: 100 }));
      setrbStyle({
        borderRight: "2px solid rgb(29, 155, 240)",
        backgroundColor: "rgb(22,24,28)",
      });
      setrbStyle1({});
      setrbStyle2({});
      dispatch(exploreChangeState({ fontWeight: 100 }));
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
    } else if (
      window.location.pathname === "/Home/Settings/your_twitter_data" ||
      window.location.pathname === "/Home/Settings/your_twitter_data/"
    ) {
      setrbStyle1({
        borderRight: "2px solid rgb(29, 155, 240)",
        backgroundColor: "rgb(22,24,28)",
      });
      setrbStyle({});
      setrbStyle2({});
      dispatch(exploreChangeState({ fontWeight: 100 }));
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
    } else if (
      window.location.pathname === "/Home/Settings/about" ||
      window.location.pathname === "/Home/Settings/about/"
    ) {
      setrbStyle2({
        borderRight: "2px solid rgb(29, 155, 240)",
        backgroundColor: "rgb(22,24,28)",
      });
      setrbStyle({});
      setrbStyle1({});
      dispatch(exploreChangeState({ fontWeight: 100 }));
      dispatch(settingsChangeState({ fontWeight: "Bold" }));
    }
    console.log("object");
  }, [navStyleOnPop]);
  
  const [togglePermit, setTogglePermit] = useState(false);
  return (
    <SettingsContext.Provider value={{ togglePermit, setTogglePermit }}>
      <div className="overflow-scroll xs:w-full">
        <div className="settings-page flex ">
          <section className="settings-main-tab h-screen">
            <p className="pt-3 pl-4 font-semibold text-xl pb-6">Settings</p>
            <p className="pl-4 text-xl font-bold">Privacy</p>
            <Link
              to="personalization/"
              className="flex justify-between mt-4 pr-4 py-1 items-center cursor-pointer settings-personalized-data"
              style={rbStyle}
              onClick={() => {
                setrbStyle({
                  borderRight: "2px solid rgb(29, 155, 240)",
                  backgroundColor: "rgb(22,24,28)",
                });
                setrbStyle1({});
                setrbStyle2({});
              }}
            >
              <div className="flex flex-col">
                <p className="pl-4">Personalization and data</p>
                <p className="pl-4 settings-allow-all text-sm">Allow all</p>
              </div>
              <p className="settings-chevron-icons">
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </p>
            </Link>
            <Link
              to="your_twitter_data/"
              className="flex justify-between pr-4 py-4 items-center cursor-pointer settings-tweet-data"
              style={rbStyle1}
              onClick={() => {
                setrbStyle1({
                  borderRight: "2px solid rgb(29, 155, 240)",
                  backgroundColor: "rgb(22,24,28)",
                });
                setrbStyle({});
                setrbStyle2({});
              }}
            >
              <p className="pl-4">Your Tweeter data</p>
              <p className="settings-chevron-icons">
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </p>
            </Link>
            <p className="pl-4 pr-4 pt-3 pb-3 mb-3 setting-these-set-text">
              These settings apply to this browser or device while you’re logged
              out. They don’t have any effect when you’re logged in.
            </p>
            <p className="pl-4 font-bold text-xl">General</p>
            <Link
              to="about/"
              className="flex justify-between pr-4 mt-3 items-center cursor-pointer settings-additional-resources"
              style={rbStyle2}
              onClick={() => {
                setrbStyle2({
                  borderRight: "2px solid rgb(29, 155, 240)",
                  backgroundColor: "rgb(22,24,28)",
                });
                setrbStyle({});
                setrbStyle1({});
              }}
            >
              <p className="pl-4 py-5">Additional resources</p>
              <p className="settings-chevron-icons">
                {" "}
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />{" "}
              </p>
            </Link>
          </section>
          <section className="settings-tab-expanded">
            <Outlet />
          </section>
        </div>
      </div>
      <div
        style={ifBlur}
        className="w-screen h-screen absolute flex justify-center items-center homepage-auth-overlay"
      >
        <div className="bg-black w-80 h-72 p-8 rounded-2xl">
          <p className=" font-bold text-xl">
            Disable personalization and data?
          </p>
          <p className="settings-personalize-text-this-may mb-5">
            This may make the Tweets and ads you see less relevant.
          </p>
          <button
            className="settings-personalize-disable text-black w-full py-3 mb-3 rounded-full font-bold"
            onClick={() => {
              setTogglePermit(true);
              dispatch(personalizationblurChangeState({ display: "none" }));
              dispatch(checkboxsettingsChangeState(false));
            }}
          >
            Disable
          </button>
          <button
            className="settings-personalize-cancel text-white w-full py-3 rounded-full font-bold"
            onClick={() => {
              dispatch(personalizationblurChangeState({ display: "none" }));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </SettingsContext.Provider>
  );
};

export default SettingsPage;