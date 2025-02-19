/* eslint-disable react/prop-types */
import { AuthProvider } from '../src/components/Other/AuthProvider'
import ProtectedRoute from '../src/components/Other/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import NavbarAuth from "./components/Navbar/NavbarAuth";
import FooterAuth from "./components/Footer/FooterAuth";
import WelcomeP from "./pages/WelcomeP";
import About from "./pages/About";
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResetLink from "./pages/ResetLink";
import { PasswordReset } from "./pages/PasswordReset";
import { PostsPage } from "./pages/PostsPage";
import { DetailPost } from "./pages/DetailPost";
import AddPosts from "./pages/AddPosts";
import { Toaster } from 'react-hot-toast';


const Layout = ({ children }) => {
  const location = useLocation();

  // Liste des routes qui doivent utiliser la Navbar/Footer classiques
  const publicRoutes = ["/", "/signup", "/signin", "/reset-password-link", "/reset-password", "/about"];

  // Vérifie si l'URL actuelle est dans la liste des routes publiques
  const isPublicPage = publicRoutes.includes(location.pathname);

  return (
    <div>
      {isPublicPage ? <Navbar /> : <NavbarAuth />}
      {children}
      {isPublicPage ? <Footer /> : <FooterAuth />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Pages publiques */}
            <Route path="/" element={<WelcomeP />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/reset-password-link" element={<ResetLink />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/about" element={<About />} />

            {/* Pages protégées */}
            <Route
              path="/home"
              element={<ProtectedRoute><Home /></ProtectedRoute>}
            />
            <Route
              path="/posts"
              element={<ProtectedRoute><PostsPage /></ProtectedRoute>}
            />
            <Route
              path="/post/:id"
              element={<ProtectedRoute><DetailPost /></ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />

            {/* for dev test */}
            <Route path="/post-add" element={<AddPosts />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
