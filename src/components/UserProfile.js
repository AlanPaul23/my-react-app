import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import './UserProfile.css';
import ReactivateVerification from './ReactivateVerification';

function UserProfile({ setIsAuthenticated }) {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        pincode: '',
        address: '',
        city: '',
        state: '',
        country: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [showReactivation, setShowReactivation] = useState(false);

    // Fetch user profile on load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.getProfile();
                if (response.status === 401 || response.status === 403) {
                    setIsAuthenticated(false);
                    localStorage.removeItem('isAuthenticated');
                    toast.error('Session expired, please log in again');
                    return;
                }
                const data = await response.json();
                setProfile(data);
                setFormData({
                    pincode: data.pincode,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                });
            } catch (error) {
                console.error('Error fetching profile:', error.message);
                toast.error('Error fetching profile');
            }
        };

        fetchProfile();
    }, [setIsAuthenticated]);

    // Handle form data changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle profile creation/update
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const { pincode, address, city, state, country } = formData;

        try {
            let response;
            if (profile) {
                // Update profile
                response = await api.updateProfile({ pincode, address, city, state, country });
            } else {
                // Create profile
                response = await api.createProfile({ pincode, address, city, state, country });
            }

            if (response.ok) {
                toast.success(profile ? 'Profile updated successfully' : 'Profile created successfully');
                setProfile({ ...formData });
            } else {
                toast.error('Failed to save profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error.message);
            toast.error('Error updating profile');
        }
    };

    // Handle password change
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword } = passwordData;

        try {
            const response = await api.changePassword({ current_password: currentPassword, new_password: newPassword });
            if (response.ok) {
                toast.success('Password changed successfully');
            } else {
                toast.error('Failed to change password');
            }
        } catch (error) {
            console.error('Error changing password:', error.message);
            toast.error('Error changing password');
        }
    };

    // Handle account deactivation
    const handleDeactivateAccount = async () => {
        try {
            const response = await api.deactivateAccount();
            if (response.ok) {
                toast.success('Profile deactivated successfully');
                setIsAuthenticated(false);
                localStorage.removeItem('isAuthenticated');
            } else {
                toast.error('Failed to deactivate account');
            }
        } catch (error) {
            console.error('Error deactivating account:', error.message);
            toast.error('Error deactivating account');
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            {profile ? (
                <div className="profile-details">
                    <h3>Profile Details</h3>
                    <p><strong>Address:</strong> {profile.address}</p>
                    <p><strong>City:</strong> {profile.city}</p>
                    <p><strong>State:</strong> {profile.state}</p>
                    <p><strong>Country:</strong> {profile.country}</p>
                    <p><strong>Pincode:</strong> {profile.pincode}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}

            <form onSubmit={handleProfileSubmit}>
                <h3>{profile ? 'Update' : 'Create'} Profile</h3>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    State:
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Pincode:
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleFormChange}
                    />
                </label>
                <button type="submit">
                    {profile ? 'Update Profile' : 'Create Profile'}
                </button>
            </form>

            <form onSubmit={handlePasswordSubmit}>
                <h3>Change Password</h3>
                <label>
                    Current Password:
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                    />
                </label>
                <button type="submit">Change Password</button>
            </form>

            <button onClick={handleDeactivateAccount}>Deactivate Account</button>

            {/* Reactivation Components */}
            <div>
                <button onClick={() => setShowReactivation(!showReactivation)}>
                    {showReactivation ? 'Hide Reactivation Options' : 'Reactivate Account'}
                </button>
                {showReactivation && (
                    <div>
                        <ReactivateVerification />
                        {/* Placeholder for ReactivateAccount, include a token input or logic to handle URL tokens */}
                        <p>If you have a token, use the provided reactivation link in your email.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
