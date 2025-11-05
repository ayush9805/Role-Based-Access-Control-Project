import React, { useState, useEffect } from 'react';
import { useAuth } from './useAuth.jsx';
import axios from 'axios';

const AdminPanelPage = () => {
    // State to manage users, loading status, and errors
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth(); // Get the token from your Auth context

    // Effect to fetch all users when the component mounts or the token changes
    useEffect(() => {
        if (!token) {
            setError('Authentication required.');
            setLoading(false);
            return;
        }

        const fetchUsers = async () => {
            try {
                // API call to GET /api/users (requires Admin token)
                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                // Handles 403 Forbidden if user is not Admin
                setError(err.response?.data?.message || 'Failed to load users. Do you have Admin permission?');
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);


    // Function to handle the role change when the button is clicked
    const handleRoleChange = async (userId) => {
        const newRole = prompt("Enter new role (Viewer, Editor, Admin):");

        if (!newRole || !['Viewer', 'Editor', 'Admin'].includes(newRole)) {
            alert("Invalid role or operation cancelled.");
            return;
        }

        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // API call to PUT /api/users/:id (requires Admin token)
            const { data: updatedUser } = await axios.put(
                `http://localhost:5000/api/users/${userId}`,
                { role: newRole },
                config
            );

            // Update the local state to show the new role immediately
            setUsers(users.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            ));

            setError(''); // Clear any previous error

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update role. Check server logs.');
        }
    };


    // Conditional rendering based on state
    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div className="login-error">Error: {error}</div>;
    }

    return (
        <div className="admin-panel-container">
            <h2>Admin Panel: User Management</h2>
            <table className="admin-user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id || user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="edit-button-small"
                                    // Call the handler with the user's ID
                                    onClick={() => handleRoleChange(user._id)}
                                >
                                    Edit Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanelPage;