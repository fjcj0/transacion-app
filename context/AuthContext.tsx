import { useAuth, useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { useEffect, createContext, useContext, ReactNode, useState, useCallback, useRef } from "react";
interface UserDetails {
    id: string;
    clerkId: string;
    name: string;
    email: string;
    money: number;
    profile_picture: string;
}
interface AuthContextType {
    userDetails: UserDetails | null;
    isLoadingUser: boolean;
    signIn: () => Promise<void>;
    logOut: () => void;
    setUserDetails: any;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { user, isLoaded: userLoaded } = useUser();
    const { isSignedIn } = useAuth();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const signInCalledRef = useRef(false);
    const signIn = useCallback(async () => {
        if (!user || signInCalledRef.current || !userLoaded) {
            return;
        }
        if (!user.id || !user.firstName || !user.emailAddresses?.[0]?.emailAddress) {
            console.log("Waiting for complete user data...");
            return;
        }
        try {
            setIsLoadingUser(true);
            signInCalledRef.current = true;
            const serverUrl = process.env.EXPO_PUBLIC_SERVER_URL;
            if (!serverUrl) {
                console.error("EXPO_PUBLIC_SERVER_URL is not defined");
                return;
            }
            const response = await axios.post(
                `${serverUrl}/api/auth`,
                {
                    clerkId: user.id,
                    name: `${user.firstName} ${user.lastName || ''}`.trim(),
                    email: user.emailAddresses[0]?.emailAddress,
                    money: 20000,
                    profile_picture: user.imageUrl || '/default-profile.png',
                },
                {
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (response.data.user) {
                setUserDetails(response.data.user);
            }
        } catch (error: any) {
            console.log("Sign in error details:");
            console.log("Error message:", error.message);
            console.log("Error code:", error.code);
            if (error.response) {
                console.log("Server error:", error.response.status, error.response.data);
                if (error.response.status === 400) {
                    console.log("Missing data error - resetting signInCalledRef");
                    signInCalledRef.current = false;
                }
            } else if (error.request) {
                console.log("No response received. Check if server is running.");
                signInCalledRef.current = false;
            } else {
                signInCalledRef.current = false;
            }
        } finally {
            setIsLoadingUser(false);
        }
    }, [user, userLoaded]);
    const logOut = useCallback(() => {
        setUserDetails(null);
        signInCalledRef.current = false;
    }, []);
    useEffect(() => {
        if (!userLoaded) return;
        if (user && isSignedIn && !userDetails && !signInCalledRef.current) {
            const timer = setTimeout(() => {
                signIn();
            }, 500);
            return () => clearTimeout(timer);
        } else if ((!user || !isSignedIn) && userDetails) {
            logOut();
        }
    }, [user, isSignedIn, userLoaded, userDetails, signIn, logOut]);
    return (
        <AuthContext.Provider value={{ userDetails, isLoadingUser, signIn, logOut, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};