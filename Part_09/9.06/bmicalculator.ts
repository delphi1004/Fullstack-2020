
const bmiList: [number, number, string][] = [
  [0, 15, 'Very severely underweight'],
  [15, 16, 'Severely underweight'],
  [16, 18.5, 'Underweight'],
  [18.5, 25, 'Normal (healthy weight)'],
  [25, 30, 'Overweight'],
  [30, 35, 'Obese Class I (Moderately obese)'],
  [35, 40, 'Obese Class II (Severely obese)'],
  [40, Number.MAX_VALUE, 'Obese Class III (Very severely obese)'],
];

interface result {
  weight: number;
  height: number;
  bmi: string;
}

export function bmiCalculator(height: number, weight: number): result {
  let bmiDescription = 'unknown';

  console.log(height , weight);

  if (height <= 0 || weight <= 0) {
    throw new Error('height and weight should be greater than 0');
  }

  const bmi: number = (weight / (Math.pow(height / 100, 2)));

  for (const list of bmiList) {
    if (bmi >= list[0] && bmi <= list[1]) {
      bmiDescription = list[2];
      break;
    }
  }

  return {
    weight: weight,
    height: height,
    bmi: bmiDescription
  };

}
