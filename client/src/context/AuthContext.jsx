import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (userData) => {
        setAuthError(null);
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                setIsAuthenticated(true);
                return true;
            } else {
                setAuthError(data.error);
                return false;
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            return false;
        }
    };

    const signup = async (userData) => {
        setAuthError(null);
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (response.ok) {
                // If you want auto-login, keep these. If you want manual login, remove these.
                // The user asked to go to login page, so we don't necessarily need to set state here.
                // However, many users expect to see their name immediately.
                // For now, let's just return true so SignUp.jsx can navigate.
                return true;
            } else {
                setAuthError(data.error);
                return false;
            }
        } catch (error) {
            console.error('Signup failed:', error.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setAuthError(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout, loading, authError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
