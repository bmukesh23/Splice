import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import { account } from "@/lib/appwrite/config";


const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();


  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount} = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: '',
      name: '',
      username: '',
      password: '',
    },
  })

  const handleGoogleLogin = async () => {
    try {
      const res = await account.createOAuth2Session(
        "google",
        "http://localhost:5173/", // Redirect URI after Google authentication
        "http://localhost:5173/sign-in" // Callback URL after Google authentication
      );
      
      // Handle success or redirect
      console.log(res);
      
      if (!res) {
        throw new Error("Failed to authenticate with Google");
      }
      
      let email: string | undefined;
      let name: string | undefined;
      let username: string | undefined;

      // Check if res is a URL
      if (res instanceof URL) {
        // Extract email, name, and username from the URL if available
        email = res.searchParams.get("email");
        name = res.searchParams.get("name");
        username = res.searchParams.get("username");
      }

      // Check if required data is available
      if (!email) {
        throw new Error("Email not provided by Google");
      }
      // Create a user account in Appwrite
      const newUser = await createUserAccount({ email, name, username });

      // Check if user creation was successful
      if (!newUser) {
        throw new Error("Failed to create user account");
      }

      // Sign in the user after account creation
      const session = await signInAccount({
        email: newUser.email,
        password: newUser.username, // Password is not needed as the user is authenticated with OAuth2
      });

      // Check if sign-in was successful
      if (!session) {
        throw new Error("Failed to sign in user");
      }

      // Navigate to the desired page after successful sign-in
      navigate('/');
    } catch (error) {
      console.error("Google authentication error:", error);
      // Handle error appropriately
    }
  };

  const onSubmit = async (values: z.infer<typeof SignupValidation>) => {

    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again" })
    }

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
        <h2 className="h3-bold md:h3-bold pt-4 sm:pt-4">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 text-center">Sign up to see photos and videos from your friends</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4 sm:w-80">
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
           <Button onClick={handleGoogleLogin} className="text-light-3">
              <img
                src="/assets/icons/google.svg"
                alt="google"
                className="mr-2"
              />
              Sign in with Google
          </Button>
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader/>
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link to='/sign-in' className="text-blue-400 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}
export default SignupForm;