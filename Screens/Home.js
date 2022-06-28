import React, {useState} from 'react';
import ChatBot from 'react-native-chatbot';
import { View, StyleSheet } from 'react-native';
import ProcessChatContainer from '../Shared/Components/ProcessChatContainer'
import colors from '../Shared/Helpers/colors';
import { Icon, Text } from '@rneui/themed';

const userName = "Julia"

const chat = [
  { type: "robot", text: "Hi, Julia! Welcome to LexDocs.", chatStep: 1, value: 1 },
  { type: "robot", text: "What type of legal document do you need?", chatStep: 2, value: 2 },
]

const documentTypes = [
  { value: 1, label: "Affidavits and Certifications", trigger: '3' },
  { value: 2, label: "Powers of Attorney and Authorizations", trigger: '3' },
  { value: 3, label: "Deeds and Conveyances", trigger: '3' },
  { value: 4, label: "Contracts and Agreements", trigger: '3' },
  { value: 5, label: "Mortgages and Promissory Notes", trigger: '3' },
  { value: 6, label: "Release, Waivers, and Quitclaim", trigger: '3' },
  { value: 7, label: "Other Legal Concerns", trigger: '3' },
]

const subtitles = [
  { value: 1, text: "Your Task: Select Check the Legal Document (Ongoing)" },
]

const steps = [
  {
    id: '0',
    message: 'Hi, Julia! Welcome to LexDocs.',
    trigger: '1',
  },
  {
    id: '1',
    message: 'What type of legal document do you need?',
    trigger: '2',
  },
  {
    id: '2',
    options: documentTypes,
  },
  {
    id: '3',
    message: ({ previousValue, steps }) => `What kind of '${documentTypes[previousValue-1].label}' do you need?`,
    end: true
  },
];

const title="Step 1 - Preliminary Questions"

function Home({ navigation }) {

  const [ selectedChip, setSelectedChip ] = useState();
  const [ chipsVisible, setChipsVisible ] = useState(true);
  const [ reviewVisible, setReviewVisible ] = useState(false);
  const [ inputEditable, setInputEditable ] = useState(false);
  const [ input, setInput ] = useState("");

    return (
      <View style={styles.main}>
			<View style={[styles.chatContainer]}>
				<View style={styles.mainTop}>
					<Text style={styles.stepTitle}>{title}</Text>
					<Text style={styles.stepDesc}>{subtitles[0].text}</Text>
				</View>

				<View style={[styles.mainMiddle]}>
          <ChatBot 
            steps={steps} 
            optionElementStyle={{backgroundColor: colors.white, borderWidth: 1, borderColor: colors.secondary, fontWeight: '700  '}} 
            optionFontColor={colors.secondary}
            avatarWrapperStyle={{backgroundColor: 'transparent', borderWidth: 0}}
            avatarStyle={{backgroundColor: "white", borderRadius: 50, borderColor: colors.primary, borderWidth: 2, width: 40, height: 40}}
            //botAvatar={require('../Shared/Images/lexdoc/lexie/smile.png')}
            bubbleStyle={{marginBottom: 15, padding: 40}}
            userBubbleColor={colors.secondary}
            userFontColor={colors.white}
            botBubbleColor={colors.white}
            botFontColor={colors.secondary}
            //botDelay={500}
            inputStyle={{ backgroundColor: colors.secondary, opacity: 1, borderBottomLeftRadius: 3, borderTopLeftRadius: 3, color: colors.white}}
            placeholder="Select your answer above"
            contentStyle={{backgroundColor: '#E4E7EA', padding: 10}}
            submitButtonStyle={{ borderTopRightRadius: 3, borderBottomRightRadius: 3, backgroundColor: colors.secondary_light}}
            submitButtonContent={() => <Icon name="arrow-upward" size={26} color={colors.white} />}
        />
			</View>
      </View>
		</View>

    );
}

const styles = StyleSheet.create({
  main: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.white
  },
    container: {
        flex: 1,
        margin: 20,
    },
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

export default Home;