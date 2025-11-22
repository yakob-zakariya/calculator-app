import { useState } from "react";

const App = () => {
  const [expression, setExpression] =
    useState("");
  const [currentNumber, setCurrentNumber] =
    useState("0");
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState(1);

  const signs = [
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    {
      label: "DEL",
      value: "DEL",
      type: "primary",
    },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "+", value: "+" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "-", value: "-" },
    { label: ".", value: "." },
    { label: "0", value: "0" },
    { label: "/", value: "/" },
    { label: "x", value: "*" },
    {
      label: "RESET",
      value: "RESET",
      type: "primary",
    },
    { label: "=", value: "=", type: "secondary" },
  ];

  // Perform calculation
  const calculate = (expr) => {
    try {
      // Parse the expression manually to avoid eval
      // Match pattern: number operator number
      const match = expr.match(
        /^([\d.]+)\s*([+\-*/])\s*([\d.]+)$/
      );

      if (!match) return expr;

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
          return num2 !== 0
            ? num1 / num2
            : "Error";
        default:
          return expr;
      }
    } catch {
      return "Error";
    }
  };

  // Get what to display
  const getDisplayValue = () => {
    if (result !== null) {
      return String(result);
    }
    if (expression && currentNumber !== "0") {
      return `${expression} ${currentNumber}`;
    }
    if (expression) {
      return expression;
    }
    return currentNumber;
  };

  // Handle number and decimal input
  const handleNumberInput = (value) => {
    // If we just calculated, start fresh
    if (result !== null) {
      setCurrentNumber(value);
      setExpression("");
      setResult(null);
      return;
    }

    // Prevent multiple decimal points
    if (
      value === "." &&
      currentNumber.includes(".")
    ) {
      return;
    }

    // Replace initial 0 with number (but keep 0 before decimal)
    if (currentNumber === "0" && value !== ".") {
      setCurrentNumber(value);
    } else {
      setCurrentNumber(currentNumber + value);
    }
  };

  // Handle operator input
  const handleOperator = (operator) => {
    // If we have a result, use it as the start of new expression
    if (result !== null) {
      setExpression(`${result} ${operator}`);
      setCurrentNumber("0");
      setResult(null);
      return;
    }

    // If we have an expression and currentNumber is "0", replace the last operator
    if (expression && currentNumber === "0") {
      const trimmed = expression.trim();

      // Check if expression ends with an operator
      if (
        ["+", "-", "*", "/"].includes(
          trimmed[trimmed.length - 1]
        )
      ) {
        // Replace the last operator with the new one
        const withoutLastOperator = trimmed
          .slice(0, -1)
          .trim();
        setExpression(
          `${withoutLastOperator} ${operator}`
        );
        return;
      }
    }

    // If we already have an expression, calculate it first
    if (expression && currentNumber !== "0") {
      const fullExpr = `${expression} ${currentNumber}`;
      const calcResult = calculate(fullExpr);
      setExpression(`${calcResult} ${operator}`);
      setCurrentNumber("0");
      return;
    }

    // Start new expression
    setExpression(`${currentNumber} ${operator}`);
    setCurrentNumber("0");
  };

  // Handle equals
  const handleEquals = () => {
    if (!expression || currentNumber === "0") {
      return;
    }

    const fullExpr = `${expression} ${currentNumber}`;
    const calcResult = calculate(fullExpr);

    setResult(calcResult);
    setExpression("");
    setCurrentNumber("0");
  };

  // Handle delete (backspace)
  const handleDelete = () => {
    // If showing result, clear everything
    if (result !== null) {
      setResult(null);
      setCurrentNumber("0");
      setExpression("");
      return;
    }

    // If currentNumber is not "0", delete from it
    if (currentNumber !== "0") {
      if (currentNumber.length === 1) {
        setCurrentNumber("0");
      } else {
        setCurrentNumber(
          currentNumber.slice(0, -1)
        );
      }
    }
    // If currentNumber is "0" and we have an expression, delete from expression
    else if (expression) {
      const trimmed = expression.trim();

      // If expression ends with an operator (e.g., "5 +"), remove the operator and space
      if (
        ["+", "-", "*", "/"].includes(
          trimmed[trimmed.length - 1]
        )
      ) {
        const withoutOperator = trimmed
          .slice(0, -1)
          .trim();

        // If there's a number left, move it to currentNumber
        if (withoutOperator) {
          setCurrentNumber(withoutOperator);
          setExpression("");
        } else {
          // Nothing left, reset
          setCurrentNumber("0");
          setExpression("");
        }
      }
    }
  };

  // Handle reset
  const handleReset = () => {
    setExpression("");
    setCurrentNumber("0");
    setResult(null);
  };

  const getButtonStyles = (sign) => {
    // Primary buttons (DEL, RESET)
    if (sign.type === "primary") {
      return "bg-key-primary-bg text-text-secondary shadow-[0_4px_0_0] shadow-key-primary-shadow hover:brightness-125";
    }
    // Secondary button (=)
    if (sign.type === "secondary") {
      return "bg-key-secondary-bg text-text-secondary shadow-[0_4px_0_0] shadow-key-secondary-shadow hover:brightness-125";
    }
    // Default number/operator buttons
    return "bg-key-default-bg text-text-primary shadow-[0_4px_0_0] shadow-key-default-shadow hover:brightness-95";
  };

  return (
    <div
      className={`theme-${theme} min-h-screen bg-bg-main transition-colors`}
    >
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-[540px] space-y-6">
          {/* Header */}
          <div className="flex items-end justify-between">
            <h1 className="text-3xl text-text-secondary">
              calc
            </h1>

            {/* Theme Switcher */}
            <div className="flex items-end gap-6">
              <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                Theme
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex gap-4 text-xs text-text-secondary px-2">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                </div>
                <div className="bg-bg-toggle rounded-full p-1 flex gap-1">
                  {[1, 2, 3].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`w-4 h-4 rounded-full transition-colors cursor-pointer ${
                        theme === t
                          ? "bg-key-secondary-bg"
                          : "bg-transparent"
                      }`}
                      aria-label={`Theme ${t}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Screen */}
          <div className="bg-bg-screen rounded-lg px-6 py-8 text-right">
            <div className="text-4xl md:text-5xl text-text-secondary break-all">
              {getDisplayValue()}
            </div>
          </div>

          {/* Keypad */}
          <div className="bg-bg-keypad rounded-lg p-6 md:p-8">
            <div className="grid grid-cols-4 gap-4 md:gap-6">
              {signs.map((sign) => (
                <button
                  key={sign.label}
                  onClick={() => {
                    const value = sign.value;

                    // Handle special buttons
                    if (value === "DEL") {
                      handleDelete();
                      return;
                    }
                    if (value === "RESET") {
                      handleReset();
                      return;
                    }
                    if (value === "=") {
                      handleEquals();
                      return;
                    }

                    // Handle operators
                    if (
                      [
                        "+",
                        "-",
                        "*",
                        "/",
                      ].includes(value)
                    ) {
                      handleOperator(value);
                      return;
                    }

                    // Handle numbers and decimal
                    handleNumberInput(value);
                  }}
                  className={`
                    ${getButtonStyles(sign)}
                    ${
                      sign.value === "RESET" ||
                      sign.value === "="
                        ? "col-span-2"
                        : ""
                    }
                    h-14 md:h-16 rounded-lg text-2xl md:text-3xl font-bold
                    active:translate-y-1 active:shadow-none transition-all
                  `}
                >
                  {sign.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
