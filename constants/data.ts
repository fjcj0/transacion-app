import { TABS_COLORS } from "./colors";
import { appleIcon, dollarIcon, farmingIcon, freeLanceIcon, gamingIcon, metaIcon, netflixIcon, spotityFiIcon } from "./imags";
export const transactions = [
    {
        title: 'Housing',
        money: '$5230.45',
        percent: '35%',
        backgroundColor: TABS_COLORS.SECONDARY_COLOR,
        color: 'white',
    },
    {
        title: 'Food',
        money: '$345.20',
        percent: '22%',
        backgroundColor: '#4CAF50',
        color: 'white',
    },
    {
        title: 'Entertainment',
        money: '$156.80',
        percent: '10%',
        backgroundColor: '#FF9800',
        color: 'black',
    },
    {
        title: 'Utilities',
        money: '$210.50',
        percent: '14%',
        backgroundColor: '#2196F3',
        color: 'white',
    },
    {
        title: 'Healthcare',
        money: '$189.30',
        percent: '12%',
        backgroundColor: '#E91E63',
        color: 'white',
    },
    {
        title: 'Shopping',
        money: '$432.65',
        percent: '28%',
        backgroundColor: '#9C27B0',
        color: 'white',
    },
    {
        title: 'Education',
        money: '$315.90',
        percent: '20%',
        backgroundColor: '#607D8B',
        color: 'white',
    },
    {
        title: 'Travel',
        money: '$678.40',
        percent: '44%',
        backgroundColor: '#FF5722',
        color: 'white',
    },
    {
        title: 'Savings',
        money: '$750.00',
        percent: '49%',
        backgroundColor: '#009688',
        color: 'white',
    },
    {
        title: 'Insurance',
        money: '$285.75',
        percent: '18%',
        backgroundColor: '#795548',
        color: 'white',
    },
    {
        title: 'Personal Care',
        money: '$98.25',
        percent: '6%',
        backgroundColor: '#CDDC39',
        color: 'black',
    }
];

export const incomes = [
    {
        icon: dollarIcon,
        title: 'Salary',
        value: '$1,500.00'
    },
    {
        icon: freeLanceIcon,
        title: 'Freelance',
        value: '$750.00'
    },
    {
        icon: gamingIcon,
        title: 'Gaming',
        value: '$320.00'
    },
    {
        icon: farmingIcon,
        title: 'Farming',
        value: '$450.00'
    },
];

export const spendings = [
    {
        icon: netflixIcon,
        title: 'Netflix',
        date: '2024-5-1',
        value: '$259.99'
    },
    {
        icon: spotityFiIcon,
        title: 'Spotify',
        date: '2023-2-10',
        value: '$129.99'
    },
    {
        icon: appleIcon,
        title: 'Apple',
        date: '2020-21-3',
        value: '$199.99'
    },
    {
        icon: metaIcon,
        title: 'Meta',
        date: '2025-6-2',
        value: '$179.99'
    },
];


export const products = [
    {
        'title': 'Chair',
        'image': 'https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900',
        'salary': '$500',
        'available': 40,
        'companyIcon': netflixIcon,
    },
    {
        'title': 'Football',
        'image': 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900',
        'salary': '$40.5',
        'available': 25,
        'companyIcon': metaIcon,
    },
    {
        'title': 'Iphone 16',
        'image': 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SVBIT05FfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900',
        'salary': '$3050',
        'available': 31,
        'companyIcon': appleIcon,
    },
    {
        'title': 'House',
        'image': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900',
        'salary': '$120.99',
        'available': 15,
        'companyIcon': spotityFiIcon,
    },
];
export const purchases = [
    {
        "id": 2,
        "product_id": 1,
        "user_id": 2,
        "percent": "33.33%",
        "quantity": 3,
        "new_salary": "$1099.99",
        "available": 1,
        "created_at": "2025-10-28T20:06:05.724Z",
        "updated_at": "2025-10-28T20:26:22.396Z",
        "title": "iPhone 15 Pro",
        "image": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SVBIT05FfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
        "icon": metaIcon
    },
    {
        "id": 3,
        "product_id": 2,
        "user_id": 2,
        "percent": "50%",
        "quantity": 2,
        "new_salary": "$599.99",
        "available": 5,
        "created_at": "2025-10-29T10:15:30.000Z",
        "updated_at": "2025-10-29T10:15:30.000Z",
        "title": "MacBook Air",
        "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=900",
        "icon": appleIcon
    },
    {
        "id": 4,
        "product_id": 3,
        "user_id": 2,
        "percent": "25%",
        "quantity": 4,
        "new_salary": "$299.99",
        "available": 3,
        "created_at": "2025-10-27T14:20:45.000Z",
        "updated_at": "2025-10-27T14:20:45.000Z",
        "title": "AirPods Pro",
        "image": "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
        "icon": spotityFiIcon
    }
];