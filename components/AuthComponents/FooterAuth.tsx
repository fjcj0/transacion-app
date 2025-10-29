import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
const FooterAuth = ({ text, textLink, link }: {
    text: string,
    textLink: string,
    link: string,
}) => {
    const router = useRouter();
    return (
        <View style={{ flexDirection: 'row', columnGap: 4, paddingBottom: 45, marginVertical: 10 }}>
            <Text style={{ fontWeight: 400, color: 'white', opacity: 0.5 }}>{text}</Text>
            <TouchableOpacity onPress={() => {
                router.replace(link as any)
            }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>{textLink}</Text>
            </TouchableOpacity>
        </View>
    );
}
export default FooterAuth;
