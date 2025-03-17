import { TracksList } from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useTracks } from '@/store/library'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
export default function SongsScreen() {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})
	const tracks = useTracks()
	const filteredTracks = useMemo(() => {
		if (!search) return tracks
		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TracksList id={generateTrackListId('songs',search)} tracks={filteredTracks} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}
