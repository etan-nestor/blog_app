import { useState, useEffect } from "react";
import Login from "../components/Forms/Login"
import LoaderPage from '../components/loader/LoaderPage';


const SignIn = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="h-[100vh] bg-[#071738] pt-[60px]">
      {loading ? (
        <LoaderPage />  // Affiche le loader pendant 2 secondes
      ) : (
        <>
          <Login />
        </>
      )
      }
    </div>
  )
}

export default SignIn