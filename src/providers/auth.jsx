"use client"

import { getProfile, logIn, signUp } from "@/actions/auth"
import Loading from "@/atoms/loading"
import Logo from "@/atoms/logo"
import { toastMessager } from "@/lib/utils"
import cookieService from "@/services/cookie"
import useRemindYouStore from "@/store"
import { Button } from "@/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/ui/form"
import { Input } from "@/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const AuthProvider = ({ children }) => {

	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const isAuthenticated = useRemindYouStore(state => state.isAuthenticated)
	const dispatch = useRemindYouStore((state) => state.dispatch)

	const token = cookieService.getToken("access")

	const getUserProfile = async (token) => {
		setLoading(true)

		const resp = await getProfile(token)
		const { data = null } = resp

		if (data) {
			dispatch({
				type: "SET_STATE",
				payload: {
					user: data.result,
					isAuthenticated: true,
					openAuth: false,
				}
			})
			setOpen(false)
			setLoading(false)
		} else {
			dispatch({
				type: "SET_STATE",
				payload: {
					user: null,
					isAuthenticated: false,
					openAuth: true,
				}
			})
			setOpen(true)
			setLoading(false)
		}
		setLoading(false)
	}

	useEffect(() => {
		if (token) { getUserProfile(token) }
		else {
			dispatch({
				type: "SET_STATE",
				payload: {
					user: null,
					isAuthenticated: false,
					openAuth: true,
				}
			})
			setOpen(true)
		}
	}, [isAuthenticated, token])

	if (loading) return (
		<div className="flex w-full items-center justify-center h-full">
			<Loading />
		</div>
	)

	return (
		<>
			<div className="flex flex-1 w-full h-full">
				{
					!isAuthenticated ? (
						<Dialog open={open} onOpenChange={() => setOpen(!openAuth)}>
							<DialogContent className="!max-w-sm dark:!border-neutral-700">
								<DialogHeader>
									<DialogTitle className="items-center justify-center flex">
										<Logo />
									</DialogTitle>
								</DialogHeader>
								<Tabs defaultValue="login">
									<TabsList className={"w-full"}>
										<TabsTrigger value="login">
											Log In
										</TabsTrigger>
										<TabsTrigger value="signup">
											Sign Up
										</TabsTrigger>
									</TabsList>
									<TabsContent value="login">
										<LogInForm setOpen={setOpen} />
									</TabsContent>
									<TabsContent value="signup">
										<SignUpForm setOpen={setOpen} />
									</TabsContent>
								</Tabs>
							</DialogContent>
						</Dialog>
					) : null
				}
				{children}
			</div>
		</>
	)
}

export default AuthProvider


const SignUpForm = ({ setOpen }) => {

	const [loading, setLoading] = useState(false)
	const dispatch = useRemindYouStore((state) => state.dispatch)

	const form = useForm({
		resolver: zodResolver(SignupSchema),
	})

	const onSubmit = async (values) => {
		setLoading(true)

		await signUp(values)
			.then(result => {

				console.log(result);

				const { data: { code, message, error, token } = null } = result

				if (error) {
					toastMessager(message, code)
					dispatch({
						type: "SET_STATE",
						payload: {
							isAuthenticated: false,
							openAuth: true,
						}
					})
					setLoading(false)
					setOpen(true)
				}

				dispatch({
					type: "SET_STATE",
					payload: {
						isAuthenticated: true,
						openAuth: false,
					}
				})
				cookieService.setTokens({
					accessToken: token
				})

				toastMessager(message, code)

				setLoading(false)
				setOpen(false)
				form.reset()
			})
			.catch(err => {
				dispatch({
					type: "SET_STATE",
					payload: {
						isAuthenticated: false,
						openAuth: true,
					}
				})
				setLoading(false)
				setOpen(true)
			})
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Name"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Email"
										{...field}
										value={field.value || ""}

									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="mobile"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mobile</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Enter Your Mobile"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter Your Password"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={loading}
						className={"w-full"}
					>
						{loading ? <Loading /> : "Sign Up"}
					</Button>
				</form>
			</Form>

		</>
	)
}

const LogInForm = ({ setOpen }) => {

	const [loading, setLoading] = useState(false)
	const dispatch = useRemindYouStore((state) => state.dispatch)

	const form = useForm({
		resolver: zodResolver(LoginSchema),
	})

	const onSubmit = async (values) => {
		setLoading(true)

		await logIn(values)
			.then(result => {

				const { data: { code, message, error, data = null } = null } = result

				if (error) {
					toastMessager(message, code)
					dispatch({
						type: "SET_STATE",
						payload: {
							isAuthenticated: false,
							openAuth: true,
						}
					})
					setLoading(false)
					setOpen(true)
				}

				dispatch({
					type: "SET_STATE",
					payload: {
						isAuthenticated: true,
						openAuth: false,
					}
				})
				cookieService.setTokens({
					accessToken: data?.token
				})

				toastMessager(message, code)

				setLoading(false)
				setOpen(false)
				form.reset()
			})
			.catch(err => {
				dispatch({
					type: "SET_STATE",
					payload: {
						isAuthenticated: false,
						openAuth: true,
					}
				})
				setLoading(false)
				setOpen(true)
			})
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 py-4">
					<FormField
						control={form.control}
						name="mobile"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mobile</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="Enter Your Mobile"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter Your Password"
										{...field}
										value={field.value || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						disabled={loading}
						className={"w-full"}
					>
						{loading ? <Loading /> : "Log In"}
					</Button>
				</form>
			</Form>

		</>
	)
}

const SignupSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name is required" })
		.regex(/^[a-zA-Z ]+$/, "Only letters and spaces are allowed.")
		.trim(),
	email: z
		.string()
		.email({ message: "Invalid email address" })
		.trim(),
	mobile: z
		.string()
		.min(10, { message: "Mobile number is required" })
		.max(10, { message: "Mobile number is too long" })
		.regex(/^[0-9]+$/, "Only numbers are allowed.")
		.trim(),
	password: z
		.string()
		.min(6, { message: "Password is required" })
		.trim(),
})

const LoginSchema = z.object({
	mobile: z
		.string()
		.min(10, { message: "Mobile number is required" })
		.max(10, { message: "Mobile number is too long" })
		.regex(/^[0-9]+$/, "Only numbers are allowed.")
		.trim(),
	password: z
		.string()
		.min(6, { message: "Password is required" })
		.trim(),
})