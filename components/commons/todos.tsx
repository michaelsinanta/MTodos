import React from "react";
import { CalendarIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { updatingDataState, accessTokenState, todosUpdateIdState, formDataState, isModalOpenState } from "../storage/storage";
import { useRecoilState } from "recoil";
import axios from "axios";
import toast from "../commons/toast";
import "react-toastify/dist/ReactToastify.css";

export default function Todos({ todos }) {
    const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
    const [todosUpdateId, setTodosUpdateId] = useRecoilState(todosUpdateIdState);
    const [formData, setFormData] = useRecoilState(formDataState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

    const updateData = () => {
        setTodosUpdateId(todos.id);
        setFormData({
            title : todos.title,
            content : todos.content,
            isDone : todos.isDone
        });
        setIsModalOpen(true);
    }

    const deleteData = () => {
        setUpdatingData(true)
        axios.delete(`https://compfest-oprec-be.up.railway.app/todos/${todos.id}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then(res => {
            setUpdatingData(false);
            toast.success("Successfully delete Todos!");
        }).catch(err => {
            setUpdatingData(false)
            toast.error("Something went wrong");
        })
    }

    return (
        <div className="shadow-lg bg-indigo-50 hover:shadow-indigo-700 hover:shadow-md transition-all duration-300 ease-in-out rounded-md flex flex-col p-4 w-full">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-indigo-600">
                    {todos.title}
                </h2>
                {todos.isDone === false ?
                    <MdCancel size={25} color="red" /> :
                    <AiFillCheckCircle size={25} color="blue" />
                }
            </div>

            <p className="text-gray-600 text-sm flex items-center mt-1">
                <CalendarIcon marginRight={8} />
                {new Date(todos.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
            </p>
            <div className="flex w-full border-1 border border-violet-300 my-3"></div>
            <p className="flex w-full text-gray-800 break-all ">
                {todos.content}
            </p>
            <div className="flex justify-center space-x-2 mt-5 mt-auto pt-5">
                <button className="flex items-center shadow-md space-x-2 bg-indigo-500 text-gray-100 p-2 rounded-3xl hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={updateData}><EditIcon /></button>
                <button className="flex items-center shadow-md space-x-2 bg-indigo-500 text-gray-100 p-2 rounded-3xl hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={deleteData}><DeleteIcon /></button>
            </div>
        </div>
    );
}