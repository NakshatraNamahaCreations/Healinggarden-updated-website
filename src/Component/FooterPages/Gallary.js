import React, { useState, useCallback } from "react";
import "./contact.css";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Helmet } from "react-helmet";
import Mobileheader from "../Layout/Mobileheader";

export default function GalleryComponent() {
  const [isToggle, setIsToggle] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const handleToggle = (index) => {
    setIsToggle(index);
  };

  const [currentVideo, setCurrentVideo] = useState(null);

  const extractVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      let videoId = null;

      if (parsedUrl.hostname === "youtu.be") {
        videoId = parsedUrl.pathname.slice(1);
      } else if (parsedUrl.pathname.includes("shorts")) {
        videoId = parsedUrl.pathname.split("/").pop();
      } else {
        videoId = parsedUrl.searchParams.get("v");
      }

      return videoId;
    } catch (e) {
      console.error("Error extracting video ID:", e);
      return null;
    }
  };

  const playVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  const galleryVideos = [
    "https://youtu.be/pEB6sRwqqO8?si=wbgf7r2N-ZDAYngw",
    "https://youtube.com/shorts/GIgZEIGmuCg?si=USkKDWh-QixWMUQX",
    "https://youtube.com/shorts/xwC4vp7zTZM?si=9LUdnlbo-S2sNzqX",
    "https://youtu.be/klmacJV971E?si=pFwmgEIvpSBlxpdJ",
    "https://youtube.com/shorts/4Kuup5Ve0kg?si=hY-JeoqFk9k5HNTC",
    "https://youtube.com/shorts/IJ27R2QFzv4?si=8_5PWvhjKKOpxFBo",
    "https://youtube.com/shorts/DYfYos_bf84?si=mAd4TD70MkaoaWyw",
    "https://youtube.com/shorts/U4jEJY6oMK0?si=_uhcckr931psbc85",
    "https://youtu.be/6_OGJRvuxPQ?si=08n65NTqGZT7aBhx",
    "https://youtube.com/shorts/WnsiFT6w0oc?si=jFujEsdYriyykJ_V",
    "https://youtu.be/XKSiH3MLnWo?si=T9D4ds7VvXXU4Jx7",
    "https://youtu.be/o632nu2TcuI?si=zXSrybTGwb04rgrM",
  ];

  let galleryImages = [
    {
      title: "Terrarium Workshop At Google",
      img: "../gallary/Terrarium Workshop At Google.jpg",
    },
    {
      title: "Gardening Workshop Set-Up",
      img: "../gallary/Gardening Workshop Set-Up.jpg",
    },
    {
      title: "Terrarium Making Session",
      img: "../gallary/Terrarium Making Session.jpg",
    },
    { title: "Fairy Garden Set Up", img: "../gallary/Fairy Garden Set Up.jpg" },
    {
      title: "Fairy Garden Workshop",
      img: "../gallary/Fairy Garden Workshop.jpg",
    },
    {
      title: "Employee's self made fairy garden",
      img: "../gallary/Employee's self made fairy garden.jpg",
    },
    {
      title: "Beautiful Fairy Garden",
      img: "../gallary/Beautiful Fairy Garden.jpg",
    },
    {
      title: "Fairy Garden Workshop For Women Summit",
      img: "../gallary/Fairy Garden Workshop For Women Summit.jpg",
    },
    {
      title: "Closed Terrarium For Gifting",
      img: "../gallary/Closed Terrarium For Gifting.jpg",
    },
    {
      title: "Employees Making Terrarium",
      img: "../gallary/Employees Making Terrarium.jpg",
    },
    { title: "Birthday Gift Order", img: "../gallary/Birthday Gift Order.jpg" },
    { title: "Terrarium Gifting", img: "../gallary/Terrarium Gifting.jpg" },
    {
      title: "Online Terrarium Workshop",
      img: "../gallary/Online Terrarium Workshop.jpg",
    },
    {
      title: "Sound & Crystal Healing",
      img: "../gallary/Sound & Crystal Healing.jpg",
    },
    {
      title: "Workshop At GE Carnival",
      img: "../gallary/Workshop At GE Carnival.jpg",
    },
    {
      title: "Sound Healing Session",
      img: "../gallary/Sound Healing Session.jpg",
    },
    {
      title: "Terrarium Workshop At Go Native",
      img: "../gallary/Terrarium Workshop At Go Native.jpg",
    },
    { title: "Self-Love Workshop", img: "../gallary/Self-Love Workshop.jpg" },
    {
      title: "Mini-Closed Terrarium",
      img: "../gallary/Mini-Closed Terrarium.jpg",
    },
    {
      title: "Closed Terrarium Gift",
      img: "../gallary/Closed Terrarium Gift.jpg",
    },
    {
      title: "Mandala Art Workshop",
      img: "../gallary/Mandala Art Workshop4.png",
    },
    {
      title: "Self-Love Workshop (1)",
      img: "../gallary/Self-Love Workshop (1).jpg",
    },
    { title: "Sound Healing Session", img: "../gallary/healing garden3.png" },
    {
      title: "Sound Healing Session",
      img: "../gallary/Sound Healing Session (1).jpg",
    },
    {
      title: "Mandala Art Training",
      img: "../gallary/Mandala Art Training.png",
    },
    {
      title: "Closed Terrarium Workshop",
      img: "../gallary/Closed Terrarium Workshop.jpg",
    },
    {
      title: "Employee Making Sand Art",
      img: "../gallary/Employee Making Sand Art.jpg",
    },
    { title: "Terrarium Making", img: "../gallary/Terrarium Making.jpg" },
    {
      title: "Couple making terrarium",
      img: "../gallary/Couple making terrarium.jpg",
    },
    {
      title: "Mandala Art Workshop.png",
      img: "../gallary/Mandala Art Workshop.png",
    },
  ];

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>
          Photos & Videos of Employee Engagement & Private Events | Healing
          Garden India
        </title>
        <meta
          name="description"
          content="Explore our gallery of photos and videos showcasing our employee engagement workshops, private parties, and corporate events."
        />
        <meta
          name="keywords"
          content="gallery, photos, videos, employee engagement, private events, healing garden"
        />
        <meta
          property="og:title"
          content="Photos & Videos of Employee Engagement & Private Events | Healing Garden India"
        />
        <meta
          property="og:description"
          content="Explore our gallery of photos and videos showcasing our employee engagement workshops, private parties, and corporate events."
        />
        <meta property="og:image" content="URL-to-your-image" />
        <link rel="canonical" href="http://www.healinggarden.co.in/gallery" />
      </Helmet>
      <Header />
      <Mobileheader />
      <div className="categoryview m-auto row">
        <hr className="row hr-line" style={{ borderColor: "white" }}></hr>
        <div className="row m-auto ">
          <div className="d-flex p-3 ">
            <li className="headertext">
              <a className="headertext poppins-regular me-1" href="/">
                Home
              </a>
            </li>
            <li className="headertext me-1"> {">"} </li>
            <li className="headertext">
              <a className="headertext poppins-regular" href="/gallery">
                {" "}
                Gallery
              </a>
            </li>
          </div>
        </div>
      </div>
      <div className="row m-auto p-2">
        <p
          className="about-us poppins-regular"
          style={{ fontSize: "17px", fontWeight: "bold" }}
        >
          Gallery
        </p>
      </div>
      <img
        className="d-block w-100 PositionR"
        height="100%"
        src="../clients/team/galary.png"
        alt="Gallery Banner"
      />
      <div className="row m-auto text-center shadow-sm">
        <div
          className={`col-md-6 col-6 cursor p-3 ${
            isToggle === 0 ? "active-galary" : "a-galary"
          }`}
          onClick={() => handleToggle(0)}
        >
          Photos
        </div>
        <div
          className={`col-md-6 col-6 cursor p-3 ${
            isToggle === 1 ? "active-galary" : "a-galary"
          }`}
          onClick={() => handleToggle(1)}
        >
          Videos
        </div>
      </div>

      {isToggle === 0 && (
        <div className="row m-auto mt-3">
          <Gallery
            photos={galleryImages.map((image, index) => ({
              src: image.img,
              width: 1 / 5,
              height: image.height,
              title: image.title,
              index: index,
            }))}
            onClick={(event, { photo, index }) => {
              openLightbox(null, { index });
            }}
            renderImage={({ photo }) => (
              <div
                style={{ position: "relative", margin: "5px", flex: "1 0 16%" }}
                onClick={() => openLightbox(null, { index: photo.index })}
              >
                <img
                  src={photo.src}
                  width="100%"
                  height="200px"
                  alt={photo.title}
                  style={{ cursor: "pointer", maxWidth: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    // left: '8px',
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    padding: "5px",
                    borderRadius: "3px",
                    margin: "2px",
                    fontSize: "12px",
                    textAlign: "center",
                  }}
                >
                  {photo.title}
                </div>
              </div>
            )}
          />
          <ModalGateway>
            {viewerIsOpen && (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={galleryImages.map((x) => ({
                    src: x.img,
                    caption: x.title,
                  }))}
                />
              </Modal>
            )}
          </ModalGateway>
        </div>
      )}

      {isToggle === 1 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {galleryVideos.map((videoUrl, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                margin: "5px",
                flex: "0 2 20%",
                cursor: "pointer",
                boxSizing: "border-box",
              }}
              onClick={() => playVideo(videoUrl)}
            >
              <img
                src={`https://img.youtube.com/vi/${extractVideoId(
                  videoUrl
                )}/hqdefault.jpg`}
                width="100%"
                height="200"
                alt={`Video Thumbnail ${index}`}
                style={{
                  display: currentVideo === videoUrl ? "none" : "block",
                }}
              />
              {currentVideo === videoUrl && (
                <iframe
                  width="100%"
                  height="auto"
                  src={`https://www.youtube.com/embed/${extractVideoId(
                    videoUrl
                  )}?autoplay=1`}
                  title={`Video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}
