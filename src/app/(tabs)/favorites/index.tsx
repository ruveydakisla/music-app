import { TracksList } from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { defaultStyles } from '@/styles'
import React from 'react'
import { ScrollView, View } from 'react-native'
export default function FavoritesScreen() {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in favorites',
		},
	})

	const { favorites } = useFavorites()
	const searchedFavoritesTrack = favorites.filter(trackTitleFilter(search))
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TracksList id={generateTrackListId('favorites', search)} tracks={searchedFavoritesTrack} />
			</ScrollView>
		</View>
	)
}
