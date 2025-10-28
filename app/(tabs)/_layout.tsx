import React from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
const TabsLayout = () => {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return <Redirect href={"/(auth)/sign-in"} />
    }
    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
};
export default TabsLayout;