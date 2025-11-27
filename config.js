tailwind.config = {
    theme: {
        extend: {
            fontFamily: { 
                sans: ['Inter', 'sans-serif'], 
                serif: ['Playfair Display', 'serif'] 
            },
            colors: {
                gold: { 
                    500: '#C9AF26', 
                    600: '#A18C1E' 
                },
                slate: { 
                    900: '#262118', 
                    800: '#3D3528', 
                    50: '#F9F7F2' 
                },
                sage: { 
                    100: '#E3EBE3', 
                    200: '#C5D6C5',
                    500: '#5F8F5F', 
                    600: '#4A704A' 
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
}