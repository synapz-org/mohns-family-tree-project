import React from 'react';
import Link from 'next/link';
import {
    TreePine,
    Users,
    Mic,
    BookOpen,
    Shield,
    Heart,
    ArrowRight,
    Star,
    CheckCircle
} from 'lucide-react';

export default function HomePage() {
    const features = [
        {
            icon: TreePine,
            title: 'Family Tree Management',
            description: 'Interactive family tree visualization with branch representative coordination.',
            color: 'text-primary-600',
            bgColor: 'bg-primary-50',
        },
        {
            icon: Mic,
            title: 'Story Collection',
            description: 'Record and preserve family stories with audio/video capabilities.',
            color: 'text-secondary-600',
            bgColor: 'bg-secondary-50',
        },
        {
            icon: BookOpen,
            title: 'Personalized Books',
            description: 'Generate custom family history books with print-on-demand integration.',
            color: 'text-accent-600',
            bgColor: 'bg-accent-50',
        },
        {
            icon: Shield,
            title: 'Privacy Platform',
            description: 'Secure medical and DNA data sharing with zero-knowledge architecture.',
            color: 'text-success-600',
            bgColor: 'bg-success-50',
        },
    ];

    const stats = [
        { label: 'Family Members', value: '500+' },
        { label: 'Stories Collected', value: '1,200+' },
        { label: 'Branches', value: '25+' },
        { label: 'Books Generated', value: '50+' },
    ];

    const testimonials = [
        {
            name: 'Sarah Mohns',
            role: 'Branch Representative',
            content: 'This platform has made it so much easier to coordinate our family reunion and collect stories from our elders.',
            rating: 5,
        },
        {
            name: 'Michael Mohns',
            role: 'Family Member',
            content: 'I love being able to see our family tree and learn about our ancestors. The story collection feature is amazing.',
            rating: 5,
        },
        {
            name: 'Grandma Betty',
            role: 'Family Elder',
            content: 'Finally, a way to preserve our family stories for future generations. This is exactly what we needed.',
            rating: 5,
        },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 lg:py-32">
                <div className="container-responsive">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex items-center justify-center space-x-2 mb-6">
                            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                                <TreePine className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900">
                                Mohns Family Tree
                            </h1>
                        </div>
                        <p className="text-xl lg:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto">
                            Connecting generations through shared stories, memories, and family history.
                            Preserving our legacy for future generations to come.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="btn btn-primary btn-lg inline-flex items-center space-x-2"
                            >
                                <span>Join Our Family</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/family-tree"
                                className="btn btn-outline btn-lg"
                            >
                                Explore Family Tree
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container-responsive">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-neutral-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-neutral-50">
                <div className="container-responsive">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                            Everything You Need for Family History
                        </h2>
                        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                            Our comprehensive platform provides all the tools needed to preserve and share your family's legacy.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className={`${feature.bgColor} rounded-xl p-8 text-center hover:shadow-lg transition-shadow`}
                            >
                                <div className={`${feature.color} mb-4 flex justify-center`}>
                                    <feature.icon className="w-12 h-12" />
                                </div>
                                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-neutral-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="container-responsive">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                            What Our Family Says
                        </h2>
                        <p className="text-xl text-neutral-600">
                            Hear from family members who are already using our platform.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.name}
                                className="bg-neutral-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-neutral-700 mb-6 italic">
                                    "{testimonial.content}"
                                </p>
                                <div>
                                    <div className="font-semibold text-neutral-900">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-neutral-600">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-600">
                <div className="container-responsive text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Ready to Preserve Your Family's Legacy?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Join hundreds of Mohns family members who are already preserving their stories and connecting with relatives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="btn bg-white text-primary-600 hover:bg-neutral-100 btn-lg inline-flex items-center space-x-2"
                        >
                            <span>Get Started Today</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600 btn-lg"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Reunion Countdown */}
            <section className="py-16 bg-neutral-900 text-white">
                <div className="container-responsive text-center">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <Heart className="w-8 h-8 text-red-500" />
                        <h2 className="text-3xl font-bold">Next Family Reunion</h2>
                        <Heart className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-xl text-neutral-300 mb-8">
                        Join us for our next family reunion in 2025. Start planning and contributing today!
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-400">365</div>
                            <div className="text-neutral-400">Days</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-400">24</div>
                            <div className="text-neutral-400">Hours</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-400">60</div>
                            <div className="text-neutral-400">Minutes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary-400">60</div>
                            <div className="text-neutral-400">Seconds</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 