// Budget Controller
var budgetController = (function() {
  // Function Constructor
  var Expenses = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  // DATA
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  var calculateTotal = type => {
    var sum = 0;
    data.allItems[type].forEach(element => {
      sum += element.value;
    });
    data.totals[type] = sum;
  };
  return {
    addItem: function(type, desc, val) {
      var newItem, Id;
      if (data.allItems[type].length > 0) {
        Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        Id = 0;
      }
      if (type === "exp") {
        newItem = new Expenses(Id, desc, val);
      } else {
        newItem = new Income(Id, desc, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
    calculateBudget: function() {
      //1.  calculate the total income and expenses
      calculateTotal("inc");
      calculateTotal("exp");
      // 2. Calcuate the budget
      data.budget = Math.round(data.totals.inc - data.totals.exp);
      // 3. Calculate the Percentage
      if (data.budget > data.totals.exp)
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.percentage = -1;
    },
    getBudget: () => {
      return {
        budget: data.budget,
        percentage: data.percentage,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp
      };
    }
  };
})();

// UI controller
var UIController = (function() {
  // Local DOM String
  var DOMstring = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeElement: ".income__list",
    expenseElement: ".expenses__list",
    budgetLabel: ".budget__value--value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expense--value",
    percentageLabel: ".budget__expense--percentage"
  };
  return {
    getDOMStrings: function() {
      return DOMstring;
    },
    getInput: function() {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstring.inputValue).value)
      };
    },
    addListItems: function(obj, type) {
      var html, newHtml, element;

      if (type === "exp") {
        element = DOMstring.expenseElement;
        // Text String with the placeHolder text
        html =
          "<div class='item border' id='expense-%id%'> <div class='item__description'>%desc%</div> <div class='right'><div class='item__value red'>-&nbsp;%value%</div><div class='item__percentage'>21%</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>";
      } else if (type === "inc") {
        element = DOMstring.incomeElement;
        html =
          "<div class='item border' id='income-%id%'><div class='item__description'>%desc%</div><div class='right'><div class='item__value blue'>+&nbsp;%value%</div><div class='item__delete'><button class='item__delete--btn'><i class='ion-ios-close-outline'></i></button></div></div></div>";
      }

      // Replace the placeholder
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%desc%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      // Insert Element into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    // Update the top card with Values
    displayBudget: obj => {
      document.querySelector(DOMstring.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstring.expenseLabel).textContent = obj.totalExp;
      if (obj.budget > 0) {
        document.querySelector(DOMstring.budgetLabel).textContent =
          "+" + obj.budget;
      } else if (obj.budget < 0) {
        document.querySelector(DOMstring.budgetLabel).textContent =
          "-" + obj.budget;
      } else {
        document.querySelector(DOMstring.budgetLabel).textContent = obj.budget;
      }
      if (obj.percentage > 0) {
        document.querySelector(DOMstring.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstring.percentageLabel).textContent = "--";
      }
    },
    // Clear the fields after press Enter or submit the form
    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstring.inputDescription + "," + DOMstring.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(element => {
        element.value = "";
      });
      fieldsArr[0].focus();
    }
  };
})();

//GLOBAL APP CONTROLLER
var appController = (function(budgteCtrl, UICtrl) {
  var setupEvents = function() {
    var DOM = UICtrl.getDOMStrings();
    // Run when press ENTER key
    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13) {
        ctrlAddItem();
        event.preventDefault();
      }
    });
    // Adding the CLick Event to the Button
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);
  };

  var ctrlAddItem = function() {
    // 1. TO get Input from the form fields
    var input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. To add details to the DS
      var newItem = budgteCtrl.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. Update the UI.
      UICtrl.addListItems(newItem, input.type);

      //4. Clear form asd set focus to description
      UICtrl.clearFields();

      // 5. Calculate the budget
      updateBudget();
    }
  };
  var updateBudget = function() {
    // 1. Calculate the budget
    budgteCtrl.calculateBudget();
    // 2. Return the budget
    var budget = budgteCtrl.getBudget();
    // 3. Display the Budget in UI
    UICtrl.displayBudget(budget);
  };
  return {
    init: function() {
      setupEvents();
      UICtrl.displayBudget({
        budget: 0,
        percentage: 0,
        totalInc: 0,
        totalExp: 0
      });
    }
  };
})(budgetController, UIController);

// Initialize the App.
appController.init();
