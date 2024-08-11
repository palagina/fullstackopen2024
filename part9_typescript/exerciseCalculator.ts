interface IExerciseObject { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
  }


const calculateExercises = (targetHoursPerDay: number, dailyExerciseHours: Array<number> ) : IExerciseObject => {
    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.reduce((count, num) => count + (num !== 0 ? 1 : 0), 0);
    const totalHoursPerPeriod = dailyExerciseHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const averageHoursPerDay =  totalHoursPerPeriod/periodLength;
    const success = averageHoursPerDay >= targetHoursPerDay;
    const rating = getRating(averageHoursPerDay, targetHoursPerDay);
    const ratingDescription= getRatingDescription(rating);
    const exerciseObject = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target: targetHoursPerDay,
        average: averageHoursPerDay
    }
    return exerciseObject
}

const getRating = (averageHoursPerDay: number, targetHoursPerDay: number) : number => {
    const targetMatchIndex = averageHoursPerDay/targetHoursPerDay
    switch(true) {
        case targetMatchIndex===0:
            return 0;
        case targetMatchIndex<0.7 && targetMatchIndex>0:
            return 1;
        case targetMatchIndex>=0.7 && targetMatchIndex<1.:
            return 2;
        case targetMatchIndex>=1:
            return 3;
        default:
            throw new Error('Error');
    }
}

const getRatingDescription = (rating: number) : string  => {
    const descriptionArray = [
        'It seems like you did not train this time, best of luck in future', 
        'Not bad for a start', 
        'Still a bit to work on', 
        'Excellent! Just remember to recover',
    ]
    return descriptionArray[rating]
}

try {
    const targetHoursPerDay: number = Number(process.argv[2]);
    const dailyExerciseHours: Array<number> = process.argv.slice(3).map((arg) => {
        if (isNaN(Number(arg)) ) {
            throw new Error('Input hours should be numbers');
        }
        return Number(arg)
    });

    if (isNaN(targetHoursPerDay)) {
        throw new Error('Target hours should be a number');
    }
    console.log(calculateExercises(targetHoursPerDay, dailyExerciseHours));
} catch (error) {
    if (error instanceof Error) {
        console.error('An error occurred:', error.message);
    } else {
        console.error('An unknown error occurred.');
    }
}