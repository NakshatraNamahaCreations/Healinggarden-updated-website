import React, { useState, useCallback } from "react";
import "./contact.css";

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function GalleryCopmonet() {
  const [isToggle, setIsToggle] = useState(0);

  const handleToggle = (index) => {
    setIsToggle(index);
  };

  const extractVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname.split('/');
      if (pathname.includes('shorts')) {
        return pathname.pop().split('?')[0];
      } else {
        return parsedUrl.searchParams.get('v');
      }
    } catch (e) {
      console.error("Error extracting video ID:", e);
      return null;
    }
  };


  const galleryVideos = [
    "https://youtube.com/shorts/hHx__yhk4kc?si=KVf2Nf0ehpUt51ee",
    "https://youtube.com/shorts/hHx__yhk4kc?si=KVf2Nf0ehpUt51ee",
    "https://youtu.be/pEB6sRwqqO8?si=wbgf7r2N-ZDAYngw",
    "https://youtube.com/shorts/GIgZEIGmuCg?si=USkKDWh-QixWMUQX",
    "https://youtube.com/shorts/xwC4vp7zTZM?si=9LUdnlbo-S2sNzqX",
    "https://youtu.be/klmacJV971E?si=pFwmgEIvpSBlxpdJ",
    "https://youtube.com/shorts/4Kuup5Ve0kg?si=hY-JeoqFk9k5HNTC",
    "https://youtube.com/shorts/IJ27R2QFzv4?si=8_5PWvhjKKOpxFBo",
    "https://youtube.com/shorts/IJ27R2QFzv4?si=PgqAHRJaXLM0qKYQ",
    "https://youtube.com/shorts/DYfYos_bf84?si=mAd4TD70MkaoaWyw",
    "https://youtube.com/shorts/U4jEJY6oMK0?si=_uhcckr931psbc85",
    "https://youtu.be/6_OGJRvuxPQ?si=08n65NTqGZT7aBhx",
    "https://youtube.com/shorts/WnsiFT6w0oc?si=jFujEsdYriyykJ_V",
    "https://youtu.be/XKSiH3MLnWo?si=T9D4ds7VvXXU4Jx7",
    "https://youtu.be/o632nu2TcuI?si=zXSrybTGwb04rgrM"
  ];
  let GallaryImages = [
    {
      title: "Terrarium Workshop At Google",
      img: "../gallary/Terrarium Workshop At Google.jpg"
    },
    { title: "Gardening Workshop Set-Up", img: "../gallary/Gardening Workshop Set-Up.jpg" },
    { title: "Terrarium Making Session", img: "../gallary/Terrarium Making Session.jpg" },
    { title: "Fairy Garden Set Up", img: "../gallary/Fairy Garden Set Up.jpg" },
    { title: "Fairy Garden Workshop", img: "../gallary/Fairy Garden Workshop.jpg" },
    { title: "Employee's self made fairy garden", img: "../gallary/Employee's self made fairy garden.jpg" },
    { title: "Beautiful Fairy Garden", img: "../gallary/Beautiful Fairy Garden.jpg" },
    { title: "Fairy Garden Workshop For Women Summit", img: "../gallary/Fairy Garden Workshop For Women Summit.jpg" },
    { title: "Closed Terrarium For Gifting", img: "../gallary/Closed Terrarium For Gifting.jpg" },
    { title: "Employees Making Terrarium", img: "../gallary/Employees Making Terrarium.jpg" },
    { title: "Birthday Gift Order", img: "../gallary/Birthday Gift Order.jpg" },
    { title: "Terrarium Gifting", img: "../gallary/Terrarium Gifting.jpg" },
    { title: "Online Terrarium Workshop", img: "../gallary/Online Terrarium Workshop.jpg" },
    { title: "Sound & Crystal Healing", img: "../gallary/Sound & Crystal Healing.jpg" },
    { title: "Workshop At GE Carnival", img: "../gallary/Workshop At GE Carnival.jpg" },
    { title: "Sound Healing Session", img: "../gallary/Sound Healing Session.jpg" },
    { title: "Terrarium Workshop At Go Native", img: "../gallary/Terrarium Workshop At Go Native.jpg" },
    { title: "Self-Love Workshop", img: "../gallary/Self-Love Workshop.jpg" },
    { title: "Mini-Closed Terrarium", img: "../gallary/Mini-Closed Terrarium.jpg" },
    { title: "Closed Terrarium Gift", img: "../gallary/Closed Terrarium Gift.jpg" },
    { title: "Mandala Art Workshop", img: "../gallary/Mandala Art Workshop4.png" },
    { title: "Self-Love Workshop (1)", img: "../gallary/Self-Love Workshop (1).jpg" },
    { title: "Sound Healing Session", img: "../gallary/healing garden3.png" },
    { title: "Sound Healing Session", img: "../gallary/Sound Healing Session (1).jpg" },
    { title: "Mandala Art Training", img: "../gallary/Mandala Art Training.png" },
    { title: "Closed Terrarium Workshop", img: "../gallary/Closed Terrarium Workshop.jpg" },
    { title: "Employee Making Sand Art", img: "../gallary/Employee Making Sand Art.jpg" },
    { title: "Terrarium Making", img: "../gallary/Terrarium Making.jpg" },
    { title: "Couple making terrarium", img: "../gallary/Couple making terrarium.jpg" },
    { title: "Mandala Art Workshop.png", img: "../gallary/Mandala Art Workshop.png" },

  ];
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  return (
    <>
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <p className="p-1">Home {" > "} Gallery</p>
      </div>
      <div className="row m-auto p-2">
        <p className="about-us sourc">Gallery</p>
      </div>
      <img
        className="d-block w-100 PositionR"
        height="100%"
        src="../clients/team/galary.png"
        alt="Gallery Banner"
      />
      <div className="row m-auto text-center shadow-sm">
        <div
          className={`col-md-6 cursor p-3 ${isToggle === 0 ? "active-galary" : "a-galary"}`}
          onClick={() => handleToggle(0)}
        >
          Photos
        </div>
        <div
          className={`col-md-6 cursor p-3 ${isToggle === 1 ? "active-galary" : "a-galary"}`}
          onClick={() => handleToggle(1)}
        >
          Videos
        </div>
      </div>

      {isToggle === 0 && (
        <div className="row m-auto mt-3">
          {GallaryImages.map((ele) => (
            <div className="col-md-4 p-3" key={ele.title}>


              <Gallery photos={photos} onClick={openLightbox} />
              <ModalGateway>
                {viewerIsOpen ? (
                  <Modal onClose={closeLightbox}>
                    <Carousel
                      currentIndex={currentImage}
                      views={photos.map(x => ({
                        ...x,
                        srcset: x.img,
                        caption: x.title
                      }))}
                    />
                  </Modal>
                ) : null}
              </ModalGateway>
            </div>
          ))}
        </div>
      )}

      {isToggle === 1 && (
        <div className="row m-auto mt-3">
          {galleryVideos.map((url, index) => {
            const videoId = extractVideoId(url);
            if (!videoId) return null;
            return (
              <div className="col-md-4 mt-4" key={index}>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`video-${index}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}




