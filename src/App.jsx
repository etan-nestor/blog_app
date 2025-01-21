import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WelcomeP from "./pages/WelcomeP";
import Home from './pages/Home'
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResetLink from "./pages/ResetLink";
import { PasswordReset } from "./pages/PasswordReset";
import { PostsPage } from "./pages/PostsPage";

const App = () => {


  return (
    <div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomeP />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password-link" element={<ResetLink/>} />
          <Route path="/reset-password" element={<PasswordReset/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts" element={<PostsPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
