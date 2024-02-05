import PostForm from '@/components/forms/PostForm'
import addPost from '/assets/icons/add-post.svg'


const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img 
            src={addPost}
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        
        <PostForm/>
      </div>
    </div>
  )
}
export default CreatePost