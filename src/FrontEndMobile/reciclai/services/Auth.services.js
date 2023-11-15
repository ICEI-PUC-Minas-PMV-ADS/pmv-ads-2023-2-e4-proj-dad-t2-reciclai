import { BASE_URL } from './Urls';
import axios from "axios";

export const login = async (param) => {
    const user = {
        email: param.email.toLowerCase(),
        senha: param.senha
    }

    const res = await axios.post(`${BASE_URL}/usuarios/authenticate`, user)

    console.log(res.data)
    return res.data;
}