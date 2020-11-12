interface resultFormat {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: string;
  average: string;
}

interface MultiplyValues {
  target: number;
  excercises: Array<number>;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 10) throw new Error('Too many arguments');

  for (let i = 0; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  return {
    target: Number(args[0]),
    excercises: args.slice(1).map(number => parseInt(number))
  };
};

const ratingList: [number, number, string][] = [
  [0, 0.5, 'it is better than nothing, you may spend a bit more'],
  [0.5, 2, 'not too bad but could be better'],
  [2, Number.MAX_VALUE, 'Excellent!'],
];

const calculateExercises = (target: number, exercises: Array<number>): resultFormat => {

  if (exercises.length > 10 || exercises.length < 1) {
    throw new Error('the exceciese should be 1 ~ 10 days');
  }

  if (target < 1 || target > 5) {
    throw new Error('the target should be 1 ~ 5 hour(s)');
  }

  const avgHours: number = (exercises.reduce((a, b) => a + b) / exercises.length);
  let trainingDays = 0;
  let ratingIndex = 0;

  exercises.forEach(hour => { if (hour > 0) { trainingDays++; } });

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
  };
};

export function makeExcerciseReport(argv: string[]): resultFormat {
  const { target, excercises } = parseArguments(argv);
  return calculateExercises(target, excercises);
}