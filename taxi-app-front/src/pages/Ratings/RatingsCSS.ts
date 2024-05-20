import image from './Background/image.jpg';

const pageStyleRating: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
};

const containerStyleRating: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '5px',
    marginTop: '50px'
};

export { pageStyleRating, containerStyleRating };