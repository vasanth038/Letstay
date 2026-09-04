const Contact = () => {
  return (
    <section className="py-16 px-2">
      <div className="flex flex-col items-center justify-center gap-5 max-w-6xl mx-auto bg-gray-800 rounded-xl px-2 py-12">
        <h1 className="font-bold text-3xl text-white">Stay Inspired</h1>

        <p className="text-gray-300">
          Join our newsletter and be the first to discover new destinations,
          exclusive offers, and travel inspiration.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <input
            type="email"
            className="text-black bg-white px-4 py-3 rounded-lg outline-none flex-1"
            placeholder="Enter Your Email"
          />
          <button className="text-white bg-black px-6 py-3 rounded-lg hover:bg-gray-900 transition">
            Subscribe
          </button>
        </div>

        <p className="text-gray-400 text-sm">
          By subscribing, you agree to our Privacy Policy and consent to
          receive updates.
        </p>
      </div>
    </section>
  );
};

export default Contact;
