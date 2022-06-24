import React, { useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions  } from 'react-native';
import { Text, Icon, Input } from '@rneui/themed';

import colors from '../Helpers/colors';
import Chat from '../Components/Chat';
import Button from '../Components/Chat';
import Chips from '../Components/Chips/Chips';
import Review from '../Components/Review';


function ProcessContainer({ title, subtitle, children, input, chips, review, insertButton, chat }) {
	
	const windowDimensions = useWindowDimensions();
	const scrollViewRef = useRef();

	const isLandscape = () => {
		return windowDimensions.width > windowDimensions.height
	}

	return (
		<>
			<View style={[styles.chatContainer, !isLandscape() && { maxHeight : windowDimensions.height - 85 }]}>
				<View style={styles.mainTop}>
					<Text style={styles.stepTitle}>{title}</Text>
					<Text style={styles.stepDesc}>{subtitle}</Text>
				</View>

				<View style={[styles.mainMiddle]}>
					<ScrollView 
						ref={scrollViewRef}
						onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
						style={[styles.scroll, isLandscape() && { maxHeight : 200 }]}
						nestedScrollEnabled={true}
					>
						<View style={[styles.chatInnerContainer]}>
							{ chat.map((item, i) => (
									item.text && 
										<Chat
											key={i.toString()}
											position={ item.type === "robot" ? "left" : "right" }
											chat={item.text}
										/>
								)					
							)} 
						</View>
					</ScrollView>
					<View style={styles.chatExtraContainer}>
						{ review?.isVisible &&
							<Review 
								title={review.title}
								body={review.body}
							/>
						}      
						{ chips?.isVisible &&
							<Chips 
								data={chips.data}
								selectedChip={chips.selectedChip}
								setSelectedChip={chips.setSelectedChip} 
							/>
						}
						{ insertButton?.isVisible &&
							<Button 
								title={insertButton.title}
								onPress={insertButton.onPress}
								buttonStyle={styles.insertButton}
							/>
						}
					</View>
				</View>

				<View style={styles.mainBottom}>
					<Input 
						editable={input.isEditable}
						multiline
						maxLength={100}
						placeholder={input.placeholder}
						containerStyle={styles.inputContainer}
						errorStyle={{ display: 'none' }}
						inputContainerStyle={{ borderBottomWidth: 0 }}
						inputStyle={styles.input}
						placeholderTextColor="white"
					/>
					<TouchableOpacity
						disabled={false}
						onPress={input.onSubmit}
						style={styles.enterIconContainer}
					>
						<Icon 
							name="arrow-upward" 
							type="material" 
							size={24} 
							color="white" 
							style={styles.enterIcon} 
						/>
					</TouchableOpacity>
				</View>
				{ children }
			</View>
		</>
	);
}

const styles = StyleSheet.create({
  chatExtraContainer: {
		paddingHorizontal: 10,
		paddingBottom: 20,
		paddingTop: 5,
  },
  chatInnerContainer: {
		paddingHorizontal: 15,
		paddingTop: 15,
  },
  insertButton: {
		borderRadius: 15,
		marginTop: 10,
		paddingVertical: 8
  },
  enterIconContainer: {
		backgroundColor: colors.secondary_light,
		alignItems: 'center',
		justifyContent: 'center'
  },
  enterIcon: {
		paddingVertical: 10,
		paddingHorizontal: 15
  },
  chatContainer: {
		flex: 1,
		borderColor: '#DFDFDF',
		borderWidth: 1,
		borderBottomLeftRadius: 3,
		borderBottomRightRadius: 3,
		justifyContent: 'space-between',
		overflow: 'hidden',
		backgroundColor: '#E4E7EA'
  },  
  mainTop: {
		backgroundColor: colors.white,
		padding: 12
  },
  mainMiddle: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'stretch',
  },
  mainBottom: {
		flexDirection: 'row',
		borderRadius: 3,
		backgroundColor: colors.secondary,
		justifyContent: 'space-between',
		alignItems: 'stretch',
		overflow: 'hidden',
  },
  scroll: {
		flex: 1,
  },
  stepTitle: {
		color: colors.secondary_2,
		textTransform: 'uppercase',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16
  },
  stepDesc: {
		color: colors.gray_shade_11,
		textAlign: 'center',
		fontSize: 15
  },
  inputContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
  },
  input: {
		fontSize: 15,
		color: colors.white,
		padding: 10,
		flexWrap: 'wrap'
  }
})

export default ProcessContainer;