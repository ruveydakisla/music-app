import {FloatingPlayer} from '@/components/FloatingPlayer'
import { colors, fontSize } from '@/constants/tokens'
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
const TabsNavigation = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: fontSize.xs,
						fontWeight: '500',
					},
					headerShown: false,
					tabBarStyle: {
						position: 'absolute',
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						borderTopWidth: 0,
						paddingTop: 8,
					},
					tabBarBackground: () => (
						<BlurView
							intensity={95}
							style={{
								...StyleSheet.absoluteFillObject,
								overflow: 'hidden',
								borderTopLeftRadius: 20,
								borderTopRightRadius: 20,
							}}
						/>
					),
				}}
			>
				<Tabs.Screen
					name="favorites"
					options={{
						tabBarLabel: 'Favorites',
						tabBarIcon: (prop) => <FontAwesome name="heart" size={20} color={prop.color} />,
					}}
				/>
				<Tabs.Screen
					name="playlists"
					options={{
						tabBarLabel: 'Playlists',
						tabBarIcon: (prop) => (
							<MaterialCommunityIcons name="playlist-play" size={28} color={prop.color} />
						),
					}}
				/>
				<Tabs.Screen
					name="(songs)"
					options={{
						tabBarLabel: 'Songs',
						tabBarIcon: (prop) => (
							<Ionicons name="musical-notes-sharp" size={24} color={prop.color} />
						),
					}}
				/>
				<Tabs.Screen
					name="artists"
					options={{
						tabBarLabel: 'Artists',
						tabBarIcon: (prop) => <FontAwesome6 name="users-line" size={20} color={prop.color} />,
					}}
				/>
			</Tabs>
			<FloatingPlayer style={{
				position:'absolute',
				bottom:78,
				left:8,
				right:8,

			}} />
		</>
	)
}
export default TabsNavigation
