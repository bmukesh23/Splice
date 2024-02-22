import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import { account } from "@/lib/appwrite/config";

const googleAuth = (e) => {
  e.preventDefault();

  try {
    account.createOAuth2Session("google", "https://localhost:5173/", "https://localhost:5173/sign-in");
  } catch (e) {
    console.log(e.message);
  }
  
}

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof SigninValidation>) => {

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({ title: 'Sign in failed. Please try again.' })
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/')
    } else {
      return toast({ title: 'Sign up failed, Please try again.' })
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex">
          <img
            src="/assets/images/splicelogo.svg"
            alt="logo"
            height={34}
            width={34}
            className="mt-1.5"
          />
          <h1 className="h1-bold">splice</h1>
        </div>
        <h2 className="h3-bold md:h3-bold pt-4 sm:pt-4">Login to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back!</p>
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
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <Loader />
            ) : "Sign in"}
          </Button>
          <Button type="submit" onClick={(e) => googleAuth(e)} className="text-light-3">
              <img
                src="/assets/icons/google.svg"
                alt="google"
                className="mr-2"
              />
              Login with Google
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-1">
            Don't have an account?
            <Link to='/sign-up' className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}
export default SigninForm;