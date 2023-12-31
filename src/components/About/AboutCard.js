import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Currently pursuing a <span className="purple">Masters of Science in Computer Science</span> at <span className="purple">Northeastern University's Khoury College of Computer Science</span>,
            I am a passionate individual with a clear vision: to secure a role in <span className="purple">full-stack software development</span>. My journey has been marked
            by a relentless pursuit of learning, a knack for swiftly adapting to diverse tech stacks, and an unwavering commitment to overcoming
            <span className="purple">challenges</span>. I thrive on the thrill of finding solutions, never accepting 'no' for an answer, and demonstrating flexibility as a <span className="purple">team player</span>.
            Fueled by a sincere passion, paired with an unwavering work ethic and a <span className="purple">competitive drive</span>, I thrive in the world of technology. My unique
            strength lies in consistently discovering answers to problems that may seem out of my <span className="purple">league</span>. Whether it's tackling complex tech issues or
            excelling in building professional <span className="purple">relationships</span>, fostering <span className="purple">connections</span>, crafting effective marketing strategies, and delivering compelling <span className="purple">pitches</span>,
            I bring a dynamic blend of skills to the table.
            What sets me apart is not just my ability to find solutions, but also my dedication to continuous <span className="purple">learning</span> and <span className="purple">innovation</span>. I've tackled projects that
            demanded <span className="purple">ingenuity</span> and have always emerged with successful outcomes. My coworkers would describe me as a passion-driven <span className="purple">team player</span>, proficient in <span className="purple">coding</span> and <span className="purple">innovation</span>.
            I take pride in going above and beyond to learn and implement new <span className="purple">technologies</span>, contributing to a <span className="purple">collaborative</span> and <span className="purple">positive work environment</span>.
            As I embark on the next phase of my <span className="purple">career</span>, I am eager to bring my unique <span className="purple">skill set</span> and <span className="purple">boundless enthusiasm</span> for <span className="purple">learning</span> to a role that aligns with my passion for
            <span className="purple">technology</span> and <span className="purple">problem-solving</span>. If you're looking for a <span className="purple">dedicated</span> and <span className="purple">innovative team member</span>, I'm ready to contribute my <span className="purple">skills</span> and make a positive <span className="purple">impact</span>.
            Let's connect and explore the <span className="purple">possibilities</span> together.

          </p>
          <footer className="blockquote-footer">Meet</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
