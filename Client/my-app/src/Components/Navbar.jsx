import React,{useState} from 'react'

const Navbar = () => {
     const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
        <nav className="bg-white shadow dark:bg-gray-800 relative z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="#" className="text-xl font-semibold text-gray-800 dark:text-white">
            Find-It
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 dark:text-white focus:outline-none z-50"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <a href="#" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400">Home</a>
            <a href="#" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400">Browse</a>
            <a href="#" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400">Lost & Found</a>
            <a href="#" className="text-gray-700 dark:text-white hover:underline hover:text-pink-400">Contact</a>
            <img className="w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?img=3" alt="avatar" />
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-opacity-40 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 mt-10">
          <a href="#" className="block text-gray-800 dark:text-white text-lg" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#" className="block text-gray-800 dark:text-white text-lg" onClick={() => setIsOpen(false)}>Browse</a>
          <a href="#" className="block text-gray-800 dark:text-white text-lg" onClick={() => setIsOpen(false)}>Lost & Found</a>
          <a href="#" className="block text-gray-800 dark:text-white text-lg" onClick={() => setIsOpen(false)}>Contact</a>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Navbar