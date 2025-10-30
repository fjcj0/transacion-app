import { TABS_COLORS } from '@/constants/colors';
import { useAuth } from '@clerk/clerk-expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Animated } from 'react-native';
const TabsLayout = () => {
    const { isSignedIn } = useAuth();
    const scaleAnims = useRef([
        new Animated.Value(1),
        new Animated.Value(1),
        new Animated.Value(1)
    ]).current;
    if (!isSignedIn) {
        return <Redirect href={"/(auth)/sign-in"} />
    }
    const handleTabPress = (index: number) => {
        scaleAnims.forEach(anim => anim.setValue(1));
        Animated.sequence([
            Animated.spring(scaleAnims[index], {
                toValue: 1.1,
                useNativeDriver: true,
                speed: 20,
            }),
            Animated.spring(scaleAnims[index], {
                toValue: 0.9,
                useNativeDriver: true,
                speed: 20,
            }),
            Animated.spring(scaleAnims[index], {
                toValue: 1,
                useNativeDriver: true,
                speed: 20,
            })
        ]).start();
    };
    interface AnimatedTabIconProps {
        index: number;
        focused: boolean;
        color: string;
        iconName: any;
    }
    const AnimatedTabIcon = ({ index, focused, color, iconName }: AnimatedTabIconProps) => {
        return (
            <Animated.View
                style={{
                    backgroundColor: focused ? TABS_COLORS.SECONDARY_COLOR : 'transparent',
                    width: 38,
                    height: 38,
                    borderWidth: focused ? 0.5 : 0,
                    borderColor: 'transparent',
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 3,
                    transform: [{ scale: scaleAnims[index] }]
                }}
            >
                <MaterialCommunityIcons
                    name={iconName}
                    size={21}
                    color={color}
                />
            </Animated.View>
        );
    };
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#0b0014',
                    borderWidth: 0.3,
                    borderTopWidth: 0.3,
                    borderColor: 'white',
                    marginHorizontal: 110,
                    marginBottom: 50,
                    height: 65,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'grey',
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ focused, color }) => (
                        <AnimatedTabIcon
                            index={0}
                            focused={focused}
                            color={color}
                            iconName='chart-donut-variant'
                        />
                    ),
                }}
                listeners={{
                    tabPress: () => handleTabPress(0),
                }}
            />
            <Tabs.Screen
                name='transactions'
                options={{
                    title: 'Transactions',
                    tabBarIcon: ({ focused, color }) => (
                        <AnimatedTabIcon
                            index={2}
                            focused={focused}
                            color={color}
                            iconName='swap-horizontal'
                        />
                    ),
                }}
                listeners={{
                    tabPress: () => handleTabPress(2),
                }}
            />
            <Tabs.Screen
                name='products'
                options={{
                    title: 'Products',
                    tabBarIcon: ({ focused, color }) => (
                        <AnimatedTabIcon
                            index={1}
                            focused={focused}
                            color={color}
                            iconName='shopping'
                        />
                    ),
                }}
                listeners={{
                    tabPress: () => handleTabPress(1),
                }}
            />
        </Tabs>
    );
}
export default TabsLayout;