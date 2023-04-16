import axios, {AxiosResponse} from 'axios'
import { url } from 'inspector'
import React from 'react'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_KEY } from '../../../utils/constants'

export const getAPI = (
    url: string
  ): (() => Promise<AxiosResponse>) => {
    return async () => {
      const res = await axios.get(url, {
        headers: {
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      })
      return res
    }
}  


export const postAPI = (
    url: string,
    data?: object| FormData
  ): (() => Promise<AxiosResponse>) => {
    return async () => {
      const res = await axios.post(
        url,
        {
            data: typeof data === 'object' ? JSON.stringify(data) : data}, 
        {
        headers: {
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      })
      return res
    }
  }