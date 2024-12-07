import jwt from "@elysiajs/jwt";
import { DateTime } from "luxon";

export type JwtSession = {
  id: string;
};

export const jwtMiddleware = jwt({
  name: "jwt",
  secret: process.env.JWT_SECRET as string,
  exp: DateTime.now().plus({ months: 2 }).toSeconds(),
});
