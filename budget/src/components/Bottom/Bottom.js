import React from "react";
import "./Bottom.css";
function Bottom() {
  return (
    <div className='bottom'>
      <div className='income'>
        <span className='income__heading blue'>income</span>
        <div className='income__list'>
          {/* <div className='item' id=''>
            <div className='item__description'>salary</div>
            <div className='right'>
              <div className='item__value blue'>+&nbsp;2100.00</div>
              <div className='item__delete'>
                <button className='item__delete--btn'>
                  <i className='ion-ios-close-outline'></i>
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className='expenses'>
        <span className='expenses__heading red'>expenses</span>
        <div className='expenses__list'>
          {/* <div className='item' id=''>
            <div className='item__description'>salary</div>
            <div className='right'>
              <div className='item__value red'>-&nbsp;2100.00</div>
              <div className='item__percentage'>21%</div>
              <div className='item__delete'>
                <button className='item__delete--btn'>
                  <i className='ion-ios-close-outline'></i>
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Bottom;
