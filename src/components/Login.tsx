import useAuth from "../lib/hooks/useAuth";
import "./Login.css";

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
    <div className="login">
      <h2>Login</h2>
      <form>
        {/* <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit">Login</button> */}
        <button type="button" onClick={login}>
          Sign In with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
