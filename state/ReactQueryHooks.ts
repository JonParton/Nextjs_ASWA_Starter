import fetch from 'isomorphic-unfetch'
import { useQuery, QueryResult } from 'react-query'
import { PersonManualAPIReturn } from '../models/PersonManual'

const getPersonManuals = async (): Promise<PersonManualAPIReturn> => {
  const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`
  return fetch(`${apiURL}`).then((res) => res.json())
}

export const usePersonManuals = (): QueryResult<
  PersonManualAPIReturn,
  Error
> => {
  return useQuery('manuals', getPersonManuals)
}

// The _ represents the React-Query Identifier that will be passed but we don't need!
const getPersonManual = async (
  _,
  manualName: string,
): Promise<PersonManualAPIReturn> => {
  const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual?name=${manualName}`
  return fetch(`${apiURL}`).then((res) => res.json())
}

export const usePersonManual = (
  manualName: string,
): QueryResult<PersonManualAPIReturn, Error> => {
  return useQuery(['manual', manualName], getPersonManual)
}
