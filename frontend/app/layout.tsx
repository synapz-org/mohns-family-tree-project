import type { Metadata } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const merriweather = Merriweather({
    subsets: ['latin'],
    weight: ['300', '400', '700', '900'],
    display: 'swap',
    variable: '--font-merriweather',
});

export const metadata: Metadata = {
    title: {
        default: 'Family Tree Manager - Mohns Family',
        template: '%s | Family Tree Manager',
    },
    description: 'Comprehensive family tree management system for the Mohns family reunion project and ongoing genealogy coordination.',
    keywords: [
        'family tree',
        'genealogy',
        'family reunion',
        'Mohns family',
        'family history',
        'story collection',
        'family book',
    ],
    authors: [{ name: 'Mohns Family Tree Project' }],
    creator: 'Mohns Family Tree Project',
    publisher: 'Mohns Family Tree Project',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://family-tree-manager.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://family-tree-manager.com',
        title: 'Family Tree Manager - Mohns Family',
        description: 'Comprehensive family tree management system for the Mohns family reunion project.',
        siteName: 'Family Tree Manager',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Family Tree Manager',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Family Tree Manager - Mohns Family',
        description: 'Comprehensive family tree management system for the Mohns family reunion project.',
        images: ['/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
            <body className="min-h-screen bg-neutral-50 font-sans antialiased">
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </div>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                                iconTheme: {
                                    primary: '#22c55e',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                duration: 5000,
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                </Providers>
            </body>
        </html>
    );
} 