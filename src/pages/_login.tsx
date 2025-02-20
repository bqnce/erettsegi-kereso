import Topbar from "@/components/layout/Topbar.tsx";

const Login = () => {

    const darkMode: boolean = localStorage.getItem("theme") === "dark";

    return(
        <>
        <Topbar darkMode={darkMode}/>
         <div className="bg-[#070707] h-screen w-screen flex justify-center items-center">
            Login test
         </div>
        </>
    )
}

export default Login;