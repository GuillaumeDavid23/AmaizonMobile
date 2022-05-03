import { useSelector, useDispatch } from "react-redux";
import { setData } from "../redux/userSlice";

const doLogin = async (email, password) => {

    return fetch("http://192.168.1.138:8080/api/user/loginAgent", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((errors) => console.log(errors));;
};

export default doLogin;
