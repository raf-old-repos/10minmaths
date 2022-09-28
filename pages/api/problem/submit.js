import { unstable_getServerSession } from "next-auth/next"
import { nextAuthOptions } from "../auth/[...nextauth]";

const method  = "POST";



export default async function handler(
    req,
    res
) {
    try {
        const session = await unstable_getServerSession(req, res, nextAuthOptions)

        if (!session) throw new Error("Unauthenticated")

        switch (req.method) {
            case method: {
               
                return res.status(200).json({ });
            }
            default: {
                throw new Error(
                    `Route "${req.url}" accepts "${method}" method. Provided "${req.method}"`
                );
            }
        }
    } catch (e) {
        console.log(e.toString())
        return res.status(400).json({
            e: e.toString()
        });
    }
}