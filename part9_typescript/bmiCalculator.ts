interface IBmiResult { 
    weight: number,
    height: number,
    bmi: string
  }

export const calculateBmi = (height: number, weight: number): IBmiResult => {
    const bmi = weight / Math.pow(height / 100, 2);
    const bmiText = getBmiText(bmi);
    return {
        weight,
        height,
        bmi: bmiText
    };
};

const getBmiText = (bmi: number) : string => {
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
};