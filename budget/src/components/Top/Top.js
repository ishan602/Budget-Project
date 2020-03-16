import React from "react";
import "./top.css";
function Top() {
  var currentMonth = "February";
  return (
    <div className='top'>
      <div className='budget'>
        <div className='budget__title'>
          Available Budget in{" "}
          <span className='budget__title--month'>{currentMonth}</span> Month.
        </div>
        <div className='budget__value'>
          {/* <span className='budget__value--plus'>+&nbsp;</span> */}
          <span className='budget__value--value'>4568.00</span>
        </div>
        <div className='budget__income blue'>
          <div className='budget__income-text'>Income</div>
          <div className='right'>
            <div className='budget__income--value'>+ 4,300.00</div>
            {/* <div className='budget__income--percentage'>&nbsp;42%</div> */}
          </div>
        </div>
        <div className='budget__expense danger'>
          <div className='budget__expense-text'>Expenses</div>
          <div className='right'>
            <div className='budget__expense--value'>- 4,300.00</div>
            <div className='budget__expense--percentage'>&nbsp;42%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Top;
