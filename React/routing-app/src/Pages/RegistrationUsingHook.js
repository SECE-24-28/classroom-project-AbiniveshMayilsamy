import { useForm } from "react-hook-form";
const RegistrationUsingHook = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <h1>RegistrationUsingHook Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} type="text"></input>
        <label>Age</label>
        <input {...register("age")} type="number"></input>
        <label>Email</label>
        <input {...register("email")} type="email"></input>
        <label>Password</label>
        <input {...register("password")} type="password"></input>
        <label>College Name</label>
        <input {...register("clgName")} type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationUsingHook;
