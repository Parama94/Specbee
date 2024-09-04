# Specbee Assignment

## Live Application URL

The Application is deployed in https://specbee.vercel.app/

Click on the link to view the application

## Run app locally
Clone the project into local

Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

Type the following command to run the application locally

```bash
npm run dev
```

The Application Runs on **localhost:5173**

*Note* : Have checked-in the env files to git as it is assignment project. In real life projects, the env files are added to .gitignore file

## Technologies Used
- React
- Typescript
- Vite
- CSS Modules
- Redux toolkit
- React Router
- eslint

## App Features
✅ Responsive UI\
✅ List of articles fetched from API\
✅ Pagination\
✅ By default, list is sorted by date in ascending order\
✅ Sort by date - descending\
✅ Sort by Title - ascending\
✅ Sort by Title - descending\
✅ Filter by Category\
✅ Filter by Authors\
✅ Shows “No result found for Selection” if no results found\
✅ Shows loader when data is loading\
✅ Hover effect for filters\
✅ Redux for state management\
✅ 404 page\
✅ Unit test cases - **WIP**

## Improvements
- Lazy load images
- Cache images using service worker
- Shimmer UI for loading state
- Accessibility for Checkboxes, pagination & card components
- Use PostCSS to add autoprefixers to CSS
