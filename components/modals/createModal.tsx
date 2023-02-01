import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { formDataState, isModalOpenState, accessTokenState, updatingDataState, todosUpdateIdState } from "../storage/storage";
import { useRecoilState } from "recoil";
import toast from "../commons/toast";
import "react-toastify/dist/ReactToastify.css";

export default function CreateModal(){
    const [formData, setFormData] = useRecoilState(formDataState);
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
    const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
    const [updatingData, setUpdatingData] = useRecoilState(updatingDataState);
    const [todosUpdateId, setTodosUpdateId] = useRecoilState(todosUpdateIdState);

    const initialState = {
        'title': '', 'content': '', 'isDone': false
    }
    
    const handleFormChange = (event) => {
        setFormData(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleCheckboxChange = (event) => {
        setFormData(prev => ({...prev, 'isDone': event.target.checked}));
    }
      
    const handleFormSubmit = (event) => {
        setUpdatingData(true);
        event.preventDefault();
        // submit credentials
        if (todosUpdateId){
            fetch(`https://compfest-oprec-be.up.railway.app/todos/${todosUpdateId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title : formData.title,
                    content : formData.content,
                    isDone: formData.isDone,
                }),
                })
                .then(response => {
                    setUpdatingData(false);
                    setIsModalOpen(false);
                    setFormData(initialState);
                    setTodosUpdateId(null);
                    toast.success("Successfully update Todos!")
                }).catch(err =>{
                    toast.error("Something went wrong! Check your input.")
                })
        } else {
            fetch('https://compfest-oprec-be.up.railway.app/todos', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title : formData.title,
                    content : formData.content,
                    isDone: formData.isDone,
                }),
                })
                .then(response => {
                    setUpdatingData(false);
                    setIsModalOpen(false);
                    setFormData(initialState);
                    setTodosUpdateId(null);
                    toast.success("Successfully add Todos!")
                }).catch(err =>{
                    toast.error("Something went wrong! Check your input.")
                })
        }
      }
    return (
        <Transition show={ isModalOpen } as={ Fragment }>
            <Dialog as="div" className="fixed inset-0 z-50" onClose={ setIsModalOpen }>
                <Transition.Child
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed flex inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0">
                    <div className="flex justify-center p-4 mt-10">
                        <Transition.Child
                            as={ Fragment }
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className= 'w-full flex flex-col space-y-2 max-w-[500px] max-h-[90vh] overflow-y-auto card-color rounded-3xl bg-white' >
                                <div className="flex items-center justify-start px-4 pt-4">
                                    <div className="flex items-center justify-center hover-animation w-9 h-9"
                                        onClick={ () => {
                                            setIsModalOpen(false);
                                            setFormData(initialState);
                                            setTodosUpdateId(null);
                                        } }
                                    >
                                        <CloseIcon width={10}/>
                                    </div>
                                </div>

                                <form 
                                        id="login"
                                        onSubmit={event => handleFormSubmit(event)} 
                                        className="flex flex-col px-8 pb-7" 
                                    >
                                <div className="w-full space-y-2">
                                    <label className="text-sm font-medium md:text-base">Title</label>

                                    <input type="text" placeholder="Enter your title" defaultValue={formData.title} name="title" className="w-full p-2 bg-inherit border-2 rounded-lg outline-none border-[#6E7198]" onChange={event => handleFormChange(event)} />
                                </div>

                                <div className="w-full space-y-2 mt-2">
                                    <label className="text-sm font-medium md:text-base">Description</label>

                                    <input type="text" placeholder="Enter your description" defaultValue={formData.content} name="content" className="w-full p-2 bg-inherit border-2 rounded-lg outline-none border-[#6E7198]" onChange={event => handleFormChange(event)}/>
                                </div>

                                <div className="w-full mt-4 space-x-3 flex items-center">
                                    <input type="checkbox" name="isDone" checked={formData.isDone} onChange={handleCheckboxChange} className="w-4 h-4"/>
                                    <label className="text-base">Completed</label>
                                </div>
                               
                                <div className="flex justify-end">
                                    <button disabled={ !formData.title|| !formData.content} type="submit" className="bg-indigo-500 text-gray-100 py-2 px-5 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none">
                                        Upload
                                    </button>
                                </div>
                                 
                                </form>
                                
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}