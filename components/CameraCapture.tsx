import React, { useRef, useEffect, useState } from 'react';
import { CameraIcon } from './icons/CameraIcon';
import { useI18n } from '../contexts/I18nContext';

interface CameraCaptureProps {
    onCapture: (imageDataUrl: string) => void;
    onCancel: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    useEffect(() => {
        const getCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'environment' } 
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
                setError(t('errorCameraAccess') as string);
            }
        };

        getCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [t, stream]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if(context) {
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const imageDataUrl = canvas.toDataURL('image/jpeg');
                onCapture(imageDataUrl);
            }
        }
    };

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-2xl shadow-[#9ebf4f]/10 dark:shadow-[#9ebf4f]/5 border border-[#dce8b9]/50 dark:border-gray-700 text-center transition-all duration-300 animate-fade-in">
            {error ? (
                 <div className="text-rose-600 dark:text-rose-400">
                    <p className="font-semibold">{t('errorTitle')}</p>
                    <p>{error}</p>
                 </div>
            ) : (
                <div className="relative w-full max-w-lg mx-auto">
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
                    <canvas ref={canvasRef} className="hidden" />
                </div>
            )}
            <div className="mt-4 flex justify-center gap-4">
                <button
                    onClick={handleCapture}
                    disabled={!!error}
                    className="flex items-center justify-center p-3 bg-gradient-to-r from-[#9ebf4f] to-[#80a040] text-white rounded-full shadow-lg hover:from-[#80a040] hover:to-[#648232] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Take picture"
                >
                    <CameraIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-200 text-[#36451b] font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                    {t('buttonCancel')}
                </button>
            </div>
        </div>
    );
};
