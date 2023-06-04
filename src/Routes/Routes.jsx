import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import AddTask from "../Pages/AddTask/AddTask";
import UpdateTask from "../Pages/UpdateTask/UpdateTask";


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
                loader:({params})=>fetch(`http://localhost:5000/tasks/${params.id}`)
            }

        ]
    },

]);