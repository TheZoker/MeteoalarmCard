/*  eslint-env node */
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

const IS_DEV = process.env.ROLLUP_WATCH;

const serverOptions = {
	contentBase: ['./dist'],
	host: 'localhost',
	port: 5000,
	allowCrossOrigin: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
};

export default {
	input: 'src/meteoalarm-card.js',
	output: {
		dir: 'dist',
		format: 'es',
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		json(),
		babel({
			exclude: 'node_modules/**',
		}),
		image(),
		IS_DEV && serve(serverOptions),
		!IS_DEV && terser(),
	],
	// https://stackoverflow.com/questions/43556940/rollup-js-and-this-keyword-is-equivalent-to-undefined
	onwarn: function(warning)
	{
		if ( warning.code === 'THIS_IS_UNDEFINED' )
		{
			return;
		}
		console.warn( warning.message );
	}
};
