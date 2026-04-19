import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

      <h1 className="text-5xl font-bold mb-4">
        RentX
      </h1>

      <p className="text-lg mb-8 text-center max-w-md">
        Book your favorite cars easily, securely and instantly.
        Experience the future of car rental.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300"
        >
          Register
        </button>
      </div>

    </div>
  );
}

export default Home;