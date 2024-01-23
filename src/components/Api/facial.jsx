import React, { useState, useEffect, useRef } from 'react';
import './Facial.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as faceapi from 'face-api.js';
import MainHeader from "../MainHeader/MainHeader";

const WebcamComponent = () => {
    const videoRef = useRef();
    const overlayCanvasRef = useRef();
    const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
    const [isFaceDetected, setIsFaceDetected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        startVideo();
        loadModels().then(r => {});
    }, []);


    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                };
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadModels = async () => {


        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
            faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
            faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            faceapi.nets.faceExpressionNet.loadFromUri("/models")
        ]);

        setIsCanvasLoaded(true);
        toast.dismiss();
    };

    useEffect(() => {
        if (isCanvasLoaded) {
            const interval = setInterval(async () => {
                if (videoRef.current && videoRef.current.readyState === 4) {
                    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

                    if (!overlayCanvasRef.current) {
                        const container = document.querySelector('.appvideo');
                        const overlayCanvas = document.createElement('canvas');
                        overlayCanvas.style.position = 'absolute';
                        overlayCanvas.style.top = '0';
                        overlayCanvas.style.left = '0';
                        container.appendChild(overlayCanvas);
                        overlayCanvasRef.current = overlayCanvas;
                    }

                    const overlayCanvas = overlayCanvasRef.current;
                    overlayCanvas.width = videoRef.current.videoWidth;
                    overlayCanvas.height = videoRef.current.videoHeight;
                    const overlayContext = overlayCanvas.getContext('2d');
                    overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

                    const resizedDetections = faceapi.resizeResults(detections, overlayCanvas);
                    faceapi.draw.drawDetections(overlayCanvas, resizedDetections);
                    faceapi.draw.drawFaceLandmarks(overlayCanvas, resizedDetections);
                    faceapi.draw.drawFaceExpressions(overlayCanvas, resizedDetections);


                    setIsFaceDetected(detections.length > 0);
                    setIsLoading(false);

                }
            }, 500);

            return () => clearInterval(interval);
        }
    }, [isCanvasLoaded]);

    useEffect(() => {
        if (isFaceDetected) {
            toast.success('Face detected!', { position: toast.POSITION.TOP_RIGHT});
        }

    }, [isFaceDetected]);

    const timeoutRef = useRef(null);
    useEffect(() => {
        if (isLoading) {
            timeoutRef.current = setTimeout(() => {
                toast.loading('Models are Loading', { position: toast.POSITION.TOP_RIGHT });
            }, 2000); // Delayed execution after 2 seconds
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;

            }
            toast.dismiss(); // Dismiss any active toast
            toast.success('Models are Loaded', { position: toast.POSITION.TOP_RIGHT });
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            toast.dismiss(); // Dismiss any active toast when component unmounts
        };
    }, [isLoading]);






    return (
        <>
            <MainHeader/>
            <ToastContainer />

            <div className="myapp">
                <h1>Face Detection Model</h1>
                <div className={`appvideo ${isLoading ? 'loading' : ''}`}>
                    <video crossOrigin="anonymous" ref={videoRef}
                           autoPlay
                           muted />
                </div>
                {isLoading && <div className="loading-message">Loading...</div>}

            </div>
        </>
    );
};

export default WebcamComponent;
