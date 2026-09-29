# Archive — experimental / retired code

Nothing in this folder is part of the production build. Vite never compiles it,
and it is not imported anywhere in `src/`.

## `HackWithIndia3D.jsx.txt`

The original Three.js globe/logo component (523 lines, renamed to `.txt` so it
is inert).

**Status:** retired — it was never imported by `App.jsx` or any other module, so
it shipped zero pixels to production while the `three` package (~600 KB raw)
stayed in the dependency tree and `npm install` stayed slow.

**Why it was not deleted outright:** it may still be useful for a future
"chapter map" or landing-sequence visual. It is kept here for reference.

**To revive it:**

1. Rename to `src/components/experimental/HackWithIndia3D.jsx`
2. `npm install three`
3. Import and mount it inside a section

**Known issues if revived** (from the retired file): it sets up a
`useEffect` with an `autoRotate` value read via a ref rather than in the
dependency array, and it measured its container once on mount, so it does not
respond to container resize.
