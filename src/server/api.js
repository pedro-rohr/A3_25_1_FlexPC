import axios from 'axios'

export const apiLocal = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})


export const apiCep = axios.create({
  baseURL: 'https://brasilapi.com.br/api/cep/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
