import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Work from './Components/Works/Work';
import Testimonials from './Components/Testimonials/Testimonials';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import Worker from './Components/Worker/Worker';
import Employer from './Components/Employer/Employer';
import Register from './Components/Worker/Register';
import Login from './Components/Worker/Login';
import ERegister from './Components/Employer/ERegister';
import EmployerLogin from './Components/Employer/EmployerLogin';
import Home from './Components/Worker/Home';
import Forgotpassword from './Components/Worker/Forgotpassword';
import Resetpassword from './Components/Worker/Resetpassword';
import Ehome from './Components/Employer/Ehome';
import Eforgotpassword from './Components/Employer/Eforgotpassword';
import Eresetpassword from './Components/Employer/Eresetpassword';
import Construction from './Components/Contruction/Construction';
import Progress from './Components/Progress/Progress';
import UnderDev from './Components/underDev/UnderDev';
import Gardening from './Components/Gardening/Gardening';
import Laundry from './Components/Laundry/Laundry';
import Applyprogress from './Components/Applyprogress/Applyprogress';
import Accept from './Components/Accept/Accept';
import Report from './Components/Reportprogress/Report';
import Track from './Components/Track/Track';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div id="home">
                {' '}
                <Hero />
              </div>
              <div id="about">
                <Work />
              </div>
              <div id="testimonials">
                {' '}
                <Testimonials />
              </div>
              <div id="contact">
                <Contact />
              </div>
              <Footer />
            </div>
          }
        />
        <Route path="/track" element={<Track />} />
        <Route path="reportprogress" element={<Report />} />
        <Route path="/accept" element={<Accept />} />
        <Route path="/prog" element={<Applyprogress />} />
        <Route path="/laundry" element={<Laundry />} />
        <Route path="/gardening" element={<Gardening />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/underDev" element={<UnderDev />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/worker" element={<Worker />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employerlogin" element={<EmployerLogin />} />
        <Route path="/eregister" element={<ERegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="/resetpassword/:token" element={<Resetpassword />}></Route>
        <Route path="/ehome" element={<Ehome />} />
        <Route path="eforgotpassword" element={<Eforgotpassword />} />
        <Route path="eresetpassword/:token" element={<Eresetpassword />} />
      </Routes>
    </Router>
  );
};

export default App;
