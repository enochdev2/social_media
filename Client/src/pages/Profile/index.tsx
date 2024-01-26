import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../../components";
import { deletePosts, fetcchPosts, getUserInfo, likePosts } from "../../utils";
type User = any;
const Profile = () => {
  const { id } = useParams() as any;
  const dispatch = useDispatch();
  const { user } = useSelector((state: User) => state.user);
  const { posts } = useSelector((state:any) => state.posts);
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);


const uri = "/posts/get-user-post/" + id;

  const getUser = async () => {
    const res = await getUserInfo(user?.token, id)
    setUserInfo(res);
  };

  const getPosts = async () => {
     await fetcchPosts(user?.token, dispatch, uri);
     setLoading(false);
  }

  const handleDelete = async (id:string) => {
    await  deletePosts(id, user?.token);
    await getPosts();
    // window.location.reload();
  };

  const handleLikePost = async(uri:string) => {
    await likePosts(uri,user?.token);
    await getPosts();
  };

  useEffect(()=>{
    setLoading(true);
    getUser();
    getPosts();
  }, [id]);

  return (
    <>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-y-auto">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 min-h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 min-h-full md:flex flex-col gap-6 ">
            <ProfileCard user={userInfo} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>

          {/* CENTER */}
          <div className=" flex-1 h-full bg-orimary px-4 flex flex-col gap-6 overflow-y-auto">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post: any) => (
                <PostCard
                  post={post}
                  key={post?._id}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
