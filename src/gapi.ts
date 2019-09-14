import React, { useState, useEffect } from "react";
import { GapiWrapper } from "./GapiWrapper";

interface State {
  gapiWrapper?: GapiWrapper
}

export const useGapi = (): State => {
  const [state, setState] = useState<State>({
    gapiWrapper: undefined
  });

  useEffect(() => {
    const CLIENT_ID = "259142840372-7101o4dq66rhel7sk58u6escaj8ktt6g.apps.googleusercontent.com";
    const API_KEY = "AIzaSyDsoJbu1sdSsm6WqhMc4hGBV49Q-kVedOg";
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

    const initClient = () => {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        setState(prevState => ({
          ...prevState,
          gapiWrapper: new GapiWrapper(window.gapi)
        }));
      })
        .catch((error: any) => {
          console.log(error);
        });
    };

    // TODO このままだとこのフックが呼ばれた回数だけスクリプトを読み込んでしまう
    const gapiScript = document.createElement("script");
    gapiScript.src = "https://apis.google.com/js/api.js?onload=onGapiLoad";
    window.onGapiLoad = () => {
      window.gapi.load("client:auth2", initClient);
    };
    document.body.appendChild(gapiScript);
  }, []);

  return state;
};