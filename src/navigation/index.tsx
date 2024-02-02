import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import Home from "../screen/Home";
import Jitsi from "../screen/Jitsi";
import LoginPage from "../screen/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "call",
        element: <Jitsi />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
]);

const RouterList = (props?: any) => {
    return <RouterProvider router={router} />
}

export default RouterList
