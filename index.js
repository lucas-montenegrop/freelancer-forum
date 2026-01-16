/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

//mental model
//const freelancers = [];
//for (let i = 0; i < NUM_FREELANCERS; i++) {
//  freelancers.push(makeFreelancer());
//}

// === State ===
const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
const averageRate = getAverageRate();

//why does getAverageRate(); has "()"? 
//recipe       // instructions
//recipe()     // actual food - I want the computed value () 
//Parentheses mean “run this function now and give me the result.”

// === State ===
// uses helpers
//The answer: Function declarations are hoisted
//JavaScript does two passes over your code
// === Helpers ===
//function makeFreelancer() {}
//function getAverageRate() {}

/** @returns {Freelancer} a freelancer with random name, occupation, and rate */
function makeFreelancer() {
  const name = sample(NAMES);
  const occupation = sample(OCCUPATIONS);
  const rate =
    PRICE_RANGE.min +
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min));

  return { name, occupation, rate };
}
//
/** @returns {number} the average rate of all `freelancers` */

function getAverageRate() {
  const total = freelancers.reduce(
    //Turn an array into a single value
    //Initial value (0) is critical - Reducer must return the accumulator
    (total, freelancer) => total + freelancer.rate,
    0
    // => means: This function returns
    //total of the current loop PLUS the addition of the next rate
  );
  return total / freelancers.length;
}

// dont get this part// ***************
/** @returns a single element randomly from the given array */
function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//Math.random() never reaches 1, 
// so flooring its product with array.length can never reach array.length — 
// only length - 1.

// === Components ===
// We can destructure an object directly in the function's parameters!
function FreelancerRow({ name, occupation, rate }) {
  const $tr = document.createElement("tr");
  //$tr is a DOM node $ is just a naming convention (means “DOM element”)
  $tr.innerHTML = `
    <td>${name}</td>
    <td>${occupation}</td>
    <td>$${rate}</td>
  `;
  //Creates three <td> elements - Inserts them inside the <tr>
  //tr = table row / td = table data (a cell)
  //So this is string creation first, DOM parsing second. what does this mean ***********
  return $tr;
}

// <table>
//   <thead>   <!-- headers -->
//   <tbody>   <!-- data rows -->
//   <tfoot>   <!-- optional totals -->
// </table>
//newArray = oldArray.map(fn);
// //For each freelancer object, call FreelancerRow(freelancer) and collect the returned <tr> elements into an array.”
// What FreelancerRow returns
// A <tr> DOM node:
// <tr>
//   <td>Bob</td>
//   <td>Designer</td>
//   <td>$120</td>
// </tr>
function FreelancerRows() {
  const $tbody = document.createElement("tbody");
  const $freelancers = freelancers.map(FreelancerRow);
  $tbody.replaceChildren(...$freelancers);
  return $tbody;
}
//Removes all existing children - Appends the new ones
//“map converts data objects → DOM nodes.”
//replaceChildren inserts nodes into parent.”

function AverageRate() {
  const $p = document.createElement("p");
  $p.textContent = `The average rate is $${averageRate.toFixed(2)}.`;
  return $p;
}
//Removes all existing children - Appends the new ones
//“map converts data objects → DOM nodes.”
//replaceChildren inserts nodes into parent.”

// === Render ===
function render() {
  const $app = document.querySelector("#app");

  // <table>s eject "fake" elements, which is why we need to use
  // <tbody id="FreelancerRows"> instead of <FreelancerRows>.
  // This prevents our component from being forced outside of the table.

  $app.innerHTML = `
  
    <h1>Freelancer Forum</h1>
    <AverageRate></AverageRate>
    <table>
      <thead>
        <tr>
          <th>Name</th> 
          <th>Occupation</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;
  $app.querySelector("AverageRate").replaceWith(AverageRate());
  $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
 

const headers = $app.querySelectorAll("th");
headers.forEach(th => {
  th.style.color = "red";
});

  
}

render();




// /**
//  * @typedef Freelancer
//  * @property {string} name
//  * @property {string} occupation
//  * @property {number} rate
//  */

// // === Constants ===
// const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
// const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
// const PRICE_RANGE = { min: 20, max: 200 };
// const NUM_FREELANCERS = 100;

// // === State ===
// const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
// const averageRate = getAverageRate();

// /** @returns {Freelancer} a freelancer with random name, occupation, and rate */
// function makeFreelancer() {
//   const name = sample(NAMES);
//   const occupation = sample(OCCUPATIONS);
//   const rate =
//     PRICE_RANGE.min +
//     Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min));

//   return { name, occupation, rate };
// }

// /** @returns {number} the average rate of all `freelancers` */
// function getAverageRate() {
//   const total = freelancers.reduce(
//     (total, freelancer) => total + freelancer.rate,
//     0
//   );
//   return total / freelancers.length;
// }

// /** @returns a single element randomly from the given array */
// function sample(array) {
//   return array[Math.floor(Math.random() * array.length)];
// }

// // === Components ===
// // We can destructure an object directly in the function's parameters!
// function FreelancerRow({ name, occupation, rate }) {
//   const $tr = document.createElement("tr");
//   $tr.innerHTML = `
//     <td>${name}</td>
//     <td>${occupation}</td>
//     <td>$${rate}</td>
//   `;
//   return $tr;
// }

// function FreelancerRows() {
//   const $tbody = document.createElement("tbody");
//   const $freelancers = freelancers.map(FreelancerRow);
//   $tbody.replaceChildren(...$freelancers);
//   return $tbody;
// }

// function AverageRate() {
//   const $p = document.createElement("p");
//   // We can use `textContent` instead of `innerHTML` when we just want to
//   // set the text, rather than creating nested HTML elements.
//   // `toFixed(2)` rounds the number to two decimal places.
//   $p.textContent = `The average rate is $${averageRate.toFixed(2)}.`;
//   return $p;
// }

// // === Render ===
// function render() {
//   const $app = document.querySelector("#app");

//   // <table>s eject "fake" elements, which is why we need to use
//   // <tbody id="FreelancerRows"> instead of <FreelancerRows>.
//   // This prevents our component from being forced outside of the table.

//   $app.innerHTML = `
//     <h1>Freelancer Forum</h1>
//     <AverageRate></AverageRate>
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Occupation</th>
//           <th>Rate</th>
//         </tr>
//       </thead>
//       <tbody id="FreelancerRows"></tbody>
//     </table>
//   `;
//   $app.querySelector("AverageRate").replaceWith(AverageRate());
//   $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
// }

// render();