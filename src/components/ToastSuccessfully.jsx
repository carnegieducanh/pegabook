import React from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const ToastSuccessfully = () => {
    return (
        <div className="flex flex-col gap-4">
            <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                    Item moved successfully.
                </div>
                <Toast.Toggle />
            </Toast>
        </div>
    );
};

export default ToastSuccessfully;
