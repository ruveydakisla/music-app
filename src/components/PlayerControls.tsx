import { colors } from '@/constants/tokens'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

type PlayerControlsProps = {
	style?: ViewStyle
}
type PlayerButtonsProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonsProps) => {
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
			<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext}>
				<FontAwesome6 name={'forward'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
	)
}
export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonsProps) => {
	
	return (
			<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious}>
				<FontAwesome6 name={'backward'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
	)
}
export default function PlayerControls() {
	return <View></View>
}
