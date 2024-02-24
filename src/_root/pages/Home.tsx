import { UserCard } from "@/components/shared";
import { Loader } from "@/components/shared";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";


const Home = () => {
    const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();
    const { data: creators, isLoading: isUserLoading, isError: isErrorCreators } = useGetUsers(10);

    if (isErrorPosts || isErrorCreators) {
        return (
            <div className="flex flex-1">
                <div className="home-container">
                    <p className="body-medium text-light-1">Something bad happened</p>
                </div>
                <div className="home-creators">
                    <p className="body-medium text-light-1">Something bad happened</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    {isPostLoading && !posts ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-col flex-1 gap-9 w-full ">
                            {posts?.documents.map((post: Models.Document) => (
                                <li key={post.$id} className="flex justify-center w-full">
                                    <PostCard post={post} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="home-creators">
                <h3 className="h3-bold text-light-1">Suggested for you</h3>
                {isUserLoading && !creators ? (
                    <Loader />
                ) : (
                    <ul className="grid 2xl:grid-cols-2 gap-6">
                        {creators?.documents.map((creator) => (
                            <li key={creator?.$id}>
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
export default Home;