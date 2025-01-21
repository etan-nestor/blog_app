

const NewsletterCard = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#081a42] w-[65rem] p-6 rounded-tl-xl shadow-lg text-white">
        {/* Title Section */}
        <h2 className="text-2xl font-bold text-center bg-yellow-600 mb-2">About Tech & Innovation Hub</h2>

        {/* Description Section */}
        <div className="flex justify-center">
          <p className="mb-4 w-[700px] text-center text-xl leading-relaxed">
            Your go-to platform for the latest updates in technology and innovation. Explore insightful content, engage with the community, and stay inspired.
          </p>
        </div>

        {/* Slogan */}
        <p className="italic  text-center text-xl font-semibold mb-4">Stay connected with us</p>

        {/* Newsletter Signup Card */}
        <div className="flex justify-center items-center">
          <div className="bg-[#3f4c69] w-[600px] text-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Subscribe to our newsletter </h3>

            {/* Input and Subscribe Button */}
            <div className="flex justify-center items-center gap-3">
              {/* Email Input */}
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-[#FF7F11] px-4 py-2 rounded outline-none focus:ring focus:ring-[#FF7F11] focus:ring-opacity-50"
              />

              {/* Subscribe Button */}
              <button
                className="bg-orange-600 rounded-tl-xl rounded-br-xl text-white px-4 py-2 uppercase font-medium tracking-wide hover:bg-[#e76f0a] transition"
              >
                Subscribe now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsletterCard;
