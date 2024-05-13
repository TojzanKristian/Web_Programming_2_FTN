const cardStyleVC: React.CSSProperties = {
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    overflow: 'hidden',
    margin: '20px',
    transition: 'transform 0.3s',
    backgroundColor: "white"
};

const buttonStyleVC: React.CSSProperties = {
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
};

const buttonContainerStyleVC = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
};

export { cardStyleVC, buttonStyleVC, buttonContainerStyleVC };