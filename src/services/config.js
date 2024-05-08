// Get all cookies
const allCookies = document.cookie;

// To make it more usable, you can parse the cookies into an object
function parseCookies() {
  const cookies = {};
  document.cookie.split(";").forEach((cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookies[name] = value;
  });
  return cookies;
}

export const cookies = parseCookies();

// Access a specific cookie
// export const tokenCookies = cookies.token; //

export const headers = {
  Authorization: `Bearer ${cookies.token}`,
  "Content-Type": "application/json", // Optional, set the content type if needed
};

export const headersFormData = {
  Authorization: `Bearer ${cookies.token}`,
  "Content-Type": "multipart/form-data",
};
