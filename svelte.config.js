import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
        // preprocess: vitePreprocess(),

        kit: {
                adapter: adapter({
                        runtime: 'nodejs22.x',
                })
        }
};

export default config;
