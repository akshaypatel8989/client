import { useEffect, useRef, useState } from 'react'
import { Camera, CheckCircle2, MapPin, X } from 'lucide-react'

export default function SelfieCapture({ onComplete, onClose, actionLabel = 'Capture and punch in' }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [location, setLocation] = useState(null)
  const [error, setError] = useState('')
  const cameraUnsupported = !navigator.mediaDevices?.getUserMedia

  useEffect(() => {
    let mounted = true
    if (cameraUnsupported) return undefined
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false }).then((stream) => {
      if (mounted) { streamRef.current = stream; videoRef.current.srcObject = stream }
    }).catch(() => setError('Camera permission is required to capture attendance.'))
    navigator.geolocation?.getCurrentPosition(({ coords }) => setLocation({ lat: coords.latitude, lng: coords.longitude }), () => setError('Location permission is required to punch in.'))
    return () => { mounted = false; streamRef.current?.getTracks().forEach((track) => track.stop()) }
  }, [cameraUnsupported])

  const capture = () => {
    if (!location || !videoRef.current) return
    const canvas = document.createElement('canvas'); canvas.width = videoRef.current.videoWidth; canvas.height = videoRef.current.videoHeight
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0)
    onComplete({ selfieUrl: canvas.toDataURL('image/jpeg', 0.82), location })
  }

  return <div className="camera-backdrop"><div className="camera-modal"><button className="camera-close" onClick={onClose} aria-label="Close camera"><X size={18} /></button><div className="camera-title"><Camera size={18} /><div><strong>Verify your attendance</strong><small>Take a live selfie to continue</small></div></div><video ref={videoRef} autoPlay playsInline muted className="camera-preview" /><div className="camera-meta"><span><MapPin size={14} /> {location ? 'Location detected' : 'Finding location...'}</span>{location && <CheckCircle2 size={14} />}</div>{(error || cameraUnsupported) && <p className="camera-error">{error || 'This browser does not support camera capture.'}</p>}<button className="punch-button" onClick={capture} disabled={!location || Boolean(error) || cameraUnsupported}><Camera size={18} /> {actionLabel}</button></div></div>
}
