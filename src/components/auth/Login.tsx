import useAuth from "@/lib/hooks/useAuth";
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
  // logout()
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user !== null) {
  //     navigate("/rooms");
  //   }
  // }, [user]);

  return (
    <section className="h-[85vh] flex items-center">
      <section className="login-page flex flex-col min-h-[100%] justify-center items-center p-4">
        <form className="z-10 bg-[#fff1] w-[min(300px,80vw)] h-[min(250px,80vw)] p-4 rounded-lg flex flex-col gap-1 items-center justify-around backdrop-blur-md">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl font-bold tic">Login</h2>
            
          </div>
          {/* <Input type="email" placeholder="Email"  />
        <Input type="password" placeholder="Password" /> */}
          <Button
            type="button"
            variant="outline"
            className="hover:bg-accent/10 hover:text-inherit gap-4"
            onClick={login}
          >
            <img src="/google.png" alt="google" width="20px" height="20px" />
            Login with Google
          </Button>
        </form>
      </section>
    </section>
  );
}

export default Login;
