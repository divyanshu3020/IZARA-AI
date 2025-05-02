import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-900 to-black text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent mb-12 text-center">
        Welcome to QueryVision AI
      </h1>

      <div className="flex flex-col sm:flex-row gap-8 w-full max-w-4xl justify-center items-center cursor-pointer">
        {/* Query Button UI */}
        <div
          onClick={() => navigate("/query")}
          className="group relative w-full sm:w-1/2">
          <div className="p-6 rounded-2xl bg-gradient-to-tr from-green-500/20 to-blue-700/20 border border-blue-400/30 backdrop-blur-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-blue-400/50 duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-300 group-hover:text-blue-400">
              Ask your Query
            </h2>
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Home;
