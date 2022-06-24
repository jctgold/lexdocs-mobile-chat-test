let name="Julia"

const messages = [
  {
    _id: 1,
    text: `Hello, ${name}! Welcome to LexDocs.`,
    user: {
      _id: 2,
      name: 'robot',
      avatar: require("../Shared/Images/lexdoc/lexie/smile.png")
    },
  },
  {
    _id: 2,
    text: 'What type of legal document do you need?',
    user: {
      _id: 2,
      name: 'robot',
      avatar: require("../Shared/Images/lexdoc/lexie/smile.png")
    },
    quickReplies: {
      type: 'radio',
      values: [
        {
          title: 'Affidavit and Certifications',
          value: '0',
        },
        {
          title: 'Powers of Attorney and Authorizations',
          value: '1',
        },
        {
          title: 'Deeds and Conveyances',
          value: '2',
        },
        {
          title: 'Contracts and Agreements',
          value: '3',
        },
        {
          title: 'Mortgages and Promissory Notes',
          value: '4',
        },
        {
          title: 'Release, Waivers, and Quitclaims',
          value: '5',
        },
        {
          title: 'Other Legal Documents',
          value: '6',
        },
      ]
    },
  }
];

export default messages;
