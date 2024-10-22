import BlogList from "@/components/blogList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
  <div>
    <ToastContainer theme="dark"/> 
    <Header/>
    <BlogList/>
    <Footer/>
  </div>
  );
}
 