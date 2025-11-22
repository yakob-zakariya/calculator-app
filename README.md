# Frontend Mentor - Calculator App Solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
- [Author](#author)
- [Getting Started](#getting-started)

## Overview

### The Challenge

Users should be able to:

- ✅ See the size of the elements adjust based on their device's screen size
- ✅ Perform mathematical operations like addition, subtraction, multiplication, and division
- ✅ Adjust the color theme based on their preference
- ✅ Have their initial theme preference checked and set based on the browser/OS settings
- ✅ Delete numbers from the input
- ✅ Reset the calculator to its initial state
- ✅ Chain multiple operations together
- ✅ Replace operators (e.g., press + then _ to replace + with _)

### Screenshot

![Calculator App Screenshot](./preview.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/yakob-zakariya/calculator-app)
- Live Site URL: [Live Demo](#) <!-- Add your Vercel URL here -->

## My Process

### Built With

- **React 19** - Latest React with React Compiler enabled
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework with custom theming
- **Semantic HTML5** markup
- **CSS Custom Properties** - For dynamic theme switching
- **Mobile-first workflow** - Responsive design approach
- **League Spartan** - Google Font

### What I Learned

This project helped me master several important concepts:

#### 1. **Complex State Management**

Managing calculator state with multiple variables:

```jsx
const [expression, setExpression] = useState("");
const [currentNumber, setCurrentNumber] =
  useState("0");
const [result, setResult] = useState(null);
```

#### 2. **Operator Replacement Logic**

Implemented smart operator replacement - when user presses `+` then `*`, it replaces the operator instead of creating invalid expression:

```jsx
// If expression ends with an operator, replace it
if (
  ["+", "-", "*", "/"].includes(
    trimmed[trimmed.length - 1]
  )
) {
  const withoutLastOperator = trimmed
    .slice(0, -1)
    .trim();
  setExpression(
    `${withoutLastOperator} ${operator}`
  );
}
```

#### 3. **Smart DEL Button**

DEL button handles multiple scenarios:

- Deletes from current number when typing
- Removes operator when pressed after operator
- Clears result when pressed after calculation

```jsx
const handleDelete = () => {
  if (currentNumber !== "0") {
    // Delete from current number
    setCurrentNumber(currentNumber.slice(0, -1));
  } else if (expression) {
    // Remove operator from expression
    const withoutOperator = expression
      .slice(0, -1)
      .trim();
    setCurrentNumber(withoutOperator);
    setExpression("");
  }
};
```

#### 4. **Dynamic Theming with CSS Variables**

Used Tailwind CSS v4's `@theme` directive for semantic color tokens:

```css
@theme {
  --color-bg-main: hsl(222, 26%, 31%);
  --color-key-primary-bg: hsl(225, 21%, 49%);
  --color-key-secondary-bg: hsl(176, 100%, 44%);
}

.theme-1 {
  /* Navy theme */
}
.theme-2 {
  /* Light theme */
}
.theme-3 {
  /* Purple theme */
}
```

#### 5. **Safe Calculation Without eval()**

Implemented manual expression parsing to avoid security risks:

```jsx
const calculate = (expr) => {
  const match = expr.match(
    /^([\d.]+)\s*([+\-*/])\s*([\d.]+)$/
  );
  const num1 = parseFloat(match[1]);
  const operator = match[2];
  const num2 = parseFloat(match[3]);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error";
  }
};
```

#### 6. **Chained Operations**

Calculator automatically calculates intermediate results:

- Type: `5 + 3 -` → Shows `8 -` (calculated 5+3 first)
- Then type: `2 =` → Shows `6`

### Continued Development

Areas I want to focus on in future projects:

- **Keyboard Support**: Add keyboard event listeners for number/operator input
- **Calculation History**: Show previous calculations
- **Advanced Operations**: Add percentage, square root, power functions
- **Accessibility**: Improve ARIA labels and screen reader support
- **Animations**: Add micro-interactions for button presses
- **TypeScript**: Convert to TypeScript for better type safety

## Author

- Frontend Mentor - [@yakob-zakariya](https://www.frontendmentor.io/profile/yakob-zakariya)
- GitHub - [@yakob-zakariya](https://github.com/yakob-zakariya)

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yakob-zakariya/calculator-app.git
cd calculator-app
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Features

- ✅ **Four Basic Operations**: Addition, subtraction, multiplication, division
- ✅ **Chained Operations**: Perform multiple operations in sequence
- ✅ **Decimal Support**: Calculate with decimal numbers
- ✅ **Smart Operator Replacement**: Press different operators to replace the last one
- ✅ **DEL Button**: Delete last digit or operator
- ✅ **RESET Button**: Clear everything and start fresh
- ✅ **Three Color Themes**: Navy (default), Light, Purple
- ✅ **Theme Persistence**: Remembers your theme choice
- ✅ **Fully Responsive**: Works on mobile, tablet, and desktop
- ✅ **Error Handling**: Handles division by zero gracefully
- ✅ **Clean UI**: Professional design with smooth transitions

---

**Challenge completed! 🎉**
