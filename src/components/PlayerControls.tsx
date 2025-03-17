import { colors } from '@/constants/tokens'
import { FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerControlsProps = {
	style?: ViewStyle
}
type PlayerButtonsProps = {
	style?: ViewStyle
	iconSize?: number
}
export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<SkipToPreviousButton />
				<PlayPauseButton />
				<SkipToNextButton />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize = 48 }: PlayerButtonsProps) => {
	const { playing } = useIsPlaying()
	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
		</View>
	)
}
export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonsProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
			<FontAwesome6 name={'forward'} size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}
export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonsProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
			<FontAwesome6 name={'backward'} size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
