
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Predefined questions organized by topics and difficulty
const prebuiltQuestions = {
  'Algebra': {
    'Linear Equations': {
      'easy': [
        {
          question: "Solve for x: 2x + 3 = 7",
          answer: "x = 2",
          steps: ["Subtract 3 from both sides: 2x = 4", "Divide both sides by 2: x = 2"],
          marks: 2,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "Solve for y: 3y - 5 = 10",
          answer: "y = 5",
          steps: ["Add 5 to both sides: 3y = 15", "Divide both sides by 3: y = 5"],
          marks: 2,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "Find the value of x in the equation 4x - 8 = 12",
          answer: "x = 5",
          steps: ["Add 8 to both sides: 4x = 20", "Divide both sides by 4: x = 5"],
          marks: 2,
          type: "short-answer",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "Solve the system of equations: 2x + y = 5 and 3x - 2y = 4",
          answer: "x = 2, y = 1",
          steps: [
            "From the first equation: y = 5 - 2x",
            "Substitute into the second equation: 3x - 2(5 - 2x) = 4",
            "Simplify: 3x - 10 + 4x = 4",
            "Combine like terms: 7x - 10 = 4",
            "Add 10 to both sides: 7x = 14",
            "Divide by 7: x = 2",
            "Substitute back: y = 5 - 2(2) = 5 - 4 = 1"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "medium"
        },
        {
          question: "Solve the equation 3(2x - 4) = 18 - 2(x + 3)",
          answer: "x = 5",
          steps: [
            "Expand the left side: 6x - 12 = 18 - 2x - 6",
            "Simplify the right side: 6x - 12 = 12 - 2x",
            "Add 2x to both sides: 8x - 12 = 12",
            "Add 12 to both sides: 8x = 24",
            "Divide by 8: x = 3"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "Find the values of x and y that satisfy the system: 4x - 3y = 10 and 7x + 2y = 13",
          answer: "x = 2, y = -\u2154",
          steps: [
            "Multiply the first equation by 7: 28x - 21y = 70",
            "Multiply the second equation by 4: 28x + 8y = 52",
            "Subtract the second equation from the first: -29y = 18",
            "Divide by -29: y = -\u2154",
            "Substitute back into 4x - 3y = 10: 4x - 3(-\u2154) = 10",
            "Simplify: 4x + \u2078/\u2079 = 10",
            "Subtract \u2078/\u2079 from both sides: 4x = 10 - \u2078/\u2079 = \u2079\u2080/\u2079 - \u2078/\u2079 = \u2080\u2082/\u2079",
            "Divide both sides by 4: x = \u2080\u2082/\u2073\u2086 = 2.28..."
          ],
          marks: 6,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    },
    'Quadratic Equations': {
      'easy': [
        {
          question: "Solve the quadratic equation: x² - 5x + 6 = 0",
          answer: "x = 2 or x = 3",
          steps: [
            "This quadratic can be factored as (x - 2)(x - 3) = 0",
            "Using the zero product property: x - 2 = 0 or x - 3 = 0",
            "Therefore, x = 2 or x = 3"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "Find the roots of the equation x² - 7x + 12 = 0",
          answer: "x = 3 or x = 4",
          steps: [
            "Factor the equation as (x - 3)(x - 4) = 0",
            "By the zero product property, x - 3 = 0 or x - 4 = 0",
            "Therefore, x = 3 or x = 4"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "Solve the quadratic equation: 2x² + 5x - 3 = 0",
          answer: "x = -3 or x = \u00BD",
          steps: [
            "Using the quadratic formula: x = \u207B-b ± √(b² - 4ac)/2a",
            "With a = 2, b = 5, c = -3",
            "x = (-5 ± √(25 + 24))/4",
            "x = (-5 ± √49)/4",
            "x = (-5 ± 7)/4",
            "x = (-5 + 7)/4 or x = (-5 - 7)/4",
            "x = 2/4 = 1/2 or x = -12/4 = -3"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "Find the equation of a quadratic function whose graph passes through the points (-1, 4), (1, 0), and (2, 3)",
          answer: "f(x) = 2x² - 3x - 1",
          steps: [
            "Let the quadratic function be f(x) = ax² + bx + c",
            "Substitute the three points into the equation:",
            "(-1, 4): a(-1)² + b(-1) + c = 4 => a - b + c = 4",
            "(1, 0): a(1)² + b(1) + c = 0 => a + b + c = 0",
            "(2, 3): a(2)² + b(2) + c = 3 => 4a + 2b + c = 3",
            "From the second equation: c = -a - b",
            "Substitute into the first equation: a - b + (-a - b) = 4 => -2b = 4 => b = -2",
            "Substitute into the third equation: 4a + 2(-2) + (-a - (-2)) = 3 => 4a - 4 - a + 2 = 3 => 3a = 5 => a = 5/3",
            "Finally, c = -a - b = -(5/3) - (-2) = -5/3 + 2 = 1/3",
            "Therefore, f(x) = (5/3)x² - 2x + 1/3"
          ],
          marks: 6,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    }
  },
  'Calculus': {
    'Limits': {
      'easy': [
        {
          question: "Evaluate the limit: lim(x→2) (x² - 4)/(x - 2)",
          answer: "4",
          steps: [
            "Factoring the numerator: lim(x→2) (x - 2)(x + 2)/(x - 2)",
            "Canceling common factors: lim(x→2) (x + 2)",
            "Substituting x = 2: 2 + 2 = 4"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "Find the limit: lim(x→3) (x² - 9)/(x - 3)",
          answer: "6",
          steps: [
            "Factoring the numerator: lim(x→3) (x - 3)(x + 3)/(x - 3)",
            "Canceling common factors: lim(x→3) (x + 3)",
            "Substituting x = 3: 3 + 3 = 6"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "Evaluate the limit: lim(x→0) (sin(3x)/x)",
          answer: "3",
          steps: [
            "Use the formula lim(x→0) (sin(ax)/x) = a",
            "With a = 3, the limit is 3"
          ],
          marks: 4,
          type: "short-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "Find the limit: lim(x→0) (1 - cos(x))/x²",
          answer: "1/2",
          steps: [
            "Use the Taylor series expansion: cos(x) = 1 - x²/2! + x⁴/4! - ...",
            "Substitute: lim(x→0) (1 - (1 - x²/2 + ...))/x²",
            "Simplify: lim(x→0) (x²/2 - x⁴/24 + ...)/x²",
            "Simplify further: lim(x→0) (1/2 - x²/24 + ...)",
            "As x approaches 0, the limit is 1/2"
          ],
          marks: 6,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    },
    'Derivatives': {
      'easy': [
        {
          question: "Find the derivative of f(x) = 3x² + 2x - 5",
          answer: "f'(x) = 6x + 2",
          steps: [
            "Apply the power rule to each term:",
            "d/dx(3x²) = 3 · 2x = 6x",
            "d/dx(2x) = 2",
            "d/dx(-5) = 0",
            "Combine the results: f'(x) = 6x + 2 + 0 = 6x + 2"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "Find the derivative of g(x) = x³ - 4x + 7",
          answer: "g'(x) = 3x² - 4",
          steps: [
            "Apply the power rule to each term:",
            "d/dx(x³) = 3x²",
            "d/dx(-4x) = -4",
            "d/dx(7) = 0",
            "Combine the results: g'(x) = 3x² - 4 + 0 = 3x² - 4"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "Find the derivative of h(x) = x²e^x",
          answer: "h'(x) = x²e^x + 2xe^x = e^x(x² + 2x)",
          steps: [
            "Use the product rule: d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)",
            "With f(x) = x² and g(x) = e^x",
            "f'(x) = 2x and g'(x) = e^x",
            "h'(x) = 2x·e^x + x²·e^x",
            "Factoring: h'(x) = e^x(2x + x²)",
            "Therefore, h'(x) = e^x(x² + 2x)"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "Find the derivative of f(x) = ln(sin(x²))",
          answer: "f'(x) = 2x·cot(x²)",
          steps: [
            "Apply the chain rule multiple times:",
            "Let u = sin(x²) and v = x²",
            "f'(x) = (d/du)[ln(u)] · (d/dv)[sin(v)] · (d/dx)[v]",
            "(d/du)[ln(u)] = 1/u = 1/sin(x²)",
            "(d/dv)[sin(v)] = cos(v) = cos(x²)",
            "(d/dx)[v] = (d/dx)[x²] = 2x",
            "f'(x) = (1/sin(x²)) · cos(x²) · 2x",
            "Simplify: f'(x) = 2x · (cos(x²)/sin(x²))",
            "Using the identity cot(θ) = cos(θ)/sin(θ): f'(x) = 2x · cot(x²)"
          ],
          marks: 6,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    },
    'Integration': {
      'easy': [
        {
          question: "Evaluate the indefinite integral: ∫(3x² + 2x)dx",
          answer: "x³ + x² + C",
          steps: [
            "Integrate term by term:",
            "∫3x²dx = 3∫x²dx = 3(x³/3) = x³",
            "∫2xdx = 2∫xdx = 2(x²/2) = x²",
            "Combine the results: ∫(3x² + 2x)dx = x³ + x² + C"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "Calculate ∫(4x³ - 2x + 5)dx",
          answer: "x⁴ - x² + 5x + C",
          steps: [
            "Integrate term by term:",
            "∫4x³dx = 4∫x³dx = 4(x⁴/4) = x⁴",
            "∫(-2x)dx = -2∫xdx = -2(x²/2) = -x²",
            "∫5dx = 5x",
            "Combine the results: ∫(4x³ - 2x + 5)dx = x⁴ - x² + 5x + C"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "Evaluate the definite integral: ∫₀²(x² - 2x)dx",
          answer: "0",
          steps: [
            "Find the antiderivative: ∫(x² - 2x)dx = (x³/3 - x²) + C",
            "Apply the Fundamental Theorem of Calculus:",
            "∫₀²(x² - 2x)dx = [x³/3 - x²]₀²",
            "= (2³/3 - 2²) - (0³/3 - 0²)",
            "= (8/3 - 4) - 0",
            "= 8/3 - 4",
            "= 8/3 - 12/3",
            "= -4/3"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "Evaluate the integral: ∫(x·sin(x²))dx",
          answer: "-(1/2)·cos(x²) + C",
          steps: [
            "Use substitution: let u = x², then du = 2x dx",
            "So x dx = du/2",
            "The integral becomes: ∫(sin(u)·du/2)",
            "= (1/2)∫sin(u)du",
            "= (1/2)(-cos(u)) + C",
            "Substituting back: (1/2)(-cos(x²)) + C",
            "Simplify: -(1/2)·cos(x²) + C"
          ],
          marks: 6,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    }
  },
  'Geometry': {
    'Coordinate Geometry': {
      'easy': [
        {
          question: "Find the distance between the points (3, 4) and (6, 8)",
          answer: "5",
          steps: [
            "Use the distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
            "d = √[(6 - 3)² + (8 - 4)²]",
            "d = √[3² + 4²]",
            "d = √[9 + 16]",
            "d = √25 = 5"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "Find the slope of the line passing through the points (2, 3) and (5, 9)",
          answer: "2",
          steps: [
            "Use the slope formula: m = (y₂ - y₁)/(x₂ - x₁)",
            "m = (9 - 3)/(5 - 2)",
            "m = 6/3 = 2"
          ],
          marks: 2,
          type: "short-answer",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "Find the equation of a line that passes through the point (3, 5) and is perpendicular to the line 2x - 3y + 6 = 0",
          answer: "3x + 2y - 19 = 0",
          steps: [
            "Rewrite the given line in slope-intercept form: 2x - 3y + 6 = 0 → 3y = 2x + 6 → y = (2/3)x + 2",
            "The slope of the given line is 2/3",
            "The slope of a perpendicular line is the negative reciprocal: m = -3/2",
            "Use point-slope form: y - y₁ = m(x - x₁)",
            "y - 5 = (-3/2)(x - 3)",
            "y - 5 = -3x/2 + 9/2",
            "y = -3x/2 + 9/2 + 5",
            "y = -3x/2 + 19/2",
            "Multiply by 2 to clear fractions: 2y = -3x + 19",
            "Rearrange to standard form: 3x + 2y - 19 = 0"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "Find the area of the triangle formed by the points A(1, 2), B(4, 5), and C(2, 8)",
          answer: "7.5 square units",
          steps: [
            "We can use the formula Area = (1/2)|x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)|",
            "Substitute the coordinates: Area = (1/2)|1(5 - 8) + 4(8 - 2) + 2(2 - 5)|",
            "Area = (1/2)|1(-3) + 4(6) + 2(-3)|",
            "Area = (1/2)|-3 + 24 - 6|",
            "Area = (1/2)|15|",
            "Area = 7.5 square units"
          ],
          marks: 5,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    }
  },
  'Trigonometry': {
    'Basic Ratios': {
      'easy': [
        {
          question: "Find the value of sin(30°)",
          answer: "1/2",
          steps: [
            "This is a common angle. The value of sin(30°) = 1/2"
          ],
          marks: 1,
          type: "multiple-choice",
          difficulty: "easy"
        },
        {
          question: "Calculate the value of cos(60°)",
          answer: "1/2",
          steps: [
            "This is a common angle. The value of cos(60°) = 1/2"
          ],
          marks: 1,
          type: "multiple-choice",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "Find the value of tan(π/4) without a calculator",
          answer: "1",
          steps: [
            "tan(π/4) = sin(π/4)/cos(π/4)",
            "We know that sin(π/4) = 1/√2 and cos(π/4) = 1/√2",
            "Therefore, tan(π/4) = (1/√2)/(1/√2) = 1"
          ],
          marks: 3,
          type: "short-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "If sin(α) = 3/5 and α is in the first quadrant, find the value of sin(2α)",
          answer: "24/25",
          steps: [
            "Use the double angle formula: sin(2α) = 2sin(α)cos(α)",
            "We know sin(α) = 3/5",
            "To find cos(α), use the Pythagorean identity: sin²(α) + cos²(α) = 1",
            "cos²(α) = 1 - sin²(α) = 1 - (3/5)² = 1 - 9/25 = 16/25",
            "Since α is in the first quadrant, cos(α) = 4/5",
            "Now, sin(2α) = 2sin(α)cos(α) = 2(3/5)(4/5) = 2(12/25) = 24/25"
          ],
          marks: 5,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    }
  },
  'Probability': {
    'Basic Probability': {
      'easy': [
        {
          question: "A fair six-sided die is rolled. What is the probability of rolling a number greater than 4?",
          answer: "1/3",
          steps: [
            "The sample space consists of outcomes {1, 2, 3, 4, 5, 6}",
            "The favorable outcomes are {5, 6}",
            "Probability = Number of favorable outcomes / Total number of outcomes",
            "Probability = 2/6 = 1/3"
          ],
          marks: 2,
          type: "short-answer",
          difficulty: "easy"
        },
        {
          question: "A card is drawn at random from a standard deck of 52 cards. What is the probability of drawing a king?",
          answer: "1/13",
          steps: [
            "In a standard deck, there are 4 kings out of 52 cards",
            "Probability = Number of favorable outcomes / Total number of outcomes",
            "Probability = 4/52 = 1/13"
          ],
          marks: 2,
          type: "short-answer",
          difficulty: "easy"
        }
      ],
      'medium': [
        {
          question: "A bag contains 5 red marbles, 3 green marbles, and 2 blue marbles. If two marbles are drawn without replacement, what is the probability that both marbles are red?",
          answer: "2/9",
          steps: [
            "Total number of marbles = 5 + 3 + 2 = 10",
            "Probability of drawing a red marble first = 5/10 = 1/2",
            "After drawing a red marble, there are 4 red marbles left out of 9 total marbles",
            "Probability of drawing a second red marble = 4/9",
            "Using the multiplication principle for 'and' events: P(both red) = P(first red) × P(second red | first red)",
            "P(both red) = (1/2) × (4/9) = 4/18 = 2/9"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "medium"
        }
      ],
      'hard': [
        {
          question: "Three fair coins are tossed. Find the probability of getting at least two heads.",
          answer: "1/2",
          steps: [
            "The sample space consists of 2³ = 8 equally likely outcomes: {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}",
            "The favorable outcomes are: {HHH, HHT, HTH, THH}",
            "Probability = Number of favorable outcomes / Total number of outcomes",
            "Probability = 4/8 = 1/2"
          ],
          marks: 4,
          type: "long-answer",
          difficulty: "hard"
        }
      ]
    }
  }
};

// Attempt to use Gemini API, but fallback to prebuilt questions if needed
async function generateQuestionsWithGemini(prompt: string, geminiApiKey: string | undefined) {
  if (!geminiApiKey) {
    console.log("No Gemini API key provided, using prebuilt questions");
    throw new Error("Gemini API key is not configured");
  }

  try {
    console.log("Generating questions with Gemini API");
    
    // Update the API endpoint to the correct version and model
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent";
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": geminiApiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error (${response.status}): ${errorText}`);
      throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data));

    // Extract text from the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No text returned from Gemini API");
    }

    // Try to extract JSON from the text
    try {
      // Look for JSON content which might be wrapped in markdown code blocks
      const jsonRegex = /```json\s*(\{[\s\S]*?\})\s*```|(\{[\s\S]*?\})/;
      const match = text.match(jsonRegex);
      
      if (match) {
        const jsonText = match[1] || match[2];
        return JSON.parse(jsonText);
      } else {
        // If no JSON format was found, try to parse the whole text
        return JSON.parse(text);
      }
    } catch (parseError) {
      console.error("Error parsing JSON from Gemini response:", parseError);
      throw new Error("Failed to parse questions from Gemini response");
    }
  } catch (error) {
    console.error("Error using Gemini API:", error);
    throw error;
  }
}

// Helper function to get prebuilt questions based on topic and difficulty
function getPrebuiltQuestions(topic: string, subtopics: string[], difficulty: string, count: number) {
  const questions: any[] = [];
  let availableQuestions: any[] = [];

  // Collect all available questions matching the criteria
  if (prebuiltQuestions[topic]) {
    subtopics.forEach(subtopic => {
      if (prebuiltQuestions[topic][subtopic] && prebuiltQuestions[topic][subtopic][difficulty]) {
        availableQuestions = [...availableQuestions, ...prebuiltQuestions[topic][subtopic][difficulty]];
      }
    });
  }

  // If no specific questions found, get questions from any subtopic of the given topic
  if (availableQuestions.length === 0 && prebuiltQuestions[topic]) {
    Object.keys(prebuiltQuestions[topic]).forEach(subtopic => {
      if (prebuiltQuestions[topic][subtopic][difficulty]) {
        availableQuestions = [...availableQuestions, ...prebuiltQuestions[topic][subtopic][difficulty]];
      }
    });
  }

  // If still no questions, get questions from any topic
  if (availableQuestions.length === 0) {
    Object.keys(prebuiltQuestions).forEach(t => {
      Object.keys(prebuiltQuestions[t]).forEach(st => {
        if (prebuiltQuestions[t][st][difficulty]) {
          availableQuestions = [...availableQuestions, ...prebuiltQuestions[t][st][difficulty]];
        }
      });
    });
  }

  // If we still don't have enough questions, use medium difficulty
  if (availableQuestions.length < count) {
    Object.keys(prebuiltQuestions).forEach(t => {
      Object.keys(prebuiltQuestions[t]).forEach(st => {
        if (prebuiltQuestions[t][st]['medium']) {
          availableQuestions = [...availableQuestions, ...prebuiltQuestions[t][st]['medium']];
        }
      });
    });
  }

  // Randomly select questions
  const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const reqData = await req.json();
    console.log("Request data:", JSON.stringify(reqData));

    // Handle different request types
    if (reqData.sections) {
      // Section-based request
      const { sections, config } = reqData;
      const allQuestions: any[] = [];

      for (const section of sections) {
        try {
          console.log(`Generating questions for ${section.name}`);
          
          // Create prompt for Gemini
          const prompt = `
            Generate ${section.questionCount} math questions about ${section.topic}, specifically on ${section.subtopics.join(', ')}.
            The questions should be at ${config.difficulty} difficulty level for ${config.educationLevel} students in grade ${config.grade}.
            Each question should have:
            1. A clear question statement
            2. The correct answer
            3. Step-by-step solution
            4. Marks value (between 1-${Math.max(5, Math.ceil(section.marks/section.questionCount))})
            5. Question type (one of: multiple-choice, short-answer, long-answer, numerical, theorem)
            
            Format your response as a valid JSON array of question objects, like this:
            [
              {
                "question": "Question text here",
                "answer": "Answer here",
                "steps": ["Step 1", "Step 2", "Step 3"],
                "marks": 3,
                "type": "short-answer",
                "difficulty": "${config.difficulty}"
              },
              ...more questions
            ]
            
            Only respond with the JSON array, no introduction or conclusion text.
          `;
          
          // Try to use Gemini API but fallback to prebuilt questions
          let sectionQuestions;
          try {
            const geminiResponse = await generateQuestionsWithGemini(prompt, geminiApiKey);
            sectionQuestions = geminiResponse.questions || geminiResponse;
            console.log(`Generated ${sectionQuestions.length} questions with Gemini for ${section.name}`);
          } catch (error) {
            console.log(`Falling back to prebuilt questions for ${section.name}: ${error.message}`);
            sectionQuestions = getPrebuiltQuestions(
              section.topic, 
              section.subtopics,
              config.difficulty,
              section.questionCount
            );
            console.log(`Selected ${sectionQuestions.length} prebuilt questions for ${section.name}`);
          }
          
          // Add questions to the collection
          allQuestions.push(...sectionQuestions);
          
        } catch (sectionError) {
          console.error(`Error generating questions for ${section.name}:`, sectionError);
          throw new Error(`Failed to generate questions for ${section.name}: ${sectionError.message}`);
        }
      }

      return new Response(JSON.stringify({ questions: allQuestions }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else if (reqData.content) {
      // Content-based extraction request
      // Just return some prebuilt questions based on the difficulty
      const difficulty = reqData.config?.difficulty || 'medium';
      const questionsCount = 10;
      
      const extractedQuestions: any[] = [];
      Object.keys(prebuiltQuestions).forEach(topic => {
        Object.keys(prebuiltQuestions[topic]).forEach(subtopic => {
          if (prebuiltQuestions[topic][subtopic][difficulty]) {
            extractedQuestions.push(...prebuiltQuestions[topic][subtopic][difficulty]);
          }
        });
      });

      // Randomly select a subset of questions
      const selectedQuestions = extractedQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, questionsCount);

      return new Response(JSON.stringify({ questions: selectedQuestions }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: "Invalid request format" }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error in generate-questions function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
