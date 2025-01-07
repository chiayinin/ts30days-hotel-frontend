import { Header } from "@components";
import { Link } from "react-router-dom";

const Login = () => {
  return(<>
  <Header></Header>
  <h1>Login Page</h1>
  <form action="">
    <div className="space-y-2">
      <p className="text-primary-100 text-subtitle">享樂酒店，誠摯歡迎</p>
      <p>立即開始旅程</p>
    </div>
    <div>
      <div>
        <label htmlFor="">電子信箱</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">密碼</label>
        <input type="text" />
      </div>
      <div>
        <input type="text" />
        <label htmlFor="">記住帳號</label>
        <Link to="/forgot-password">忘記密碼？</Link>
      </div>
    </div>
    <button>會員登入</button>
    <p>沒有會員嗎？<Link to="/registration">前往註冊</Link></p>
  </form>
  </>)
};

export default Login;
