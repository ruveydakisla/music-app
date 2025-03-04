import { colors, fontSize } from '@/constants/tokens'
import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.base,
		color: colors.text,
	},
})

export const utilStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemSeperator: {
		borderColor: colors.textMoted,
		borderWidth: StyleSheet.hairlineWidth,
		opacity: 0.3,
	},
	emptyContentText: {
		...defaultStyles.text,
		color: colors.textMoted,
		textAlign: 'center',
		marginTop: 20,
	},
	emptyContentImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 40,
		opacity: 0.3,
	},
	centeredRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	slider: {
		height: 7,
        backgroundColor:'#fff',
        opacity:0.4,
		borderRadius: 19,
	},
})
