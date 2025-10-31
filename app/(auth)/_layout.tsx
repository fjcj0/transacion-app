import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import CenteredSpinner from '@/components/Loading';
export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth();
    if (!isLoaded) {
        return (
            <CenteredSpinner />
        );
    }
    if (isSignedIn) {
        return <Redirect href={'/(tabs)'} />;
    }
    return <Stack screenOptions={{ headerShown: false }} />;
}