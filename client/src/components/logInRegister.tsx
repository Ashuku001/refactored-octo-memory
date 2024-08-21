'use client'
import { FormEvent, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import secureLocalStorage from 'react-secure-storage';
import {setCookie} from 'cookies-next'
import {  EyeIcon, EyeOffIcon  } from 'lucide-react';
import DarkModeButton from '@/components/DarkModeButton';
import * as z from "zod"
import { useForm } from "react-hook-form"

import { LoginMerchantDocument, SignupMerchantDocument } from '@/graphql';

import ErrorComponent from './ErrorComponent';
import LoadingComponent from './LoadingSpinner';
import { isLoggedInVar, merchantId } from './AuthGuard';
import FacebookEmbeddedSignup from './FacebookEmbeddedSignup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PhoneNumberInput, validateNumber } from '@/components/PhoneNumberInput'
import { CustomFormLabel } from './ui/CustomFormLabel';

export const LandingPage = () => {
    return(
        <div className='h-full w-full flex flex-row space-x-2 items-center justify-center relative'>
            <div className='border p-5  bg-gradient-to-b  from-muted/20 to-muted/50 shadow md:shadow-lg rounded-md mX-auto my-auto flex flex-row space-x-2 items-center w-[900px] h-[500px] relative dark:'>
                <div className='absolute top-2 left-2'>
                    <DarkModeButton />
                </div>
                <div className='w-[60%] flex flex-col space-y-2'>
                    <h1 className='text-5xl font-bold font-sans'>Business Insights</h1>
                    <p>A powerful tool to gain customer and product insights for your business.</p>
                    <p>Enable data driven product conversations by customers on WhatsApp.</p>
                </div>
                <div className='flex-1 w-full '>
                    <LoginRegisterForm />
                </div>
            </div>
        </div>
    )
}

type LoginProps = {
    showLogin: boolean
}
const LoginForm = ({showLogin}: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [loginMerchant, { data, loading, error }] = useMutation(LoginMerchantDocument)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMerchant({
            //@ts-ignore
            update(cache, { data: { loginMerchant } }) {

                if (loginMerchant.token && loginMerchant.merchant.id) {
                    setCookie('jwt', loginMerchant.token, {maxAge:  60 * 6 * 24})
                    localStorage.setItem('jwt', loginMerchant.token);
                    secureLocalStorage.setItem('merchantId', loginMerchant.merchant.id)
                    isLoggedInVar(true)
                    merchantId(loginMerchant.merchant.id)
                }
            },
            variables: { username, password }
        })
        setUsername('')
        setPassword('')
    }

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [showLogin, setUsername, setPassword])

    return (
        <div className='flex flex-col w-full'>
            {!loading && (
                <form onSubmit={onSubmit} className='flex flex-col space-y-2 w-full' >
                    <Input
                        type="text"
                        placeholder='username'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value.replace(/\s/g, "_"))
                        }}
                        className='p-2 rounded-md'
                    />
                    <div className='flex items-center relative'>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-2 pr-20 rounded-md'
                        />
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0"
                        >
                            {showPassword ? <EyeIcon size={"20"}/> : <EyeOffIcon size="20"/> }
                        </Button>
                    </div>
                    <FacebookEmbeddedSignup />
                </form>
            )}
            {loading && <LoadingComponent />}
            {error && (<ErrorComponent message={error.message} />)}
        </div>
    )
}

const RegisterFormSchema = z.object({
    phoneNumber: z.string().regex(/^(?:\d{9}|0\d{9})$/, {
        message: "Invalid Kenyan phone number. It should be exactly 9 digits."
      }),
    username: z.string().min(1),
    password: z.string().min(1 ),
    code: z.string().optional(),
})

type RegisterFormValues = z.infer<typeof RegisterFormSchema>

type RegisterProps = {
    showLogin: boolean
}

const RegisterForm = ({showLogin}: RegisterProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [signupMerchant, { loading, error, data }] = useMutation(SignupMerchantDocument)

    const form = useForm<RegisterFormValues>()

    const onSubmit = (data: RegisterFormValues) => {
        const phoneNumber = validateNumber({code: data?.code,phoneNumber: data.phoneNumber})
        signupMerchant({
            //@ts-ignore
            update(cache, { data: { signupMerchant } }) {
                console.log(signupMerchant)
                if (signupMerchant.token) {
                    setCookie('jwt', signupMerchant.token, {maxAge: 60 * 6 * 24})
                    localStorage.setItem('jwt', signupMerchant.token);
                    secureLocalStorage.setItem('merchantId', signupMerchant.merchant.id)
                    isLoggedInVar(true)
                    merchantId(signupMerchant.merchant.id)
                }
            },
            variables: { username:data.username, whatsapp_phone_number: phoneNumber, password: data.password }
        })
    }

    return (
    <div className='w-full'>
        {loading
            ? <LoadingComponent />
            : <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <CustomFormLabel title="Username" variant="required" description="" />
                                <FormControl>
                                    <Input placeholder={"Username..."} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PhoneNumberInput form={form}/>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className=''>
                                <CustomFormLabel title="Password" variant="required" description="" />
                                <div className='flex items-center relative'>
                                    <FormControl>
                                        <Input 
                                            type={showPassword ? "text" : "password"}
                                            placeholder={"Password..."} 
                                            {...field}
                                        />
                                    </FormControl>
                                    <Button
                                        type='button'
                                        variant={"ghost"}
                                        size={'icon'}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute right-0'
                                    >
                                        {!showPassword ? <EyeOffIcon size="20"/> : <EyeIcon size="20"/>}
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit"  disabled={loading || !!Object.keys(form.formState.errors)?.length}>
                        Signup
                    </Button>
                </form>
            </Form>
        }
        {error && <ErrorComponent message={error.message} />}
    </div>
    )
}

const LoginRegisterForm = () => {
    const [showLogin, setShowLogin] = useState<boolean>(true)

    return (
        <div className=''>
            {showLogin
                ?
                <div className='text-center w-full'>
                    <LoginForm showLogin={showLogin} />
                    <Button className='text-blue-400' onClick={e => setShowLogin(false)} variant={'ghost'}>Or sign up </Button>
                </div>
                : <div className='text-center w-full'>
                    <RegisterForm showLogin={showLogin}/>
                    <Button onClick={e => setShowLogin(true)} className='text-blue-400' variant={'ghost'}>Or login</Button>
                </div>
            }

        </div>
    )
}



export default LoginRegisterForm