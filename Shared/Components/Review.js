import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';

import colors from '../Helpers/colors';

function Review({title, body}) {
	return (
		<View style={styles.reviewContainer}>
			<Text style={[styles.reviewText, { marginBottom: 10 }]}>{title}</Text>
			<Text style={styles.reviewText}>
				{body}
			</Text>    
		</View>
	);
}

const styles = StyleSheet.create({
	reviewContainer: {
		backgroundColor: colors.white,
		elevation: 2,
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 10,
		marginTop: 10,
		marginHorizontal: 10
	},
	reviewText: {
		color:  '#434343',
		fontWeight: 'bold',
		fontSize: 13,
		textAlign: 'left'
	}
})

export default Review;