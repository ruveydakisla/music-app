import { PlayPauseButton, SkipToNextButton } from '@/components/PlayerControls'
import { unknownTrackImageUri } from '@/constants/images'
import { useLastActiveTrack } from '@/hooks/useLastActiveTrack'
import { defaultStyles } from '@/styles'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Track, useActiveTrack } from 'react-native-track-player'
import MovingText from './MovingText'

export default function FloatingPlayer({style}:ViewProps) {
	const activeTrack = useActiveTrack()
    const lastActiveTrack=useLastActiveTrack();
    const displayedTrack= activeTrack ?? lastActiveTrack
	if (!displayedTrack) return null
	
	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.container,style]}>
			<>
				<FastImage
					source={{ uri: displayedTrack.artwork ?? unknownTrackImageUri }}
					style={styles.trackArtworkImage}
				/>
				<View style={styles.trackTitleContainer}>
				<MovingText text={displayedTrack.title??""} style={styles.trackTitle} animationThreshold={25}/>
				</View>
				<View style={styles.trackControlsContainer}>
					<PlayPauseButton iconSize={24} />
					<SkipToNextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#252525',
        flexDirection:'row',
        alignItems:'center',
        padding:8,
        paddingVertical:10,
        borderRadius:12

    },
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginLeft: 16,
		paddingLeft: 16,
	},
})
