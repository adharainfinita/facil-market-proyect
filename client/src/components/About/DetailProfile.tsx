import React, { useRef } from "react";
import { Link } from "react-router-dom";
import linkedin from "../../assets/icons/linkedin.svg";
import gmail from "../../assets/icons/gmail.svg";
import github from "../../assets/icons/github.svg";
import { PropsProfile } from "./dataProfile";

const DetailProfile: React.FC<PropsProfile> = (data) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const translateX = (mouseX - cardCenterX) / 5;
      const translateY = (mouseY - cardCenterY) / 5; 

      card.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = "none";
    }
  };

  return (
    <div
      className="about-conteiner-detail-team"
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <img
        onMouseMove={handleMouseMove}
        className="about-conteiner-detail-team-image"
        src={data.image}
        alt="Foto de perfil"
      />
      <h1 className="about-conteiner-detail-team-title">{data.fullName}</h1>

      <section className="about-conteiner-detail-team-redes">
        <Link to={data.github} target="_blank">
          <img
            className="about-conteiner-detail-team-icons"
            src={github}
            alt="github"
          />
        </Link>
        <Link to={data.linkdin} target="_blank">
          <img
            className="about-conteiner-detail-team-icons"
            src={linkedin}
            alt="linkedin"
          />
        </Link>
        <Link to={data.gmail} target="_blank">
          <img
            className="about-conteiner-detail-team-icons"
            src={gmail}
            alt="gmail"
          />
        </Link>
      </section>
    </div>
  );
};

export default DetailProfile;
