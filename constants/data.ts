import { TABS_COLORS } from "./colors";
import { dollarIcon, farmingIcon, freeLanceIcon, gamingIcon } from "./imags";
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