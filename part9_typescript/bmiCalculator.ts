import { isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number) : string => {
    if (height <= 0 || weight <= 0) {
        throw new Error('Height and weight must be above zero.');
    }

    const bmi = weight / Math.pow((height / 100), 2)
    switch(true) {
        case bmi<18.5:
            return 'Underweight';
        case bmi>=18.5 && bmi<=25:
            return 'Normal (healthy weight)';
        case bmi>25 && bmi<30:
            return 'Overweight';
        case bmi>=30:
            return 'Obesity';
        default:
            throw new Error('Error');
    }
}

try {
    
    const height: number = Number(process.argv[2]);
    const weight: number = Number(process.argv[3]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Height and weight should be numbers');
    }
    console.log(calculateBmi(height, weight));
} catch (error) {
    if (error instanceof Error) {
        console.error('An error occurred:', error.message);
    } else {
        console.error('An unknown error occurred.');
    }
}