'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import {
    Menu,
    X,
    User,
    LogOut,
    Settings,
    Sun,
    Moon,
    Monitor,
    TreePine,
    Users,
    BookOpen,
    Mic,
    Shield
} from 'lucide-react';

export function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const navigation = [
        { name: 'Family Tree', href: '/family-tree', icon: TreePine },
        { name: 'Members', href: '/members', icon: Users },
        { name: 'Stories', href: '/stories', icon: Mic },
        { name: 'Books', href: '/books', icon: BookOpen },
        { name: 'Privacy', href: '/privacy', icon: Shield },
    ];

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
        setTheme(newTheme);
    };

    return (
        <header className="bg-white shadow-sm border-b border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700">
            <div className="container-responsive">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <TreePine className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-neutral-900 dark:text-white">
                                Mohns Family Tree
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors"
                            >
                                <item.icon className="w-4 h-4" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors"
                            title={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5" />
                            ) : theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Monitor className="w-5 h-5" />
                            )}
                        </button>

                        {/* User menu */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                        {user?.avatar ? (
                                            <img
                                                src={user.avatar}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                                        )}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-neutral-900 dark:text-white">
                                        {user?.firstName}
                                    </span>
                                </button>

                                {/* User dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {user?.email}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
                                                {user?.role?.replace('_', ' ')}
                                            </p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="w-4 h-4" />
                                            <span>Settings</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors w-full text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/login"
                                    className="btn btn-outline btn-sm"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn btn-primary btn-sm"
                                >
                                    Join Family
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-neutral-600 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-neutral-200 dark:border-neutral-700 py-4">
                        <nav className="flex flex-col space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center space-x-3 px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-primary-400 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
} 