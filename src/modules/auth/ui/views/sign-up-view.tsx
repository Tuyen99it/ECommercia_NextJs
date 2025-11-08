"use client"
import React from 'react';
import z from "zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerSchema } from '../../schemas';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
})

export const SignUpView = () => {
    const trpc = useTRPC()
    const router =useRouter();
    // Fix: Use the correct tRPC mutation syntax
    // const testMutation = useMutation(trpc.test.login.mutationOptions())
    const registerMutation = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message );
            console.error('Registration error:', error);
        },
        onSuccess:()=>{
            router.push("/")
        }
    }))

    const form = useForm<z.infer<typeof registerSchema>>({
        mode: "all",
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        }
    })

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        console.log('Form values:', values.email)
        registerMutation.mutate(values)
    }

    // const handleTestLogin = () => {
    //     console.log('Testing login with:', { name: "Tuyen" })
    //     testMutation.mutate({ name: "Tuyen" })
    // }

    const username = form.watch("username")
    const usernameErrors = form.formState.errors.username;
    const showPreview = username && !usernameErrors

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 text-black">
            <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col gap-8 p-4 lg:p-16'
                    >
                        {/* ... your existing form JSX ... */}
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={registerMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormDescription
                                        className={cn("hidden", showPreview && "block")}>
                                        Your store will be available at &nbsp;
                                        <strong>
                                            {username}
                                        </strong>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={registerMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            disabled={registerMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={registerMutation.isPending}
                            type="submit"
                            size="lg"
                            variant="elevated"
                            className='bg-black text-white hover:bg-pink-400 hover:text-primary'
                        >
                            {registerMutation.isPending ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="h-screen w-full lg:col-span-2 hidden lg:block"
                style={{
                    backgroundImage: "url('auth-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}>
                {/* <div className="p-4">
                    {testMutation.isPending ? (
                        'Testing login...'
                    ) : (
                        <div className="flex flex-col gap-2">
                            {testMutation.isError ? (
                                <div className="text-red-500">An error occurred: {testMutation.error.message}</div>
                            ) : null}

                            {testMutation.isSuccess ? (
                                <div className="text-green-500">Test login successful!</div>
                            ) : null}

                            <button
                                onClick={handleTestLogin}
                                disabled={testMutation.isPending}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                {testMutation.isPending ? 'Testing...' : 'Test Login'}
                            </button>
                        </div>
                    )}
                </div> */}
            </div>
        </div>
    );
}