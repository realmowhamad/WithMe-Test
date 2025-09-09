import { useMutation } from "@tanstack/react-query"
import AxiosConfigInstance from "../config/AxiosConfig"
import type { AxiosResponse } from "axios"


export type LoginDataTypes = {
    username: string
    password: string
}

export type RegisterDataTypes = {
    username: string
    email: string
    password: string
    password_confirm: string
    date_of_birth: string
    gender: string
}   


export type RegisterResponseTypes = {
    message: string
    user_id: number
    username: string
    email: string
}

export type LoginResponseTypes = {
    message: string
    user: {
        id: number
        username: string
        email: string
        first_name: string
        last_name: string
        date_joined: string
        is_active: boolean
    }
    profile: {
        date_of_birth: string
        gender: string
        bio: string
        location: string
    }
}


    




const logingFn = (data: LoginDataTypes)=>{
    return AxiosConfigInstance({
        method: 'POST',
        url: '/login/',
        data: data
    })
}

const registerFn = (data: RegisterDataTypes)=>{
    return AxiosConfigInstance({
        method: 'POST',
        url: '/register/',
        data: data
    })
}




const useAuth = () => {
    const useLogin=()=> useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: LoginDataTypes) => {
            const response:AxiosResponse<LoginResponseTypes> = await logingFn(data)
            return response.data
        }
    })

    const useRegister=()=> useMutation({
        mutationKey: ['register'],
        mutationFn: async (data: RegisterDataTypes) => {
            const response:AxiosResponse<RegisterResponseTypes> = await registerFn(data)
            return response.data
        }
    })

    return {    
        useLogin,
        useRegister
    }
}

export default useAuth