import { lazy } from "react";

export const routes = [
    {
        "path": "/login",
        "element": lazy(() => import("./pages/login"))
    },
    {
        "path": "/signup",
        "element": lazy(() => import("./pages/signup"))
    },
]