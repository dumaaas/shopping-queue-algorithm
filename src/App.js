import cashierGif from "./cashier.gif";
import cashierEmpty from "./cashierEmpty.gif";
import shopperGif from "./shopper.gif";
import { useState, useEffect } from "react";

function App() {
  const [lines, setLines] = useState([[10, 5, 2], [5], [2, 6], [8, 3], [4, 5]]);
  const [itemsInPersonCart, setItemsInPersonCart] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const addPersonToLine = (e) => {
    e.preventDefault();
    let leastItemsAmount = 1e9;
    let lineWithLeast;

    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0);
      if (totalInLine < leastItemsAmount) {
        leastItemsAmount = totalInLine;
        lineWithLeast = line;
      }
    }

    if (!lineWithLeast) return;

    setLines((prevLines) =>
      prevLines.map((line) =>
        line === lineWithLeast ? [...line, itemsInPersonCart] : line
      )
    );
  };

  return (
    <div className=" bg-[#1D1D1B] overflow-x-hidden min-h-screen flex items-center flex-col justify-start gap-[50px] py-[50px]">
      <form
        onSubmit={addPersonToLine}
        className="flex flex-row gap-[20px] items-center justify-center"
      >
        <input
          className="px-[14px] py-[12px] rounded-[8px] focus:outline-none border-[2px] border-[#1EE698] bg-transparent text-[#1EE698] placeholder:text-[#1EE698]"
          type="number"
          min="1"
          max="1000"
          required
          placeholder="Add customer"
          value={itemsInPersonCart}
          onChange={(e) => setItemsInPersonCart(e.currentTarget.valueAsNumber)}
        />
        <button className="transition-colors duration-150 ease-linear px-[22px] py-[12px] rounded-[8px] focus:outline-none border-[2px] border-[#1D1D1B] bg-[#1EE698] text-[#1D1D1B] hover:border-[#1EE698] hover:bg-[#1D1D1B] hover:text-[#1EE698]">
          Checkout
        </button>
      </form>
      <div className="flex flex-row gap-[40px] items-start justify-center">
        {lines.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-[20px] w-[224px]"
            >
              <img
                className="border-[2px] border-[#1EE698] rounded-[4px] w-[224px] h-[169px]"
                src={item.length > 0 ? cashierGif : cashierEmpty}
                alt="cashier"
              />

              {item.length > 0 && (
                <div className="border-t-[2px] border-t-[#1EE698] pt-[20px] flex flex-col gap-[20px]">
                  {item.map((customer, indexC) => {
                    return (
                      <div
                        key={indexC}
                        className="flex flex-col border-[2px] border-[#1EE698] rounded-[4px]"
                      >
                        <img className="" src={shopperGif} alt="cashier" />
                        <p className="border-t-[2px] border-t-[#1EE698] items-center justify-center px-[22px] py-[14px] text-center text-[#1EE698] font-bold">
                          {customer} {customer === 1 ? 'Item' : 'Items'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
              {!item.length && (
                <div className="border-t-[2px] border-t-[#1EE698] pt-[20px] text-[#1EE698] font-bold text-center">
                  Waiting for customers...
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
