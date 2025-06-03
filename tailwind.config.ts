
import type { Config } from "tailwindcss";

export default {
	content: [
		"src/**/*.{ts,tsx}",
	],
	darkMode: ["class"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
				futura: ['Red Hat Display', 'Futura', 'Century Gothic', 'Avenir Next', 'Avenir', 'Trebuchet MS', 'Arial', 'sans-serif'],
				cursive: ['Great Vibes', 'cursive'],
				heading: ['Playfair Display', 'serif'],
				body: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				travel: {
					blue: '#3498db',
					green: '#2ecc71',
					purple: '#9b59b6',
					orange: '#e67e22',
					red: '#e74c3c'
				},
				gold: {
					50: '#fefdf8',
					100: '#fdf9e8',
					200: '#faf0c5',
					300: '#f4e197',
					400: '#eccc67',
					500: '#C29149',
					600: '#A07A3A',
					700: '#7d5f2d',
					800: '#5c452e',
					900: '#4a3a28'
				},
				slate: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a',
					950: '#020617'
				},
				'gold-dark': '#A07A3A',
				sophisticated: {
					gold: {
						light: 'hsl(var(--gold-light))',
						medium: 'hsl(var(--gold-medium))',
						dark: 'hsl(var(--gold-dark))'
					},
					blue: {
						light: 'hsl(var(--blue-light))',
						medium: 'hsl(var(--blue-medium))',
						dark: 'hsl(var(--blue-dark))'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			lineHeight: {
				'relaxed': '1.6'
			},
			backgroundImage: {
				'gradient-gold': 'linear-gradient(135deg, #fdf9e8 0%, #f4e197 50%, #eccc67 100%)',
				'gradient-blue': 'linear-gradient(135deg, #e6f2ff 0%, #cce7ff 50%, #99d6ff 100%)',
				'gradient-sophisticated': 'linear-gradient(135deg, #fdf9e8 0%, #e6f2ff 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
