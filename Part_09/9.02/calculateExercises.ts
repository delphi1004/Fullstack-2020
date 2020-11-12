interface resultFormat {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: string;
  average: string;
}

const ratingList: [number, number, string][] = [
  [0, 0.5, 'it is better than nothing, you may spend a bit more'],
  [0.5, 2, 'not too bad but could be better'],
  [2, Number.MAX_VALUE, 'Excellent!'],
]

const calculateExercises = (exercises: Array<number>, target: number): resultFormat => {

  if (exercises.length > 7 || exercises.length < 1) {
    throw new Error('the exceciese should be 1 ~ 7 days');
    return null
  }

  if (target < 1 || target > 3) {
    throw new Error('the target should be 1 ~ 3');
    return null
  }

  const avgHours: number = (exercises.reduce((a, b) => a + b) / exercises.length);
  let trainingDays: number = 0;
  let ratingIndex: number = 0;

  exercises.forEach(hour => { if (hour > 0) { trainingDays++ } });

  for (let i = 0; i < ratingList.length; i++) {
    if (avgHours >= ratingList[i][0] && avgHours <= ratingList[i][1]) {
      ratingIndex = i;
      break;
    }
  }

  return {
    periodLength: exercises.length,
    trainingDays: trainingDays,
    success: target <= avgHours,
    rating: ratingIndex + 1,
    ratingDescription: ratingList[ratingIndex][2],
    target: `${target} hour(s)`,
    average: `${avgHours.toFixed(2)} hour(s)`
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (error) {
  console.log(error.message)
}