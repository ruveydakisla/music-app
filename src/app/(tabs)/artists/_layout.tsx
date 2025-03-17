import { StackScreenWithSearchBar } from '@/constants/layout'
import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles/index'
import { Stack } from 'expo-router'
import { View } from 'react-native'
const ArtistsScreenLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen name="index" options={{...StackScreenWithSearchBar, headerTitle: 'Artists' }} />
				<Stack.Screen name="[name]" options={{ headerTitle: '' ,headerStyle:{backgroundColor:colors.background} ,  headerTintColor:colors.primary, headerBackVisible:true}}  />
			</Stack>
		</View>
	)
}
export default ArtistsScreenLayout
