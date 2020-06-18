import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/auth";

const axiosConfig = axios.create({
  baseURL: process.env.PING_API_URL,
});

const { currentUser } = useContext(AuthContext);


axiosConfig.defaults.headers.common['Authorization'] = 
