const cardData = [
    {
        img: require('../assets/bushHouse.jpg'), // Use require for internal images
        tag: 'Preprocessing',
        title: 'Filter and clean your data, regardless of event type',
        description: 'Use a range of universal filter functions to transform your data. This includes event_type, value, attribute, etc.',
        authors: [
            { name: 'W18B_Tango', avatar: '/static/images/avatar/1.jpg' },
        ],
    },
    {
        img: require('../assets/PoolHouse.jpg'),
        tag: 'Analytics',
        title: 'Predictive analytics for any data source and attribute',
        description:
            'This includes API includes tools for data analysis, including predictive analytics for any attribute. Couples well with preprocessing output',
        authors: [
            { name: 'W18B_Tango', avatar: '/static/images/avatar/1.jpg' }
        ],
    },
    {
        img: require('../assets/apartment.png'),
        tag: 'Collection',
        title: 'Get a clean JSON of property transactions',
        description:
            'Access hundreds on thousands of property transactions from the NSW Valuer Generals Office, parsed and ready for use in your application',
        authors: [
            { name: 'W18B_Tango', avatar: '/static/images/avatar/1.jpg' }
        ],
    }
]

export default cardData;
