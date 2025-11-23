import { uniqueId } from 'lodash';
import restaurant1 from './MockImages/restaurant1.png';
import restaurant2 from './MockImages/restaurant2.png';
import restaurant3 from './MockImages/restaurant3.png';
import restaurant4 from './MockImages/restaurant4.png';
import meal1 from './MockImages/meal1.png';
import drink1 from './MockImages/drink1.png';
import dessert1 from './MockImages/dessert1.png';
import { Restaurant } from '../../utils/api/restaurantsService/restaurantsService';

export const mockRestaurants: Restaurant[] = [
    {
        id: '1',
        photo: restaurant3,
        name: 'Jahu',
        rating: 4.8,
        address: 'ул. Березовая 21',
        coordinates: {
            latitude: 43.243523441782585,
            longitude: 76.91477137561034,
        },
        workingTime: '09:00 - 22.00',
        isLiked: false,
        type: 'cafe',
    },
    {
        id: '2',
        photo: restaurant2,
        name: 'Boom',
        rating: 4.9,
        address: 'ул. Морозова 56/1',
        coordinates: {
            latitude: 43.239536903817104,
            longitude: 76.9312294101257,
        },
        workingTime: '10:00 - 23.00',
        isLiked: false,
        type: 'cafe',
    },
    {
        id: '3',
        photo: restaurant4,
        name: 'Moon',
        rating: 5.0,
        address: 'пр. Мира 36',
        coordinates: {
            latitude: 43.23818774310171,
            longitude: 76.9074543094177,
        },
        workingTime: '12:00 - 01.00',
        isLiked: false,
        type: 'cafe',
    },
    {
        id: '4',
        photo: restaurant1,
        name: 'Ready',
        rating: 4.8,
        address: 'ул. Березовая 21',
        coordinates: {
            latitude: 43.23531675447601,
            longitude: 76.91690641398621,
        },
        workingTime: '09:00 - 22.00',
        isLiked: false,
        type: 'fastFood',
    },
    {
        id: '5',
        photo: restaurant3,
        name: 'Bar',
        rating: 5.0,
        address: 'пр. Мира 36',
        coordinates: {
            latitude: 43.24301948193668,
            longitude: 76.909664449646,
        },
        workingTime: '12:00 - 01.00',
        isLiked: false,
        type: 'cafeBar',
    },
];

export const mockMeals = [
    {
        restaurantId: '1',
        restaurantName: 'Jahu',
        meals: [
            {
                id: uniqueId(),
                name: 'Куриный донер',
                description: 'Лаваш, курица, соленый огурец, помидор, капуста, лук, морковь, зелень.',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [
                    {
                        id: '1',
                        name: 'Размер',
                        choices: [
                            {
                                id: '1',
                                name: 'Маленький',
                                price: 1050,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Средний',
                                price: 1350,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Большой',
                                price: 1650,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                    {
                        id: '2',
                        name: 'Соусы',
                        choices: [
                            {
                                id: '1',
                                name: 'Кетчуп',
                                price: 100,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Чесночный',
                                price: 200,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Сырный',
                                price: 300,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                    {
                        id: '3',
                        name: 'Овощи',
                        choices: [
                            {
                                id: '1',
                                name: 'Томаты',
                                price: 100,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Огурцы',
                                price: 200,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Оливки',
                                price: 300,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '4',
                                name: 'Маринованные огурцы',
                                price: 400,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '5',
                                name: 'Зелень',
                                price: 500,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                ],
            },
            {
                id: uniqueId(),
                name: 'Говяжий донер',
                description: 'Говядина',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [],
            },
            {
                id: uniqueId(),
                name: 'Американо',
                description: 'Кофе',
                photo: drink1,
                price: 200,
                type: 'drink',
                waitingTime: 5,
                features: [],
            },
            {
                id: uniqueId(),
                name: 'Говяжий донер',
                description: 'Говядина',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [],
            },
            {
                id: uniqueId(),
                name: 'Пуддинг',
                description: 'Пуддинг',
                photo: dessert1,
                price: 350,
                type: 'dessert',
                waitingTime: 5,
                features: [],
            },
        ],
    },
    {
        restaurantId: '2',
        restaurantName: 'Boom',
        meals: [
            {
                id: uniqueId(),
                name: 'Куриный донер',
                description: 'Лаваш, курица, соленый огурец, помидор, капуста, лук, морковь, зелень.',
                photo: meal1,
                price: 1350,
                type: 'food',
                waitingTime: 10,
                features: [
                    {
                        id: '1',
                        name: 'Размер',
                        choices: [
                            {
                                id: '1',
                                name: 'Маленький',
                                price: 1050,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Средний',
                                price: 1350,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Большой',
                                price: 1650,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                    {
                        id: '2',
                        name: 'Соусы',
                        choices: [
                            {
                                id: '1',
                                name: 'Кетчуп',
                                price: 100,
                                default: true,
                                chosen: false,
                            },
                            {
                                id: '2',
                                name: 'Чесночный',
                                price: 200,
                                default: false,
                                chosen: false,
                            },
                            {
                                id: '3',
                                name: 'Сырный',
                                price: 300,
                                default: false,
                                chosen: false,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        restaurantId: '3',
        restaurantName: 'Moon',
        meals: [
            {
                id: uniqueId(),
                name: 'Американо',
                description: 'Кофе',
                photo: drink1,
                price: 200,
                type: 'drink',
                waitingTime: 5,
                features: [],
            },
        ],
    },
    {
        restaurantId: '4',
        restaurantName: 'Ready',
        meals: [
            {
                id: uniqueId(),
                name: 'Пуддинг',
                description: 'Пуддинг',
                photo: dessert1,
                price: 350,
                type: 'dessert',
                waitingTime: 5,
                features: [],
            },
        ],
    },
    {
        restaurantId: '5',
        restaurantName: 'Bar',
        meals: [
            {
                id: uniqueId(),
                name: 'Капуччино',
                description: 'Кофе',
                photo: drink1,
                price: 1,
                type: 'drink',
                waitingTime: 5,
                features: [],
            },
        ],
    },
];

const increment = (function (n) {
    return function () {
        n += 1;
        return n;
    };
})(0);

export const options = mockMeals
    .map(({ meals, restaurantName }) => {
        return meals.map((meal) => {
            return [meal.name, restaurantName];
        });
    })
    .flat(2)
    .filter((option, i, ar) => ar.indexOf(option) === i)
    .map((option) => {
        return { id: increment(), name: option };
    });

export const types = ['fastFood', 'cafe', 'cafeBar'].map((type) => {
    return { id: increment(), name: type, selected: false };
});
