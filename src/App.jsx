import { useState } from "react";
const App = () => {
  const [expression, setExpression] =
    useState("");
  const signs = [
    { label: "7", value: 7 },
    { label: "8", value: 8 },
    { label: "9", value: 9 },
    { label: "DEL", value: "DEL" },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
    { label: "6", value: 6 },
    { label: "+", value: "+" },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "-", value: "-" },
    { label: ".", value: "." },
    { label: "0", value: 0 },
    { label: "/", value: "/" },
    { label: "x", value: "*" },
    { label: "RESET", value: "RESET" },
    { label: "=", value: "=" },
  ];

  const compute = () => {
    if (expression.length <= 1) return;
    let expr = expression;

    const match = expr.match(
      /(\d+)([\+\-\*\/])(\d+)/
    );

    const num1 = match[1];
    const operator = match[2];
    const num2 = match[3];
    const result = eval(
      `${num1}${operator}${num2}`
    );
    setExpression(result);
  };
  return (
    <div className="flex items-start md:items-center justify-center min-h-screen p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-4 ">
        {/* header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white">Calc</h2>
          <button className="text-white">
            theme
          </button>
        </div>

        {/* Screen */}

        <div className="flex items-center justify-end bg-navy-950 text-white h-16 p-3">
          {expression}
        </div>

        {/* Keys */}
        <div className="grid grid-cols-4  gap-2 p-4 bg-black/30">
          {signs.map((sign) => (
            <button
              key={sign.label}
              onClick={() => {
                if (sign.value === "DEL") {
                  if (expression === " ") return;
                  setExpression((prev) =>
                    `${prev}`.slice(0, -1)
                  );
                  return;
                }
                if (sign.value === "RESET") {
                  setExpression(" ");
                  return;
                }

                if (sign.value === "=") {
                  compute();
                  return;
                }
                setExpression(
                  (prev) => `${prev}${sign.value}`
                );
              }}
              className={`flex items-center justify-center bg-white text-navy-950 font-bold
          text-lg rounded-md cursor-pointer ${
            sign.value === "RESET" ||
            sign.value === "="
              ? "col-span-2"
              : ""
          }`}
            >
              {sign.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
