/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
			display: ['Inter', 'system-ui', 'sans-serif'],
  			mono: ['JetBrains Mono', 'monospace'],
  		},
  		borderRadius: {
  			lg: '0.5rem',
  			md: 'calc(0.5rem - 2px)',
  			sm: 'calc(0.5rem - 4px)',
  		},
  		colors: {
        'premium-black': '#0a0a0a',
        'premium-charcoal': '#1a1a1a',
        'premium-gold': '#d4af37',
        'premium-silver': '#c0c0c0',
        'premium-gold-muted': 'rgba(212, 175, 55, 0.2)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: '#d4af37',
  				foreground: '#0a0a0a'
  			},
  			border: 'hsl(var(--border))',
  			ring: '#d4af37',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			input: 'hsl(var(--input))',
  		},
  		boxShadow: {
  			'premium-glow': '0 0 15px rgba(212, 175, 55, 0.15)',
        'premium-heavy': '0 10px 30px rgba(0, 0, 0, 0.5)'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")]
}