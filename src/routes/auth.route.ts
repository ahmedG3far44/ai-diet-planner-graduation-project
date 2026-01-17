import { Router } from 'express';

const router = Router();

router.get('/auth', (req, res) => {
  res.send('Auth Route');
});

export default router;





// User
//  - Named
//  - Email
//  - Password
//  - Avatar
//  - Role
//  - Goals
//  - Height
//  - Weight
//  - Age
//  - Gender
//  - Activity Level
//  - Favorite Foods
//  - Avoided Foods
//  - Plan
// Diet Plan
// Meals
// Food
// Calories
// Macros

// items




// {
//   name:'Dinner',
//   items:[
//     {
//       name:'Apple',
//       macros:{
//         calories:54,
//         protien:12,
//         carbs:20,
//         fats:3,
//       },
//       quantity:1,
//       servingSize:1,
//       servingUnit:'piece',
//     },
//     {
//       name:'Banana',
//       macros:{
//         calories:54,
//         protien:12,
//         carbs:20,
//         fats:3,
//       },
//       quantity:1,
//       servingSize:1,
//       servingUnit:'piece',
//     },
//     {
//       name:'Oats',
//       macros:{
//         calories:54,
//         protien:12,
//         carbs:20,
//         fats:3,
//       },
//       quantity:1,
//       servingSize:250,
//       servingUnit:'g',
//     },
//     {
//       name:'Egg',
//       macros:{
//         calories:54,
//         protien:12,
//         carbs:20,
//         fats:3,
//       },
//       quantity:4,
//       servingSize:1,
//       servingUnit:'piece',
//     },
//     {
//       name:'Egg',
//       macros:{
//         calories:54,
//         protien:12,
//         carbs:20,
//         fats:3,
//       },
//       quantity:4,
//       servingSize:1,
//       servingUnit:'piece',
//     }
//   ],
//   macros:{
//     calories:54,
//     protien:12,
//     carbs:20,
//     fats:3,
//   }
// }


// User
// Generated Plan
// Grocery List
// Number of Recipies