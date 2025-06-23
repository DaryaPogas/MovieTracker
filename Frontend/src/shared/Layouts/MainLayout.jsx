import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./MainLayout.css";

export default function MainLayout({ children }) {
  return (
    <div className="layout-wrapper">
      <Header />
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}
