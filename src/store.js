import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "blurHomeBackground",
  initialState: { value: { display: "none" } },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

const exploreSlice = createSlice({
  name: "SolidFocus",
  initialState: { value: { fontWeight: "bold" } },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

const settingSlice = createSlice({
  name: "SolidFocus2",
  initialState: { value: { fontWeight: 100 } },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

const personalizationConfirmationStyleSlice = createSlice({
  name: "personalizationConfirmationBlur",
  initialState: { value: { display: "none" } },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

const settingsCheckboxStyleSlice = createSlice({
  name: "checkboxConfirm",
  initialState: { value: true },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});

const goToSettingsFeatSlice = createSlice({
  name: "goToSettingsFeat",
  initialState: { value: "go-2-settings-blur homepage-auth-overlay hidden h-screen fixed w-screen" },
  reducers: {
    changeState: (state, action) => {
      state.value = action.payload;
    },
  },
});


export const { changeState: blurChangeState } = userSlice.actions;
export const { changeState: personalizationblurChangeState } = personalizationConfirmationStyleSlice.actions;
export const { changeState: exploreChangeState } = exploreSlice.actions;
export const { changeState: settingsChangeState } = settingSlice.actions;
export const { changeState: checkboxsettingsChangeState } = settingsCheckboxStyleSlice.actions;
export const { changeState: setGoToSettingsFeat } = goToSettingsFeatSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    exp: exploreSlice.reducer,
    set: settingSlice.reducer,
    peras: personalizationConfirmationStyleSlice.reducer,
    setchbx: settingsCheckboxStyleSlice.reducer,
    gotosetfeat: goToSettingsFeatSlice.reducer
  },
});
