import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import CheckButton from "../../components/SettingsCheckButton";
import Toggle from "../../components/Toggle";
import { useSelector, useDispatch } from "react-redux";
import {
  personalizationblurChangeState,
  checkboxsettingsChangeState,
} from "../../store";
import { useContext } from "react";
import { SettingsContext } from "./settingsPage";
import SettingsTopNav from "./SettingsTopNav";

library.add(fas);
library.add(fab);
library.add(far);

const PersonalizationAndData = () => {
  const personalcheckbxs = useSelector((state) => state.setchbx.value);
  const [toggleTab, setToggleTab] = useState({
    height: "20px",
    width: "20px",
    backgroundColor: "rgb(29, 155, 240)",
    borderRadius: "100px",
    right: 0,
  });

  const [toggleHolder, setToggleHolder] = useState({
    height: "15px",
    width: "40px",
    backgroundColor: "rgb(107, 201, 251)",
    borderRadius: "100px",
  });

  const { togglePermit, setTogglePermit } = useContext(SettingsContext);

  const dispatch = useDispatch();
  const ifBlur = useSelector((state) => state.peras.value);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
    }
  }, [togglePermit, dispatch, mounted]);

  return (
    <div className="personalization-and-data-section h-full">
      <div className="personalization-and-data-top-1">
        <SettingsTopNav navText={"Personalization and data"} />
        <p className="personalization-and-data-head-text-these-settings text-sm pl-4 pb-3 pr-10">
          These settings apply to this browser or device while you’re logged
          out. They don’t have any effect when you’re logged in.
        </p>
      </div>
      <div className=" personalization-and-data-top-2 py-4 px-4">
        <div className="personalization-and-data-top-2-top-holder flex items-center justify-between">
          <div className="personalization-and-data-top-2-top-personalize">
            Personalization and data
          </div>
          <div
            onClick={() => {
              if (toggleTab.backgroundColor === "rgb(29, 155, 240)") {
                dispatch(personalizationblurChangeState({ display: "flex" }));
                dispatch(checkboxsettingsChangeState(true));
              } else {
                setTogglePermit(false);
                setToggleTab({
                  height: "20px",
                  width: "20px",
                  backgroundColor: "rgb(29, 155, 240)",
                  borderRadius: "100px",
                  right: 0,
                });

                setToggleHolder({
                  height: "15px",
                  width: "40px",
                  backgroundColor: "rgb(107, 201, 251)",
                  borderRadius: "100px",
                });
                dispatch(checkboxsettingsChangeState(true));
              }
            }}
          >
            <Toggle
              permission={togglePermit}
              toggleTab={toggleTab}
              setToggleTab={setToggleTab}
              toggleHolder={toggleHolder}
              setToggleHolder={setToggleHolder}
            />
          </div>
        </div>
        <p className="text-sm personalization-and-data-top-2-text-this-will pt-2">
          This will enable or disable all of the settings on this page.
        </p>
      </div>
      <div className="">
        <p className="font-black px-4 personalization-and-data-personalize-2 text-lg pt-3 pb-8">
          Personalization
        </p>
        <div className=" px-4 flex items-center justify-between personalization-and-data-person-ad-holder">
          <div className=" personalization-and-data-person-ad text-sm font-medium">
            Personalized ads
          </div>
          <CheckButton />
        </div>
        <p className="px-4 personalization-and-data-person-ad-you-will pb-6">
          You will always see ads on Tweeter based on your Tweeter activity.
          When this setting is enabled, Tweeter may further personalize ads from
          Tweeter advertisers, on and off Tweeter, by combining your Tweeter
          activity with other online activity and information from our partners.{" "}
          <span>
            <Link className=" personalization-and-data-person-ad-link-learn signup-link">
              Learn more
            </Link>
          </span>
        </p>
        <div className="px-4 flex items-center justify-between cursor-pointer ">
          <p className="text-sm font-medium pb-1">
            Personalize based on your inferred identity
          </p>
          <CheckButton />
        </div>
        <p className="px-4 personalization-and-data-person-text-Tweeter-will pb-5">
          Tweeter will always personalize your experience based on information
          you’ve provided, as well as the devices you’ve used to log in. When
          this setting is enabled, Tweeter may also personalize based on other
          inferences about your identity, like devices and browsers you haven’t
          used to log in to Tweeter or email addresses and phone numbers similar
          to those linked to your Tweeter account.{" "}
          <span>
            <Link className="signup-link">Learn more</Link>
          </span>
        </p>
        <p className="pt-3 pl-4 text-xl font-bold pb-6">Data</p>
        <div className="flex justify-between items-center px-4">
          <p>Allow additional information sharing with business partners</p>
          <CheckButton />
        </div>
        <p className="px-4  personalization-and-data-section-data-text pb-14">
          Tweeter always shares information with business partners as a way to
          run and improve its products. When enabled, this allows Tweeter to
          share additional information with those partners to help support
          running Tweeter’s business, including making Tweeter’s marketing
          activities on other sites and apps more relevant for you.{" "}
          <span>Learn more</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalizationAndData;
