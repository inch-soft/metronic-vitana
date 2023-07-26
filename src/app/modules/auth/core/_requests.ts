import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

const url = 'https://vitana.up.railway.app/api'
// Server should return AuthModel
export function login(username: string, password: string) {
  return axios.post<AuthModel>(`${url}/auth/login`, {
    username,
    password,
  })
}
// PRODUCT
export function createProduct(formdata) {
  return axios.post<any>(`${url}/products/`, {
    ...formdata,
  })
}

export function editProduct(formdata, id) {
  return axios.put<any>(`${url}/products/${id}/`, {
    ...formdata,
  })
}

export function deleteProduct(id) {
  return axios.delete<any>(`${url}/products/${id}/`)
}

export function getProductId(params, id) {
  return axios.get<any>(`${url}/products/${id}`, {
    ...params,
  })
}

export function getProduct(params) {
  return axios.get<any>(`${url}/products`, {
    params,
  })
}
// PRODUCT

// CUSTOMER
export function createCustomer(formdata) {
  return axios.post<any>(`${url}/customers/`, {
    ...formdata,
  })
}

export function editCustomer(formdata, id) {
  return axios.put<any>(`${url}/customers/${id}/`, {
    ...formdata,
  })
}

export function deleteCustomer(id) {
  return axios.delete<any>(`${url}/customers/${id}/`)
}

export function getCustomerId(params, id) {
  return axios.get<any>(`${url}/customers/${id}`, {
    ...params,
  })
}

export function getCustomer(params) {
  return axios.get<any>(`${url}/customers`, {
    params,
  })
}
// CUSTOMER

// ORDER
export function createOrder(formdata) {
  return axios.post<any>(`${url}/orders/`, {
    ...formdata,
  })
}
export function getOrderId(params, id) {
  return axios.get<any>(`${url}/orders/${id}`, {
    ...params,
  })
}

export function editOrder(formdata, id) {
  return axios.put<any>(`${url}/orders/${id}/`, {
    ...formdata,
  })
}

export function deleteOrder(id) {
  return axios.delete<any>(`${url}/orders/${id}/`)
}

export function getOrder(params) {
  return axios.get<any>(`${url}/orders`, {
    params,
  })
}
// ORDER

// MANAGERS

export function createManager(formdata) {
  return axios.post<any>(`${url}/managers`, {
    ...formdata,
  })
}
export function getManagers(params) {
  return axios.get<any>(`${url}/managers`, {
    ...params,
  })
}

// MANAGERS

export function getDashboard() {
  return axios.get<any>(`${url}/dashboard`, {})
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
