import * as authService from '../services/authService.js';

export async function login(req, res) {
    try {

        const result = await authService.loginUser(req.body);

        const rememberMe = req.body.rememberMe === true;

        const maxAge = rememberMe
                        ? 30 * 24 * 60 * 60 * 1000   // 30 days
                        : 24 * 60 * 60 * 1000;       // 1 day

        if (result.token) {
            res.cookie("token", result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge
            });
        }

        return res.status(200).json({
            user: result.user
        });

    } catch (error) {

        return res.status(401).json({
            message: error.message
        });

    }
}

export async function register(req, res) {
    try {

        const result = await authService.registerUser(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}
export async function logout(req, res) {

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });
    return res.status(200).json({
        message: "Logged out successfully."
    });

}
export async function getCurrentUser(req, res) {
    res.status(200).json({
        user: req.user
    });
}