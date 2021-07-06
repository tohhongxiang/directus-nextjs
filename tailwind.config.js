module.exports = {
    purge: {
        // enabled: true,
        layers: ["components", "utilities"],
        content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'primary': {
                    '50': '#f6fcf8',
                    '100': '#edf8f2',
                    '200': '#d1eedd',
                    '300': '#b6e4c9',
                    '400': '#7fcfa1',
                    '500': '#48bb78',
                    '600': '#41a86c',
                    '700': '#368c5a',
                    '800': '#2b7048',
                    '900': '#235c3b'
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
}