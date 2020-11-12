
const bmiList = [
  [0, 15, 'Very severely underweight'],
  [15, 16, 'Severely underweight'],
  [16, 18.5, 'Underweight'],
  [18.5, 25, 'Normal (healthy weight)'],
  [25, 30, 'Overweight'],
  [30, 35, 'Obese Class I (Moderately obese)'],
  [35, 40, 'Obese Class II (Severely obese)'],
  [40, Number.MAX_VALUE, 'Obese Class III (Very severely obese)'],
]

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
  let result = 'unknown'

  if (height <= 0 || weight <= 0) {
    throw new Error('height and weight should be greater than 0')
    return result
  }

  const bmi: number = (weight / (Math.pow(height / 100, 2)))

  for (let list of bmiList) {
    if (bmi >= list[0] && bmi <= list[1]) {
      result = `your bmi is ${bmi.toFixed(2)} , ${list[2]}`
      break
    }
  }

  return result
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

