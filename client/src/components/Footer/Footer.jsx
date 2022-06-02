import HomeIcon from "@heroicons/react/outline/HomeIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="flex flex-col items-center m-6 justify-center text-gray-500 space-y-7   ">
      <div className=" flex justify-between items-center w-full px-10 pb-3 border-gray-300 border-b-2 space-x-2">
        <p>Get connected with us on social networks:</p>
        <div className=" flex space-x-4">
          <a target="_blank" href="https://github.com/samarpitsantoki">
            <FontAwesomeIcon icon={faGithub} className="h-8" />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/samarpit-santoki-9715441b8/"
          >
            <FontAwesomeIcon icon={faLinkedin} className="h-8" />
          </a>
          <a target="_blank" href="https://www.instagram.com/Samarpit_santoki">
            <FontAwesomeIcon icon={faInstagram} className="h-8" />
          </a>
          <a target="_blank" href="https://www.twitter.com/SamarpitSantoki">
            <FontAwesomeIcon icon={faTwitter} className="h-8" />
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4  sm:w-4/5 pt-10 sm:max-w-5xl space-x-10 mt-10 ">
        <div className="space-y-4 mx-auto pl-10 sm:p-0 mb-5">
          <h2 className="font-bold">ABOUT US</h2>
          <p>
            We are here to simplify your healthcare needs at your doorstep at
            the best rates, committed towards our customer satisfaction through
            our top of the line services.
          </p>
        </div>
        <div className="space-y-4 mx-auto mb-5">
          <h2 className="font-bold">PRODUCTS</h2>
          <p>Medicines</p>
          <p>Covid Care</p>
          <p>Health Care</p>
          <p>Devices</p>
          <p>Baby Care</p>
        </div>
        <div className="space-y-4 mx-auto mb-5">
          <h2 className="font-bold">EXPLORE</h2>
          <p>Medicine Tracker</p>
          <p>Medicine Reminder</p>
          <p>For Doctors</p>
          <p>Blog</p>
        </div>
        <div className="space-y-4 mx-auto mb-5 ">
          <h2 className="font-bold">CONTACT</h2>
          <p className="w-full flex items-center">
            <HomeIcon className="w-5 mr-1" />
            Anand,Gujarat
          </p>
          <p>info@madicare.in</p>
          <p>+91 942849083</p>
          <p>+91 9512084467 </p>
        </div>
      </div>
      <div>
        © 2022 Copyright: <span className="font-bold">MediCare.com</span>
      </div>
    </div>
  );
};

export default Footer;
