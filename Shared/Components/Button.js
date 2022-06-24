import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';


import colors from '../Helpers/colors';

// type = default, outline, plain
// outlineColors - use when type is outline
// buttonStyle
// titleStyle

function Button({ title, type = "default", outlineColor = colors.primary, buttonStyle, titleStyle, onPress }) {
	return (
		<TouchableOpacity
			style={[
				styles.buttonContainer, 
				type === "outline" && styles.outline, { borderColor: outlineColor },
				type === "plain" && styles.plain,
				buttonStyle
			]}
			onPress={onPress}
		>
				<Text 
					style={[
						styles.buttonText, 
						type === "outline" && { color: outlineColor },
						type === "plain" && { color: colors.gray_shade_6 },
						titleStyle 
					]}>
						{title}
				</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		backgroundColor: colors.primary,
	},
	buttonText: {
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.white
	},
	outline: {
		borderWidth: 1,
		backgroundColor: 'transparent',
	},
	plain: {
		padding: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent'
	}
})

export default Button;
