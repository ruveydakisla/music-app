import TrackListItem from '@/components/TrackListItem'
import { unknownTrackImageUri } from '@/constants/images'
import { utilStyles } from '@/styles'
import React from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TrackPlayer, { Track } from 'react-native-track-player'
const ItemDivider = () => {
	return <View style={{ ...utilStyles.itemSeperator, marginVertical: 9, marginLeft: 60 }} />
}
export type TracksListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}
export default function TrackList({ tracks, ...flalistProps }: TracksListProps) {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}
	return (
		<FlatList
			data={tracks}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilStyles.emptyContentText}>No songs found</Text>
					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilStyles.emptyContentImage}
					/>
				</View>
			}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem onTrackSelect={handleTrackSelect} track={track} />
			)}
		/>
	)
}
