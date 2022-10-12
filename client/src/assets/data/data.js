import sliderImg1 from '../imgs/slider-img-1.jpg'
import sliderImg2 from '../imgs/slider-img-2.jpg'
import sliderImg3 from '../imgs/slider-img-3.jpg'

import prImg1 from '../imgs/product-img-1.jpg'
import prImg2 from '../imgs/product-img-2.jpg'
import prImg3 from '../imgs/product-img-3.jpg'
import prImg4 from '../imgs/product-img-4.jpg'

export const sliderData = [
    {
        id: 1,
        img:sliderImg1,
        isDefault: true,
        navLink: '/products/1',
        desc: 'Lịch lãm'
    },
    {
        id: 2,
        img:sliderImg2,
        isDefault: false,
        navLink: '/products/2',
        desc: 'năng động'
    },
    {
        id: 3,
        img:sliderImg3,
        isDefault: false,
        navLink: '/products/3',
        desc: 'cá tính'
    }
]

export const productData = [
    {
        id: 1,
        img: prImg1,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    },
    {
        id: 2,
        img: prImg2,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    },
    {
        id: 3,
        img: prImg3,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    },
    {
        id: 4,
        img: prImg4,
        name: "T-SHIRT WHITE",
        import_price: 300000,
        productsizes: [
            {
                "id": 1,
                "quantity": 1,
                "size": {
                    "id": 4,
                    "title": "XXL"
                }
            },
            {
                "id": 2,
                "quantity": 2,
                "size": {
                    "id": 5,
                    "title": "40"
                }
            },
            {
                "id": 3,
                "quantity": 3,
                "size": {
                    "id": 6,
                    "title": "41"
                }
            }
        ]
    }
]


export const userStatsData = [

    {
      name: 'January',
      activeUser: 2400,
    },
    {
      name: 'Februay',
      activeUser: 1398,
    },
    {
      name: 'March',
      activeUser: 2800,
    },
    {
      name: 'April',
      activeUser: 3908,
    },
    {
      name: 'May',
      activeUser: 4800,
    },
    {
      name: 'June',
      activeUser: 3800,
    },
    {
      name: 'July',
      activeUser: 4300,
    },
    {
      name: 'August',
      activeUser: 5208,
    },
    {
      name: 'September',
      activeUser: 5337,
    },
    {
      name: 'October',
      activeUser: 5340,
    },
    {
      name: 'November',
      activeUser: 5559,
    },
    {
      name: 'December',
      activeUser: 6110,
    }
  ];

