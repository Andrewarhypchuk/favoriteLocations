const GOOGLE_API_KEY = 'AIzaSyDiIFCE3ALpk6TQuCbeSScRL0KIh573yDY';

export function getMapPreview(lat,lng){

    const imagePreviewUrl =  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=12&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}key=${GOOGLE_API_KEY}`
    return imagePreviewUrl;
}