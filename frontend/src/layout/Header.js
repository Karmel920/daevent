import {IoIosPeople} from "react-icons/io"
import avatar from "../public/images/icons/avatar.svg"
import {Link} from "react-router-dom";
import {Avatar, Button, createStyles, Menu, TextInput} from "@mantine/core";
import {BsChevronDown} from "react-icons/bs";
import {AiOutlineHome, AiOutlineSearch, AiOutlineUser} from "react-icons/ai";
import {IoLogOutOutline, IoSettingsOutline} from "react-icons/io5";
import {useAuth, UserContext} from "../context/AuthContext";
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {useForm} from "@mantine/form";

const useStyles = createStyles((theme) => ({
    menu: {
        '&:hover': {
            backgroundColor: "#51546e",
        },
        'z-index': 2,
    },
}));

function Header() {
    const {classes} = useStyles();
    const [userData, setUserData] = useState();
    const {user} = useAuth();
    const {logout} = useAuth();

    const form = useForm({
        initialValues: {
            query_search: '',
        },
    });

    const submitHandle = data => {
        navigate(`/projects/${data.query_search}`);
        form.reset();
    };

    useEffect(() => {
        setUserData(user);
    }, [user])

    const navigate = useNavigate();

    const logoutHandle = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="bg-color-dark w-full fixed">
            <div className="w-11/12 max-w-[1440px] flex justify-between mx-auto sm:px-6 pb-3 pt-5">
                <div className="flex justify-center align-middle">
                    <Link to='/' className="hidden sm:block">
                        <IoIosPeople size="3em" className="text-color-main cursor-pointer"></IoIosPeople>
                    </Link>
                    <Link to='/' className="hidden lg:block">
                        <p className="text-xl pl-5 pt-2.5 font-semibold text-color-light cursor-pointer">DaEvent</p>
                    </Link>
                </div>
                <div className="flex items-center justify-start lg:ml-20 sm:ml-5 w-full">
                    <form className="lg:w-2/5 md:w-3/5 w-4/5" onSubmit={form.onSubmit(submitHandle)}>
                        <TextInput
                            placeholder="Search Projects..."
                            radius="sm"
                            size="md"
                            w={"100%"}
                            icon={<AiOutlineSearch size="1.2rem"/>}
                            styles={{input: {backgroundColor: "#51546e", borderWidth: "0px"}}}
                            {...form.getInputProps('query_search')}
                        />
                    </form>
                </div>
                <div className="flex gap-4 items-center">
                    <Link to={`/profile/${user?.id}`} className="hidden sm:block">
                        <Avatar src={`${process.env.REACT_APP_API_URL}${user?.avatar}`}
                                alt="Avatar"
                                radius="xl"
                                sx={{
                                    'cursor': "pointer"
                                }}
                        />
                    </Link>
                    <div className="md:w-32 md:block hidden">
                        <p className="text-color-gray cursor-pointer">{user?.full_name}</p>
                        <Link to={`/profile/${user?.id}`}>
                            <p className="text-color-main cursor-pointer">@{user?.username}</p>
                        </Link>
                    </div>
                    <Menu width={200} shadow="md" position="bottom">
                        <Menu.Target>
                            <Button rightIcon={<BsChevronDown className="mt-1"/>}
                                    color="color-main.3"
                                    styles={{root: {color: "#2d2d39", borderWidth: "0px"}}}
                            >
                                Menu
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item component="a" href="/" className={classes.menu}>
                                <div className="flex items-center gap-2">
                                    <AiOutlineHome/>
                                    Home
                                </div>
                            </Menu.Item>
                            <Menu.Item component="a" href={`/profile/${user?.id}`} className={classes.menu}>
                                <div className="flex items-center gap-2">
                                    <AiOutlineUser/>
                                    Profile
                                </div>
                            </Menu.Item>
                            <Menu.Item component="a" href="/settings" className={classes.menu}>
                                <div className="flex items-center gap-2">
                                    <IoSettingsOutline/>
                                    Settings
                                </div>
                            </Menu.Item>
                            <Menu.Item className={classes.menu}>
                                <div className="flex items-center gap-2" onClick={logoutHandle}>
                                    <IoLogOutOutline/>
                                    Logout
                                </div>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
