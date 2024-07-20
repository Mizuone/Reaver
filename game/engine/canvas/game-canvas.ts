import HTML from './HTMLCanvas';

const generateHTMLCanvas = () => {
    const element = document.createElement('canvas');
    element.id = 'gameCanvas';
    element.width = 640;
    element.height = 480;

    return element;
};

document.body.appendChild(generateHTMLCanvas());

const GameCanvas = new HTML('gameCanvas', 640, 480);
export default GameCanvas;


