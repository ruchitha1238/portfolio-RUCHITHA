export default function Projects() {
    const projects = [
        {
            title: "Tic Tac Toe",
            category: "Game Development",
            description: "A classic Tic Tac Toe game built with HTML, CSS, and JavaScript. Features a clean interface and win detection.",
            color: "bg-purple-900/40",
            image: "/projects/tictactoeimage.jpg",
            link: "/demos/tictactoe.html"
        },
        {
            title: "Web Calculator",
            category: "Utility",
            description: "A modern web-based calculator with a beautiful UI for smooth calculations.",
            color: "bg-stone-800/40",
            image: "/projects/calculatorimage.png",
            link: "/demos/calculator.html"
        },
        {
            title: "Portfolio Website",
            category: "Web Design",
            description: "A responsive portfolio showcasing projects and skills with clean design principles. (This Site)",
            color: "bg-blue-900/40",
            image: "/projects/portfolioimage.png",
            link: "#"
        }
    ];

    return (
        <section id="projects" className="relative z-20 bg-[#121212] py-24 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 tracking-tight uppercase">
                    Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((p, i) => (
                        <a
                            href={p.link}
                            target={p.link !== "#" ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            key={i}
                            className={`group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 ${p.color} backdrop-blur-md transition-all duration-500 hover:border-white/30 cursor-pointer block`}
                        >
                            {/* Background Image with Overlay */}
                            {p.image && (
                                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                                    <p className="text-sm text-gray-300 uppercase tracking-widest mb-2 font-medium">{p.category}</p>
                                    <h3 className="text-3xl font-bold text-white mb-2">{p.title}</h3>
                                    <p className="text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 line-clamp-2">
                                        {p.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
