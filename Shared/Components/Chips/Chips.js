import React from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';

import ChipItem from './ChipItem';

function Chips({ data, setSelectedChip, selectedChip }) {
	return (  
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false} 
			showsVerticalScrollIndicator={false} 
			style={styles.chipsContainer}
		>
			<FlatList 
				data={data} 
				numColumns={data.length > 2 ? Math.ceil(data.length/2) : 2}
				key={data.length}
				keyExtractor={dataItem => dataItem.value.toString()}
				renderItem={({item}) => (
					<ChipItem 
						onPress={() => setSelectedChip(item.value)}
						item={item}
						selectedChip={selectedChip}
					/>
				)}
			/>
		</ScrollView>  
	);
}

const styles = StyleSheet.create({
	chipsContainer: {
		marginTop: 10
	},
})

export default Chips;