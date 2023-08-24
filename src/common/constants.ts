const { host } = window.location;
const baseHostUrl = host === "localhost:3000" ? "http://localhost:8000" : "";

export const baseApiUrl = `${baseHostUrl}`;
