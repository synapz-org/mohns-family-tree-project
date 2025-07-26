'use client';

import React from 'react';
import Link from 'next/link';
import { TreePine, Heart, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        family: [
            { name: 'Family Tree', href: '/family-tree' },
            { name: 'Members', href: '/members' },
            { name: 'Branches', href: '/branches' },
            { name: 'Stories', href: '/stories' },
        ],
        features: [
            { name: 'Book Generation', href: '/books' },
            { name: 'Privacy Platform', href: '/privacy' },
            { name: 'Story Collection', href: '/stories/record' },
            { name: 'Reunion Planning', href: '/reunion' },
        ],
        support: [
            { name: 'Help Center', href: '/help' },
            { name: 'Contact Us', href: '/contact' },
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Terms of Service', href: '/terms' },
        ],
    };

    return (
        <footer className="bg-neutral-900 text-white">
            <div className="container-responsive py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <TreePine className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">Mohns Family Tree</span>
                        </div>
                        <p className="text-neutral-400 mb-6">
                            Connecting generations through shared stories, memories, and family history.
                            Preserving our legacy for future generations.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="mailto:family@mohns.com"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                                title="Email us"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                            <a
                                href="tel:+1-555-0123"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                                title="Call us"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-neutral-400 hover:text-primary-400 transition-colors"
                                title="Visit us"
                            >
                                <MapPin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Family Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Family</h3>
                        <ul className="space-y-2">
                            {footerLinks.family.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Features</h3>
                        <ul className="space-y-2">
                            {footerLinks.features.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-neutral-400 hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-neutral-800 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 text-neutral-400">
                            <span>&copy; {currentYear} Mohns Family Tree Project. All rights reserved.</span>
                            <Heart className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-neutral-400">
                            <span>Made with love for the Mohns family</span>
                            <span>•</span>
                            <span>Next reunion: 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
} 