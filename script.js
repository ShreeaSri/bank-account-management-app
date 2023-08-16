'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov);

  labelBalance.textContent = `${balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;
  const withdrawal = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov, i, arr) => acc + mov);
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;
  console.log(labelSumOut.textContent);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((intrest, i, arr) => intrest > 1)
    .reduce((acc, deposit) => acc + deposit);
  labelSumInterest.textContent = `${interest}€`;
};

const createUserName = function (accs) {
  accs.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(userr => userr.slice(0, 1))
        .join(''))
  );
};
createUserName(accounts);

//Event Handler for implementing login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display Ui and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clearing input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    //display movements
    displayMovements(currentAccount.movements);

    //display balance
    calcDisplayBalance(currentAccount.movements);

    //display summary
    calcDisplaySummary(currentAccount);
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2));
// // console.log(arr.splice(2));
// // console.log(arr);
// console.log(arr.splice(1, 2));

// //reverse method
// let arr2 = ['f', 'g', 'h', 'i', 'j'];
// console.log(arr2.reverse());
// console.log(arr2);

// //concat method
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log(arr);
// console.log(letters.join('_'));

//at method
// const arr = [10, 45, 34];
// console.log(arr.at(1));

//getting last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`you deposited ${movement}`);
//   } else {
//     console.log(`you withdrwa ${Math.abs(movement)}`);
//   }
// }
// console.log('-------------------------------------------------');
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`you deposited ${movement}`);
//   } else {
//     console.log(`you withdrwa ${Math.abs(movement)}`);
//   }
// });

// let arr = ['a', 'b', 'c', 'd', 'e'];
// arr.forEach(function (element) {
//   console.log(`${element}a`);
// });
// movements.forEach(function (movement, i, array) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1} : you deposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1} : you withdraw ${Math.abs(movement)}`);
//   }
// });

// // forEach on map
// const currenciess = new Map([
//   ['USD', 'United State'],
//   ['INR', 'India'],
//   ['EUR', 'europe'],
// ]);

// currenciess.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// // forEach on set
// const uniqueCurrencies = new Set(['USD', 'USD', 'INR', 'INR', 'EUR', 'EUR']);
// uniqueCurrencies.forEach(function (value, key, map) {
//   console.log(`${key} : ${value}`);
// });

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];

// const checkDogs = function (dogsJulia, dogsKate) {
//   const juliaCorrected = dogsJulia.slice(); //copying julia dog data
//   juliaCorrected.splice(0, 1);
//   juliaCorrected.splice(-2);

//   // another method
//   // const juliaCorrected = dogsJulia.slice(1, 3);
//   const [...bothDogs] = [...juliaCorrected, ...dogsKate];
//   //another method
//   //const bothDogs = juiacorrected.concat(dogsKate)
//   console.log(bothDogs);
//   bothDogs.forEach(function (dog, i) {
//     const checkAge =
//       dog >= 3 ? `an adult , and is ${dog} years old` : 'stil a puppy ;)';
//     console.log(`Dog number ${i + 1} is ${checkAge}`);
//   });
// };

// checkDogs(julia, kate);

// const eurToUsd = 1.1;
// const movementsUSD = movements.map(mov => Math.abs(mov * eurToUsd));
// console.log(movementsUSD);

// const newMovements = movements.map((movement, i, arr) => {
//   if (movement > 0) {
//     return `Movement ${i + 1} : you deposited ${movement}`;
//   } else {
//     return `Movement ${i + 1} : you withdraw ${Math.abs(movement)}`;
//   }
// });
// console.log(newMovements);

// const deposits = movements.filter(mov => mov > 0);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// const balance = movements.reduce((acc, mov) => acc + mov, 0);
// console.log(balance);

// const max = movements.reduce(
//   (acc, curr) => (acc < curr ? (acc = curr) : acc),
//   movements[0]
// );
// console.log(max);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = function (dogsJulia, dogsKate) {
//   const [...bothDogs] = [...dogsJulia, ...dogsKate];
//   const newBothDogs = bothDogs.map(age =>
//     age <= 2 ? (age = 2 * age) : 16 + age * 4
//   );
//   const filterBothDogs = newBothDogs.filter(age => age >= 18);
//   const avgHumanAge = filterBothDogs.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
//   // const avgHumanAge =
//   //   filterBothDogs.reduce((acc, age, i, arr) => acc + age, 0) /
//   //   filterBothDogs.length;
//   return avgHumanAge;
// };
// const age1 = calcAverageHumanAge(
//   [5, 2, 4, 1, 15, 8, 3],
//   [16, 6, 10, 5, 6, 1, 4]
// );
// console.log(age1);

// const calcAverageHumanAge = dogs =>
//   dogs
//     .map(age => (age <= 2 ? (age = 2 * age) : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// const age1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const age2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(age1, age2);
// // const eurToUsd = 1.1;
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const totalDepositUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositUSD);

//find method
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(Math.abs(firstWithdrawal));

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
// for (const account of accounts) {
//   if (account.owner === 'Jessica Davis') console.log(account);
// }
