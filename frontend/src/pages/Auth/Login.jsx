import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { logInputs } from "~/data/data";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginService } from "~/redux/slices/userSlice";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandle = async (data) => {
    try {
      dispatch(loginService(data));
      toast.success("Başarıyla giriş yaptınız.");
      navigate("/");
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 z-20">
      <h1 className="font-semibold text-center text-2xl pb-3 w-full border-b">
        Oturum aç
      </h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(loginHandle)}
      >
        {logInputs.map((input) => (
          <div
            key={input.id}
            className="px-4 h-10 rounded-full border-2 w-80 text-sm  flex items-center"
          >
            <input
              type={input.type}
              placeholder={input.placeholder}
              className="h-full w-full outline-none font-medium"
              {...register(input.name)}
            />
            <input.icon size={20} className="text-neutral-400" />
          </div>
        ))}

        <div className="w-full px-2 flex justify-between items-center">
          <Link
            to="/auth/register"
            className="text-sm font-medium hover:underline"
          >
            Hesabın yok mu?
          </Link>
          <Link
            to="/auth/forgot-password"
            className="text-sm font-medium hover:underline"
          >
            Parolamı Unuttum
          </Link>
        </div>
        <button className="font-semibold text-white bg-emerald-600 py-1 rounded-full">
          Oturum aç
        </button>
      </form>
      <div className="flex flex-col gap-3">
        <div className="flex items-center w-80">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">YA DA</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className="flex bg-white w-full gap-x-2 items-center border px-4 py-2 rounded-full font-semibold justify-center hover:bg-slate-50 transition-colors duration-300"
        >
          <FcGoogle size={20} /> Google ile devam et
        </button>
      </div>
    </div>
  );
};

export default Login;
