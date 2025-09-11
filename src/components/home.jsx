import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="pixel-bg min-h-screen w-full flex flex-col items-center justify-center text-green-300 relative overflow-hidden px-6 py-12">
      
      {/* Floating stars */}
      <div className="floating-objects">
        <div className="star"></div>
        <div className="star delay-1"></div>
        <div className="star delay-2"></div>
        <div className="star delay-3"></div>
        <div className="star delay-4"></div>
      </div>

      {/* Title */}
      <h1 className="minecraft-font text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_0_25px_#22c55e] text-center mb-12">
        Welcome to IZARA AI
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl justify-center items-center">
        <div
          onClick={() => navigate("/query")}
          className="pixel-border cursor-pointer hover:scale-105 transform transition-all duration-200 w-full sm:w-1/2 p-6 flex flex-col items-center justify-center"
        >
          <h2 className="minecraft-font text-sm sm:text-base font-bold text-center text-green-200 hover:text-green-100">
            Ask Your Query
          </h2>
        </div>

        <div
          onClick={() => alert("Future feature!")}
          className="pixel-border cursor-pointer hover:scale-105 transform transition-all duration-200 w-full sm:w-1/2 p-6 flex flex-col items-center justify-center"
        >
          <h2 className="minecraft-font text-sm sm:text-base font-bold text-center text-green-200 hover:text-green-100">
            Explore More
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
