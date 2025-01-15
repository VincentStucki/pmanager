export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/dashboard"], // Geschützte Routen hier angeben
};
