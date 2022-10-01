import sliderImg1 from '../imgs/slider-img-1.jpg'
import sliderImg2 from '../imgs/slider-img-2.jpg'
import sliderImg3 from '../imgs/slider-img-3.jpg'

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