import { Models } from "appwrite";
import LikeIcon from "/assets/icons/like.svg";
import UnSavedIcon from "/assets/icons/save.svg";
import SavedIcon from "/assets/icons/bookmark.svg";
import LikedIcon from "/assets/icons/liked.svg";
import { useDeleteSavedPost, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutation";
import { useState } from "react";
import { checkIsLiked } from "@/lib/utils";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
    const likesList = post.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavedPost } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId);

        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId);
        } else {
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({ postId: post.$id, likesArray: newLikes });
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.$id === post.$id);

        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id);
        } else {
            savePost({ postId: post.$id, userId })
            setIsSaved(true);
        }
    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img
                    src={`${checkIsLiked(likes, userId) ? LikedIcon : LikeIcon}`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={isSaved ? SavedIcon : UnSavedIcon}
                    alt="save"
                    width={20}
                    height={20}
                    onClick={handleSavePost}
                    className="cursor-pointer"
                />
            </div>
        </div>
    )
}
export default PostStats; 