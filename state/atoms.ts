import { atom, selector } from 'recoil'

// Current selected manual on personManuals Page
export const currentManualNameState = atom({
  key: 'currentManualNameState',
  default: '',
})

export const currentPageTitleState = atom({
  key: `currentPageTitleState`,
  default: '',
})

export const currentAppTitleState = atom({
  key: `currentAppTitleState`,
  default: "Next.js ASWA's Example",
})

// This is a selector that uses other atoms in a pure function to keep a value in sync - In the case the full title to display in the head.
export const currentFullPageTitleState = selector({
  key: `currentFullPageTitleState`,
  get: ({ get }) => {
    const PageTitle = get(currentPageTitleState)
    const AppTitle = get(currentAppTitleState)

    if (PageTitle.length > 0) {
      return `${PageTitle} | ${AppTitle}`
    } else {
      return AppTitle
    }
  },
})
