import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage";
import User from "./pages/User";
import ErrorPage from "./pages/ErrorPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "user", element: <User /> },
    ],
  },
]);

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
