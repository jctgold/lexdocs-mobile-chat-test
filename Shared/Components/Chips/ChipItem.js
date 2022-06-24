import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';

import colors from '../../Helpers/colors';

function ChipItem({item, selectedChip, onPress}) {
	return (
		<TouchableOpacity style={[styles.chip, selectedChip === item.value && styles.selectedChip]}
			onPress={onPress}>
			<Text style={[styles.chipText, selectedChip === item.value && styles.selectedChipText]}>{item.name}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	chip: {
		width: 200,
		minHeight: 40,
		paddingVertical: 2,
		paddingHorizontal: 10,
		borderRadius: 15,
		borderColor: colors.secondary,
		borderWidth: 1,
		backgroundColor: colors.white,
		marginTop: 8,
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	selectedChip: {
		backgroundColor: colors.secondary
	},
	selectedChipText: {
		color: colors.white
	},
	chipText: {
		color: colors.secondary,
		textAlign: 'center'
	},
})

export default ChipItem;