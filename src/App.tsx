import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from './components/ScrollToTop';
import './globals.css';
import { Loader } from './components/shared';
const SigninForm = lazy(() => import('./_auth/forms/SigninForm'));
const SignupForm = lazy(() => import('./_auth/forms/SignupForm'));
const AuthLayout = lazy(() => import('./_auth/AuthLayout'));
const RootLayout = lazy(() => import('./_root/RootLayout'));
const Home = lazy(() => import('./_root/pages/Home'));
const Explore = lazy(() => import('./_root/pages/Explore'));
const Saved = lazy(() => import('./_root/pages/Saved'));
const CreatePost = lazy(() => import('./_root/pages/CreatePost'));
const AllUsers = lazy(() => import('./_root/pages/AllUsers'));
const EditPost = lazy(() => import('./_root/pages/EditPost'));
const PostDetails = lazy(() => import('./_root/pages/PostDetails'));
const Profile = lazy(() => import('./_root/pages/Profile'));
const UpdateProfile = lazy(() => import('./_root/pages/UpdateProfile'));

const App = () => {
  
  return (
    <main className='flex h-screen'>
      <ScrollToTop />
      <Suspense fallback={<div className='flex-center justify-center items-center h-full w-full'><Loader/></div>}>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
          </Route>

          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/all-users' element={<AllUsers />} />
            <Route path='/update-post/:id' element={<EditPost />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route path='/profile/:id/*' element={<Profile />} />
            <Route path='/update-profile/:id/' element={<UpdateProfile />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </main>
  )
}

export default App;
