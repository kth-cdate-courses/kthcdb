import type { App } from "$api/index";
import { treaty } from "@elysiajs/eden";

export const api = treaty<App>(import.meta.env.VITE_API_URL as string);
