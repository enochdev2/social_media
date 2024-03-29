import { TiSocialLastFm } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SetTheme } from "../redux/theme";
import { Logout } from "../redux/userSlice";
import { fetcchPosts } from "../utils";

type State = any;

const TopBar = () => {
  const { theme } = useSelector((state: State) => state.theme);
  const { user } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(SetTheme(themeValue) as any);
  };

  const handleSearch = async (data: any) => {
    console.log("new");
    
    fetcchPosts(user.token, dispatch, "", data);
  };

  return (
    <div className="topbar w-full flex items-center justify-between py-2 md:py-2 md:pb-3  px-4 bg-primary rounded-lg ">
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TiSocialLastFm />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] font-semibold">
          Dev-Social
        </span>
      </Link>

      <form
        className="hidden sm:flex  items-center  justify-center mr-3"
        onSubmit={handleSubmit(handleSearch)}
      >
        <TextInput
          placeholder="Search..."
          styles=" w-[10rem]  md:w-[15rem] lg:w-[26rem]  rounded-l-full py-3 "
          register={register("search")}
        />
        <CustomButton
          title="Search"
          type="submit"
          containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
        />
      </form>

      {/* ICONS */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        <div className="hidden lg:flex">
          <IoMdNotificationsOutline />
        </div>

        <div>
          <CustomButton
            onClick={() => dispatch(Logout() as any)}
            title="Log Out"
            containerStyles="text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
