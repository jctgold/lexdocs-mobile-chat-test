import { View, StyleSheet } from 'react-native'
import React from 'react';
import { Text, Image } from '@rneui/themed';

import colors from '../Helpers/colors';

function ChatItem({ position = "left", chat }) {
  return (
    <>
			{ position === "left" ?
				<View style={[styles.chat, styles.chatLeft]}>
					<Image source={(require('../Images/lexdoc/lexie/smile.png'))} style={[styles.chatIcon, styles.chatIconLeft]} />
					<View style={[styles.chatMessage, styles.chatMessageLeft]}>
						<Text style={[styles.chatMessageText,styles.chatMessageTextLeft]}>{chat}</Text>
					</View>
				</View>
				:
				<View style={[styles.chat, styles.chatRight]}>
					<View style={[styles.chatMessage,styles.chatMessageRight]}>
						<Text style={[styles.chatMessageText, styles.chatMessageTextRight]}>{chat}</Text>
					</View>
					<View style={[styles.chatIcon, styles.chatIconRight]} />
				</View>
			}
    </>
  )
}

const styles = StyleSheet.create({
	chat: {
		flexDirection: 'row',
		marginBottom: 15
	},
	chatLeft: {
		justifyContent: 'flex-start',
	},
	chatRight: {
		justifyContent: 'flex-end'
	},
	chatIcon: {
		width: 38,
		height: 38,
		borderRadius: 19,
		borderWidth: 2,
	},
	chatIconLeft: {
		borderColor: colors.primary,
	},
	chatIconRight: {
		backgroundColor: colors.secondary,
		borderColor: colors.white,
	},
	chatMessage: {
		borderRadius: 20,
		marginHorizontal: 12,
		marginTop: 5,
		paddingVertical: 12,
		paddingHorizontal: 15,
		maxWidth: 200
	},
	chatMessageLeft: {
		backgroundColor: colors.white,
		borderTopLeftRadius: 0,
	},
	chatMessageRight: {
		backgroundColor: colors.secondary,
		borderTopRightRadius: 0,
	},
	chatMessageText: {
		fontWeight: 'bold',
		textAlign: 'left',
	},
	chatMessageTextLeft: {
		color: colors.secondary,
	},
	chatMessageTextRight: {
		color: colors.white,
	},
})

export default ChatItem;