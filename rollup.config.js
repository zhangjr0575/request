const path = require("path");
import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
	input: {
		index: "./src/main.ts"
	},
	output: {
		dir: "dist",
		format: "umd",
		name: "Request",
		entryFileNames: "[name].js"
	},
	plugins: [
		alias({
			entries: [{ find: "@/", replacement: path.resolve(__dirname, "src/") }]
		}),
		commonjs(),
		resolve(),
		typescript(),
		terser()
	]
};
