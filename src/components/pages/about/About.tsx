import { ReactElement } from 'react';
import './About.css';
import { BsGithub } from 'react-icons/bs';
import Accordion from '../../../utils/accordion/Accordion';
import timofeyPhoto from '../../../assets/img/team/timofey.png';
import elPhoto from '../../../assets/img/team/el.png';
import danilaPhoto from '../../../assets/img/team/danila.png';
import rsSchoolLogo from '../../../assets/img/RSSchool-full-logo.png';
import rsLogo from '../../../assets/img/logo_rs.svg';

export default function AboutUs(): ReactElement {
  const accordionItems = [
    {
      id: 'bogdanov',
      title: 'Danila Bogdanov',
      content: (
        <div className='AccordionItemContainer'>
          <img
            className='AboutMemberImage'
            src={danilaPhoto}
            alt='Danila Bogdanov'
          />
          <div className='AboutNameLinkContainer'>
            <h2 className='AboutMemberName'>Danila Bogdanov</h2>
            <a
              className='AboutMemberLink'
              target='blank'
              href='http://github.com/DanilBogdanov'
            >
              <BsGithub />
            </a>
          </div>
          <h3 className='AboutMemberRole'>
            QA Engineer, Web Developer, Tech Lead, Designer, Project Manager{' '}
          </h3>
          <p className='AboutBioText'>
            Hello! I&apos;m c# back-end developer. I love equipment, information
            technology and expand the field of competence. Now I am expanding
            the knowledge of frontend development, since I think to create high
            performance web applications is worth to know how both parties work.
          </p>
          <div className='AboutContributionContainer'>
            <h3 className='AboutContributionHeader'>Contribution</h3>
            <p className='AboutContributionText'>
              <ul className='AboutContributionUL'>
                <li className='AboutContributionLI'>
                  Commercetools API implementation
                </li>
                <li className='AboutContributionLI'>Design</li>
                <li className='AboutContributionLI'>GitHub Board</li>
              </ul>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'mekhdikhanov',
      title: 'Elmadyn Mekhdikhanov',
      content: (
        <div className='AccordionItemContainer'>
          <img
            className='AboutMemberImage'
            src={elPhoto}
            alt='Elmadyn Mekhdikhanov'
          />
          <div className='AboutNameLinkContainer'>
            <h2 className='AboutMemberName'>Elmadyn Mekhdikhanov</h2>
            <a
              className='AboutMemberLink'
              target='blank'
              href='http://github.com/DartSter'
            >
              <BsGithub />
            </a>
          </div>
          <h3 className='AboutMemberRole'>QA Engineer, Web Developer </h3>
          <p className='AboutBioText'>
            Persistent self-education day by day no day-off over 2 years. No
            real experience in projects yet.
          </p>
          <div className='AboutContributionContainer'>
            <h3 className='AboutContributionHeader'>Contribution</h3>
            <p className='AboutContributionText'>
              <ul className='AboutContributionUL'>
                <li className='AboutContributionLI'>Catalog Page</li>
                <li className='AboutContributionLI'>Routing and Navigation</li>
                <li className='AboutContributionLI'>Product Cards</li>
                <li className='AboutContributionLI'>Search Implementation</li>
                <li className='AboutContributionLI'>Cart Page</li>
              </ul>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'gribanov',
      title: 'Timofey Gribanov',
      content: (
        <div className='AccordionItemContainer'>
          <img
            className='AboutMemberImage'
            src={timofeyPhoto}
            alt='Timofey Gribanov'
          />
          <div className='AboutNameLinkContainer'>
            <h2 className='AboutMemberName'>Timofey Gribanov</h2>
            <a
              className='AboutMemberLink'
              target='blank'
              href='http://github.com'
            >
              <BsGithub />
            </a>
          </div>
          <h3 className='AboutMemberRole'>QA Engineer, Web Developer </h3>
          <p className='AboutBioText'>
            Beginner web developer. It took a long time to go from idea to
            action, but thanks to RSSchool I decided to take this path.
          </p>
          <div className='AboutContributionContainer'>
            <h3 className='AboutContributionHeader'>Contribution</h3>
            <p className='AboutContributionText'>
              <ul className='AboutContributionUL'>
                <li className='AboutContributionLI'>LogIn Page</li>
                <li className='AboutContributionLI'>Registration Page</li>
                <li className='AboutContributionLI'>AboutUs Page</li>
                <li className='AboutContributionLI'>Profile Page</li>
              </ul>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className='AboutMainContainer'>
      <div className='AboutSection'>
        <h1 className='FormHeader'>About Us</h1>
        <p className='AboutProjectText'>
          Welcome to our eCommerce application! This platform replicates
          real-world shopping experiences in a digital environment 🏪.
        </p>
        <p className='AboutProjectText'>
          Users can browse through a vast range of products 📚👗👟, view
          detailed descriptions, add their favorite items to the basket 🛒, and
          proceed to checkout 💳. It includes features such as user registration
          and login 📝🔐, product search 🔍, product categorization, and sorting
          to make the shopping experience more streamlined and convenient.
        </p>
        <p className='AboutProjectText'>
          An important aspect of our application is that it&apos;s responsive
          📲, ensuring it looks great on various devices with a minimum
          resolution of 390px. This feature makes the shopping experience
          enjoyable, irrespective of the device users prefer.
        </p>
        <p className='AboutProjectText'>
          The application is a Single Page Application (SPA) i.e. dynamically
          rewrites a current web page with new data from the web server.
        </p>
        <p className='AboutProjectText'>
          Key pages in the application include:
          <ul>
            <li>Login and Registration pages 🖥️</li>
            <li>Main page 🏠</li>
            <li>Catalog Product page 📋</li>
            <li>Detailed Product page 🔎</li>
            <li>User Profile page 👤</li>
            <li>Basket page 🛒</li>
            <li>About Us page 🙋‍♂️🙋‍♀️</li>
          </ul>
        </p>
        <p className='AboutProjectText'>
          The application is powered by CommerceTools 🌐, a leading provider of
          commerce solutions for B2C and B2B enterprises. CommerceTools offers a
          cloud-native, microservices-based commerce platform that enables
          brands to create unique and engaging digital commerce experiences.
        </p>
        <p className='AboutProjectText'>
          The main idea of our application is to become a comprehensive online
          shopping portal that provides an interactive and seamless experience
          to users. From product discovery to checkout, the application ensures
          a smooth journey for the user, enhancing their engagement and boosting
          their purchasing confidence 🚀.
        </p>
      </div>
      <h2 className='FormHeader'>Our team</h2>
      <div className='AccordionContainer AboutSection'>
        <Accordion items={accordionItems} />
      </div>
      <div className='AboutSection'>
        <h2 className='FormHeader'>Our thanks</h2>
        <div className='AbolutLogoContainer'>
          <div className='AboutLogoCard'>
            <a href='https://rs.school/js/' target='blank'>
              <img
                className='AboutThanksImage'
                src={rsSchoolLogo}
                alt='RSSchool logo'
              />
            </a>
          </div>
          <div className='AboutLogoCard'>
            <a href='https://rollingscopes.com/' target='blank'>
              <img
                className='AboutThanksImage'
                src={rsLogo}
                alt='RolingScopes logo'
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
