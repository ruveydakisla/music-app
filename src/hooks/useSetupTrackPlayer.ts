import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})
	await TrackPlayer.setVolume(0.03) //not too loud volume
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}
export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitilazed = useRef(false)
	useEffect(() => {
		setupPlayer()
			.then(() => {
				isInitilazed.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitilazed.current = false
				console.error(error)
			})
	}, [onLoad])
}
