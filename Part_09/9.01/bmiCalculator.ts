
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

const calculateBmi = (height: number, weight: number): string => {
  let result = 'unknown'

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error('height or weight is not number value!')
    return result
  }

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
  console.log(calculateBmi(180, 74))
} catch (error) {
  console.log(error.message)
}