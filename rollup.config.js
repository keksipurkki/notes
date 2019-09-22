import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const cjsConfig = {
  include: "node_modules/**",
  namedExports: {
    "node_modules/react-is/index.js": ["isValidElementType", "isContextConsumer"],
  },
};

const app = {
  input: "./src/index.tsx",
  output: {
    file: "./public_html/app.js",
    sourcemap: true,
    format: "iife",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
      "react-redux": "ReactRedux",
      redux: "Redux",
    },
  },
  external: ["react", "react-dom"],
  plugins: [resolve(), commonjs(cjsConfig), typescript()],
};

export default [app];
