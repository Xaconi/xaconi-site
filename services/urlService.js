export default function getBaseURL(path) {
    const baseURL = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : "http://localhost:3000";
    return baseURL + path;
}