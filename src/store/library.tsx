import library from '@/assets/data/library.json'
import { unknownTrackImageUri } from '@/constants/images'
import { Artist, Playlist, TrackWithPlaylist } from '@/helpers/types'
import { useMemo } from 'react'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
interface LibraryState {
	tracks: TrackWithPlaylist[]
	toggleTrackFavorite: (track: Track) => void
	addToPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	toggleTrackFavorite: (track) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						rating: currentTrack.rating === 1 ? 0 : 1,
					}
				}
				return currentTrack
			}),
		})),
	addToPlaylist: (track, playlistName) =>
		set((state) => ({
			tracks: state.tracks.map((currentTrack) => {
				if (currentTrack.url === track.url) {
					return {
						...currentTrack,
						playlist: [...(currentTrack.playlist ?? []), playlistName],
					}
				}

				return currentTrack
			}),
		})),
}))
export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavorites = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

	// `tracks` değişmediği sürece favorites tekrar hesaplanmaz
	const favorites = useMemo(() => tracks.filter((track) => track.rating === 1), [tracks])

	return {
		favorites,
		toggleTrackFavorite,
	}
}
export const useArtists = () => {
	const tracks = useLibraryStore((state) => state.tracks)

	// tracks değişmedikçe reduce tekrar çalışmaz
	const artists = useMemo(() => {
		return tracks.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)
			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}
			return acc
		}, [] as Artist[])
	}, [tracks])

	return artists
}

export const usePlaylists = () => {
	const tracks = useLibraryStore((state) => state.tracks)
	const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)

	// tracks değişmedikçe reduce tekrar çalışmaz
	const playlists = useMemo(() => {
		return tracks.reduce((acc, track) => {
			track.playlist?.forEach((playlistName) => {
				const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)

				if (existingPlaylist) {
					existingPlaylist?.tracks?.push(track)
				} else {
					acc.push({
						name: playlistName,
						tracks: [track],
						artworkPreview: track.artwork ?? unknownTrackImageUri,
					})
				}
			})
			return acc
		}, [] as Playlist[])
	}, [tracks]) // tracks değişmediği sürece hesaplama tekrar çalışmaz

	return { playlists, addToPlaylist }
}
