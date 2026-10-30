
import { TokenType } from "../common/enum/token.enum.js";
import { checkToken } from "../common/secure/token.secure.js";

export function auth(tokenType = TokenType.ACCESS) {
    return async function (req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                return res.status(401).json({
                    message: "Token not found"
                });
            }

            const { user, payload } = await checkToken({
                token,
                tokenType
            });

            req.user = user;
            req.payload = payload;

            next();
        } catch (error) {
            return res.status(401).json({
                message: error.message
            });
        }
    };
}
