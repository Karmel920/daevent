import {Alert, Button, Textarea, TextInput} from "@mantine/core";
import {Link} from "react-router-dom";
import {IoMdArrowBack} from "react-icons/io";
import {useForm} from "@mantine/form";
import {useAuth} from "../../../context/AuthContext";
import {useMutation} from "react-query";
import {api} from "../../../api/ApiServices";
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router";
import {BiErrorCircle} from "react-icons/bi";

function UpdatePasswordContainer() {
    const form = useForm({
        initialValues: {
            old_password: '',
            new_password: '',
            confirm_password: '',
        },
        validate: {
            old_password: (value) => (value.length === 0 ? 'Fill the old password please' : null),
            new_password: (value) => (value.length === 0 ? 'Fill the new password please' :
                value.length < 8 ? 'Password must have at least 8 letters' :
                !/\d+/.test(value) ? 'Password must have at least 1 number' :
                !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value) ? 'Password must have at least 1 special sign' :
                !/[A-Z]+/.test(value) ? 'Password must have at least 1 upper letter' : null),
            confirm_password: (value) => (value.length === 0 ? 'Fill the password confirmation please' :
                value !== form.values.new_password ? 'Passwords are not the same' : null),
        },
    });

    const {logout} = useAuth();

    const submitHandle = data => {
        const token = localStorage.getItem("token");
        if (token) {
            changePasswordMutation.mutate(data)
        }
        else {
            logout();
        }
    };

    const navigate = useNavigate();

    const changePasswordMutation = useMutation(api.changePassword, {
        onSuccess: () => {
            notifications.show({
                title: 'Password changed',
                message: 'Password changed successfully!',
                color: 'green',
            });
            form.reset();
            navigate('/settings');
        }
    });

    return (
        <div className="pt-10">
            <div className="h-[80vh] w-10/12 rounded-lg bg-color-dark mx-auto">
                <div className="bg-color-dark-light rounded-t-lg py-2 px-3">
                    <div className="flex items-center gap-2">
                        <Link to='/settings'>
                            <IoMdArrowBack className="text-color-main text-lg sm:text-xl cursor-pointer"/>
                        </Link>
                        <h3 className="text-color-light text-sm sm:text-base">EDIT YOUR PASSWORD</h3>
                    </div>
                </div>
                <div className="">
                    <form className="flex flex-col p-3 py-5 gap-3 justify-center" onSubmit={form.onSubmit(submitHandle)}>
                        {changePasswordMutation.isError &&
                            <Alert icon={<BiErrorCircle size="1rem"/>} title="Wrong password!"
                                   color="color-error.6"
                                   variant="outline" pt={20}/>}
                        <TextInput
                            label="Old password"
                            radius="sm"
                            type={"password"}
                            px={10}
                            mb={10}
                            {...form.getInputProps('old_password')}
                        />
                        <TextInput
                            label="New password"
                            radius="sm"
                            type={"password"}
                            px={10}
                            mb={10}
                            {...form.getInputProps('new_password')}
                        />
                        <TextInput
                            label="Confirm new password"
                            radius="sm"
                            type={"password"}
                            px={10}
                            mb={10}
                            {...form.getInputProps('confirm_password')}
                        />
                        <div className="flex gap-6 justify-end pr-2.5">
                            <Link to="/settings">
                                <Button radius="sm" size="sm" color="color-dark-light.4"
                                        type={"button"}
                                        mt={30}
                                        mb={0}
                                        w={100}
                                >
                                    Cancel
                                </Button>
                            </Link>
                            <Button radius="sm" size="sm" color="color-main.4"
                                    type={"submit"}
                                    mt={30}
                                    mb={0}
                                    w={100}
                                    loading={changePasswordMutation.isLoading}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePasswordContainer;
