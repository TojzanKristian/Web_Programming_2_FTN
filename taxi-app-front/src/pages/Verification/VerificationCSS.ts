import image from './Background/image.jpg';

const pageStyleVerify: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'auto',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
};

const containerStyleVerify: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '5px',
    marginTop: '50px'
};

export { pageStyleVerify, containerStyleVerify };