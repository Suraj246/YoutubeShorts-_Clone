import React, { useEffect, useRef, useState } from "react";
import "./css/Video.css";

const Videos = ({ id, src, like, title, increaseLike, elemId, setVideoData, videoData }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false); // State to manage play/pause
    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
            if (entry.isIntersecting) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }, { threshold: 0.5 });

        const currentVideoRef = videoRef.current; // Store a reference to the video element
        observer.observe(currentVideoRef);

        return () => {
            observer.unobserve(currentVideoRef); // Use the stored reference in the cleanup function
        };
    }, [like]);


    const togglePlayPause = () => {

        if (!isPlaying) {
            setIsPlaying(!isPlaying);
            videoRef.current.pause();
        } else if (!isPlaying) {
            const n = parseInt(videoRef?.current?.id)
            if (n === id) {
                videoRef.current.play();
                setIsPlaying(!isPlaying);
            }
            return
        }
        else {
            videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    // storing time and duration in state
    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
        setDuration(videoRef.current.duration);
    };

    const handleSeek = (event) => {
        const time = event.target.value;
        setCurrentTime(time);
        videoRef.current.currentTime = time;
    };




    return (
        <div className="video">
            <video
                id={id}
                className="video__player"
                loop
                ref={videoRef}
                src={src}
                muted
                onClick={togglePlayPause}
                onTimeUpdate={handleTimeUpdate}
            />

            <div className="shortsContainer">
                <div className="seeker">
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                    />
                </div>

                <div className="shortsContainer">
                    <div className="overlay">
                        {!isPlaying ? (
                            <svg onClick={togglePlayPause} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="pause-button">
                                <path fill="#eee7e7" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                            </svg>
                        ) : (
                            <svg onClick={togglePlayPause} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="play-button" >
                                <path fill="#ededed" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                            </svg>
                        )}
                    </div>
                    <div className="shortsVideoSideIcons">
                        {like >= 1 ?
                            <svg onClick={() => increaseLike(id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='likeSVG'>
                                <path fill="#f50a0a" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                            </svg>
                            :
                            <svg
                                onClick={() => increaseLike(id)}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='likeSVG'>
                                <path fill="#f7f9fc" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                            </svg>
                        }
                        <p className="like-count" >{like}</p>
                    </div>
                    <div className="shortsBottom">
                        <span>
                            {title}
                        </span>
                    </div>
                </div>

            </div>
        </div >



    );
}
export default Videos;


// second method for future improvements

//     const [playing, setPlaying] = useState(false);
//     const videoRef = useRef(null);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);

//     // Autoplay the video when the component mounts
//     useEffect(() => {
//         if (videoRef.current) {
//             videoRef.current.play();
//             setPlaying(true);
//         }
//     }, []);

//     // play and pause feature
//     const handleVideoPress = (id) => {
//         if (playing) {
//             setPlaying(false);
//             videoRef.current.pause();
//             // autoPlay paused video after 5 seconds
//             setTimeout(() => {
//                 videoRef.current.play();
//                 setPlaying(!playing);
//             }, [5000])
//         } else {
//             videoRef.current.play();
//             setPlaying(!playing);
//         }
//     };

//     // storing duration and time of video in state
//     const handleTimeUpdate = () => {
//         setCurrentTime(videoRef.current.currentTime);
//         setDuration(videoRef.current.duration);
//     };


//     const handleSeek = (event) => {
//         const time = event.target.value;
//         setCurrentTime(time);
//         videoRef.current.currentTime = time;
//     };

//     return (
//         <div className="video">

//             <video
//                 id={id}
//                 className="video__player"
//                 onClick={() => handleVideoPress(id)}
//                 loop
//                 ref={videoRef}
//                 src={src}
//                 muted
//                 autoPlay
//                 onTimeUpdate={handleTimeUpdate}

//             />
//             <div className="seeker">
//                 <input
//                     type="range"
//                     min={0}
//                     max={duration}
//                     value={currentTime}
//                     onChange={handleSeek}
//                 />
//             </div>
//             <div className="shortsContainer">
//                 <div className="overlay">
//                     {playing ? (
//                         <svg onClick={handleVideoPress} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="pause-button" >
//                             <path fill="#eee7e7" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
//                         </svg>
//                     ) : (
//                         <svg onClick={handleVideoPress} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="play-button" >
//                             <path fill="#ededed" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
//                         </svg>
//                     )}
//                 </div>
//                 <div className="shortsVideoSideIcons">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='likeSVG'>
//                         <path fill="#f7f9fc" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
//                     </svg>
//                     <p className="like-count">{like}</p>

//                 </div>
//                 <div className="shortsBottom">
//                     <span>
//                         {title}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// }