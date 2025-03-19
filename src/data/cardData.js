const cardData = [
    {
        img: require('../assets/bushHouse.jpg'), // Use require for internal images
        tag: 'Preprocessing',
        title: 'Helping you preprocess your data',
        description: 'This API is not housing specific, but it can be used to preprocess data analytics model',
        authors: [
            { name: 'W18B_Tango', avatar: '/static/images/avatar/1.jpg' },
        ],
    },
    {
        img: require('../assets/PoolHouse.jpg'),
        tag: 'Analytics',
        title: 'Use our dataset agnostic analytics tools to gain insights into your data',
        description:
            'This feature set of APIs includes tools for data analysis, including predictive analytics',
        authors: [
            { name: 'W18B_Tango', avatar: '/static/images/avatar/1.jpg' }
        ],
    },
    {
        img: require('../assets/apartment.png'),
        tag: 'Collection',
        title: 'Get JSONied property transactions for any week or year',
        description:
            'This housing specific API will fetch neatly parsed data for you to use in your models',
        authors: [
            { name: 'W18B_Tango', avatar: '/static/images/avatar/1.jpg' }
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=2',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        description:
            'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=3',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        description:
            'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=4',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        description:
            "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=5',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        description:
            "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        authors: [
            { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=6',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        description:
            'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
    },
];

export default cardData;
