import fs from 'fs';
import path from 'path';
import ScrollyCanvas from './components/ScrollyCanvas';
import Overlay from './components/Overlay';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

export default function Home() {
  // Server-side Logic to get frames
  const sequenceDir = path.join(process.cwd(), 'public', 'sequence');
  let framePaths: string[] = [];

  try {
    const files = fs.readdirSync(sequenceDir);
    // Filter WebP and sort naturally
    framePaths = files
      .filter(file => file.endsWith('.webp'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map(file => `/sequence/${file}`);
  } catch (error) {
    console.error("Error reading sequence directory:", error);
  }

  return (
    <main className="bg-[#121212] min-h-screen">
      <Navbar />
      {/* Master Scroll Container */}
      <div className="relative">
        {/* Canvas Layer - Sticky & Behind */}
        <ScrollyCanvas framePaths={framePaths} />

        {/* Overlay Layer - Absolute & Top */}
        <Overlay />
      </div>

      {/* Content Flow Normal */}
      <Projects />
      <Contact />
    </main>
  );
}
