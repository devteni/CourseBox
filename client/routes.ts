import { lazy } from "react";

export const routes = [
    {
        "path": "/login",
        "element": lazy(() => import("./pages/Login"))
    },
    {
        "path": "/signup",
        "element": lazy(() => import("./pages/Signup"))
    },
]