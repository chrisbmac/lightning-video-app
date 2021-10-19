import { createGuestSession, createSessionToken } from './Helpers'
import { fetcher } from './SendData'
import { API_URL } from './Constants'

export const authenticateUser = async data => {
  if (!data) throw Error
  try {
    // do something with status later on to show to user
    const URL = `${API_URL}/authenticate/${data.email}`
    const response = await (await fetch(URL)).json()
    if (data.password === response.password) {
      return response
    }
    return response
  } catch (err) {
    console.log('Error auth user: ', err)
  }
}

export const guestSession = async data => {
  if (!data) throw Error
  try {
    const URL = `${API_URL}/guest`
    const response = await fetcher(URL, 'POST', data)
    return response
  } catch (err) {
    console.log('Error guest session: ', err)
  }
}

export const createUser = async data => {
  if (!data) throw Error
  try {
    const URL = `${API_URL}/createaccount`
    const response = await fetcher(URL, 'POST', data)
    return response
  } catch (err) {
    console.log('Error creating user: ', err)
  }
}
