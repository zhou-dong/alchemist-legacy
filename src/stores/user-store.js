import { herokuBaseURL, returnUrl } from "configs/config";
import { locationReplace } from "utils/window-helper";

const getLoginUrl = authName => {
  return herokuBaseURL + "/auth/" + authName + "?return=" + returnUrl;
};

const logOut = () => {
  localStorage.removeItem("auth_token");
  locationReplace();
};

const getUserImage = user => {
  return <img src={user.avatar} alt={user.username} width="30" />;
};

const getAvatar = user => {
  const image = getUserImage(user);
  return (
    (user && user.avatar && image()) || (user && user.username) || "Log In"
  );
};
