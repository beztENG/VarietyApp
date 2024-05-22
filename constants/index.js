export const categories =[
    {
        id: 1,
        name: 'Cleaning',
        image: require('../assets/images/cleaninglogo.png'),
    },
    {
        id: 2,
        name: 'DIY',
        image: require('../assets/images/DIYlogo.png'),
    },
    {
        id: 3,
        name: 'Household',
        image: require('../assets/images/householdlogo.png'),
    },

]

export const featured = [
    {
        id: 1,
        title: 'Variety options that you need',
        description: 'Solve your problems is our manner',
        shops: [
            {
                id: 1,
                name: 'Cleaning store',
                image: require('../assets/images/CleaningTools.jpg'),
                description: 'Better way to clean your house',
                lng: 38.2145602,
                lat: 38.2145602,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'CleaningTools',
                products: [
                    { 
                        id: 1,
                        name: 'broom',
                        description: 'broom',
                        price: 10, 
                        image: require('../assets/images/broom.jpg')
                    },
                    {
                        id: 2,
                        name: 'mop',
                        description: 'mop',
                        price: 10,
                        image: require('../assets/images/mop.jpg')
                    },
                    {
                        id: 3,
                        name: 'vacuum',
                        description: 'vacuum',
                        price: 10,
                        image: require('../assets/images/vacuum.jpg')
                    },
                ]
            },
            {
                id: 2,
                name: 'DIY store',
                image: require('../assets/images/DIY.jpg'),
                description: 'Solve your own problem',
                lng: 38.2145602,
                lat: -85.5324269,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'DIY',
                products: [
                    {
                        id: 1,
                        name: 'driller',
                        description: 'driller',
                        price: 10,
                        image: require('../assets/images/driller.jpg')
                    },
                    {
                        id: 2,
                        name: 'hammer',
                        description: 'hammer',
                        price: 10,
                        image: require('../assets/images/hammer.jpg')
                    },
                    {
                        id: 3,
                        name: 'glue',
                        description: 'glue',
                        price: 10,
                        image: require('../assets/images/glue.jpg')
                    },
                ]
            },
            {
                id: 3,
                name: 'HouseHold Chemical Store',
                image: require('../assets/images/HouseholdChemical.jpg'),
                description: 'Cleaning is our honor',
                lng: 38.2145602,
                lat: -85.5324269,
                address: '434 second street',
                stars: 4,
                reviews: '4.4k',
                category: 'HouseholdChemical',
                products: [
                    {
                        id: 1,
                        name: 'spray',
                        description: 'spray',
                        price: 10,
                        image: require('../assets/images/spray.jpg')
                    },
                    {
                        id: 2,
                        name: 'dishwashing',
                        description: 'dishwashing',
                        price: 10,
                        image: require('../assets/images/dishwashing.jpg')
                    },
                    {
                        id: 3,
                        name: 'gloves',
                        description: 'gloves',
                        price: 10,
                        image: require('../assets/images/gloves.jpg')
                    },
                ]
            },
        ]
    },


]