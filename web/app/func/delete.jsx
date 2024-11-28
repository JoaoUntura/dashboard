'use server'
import api from './api'


export default async function deleteRegistro(idRegistro) {
   await api.delete(`/registro/${idRegistro}`)
} 