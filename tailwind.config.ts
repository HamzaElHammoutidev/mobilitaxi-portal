
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
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
				// Taxi app specific colors
				taxi: {
					yellow: '#F7B731',
					blue: '#1E3A8A',
					gray: '#F8FAFC',
					dark: '#1A1A1A',
					light: '#E2E8F0',
				},
				// Magic UI color palette
				magic: {
					purple: {
						light: '#E5DEFF',
						DEFAULT: '#9b87f5',
						dark: '#7E69AB'
					},
					blue: {
						light: '#D3E4FD',
						DEFAULT: '#0EA5E9',
						dark: '#1E3A8A'
					},
					pink: {
						light: '#FFDEE2',
						DEFAULT: '#D946EF',
						dark: '#9F1239'
					},
					orange: {
						light: '#FDE1D3',
						DEFAULT: '#F97316',
						dark: '#C2410C'
					},
					green: {
						light: '#F2FCE2',
						DEFAULT: '#22C55E',
						dark: '#15803D'
					},
					yellow: {
						light: '#FEF7CD',
						DEFAULT: '#EAB308',
						dark: '#A16207'
					},
					gray: {
						light: '#F1F0FB',
						DEFAULT: '#8E9196',
						dark: '#1A1F2C'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
			textShadow: {
				DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.1)',
				md: '0 2px 4px rgba(0, 0, 0, 0.2)',
				lg: '0 4px 8px rgba(0, 0, 0, 0.25)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
