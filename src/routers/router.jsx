import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";
import DashboardLayout from "../dashboard/dashAdmin/DashboardLayout";
import DashSharerLayout from "../dashboard/dashSharer/DashSharerLayout";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import LoginSharer from "../components/auth/LoginMember";
import LoginBorrower from "../components/auth/LoginBorrower";
import Logout from "../components/auth/Logout";

const Home = lazy(() => import("../home/Home"));
const SingleBook = lazy(() => import("../OurBooks/SingleBook"));
const AllBooks = lazy(() => import("../OurBooks/AllBooks"));
const Members = lazy(() => import("../OurMembers/Members"));
const Sharers = lazy(() => import("../OurMembers/Sharers"));
const SingleMember = lazy(() => import("../OurMembers/SingleMember"));
const PrivateRoute = lazy(() => import("../PrivateRoute/PrivateRoute"));
const Dashboard = lazy(() => import("../dashboard/dashAdmin/Dashboard"));

const ManageBooks = lazy(() => import("../dashboard/dashAdmin/ManageBooks"));
const AddMember = lazy(() => import("../dashboard/dashAdmin/AddMember"));
const EditMember = lazy(() => import("../dashboard/dashAdmin/EditMember"));
const ManageMembers = lazy(
  () => import("../dashboard/dashAdmin/ManageMembers"),
);

const DashSharer = lazy(() => import("../dashboard/dashSharer/DashSharer"));
const YourBooks = lazy(() => import("../dashboard/dashSharer/YourBooks"));
const UploadBook = lazy(() => import("../dashboard/dashSharer/UploadBook"));
const YourProfile = lazy(() => import("../dashboard/dashSharer/YourProfile"));
const YourPassword = lazy(() => import("../dashboard/dashSharer/YourPassword"));
const YourEditBooks = lazy(
  () => import("../dashboard/dashSharer/YourEditBooks"),
);

const BorrowedBooks = lazy(
  () => import("../dashboard/dashSharer/BorrowedBooks"),
);
const AddBorrower = lazy(() => import("../dashboard/dashSharer/AddBorrower"));
const SingleYourBook = lazy(
  () => import("../dashboard/dashSharer/SingleYourBook"),
);
const RemoveBorrower = lazy(
  () => import("../dashboard/dashSharer/RemoveBorrower"),
);
const ManageBorrower = lazy(
  () => import("../dashboard/dashSharer/ManageBorrower"),
);
const ReturnBook = lazy(() => import("../dashboard/dashSharer/ReturnBook"));
const Gratitude = lazy(() => import("../components/Gratitude"));
const ManageBorrowers = lazy(
  () => import("../dashboard/dashAdmin/ManageBorrowers"),
);
const YourBooksRead = lazy(
  () => import("../dashboard/dashSharer/YourBooksRead"),
);

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
          fetch(`https://pega-book-server.onrender.com/book/${params.id}`),
      },
      {
        path: "/member/:id",
        element: <SingleMember />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
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
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
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
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },
      {
        path: "/member/dashboard/add-borrower/:id",
        element: <AddBorrower />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/book/${params.id}`),
      },
      {
        path: "/member/dashboard/remove-borrower/:id",
        element: <RemoveBorrower />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/book/${params.id}`),
      },
      {
        path: "/member/dashboard/upload/:id",
        element: <UploadBook />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },
      {
        path: "/member/dashboard/manage/:id",
        element: <YourBooks />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },
      {
        path: "/member/dashboard/manage/borrower/:id",
        element: <ManageBorrower />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },
      {
        path: "/member/dashboard/borrowed-book/:id",
        element: <BorrowedBooks />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },

      {
        path: "/member/dashboard/read-book/:id",
        element: <YourBooksRead />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },

      {
        path: "/member/dashboard/return-book/:id",
        element: <ReturnBook />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/book/${params.id}`),
      },

      {
        path: "/member/dashboard/profile/:id",
        element: <YourProfile />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },
      {
        path: "/member/dashboard/changePassword/:id",
        element: <YourPassword />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/member/${params.id}`),
      },

      {
        path: "/member/dashboard/book/:id",
        element: <SingleYourBook />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/book/${params.id}`),
      },
      {
        path: "/member/dashboard/edit-books/:id",
        element: <YourEditBooks />,
        loader: ({ params }) =>
          fetch(`https://pega-book-server.onrender.com/book/${params.id}`),
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
