import { unknownArtistImageUri } from '@/constants/images'
import { screenPadding } from '@/constants/tokens'
import { artistNameFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useArtists } from '@/store/library'
import { defaultStyles, utilStyles } from '@/styles'
import { Link } from 'expo-router'
import React, { useMemo } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
const ItemSeparatorComponent = () => {
	return <View style={[utilStyles.itemSeperator, { marginLeft: 15, marginVertical: 12 }]}></View>
}
export default function ArtistsScreen() {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in artists',
		},
	})
	const artists = useArtists()
	const filteredArtist = useMemo(() => {
		if (!search) return artists
		return artists.filter(artistNameFilter(search))
	}, [search, artists])
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<FlatList
					contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
					scrollEnabled={false}
					data={filteredArtist}
					ItemSeparatorComponent={ItemSeparatorComponent}
					ListFooterComponent={ItemSeparatorComponent}
					renderItem={({ item: artist }) => {
						return (
							<Link href={`/artists/${artist.name}`} asChild>
								<TouchableHighlight activeOpacity={0.8}>
									<View style={styles.artistItemContainer}>
										<View>
											<FastImage
												source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
												style={styles.artistImage}
											/>
										</View>
										<View style={{ width: '100%' }}>
											<Text numberOfLines={1} style={styles.artistNameText}>
												{artist.name}
											</Text>
										</View>
									</View>
								</TouchableHighlight>
							</Link>
						)
					}}
					ListEmptyComponent={
						<View className="">
							<Text style={utilStyles.emptyContentText}>No artist found</Text>
							<FastImage
								style={utilStyles.emptyContentImage}
								source={{ uri: unknownArtistImageUri, priority: FastImage.priority.normal }}
							/>
						</View>
					}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	artistItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
	},
	artistImage: {
		borderRadius: 32,
		width: 40,
		height: 40,
	},
	artistNameText: {
		...defaultStyles.text,
		fontSize: 17,
		maxWidth: '80%',
	},
})
