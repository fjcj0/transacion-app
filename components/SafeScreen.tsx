import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface SafeScreenProps {
    children?: ReactNode;
}
const SafeScreen: React.FC<SafeScreenProps> = ({ children }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: 'black' }}>
            {children}
        </View>
    )
}
export default SafeScreen;