import { NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useEffect, useState } from "react";
import useCart from "../hooks/useCart";


function Header({screenWidth}:{screenWidth:number}) {
    const {totalCartItems} = useCart();
    const {setTheme} = useTheme();
    const [isHeaderRaised, setIsHeaderRaised] = useState<boolean>(false);
    const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
    const [logoYPosition, setLogoYPosition] = useState<number>(0);
    const [activeNavlink, setActiveNavlink] = useState<string>("portfolio");
    

    function raiseHeaderHandler() {
        const currentScrollY = window.scrollY;
        if (currentScrollY >= 80) {
            setIsHeaderRaised(true);
        }
        else{
            setIsHeaderRaised(false);
        }
        if (currentScrollY < 80) {
            setLogoYPosition(-100); 
        }
        else if (currentScrollY >= 80 && currentScrollY < 170) {
            setLogoYPosition(((currentScrollY-78)/90)*100);
        }
        else{
            setLogoYPosition(100);
        }
    };

    function openSettingHandler() {
        setIsSettingOpen(true);
        document.documentElement.style.overflow = "hidden";  
    };
    function closeSettingHandler() {
        setIsSettingOpen(false);
        document.documentElement.style.overflow = "unset";
    };

    useEffect(() => {
        window.addEventListener("scroll", raiseHeaderHandler);
        return() => window.removeEventListener("scroll", raiseHeaderHandler);
    }, []);

    if (!screenWidth) {
        return;   
    }
        
    return(//[box-shadow:0px_0px_1px_0.1px_var(--color-neutral-500)_inset]
        <header className="bg-white dark:bg-neutral-900 fixed top-0 left-0 w-full pt-2 z-20">
            <dialog open={isSettingOpen} className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur-[2px] bg-transparent"
                onClick={closeSettingHandler}
            >
                <div className="min-h-full max-w-3xl mx-auto flex justify-center items-center"
                    
                >
                    <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 w-lg h-100 rounded-2xl m-3"
                        onClick={(e) => {e.stopPropagation();}}
                    >

                        {/* Setting Top */}
                        <div className="border-b border-neutral-200 dark:border-neutral-700 flex items-end h-[12%] text-neutral-700 dark:text-neutral-400 gap-2 p-3">
                            <div className="w-5 h-5">
                                <svg className="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none"><path d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </div>
                            <div className="h-6 flex-1">
                                <input type="text" placeholder="Type a command or search..." className="text-neutral-800 dark:text-neutral-50 text-[14px] w-full outline-none border-none tracking-wider" />
                            </div>
                            <button className="w-5 h-5"
                                onClick={closeSettingHandler}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                            </button>
                        </div>

                        {/* Setting Option List */}
                        <div className="h-[76%] overflow-y-scroll thin_scrollbar px-3 relative">
                            <div className="sticky bg-linear-180 from-neutral-50 dark:from-neutral-800 from-15% to-transparent to-100% top-0 -left-10 h-10"></div>


                            <div className="text-neutral-700 dark:text-neutral-300 text-sm flex flex-col">
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 font-medium">Menu</div>
                                <NavLink to={"/"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className="">
                                        <div className="w-4 h-4">
                                            <svg
                                                width="30"
                                                height="35"
                                                viewBox="0 0 65 35"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-full h-full stroke-none fill-neutral-700 dark:fill-neutral-200"
                                            >
                                                <polygon points="30,0 5,0 5,5 30,5"></polygon>
                                                <polygon points="5,5 0,5 0,30 5,30"></polygon>
                                                <polygon points="5,30 5,35 25,35 25,30"></polygon>
                                                <polygon points="25,20 25,30 30,30 30,20"></polygon>
                                                <polygon points="15,15 15,20 25,20 25,15"></polygon>

                                                <polygon points="65,0 60,0 40,15 40,0 35,0 35,35 40,35 40,20 60,35 65,35" className="fill-neutral-800 dark:fill-neutral-300/90" />
                                            </svg>
                                        </div>
                                    </span>
                                    <span>Home</span>
                                </NavLink>
                                <NavLink to={"/about"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" fill="currentColor"></path></svg></span>
                                    <span>About</span>
                                </NavLink>
                                <NavLink to={"/contact"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg></span>
                                    <span>Contact</span>
                                </NavLink>
                            </div>

                            <div className="text-neutral-700 dark:text-neutral-300 text-sm flex flex-col gap-1">
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 font-medium">Portfolio</div>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg" onClick={() => {
                                    window.location.href = "/#about";
                                    closeSettingHandler();
                                }}>
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5h6"></path><path d="M15 12h6"></path><path d="M3 19h18"></path><path d="m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12"></path><path d="M3.92 10h6.16"></path></svg></span>
                                    <span>About</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg" onClick={() => {
                                    window.location.href = "/#guthub_contributions";
                                    closeSettingHandler();
                                }}>
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">*/}
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                                            {/*</svg>*/}

                                        </svg>
                                    </span>
                                    <span>GitHub Contributions</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg" onClick={() => {
                                    window.location.href = "/#recent_commits";
                                    closeSettingHandler();
                                }}>
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                                        </svg>
                                    </span>
                                    <span>Recent Commits</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg" onClick={() => {
                                    window.location.href = "/#tech_stack";
                                    closeSettingHandler();
                                }}>
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path></svg></span>
                                    <span>Tech Stack</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg" onClick={() => {
                                    window.location.href = "/#experience";
                                    closeSettingHandler();
                                }}>
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 12h.01"></path><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path><path d="M22 13a18.15 18.15 0 0 1-20 0"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg></span>
                                    <span>Experience</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg" onClick={() => {}}>
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"></path><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m7 10 5 5 5-5"></path></svg></span>
                                    <span>Download Resume</span>
                                </button>
                            </div>

                            <div className="text-neutral-700 dark:text-neutral-300 text-sm flex flex-col gap-1">
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 font-medium">Menu</div>
                                <NavLink to={"/aaaaaaaaa"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12 2.182a1.636 1.636 0 1 0 0 3.273 1.636 1.636 0 0 0 0-3.273ZM8.182 3.818a3.818 3.818 0 1 1 2.002 3.36l-3.006 3.006c.125.23.226.474.3.725h9.044A3.82 3.82 0 0 1 24 12a3.818 3.818 0 0 1-7.478 1.092H7.478c-.098.33-.241.647-.425.939l2.917 2.917a3.818 3.818 0 1 1-1.442 1.644L5.41 15.47a3.818 3.818 0 1 1 .225-6.831l3.007-3.005a3.801 3.801 0 0 1-.46-1.817ZM18.546 12v.004a1.636 1.636 0 1 0 0-.008V12ZM3.818 10.364a1.636 1.636 0 1 0 0 3.272 1.636 1.636 0 0 0 0-3.272Zm6.546 9.818a1.636 1.636 0 1 1 3.272 0 1.636 1.636 0 0 1-3.272 0Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
                                    <span>Project1</span>
                                </NavLink>
                                <NavLink to={"/aaaaaaaaa"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg></span>
                                    <span>Project2</span>
                                </NavLink>
                                <NavLink to={"/aaaaaaaaa"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-4 h-4"><path d="M237.66,133.66l-96,96A8,8,0,0,1,128,224V184H48a16,16,0,0,1-16-16V88A16,16,0,0,1,48,72h80V32a8,8,0,0,1,13.66-5.66l96,96A8,8,0,0,1,237.66,133.66Z" fill="currentColor"></path></svg></span>
                                    <span>Project3</span>
                                </NavLink>
                            </div>


                            <div className="text-neutral-700 dark:text-neutral-300 text-sm flex flex-col gap-1">
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 font-medium">Social Links</div>

                                <NavLink to={"https://github.com/GouravKotnala777"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-none" viewBox="-1 -1 26 26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path className="stroke-neutral-800 dark:stroke-neutral-200" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                                        </svg>
                                    </span>
                                    <span>GitHub</span>
                                </NavLink>
                                <NavLink to={"https://www.linkedin.com/in/gourav-kotnala-003427295"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-none" viewBox="0 0 24 24" strokeWidth="1.4" stroke-linecap="round" stroke-linejoin="round">
                                            <path className="stroke-neutral-800 dark:stroke-neutral-200" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225z"></path>
                                        </svg>
                                    </span>
                                    <span>LinkedIn</span>
                                </NavLink>
                                <NavLink to={"/#########"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-none" viewBox="0 0 24 24" strokeWidth="1.6">
                                            <path className="stroke-neutral-800 dark:stroke-neutral-200" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                        </svg>
                                    </span>
                                    <span>Twitter</span>
                                </NavLink>
                                <NavLink to={"/#########"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-none" viewBox="-5 -20 140 130" strokeWidth="8" stroke-linecap="round" stroke-linejoin="round">
                                            <path className="stroke-neutral-800 dark:stroke-neutral-200" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"></path>
                                        </svg>
                                    </span>
                                    <span>Discord</span>
                                </NavLink>
                                <NavLink to={"/###########"} className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg">
                                    <span className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.6" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 fill-none">
                                            <rect className="stroke-neutral-800 dark:stroke-neutral-200" width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                            <path className="stroke-neutral-800 dark:stroke-neutral-200" d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line className="stroke-neutral-800 dark:stroke-neutral-200" x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                        </svg>
                                    </span>
                                    <span>Instagram</span>
                                </NavLink>

                                
                            </div>


                            <div className="text-neutral-700 dark:text-neutral-300 text-sm flex flex-col gap-1">
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-4 font-medium">Theme</div>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg"
                                    onClick={() => {
                                        setTheme("dark");
                                        closeSettingHandler();
                                    }}
                                >
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 3v1"></path><path d="M12 20v1"></path><path d="M3 12h1"></path><path d="M20 12h1"></path><path d="m18.364 5.636-.707.707"></path><path d="m6.343 17.657-.707.707"></path><path d="m5.636 5.636.707.707"></path><path d="m17.657 17.657.707.707"></path></svg></span>
                                    <span>Light</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg"
                                    onClick={() => {
                                        setTheme("light");
                                        closeSettingHandler();
                                    }}
                                >
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 5h4"></path><path d="M20 3v4"></path><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg></span>
                                    <span>Dark</span>
                                </button>
                                <button className="flex items-center gap-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 py-2 px-3 rounded-lg"
                                    onClick={() => {}}
                                >
                                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path><path d="M12 3l0 18"></path><path d="M12 9l4.65 -4.65"></path><path d="M12 14.3l7.37 -7.37"></path><path d="M12 19.6l8.85 -8.85"></path></svg></span>
                                    <span>Auto</span>
                                </button>
                            </div>




                            <div className="sticky bg-linear-0 from-neutral-50 dark:from-neutral-800 from-15% to-transparent to-100% bottom-0 -left-10 h-10"></div>
                        </div>

                        {/* Setting Bottom */}
                        <div className="border-t border-neutral-200 dark:border-neutral-700 flex justify-between items-center h-[12%] p-3">
                            <div className="w-6 h-6">
                                <svg
                                    width="30"
                                    height="35"
                                    viewBox="0 0 65 35"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full stroke-none fill-neutral-700 dark:fill-neutral-200"
                                >
                                    <polygon points="30,0 5,0 5,5 30,5"></polygon>
                                    <polygon points="5,5 0,5 0,30 5,30"></polygon>
                                    <polygon points="5,30 5,35 25,35 25,30"></polygon>
                                    <polygon points="25,20 25,30 30,30 30,20"></polygon>
                                    <polygon points="15,15 15,20 25,20 25,15"></polygon>

                                    <polygon points="65,0 60,0 40,15 40,0 35,0 35,35 40,35 40,20 60,35 65,35" className="dark:fill-neutral-300/90" />
                                </svg>
                            </div>
                            <div className="flex gap-5 text-xs">
                                <div className="">
                                    <span className="text-neutral-800 dark:text-neutral-100 font-semibold">Go to Page</span>
                                    <span className="p-1 bg-neutral-100 dark:bg-neutral-750 text-neutral-500 dark:text-neutral-300 [box-shadow:-2px_-2px_1px_0.1px_#00000010_inset] dark:[box-shadow:-2px_-2px_1px_0.1px_#ffffff10_inset] font-roboto rounded-sm [font-size:var(--text-xs)] ml-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="size-3 inline" aria-hidden="true"><path d="M20 4v7a4 4 0 0 1-4 4H4"></path><path d="m9 10-5 5 5 5"></path></svg></span>
                                </div>
                                <div>
                                    <span className="text-neutral-600 dark:text-neutral-300 font-semibold">Exit</span>
                                    <span className="p-1 bg-neutral-100 dark:bg-neutral-750 text-neutral-500 dark:text-neutral-300 [box-shadow:-2px_-2px_1px_0.1px_#00000010_inset] dark:[box-shadow:-2px_-2px_1px_0.1px_#ffffff10_inset] font-roboto rounded-sm [font-size:var(--text-xs)] ml-1">Esc</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </dialog>
            <div className="bg-linear-90 from-green-500 to-pink-500 dark:from-green-800 dark:to-pink-800 border-y border-neutral-100 dark:border-neutral-800 mx-2">
                <div className={`border-x border-neutral-100 dark:border-neutral-800 max-w-3xl mx-auto transition-all ease-in-out duration-500
                    ${isHeaderRaised&&"[box-shadow:0px_3px_20px_0.2px_var(--color-neutral-300)] dark:[box-shadow:0px_3px_20px_0.2px_var(--color-neutral-700)]"}
                `}>
                    <div className="flex justify-between items-center">
                        <div className="text-neutral-700 dark:text-neutral-200">
                            <div className="border border-neutral-100 dark:border-neutral-800 size-11 rounded-full overflow-hidden relative">
                                <div className={`z-2 absolute top-0 left-0 h-full w-full rounded-full p-1`}
                                    style={{
                                        top:`${100-logoYPosition}%`
                                    }}
                                >
                                    <img src="logo.png" alt="logo.png" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-neutral-700 dark:text-neutral-200">
                            {   screenWidth > 640 &&
                                [{name:"Home", url:"/"},{name:"About", url:"/about"},{name:"Contact", url:"/contact"}].map(({name, url}) => (
                                    <NavLink to={url} onClick={() => setActiveNavlink(name)} className={`${activeNavlink === name&&"underline underline-offset-5"}`}>{name}</NavLink>
                                ))
                            }
                            <button className="border border-neutral-100 dark:border-neutral-900 [box-shadow:0px_0px_2px_0.1px_var(--color-neutral-200)_inset] dark:[box-shadow:0px_0px_2px_0.1px_var(--color-neutral-700)_inset] py-1 my-2 px-3 rounded-2xl flex justify-between items-center gap-1"
                                onClick={openSettingHandler}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"
                                        className="size-4 text-neutral-500 dark:text-neutral-400"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d={"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"} />
                                    </svg>
                                </span>
                                <span className="bg-neutral-100 dark:bg-neutral-800 opacity-80 text-neutral-500 dark:text-neutral-300 [box-shadow:-2px_-2px_1px_0.1px_#00000010_inset] dark:[box-shadow:-2px_-2px_1px_0.1px_#ffffff10_inset] font-roboto rounded-sm p-1 [font-size:var(--text-xs)]">Ctrl</span>
                                <span className="bg-neutral-100 dark:bg-neutral-800 opacity-80 text-neutral-500 dark:text-neutral-300 [box-shadow:-2px_-2px_1px_0.1px_#00000010_inset] dark:[box-shadow:-2px_-2px_1px_0.1px_#ffffff10_inset] font-roboto rounded-sm p-1 [font-size:var(--text-xs)]">K</span>
                            </button>

                            <button
                                className="relative"
                                onClick={() => {}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <span className="absolute -top-2 -right-2 text-xs bg-red-500 w-4 h-4 rounded-full">{totalCartItems}</span>
                            </button>

                            {   screenWidth <= 640 &&
                                <button className="flex flex-col gap-1 p-3"
                                    onClick={openSettingHandler}
                                >
                                    <span className="w-4 h-0.5 rounded-px bg-neutral-700 dark:bg-neutral-200"></span>
                                    <span className="w-4 h-0.5 rounded-px bg-neutral-700 dark:bg-neutral-200"></span>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;