import React, { useRef, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities"; // Make sure utilities.js is implemented correctly
import MainHeader from "../MainHeader/MainHeader";
import "@tensorflow/tfjs";
import "./hand.css";
function HandAPI() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const runHandpose = async () => {
            // Load the HandPose model
            try {
                const net = await handpose.load();
                console.log("HandPose model loaded.");

                // Run the detection loop using setInterval
                const detectionInterval = setInterval(() => {
                    detect(net);
                }, 100);

                // Clean up the interval when the component unmounts
                return () => clearInterval(detectionInterval);
            } catch (error) {
                console.error("Error loading HandPose model:", error);
            }
            runHandpose().then(r => {}); // Start the HandPose model loading and detection loop
        };

        runHandpose().then(r => {}); // Start the HandPose model loading and detection loop
    }, []);

    const detect = async (net) => {
        // Check if the webcam feed is ready
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video dimensions
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas dimensions
            if (canvasRef.current) {
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;

                // Estimate hands using the HandPose model
                const hand = await net.estimateHands(video);
                console.log("Detected hand:", hand);

                // Draw hand landmarks on the canvas
                const ctx = canvasRef.current.getContext("2d");
                drawHand(hand, ctx); // Make sure this function works as intended
            }
        }
    };

    return (
        <>
            <MainHeader />
            <div className="App">
                <header
                    className="App-header2"
                >
                    <Webcam
                        ref={webcamRef}
                    />
                    <canvas
                        ref={canvasRef}
                    />
                </header>
            </div>
        </>
    );
}

export default HandAPI;
