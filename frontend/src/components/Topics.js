import {BsChevronDown} from "react-icons/bs";

function Topics() {
    return (
        <div className="topics mt-10">
            <div className="topics-header">
                <h2 className="text-lg text-color-dark-light">BROWSE TOPICS</h2>
            </div>
            <div className="text-lg flex flex-col gap-5 cursor-pointer mt-8">
                <ul className="topics-list text-color-light-gray flex flex-col gap-8 pr-4">
                    <li className="flex justify-between">
                        <span>All</span> <span className="bg-color-dark px-1.5 py-0.5">13</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Python</span> <span className="bg-color-dark px-1.5 py-0.5">15</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Ruby</span> <span className="bg-color-dark px-1.5 py-0.5">4</span>
                    </li>
                    <li className="flex justify-between">
                        <span>React</span> <span className="bg-color-dark px-1.5 py-0.5">2</span>
                    </li>
                </ul>
                <a className="flex text-color-main mt-4">
                    More
                    <BsChevronDown className="mt-1.5"/>
                </a>
            </div>
        </div>
    );
}

export default Topics;