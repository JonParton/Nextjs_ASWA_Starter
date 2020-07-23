import { atom } from "recoil";

// Current selected manual on personManuals Page
export const currentManualNameState = atom({
    key: 'currentManualNameState', 
    default: '', 
  });