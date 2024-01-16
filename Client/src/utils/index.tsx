import axios from "axios";
import { SetPosts } from "../redux/postSlice";
import { Dispatch } from "@reduxjs/toolkit";


 const API_URI = "http://localhost:3000";

 export const Api = axios.create({ 
    baseURL : API_URI,
   responseType: "json",
}
);
 export const apiRequest = async ({ url, token, data, method}:{url:string, token?:string, data?:any, method: any}) =>{
    try {
        const results = await Api(url,{
            method: method || "GET",
            data: data, 
            Headers: {
                "content-type": "application/json",
                Authorization: token ? `Bearer ${token}` : " ",
            }
        });
        return results?.data;
    } catch(error:Error) {
     const err = error.reesponse.data ;
     console.log(err);
     return {status: err.success, message: err.message };
    }
 }

 export const  handleFileUpload = async (uploadFile:any) =>{
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "social_media");

  try {
      const response = await axios.post(`http://api.cloudinary.com/v1_1/${process.env.VITE_APP_CLOUDINARY_ID}/image/upload/`, formData 
      );
      return response.data.secure_url;
  } catch (error) {
    console.log(error)
  }
 }


 export const fetcchPosts = async(token:string, dispatch: Dispatch, uri:string, data:any)=>{
    try {
        const res = await apiRequest({
            url: uri || "/posts", 
            token: token,
            method: "POST",
            data: data || {},
        });
        dispatch(SetPosts(res?.data)as any);
        return;
    } catch (error) {
        console.log(error);
        
    }

 }
 export const likePosts = async(token:string, uri:string, )=>{
    try {
        const res = await apiRequest({
            url: uri, 
            token: token,
            method: "POST",    
        });

        return res;
    } catch (error) {
        console.log(error);
        
    }

 }
 export const deletePosts = async(token:string, uri:string, )=>{
    try {
        const res = await apiRequest({
            url: "posts/" + uri, 
            token: token,
            method: "DELETE",    
        });

        return res;
    } catch (error) {
        console.log(error);
        
    }

 }

 export const getUserInfo = async(token:string, id:string | number, )=>{
    try {
        const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;
        const res = await apiRequest({
            url: uri, 
            token: token,
            method: "POST",    
        });
        
        if(res?.message === "Authentication failed") {
            localStorage.removeItem("user");
            window.alert("User session expired, Login again.");
            window.location.replace("/login");
        }

        return res?.user;
    } catch (error) {
        console.log(error);
        
    }

 }

 export const viewUserProfile = async(token:string, id:string | number, )=>{
    try {
        const res = await apiRequest({
            url: "/users/profile-view", 
            token: token,
            method: "POST",
            data: { id },    
        });

        return res;
    } catch (error) {
        console.log(error);
        
    }

 }
 export const sendFriendRequest = async(token:string, id:string | number, )=>{
    try {
        const res = await apiRequest({
            url: "/users/friend-request", 
            token: token,
            method: "POST",
            data: {requesTo: id}    
        });

        return res;
    } catch (error) {
        console.log(error);
        
    }

 }