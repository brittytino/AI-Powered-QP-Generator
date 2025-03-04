
// Questions data structure
export interface QuestionItem {
  id: string;
  question: string;
  marks: number;
  type: 'multiple-choice' | 'short-answer' | 'long-answer' | 'numerical' | 'theorem';
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  subtopic: string;
}

// Question bank organized by topics and subtopics
export const questionBank: Record<string, Record<string, QuestionItem[]>> = {
  "Algebra": {
    "Linear Equations": [
      {
        id: "alg-lin-1",
        question: "Solve for x: 3x + 7 = 22",
        marks: 2,
        type: "short-answer",
        difficulty: "easy",
        topic: "Algebra",
        subtopic: "Linear Equations"
      },
      {
        id: "alg-lin-2",
        question: "Find the value of x in the equation 5x - 3 = 2x + 9",
        marks: 3,
        type: "short-answer",
        difficulty: "easy",
        topic: "Algebra",
        subtopic: "Linear Equations"
      },
      {
        id: "alg-lin-3",
        question: "Solve the system of equations: 2x + y = 5 and 3x - 2y = 4",
        marks: 5,
        type: "long-answer",
        difficulty: "medium",
        topic: "Algebra",
        subtopic: "Linear Equations"
      }
    ],
    "Quadratic Equations": [
      {
        id: "alg-quad-1",
        question: "Solve the quadratic equation: x² + 5x + 6 = 0",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Algebra",
        subtopic: "Quadratic Equations"
      },
      {
        id: "alg-quad-2",
        question: "Find the roots of the equation: 2x² - 7x + 3 = 0",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Algebra",
        subtopic: "Quadratic Equations"
      },
      {
        id: "alg-quad-3",
        question: "For what values of k will the equation x² + kx + 4 = 0 have equal roots?",
        marks: 5,
        type: "long-answer",
        difficulty: "hard",
        topic: "Algebra",
        subtopic: "Quadratic Equations"
      }
    ],
    "Polynomials": [
      {
        id: "alg-poly-1",
        question: "Find all the zeros of the polynomial p(x) = x³ - 3x² + 3x - 1",
        marks: 5,
        type: "long-answer",
        difficulty: "hard",
        topic: "Algebra",
        subtopic: "Polynomials"
      },
      {
        id: "alg-poly-2",
        question: "If one zero of the polynomial f(x) = x² - 3x + k is 2, find the value of k and the other zero.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Algebra",
        subtopic: "Polynomials"
      }
    ],
    "Matrices": [
      {
        id: "alg-mat-1",
        question: "If A = \\begin{pmatrix} 2 & 3 \\\\ 1 & 4 \\end{pmatrix}, find A²",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Algebra",
        subtopic: "Matrices"
      },
      {
        id: "alg-mat-2",
        question: "Prove that \\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix} represents a rotation matrix.",
        marks: 5,
        type: "long-answer",
        difficulty: "hard",
        topic: "Algebra",
        subtopic: "Matrices"
      }
    ]
  },
  "Calculus": {
    "Limits": [
      {
        id: "calc-lim-1",
        question: "Evaluate \\lim_{x \\to 0} \\frac{\\sin x}{x}",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Calculus",
        subtopic: "Limits"
      },
      {
        id: "calc-lim-2",
        question: "Find \\lim_{x \\to 2} \\frac{x^2-4}{x-2}",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Calculus",
        subtopic: "Limits"
      }
    ],
    "Derivatives": [
      {
        id: "calc-der-1",
        question: "Find the derivative of f(x) = x^3 - 4x^2 + 7x - 2",
        marks: 3,
        type: "short-answer",
        difficulty: "easy",
        topic: "Calculus",
        subtopic: "Derivatives"
      },
      {
        id: "calc-der-2",
        question: "If f(x) = \\sin(2x) \\cdot \\cos(3x), find f'(x)",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Calculus",
        subtopic: "Derivatives"
      },
      {
        id: "calc-der-3",
        question: "Find the points on the curve y = x^3 - 3x + 1 where the tangent is parallel to the x-axis.",
        marks: 5,
        type: "long-answer",
        difficulty: "hard",
        topic: "Calculus",
        subtopic: "Derivatives"
      }
    ],
    "Integration": [
      {
        id: "calc-int-1",
        question: "Evaluate \\int x^2 \\cdot \\cos(x) dx",
        marks: 4,
        type: "long-answer",
        difficulty: "medium",
        topic: "Calculus",
        subtopic: "Integration"
      },
      {
        id: "calc-int-2",
        question: "Find the area under the curve y = x^2 from x = 0 to x = 2",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Calculus",
        subtopic: "Integration"
      }
    ],
    "Differential Equations": [
      {
        id: "calc-diff-1",
        question: "Solve the differential equation \\frac{dy}{dx} = e^{2x}",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Calculus",
        subtopic: "Differential Equations"
      },
      {
        id: "calc-diff-2",
        question: "Find the general solution to the differential equation \\frac{d^2y}{dx^2} + 4\\frac{dy}{dx} + 4y = 0",
        marks: 5,
        type: "long-answer",
        difficulty: "hard",
        topic: "Calculus",
        subtopic: "Differential Equations"
      }
    ]
  },
  "Geometry": {
    "Coordinate Geometry": [
      {
        id: "geo-coord-1",
        question: "Find the distance between the points (3, 4) and (-1, 7)",
        marks: 2,
        type: "short-answer",
        difficulty: "easy",
        topic: "Geometry",
        subtopic: "Coordinate Geometry"
      },
      {
        id: "geo-coord-2",
        question: "Find the equation of a line passing through (2, 3) and perpendicular to the line 2x + y = 5",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Geometry",
        subtopic: "Coordinate Geometry"
      }
    ],
    "Circles": [
      {
        id: "geo-circ-1",
        question: "Find the equation of a circle with center (2, -3) and passing through the origin",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Geometry",
        subtopic: "Circles"
      },
      {
        id: "geo-circ-2",
        question: "Find the center and radius of the circle given by the equation x^2 + y^2 - 6x + 4y + 9 = 0",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Geometry",
        subtopic: "Circles"
      }
    ],
    "Triangles": [
      {
        id: "geo-tri-1",
        question: "In a triangle ABC, if a = 5, b = 6, and c = 7, find the measure of angle A.",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Geometry",
        subtopic: "Triangles"
      },
      {
        id: "geo-tri-2",
        question: "Prove that the centroid of a triangle divides each median in the ratio 2:1.",
        marks: 5,
        type: "long-answer",
        difficulty: "hard",
        topic: "Geometry",
        subtopic: "Triangles"
      }
    ],
    "Polygons": [
      {
        id: "geo-poly-1",
        question: "Find the sum of the interior angles of a regular pentagon.",
        marks: 2,
        type: "short-answer",
        difficulty: "easy",
        topic: "Geometry",
        subtopic: "Polygons"
      },
      {
        id: "geo-poly-2",
        question: "In a regular hexagon with side length 4 cm, find the area of the hexagon.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Geometry",
        subtopic: "Polygons"
      }
    ]
  },
  "Trigonometry": {
    "Basic Ratios": [
      {
        id: "trig-basic-1",
        question: "If \\sin\\theta = \\frac{3}{5}, find the value of \\cos\\theta and \\tan\\theta.",
        marks: 3,
        type: "short-answer",
        difficulty: "easy",
        topic: "Trigonometry",
        subtopic: "Basic Ratios"
      },
      {
        id: "trig-basic-2",
        question: "Find the value of \\sin 60° + \\cos 30° - \\tan 45°.",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Trigonometry",
        subtopic: "Basic Ratios"
      }
    ],
    "Identities": [
      {
        id: "trig-id-1",
        question: "Prove that \\sin^4 \\theta - \\cos^4 \\theta = \\sin^2 \\theta - \\cos^2 \\theta",
        marks: 4,
        type: "long-answer",
        difficulty: "medium",
        topic: "Trigonometry",
        subtopic: "Identities"
      },
      {
        id: "trig-id-2",
        question: "If \\sin\\alpha + \\sin\\beta = a and \\cos\\alpha + \\cos\\beta = b, find the value of \\sin(\\alpha + \\beta) and \\cos(\\alpha - \\beta) in terms of a and b.",
        marks: 5,
        type: "long-answer",
        difficulty: "hard",
        topic: "Trigonometry",
        subtopic: "Identities"
      }
    ],
    "Heights and Distances": [
      {
        id: "trig-hd-1",
        question: "From a point on the ground, the angle of elevation of the top of a tower is 30°. If the height of the tower is 100m, find the distance of the point from the base of the tower.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Trigonometry",
        subtopic: "Heights and Distances"
      },
      {
        id: "trig-hd-2",
        question: "A person on the top of a cliff 120m high observes a boat at an angle of depression of 35°. Find the distance of the boat from the base of the cliff.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Trigonometry",
        subtopic: "Heights and Distances"
      }
    ]
  },
  "Probability": {
    "Basic Probability": [
      {
        id: "prob-basic-1",
        question: "A bag contains 5 red marbles and 7 blue marbles. If two marbles are drawn at random without replacement, find the probability that both are red.",
        marks: 3,
        type: "short-answer",
        difficulty: "medium",
        topic: "Probability",
        subtopic: "Basic Probability"
      },
      {
        id: "prob-basic-2",
        question: "Three fair dice are rolled. Find the probability of getting a sum of 10.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Probability",
        subtopic: "Basic Probability"
      }
    ],
    "Conditional Probability": [
      {
        id: "prob-cond-1",
        question: "In a class, 60% of the students play cricket and 40% play football. If 25% of the students play both games, find the probability that a randomly selected student plays at least one game.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Probability",
        subtopic: "Conditional Probability"
      },
      {
        id: "prob-cond-2",
        question: "A box contains 10 bulbs, out of which 3 are defective. If 2 bulbs are drawn at random, find the probability that the second bulb is defective given that the first one is defective.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Probability",
        subtopic: "Conditional Probability"
      }
    ],
    "Statistics": [
      {
        id: "prob-stat-1",
        question: "The mean of 20 observations is 42. If one of the observations is 50, find the mean of the remaining observations.",
        marks: 3,
        type: "short-answer",
        difficulty: "easy",
        topic: "Probability",
        subtopic: "Statistics"
      },
      {
        id: "prob-stat-2",
        question: "The marks of 10 students in a math test are: 65, 72, 84, 56, 91, 75, 68, 77, 83, 79. Find the mean, median and mode of the data.",
        marks: 4,
        type: "short-answer",
        difficulty: "medium",
        topic: "Probability",
        subtopic: "Statistics"
      }
    ]
  }
};
