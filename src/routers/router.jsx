import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";
import DashboardLayout from "../dashboard/dashAdmin/DashboardLayout";
import DashMemberLayout from "../dashboard/dashMembers/DashMemberLayout";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import LoginSharer from "../components/auth/LoginMember";
import LoginBorrower from "../components/auth/LoginBorrower";
import Logout from "../components/auth/Logout";
import API_BASE_URL from "../config/api";

const Home = lazy(() => import("../home/Home"));
const SingleBook = lazy(() => import("../OurBooks/SingleBook"));
const AllBooks = lazy(() => import("../OurBooks/AllBooks"));
const Members = lazy(() => import("../OurMembers/Members"));
const Sharers = lazy(() => import("../OurMembers/Sharers"));
const ProfileMember = lazy(() => import("../OurMembers/ProfileMember"));
const PrivateRoute = lazy(() => import("../components/auth/PrivateRoute"));
const Dashboard = lazy(() => import("../dashboard/dashAdmin/Dashboard"));
const ManageBorrowers = lazy(
  () => import("../dashboard/dashAdmin/ManageBorrowers"),
);
const ManageBooks = lazy(() => import("../dashboard/dashAdmin/ManageBooks"));
const AddMember = lazy(() => import("../dashboard/dashAdmin/AddMember"));
const EditMember = lazy(() => import("../dashboard/dashAdmin/EditMember"));
const ManageMembers = lazy(
  () => import("../dashboard/dashAdmin/ManageMembers"),
);

// import DashMember from "../dashboard/dashMembers/DashMember";
const DashMember = lazy(() => import("../dashboard/dashMembers/DashMember"));
const YourBooks = lazy(() => import("../dashboard/dashMembers/YourBooks"));
const UploadBook = lazy(() => import("../dashboard/dashMembers/UploadBook"));
const YourProfile = lazy(() => import("../dashboard/dashMembers/YourProfile"));
const YourPassword = lazy(
  () => import("../dashboard/dashMembers/YourPassword"),
);
const YourEditBooks = lazy(
  () => import("../dashboard/dashMembers/YourEditBooks"),
);

const BorrowedBooks = lazy(
  () => import("../dashboard/dashMembers/BorrowedBooks"),
);
const AddBorrower = lazy(() => import("../dashboard/dashMembers/AddBorrower"));
const SingleYourBook = lazy(
  () => import("../dashboard/dashMembers/SingleYourBook"),
);
const RemoveBorrower = lazy(
  () => import("../dashboard/dashMembers/RemoveBorrower"),
);
const ManageBorrower = lazy(
  () => import("../dashboard/dashMembers/ManageBorrower"),
);
const ReturnBook = lazy(() => import("../dashboard/dashMembers/ReturnBook"));

const YourBooksRead = lazy(
  () => import("../dashboard/dashMembers/YourBooksRead"),
);

const Gratitude = lazy(() => import("../components/Gratitude"));

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
        loader: ({ params }) => fetch(`${API_BASE_URL}/book/${params.id}`),
      },
      {
        path: "/member/:id",
        element: <ProfileMember />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
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
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },
    ],
  },
  {
    path: "/member/dashboard",
    element: <DashMemberLayout />,
    children: [
      {
        path: "/member/dashboard/:id",
        element: <DashMember />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },
      {
        path: "/member/dashboard/add-borrower/:id",
        element: <AddBorrower />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/book/${params.id}`),
      },
      {
        path: "/member/dashboard/remove-borrower/:id",
        element: <RemoveBorrower />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/book/${params.id}`),
      },
      {
        path: "/member/dashboard/upload/:id",
        element: <UploadBook />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },
      {
        path: "/member/dashboard/manage/:id",
        element: <YourBooks />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },
      {
        path: "/member/dashboard/manage/borrower/:id",
        element: <ManageBorrower />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },
      {
        path: "/member/dashboard/borrowed-book/:id",
        element: <BorrowedBooks />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },

      {
        path: "/member/dashboard/read-book/:id",
        element: <YourBooksRead />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },

      {
        path: "/member/dashboard/return-book/:id",
        element: <ReturnBook />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/book/${params.id}`),
      },

      {
        path: "/member/dashboard/profile/:id",
        element: <YourProfile />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },
      {
        path: "/member/dashboard/changePassword/:id",
        element: <YourPassword />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/member/${params.id}`),
      },

      {
        path: "/member/dashboard/book/:id",
        element: <SingleYourBook />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/book/${params.id}`),
      },
      {
        path: "/member/dashboard/edit-books/:id",
        element: <YourEditBooks />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/book/${params.id}`),
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
