const NewsletterCard = () => {
  return (
    <div className="flex justify-center items-center px-4 py-8 min-h-screen">
      <div className="bg-[#081a42] max-w-4xl w-full p-6 rounded-xl shadow-lg text-white">
        
        {/* Title Section */}
        <h2 className="text-2xl font-bold text-center bg-yellow-600 py-2 rounded-md">
          About Tech & Innovation Hub
        </h2>

        {/* Description Section */}
        <p className="mt-4 text-center text-lg leading-relaxed max-w-[700px] mx-auto">
          Your go-to platform for the latest updates in technology and innovation. 
          Explore insightful content, engage with the community, and stay inspired.
        </p>

        {/* Slogan */}
        <p className="italic text-center text-lg font-semibold mt-4 mb-6">Stay connected with us</p>

        {/* Newsletter Signup Card */}
        <div className="flex justify-center">
          <div className="bg-[#3f4c69] max-w-md w-full p-5 rounded-lg shadow-lg">
            
            <h3 className="text-lg font-semibold text-white mb-3 text-center">
              Subscribe to our newsletter
            </h3>

            {/* Input and Subscribe Button */}
            <div className="flex flex-col items-center gap-3">
              {/* Email Input */}
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-[#FF7F11] px-4 py-2 rounded outline-none focus:ring-2 focus:ring-[#FF7F11] focus:ring-opacity-60 transition"
                aria-label="Enter your email to subscribe"
              />

              {/* Subscribe Button */}
              <button
                className="bg-orange-600 rounded-lg text-white px-4 py-2 uppercase font-medium tracking-wide hover:bg-[#e76f0a] transition hover:shadow-md"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsletterCard;
