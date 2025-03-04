
// Structure for question answers
export interface AnswerData {
  answer: string;
  steps: string[];
}

// Answers and solution steps for questions
export const questionAnswers: Record<string, AnswerData> = {
  "alg-lin-1": {
    answer: "x = 5",
    steps: [
      "Start with the equation 3x + 7 = 22",
      "Subtract 7 from both sides: 3x = 15",
      "Divide both sides by 3: x = 5"
    ]
  },
  "alg-lin-2": {
    answer: "x = 4",
    steps: [
      "Start with the equation 5x - 3 = 2x + 9",
      "Subtract 2x from both sides: 3x - 3 = 9",
      "Add 3 to both sides: 3x = 12",
      "Divide both sides by 3: x = 4"
    ]
  },
  "alg-lin-3": {
    answer: "x = 2, y = 1",
    steps: [
      "From the first equation: y = 5 - 2x",
      "Substitute into the second equation: 3x - 2(5 - 2x) = 4",
      "Simplify: 3x - 10 + 4x = 4",
      "Combine like terms: 7x - 10 = 4",
      "Add 10 to both sides: 7x = 14",
      "Divide by 7: x = 2",
      "Substitute back: y = 5 - 2(2) = 5 - 4 = 1"
    ]
  },
  "alg-quad-1": {
    answer: "x = -2 or x = -3",
    steps: [
      "Factor the equation: x² + 5x + 6 = 0",
      "This can be written as (x + 2)(x + 3) = 0",
      "Therefore, x = -2 or x = -3"
    ]
  },
  "alg-quad-2": {
    answer: "x = 3 or x = 0.5",
    steps: [
      "Using the quadratic formula for 2x² - 7x + 3 = 0",
      "a = 2, b = -7, c = 3",
      "x = (7 ± √(49 - 24))/4",
      "x = (7 ± √25)/4",
      "x = (7 ± 5)/4",
      "x = 3 or x = 0.5"
    ]
  },
  "calc-lim-1": {
    answer: "1",
    steps: [
      "This is a fundamental limit in calculus",
      "As x approaches 0, sin(x)/x approaches 1",
      "This can be proven using L'Hôpital's rule or the Taylor series expansion of sin(x)"
    ]
  },
  "geo-coord-1": {
    answer: "5",
    steps: [
      "Use the distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
      "d = √[(−1 - 3)² + (7 - 4)²]",
      "d = √[(-4)² + 3²]",
      "d = √[16 + 9]",
      "d = √25 = 5"
    ]
  }
};
