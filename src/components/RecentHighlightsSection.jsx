import React, { useEffect, useRef } from 'react';

const RecentHighlightsSection = () => {
  const scrollRef = useRef(null);

  const highlights = [

    {
      id: 1,
      type: 'Project',
      title: 'Exam Mind Map Tool',
      description: 'Interactive mind mapping application for exam preparation and study organization built on Lovable.dev',
      tech: ['React', 'Lovable.dev', 'Mind Maps'],
      status: 'In Progress',
      icon: '🧠',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || highlights.length <= 3) return; // Only scroll if more than 3 cards

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed (pixels per frame)
    let animationFrame;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled past the first set of cards
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(scroll);
    };

    // Start auto-scroll after a brief delay
    const startScroll = setTimeout(() => {
      animationFrame = requestAnimationFrame(scroll);
    }, 2000);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };

    const handleMouseLeave = () => {
      animationFrame = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(startScroll);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [highlights.length]);

  return (
    <div className="relative bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-3xl p-4 md:p-6 overflow-hidden mb-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/5 to-teal-500/5 rounded-full transform -translate-x-12 translate-y-12"></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            RECENT PROJECTS, EXPERIENCES & MINI PROJECTS
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Latest work and ongoing initiatives
        </p>
      </div>

      {/* Scrolling Cards Container */}
      <div 
        ref={scrollRef}
        className={`relative z-10 ${highlights.length > 3 ? 'overflow-x-hidden' : 'overflow-x-visible'} scrollbar-hide`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className={`flex gap-4 ${highlights.length > 3 ? 'w-max' : 'justify-center'}`}>
          {/* Only duplicate the highlights array for seamless infinite scroll if more than 3 cards */}
          {highlights.length > 3 
            ? [...highlights, ...highlights].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-sm`}>
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {item.type}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Current' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : item.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {item.status}
                    </div>
                  </div>

                  {/* Card Content */}
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <a 
                    href="mailto:abhinavkumar3584@gmail.com"
                    className={`w-full py-2 px-3 rounded-lg bg-gradient-to-r ${item.color} text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200 block text-center`}
                  >
                    Want to Work
                  </a>
                </div>
              ))
            : highlights.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-sm`}>
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        {item.type}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Current' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : item.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {item.status}
                    </div>
                  </div>

                  {/* Card Content */}
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <a 
                    href="mailto:abhinavkumar3584@gmail.com"
                    className={`w-full py-2 px-3 rounded-lg bg-gradient-to-r ${item.color} text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200 block text-center`}
                  >
                    Want to Work
                  </a>
                </div>
              ))
          }
        </div>
      </div>

      {/* Scroll Indicator - Only show if more than 3 cards */}
      {highlights.length > 3 && (
        <div className="flex justify-center mt-4 relative z-10">
          <div className="flex gap-1">
            {highlights.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default RecentHighlightsSection;
