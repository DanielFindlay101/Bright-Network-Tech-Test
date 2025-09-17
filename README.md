This is my attempt (Daniel Findlay) at the tech test for Bright Network

## To run the app

First, install the dependancies:

```bash
npm install
```

Then, run the next app using

```bash
npm run dev
```

If there are any errors mentioning wasm bindings when running the project, simply delete <node_modules> and <next> then run the above 2 commands again.

## Tech Stack:

The app was built using NextJS, React, Typescript, TailwindCSS and DaisyUI. I attempted to Zustand for state management but I felt it wasn't necessary. I've kept the zustand store file in for reference. The app is responsive.

Tailwind allowed me to quickly create the co

I used DaisyUI for the buttons for a quick out-of-the-box solution, I would normally create my own but reached for DaisyUI for the interest of time. The step component is also from DaisyUI. Unfortunately I ran into multiple issues using this component as editing components from DaisyUI isn't straight forward. I would have liked to have updated the following for the stepper: - Make each step background white and change the colour of the step onClick - Added the labels "Strongly disagree" and "Strongly agree". This can be achieved using the component however I believe I handled the <answerArray> incorrectly. I maybe should've added an extra string for the first and last index. In hindsight I maybe should have used another library instead.

## Limitations:

- On top of what I mentioned with the stepper component the app has a few more limitations, most noteably I'm not storing the userId in the url. You'll see in the file <question-store.ts> that I made an interface for the User. My intention was to store the usersId and check if the user has completed the questionaire. I would have also leveraged zustands persist feature which stores the userId into local storage. Alternatively, I could have used just used the local storage API but I was limited to time. - The stepper has another bug where the index of each step is rendering but due to the white background, it appears hidden. If a user was to quickly press each step, they would see the numbers appear.

## Further Optimisations:

- I would have liked to improve the UI especially the margins and paddings and made them consistent across the app
- I would have liked to including loading states for any requests which take a significant amount of time.
- Improve the progress bar percentage. Currently shows NaN due to the way I've handled the logic.
- Again the stepper...
