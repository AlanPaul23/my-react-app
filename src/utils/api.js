// src/utils/api.js
const BASE_URL = 'http://127.0.0.1:8000';

// Helper function for fetching with error handling
const fetchWithHandling = async (url, options = {}) => {
    try {
        const response = await fetch(url, { ...options, credentials: 'include' });
        
        if (!response.ok) {
            // If unauthorized (401), try refreshing the token
            if (response.status === 401 && options.retry !== false) {
                await api.refreshToken();  // Attempt to refresh token
                return fetchWithHandling(url, { ...options, retry: false }); // Retry original request
            }
            throw new Error(`Request failed with status ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error.message);
        throw error;
    }
};


export const api = {
    login: (data) =>
        fetch(`${BASE_URL}/admin_console/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        }),

    register: (data) =>
        fetch(`${BASE_URL}/admin_console/create/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        }),

      
        requestOtp: (phoneNumber) =>
            fetch(`${BASE_URL}/admin_console/otp-login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: phoneNumber }), 
                credentials: 'include', 
            }).then((res) => {
                if (!res.ok) throw new Error('Failed to send OTP');
                return res.json();
            }),
    
        // Verify OTP for login
        verifyOtp: (phoneNumber, otp) =>
            fetch(`${BASE_URL}/admin_console/otp-verify/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: phoneNumber, otp }),
                credentials: 'include',
            }).then((res) => {
                if (!res.ok) throw new Error('OTP verification failed');
                return res.json();
            }),

    forgotPassword: (email) =>
        fetch(`${BASE_URL}/admin_console/forgotpassword/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
            credentials: 'include',
        }),

    resetPassword: (token, data) =>
        fetch(`${BASE_URL}/admin_console/reset-password/?token=${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        }),

    logout: () =>
        fetch(`${BASE_URL}/admin_console/logout/`, {
            method: 'GET',
            credentials: 'include',
        }),

        verifyAccount: (token) =>
            fetch(`${BASE_URL}/admin_console/verify-account/?token=${token}`, {
                method: 'POST',
                credentials: 'include',
            }).then((res) => {
                if (!res.ok) throw new Error('Verification failed');
                return res.json();
                
            }),
    
        resendVerification: (data) =>
            fetch(`${BASE_URL}/admin_console/resend-verification/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include',
            }).then((res) => {
                if (!res.ok) throw new Error('Failed to send verification email');
                return res.json();
            }),
            

        getProducts: (query = '') =>
            fetch(`${BASE_URL}/product/get/${query ? `?q=${encodeURIComponent(query)}` : ''}`, {
              method: 'GET',
              credentials: 'include',
            }),

        addToCart: (productId, quantity = 1) =>
            fetch(`${BASE_URL}/cart_mgmt/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: productId, quantity }), // Send both product_id and quantity
                credentials: 'include'
            }),
    
        getCart: () =>
            fetch(`${BASE_URL}/cart_mgmt/view/`, {
                method: 'GET',
                credentials: 'include',
            }),
        
        deleteCartItem: (itemId) =>
            fetch(`${BASE_URL}/cart_mgmt/remove/${itemId}`, {
                method: 'DELETE',
                credentials: 'include',
            }),
    

       
            checkout: () =>
                fetch(`${BASE_URL}/cart_mgmt/checkout/`, {
                    method: 'POST',
                    credentials: 'include',
                }),
            
            makePayment: (orderId) =>
                fetch(`${BASE_URL}/cart_mgmt/payment/${orderId}/`, {
                    method: 'POST',
                    credentials: 'include',
                }),
            
                getOrderHistory: () =>
                    fetch(`${BASE_URL}/cart_mgmt/order-history/`, {
                        method: 'POST',
                        credentials: 'include',
                    }),

                  
 createProfile: (data) =>
    fetch(`${BASE_URL}/user_mgmt/profile/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    }),

updateProfile: (data) =>
    fetch(`${BASE_URL}/user_mgmt/profile/update/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    }),

getProfile: () =>
    fetch(`${BASE_URL}/user_mgmt/profile/`, {
        method: 'GET',
        credentials: 'include',
    }),

changePassword: (data) =>
    fetch(`${BASE_URL}/user_mgmt/profile/change_password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
    }),

deactivateAccount: () =>
    fetch(`${BASE_URL}/user_mgmt/profile/deactivate/`, {
        method: 'POST',
        credentials: 'include',
    }),

    reactivateVerification: (data) =>
        fetch(`${BASE_URL}/admin_console/activate-account/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
        }),
    
    reactivateAccount: (token) =>
        fetch(`${BASE_URL}/admin_console/activate-account/?token=${token}`, {
            method: 'POST',
            credentials: 'include',
        }),
    

                    
            refreshToken: async () => {
                const response = await fetch(`${BASE_URL}/admin_console/refresh-token`, {
                    method: 'POST',
                    credentials: 'include',
                });
                
                if (!response.ok) {
                    throw new Error('Token refresh failed'); // Throw error if refresh fails
                }
                
                return response.json(); // Optional: Return response data if needed
            },
};
