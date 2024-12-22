import useAuth from "@/lib/hooks/useAuth";
import Logo from "../Logo";
import { Button } from "../ui/button";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);
  // const [error, setError] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (email === "" || password === "") {
  //     setError("Please fill in all fields");
  //   } else {
  //     setError("");
  //   }
  // };
  const { login } = useAuth();
  return (
    <section className="login-page flex flex-col min-h-[100%] justify-center items-center p-4">
      <form className="z-10 bg-[#fff1] w-[min(300px,80vw)] h-[min(250px,80vw)] p-4 rounded-lg flex flex-col gap-1 items-center justify-around backdrop-blur-md">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-outline">Login</h2>
          <Logo />
        </div>
        {/* <Input type="email" placeholder="Email"  />
        <Input type="password" placeholder="Password" /> */}
        <Button
          type="button"
          variant="outline"
          className="google"
          onClick={login}
        >
          Sign In with Google
          <img src="/google.png" alt="google" width="20px" height="20px" />
        </Button>
      </form>
    </section>
  );
}

export default Login;
