import type { User } from '../types';

const USER_KEY = 'plant-ai-user';

// For simplicity, we'll use a mock user object.
const mockUser: User = {
    name: 'Demo User',
    email: 'demo@plant.ai',
    mobile: '555-123-4567'
};

export const getLoggedInUser = (): User | null => {
    try {
        const userJson = localStorage.getItem(USER_KEY);
        if (userJson) {
            return JSON.parse(userJson);
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
    }
    return null;
};

export const loginUser = (): User => {
    try {
        const userJson = JSON.stringify(mockUser);
        localStorage.setItem(USER_KEY, userJson);
    } catch (error) {
        console.error("Failed to save user to localStorage", error);
    }
    return mockUser;
};

export const updateUser = (updatedData: Partial<User>): User | null => {
    try {
        const currentUser = getLoggedInUser();
        if (!currentUser) {
            return null;
        }

        const updatedUser = { ...currentUser, ...updatedData };
        const userJson = JSON.stringify(updatedUser);
        localStorage.setItem(USER_KEY, userJson);
        return updatedUser;
    } catch (error) {
        console.error("Failed to update user in localStorage", error);
        return null;
    }
};

export const logoutUser = (): void => {
    try {
        localStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error("Failed to clear user from localStorage", error);
    }
};