import image from './Background/image.jpg';

const pageStyleCP: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
};

const containerStyleCP: React.CSSProperties = {
    marginBottom: '20px',
    width: '450px'
};

const headerStyleCP: React.CSSProperties = {
    fontFamily: 'Times New Roman, Times, serif',
    fontWeight: 'bold',
    fontSize: '20px'
};

export { pageStyleCP, containerStyleCP, headerStyleCP };