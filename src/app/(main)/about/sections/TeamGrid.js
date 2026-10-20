// src/app/(main)/about/sections/TeamGrid.js
'use client';

const DEFAULT_TEAM = [
    {
        name: 'Emily Carter',
        role: 'CEO & Co-Founder',
        image: '/assets/images/about/team-1.jpg',
        bg: 'bg-amber-900',
    },
    {
        name: 'James Larry',
        role: 'Creative Director',
        image: '/assets/images/about/team-2.jpg',
        bg: 'bg-purple-900',
    },
    {
        name: 'Adam Lam',
        role: 'General Manager',
        image: '/assets/images/about/team-3.jpg',
        bg: 'bg-neutral-800',
    },
];

export default function TeamGrid({
    title = 'Meet Our Team',
    subtitle = 'THE SUPER HEROS',
    members = DEFAULT_TEAM,
}) {
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 lg:mb-12">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="w-8 h-0.5 bg-red-500" />
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.24em]">
                            {subtitle}
                        </p>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                        {title}
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {members.map((member) => (
                        <div
                            key={member.name}
                            className="group relative w-full aspect-4/5 rounded-2xl overflow-hidden bg-gray-900 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                <p className="text-[18px] font-bold leading-tight">
                                    {member.name}
                                </p>
                                <p className="text-[12.5px] text-white/80 mt-0.5">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}