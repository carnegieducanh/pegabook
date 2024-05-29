import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import SingleBook from "../OurBooks/SingleBook";
import AllBooks from "../OurBooks/AllBooks";
import Members from "../OurMembers/Members";
import Sharers from "../OurMembers/Sharers";
import SingleMember from "../OurMembers/SingleMember";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../dashboard/dashAdmin/Dashboard";
import DashboardLayout from "../dashboard/dashAdmin/DashboardLayout";
import ManageBooks from "../dashboard/dashAdmin/ManageBooks";
import AddMember from "../dashboard/dashAdmin/AddMember";
import EditMember from "../dashboard/dashAdmin/EditMember";
import ManageMembers from "../dashboard/dashAdmin/ManageMembers";
import DashSharerLayout from "../dashboard/dashSharer/DashSharerLayout";
import DashSharer from "../dashboard/dashSharer/DashSharer";
import YourBooks from "../dashboard/dashSharer/YourBooks";
import UploadBook from "../dashboard/dashSharer/UploadBook";
import YourProfile from "../dashboard/dashSharer/YourProfile";
import YourPassword from "../dashboard/dashSharer/YourPassword";
import YourEditBooks from "../dashboard/dashSharer/YourEditBooks";
import Signup from "../components/Signup";
import Login from "../components/Login";
import LoginSharer from "../components/LoginMember";
import LoginBorrower from "../components/LoginBorrower";
import Logout from "../components/Logout";
import BorrowedBooks from "../dashboard/dashSharer/BorrowedBooks";
import AddBorrower from "../dashboard/dashSharer/AddBorrower";
import SingleYourBook from "../dashboard/dashSharer/SingleYourBook";
import RemoveBorrower from "../dashboard/dashSharer/RemoveBorrower";
import ManageBorrower from "../dashboard/dashSharer/ManageBorrower";
import ReturnBook from "../dashboard/dashSharer/ReturnBook";
import Gratitude from "../components/Gratitude";
import ManageBorrowers from "../dashboard/dashAdmin/ManageBorrowers";
import YourBooksRead from "../dashboard/dashSharer/YourBooksRead";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/all-books",
                element: <AllBooks />,
            },
            {
                path: "/members",
                element: <Members />,
            },
            {
                path: "/sharers",
                element: <Sharers />,
            },
            {
                path: "/gratitude",
                element: <Gratitude />,
            },
            {
                path: "/book/:id",
                element: <SingleBook />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/book/${params.id}`
                    ),
            },
            {
                path: "/member/:id",
                element: <SingleMember />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },
        ],
    },
    {
        path: "/admin/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/admin/dashboard/main",
                element: <Dashboard />,
            },

            {
                path: "/admin/dashboard/manage",
                element: <ManageBooks />,
            },
            {
                path: "/admin/dashboard/add-member",
                element: <AddMember />,
            },

            {
                path: "/admin/dashboard/manage-members",
                element: <ManageMembers />,
            },

            {
                path: "/admin/dashboard/manage-borrower",
                element: <ManageBorrowers />,
            },

            {
                path: "/admin/dashboard/edit-members/:id",
                element: <EditMember />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },
        ],
    },
    {
        path: "/member/dashboard",
        element: <DashSharerLayout />,
        children: [
            {
                path: "/member/dashboard/:id",
                element: <DashSharer />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/add-borrower/:id",
                element: <AddBorrower />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/book/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/remove-borrower/:id",
                element: <RemoveBorrower />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/book/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/upload/:id",
                element: <UploadBook />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/manage/:id",
                element: <YourBooks />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/manage/borrower/:id",
                element: <ManageBorrower />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/borrowed-book/:id",
                element: <BorrowedBooks />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },

            {
                path: "/member/dashboard/read-book/:id",
                element: <YourBooksRead />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },

            {
                path: "/member/dashboard/return-book/:id",
                element: <ReturnBook />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/book/${params.id}`
                    ),
            },

            {
                path: "/member/dashboard/profile/:id",
                element: <YourProfile />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/changePassword/:id",
                element: <YourPassword />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/member/${params.id}`
                    ),
            },

            {
                path: "/member/dashboard/book/:id",
                element: <SingleYourBook />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/book/${params.id}`
                    ),
            },
            {
                path: "/member/dashboard/edit-books/:id",
                element: <YourEditBooks />,
                loader: ({ params }) =>
                    fetch(
                        `https://pega-book-server.onrender.com/book/${params.id}`
                    ),
            },
        ],
    },

    {
        path: "sign-up",
        element: <Signup />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "login-member",
        element: <LoginSharer />,
    },
    {
        path: "login-borrower",
        element: <LoginBorrower />,
    },
    {
        path: "logout",
        element: <Logout />,
    },
]);

export default router;
