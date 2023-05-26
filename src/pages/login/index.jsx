import { Input, Button } from "react-daisyui";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { login } from "../api/users";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      if (!localStorage.getItem("token")) {
        console.log(data)
        localStorage.setItem("token", data);
        queryClient.setQueryData("token", data);
      }
      // push("/");
      window.location.replace("/")
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate(user);
  };
  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-1 px-8 py-4 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-8 xl:px-16 dark:bg-gray-800 dark:text-gray-100">
	<div className="flex flex-col justify-between">
		<div className="space-y-2">
		</div>
		<img src="https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="p-3 h-52 md:h-auto w-100 rounded-full border-8 border-blue-500 md:border-green-500" />
	</div>
  <div className="grid grid-cols-12 py-10 my-10">
      <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
      <h2 className="text-4xl font-bold leading-tight lg:text-5xl py-5 my-5">Login</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <Input
              onChange={onChangeHandler}
              className="w-full"
              type="text"
              placeholder="Username"
              name="username"
            />
          </div>
          <div className="mb-4">
            <Input
              onChange={onChangeHandler}
              className="w-full"
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <Button className="block w-full bg-accent">Login</Button>
          <p className="flex justify-center">Dont have an account?</p><a href="/register" className="text-blue-500 flex justify-center">Sign up here</a>
        </form>
      </div>
    </div>
</div>
    // <div className="grid grid-cols-12 py-10 my-10">
    //   <div className="sm:col-start-5 sm:col-span-4 col-span-10 col-start-2">
    //     <form onSubmit={onSubmitHandler}>
    //       <div className="mb-4">
    //         <Input
    //           onChange={onChangeHandler}
    //           className="w-full"
    //           type="text"
    //           placeholder="Username"
    //           name="username"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <Input
    //           onChange={onChangeHandler}
    //           className="w-full"
    //           type="password"
    //           placeholder="Password"
    //           name="password"
    //         />
    //       </div>
    //       <Button className="block w-full bg-accent">Login</Button>
    //     </form>
    //   </div>
    // </div>
  );
}
