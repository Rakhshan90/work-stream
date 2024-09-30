"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signUpSchema, SignUpSchemaType } from "@repo/validation-schema/zod-schema"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true)
    // Here you would typically send the form data to your backend
    console.log(values)

    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false)
      //   toast({
      //     title: "Account created successfully!",
      //     description: "You can now log in with your new account.",
      //   })
      //   router.push("/signin") // Redirect to login page after successful signup
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-slate-800 border-none text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-600">Welcome to WorkStream</CardTitle>
          <CardDescription className="text-center text-slate-200">
            Create your account to get started with workstream
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="bg-slate-700 border-none placeholder:text-slate-200" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="bg-slate-800">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="bg-slate-700 border-none placeholder:text-slate-200"
                        type="email" placeholder="john@example.com" {...field} />
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
                        className="bg-slate-700 border-none placeholder:text-slate-200"
                        type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="bg-slate-700 border-none placeholder:text-slate-200">
                        <SelectTrigger className="bg-slate-700 border-none text-slate-200 placeholder:text-slate-200">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="focus:bg-slate-600 focus:text-white"
                          value="EMPLOYEE">
                          Employee
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-slate-600 focus:text-white"
                          value="MANAGER">
                          Manager
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-600" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}