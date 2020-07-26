import fetch from 'isomorphic-unfetch'
import { useQuery } from 'react-query'

const getPersonManuals = async () => {
  const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`
  return fetch(`${apiURL}`).then((res) => res.json())
}

export function usePersonManuals() {
  return useQuery('manuals', getPersonManuals)
}

// The _ represents the React-Query Identifier that will be passed but we don't need!
const getPersonManual = async (_, manualName) => {
  const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual?name=${manualName}`
  return fetch(`${apiURL}`).then((res) => res.json())
}

export function usePersonManual(manualName) {
  return useQuery(['manual', manualName], getPersonManual)
}
