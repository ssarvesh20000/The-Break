//FRONTEND FOR HOW TO VIEW MEDIA UPLOADS 
'use client';
import { useEffect, useState } from "react";
import "@styles/ArticleView.css"; // TODO changing style file if needed
//import Image from "next/image";
import HeaderNav from "@components/HeaderNav";
import Footer from "@components/Footer";
import { useParams } from "next/navigation";
import { Media } from "@interfaces/Media";
import Loading from "@components/Loading";

const MediaView = () => {
  console.log("MediaView");
  const router = useParams();
  const id = router.id; // Use useParams to get the dynamic route parameter
  console.log("Media ID:", id);
  const [media, setMedia] = useState<Media>();

  useEffect(() => {
    if (!id) return;

    const fetchMedia = async () => {
      try {

        console.log("Fetching Media with ID:", id);
        const response = await fetch(`/api/media/${id}`);
        const data = await response.json();
        setMedia(data.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchMedia();
  }, [id]); 

  if (!media) {
    return <Loading />;
  }

    // Extract YouTube Video ID
    const extractVideoID = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
      };

  return (
    <div className="article-view-outer-container">
      <div className="article-view-body">
        <HeaderNav />
        <div className="article-view-page">
            <div className="article-view-container">
                <h3 className="article-view-title">{media.title}</h3>
                <p className="article-view-author">
                    {media.author} - {new Date(media.date).toLocaleDateString()}
                </p>
                <div className="article-view-image">
                    <iframe
                        width="800"
                        height="450"
                        src={`https://www.youtube.com/embed/${extractVideoID(media.youtubeLink)}`}
                        title={media.title}
                        //frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="article-view-video"
                    ></iframe>
                <p className="article-view-content">{media.description}</p>
                </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
);

}; 

export default MediaView;


/* congratulations on completing the first part of the mission in adding media to the db sarvy
(also an idea, for modifying and delete media, u can add a tab in the modify page so the user can toggle between seeing blogs or media. just an idea lmk if u think having a whole new button is better for it)
looks like u changed the api route already so thats good. so just check out the GET function in api/admin/routes.ts and it should be similar for media
again sh be easier since we dont have an image, should just require returning the data and the frontend can handle turning the url into actual stuff to show
if the api requires we pass in smth else other than a youtube url these api endpoint may require we pass in return diff (more processes) data so the frotnend api can handle it
so maybe do some research on how that frontend api works to render youtube content. test it out with a hard coded youtube url and see what it gives u
other than that this file is p small, just update that api endpoint and then replace line 59 instead of Image u put in ur api to render youtube url
*/