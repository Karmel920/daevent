import {Link} from "react-router-dom";
import {IoIosPeople} from "react-icons/io";
import RegisterForm from "./components/RegisterForm";

function Register() {
    return (
        <>
            <div className="flex justify-center align-middle">
                <IoIosPeople size="5em" className="text-color-main cursor-pointer"></IoIosPeople>
            </div>
            <div className="mx-auto md:max-w-md max-w-xs shadow-lg bg-color-dark rounded-lg h-[85vh]">
                <div className="bg-color-dark-light w-full px-8 flex justify-center text-color-light py-3 rounded-t-lg">
                    REGISTER
                </div>
                <p className="text-color-main flex justify-center md:pt-6 pt-4">
                    Find your ideal project
                </p>
                <div className="px-8">
                    <RegisterForm/>
                </div>
                <p className="text-color-light-gray flex justify-center md:pt-2 pt-1">
                    Already signed up?
                </p>
                <Link to='/login'>
                    <p className="text-color-main flex justify-center cursor-pointer">
                        Sign in
                    </p>
                </Link>
            </div>
        </>
    );
}

export default Register;
