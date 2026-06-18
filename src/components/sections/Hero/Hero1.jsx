import './Hero1.css';
import RotatingBadge from './Rotatingbadge';

// Placeholder avatar — swap for real image src
const AVATAR_SRC = '/images/myimg1.jpeg';

export default function Hero() {
  return (
    <section id="hero" className="hero">

      <div className="hero__body">
        <div className="hero__left">
          <RotatingBadge id="rotatingBadge"/>

          <h1 className="hero__headline">
            
            <span className="hero__headline-line hero__headline--solid">Building</span>
            <span className="hero__headline-line hero__headline--inline">
              software{' '}
              <span className="hero__avatar-inline">
                <img src={AVATAR_SRC} alt="Utkarsh avatar" className="hero__avatar-img" />
              </span>{' '}
              that
            </span>
            <span className="hero__headline-line hero__headline--filled">feels alive.</span>
          </h1>

          <p className="hero__bio">
        
            I'm a full-stack web engineer dedicated towards building scalable and meaningful web application and systems that scale. 
            
          </p>

          <div className="hero__actions">
            <a href="#projects" className="hero__btn-primary">See my projects</a>
            <a href="./public/pdf/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn-ghost">
              View Resume <span className="hero__arrow">→</span>
            </a>
          </div>
        </div>
      </div>      
    </section>
  );
}
