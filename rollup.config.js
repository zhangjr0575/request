const path = require('path');
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
	input: {
		index: './src/main.ts',
		alipay: './src/adapters/mp-alipay.ts'
	},
	output: {
		dir: 'dist',
		format: 'es',
		entryFileNames: '[name].js',
		hoistTransitiveImports: false
	},
	plugins: [
		alias({
			entries: [{ find: '@/', replacement: path.resolve(__dirname, 'src/') }]
		}),
		commonjs(),
		resolve(),
		typescript({
			compilerOptions: {
				module: 'esnext'
			}
		}),
		terser()
	]
};
