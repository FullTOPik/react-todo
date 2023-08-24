import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import DefaultButton from "../DefaultButton";

const Header = ({ email, logout }: { email: string; logout: Function }) => {
  const navigate = useNavigate();
  return (
    <div style={{ width: "100vw", height: 100 }}>
      <span>{email}</span>
      <DefaultButton onClick={() => logout({ redirect: navigate })}>
        Logout
      </DefaultButton>
    </div>
  );
};

export default connect((store: any) => ({ email: store.auth.userInfo.email }), {
  logout,
})(Header);
