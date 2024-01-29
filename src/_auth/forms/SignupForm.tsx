import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation";

const SignupForm = () => {

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: '',
      name: '',
      username: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h1 className="h1-bold md:h2-bold">splice</h1>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Sign up to see photos and videos from your friends</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Full Name" type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Username" type="text" className="shad-input" {...field} />
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
                <FormControl>
                  <Input placeholder="Password" type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">Sign up</Button>
        </form>
      </div>
    </Form>
  )
}
export default SignupForm;