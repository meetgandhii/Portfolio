import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import rentroll from "../../Assets/Projects/rentroll.png";
import chatme from "../../Assets/Projects/ChatMe.png";
import photobooth from "../../Assets/Projects/PhotoBooth.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>

        

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Agreenably"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/ChatMe"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={rentroll}
              isBlog={false}
              title="Rent & Roll"
              description="Webapp for hourly car bookings with normal, subscription, and admin users. Admin manages cars, subs get 40% off, users book based on availability. Dynamic search bar for easy access. Clone, install dependencies, and run for seamless car renting experience."
              ghLink="https://github.com/meetgandhii/Rent-Roll"
              demoLink="https://master--fancy-malabi-9c648b.netlify.app"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="ChatMe"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/ChatMe"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={photobooth}
              isBlog={false}
              title="PhotoBooth"
              description="Implemented a Java-based Image Processing Application using MVC design with Swing for GUI, offering interactive text UI, batch processing, and various image manipulations like color adjustments, flipping, blur, and compression. Utilized Command Callback and Command Design Patterns, adhering to SOLID principles, and employed jUnit for testing."
              ghLink="https://github.com/meetgandhii/Image-Processing-App-Java"
              demoLink="https://github.com/meetgandhii/Image-Processing-App-Java"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Kanbas"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/ChatMe"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="One For All"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/ChatMe"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Hotel Booking System"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/ChatMe"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Travel Guide"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/ChatMe"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Ride Along"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/Ride-Along"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>
          
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Symptom Checker"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/ChatMe"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Loan Eligibility Checker"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Salon Management System"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Dogs vs Cats Checker"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Education Fantasy League"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="P.V.G. Chemicals"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Arline Booking System"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Sareeshadow"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="VirVentures"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Acadzo"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Frescolimited"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="ApexHatchers"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="Medanand"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="RCMHV"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatme}
              isBlog={false}
              title="SICA India"
              description="A User-friendly Chat App that lets users connect with elegance upon registration and logging in. Featuring a classy UI, robust data encryption, and an enjoyable communication style for a delightful chatting experience."
              ghLink="https://github.com/meetgandhii/GoalDiggers"
              demoLink="https://github.com/meetgandhii/ChatMe"
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
