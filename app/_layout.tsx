import SafeScreen from '@/components/SafeScreen';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { fonts } from '../fonts';
import { Text, View } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';
function ClerkLoadedWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAuth();
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading authentication...</Text>
      </View>
    );
  }
  return <>{children}</>;
}
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fonts);
  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Loading fonts...</Text>
      </View>
    );
  }
  if (fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading fonts: {fontError.message}</Text>
      </View>
    );
  }
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoadedWrapper>
        <AuthProvider>
          <SafeScreen>
            <Slot />
          </SafeScreen>
        </AuthProvider>
      </ClerkLoadedWrapper>
    </ClerkProvider>
  );
}