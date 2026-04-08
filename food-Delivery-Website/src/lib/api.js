const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function createAuthHeader(credentials) {
    if (!credentials?.username || !credentials?.password) {
        return {};
    }

    return {
        Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
    };
}

async function request(path, options = {}) {
    const { headers: customHeaders = {}, ...restOptions } = options;
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...restOptions,
        headers: {
            "Content-Type": "application/json",
            ...customHeaders
        }
    });

    if (!response.ok) {
        let message = `Request failed with status ${response.status}`;

        try {
            const errorBody = await response.json();
            if (errorBody?.message) {
                message = errorBody.message;
            } else if (errorBody?.error) {
                message = errorBody.error;
            }
        } catch (error) {
            const text = await response.text().catch(() => "");
            if (text) {
                message = text;
            }
        }

        const requestError = new Error(message);
        requestError.status = response.status;
        throw requestError;
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export function getFoods() {
    return request("/foods");
}

export function registerUser(payload) {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}

export function getCurrentUser(credentials) {
    return request("/auth/me", {
        headers: createAuthHeader(credentials)
    });
}

export function getMyOrders(credentials) {
    return request("/orders/my", {
        headers: createAuthHeader(credentials)
    });
}

export function createOrder(payload, credentials) {
    return request("/orders", {
        method: "POST",
        headers: createAuthHeader(credentials),
        body: JSON.stringify(payload)
    });
}
