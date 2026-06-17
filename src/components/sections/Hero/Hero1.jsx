import './Hero1.css';
import RotatingBadge from './Rotatingbadge';

// Placeholder avatar — swap for real image src
const AVATAR_SRC = 'https://i.pravatar.cc/80?img=68';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__top-bar">
        
        <div className="hero__status">
          <span className="hero__status-dot" />
          Open to work
        </div>
      </div>

      <div className="hero__body">
        <div className="hero__left">
          <RotatingBadge id="rotatingBadge"/>

          <h1 className="hero__headline">
            <span className="hero__greeting">
              Hey, I'm <span className="hero__name">Utkarsh</span>
            </span>
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

          {/* <p className="hero__bio">
            I'm a full-stack engineer who cares about the craft — fast systems, thoughtful
            interfaces, and code that other humans can actually read.
          </p> */}

          <div className="hero__actions">
            <a href="#projects" className="hero__btn-primary">See my projects</a>
            <a href="#about" className="hero__btn-ghost">
              Read about me <span className="hero__arrow">→</span>
            </a>
          </div>
        </div>
      </div>      
    </section>
  );
}
