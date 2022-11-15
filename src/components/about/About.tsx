import Image from "next/image";
import Twitter from "../../assets/twitter-icon.svg";
import Github from "../../assets/github-icon.svg";

const AboutWidget = () => {
  return (
    <>
      <figure className="snip1559">
        <div className="profile-image">
          <img
            src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/handsome-squidward-theodore-mitchell.jpg"
            alt="Jerome Janicot"
          />
        </div>
        <figcaption>
          <h3>Jerome Janicot</h3>
          <h5>Web Developper</h5>
          <p>Building amazing web app for a living.</p>
          <div className="icons">
            <a
              href="https://twitter.com/jeromejanicot"
              target={"_blank"}
              rel="noreferrer"
            >
              <Image
                src={Twitter}
                alt="An SVG of Twitter"
                height={30}
                width={30}
              />
            </a>
            <a href="#">
              <i className="ion-social-twitter"></i>
            </a>
            <a
              href="https://github.com/jeromejanicot"
              target={"_blank"}
              rel="noreferrer"
            >
              <Image
                src={Github}
                alt="An SVG of Github"
                height={30}
                width={30}
              />
            </a>
          </div>
        </figcaption>
      </figure>
    </>
  );
};

export default AboutWidget;
