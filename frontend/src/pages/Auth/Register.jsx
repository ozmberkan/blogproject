import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { regInputs } from "~/data/data";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerService } from "~/redux/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "~/validations/schema";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const dispatch = useDispatch();

  const registerHandle = async (data) => {
    try {
      dispatch(registerService(data));
      toast.success("Kayıt başarılı. Giriş yapabilirsiniz.");
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 z-20">
      <h1 className="font-semibold text-center text-2xl pb-3 w-full border-b">
        Kayıt Ol
      </h1>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(registerHandle)}
      >
        {regInputs.map((input) => (
          <div
            key={input.id}
            className={`px-4 h-10 rounded-full border-2 w-80 text-sm transition-colors duration-300 flex items-center ${
              errors[input.name] ? "border-red-500 " : "border-gray-300"
            }`}
          >
            <input
              type={input.type}
              placeholder={input.placeholder}
              className={`h-full w-full outline-none transition-colors duration-300 font-medium ${
                errors[input.name]
                  ? "placeholder:text-red-500"
                  : "text-gray-500"
              }`}
              {...register(input.name, { required: true })}
            />
            <input.icon
              size={20}
              className={`text-neutral-400 ${
                errors[input.name] &&
                "text-red-500 transition-colors duration-300"
              }`}
            />
          </div>
        ))}
        <div className="w-full px-2 flex justify-between items-center">
          <Link
            to="/auth/login"
            className="text-sm font-medium hover:underline"
          >
            Hesabın var mı?
          </Link>
        </div>
        <button className="font-semibold text-white bg-emerald-600 py-1 rounded-full">
          Kayıt Ol
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

export default Register;
