import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AddTask/AddTask";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";
import Error from "../Pages/ErrorPage/Error";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addtask',
                element: <AddTask></AddTask>
            },
            {
                path:'/updatetask/:id',
                element:<UpdateTask></UpdateTask>,
                loader:({params})=>fetch(`https://assignment-server-side-pink.vercel.app/tasks/${params.id}`)
            }

        ]
    },
    {
        path:'*',
        element:<Error></Error>
    }

]);