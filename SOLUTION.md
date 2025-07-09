# Solution Summary

## Overview

This project involved improving a Node.js + React application with a focus on performance, stability, and user experience. I worked through the backend and frontend tasks to ensure everything functioned smoothly and efficiently. Below is a brief summary of the approach I followed for each part, along with some trade-offs.

---

## Backend Improvements

### ✅ Non-blocking I/O

I refactored the backend to use asynchronous file reading (`fs.promises.readFile`) instead of `fs.readFileSync`, which avoids blocking the event loop and improves performance for concurrent requests.

### ✅ Stats Caching

The `/api/stats` route was recalculating the stats on every request. To improve performance, I implemented a simple in-memory cache. The cache gets invalidated whenever the data file changes, using `fs.watchFile`.

### ✅ Utility Usage

The backend included a `mean()` utility function in `utils/stats.js` that wasn't used. I refactored the code to use this function for calculating average prices.

### ✅ Testing

I added unit tests using Jest and Supertest for the `/api/stats` route. These tests cover both the successful case (happy path) and failure cases (e.g., when reading the file fails). I also added an Express error handler to ensure failed requests return HTTP 500 status properly.

---

## Frontend Improvements

### ✅ Memory Leak Fix

The `Items` component was potentially leaking memory if the fetch call completed after the component unmounted. I fixed this using a clean-up flag inside `useEffect`.

### ✅ Controlled Search

I implemented a controlled search input using `q` state variables. The search triggers when the user updating results on every keystroke.

### ✅ Pagination

I added basic pagination controls using "Previous" and "Next" buttons. The pagination state (`page`) is handled in the frontend and passed to the backend via query parameters.

### ✅ Virtualized List

To improve performance with large lists, I used `react-window` to virtualize the list of items. This reduces DOM load and keeps scrolling smooth.

### ✅ Loading and Empty States

I added a loading skeleton component and displayed a message when no results are found, improving user experience.

---

## Trade-offs

- I used a simple in-memory cache for stats. This works fine for small-scale apps but would need a more robust solution (e.g. Redis) in production.
- The file-watching logic assumes that all data changes happen via file writes, which might not be reliable in real-time collaborative scenarios.
- The pagination is handled on the frontend without total page count, so users can't jump to a specific page.

---

## Final Thoughts

This project helped me practice async programming in Node.js, data fetching in React, and building a better UX with loading states and pagination. I focused on writing simple and readable code that matches real-world practices, while avoiding premature optimization.
