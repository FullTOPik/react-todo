import { createBrowserRouter } from "react-router-dom";
import Registration from "./pages/Registration";
import Tasks from "./pages/Tasks";

const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/",
    element: <Tasks />,
  },
]);

export default router;
