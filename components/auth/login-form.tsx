'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from 'sonner'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/lib/zod"
import type { output } from "zod"
import { Loader2 } from "lucide-react"

type SignInFormValues = output<typeof signInSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const [loading, setLoading] = useState(false)
    const callbackUrl = "/home"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: SignInFormValues) => {
        setLoading(true)

        try {
            const results = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl,
            })
            if (results?.error) {
                console.error("Login failed:", results.error)
                toast.error("Wrong credentials")
            } else {
                window.location.href = callbackUrl
                toast.success("Welcome back")
            }
        } catch (error) {
            console.error("Sign-in error:", error)
            toast.error("Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card
                className="overflow-hidden rounded-3xl border-white/12 bg-white/10 text-white shadow-2xl shadow-black/40 backdrop-blur-xl"
                style={{
                    boxShadow:
                        "0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 80px rgba(0,0,0,0.45)",
                }}
            >
                <CardHeader className="space-y-3 pb-4 text-center">
                    <CardTitle className="text-2xl font-semibold tracking-tight text-white">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-sm leading-6 text-white/65">
                        Sign in to access the admin dashboard.
                    </CardDescription>
                    <div
                        aria-hidden
                        className="mx-auto h-px w-24 rounded-full bg-white/15"
                        style={{
                            boxShadow:
                                "0 0 0 1px rgba(255,255,255,0.06), 0 0 40px color-mix(in srgb, var(--brand-accent) 35%, transparent)",
                        }}
                    />
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-2.5">
                            <Label htmlFor="email" className="text-sm font-medium text-white/85">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="johndoe@gmail.com"
                                disabled={loading}
                                {...register("email")}
                                aria-invalid={!!errors.email}
                                className="h-11 border-white/10 bg-black/15 text-white placeholder:text-white/35 focus-visible:border-brand-accent focus-visible:ring-brand-accent/40"
                            />
                            {errors.email && (
                                <p className="text-sm text-rose-300">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex items-center">
                                <Label htmlFor="password" className="text-sm font-medium text-white/85">
                                    Password
                                </Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                disabled={loading}
                                {...register("password")}
                                aria-invalid={!!errors.password}
                                className="h-11 border-white/10 bg-black/15 text-white placeholder:text-white/35 focus-visible:border-brand-accent focus-visible:ring-brand-accent/40"
                            />
                            {errors.password && (
                                <p className="text-sm text-rose-300">{errors.password.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="h-11 w-full rounded-full bg-white/10 text-sm font-medium text-white shadow-sm ring-1 ring-white/15 backdrop-blur-md transition hover:bg-white/14 hover:text-white disabled:bg-white/10 disabled:text-white/55"
                            style={{
                                boxShadow:
                                    "0 1px 0 rgba(255,255,255,0.06) inset, 0 18px 50px rgba(0,0,0,0.35)",
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}